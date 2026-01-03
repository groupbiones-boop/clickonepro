import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changePercent?: number;
  comparePeriod?: string;
  icon: LucideIcon;
  sparklineData?: { value: number }[];
  format?: "number" | "percent" | "time";
  className?: string;
}

const StatsCard = ({
  title,
  value,
  change,
  changePercent,
  comparePeriod = "vs previous period",
  icon: Icon,
  sparklineData,
  format = "number",
  className,
}: StatsCardProps) => {
  const isPositive = (changePercent || 0) > 0;
  const isNeutral = changePercent === 0;
  const TrendIcon = isNeutral ? Minus : isPositive ? TrendingUp : TrendingDown;

  const formatValue = (val: string | number) => {
    if (typeof val === "string") return val;
    if (format === "percent") return `${val.toFixed(1)}%`;
    if (format === "time") {
      const minutes = Math.floor(val / 60);
      const seconds = val % 60;
      return `${minutes}m ${seconds}s`;
    }
    return val.toLocaleString();
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-3 md:p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 md:gap-2 text-muted-foreground mb-1 md:mb-2">
              <Icon className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
              <span className="text-[11px] md:text-sm font-medium truncate">{title}</span>
            </div>
            <div className="text-lg md:text-3xl font-bold text-foreground mb-1 md:mb-2">
              {formatValue(value)}
            </div>
            {changePercent !== undefined && (
              <div className="flex items-center gap-1 flex-wrap">
                <div
                  className={cn(
                    "flex items-center gap-0.5 md:gap-1 text-[10px] md:text-sm font-medium",
                    isNeutral
                      ? "text-muted-foreground"
                      : isPositive
                      ? "text-chart-4"
                      : "text-destructive"
                  )}
                >
                  <TrendIcon className="h-3 w-3 md:h-4 md:w-4" />
                  <span>
                    {isPositive ? "+" : ""}
                    {changePercent.toFixed(1)}%
                  </span>
                </div>
                <span className="text-[9px] md:text-xs text-muted-foreground truncate hidden md:inline">{comparePeriod}</span>
              </div>
            )}
          </div>
          {sparklineData && sparklineData.length > 0 && (
            <div className="hidden md:block w-24 h-12">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineData}>
                  <defs>
                    <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor={isPositive ? "hsl(var(--chart-2))" : "hsl(var(--destructive))"}
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="100%"
                        stopColor={isPositive ? "hsl(var(--chart-2))" : "hsl(var(--destructive))"}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={isPositive ? "hsl(var(--chart-2))" : "hsl(var(--destructive))"}
                    fill={`url(#gradient-${title})`}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
