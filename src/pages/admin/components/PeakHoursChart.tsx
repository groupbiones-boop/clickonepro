import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Flame, Moon } from "lucide-react";
import { useVisitorHistory } from "@/hooks/useVisitorHistory";
import { useSitePages } from "@/hooks/useSitePages";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function PeakHoursChart() {
  const [pageFilter, setPageFilter] = useState<string>("all");
  const { data: historyData, isLoading } = useVisitorHistory(pageFilter);
  const { data: sitePages } = useSitePages();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Horário de Pico - Últimas 24h
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">Carregando gráfico...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = historyData?.hourlyDistribution || [];
  const peakHour = historyData?.peakHour;
  const lowestHour = historyData?.lowestHour;

  const getBarColor = (hour: number): string => {
    if (peakHour && hour === peakHour.hour) {
      return "hsl(var(--chart-3))"; // Orange/yellow for peak
    }
    if (lowestHour && hour === lowestHour.hour) {
      return "hsl(var(--muted-foreground))"; // Gray for lowest
    }
    return "hsl(var(--primary))"; // Primary for normal
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Horário de Pico - Últimas 24h
          </CardTitle>
          <div className="flex items-center gap-2">
            <Select value={pageFilter} onValueChange={setPageFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filtrar por página" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as páginas</SelectItem>
                {sitePages?.slice(0, 20).map((page) => (
                  <SelectItem key={page.path} value={page.path}>
                    {page.path} ({page.visits})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 || historyData?.totalVisits === 0 ? (
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            Nenhuma atividade nas últimas 24 horas
          </div>
        ) : (
          <>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
                  <XAxis 
                    dataKey="hour" 
                    tickFormatter={(hour) => `${hour}h`}
                    tick={{ fontSize: 11 }}
                    interval={1}
                  />
                  <YAxis 
                    tick={{ fontSize: 11 }}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value} visitas`, "Visitantes"]}
                    labelFormatter={(hour) => `${String(hour).padStart(2, "0")}:00 - ${String(hour).padStart(2, "0")}:59`}
                  />
                  <Bar 
                    dataKey="count" 
                    radius={[4, 4, 0, 0]}
                  >
                    {chartData.map((entry) => (
                      <Cell 
                        key={`cell-${entry.hour}`} 
                        fill={getBarColor(entry.hour)}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Peak and lowest indicators */}
            <div className="flex flex-wrap items-center justify-between mt-4 gap-4 text-sm">
              {peakHour && peakHour.count > 0 && (
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-chart-3" />
                  <span>
                    <strong>Horário de Pico:</strong>{" "}
                    {peakHour.hour.toString().padStart(2, "0")}:00 - {peakHour.hour.toString().padStart(2, "0")}:59{" "}
                    <span className="text-muted-foreground">({peakHour.count} visitantes)</span>
                  </span>
                </div>
              )}
              {lowestHour && (
                <div className="flex items-center gap-2">
                  <Moon className="h-4 w-4 text-muted-foreground" />
                  <span>
                    <strong>Menor Atividade:</strong>{" "}
                    {lowestHour.hour.toString().padStart(2, "0")}:00 - {lowestHour.hour.toString().padStart(2, "0")}:59{" "}
                    <span className="text-muted-foreground">({lowestHour.count} visitantes)</span>
                  </span>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
