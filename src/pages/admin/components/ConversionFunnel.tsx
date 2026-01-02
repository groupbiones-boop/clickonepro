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

  // Width percentages for each stage (decreasing)
  const widthPercentages = [100, 85, 70, 55, 40];

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Funil de Conversão</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
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
                {/* Funnel Bar with Icon */}
                <div 
                  className="relative flex items-center justify-between px-4 py-3 rounded-r-full transition-all duration-300 hover:opacity-90"
                  style={{ 
                    width: `${widthPercent}%`,
                    backgroundColor: stage.color,
                    clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)",
                  }}
                >
                  <Icon className="h-5 w-5 text-white" />
                  <span className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center w-7 h-7 rounded-full bg-white/20 text-white font-bold text-sm">
                    {index + 1}
                  </span>
                </div>

                {/* Connector Line */}
                <div className="flex-1 border-t-2 border-dashed border-muted-foreground/30 min-w-[20px]" />

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
