import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

/**
 * Demo booking on our own site, without the GHL calendar widget (its Cloudflare check blocks
 * real visitors). Two actions, both POST:
 *   { action: "slots" }                                  -> free slots for the next 14 days
 *   { action: "book", startTime, name, email, phone, company } -> upserts the contact and books
 * The slot is re-checked against GHL's free slots before booking, so the client cannot pick
 * an arbitrary time.
 */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const GHL_API = "https://services.leadconnectorhq.com";
const CONTACTS_VERSION = "2021-07-28";
const CALENDARS_VERSION = "2021-04-15";
// "ClickOne AI Demo" calendar. Not a secret; the env var wins when set.
const DEFAULT_CALENDAR_ID = "Zxu1a1ZaDY2U9rVek7hl";
const TIMEZONE = "America/New_York";
const DAYS_AHEAD = 14;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// ISO 8601 with offset, as GHL returns slots: 2026-09-28T10:00:00-04:00
const SLOT_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/;

type SlotsByDay = Record<string, string[]>;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

function clean(v: unknown, max = 200): string | undefined {
  if (typeof v !== "string") return undefined;
  const t = v.trim().slice(0, max).replace(/[<>]/g, "");
  return t.length ? t : undefined;
}

/** 10-digit US numbers become +1XXXXXXXXXX; numbers typed with + keep their country code. */
function normalizePhone(v: unknown): string | undefined {
  const s = clean(v, 40);
  if (!s || /[^\d\s().+-]/.test(s)) return undefined;
  const digits = s.replace(/\D/g, "");
  let e164: string;
  if (s.startsWith("+")) e164 = `+${digits}`;
  else if (digits.length === 10 && /^[2-9]/.test(digits)) e164 = `+1${digits}`;
  else if (digits.length === 11 && /^1[2-9]/.test(digits)) e164 = `+${digits}`;
  else return undefined;
  return /^\+[1-9]\d{7,14}$/.test(e164) ? e164 : undefined;
}

// The public "slots" list is cached for a minute so repeated page loads don't hammer the GHL API
// (it shares the account's rate limit). Bookings always re-check with a fresh call.
let slotCache: { at: number; data: SlotsByDay } | null = null;
const SLOT_CACHE_MS = 60_000;

/** GHL error without the response body (it can echo the contact's email or phone). */
function ghlError(what: string, res: Response, text: string): Error {
  let traceId = "";
  try {
    traceId = JSON.parse(text)?.traceId ?? "";
  } catch {
    /* body was not JSON */
  }
  return new Error(`GHL ${what} failed (${res.status})${traceId ? ` trace ${traceId}` : ""}`);
}

async function fetchSlots(pit: string, calendarId: string, from: Date, days: number): Promise<SlotsByDay> {
  const url = new URL(`${GHL_API}/calendars/${calendarId}/free-slots`);
  url.searchParams.set("startDate", String(from.getTime()));
  url.searchParams.set("endDate", String(from.getTime() + days * 86_400_000));
  url.searchParams.set("timezone", TIMEZONE);
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${pit}`, Version: CALENDARS_VERSION, Accept: "application/json" },
  });
  const text = await res.text();
  if (!res.ok) throw ghlError("free-slots", res, text);
  const data = JSON.parse(text) as Record<string, { slots?: string[] } | string>;
  const out: SlotsByDay = {};
  for (const [day, value] of Object.entries(data)) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || typeof value !== "object") continue;
    const all = value.slots ?? [];
    const slots = all.filter((s) => SLOT_RE.test(s));
    if (slots.length < all.length) console.warn(`free-slots: dropped ${all.length - slots.length} slot(s) in an unexpected format`);
    if (slots.length) out[day] = slots;
  }
  return out;
}

async function upsertContact(
  pit: string,
  locationId: string,
  c: { name: string; email: string; phone?: string; company?: string },
): Promise<string> {
  const parts = c.name.split(/\s+/);
  const payload: Record<string, unknown> = {
    locationId,
    email: c.email,
    firstName: parts[0],
    lastName: parts.slice(1).join(" ") || undefined,
    name: c.name,
    phone: c.phone,
    companyName: c.company,
  };
  Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);
  const res = await fetch(`${GHL_API}/contacts/upsert`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${pit}`,
      Version: CONTACTS_VERSION,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  if (!res.ok) throw ghlError("upsert", res, text);
  const data = JSON.parse(text);
  const id = data?.contact?.id || data?.new?.id || data?.id;
  if (!id) throw new Error("GHL upsert returned no contact id");
  return id;
}

/** True when the contact already has an upcoming, not-cancelled demo on this calendar. */
async function hasUpcomingDemo(pit: string, calendarId: string, contactId: string): Promise<boolean> {
  const res = await fetch(`${GHL_API}/contacts/${contactId}/appointments`, {
    headers: { Authorization: `Bearer ${pit}`, Version: CONTACTS_VERSION, Accept: "application/json" },
  });
  const text = await res.text();
  if (!res.ok) throw ghlError("contact appointments", res, text);
  const events = (JSON.parse(text)?.events ?? []) as Array<{ calendarId?: string; startTime?: string; appointmentStatus?: string }>;
  const now = Date.now();
  return events.some(
    (e) =>
      e.calendarId === calendarId &&
      e.appointmentStatus !== "cancelled" &&
      e.appointmentStatus !== "invalid" &&
      !!e.startTime &&
      new Date(e.startTime).getTime() > now,
  );
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ success: false, error: "Method not allowed" }, 405);

  try {
    const pit = Deno.env.get("GHL_PIT_TOKEN");
    const locationId = Deno.env.get("GHL_LOCATION_ID");
    const calendarId = Deno.env.get("GHL_CALENDAR_ID") || DEFAULT_CALENDAR_ID;
    if (!pit || !locationId) throw new Error("GHL credentials not configured");

    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;

    if (body.action === "slots") {
      if (!slotCache || Date.now() - slotCache.at > SLOT_CACHE_MS) {
        slotCache = { at: Date.now(), data: await fetchSlots(pit, calendarId, new Date(), DAYS_AHEAD) };
      }
      return json({ success: true, timezone: TIMEZONE, slots: slotCache.data });
    }

    if (body.action === "book") {
      const startTime = clean(body.startTime, 40);
      const name = clean(body.name, 200);
      const email = clean(body.email, 255);
      const phone = normalizePhone(body.phone);
      const company = clean(body.company, 200);
      if (!startTime || !SLOT_RE.test(startTime)) return json({ success: false, error: "Invalid time" }, 400);
      if (!name || !email || !EMAIL_RE.test(email)) return json({ success: false, error: "Name and email required" }, 400);

      // Re-check the slot is still free (someone else may have taken it since the list loaded).
      const day = startTime.slice(0, 10);
      const dayStart = new Date(`${day}T00:00:00Z`);
      const fresh = await fetchSlots(pit, calendarId, new Date(dayStart.getTime() - 86_400_000), 3);
      const stillFree = (fresh[day] ?? []).includes(startTime);
      if (!stillFree) return json({ success: false, error: "slot_taken" }, 409);

      const contactId = await upsertContact(pit, locationId, { name, email, phone, company });
      // One upcoming demo per contact: stops duplicate bookings and keeps the open endpoint from
      // being used to send repeated confirmation emails to one address.
      if (await hasUpcomingDemo(pit, calendarId, contactId)) return json({ success: false, error: "already_booked" }, 409);
      const res = await fetch(`${GHL_API}/calendars/events/appointments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${pit}`,
          Version: CALENDARS_VERSION,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          calendarId,
          locationId,
          contactId,
          startTime,
          title: `ClickOne AI Demo | ${name}${company ? ` (${company})` : ""}`,
          appointmentStatus: "confirmed",
          toNotify: true,
        }),
      });
      const text = await res.text();
      if (!res.ok) throw ghlError("appointment", res, text);
      slotCache = null;
      const appt = JSON.parse(text);
      return json({ success: true, appointmentId: appt?.id ?? null, startTime });
    }

    return json({ success: false, error: "Unknown action" }, 400);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("ghl-demo-booking error:", msg);
    return json({ success: false, error: "booking_failed" }, 502);
  }
});
