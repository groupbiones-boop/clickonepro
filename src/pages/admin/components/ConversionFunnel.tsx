import { forwardRef, useImperativeHandle, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useFunnelData } from "@/hooks/useFunnelData";
import type { FunnelData } from "@/hooks/useFunnelData";
import { Binoculars, Lightbulb, MessageCircle, MousePointer, Trophy } from "lucide-react";
import html2canvas from "html2canvas";

interface ConversionFunnelProps {
  filters: {
    startDate: Date;
    endDate: Date;
  };
}

export interface FunnelRef {
  captureAsImage: () => Promise<string>;
  getData: () => FunnelData | null;
}

const FUNNEL_STAGES = [
  { key: "visitors", label: "Prospecting", icon: Binoculars, color: "#500daa" },
  { key: "pageviews", label: "Outreach", icon: Lightbulb, color: "#6b2fb8" },
  { key: "leads", label: "Discovery & Qualification", icon: MessageCircle, color: "#8651c6" },
  { key: "agendamentos", label: "Demo", icon: MousePointer, color: "#a173d4" },
  { key: "clientes", label: "Closing", icon: Trophy, color: "#bc95e2" },
];

const ConversionFunnel = forwardRef<FunnelRef, ConversionFunnelProps>(({ filters }, ref) => {
  const funnelRef = useRef<HTMLDivElement>(null);
  const { data: funnelData, isLoading } = useFunnelData(filters);

  // Mock data for demonstration when no real data exists
  const mockData: FunnelData = {
    visitors: 2847,
    pageviews: 4521,
    leads: 342,
    agendamentos: 89,
    clientes: 34,
    rates: {
      visitorsToPageviews: 158.7,
      pageviewsToLeads: 7.6,
      leadsToAgendamentos: 26.0,
      agendamentosToClientes: 38.2,
    },
  };

  const hasRealData = funnelData && (funnelData.visitors > 0 || funnelData.leads > 0);
  const data = hasRealData ? funnelData : mockData;

  useImperativeHandle(ref, () => ({
    captureAsImage: async () => {
      if (!funnelRef.current) return "";
      try {
        const canvas = await html2canvas(funnelRef.current, {
          backgroundColor: null,
          scale: 2,
        });
        return canvas.toDataURL("image/png");
      } catch (error) {
        console.error("Error capturing funnel:", error);
        return "";
      }
    },
    getData: () => data,
  }));

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

  const values: Record<string, number> = {
    visitors: data.visitors,
    pageviews: data.pageviews,
    leads: data.leads,
    agendamentos: data.agendamentos,
    clientes: data.clientes,
  };

  // Width percentages for each stage (SaaS funnel narrowing)
  const widthPercentages = [100, 82, 66, 52, 40];

  // Calculate conversion rates between stages
  const getConversionRate = (fromIndex: number): string => {
    if (fromIndex >= FUNNEL_STAGES.length - 1) return "";
    const fromKey = FUNNEL_STAGES[fromIndex].key;
    const toKey = FUNNEL_STAGES[fromIndex + 1].key;
    const fromValue = values[fromKey];
    const toValue = values[toKey];
    if (fromValue === 0) return "0%";
    return `${((toValue / fromValue) * 100).toFixed(1)}%`;
  };

  const getTooltipContent = (index: number): string => {
    if (index >= FUNNEL_STAGES.length - 1) {
      return `${FUNNEL_STAGES[index].label}: ${values[FUNNEL_STAGES[index].key].toLocaleString("pt-BR")} closed deals`;
    }
    const nextStage = FUNNEL_STAGES[index + 1];
    const rate = getConversionRate(index);
    return `${rate} convert to ${nextStage.label}`;
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">The SaaS Sales Funnel</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <TooltipProvider>
          <div ref={funnelRef} className="flex flex-col items-center space-y-2 bg-card p-4 rounded-lg">
            {FUNNEL_STAGES.map((stage, index) => {
              const Icon = stage.icon;
              const value = values[stage.key];
              const widthPercent = widthPercentages[index];
              
              return (
                <div 
                  key={stage.key} 
                  className="flex flex-col items-center w-full opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {/* Funnel Bar - trapezoid shape centered */}
                      <div 
                        className="relative flex items-center justify-between px-4 py-3 transition-all duration-300 hover:opacity-90 hover:scale-[1.02] cursor-pointer"
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
                    </TooltipTrigger>
                    <TooltipContent 
                      side="right" 
                      className="bg-card border border-border shadow-lg"
                    >
                      <div className="text-sm">
                        <p className="font-semibold" style={{ color: stage.color }}>
                          {stage.label}
                        </p>
                        <p className="text-muted-foreground">
                          {value.toLocaleString("pt-BR")} contacts
                        </p>
                        {index < FUNNEL_STAGES.length - 1 && (
                          <p className="mt-1 font-medium" style={{ color: FUNNEL_STAGES[index + 1].color }}>
                            ↓ {getTooltipContent(index)}
                          </p>
                        )}
                      </div>
                    </TooltipContent>
                  </Tooltip>

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
        </TooltipProvider>

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
});

ConversionFunnel.displayName = "ConversionFunnel";

export default ConversionFunnel;
