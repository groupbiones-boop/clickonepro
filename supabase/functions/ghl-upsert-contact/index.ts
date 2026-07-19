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
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

function isEmail(v: unknown): v is string {
  return typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length <= 255;
}

function sanitize(v: unknown, max = 255): string | undefined {
  if (typeof v !== "string") return undefined;
  const t = v.trim().slice(0, max).replace(/[<>]/g, "");
  return t.length ? t : undefined;
}

function validate(body: unknown): ContactPayload {
  if (!body || typeof body !== "object") throw new Error("Invalid body");
  const b = body as Record<string, unknown>;
  if (!isEmail(b.email)) throw new Error("Valid email required");
  return {
    email: b.email as string,
    name: sanitize(b.name, 200),
    phone: sanitize(b.phone, 40),
    company: sanitize(b.company, 200),
    message: sanitize(b.message, 2000),
    source: sanitize(b.source, 100) || "website-contact-form",
    utm_source: sanitize(b.utm_source, 100),
    utm_medium: sanitize(b.utm_medium, 100),
    utm_campaign: sanitize(b.utm_campaign, 100),
  };
}

async function ghlUpsert(pit: string, locationId: string, p: ContactPayload) {
  const [firstName, ...rest] = (p.name || "").split(" ");
  const lastName = rest.join(" ");

  const payload: Record<string, unknown> = {
    locationId,
    email: p.email,
    firstName: firstName || undefined,
    lastName: lastName || undefined,
    name: p.name || undefined,
    phone: p.phone,
    companyName: p.company,
    source: p.source,
    tags: ["website-form"],
  };

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

  // Attach note with message + UTMs
  if (contactId && (p.message || p.utm_source || p.utm_campaign)) {
    const noteBody = [
      p.message && `Message: ${p.message}`,
      p.utm_source && `utm_source: ${p.utm_source}`,
      p.utm_medium && `utm_medium: ${p.utm_medium}`,
      p.utm_campaign && `utm_campaign: ${p.utm_campaign}`,
    ].filter(Boolean).join("\n");

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
    if (!pit || !locationId) throw new Error("GHL credentials not configured");

    const payload = validate(await req.json());
    console.log("Upserting contact:", payload.email);

    const { contactId } = await ghlUpsert(pit, locationId, payload);

    // Mirror lead to Supabase (best-effort)
    try {
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      );
      await supabase.from("leads").insert({
        name: payload.name ?? null,
        email: payload.email,
        phone: payload.phone ?? null,
        company: payload.company ?? null,
        source: payload.source,
        utm_source: payload.utm_source ?? null,
        utm_medium: payload.utm_medium ?? null,
        utm_campaign: payload.utm_campaign ?? null,
        status: "new",
      });
    } catch (e) {
      console.warn("Lead mirror failed:", e);
    }

    return new Response(JSON.stringify({ success: true, contactId }), {
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
