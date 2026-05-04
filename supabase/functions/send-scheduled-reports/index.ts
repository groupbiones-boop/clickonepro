import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Authentication: require either a matching webhook secret OR the service role key.
  // This blocks unauthenticated public invocations while still allowing
  // Supabase Cron jobs (which authenticate with the service role key) and
  // trusted external schedulers configured with REPORTS_WEBHOOK_SECRET.
  const webhookSecret = Deno.env.get("REPORTS_WEBHOOK_SECRET");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const providedSecret = req.headers.get("x-webhook-secret");
  const authHeader = req.headers.get("authorization") || "";
  const bearerToken = authHeader.toLowerCase().startsWith("bearer ")
    ? authHeader.slice(7).trim()
    : "";

  const matchesServiceRole =
    !!serviceRoleKey && bearerToken === serviceRoleKey;
  const matchesWebhookSecret =
    !!webhookSecret && !!providedSecret && providedSecret === webhookSecret;

  if (!matchesServiceRole && !matchesWebhookSecret) {
    console.warn("Unauthorized invocation of send-scheduled-reports");
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY not configured");
    }

    const resend = new Resend(resendApiKey);
    
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const now = new Date();
    const dayOfWeek = now.getUTCDay();
    const hour = now.getUTCHours();

    console.log(`Checking for scheduled reports: day=${dayOfWeek}, hour=${hour}`);

    // Fetch scheduled reports for this day and hour
    const { data: reports, error: reportsError } = await supabase
      .from("scheduled_reports")
      .select("*")
      .eq("enabled", true)
      .eq("day_of_week", dayOfWeek)
      .eq("hour", hour);

    if (reportsError) {
      throw reportsError;
    }

    if (!reports || reports.length === 0) {
      console.log("No scheduled reports to send at this time");
      return new Response(
        JSON.stringify({ message: "No reports to send", sent: 0 }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Found ${reports.length} reports to send`);

    // Calculate date range (last 7 days)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    // Fetch analytics data
    const { data: visitors } = await supabase
      .from("analytics_events")
      .select("session_id")
      .gte("created_at", startDate.toISOString())
      .lte("created_at", endDate.toISOString());

    const uniqueVisitors = new Set(visitors?.map(v => v.session_id) || []).size;

    const { count: pageviews } = await supabase
      .from("analytics_events")
      .select("*", { count: "exact", head: true })
      .eq("event_type", "pageview")
      .gte("created_at", startDate.toISOString())
      .lte("created_at", endDate.toISOString());

    const { count: leadsCount } = await supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .gte("created_at", startDate.toISOString())
      .lte("created_at", endDate.toISOString());

    const { count: agendamentosCount } = await supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .in("source", ["demo", "agendamento"])
      .gte("created_at", startDate.toISOString())
      .lte("created_at", endDate.toISOString());

    const conversionRate = uniqueVisitors > 0 ? ((leadsCount || 0) / uniqueVisitors) * 100 : 0;

    // Format date range for email
    const formatDate = (date: Date) => {
      return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
    };

    let sentCount = 0;

    for (const report of reports) {
      const recipients = report.recipients as string[];
      const sections = report.sections as string[];

      // Build email HTML
      let emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #500daa 0%, #8651c6 100%); color: white; padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; }
            .header p { margin: 10px 0 0; opacity: 0.9; }
            .content { padding: 30px; }
            .section { margin-bottom: 30px; }
            .section h2 { color: #500daa; font-size: 18px; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px; }
            .metric-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
            .metric-card { background: #f9f9f9; border-radius: 8px; padding: 15px; text-align: center; }
            .metric-value { font-size: 28px; font-weight: bold; color: #500daa; }
            .metric-label { color: #666; font-size: 12px; margin-top: 5px; }
            .funnel-table { width: 100%; border-collapse: collapse; }
            .funnel-table th, .funnel-table td { padding: 12px; text-align: left; border-bottom: 1px solid #e0e0e0; }
            .funnel-table th { background: #500daa; color: white; }
            .funnel-table tr:nth-child(even) { background: #f9f9f9; }
            .footer { background: #f4f4f4; padding: 20px; text-align: center; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📊 ${report.name}</h1>
              <p>Período: ${formatDate(startDate)} - ${formatDate(endDate)}</p>
            </div>
            <div class="content">
      `;

      // KPIs Section
      if (sections.includes("kpis")) {
        emailHtml += `
          <div class="section">
            <h2>📈 Resumo de KPIs</h2>
            <div class="metric-grid">
              <div class="metric-card">
                <div class="metric-value">${uniqueVisitors.toLocaleString("pt-BR")}</div>
                <div class="metric-label">Visitantes Únicos</div>
              </div>
              <div class="metric-card">
                <div class="metric-value">${(pageviews || 0).toLocaleString("pt-BR")}</div>
                <div class="metric-label">Pageviews</div>
              </div>
              <div class="metric-card">
                <div class="metric-value">${(leadsCount || 0).toLocaleString("pt-BR")}</div>
                <div class="metric-label">Leads Gerados</div>
              </div>
              <div class="metric-card">
                <div class="metric-value">${conversionRate.toFixed(2)}%</div>
                <div class="metric-label">Taxa de Conversão</div>
              </div>
            </div>
          </div>
        `;
      }

      // Funnel Section
      if (sections.includes("funnel")) {
        emailHtml += `
          <div class="section">
            <h2>🎯 Funil de Conversão</h2>
            <table class="funnel-table">
              <tr>
                <th>Etapa</th>
                <th>Quantidade</th>
              </tr>
              <tr>
                <td>Prospecting (Visitantes)</td>
                <td>${uniqueVisitors.toLocaleString("pt-BR")}</td>
              </tr>
              <tr>
                <td>Outreach (Pageviews)</td>
                <td>${(pageviews || 0).toLocaleString("pt-BR")}</td>
              </tr>
              <tr>
                <td>Discovery (Leads)</td>
                <td>${(leadsCount || 0).toLocaleString("pt-BR")}</td>
              </tr>
              <tr>
                <td>Demo (Agendamentos)</td>
                <td>${(agendamentosCount || 0).toLocaleString("pt-BR")}</td>
              </tr>
            </table>
          </div>
        `;
      }

      emailHtml += `
            </div>
            <div class="footer">
              <p>Este relatório foi gerado automaticamente pelo ClickOne AI.</p>
              <p>© ${new Date().getFullYear()} ClickOne AI. Todos os direitos reservados.</p>
            </div>
          </div>
        </body>
        </html>
      `;

      // Send email to all recipients
      for (const email of recipients) {
        try {
          const { error: emailError } = await resend.emails.send({
            from: "ClickOne Reports <onboarding@resend.dev>",
            to: [email],
            subject: `📊 ${report.name} - ${formatDate(now)}`,
            html: emailHtml,
          });

          if (emailError) {
            console.error(`Error sending email to ${email}:`, emailError);
          } else {
            console.log(`Email sent successfully to ${email}`);
            sentCount++;
          }
        } catch (emailErr) {
          console.error(`Failed to send email to ${email}:`, emailErr);
        }
      }

      // Update last_sent_at
      await supabase
        .from("scheduled_reports")
        .update({ last_sent_at: now.toISOString() })
        .eq("id", report.id);
    }

    // Create notification
    await supabase.from("notifications").insert({
      type: "report_sent",
      title: "Relatórios enviados",
      message: `${sentCount} relatório(s) agendado(s) foram enviados com sucesso.`,
      severity: "info",
    });

    return new Response(
      JSON.stringify({ 
        message: "Reports sent successfully", 
        sent: sentCount,
        reports: reports.length 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in send-scheduled-reports:", error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
