import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFunnelData } from "@/hooks/useFunnelData";
import { Binoculars, Lightbulb, MessageCircle, MousePointer, Trophy } from "lucide-react";

interface ConversionFunnelProps {
  filters: {
    startDate: Date;
    endDate: Date;
  };
}

const FUNNEL_STAGES = [
  { key: "visitors", label: "Prospecting", icon: Binoculars, color: "#500daa" },
  { key: "pageviews", label: "Outreach", icon: Lightbulb, color: "#6b2fb8" },
  { key: "leads", label: "Discovery & Qualification", icon: MessageCircle, color: "#8651c6" },
  { key: "agendamentos", label: "Demo", icon: MousePointer, color: "#a173d4" },
  { key: "clientes", label: "Closing", icon: Trophy, color: "#bc95e2" },
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

  // Width percentages for each stage (SaaS funnel narrowing)
  const widthPercentages = [100, 82, 66, 52, 40];

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">The SaaS Sales Funnel</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col items-center space-y-2">
          {FUNNEL_STAGES.map((stage, index) => {
            const Icon = stage.icon;
            const value = values[stage.key];
            const widthPercent = widthPercentages[index];
            
            return (
              <div 
                key={stage.key} 
                className="flex flex-col items-center w-full opacity-0 animate-[fade-in_0.5s_ease-out_forwards]"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Funnel Bar - trapezoid shape centered */}
                <div 
                  className="relative flex items-center justify-between px-4 py-3 transition-all duration-300 hover:opacity-90"
                  style={{ 
                    width: `${widthPercent}%`,
                    backgroundColor: stage.color,
                    clipPath: "polygon(4% 0, 96% 0, 100% 100%, 0 100%)",
                  }}
                >
                  {/* Icon in white rounded square */}
                  <div className="flex items-center justify-center w-7 h-7 bg-white rounded-md">
                    <Icon className="h-4 w-4" style={{ color: stage.color }} />
                  </div>
                  {/* Number in white circle */}
                  <span 
                    className="flex items-center justify-center w-6 h-6 rounded-full bg-white font-bold text-xs"
                    style={{ color: stage.color }}
                  >
                    {index + 1}
                  </span>
                </div>

                {/* Label and Value below bar */}
                <div className="text-center mt-1">
                  <p className="text-xs font-semibold" style={{ color: stage.color }}>
                    {stage.label} ({value.toLocaleString("pt-BR")})
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Metrics */}
        <div className="mt-6 pt-4 border-t border-border grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-xs text-muted-foreground">Prospect → Qualified</p>
            <p className="text-lg font-bold" style={{ color: "#500daa" }}>
              {data.visitors > 0 ? ((data.leads / data.visitors) * 100).toFixed(1) : 0}%
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Demo → Closed</p>
            <p className="text-lg font-bold" style={{ color: "#a173d4" }}>
              {data.leads > 0 ? ((data.clientes / data.leads) * 100).toFixed(1) : 0}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversionFunnel;
