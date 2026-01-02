import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTopPages, AnalyticsFilters } from "@/hooks/useAnalytics";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

interface SiteTabProps {
  filters: AnalyticsFilters;
}

const SiteTab = ({ filters }: SiteTabProps) => {
  const { data: topPages, isLoading } = useTopPages(filters);

  // Mock data for page performance
  const performanceData = [
    { page: "Home", views: 100, time: 85, scroll: 90, bounce: 70 },
    { page: "Produtos", views: 75, time: 70, scroll: 65, bounce: 80 },
    { page: "Blog", views: 60, time: 90, scroll: 85, bounce: 60 },
    { page: "Contato", views: 40, time: 50, scroll: 70, bounce: 75 },
    { page: "Demo", views: 80, time: 95, scroll: 95, bounce: 50 },
  ];

  return (
    <div className="space-y-6">
      {/* Pages Table */}
      <Card>
        <CardHeader>
          <CardTitle>Desempenho de Todas as Páginas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Página</TableHead>
                <TableHead className="text-right">Visualizações</TableHead>
                <TableHead className="text-right">Tempo Médio</TableHead>
                <TableHead className="text-right">Prof. de Scroll</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(topPages || []).map((page) => (
                <TableRow key={page.path}>
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-medium">{page.title || page.path}</div>
                      <div className="text-xs text-muted-foreground">{page.path}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{page.views.toLocaleString()}</TableCell>
                  <TableCell className="text-right">2m 30s</TableCell>
                  <TableCell className="text-right">75%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Entry vs Exit Pages */}
        <Card>
          <CardHeader>
            <CardTitle>Páginas de Entrada vs Saída</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topPages?.slice(0, 5) || []}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="path" tick={{ fontSize: 10 }} className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="views" fill="hsl(var(--chart-1))" name="Entrada" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Page Performance Radar */}
        <Card>
          <CardHeader>
            <CardTitle>Métricas de Desempenho</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={performanceData}>
                  <PolarGrid className="stroke-border" />
                  <PolarAngleAxis dataKey="page" className="text-muted-foreground" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Visualizações"
                    dataKey="views"
                    stroke="hsl(var(--chart-1))"
                    fill="hsl(var(--chart-1))"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name="Engajamento"
                    dataKey="scroll"
                    stroke="hsl(var(--chart-2))"
                    fill="hsl(var(--chart-2))"
                    fillOpacity={0.3}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SiteTab;
