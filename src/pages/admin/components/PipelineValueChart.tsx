import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { usePipelineTimeline } from "@/hooks/use-pipeline-timeline";
import { DollarSign, TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface PipelineValueChartProps {
  filters: {
    startDate: Date;
    endDate: Date;
  };
  baseValueUSD: number;
  onBaseValueChange: (value: number) => void;
}

const formatCurrency = (value: number): string => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${Math.round(value / 1000)}K`;
  }
  return `$${value}`;
};

interface ComparisonIndicatorProps {
  current: number;
  previous: number;
  changePercent: number;
  format?: "number" | "currency";
}

const ComparisonIndicator = ({ current, previous, changePercent, format = "number" }: ComparisonIndicatorProps) => {
  const isPositive = changePercent > 0;
  const isNeutral = changePercent === 0;
  
  const formatVal = (val: number) => {
    if (format === "currency") return formatCurrency(val);
    return val.toLocaleString("pt-BR");
  };

  const Icon = isNeutral ? Minus : isPositive ? TrendingUp : TrendingDown;
  const colorClass = isNeutral ? "text-muted-foreground" : isPositive ? "text-green-600" : "text-destructive";

  return (
    <div className="flex flex-col items-center">
      <div className={`flex items-center gap-1 text-[10px] ${colorClass}`}>
        <Icon className="h-3 w-3" />
        <span>
          {isPositive ? "+" : ""}{changePercent.toFixed(1)}%
        </span>
      </div>
      <p className="text-[9px] text-muted-foreground">
        vs {formatVal(previous)}
      </p>
    </div>
  );
};

const PipelineValueChart = ({ filters, baseValueUSD, onBaseValueChange }: PipelineValueChartProps) => {
  const { data, isLoading } = usePipelineTimeline(filters, baseValueUSD);

  const timelineData = data?.timeline || [];
  const comparison = data?.comparison;

  // Calculate growth within the current period
  const firstValue = timelineData[0]?.valor || 0;
  const lastValue = timelineData[timelineData.length - 1]?.valor || 0;
  const growth = firstValue > 0 ? ((lastValue - firstValue) / firstValue) * 100 : 0;

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Evolução do Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">Carregando...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base md:text-lg">Evolução do Pipeline</CardTitle>
            {growth !== 0 && (
              <div className={`flex items-center gap-1 text-xs ${growth >= 0 ? "text-green-600" : "text-destructive"}`}>
                <TrendingUp className={`h-3 w-3 ${growth < 0 ? "rotate-180" : ""}`} />
                {growth >= 0 ? "+" : ""}{growth.toFixed(1)}%
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Valor/Lead:</span>
            <Input
              type="number"
              value={baseValueUSD}
              onChange={(e) => onBaseValueChange(Number(e.target.value) || 0)}
              className="w-20 h-7 text-xs text-right"
              min={0}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timelineData}>
              <defs>
                <linearGradient id="pipelineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="date" 
                className="text-xs"
                tick={{ fontSize: 10 }}
              />
              <YAxis 
                className="text-xs"
                tickFormatter={formatCurrency}
                tick={{ fontSize: 10 }}
              />
              <Tooltip
                formatter={(value: number) => [
                  value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }),
                  "Valor do Pipeline"
                ]}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="valor"
                name="Valor do Pipeline"
                stroke="#22c55e"
                fill="url(#pipelineGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Summary stats with comparison */}
        <div className="mt-4 pt-3 border-t border-border grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-[10px] md:text-xs text-muted-foreground">Leads</p>
            <p className="text-sm md:text-base font-bold text-primary">
              {comparison?.currentLeads || timelineData[timelineData.length - 1]?.leads || 0}
            </p>
            {comparison && (
              <ComparisonIndicator
                current={comparison.currentLeads}
                previous={comparison.previousLeads}
                changePercent={comparison.leadsChangePercent}
              />
            )}
          </div>
          <div>
            <p className="text-[10px] md:text-xs text-muted-foreground">Agendamentos</p>
            <p className="text-sm md:text-base font-bold text-primary">
              {comparison?.currentAgendamentos || timelineData[timelineData.length - 1]?.agendamentos || 0}
            </p>
            {comparison && (
              <ComparisonIndicator
                current={comparison.currentAgendamentos}
                previous={comparison.previousAgendamentos}
                changePercent={comparison.agendamentosChangePercent}
              />
            )}
          </div>
          <div>
            <p className="text-[10px] md:text-xs text-muted-foreground">Valor Total</p>
            <p className="text-sm md:text-base font-bold text-green-600">
              {formatCurrency(comparison?.currentValue || lastValue)}
            </p>
            {comparison && (
              <ComparisonIndicator
                current={comparison.currentValue}
                previous={comparison.previousValue}
                changePercent={comparison.valueChangePercent}
                format="currency"
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PipelineValueChart;
