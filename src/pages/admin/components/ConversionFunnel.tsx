import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFunnelData } from "@/hooks/useFunnelData";
import { Users, Eye, UserCheck, Calendar, Trophy } from "lucide-react";

interface ConversionFunnelProps {
  filters: {
    startDate: Date;
    endDate: Date;
  };
}

const FUNNEL_STAGES = [
  { key: "visitors", label: "Visitantes", icon: Users, color: "#1e3a5f" },
  { key: "pageviews", label: "Pageviews", icon: Eye, color: "#2d5a87" },
  { key: "leads", label: "Leads", icon: UserCheck, color: "#4a9079" },
  { key: "agendamentos", label: "Agendamentos", icon: Calendar, color: "#6ab193" },
  { key: "clientes", label: "Clientes", icon: Trophy, color: "#8ecfb0" },
];

const ConversionFunnel = ({ filters }: ConversionFunnelProps) => {
  const { data: funnelData, isLoading } = useFunnelData(filters);

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Funil de Conversão</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] flex items-center justify-center">
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

  const values: Record<string, number> = {
    visitors: data.visitors,
    pageviews: data.pageviews,
    leads: data.leads,
    agendamentos: data.agendamentos,
    clientes: data.clientes,
  };

  // Width percentages for each stage (much more dramatic narrowing)
  const widthPercentages = [100, 75, 55, 40, 28];

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Funil de Conversão</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-1">
          {FUNNEL_STAGES.map((stage, index) => {
            const Icon = stage.icon;
            const value = values[stage.key];
            const widthPercent = widthPercentages[index];
            
            return (
              <div 
                key={stage.key} 
                className="flex items-center gap-3 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Funnel Bar - trapezoid shape wider at top, narrower at bottom */}
                <div 
                  className="relative flex items-center justify-between px-4 py-4 transition-all duration-300 hover:opacity-90 mx-auto"
                  style={{ 
                    width: `${widthPercent}%`,
                    backgroundColor: stage.color,
                    clipPath: "polygon(8px 0, calc(100% - 8px) 0, 100% 100%, 0 100%)",
                  }}
                >
                  {/* Icon in white rounded square */}
                  <div className="flex items-center justify-center w-8 h-8 bg-white rounded-lg">
                    <Icon className="h-4 w-4" style={{ color: stage.color }} />
                  </div>
                  {/* Number in white circle */}
                  <span 
                    className="flex items-center justify-center w-7 h-7 rounded-full bg-white font-bold text-sm"
                    style={{ color: stage.color }}
                  >
                    {index + 1}
                  </span>
                </div>

                {/* Connector Line */}
                <div className="flex-1 border-t-2 border-muted-foreground/30 min-w-[20px]" />

                {/* Label and Value */}
                <div className="text-right min-w-[140px]">
                  <p className="text-sm font-semibold text-foreground">{stage.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {value.toLocaleString("pt-BR")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Metrics */}
        <div className="mt-6 pt-4 border-t border-border grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-xs text-muted-foreground">Visitante → Lead</p>
            <p className="text-lg font-bold text-primary">
              {data.visitors > 0 ? ((data.leads / data.visitors) * 100).toFixed(1) : 0}%
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Lead → Cliente</p>
            <p className="text-lg font-bold" style={{ color: "#4a9079" }}>
              {data.leads > 0 ? ((data.clientes / data.leads) * 100).toFixed(1) : 0}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversionFunnel;
