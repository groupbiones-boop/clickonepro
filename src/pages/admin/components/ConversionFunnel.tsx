import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFunnelData } from "@/hooks/useFunnelData";
import { Users, Eye, UserPlus, Calendar, Trophy, ArrowRight } from "lucide-react";

interface ConversionFunnelProps {
  filters: {
    startDate: Date;
    endDate: Date;
  };
}

const FUNNEL_STAGES = [
  { key: "visitors", label: "Visitantes", icon: Users, color: "hsl(266, 86%, 45%)" },
  { key: "pageviews", label: "Pageviews", icon: Eye, color: "hsl(240, 80%, 55%)" },
  { key: "leads", label: "Leads", icon: UserPlus, color: "hsl(210, 80%, 50%)" },
  { key: "agendamentos", label: "Agendamentos", icon: Calendar, color: "hsl(180, 70%, 45%)" },
  { key: "clientes", label: "Clientes", icon: Trophy, color: "hsl(142, 70%, 45%)" },
];

const ConversionFunnel = ({ filters }: ConversionFunnelProps) => {
  const { data: funnelData, isLoading } = useFunnelData(filters);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Funil de Conversão</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">Carregando...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const data = funnelData || {
    visitors: 0,
    pageviews: 0,
    leads: 0,
    agendamentos: 0,
    clientes: 0,
    rates: {
      visitorsToPageviews: 0,
      pageviewsToLeads: 0,
      leadsToAgendamentos: 0,
      agendamentosToClientes: 0,
    },
  };

  const values = [data.visitors, data.pageviews, data.leads, data.agendamentos, data.clientes];
  const maxValue = Math.max(...values, 1);

  const conversionRates = [
    null, // No rate for first stage
    data.rates.visitorsToPageviews,
    data.rates.pageviewsToLeads,
    data.rates.leadsToAgendamentos,
    data.rates.agendamentosToClientes,
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Funil de Conversão Premium
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {FUNNEL_STAGES.map((stage, index) => {
            const value = values[index];
            const percentage = (value / maxValue) * 100;
            const Icon = stage.icon;
            const rate = conversionRates[index];

            return (
              <div key={stage.key} className="relative">
                {/* Conversion rate indicator */}
                {rate !== null && index > 0 && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 flex items-center gap-1 text-xs text-muted-foreground">
                    <ArrowRight className="h-3 w-3" />
                    <span className="font-medium">{rate.toFixed(1)}%</span>
                  </div>
                )}
                
                <div className="flex items-center gap-4">
                  {/* Icon and label */}
                  <div className="flex items-center gap-2 w-32 flex-shrink-0">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${stage.color}20` }}
                    >
                      <Icon className="h-4 w-4" style={{ color: stage.color }} />
                    </div>
                    <span className="text-sm font-medium">{stage.label}</span>
                  </div>

                  {/* Bar */}
                  <div className="flex-1 h-10 bg-muted rounded-lg overflow-hidden relative">
                    <div
                      className="h-full rounded-lg transition-all duration-1000 ease-out flex items-center justify-end pr-3"
                      style={{
                        width: `${Math.max(percentage, 5)}%`,
                        background: `linear-gradient(90deg, ${stage.color}90, ${stage.color})`,
                      }}
                    >
                      <span className="text-sm font-bold text-white drop-shadow-sm">
                        {value.toLocaleString("pt-BR")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary metrics */}
        <div className="mt-6 pt-4 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Visitante → Lead</p>
            <p className="text-lg font-bold text-primary">
              {data.visitors > 0 ? ((data.leads / data.visitors) * 100).toFixed(2) : 0}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Lead → Agendamento</p>
            <p className="text-lg font-bold text-chart-2">
              {data.rates.leadsToAgendamentos.toFixed(1)}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Agendamento → Cliente</p>
            <p className="text-lg font-bold text-chart-4">
              {data.rates.agendamentosToClientes.toFixed(1)}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Taxa Geral</p>
            <p className="text-lg font-bold text-green-500">
              {data.visitors > 0 ? ((data.clientes / data.visitors) * 100).toFixed(2) : 0}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversionFunnel;
