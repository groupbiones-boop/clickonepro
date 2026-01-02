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
        <div className="flex items-start gap-2">
          {/* Left side - Percentages with "Despesas" labels */}
          <div className="flex flex-col justify-between h-[260px] pt-2 text-right">
            {FUNNEL_STAGES.map((stage, index) => {
              const percent = percentages[index];
              return (
                <div key={stage.key} className="flex flex-col items-end" style={{ height: "48px" }}>
                  <span className="text-sm font-bold text-foreground">{percent}%</span>
                  <span className="text-[10px] text-muted-foreground">Despesas</span>
                </div>
              );
            })}
          </div>

          {/* SVG Funnel - True cone shape */}
          <div className="flex-shrink-0">
            <svg width="120" height="280" viewBox="0 0 120 280">
              {/* Funnel layers with curved 3D effect */}
              {FUNNEL_STAGES.map((stage, index) => {
                const layerHeight = 48;
                const y = index * layerHeight + 5;
                
                // Progressive narrowing
                const topWidth = 110 - (index * 18);
                const bottomWidth = 110 - ((index + 1) * 18);
                
                const topX = (120 - topWidth) / 2;
                const bottomX = (120 - bottomWidth) / 2;
                
                // Curved sides for 3D effect
                const curveDepth = 8;
                const path = `
                  M ${topX} ${y}
                  C ${topX - curveDepth} ${y + layerHeight * 0.5}, ${bottomX - curveDepth} ${y + layerHeight * 0.5}, ${bottomX} ${y + layerHeight}
                  L ${120 - bottomX} ${y + layerHeight}
                  C ${120 - bottomX + curveDepth} ${y + layerHeight * 0.5}, ${120 - topX + curveDepth} ${y + layerHeight * 0.5}, ${120 - topX} ${y}
                  Z
                `;

                return (
                  <path
                    key={stage.key}
                    d={path}
                    fill={stage.color}
                    stroke={stage.color}
                    strokeWidth="0.5"
                    className="transition-all duration-500"
                  />
                );
              })}
              
              {/* Bottom cone tip */}
              <path
                d="M 38 245 C 30 260, 50 278, 60 280 C 70 278, 90 260, 82 245 Z"
                fill="#8b5cf6"
              />
            </svg>
          </div>

          {/* Right side - Labels with descriptions */}
          <div className="flex flex-col justify-between h-[260px] pt-2 flex-1">
            {FUNNEL_STAGES.map((stage, index) => {
              const value = values[index];
              return (
                <div key={stage.key} style={{ height: "48px" }}>
                  <p className="text-sm font-bold text-foreground">{stage.label}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight">
                    {stage.desc} ({value.toLocaleString("pt-BR")})
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary Metrics */}
        <div className="mt-3 pt-3 border-t border-border grid grid-cols-2 gap-3 text-center">
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
