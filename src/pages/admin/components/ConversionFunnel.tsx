import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFunnelData } from "@/hooks/useFunnelData";

interface ConversionFunnelProps {
  filters: {
    startDate: Date;
    endDate: Date;
  };
}

const FUNNEL_STAGES = [
  { key: "visitors", label: "Visitantes", desc: "Todos que visitam o site", color: "#3b82f6" },
  { key: "pageviews", label: "Pageviews", desc: "Visualizações de página", color: "#06b6d4" },
  { key: "leads", label: "Leads", desc: "Contatos qualificados", color: "#22c55e" },
  { key: "agendamentos", label: "Agendamentos", desc: "Demos agendados", color: "#f59e0b" },
  { key: "clientes", label: "Clientes", desc: "Clientes convertidos", color: "#8b5cf6" },
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

  const values = [data.visitors, data.pageviews, data.leads, data.agendamentos, data.clientes];
  const maxValue = Math.max(...values, 1);

  // Calculate percentages relative to visitors (first stage)
  const percentages = values.map((v) => 
    data.visitors > 0 ? Math.round((v / data.visitors) * 100) : 0
  );
  // Ensure first is 100%
  percentages[0] = 100;

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Funil de Conversão</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex gap-4">
          {/* SVG Funnel */}
          <div className="flex-shrink-0">
            <svg width="140" height="280" viewBox="0 0 140 280">
              {/* Funnel layers with curved sides */}
              {FUNNEL_STAGES.map((stage, index) => {
                const totalLayers = FUNNEL_STAGES.length;
                const layerHeight = 50;
                const y = index * layerHeight;
                
                // Calculate widths - wider at top, narrower at bottom
                const topWidthPercent = 1 - (index * 0.18);
                const bottomWidthPercent = 1 - ((index + 1) * 0.18);
                
                const topWidth = 130 * topWidthPercent;
                const bottomWidth = 130 * bottomWidthPercent;
                
                const topX = (140 - topWidth) / 2;
                const bottomX = (140 - bottomWidth) / 2;
                
                // Create curved path
                const curveOffset = 5;
                const path = `
                  M ${topX} ${y}
                  Q ${topX - curveOffset} ${y + layerHeight / 2} ${bottomX} ${y + layerHeight}
                  L ${140 - bottomX} ${y + layerHeight}
                  Q ${140 - topX + curveOffset} ${y + layerHeight / 2} ${140 - topX} ${y}
                  Z
                `;

                return (
                  <path
                    key={stage.key}
                    d={path}
                    fill={stage.color}
                    className="transition-all duration-500"
                  />
                );
              })}
              
              {/* Bottom cone tip */}
              <path
                d="M 47 250 Q 40 265 70 280 Q 100 265 93 250 Z"
                fill="#8b5cf6"
                className="transition-all duration-500"
              />
            </svg>
          </div>

          {/* Labels */}
          <div className="flex flex-col justify-between py-1 flex-1">
            {FUNNEL_STAGES.map((stage, index) => {
              const value = values[index];
              const percent = percentages[index];

              return (
                <div key={stage.key} className="flex items-center gap-2">
                  <span 
                    className="text-sm font-bold min-w-[40px]"
                    style={{ color: stage.color }}
                  >
                    {percent}%
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{stage.label}</p>
                    <p className="text-xs text-muted-foreground">{value.toLocaleString("pt-BR")}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary Metrics */}
        <div className="mt-4 pt-3 border-t border-border grid grid-cols-2 gap-3 text-center">
          <div>
            <p className="text-xs text-muted-foreground">Visitante → Lead</p>
            <p className="text-base font-bold text-primary">
              {data.visitors > 0 ? ((data.leads / data.visitors) * 100).toFixed(1) : 0}%
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Lead → Cliente</p>
            <p className="text-base font-bold text-green-500">
              {data.leads > 0 ? ((data.clientes / data.leads) * 100).toFixed(1) : 0}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversionFunnel;
