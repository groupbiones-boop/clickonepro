import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFunnelData } from "@/hooks/useFunnelData";
import { Users, Eye, UserPlus, Calendar, Trophy } from "lucide-react";

interface ConversionFunnelProps {
  filters: {
    startDate: Date;
    endDate: Date;
  };
}

const FUNNEL_STAGES = [
  { key: "visitors", label: "Visitantes", icon: Users, color: "hsl(221, 83%, 53%)" },
  { key: "pageviews", label: "Pageviews", icon: Eye, color: "hsl(199, 89%, 48%)" },
  { key: "leads", label: "Leads", icon: UserPlus, color: "hsl(142, 71%, 45%)" },
  { key: "agendamentos", label: "Agendamentos", icon: Calendar, color: "hsl(38, 92%, 50%)" },
  { key: "clientes", label: "Clientes", icon: Trophy, color: "hsl(0, 84%, 60%)" },
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
          <div className="h-[300px] flex items-center justify-center">
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

  // Calculate widths as percentages (min 20% for visibility)
  const widths = values.map((v) => Math.max((v / maxValue) * 100, 20));

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Funil de Conversão</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Funnel Shape */}
        <div className="flex flex-col items-center gap-0">
          {FUNNEL_STAGES.map((stage, index) => {
            const value = values[index];
            const width = widths[index];
            const prevValue = index > 0 ? values[index - 1] : value;
            const conversionRate = prevValue > 0 ? ((value / prevValue) * 100).toFixed(1) : "0";
            const Icon = stage.icon;

            // Create trapezoid shape with clip-path
            const topWidth = index === 0 ? 100 : widths[index - 1];
            const bottomWidth = width;
            const topLeft = (100 - topWidth) / 2;
            const topRight = topLeft + topWidth;
            const bottomLeft = (100 - bottomWidth) / 2;
            const bottomRight = bottomLeft + bottomWidth;

            return (
              <div key={stage.key} className="w-full relative group">
                {/* Trapezoid Layer */}
                <div
                  className="h-14 flex items-center justify-center transition-all duration-500 ease-out relative overflow-hidden"
                  style={{
                    clipPath: `polygon(${topLeft}% 0%, ${topRight}% 0%, ${bottomRight}% 100%, ${bottomLeft}% 100%)`,
                    backgroundColor: stage.color,
                  }}
                >
                  <div className="flex items-center gap-2 text-white z-10">
                    <Icon className="h-4 w-4" />
                    <span className="font-semibold text-sm">{stage.label}</span>
                    <span className="text-xs opacity-90">({value.toLocaleString("pt-BR")})</span>
                  </div>
                </div>

                {/* Conversion Rate Badge (between layers) */}
                {index > 0 && (
                  <div className="absolute -top-2.5 right-4 z-20 bg-background border border-border rounded-full px-2 py-0.5 text-xs font-medium shadow-sm">
                    {conversionRate}%
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary Metrics */}
        <div className="mt-4 pt-3 border-t border-border grid grid-cols-2 gap-3 text-center">
          <div>
            <p className="text-xs text-muted-foreground">Visitante → Lead</p>
            <p className="text-base font-bold text-primary">
              {data.visitors > 0 ? ((data.leads / data.visitors) * 100).toFixed(2) : 0}%
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Lead → Cliente</p>
            <p className="text-base font-bold text-green-500">
              {data.leads > 0 ? ((data.clientes / data.leads) * 100).toFixed(2) : 0}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversionFunnel;
