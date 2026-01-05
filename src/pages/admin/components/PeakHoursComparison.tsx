import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  Legend,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePeakHoursComparison } from "@/hooks/usePeakHoursComparison";
import { useSitePages } from "@/hooks/useSitePages";
import { X, Plus, TrendingUp, Clock, Lightbulb, Loader2 } from "lucide-react";

const COMPARISON_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
];

const PeakHoursComparison = () => {
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const { data: sitePages, isLoading: loadingPages } = useSitePages();
  const { data: comparisonData, isLoading: loadingComparison } =
    usePeakHoursComparison(selectedPages);

  const handleAddPage = (path: string) => {
    if (path && !selectedPages.includes(path) && selectedPages.length < 4) {
      setSelectedPages([...selectedPages, path]);
    }
  };

  const handleRemovePage = (path: string) => {
    setSelectedPages(selectedPages.filter((p) => p !== path));
  };

  // Prepare chart data
  const chartData = Array.from({ length: 24 }, (_, hour) => {
    const dataPoint: Record<string, number | string> = {
      hour: `${hour.toString().padStart(2, "0")}:00`,
      hourNum: hour,
    };
    comparisonData?.pageData.forEach((page) => {
      const hourData = page.hourlyDistribution.find((h) => h.hour === hour);
      dataPoint[page.path] = hourData?.count || 0;
    });
    return dataPoint;
  });

  const availablePages =
    sitePages?.filter((p) => !selectedPages.includes(p.path)) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Comparativo de Horários de Pico
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Page Selector */}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Selecione até 4 páginas para comparar:
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedPages.map((path, index) => (
              <Badge
                key={path}
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1"
                style={{
                  borderColor: COMPARISON_COLORS[index],
                  borderWidth: 2,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: COMPARISON_COLORS[index] }}
                />
                {path}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                  onClick={() => handleRemovePage(path)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
            {selectedPages.length < 4 && (
              <Select onValueChange={handleAddPage} value="">
                <SelectTrigger className="w-[200px]">
                  <div className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    <SelectValue placeholder="Adicionar página" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {loadingPages ? (
                    <SelectItem value="loading" disabled>
                      Carregando...
                    </SelectItem>
                  ) : availablePages.length === 0 ? (
                    <SelectItem value="empty" disabled>
                      Nenhuma página disponível
                    </SelectItem>
                  ) : (
                    availablePages.map((page) => (
                      <SelectItem key={page.path} value={page.path}>
                        {page.path} ({page.visits} visitas)
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        {selectedPages.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Selecione páginas para comparar os horários de pico</p>
          </div>
        ) : loadingComparison ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <>
            {/* Line Chart */}
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis
                    dataKey="hour"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    interval={2}
                  />
                  <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  {comparisonData?.pageData.map((page, index) => (
                    <Line
                      key={page.path}
                      type="monotone"
                      dataKey={page.path}
                      stroke={COMPARISON_COLORS[index]}
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                  ))}
                  {/* Peak markers */}
                  {comparisonData?.pageData.map((page, index) => (
                    <ReferenceDot
                      key={`peak-${page.path}`}
                      x={`${page.peakHour.hour.toString().padStart(2, "0")}:00`}
                      y={page.peakHour.count}
                      r={8}
                      fill={COMPARISON_COLORS[index]}
                      stroke="hsl(var(--background))"
                      strokeWidth={2}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Comparison Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Página</TableHead>
                    <TableHead>Pico</TableHead>
                    <TableHead>Visitas</TableHead>
                    <TableHead>Menor Ativ.</TableHead>
                    <TableHead>Dif. Pico</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonData?.pageData.map((page, index) => {
                    const firstPeak =
                      comparisonData.pageData[0]?.peakHour.hour || 0;
                    const diff = page.peakHour.hour - firstPeak;
                    return (
                      <TableRow key={page.path}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-3 h-3 rounded-full"
                              style={{
                                backgroundColor: COMPARISON_COLORS[index],
                              }}
                            />
                            {page.path}
                          </div>
                        </TableCell>
                        <TableCell>
                          {page.peakHour.hour.toString().padStart(2, "0")}:00
                        </TableCell>
                        <TableCell>{page.totalVisits}</TableCell>
                        <TableCell>
                          {page.lowestHour.hour.toString().padStart(2, "0")}:00
                        </TableCell>
                        <TableCell>
                          {index === 0
                            ? "-"
                            : diff === 0
                              ? "mesmo horário"
                              : `${diff > 0 ? "+" : ""}${diff}h`}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Insights */}
            {comparisonData?.insights && comparisonData.insights.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                  Insights Automáticos
                </h4>
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  {comparisonData.insights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-muted-foreground">•</span>
                      <p className="text-sm">{insight.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PeakHoursComparison;
