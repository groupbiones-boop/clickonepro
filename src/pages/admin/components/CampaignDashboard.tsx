import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ArrowLeft,
  Target,
  Users,
  Eye,
  TrendingUp,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Campaign } from "@/hooks/use-campaigns";
import {
  useCampaignAnalytics,
  calculateProgress,
  calculateProjection,
  formatCurrency,
  getProgressStatus,
} from "@/hooks/use-campaign-analytics";
import { cn } from "@/lib/utils";

interface CampaignDashboardProps {
  campaign: Campaign;
  onBack: () => void;
}

export function CampaignDashboard({ campaign, onBack }: CampaignDashboardProps) {
  const { data: analytics, isLoading } = useCampaignAnalytics({
    lpSlug: campaign.landing_page?.slug,
    startDate: campaign.start_date,
    endDate: campaign.end_date,
  });

  const revenue = (analytics?.conversions || 0) * campaign.avg_conversion_value;

  const metrics = [
    {
      id: "reach",
      label: "Alcance",
      icon: Target,
      current: analytics?.reach || 0,
      goal: campaign.goal_reach,
      color: "hsl(var(--chart-1))",
    },
    {
      id: "visitors",
      label: "Visitantes",
      icon: Users,
      current: analytics?.visitors || 0,
      goal: campaign.goal_visitors,
      color: "hsl(var(--chart-2))",
    },
    {
      id: "pageviews",
      label: "Visualizações",
      icon: Eye,
      current: analytics?.pageviews || 0,
      goal: campaign.goal_pageviews,
      color: "hsl(var(--chart-3))",
    },
    {
      id: "conversions",
      label: "Conversões",
      icon: TrendingUp,
      current: analytics?.conversions || 0,
      goal: campaign.goal_conversions,
      color: "hsl(var(--chart-4))",
    },
    {
      id: "revenue",
      label: "Faturamento",
      icon: DollarSign,
      current: revenue,
      goal: campaign.goal_revenue,
      color: "hsl(var(--chart-5))",
      isCurrency: true,
    },
  ];

  const getStatusIcon = (status: "on_track" | "behind" | "ahead") => {
    switch (status) {
      case "ahead":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "behind":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-primary" />;
    }
  };

  const getStatusLabel = (status: "on_track" | "behind" | "ahead") => {
    switch (status) {
      case "ahead":
        return "Adiantado";
      case "behind":
        return "Atrasado";
      default:
        return "No ritmo";
    }
  };

  const chartConfig = {
    visitors: { label: "Visitantes", color: "hsl(var(--chart-2))" },
    pageviews: { label: "Visualizações", color: "hsl(var(--chart-3))" },
    conversions: { label: "Conversões", color: "hsl(var(--chart-4))" },
  };

  const chartData = analytics?.timeline.map((day) => ({
    date: format(parseISO(day.date), "dd/MM"),
    visitors: day.visitors,
    pageviews: day.pageviews,
    conversions: day.conversions,
  })) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{campaign.name}</h2>
          <p className="text-muted-foreground">
            {campaign.landing_page && `/lp/${campaign.landing_page.slug} • `}
            {format(parseISO(campaign.start_date), "dd MMM", { locale: ptBR })} -{" "}
            {format(parseISO(campaign.end_date), "dd MMM yyyy", { locale: ptBR })}
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          {campaign.currency}
        </Badge>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {metrics.map((metric) => {
          const progress = calculateProgress(metric.current, metric.goal);
          const status = getProgressStatus(
            metric.current,
            metric.goal,
            campaign.start_date,
            campaign.end_date
          );
          const projection = calculateProjection(
            metric.current,
            campaign.start_date,
            campaign.end_date
          );

          return (
            <Card key={metric.id}>
              <CardContent className="pt-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${metric.color}20` }}
                  >
                    <metric.icon
                      className="h-4 w-4"
                      style={{ color: metric.color }}
                    />
                  </div>
                  <span className="text-sm font-medium">{metric.label}</span>
                </div>

                <div>
                  <div className="text-2xl font-bold">
                    {metric.isCurrency
                      ? formatCurrency(metric.current, campaign.currency)
                      : metric.current.toLocaleString()}
                  </div>
                  {metric.goal && (
                    <div className="text-sm text-muted-foreground">
                      de{" "}
                      {metric.isCurrency
                        ? formatCurrency(metric.goal, campaign.currency)
                        : metric.goal.toLocaleString()}
                    </div>
                  )}
                </div>

                {metric.goal && (
                  <>
                    <Progress
                      value={progress}
                      className={cn(
                        "h-2",
                        status === "behind" && "[&>div]:bg-destructive",
                        status === "ahead" && "[&>div]:bg-green-500"
                      )}
                    />
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {Math.round(progress)}%
                      </span>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(status)}
                        <span
                          className={cn(
                            status === "behind" && "text-destructive",
                            status === "ahead" && "text-green-500"
                          )}
                        >
                          {getStatusLabel(status)}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Evolution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Evolução do Funil</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Carregando dados...
            </div>
          ) : chartData.length > 0 ? (
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  className="text-xs"
                />
                <YAxis tickLine={false} axisLine={false} className="text-xs" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="pageviews"
                  stackId="1"
                  stroke="hsl(var(--chart-3))"
                  fill="hsl(var(--chart-3))"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  stackId="2"
                  stroke="hsl(var(--chart-2))"
                  fill="hsl(var(--chart-2))"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="conversions"
                  stackId="3"
                  stroke="hsl(var(--chart-4))"
                  fill="hsl(var(--chart-4))"
                  fillOpacity={0.5}
                />
              </AreaChart>
            </ChartContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Nenhum dado disponível para o período
            </div>
          )}
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Comparativo de Metas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Métrica</TableHead>
                <TableHead className="text-right">Meta</TableHead>
                <TableHead className="text-right">Atual</TableHead>
                <TableHead className="text-right">% Atingido</TableHead>
                <TableHead className="text-right">Projeção Final</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {metrics
                .filter((m) => m.goal)
                .map((metric) => {
                  const progress = calculateProgress(metric.current, metric.goal);
                  const status = getProgressStatus(
                    metric.current,
                    metric.goal,
                    campaign.start_date,
                    campaign.end_date
                  );
                  const projection = calculateProjection(
                    metric.current,
                    campaign.start_date,
                    campaign.end_date
                  );

                  const formatValue = (val: number) =>
                    metric.isCurrency
                      ? formatCurrency(val, campaign.currency)
                      : val.toLocaleString();

                  return (
                    <TableRow key={metric.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <metric.icon className="h-4 w-4 text-muted-foreground" />
                          {metric.label}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatValue(metric.goal!)}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatValue(metric.current)}
                      </TableCell>
                      <TableCell className="text-right">
                        {Math.round(progress)}%
                      </TableCell>
                      <TableCell
                        className={cn(
                          "text-right font-medium",
                          projection >= (metric.goal || 0)
                            ? "text-green-600"
                            : "text-destructive"
                        )}
                      >
                        {formatValue(projection)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-1">
                          {getStatusIcon(status)}
                          <span className="text-sm">{getStatusLabel(status)}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
