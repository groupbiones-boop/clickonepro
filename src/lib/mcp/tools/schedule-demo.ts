import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { getEnv } from "../env";

function supabaseAnon() {
  // Public-facing action (anyone can request a demo). Uses anon key; RLS allows INSERT.
  return createClient(getEnv("SUPABASE_URL"), getEnv("SUPABASE_PUBLISHABLE_KEY"), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function supabaseService() {
  // Service role used only to upsert the linked lead (bypasses RLS safely inside the function).
  return createClient(getEnv("SUPABASE_URL"), getEnv("SUPABASE_SERVICE_ROLE_KEY"), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

async function sendConfirmationEmail(params: {
  to: string;
  name?: string;
  scheduledAt: string;
  timezone: string;
  notes?: string;
}) {
  const lovableKey = getEnv("LOVABLE_API_KEY");
  const resendKey = getEnv("RESEND_API_KEY");
  const when = new Date(params.scheduledAt).toLocaleString("pt-BR", {
    timeZone: params.timezone,
    dateStyle: "full",
    timeStyle: "short",
  });
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#ffffff;color:#111827">
      <h1 style="color:#7c3aed;margin:0 0 12px">Demonstração ClickOne Pro confirmada</h1>
      <p>Olá${params.name ? ` ${params.name}` : ""},</p>
      <p>Sua demonstração está agendada para:</p>
      <p style="font-size:18px;font-weight:600;background:#f5f3ff;padding:12px 16px;border-radius:8px;color:#4c1d95">${when}</p>
      ${params.notes ? `<p><strong>Observações:</strong> ${params.notes}</p>` : ""}
      <p>Nossa equipe entrará em contato para confirmar os detalhes. Se precisar reagendar, responda este e-mail.</p>
      <p style="margin-top:24px;color:#6b7280;font-size:13px">— Equipe ClickOne Pro · https://clickonepro.com</p>
    </div>`.trim();

  const res = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": resendKey,
    },
    body: JSON.stringify({
      from: "ClickOne Pro <onboarding@resend.dev>",
      to: [params.to],
      subject: "Sua demonstração ClickOne Pro está agendada",
      html,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend ${res.status}: ${body}`);
  }
  return true;
}

export default defineTool({
  name: "schedule_demo",
  title: "Schedule demo",
  description:
    "Register a demo booking for a lead and send a confirmation email. Auto-creates or updates the linked lead (status → 'demo_scheduled'). Public tool: no login required.",
  inputSchema: {
    email: z.string().email().describe("Lead email (required)."),
    scheduled_at: z.string().datetime().describe("ISO 8601 date-time of the demo (e.g. 2026-07-25T14:00:00Z)."),
    name: z.string().optional(),
    phone: z.string().optional(),
    company: z.string().optional(),
    timezone: z.string().optional().describe("IANA timezone. Default 'America/Sao_Paulo'."),
    notes: z.string().optional(),
    send_confirmation: z.boolean().optional().describe("Send confirmation email (default true)."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true },
  handler: async (input, _ctx: ToolContext) => {
    const timezone = input.timezone ?? "America/Sao_Paulo";
    const anon = supabaseAnon();
    const service = supabaseService();

    // 1) Upsert lead by email
    const { data: existingLead } = await service
      .from("leads")
      .select("id")
      .eq("email", input.email)
      .maybeSingle();

    let leadId = existingLead?.id as string | undefined;
    if (leadId) {
      await service
        .from("leads")
        .update({
          status: "demo_scheduled",
          name: input.name ?? undefined,
          phone: input.phone ?? undefined,
          company: input.company ?? undefined,
        })
        .eq("id", leadId);
    } else {
      const { data: newLead, error: leadErr } = await service
        .from("leads")
        .insert({
          email: input.email,
          name: input.name,
          phone: input.phone,
          company: input.company,
          source: "mcp:schedule_demo",
          status: "demo_scheduled",
        })
        .select("id")
        .single();
      if (leadErr) {
        return { content: [{ type: "text", text: `Lead upsert failed: ${leadErr.message}` }], isError: true };
      }
      leadId = newLead.id;
    }

    // 2) Insert booking
    const { data: booking, error: bookErr } = await anon
      .from("demo_bookings")
      .insert({
        lead_id: leadId,
        email: input.email,
        name: input.name,
        phone: input.phone,
        company: input.company,
        scheduled_at: input.scheduled_at,
        timezone,
        notes: input.notes,
        source: "mcp",
        status: "scheduled",
      })
      .select()
      .single();
    if (bookErr) {
      return { content: [{ type: "text", text: `Booking insert failed: ${bookErr.message}` }], isError: true };
    }

    // 3) Send confirmation email
    let emailSent = false;
    let emailError: string | undefined;
    if (input.send_confirmation !== false) {
      try {
        await sendConfirmationEmail({
          to: input.email,
          name: input.name,
          scheduledAt: input.scheduled_at,
          timezone,
          notes: input.notes,
        });
        emailSent = true;
        await service
          .from("demo_bookings")
          .update({ confirmation_sent_at: new Date().toISOString() })
          .eq("id", booking.id);
      } catch (err) {
        emailError = err instanceof Error ? err.message : String(err);
      }
    }

    const summary = {
      booking_id: booking.id,
      lead_id: leadId,
      scheduled_at: input.scheduled_at,
      timezone,
      email_sent: emailSent,
      email_error: emailError,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(summary, null, 2) }],
      structuredContent: summary,
    };
  },
});
