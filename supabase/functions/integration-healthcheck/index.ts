import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

const GHL_API = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";
const LEGACY_WIDGET_URL = "https://links.clickonepro.com/widget/bookings/clickoneus";

type HealthState = "connected" | "warning" | "error" | "not_configured";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function timedFetch(url: string, init?: RequestInit, timeoutMs = 6000) {
  const controller = new AbortController();
  const startedAt = Date.now();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { ...init, signal: controller.signal, redirect: "manual" });
    return {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      latencyMs: Date.now() - startedAt,
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      statusText: error instanceof Error ? error.message : "Request failed",
      latencyMs: Date.now() - startedAt,
    };
  } finally {
    clearTimeout(timeout);
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "GET") return json({ success: false, error: "Method not allowed" }, 405);

  const checkedAt = new Date().toISOString();

  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.replace(/^Bearer\s+/i, "");
    if (!token) return json({ success: false, error: "Authentication required" }, 401);

    const authClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!,
      { global: { headers: { Authorization: `Bearer ${token}` } }, auth: { persistSession: false } },
    );

    const { data: userData, error: userError } = await authClient.auth.getUser(token);
    if (userError || !userData.user) return json({ success: false, error: "Invalid session" }, 401);

    const serviceClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } },
    );

    const { data: isAdmin, error: roleError } = await serviceClient.rpc("has_role", {
      _user_id: userData.user.id,
      _role: "admin",
    });

    if (roleError || isAdmin !== true) return json({ success: false, error: "Admin access required" }, 403);

    const pit = Deno.env.get("GHL_PIT_TOKEN");
    const locationId = Deno.env.get("GHL_LOCATION_ID");
    const calendarId = Deno.env.get("GHL_CALENDAR_ID");

    const widgetResult = await timedFetch(LEGACY_WIDGET_URL);
    const widgetState: HealthState = widgetResult.ok ? "connected" : widgetResult.status === 404 ? "error" : "warning";

    let contactsState: HealthState = "not_configured";
    let contactsProbe: Awaited<ReturnType<typeof timedFetch>> | null = null;

    if (pit && locationId) {
      contactsProbe = await timedFetch(`${GHL_API}/locations/${locationId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${pit}`,
          Version: GHL_VERSION,
          Accept: "application/json",
        },
      });
      contactsState = contactsProbe.ok ? "connected" : contactsProbe.status === 401 || contactsProbe.status === 403 ? "error" : "warning";
    }

    const { data: latestLeads } = await serviceClient
      .from("leads")
      .select("email, source, ghl_sync_status, ghl_contact_id, ghl_error, created_at, last_synced_at")
      .order("created_at", { ascending: false })
      .limit(10);

    const statusCounts = (latestLeads ?? []).reduce<Record<string, number>>((acc, lead) => {
      const status = lead.ghl_sync_status ?? "unknown";
      acc[status] = (acc[status] ?? 0) + 1;
      return acc;
    }, {});

    return json({
      success: true,
      checkedAt,
      widget: {
        name: "GHL calendar widget",
        state: widgetState,
        url: LEGACY_WIDGET_URL,
        httpStatus: widgetResult.status,
        statusText: widgetResult.statusText,
        latencyMs: widgetResult.latencyMs,
        note: widgetResult.status === 404 ? "Widget URL is returning 404; native /agendar-demo form is active." : null,
      },
      contacts: {
        name: "GHL contacts integration",
        state: contactsState,
        endpoint: `${GHL_API}/contacts/upsert`,
        locationConfigured: Boolean(locationId),
        pitConfigured: Boolean(pit),
        httpStatus: contactsProbe?.status ?? null,
        statusText: contactsProbe?.statusText ?? null,
        latencyMs: contactsProbe?.latencyMs ?? null,
      },
      calendar: {
        name: "GHL appointment creation",
        state: calendarId ? "connected" : "not_configured",
        calendarConfigured: Boolean(calendarId),
        endpoint: `${GHL_API}/calendars/events/appointments`,
        note: calendarId ? null : "GHL_CALENDAR_ID is not configured, so contacts sync but appointments are not created by API.",
      },
      links: {
        activeBookingPage: "/agendar-demo",
        contactPage: "/contato",
        nativeContactFunction: "ghl-upsert-contact",
        legacyWidgetUrl: LEGACY_WIDGET_URL,
        appLogin: "https://app.clickonepro.com/",
        chatWidgetScript: "https://beta.leadconnectorhq.com/loader.js",
        chatWidgetResources: "https://beta.leadconnectorhq.com/chat-widget/loader.js",
        chatWidgetId: "6958160ae056feed599822d0",
      },
      timestamps: {
        latestLeadCreatedAt: latestLeads?.[0]?.created_at ?? null,
        latestLeadSyncedAt: latestLeads?.find((lead) => lead.last_synced_at)?.last_synced_at ?? null,
      },
      recentLeadSync: {
        statusCounts,
        items: latestLeads ?? [],
      },
    });
  } catch (error) {
    return json({
      success: false,
      checkedAt,
      error: error instanceof Error ? error.message : "Unknown error",
    }, 500);
  }
});