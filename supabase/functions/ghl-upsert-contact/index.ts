import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const GHL_API = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";

interface ContactPayload {
  name?: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  preferredDate?: string;
  preferredTime?: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// E.164-ish: optional leading +, 8-15 digits (allow spaces/dashes/parens on input)
const PHONE_RE = /^\+?[1-9]\d{7,14}$/;

export function isEmail(v: unknown): v is string {
  return typeof v === "string" && EMAIL_RE.test(v.trim()) && v.trim().length <= 255;
}

export function sanitize(v: unknown, max = 255): string | undefined {
  if (typeof v !== "string") return undefined;
  const t = v.trim().slice(0, max).replace(/[<>]/g, "");
  return t.length ? t : undefined;
}

/** Normalizes phone to E.164-compatible digits (keeps leading +). Returns undefined if invalid. */
export function normalizePhone(v: unknown): string | undefined {
  const s = sanitize(v, 40);
  if (!s) return undefined;
  const cleaned = s.replace(/[\s().-]/g, "");
  if (!PHONE_RE.test(cleaned)) return undefined;
  return cleaned.startsWith("+") ? cleaned : `+${cleaned}`;
}

/** Splits a full name into first/last preserving multi-word last names. */
export function splitName(full?: string): { firstName?: string; lastName?: string } {
  if (!full) return {};
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0] };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

export function validate(body: unknown): ContactPayload {
  if (!body || typeof body !== "object") throw new Error("Invalid body");
  const b = body as Record<string, unknown>;
  const email = typeof b.email === "string" ? b.email.trim() : "";
  if (!isEmail(email)) throw new Error("Valid email required");

  // Phone is optional, but if provided must be a valid format
  let phone: string | undefined;
  if (b.phone !== undefined && b.phone !== null && b.phone !== "") {
    phone = normalizePhone(b.phone);
    if (!phone) throw new Error("Invalid phone format (use international format, e.g. +15551234567)");
  }

  return {
    email,
    name: sanitize(b.name, 200),
    phone,
    company: sanitize(b.company, 200),
    message: sanitize(b.message, 2000),
    preferredDate: sanitize(b.preferredDate, 20),
    preferredTime: sanitize(b.preferredTime, 20),
    source: sanitize(b.source, 100) || "website-contact-form",
    utm_source: sanitize(b.utm_source, 100),
    utm_medium: sanitize(b.utm_medium, 100),
    utm_campaign: sanitize(b.utm_campaign, 100),
  };
}

/** Builds the GHL v2 contacts/upsert payload. Exported for testing. */
export function buildGhlPayload(locationId: string, p: ContactPayload): Record<string, unknown> {
  const { firstName, lastName } = splitName(p.name);
  const payload: Record<string, unknown> = {
    locationId,
    email: p.email,
    firstName,
    lastName,
    name: p.name,
    phone: p.phone,
    companyName: p.company,
    source: p.source,
    tags: ["website-form"],
  };
  Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);
  return payload;
}

/** Builds the attribution note body. Returns undefined when nothing to note. */
export function buildNoteBody(p: ContactPayload): string | undefined {
  const lines = [
    p.message && `Message:\n${p.message}`,
    p.preferredDate && `preferred_date: ${p.preferredDate}`,
    p.preferredTime && `preferred_time: ${p.preferredTime}`,
    (p.source || p.utm_source || p.utm_medium || p.utm_campaign) && "— Attribution —",
    p.source && `source: ${p.source}`,
    p.utm_source && `utm_source: ${p.utm_source}`,
    p.utm_medium && `utm_medium: ${p.utm_medium}`,
    p.utm_campaign && `utm_campaign: ${p.utm_campaign}`,
  ].filter(Boolean) as string[];
  return lines.length ? lines.join("\n") : undefined;
}

export function buildAppointmentPayload(
  calendarId: string,
  locationId: string,
  contactId: string,
  p: ContactPayload,
): Record<string, unknown> | undefined {
  if (!p.preferredDate || !p.preferredTime) return undefined;

  const startTime = `${p.preferredDate}T${p.preferredTime.length === 5 ? `${p.preferredTime}:00` : p.preferredTime}`;
  const payload: Record<string, unknown> = {
    calendarId,
    locationId,
    contactId,
    startTime,
    title: `ClickOne Pro demo${p.company ? ` - ${p.company}` : ""}`,
    appointmentStatus: "new",
    ignoreDateRange: true,
  };

  Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);
  return payload;
}

async function ghlUpsert(pit: string, locationId: string, p: ContactPayload) {
  const payload = buildGhlPayload(locationId, p);

  const res = await fetch(`${GHL_API}/contacts/upsert`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${pit}`,
      Version: GHL_VERSION,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(`GHL upsert failed (${res.status}): ${text}`);
  const data = JSON.parse(text);
  const contactId = data?.contact?.id || data?.new?.id || data?.id;

  // Attach a note capturing the free-text message and attribution (UTMs / source)
  if (contactId) {
    const noteBody = buildNoteBody(p);
    if (noteBody) {
      await fetch(`${GHL_API}/contacts/${contactId}/notes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${pit}`,
          Version: GHL_VERSION,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: noteBody }),
      }).catch((e) => console.warn("Note create failed:", e));
    }
  }


  return { contactId, raw: data };
}

async function ghlCreateAppointment(
  pit: string,
  calendarId: string,
  locationId: string,
  contactId: string,
  p: ContactPayload,
) {
  const payload = buildAppointmentPayload(calendarId, locationId, contactId, p);
  if (!payload) return null;

  const res = await fetch(`${GHL_API}/calendars/events/appointments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${pit}`,
      Version: GHL_VERSION,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(`GHL appointment failed (${res.status}): ${text}`);
  return JSON.parse(text);
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const pit = Deno.env.get("GHL_PIT_TOKEN");
    const locationId = Deno.env.get("GHL_LOCATION_ID");
    const calendarId = Deno.env.get("GHL_CALENDAR_ID");
    if (!pit || !locationId) throw new Error("GHL credentials not configured");

    const payload = validate(await req.json());
    console.log("Upserting contact:", payload.email);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    let contactId: string | undefined;
    let ghlRaw: unknown = null;
    let appointmentRaw: unknown = null;
    let appointmentError: string | null = null;
    let syncStatus: "created" | "updated" | "failed" = "failed";
    let ghlError: string | null = null;

    try {
      const result = await ghlUpsert(pit, locationId, payload);
      contactId = result.contactId;
      ghlRaw = result.raw;
      // GHL upsert returns `new: true` when a new contact was created
      const isNew = (result.raw as { new?: boolean } | null)?.new === true;
      syncStatus = isNew ? "created" : "updated";

      if (calendarId && contactId && payload.preferredDate && payload.preferredTime) {
        try {
          appointmentRaw = await ghlCreateAppointment(pit, calendarId, locationId, contactId, payload);
        } catch (e) {
          appointmentError = e instanceof Error ? e.message : String(e);
          console.error("GHL appointment error:", appointmentError);
        }
      }
    } catch (e) {
      ghlError = e instanceof Error ? e.message : String(e);
      console.error("GHL upsert error:", ghlError);
    }

    // Mirror lead + sync status to Supabase (best-effort)
    try {
      await supabase.from("leads").insert({
        name: payload.name ?? null,
        email: payload.email,
        phone: payload.phone ?? null,
        company: payload.company ?? null,
        source: payload.source,
        utm_source: payload.utm_source ?? null,
        utm_medium: payload.utm_medium ?? null,
        utm_campaign: payload.utm_campaign ?? null,
        status: syncStatus === "failed" ? "failed" : "new",
        ghl_contact_id: contactId ?? null,
        ghl_sync_status: syncStatus,
        ghl_response: ghlRaw,
        ghl_error: [ghlError, appointmentError].filter(Boolean).join(" | ") || null,
        last_synced_at: new Date().toISOString(),
      });
    } catch (e) {
      console.warn("Lead mirror failed:", e);
    }

    if (syncStatus === "failed") {
      return new Response(JSON.stringify({ success: false, error: ghlError, syncStatus }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, contactId, syncStatus, appointment: appointmentRaw, appointmentError }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("ghl-upsert-contact error:", msg);
    const status = msg.includes("required") || msg.includes("Invalid") ? 400 : 500;
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
