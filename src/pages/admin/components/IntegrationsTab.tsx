import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Activity, AlertTriangle, CalendarClock, CheckCircle2, Clock, ExternalLink, Link2, Loader2, PlugZap, RefreshCw, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { EXTERNAL_URLS } from "@/lib/external-urls";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type HealthState = "connected" | "warning" | "error" | "not_configured";

interface HealthResponse {
  success: boolean;
  checkedAt: string;
  widget: {
    name: string;
    state: HealthState;
    url: string;
    httpStatus: number;
    statusText: string;
    latencyMs: number;
    note: string | null;
  };
  contacts: {
    name: string;
    state: HealthState;
    endpoint: string;
    locationConfigured: boolean;
    pitConfigured: boolean;
    httpStatus: number | null;
    statusText: string | null;
    latencyMs: number | null;
  };
  calendar: {
    name: string;
    state: HealthState;
    calendarConfigured: boolean;
    endpoint: string;
    note: string | null;
  };
  links: Record<string, string>;
  timestamps: {
    latestLeadCreatedAt: string | null;
    latestLeadSyncedAt: string | null;
  };
  recentLeadSync: {
    statusCounts: Record<string, number>;
    items: Array<{
      email: string;
      source: string | null;
      ghl_sync_status: string | null;
      ghl_contact_id: string | null;
      ghl_error: string | null;
      created_at: string;
      last_synced_at: string | null;
    }>;
  };
}

const stateMeta: Record<HealthState, { label: string; badge: "default" | "secondary" | "destructive" | "outline"; icon: typeof CheckCircle2; className: string }> = {
  connected: { label: "Conectado", badge: "default", icon: CheckCircle2, className: "text-emerald-500" },
  warning: { label: "Atenção", badge: "secondary", icon: AlertTriangle, className: "text-amber-500" },
  error: { label: "Erro", badge: "destructive", icon: XCircle, className: "text-destructive" },
  not_configured: { label: "Não configurado", badge: "outline", icon: AlertTriangle, className: "text-muted-foreground" },
};

function formatDate(value: string | null | undefined) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "medium",
  }).format(new Date(value));
}

function StatusCard({
  title,
  state,
  description,
  details,
}: {
  title: string;
  state: HealthState;
  description: string;
  details: Array<{ label: string; value: string | number | null | undefined }>;
}) {
  const meta = stateMeta[state];
  const Icon = meta.icon;

  return (
    <Card>
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-lg flex items-center gap-2">
              <Icon className={`h-5 w-5 ${meta.className}`} />
              {title}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Badge variant={meta.badge}>{meta.label}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <dl className="space-y-3">
          {details.map((item) => (
            <div key={item.label} className="flex items-start justify-between gap-4 border-b border-border/60 pb-3 last:border-0 last:pb-0">
              <dt className="text-sm text-muted-foreground">{item.label}</dt>
              <dd className="text-sm font-medium text-right break-all">{item.value ?? "—"}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}

export default function IntegrationsTab() {
  const healthQuery = useQuery({
    queryKey: ["integration-healthcheck"],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke<HealthResponse>("integration-healthcheck", {
        method: "GET",
      });

      if (error) throw new Error(error.message);
      if (!data?.success) throw new Error("Healthcheck indisponível");
      return data;
    },
    refetchOnWindowFocus: false,
  });

  const currentLinks = useMemo(() => ({
    bookingPage: EXTERNAL_URLS.GHL_BOOKING,
    appLogin: EXTERNAL_URLS.APP_LOGIN,
    chatWidgetScript: EXTERNAL_URLS.CHAT_WIDGET_SCRIPT,
    chatWidgetResources: EXTERNAL_URLS.CHAT_WIDGET_RESOURCES,
    chatWidgetId: EXTERNAL_URLS.CHAT_WIDGET_ID,
  }), []);

  if (healthQuery.isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (healthQuery.isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <XCircle className="h-5 w-5" />
            Healthcheck indisponível
          </CardTitle>
          <CardDescription>{healthQuery.error.message}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => healthQuery.refetch()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Tentar novamente
          </Button>
        </CardContent>
      </Card>
    );
  }

  const health = healthQuery.data;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <PlugZap className="h-6 w-6 text-primary" />
            Status das integrações
          </h2>
          <p className="text-muted-foreground">Último healthcheck: {formatDate(health.checkedAt)}</p>
        </div>
        <Button onClick={() => healthQuery.refetch()} disabled={healthQuery.isFetching}>
          {healthQuery.isFetching ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
          Atualizar status
        </Button>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <StatusCard
          title="Widget de agendamento"
          state={health.widget.state}
          description={health.widget.note ?? "Verifica a URL legada do widget de calendário."}
          details={[
            { label: "URL testada", value: health.widget.url },
            { label: "HTTP", value: health.widget.httpStatus || "sem resposta" },
            { label: "Latência", value: `${health.widget.latencyMs}ms` },
          ]}
        />
        <StatusCard
          title="Integração de contatos"
          state={health.contacts.state}
          description="Valida credenciais e conectividade com a API de contatos."
          details={[
            { label: "Token configurado", value: health.contacts.pitConfigured ? "sim" : "não" },
            { label: "Location ID configurado", value: health.contacts.locationConfigured ? "sim" : "não" },
            { label: "HTTP", value: health.contacts.httpStatus ?? "—" },
            { label: "Latência", value: health.contacts.latencyMs ? `${health.contacts.latencyMs}ms` : "—" },
          ]}
        />
        <StatusCard
          title="Criação de agendamentos"
          state={health.calendar.state}
          description={health.calendar.note ?? "Pronto para criar eventos no calendário via API."}
          details={[
            { label: "Calendar ID configurado", value: health.calendar.calendarConfigured ? "sim" : "não" },
            { label: "Endpoint", value: health.calendar.endpoint },
          ]}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Link2 className="h-5 w-5 text-primary" />
              Links atuais usados no site
            </CardTitle>
            <CardDescription>Valores centralizados usados pelos CTAs e widgets.</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3">
              {Object.entries({ ...health.links, ...currentLinks }).map(([label, value]) => (
                <div key={label} className="grid gap-1 border-b border-border/60 pb-3 last:border-0 last:pb-0">
                  <dt className="text-xs uppercase text-muted-foreground">{label}</dt>
                  <dd className="text-sm font-medium break-all flex items-center gap-2">
                    {value}
                    {value.startsWith("http") && (
                      <a href={value} target="_blank" rel="noreferrer" className="text-primary hover:text-primary/80" aria-label={`Abrir ${label}`}>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="h-5 w-5 text-primary" />
              Contatos recentes
            </CardTitle>
            <CardDescription>Últimos registros espelhados com status da sincronização.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(health.recentLeadSync.statusCounts).map(([status, count]) => (
                <div key={status} className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground">{status}</p>
                  <p className="text-2xl font-bold">{count}</p>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {health.recentLeadSync.items.map((lead) => (
                <div key={`${lead.email}-${lead.created_at}`} className="rounded-lg border border-border p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium break-all">{lead.email}</p>
                      <p className="text-xs text-muted-foreground">{lead.source ?? "sem origem"}</p>
                    </div>
                    <Badge variant={lead.ghl_sync_status === "failed" ? "destructive" : "secondary"}>{lead.ghl_sync_status ?? "unknown"}</Badge>
                  </div>
                  <div className="mt-3 grid gap-2 text-xs text-muted-foreground sm:grid-cols-2">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Criado: {formatDate(lead.created_at)}</span>
                    <span className="flex items-center gap-1"><CalendarClock className="h-3 w-3" /> Sync: {formatDate(lead.last_synced_at)}</span>
                  </div>
                  {lead.ghl_error && <p className="mt-2 text-xs text-destructive break-all">{lead.ghl_error}</p>}
                </div>
              ))}
              {health.recentLeadSync.items.length === 0 && (
                <p className="text-sm text-muted-foreground">Nenhum lead recente encontrado.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}