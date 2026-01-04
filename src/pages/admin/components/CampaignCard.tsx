import { format, parseISO, differenceInDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Target,
  Users,
  Eye,
  TrendingUp,
  DollarSign,
  Calendar,
  MoreVertical,
  Pencil,
  Trash2,
  Archive,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Campaign } from "@/hooks/use-campaigns";
import {
  useCampaignAnalytics,
  calculateProgress,
  formatCurrency,
  getProgressStatus,
} from "@/hooks/use-campaign-analytics";
import { cn } from "@/lib/utils";

interface CampaignCardProps {
  campaign: Campaign;
  onEdit: (campaign: Campaign) => void;
  onDelete: (id: string) => void;
  onViewDetails: (campaign: Campaign) => void;
}

export function CampaignCard({
  campaign,
  onEdit,
  onDelete,
  onViewDetails,
}: CampaignCardProps) {
  const { data: analytics } = useCampaignAnalytics({
    lpSlug: campaign.landing_page?.slug,
    startDate: campaign.start_date,
    endDate: campaign.end_date,
  });

  const revenue = (analytics?.conversions || 0) * campaign.avg_conversion_value;

  const metrics = [
    {
      label: "Alcance",
      icon: Target,
      current: analytics?.reach || 0,
      goal: campaign.goal_reach,
    },
    {
      label: "Visitantes",
      icon: Users,
      current: analytics?.visitors || 0,
      goal: campaign.goal_visitors,
    },
    {
      label: "Visualizações",
      icon: Eye,
      current: analytics?.pageviews || 0,
      goal: campaign.goal_pageviews,
    },
    {
      label: "Conversões",
      icon: TrendingUp,
      current: analytics?.conversions || 0,
      goal: campaign.goal_conversions,
    },
  ];

  const statusColors: Record<string, string> = {
    draft: "bg-muted text-muted-foreground",
    active: "bg-primary/20 text-primary",
    completed: "bg-green-500/20 text-green-600",
    archived: "bg-muted text-muted-foreground",
  };

  const statusLabels: Record<string, string> = {
    draft: "Rascunho",
    active: "Ativa",
    completed: "Concluída",
    archived: "Arquivada",
  };

  const daysRemaining = differenceInDays(
    parseISO(campaign.end_date),
    new Date()
  );

  const overallProgress =
    metrics.reduce((acc, m) => acc + calculateProgress(m.current, m.goal), 0) /
    metrics.filter((m) => m.goal).length || 0;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{campaign.name}</CardTitle>
            {campaign.landing_page && (
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <ExternalLink className="h-3 w-3" />
                /lp/{campaign.landing_page.slug}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Badge className={statusColors[campaign.status]}>
              {statusLabels[campaign.status]}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(campaign)}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onViewDetails(campaign)}>
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Detalhes
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete(campaign.id)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Period */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>
            {format(parseISO(campaign.start_date), "dd MMM", { locale: ptBR })} -{" "}
            {format(parseISO(campaign.end_date), "dd MMM yyyy", { locale: ptBR })}
          </span>
          {daysRemaining > 0 && campaign.status === "active" && (
            <Badge variant="outline" className="ml-auto">
              {daysRemaining} dias restantes
            </Badge>
          )}
        </div>

        {/* Overall Progress */}
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progresso Geral</span>
            <span className="font-medium">{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((metric) => {
            const progress = calculateProgress(metric.current, metric.goal);
            const status = getProgressStatus(
              metric.current,
              metric.goal,
              campaign.start_date,
              campaign.end_date
            );

            return (
              <div
                key={metric.label}
                className="p-2 rounded-lg bg-muted/50 space-y-1"
              >
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <metric.icon className="h-3 w-3" />
                  {metric.label}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-semibold">
                    {metric.current.toLocaleString()}
                  </span>
                  {metric.goal && (
                    <span className="text-xs text-muted-foreground">
                      / {metric.goal.toLocaleString()}
                    </span>
                  )}
                </div>
                {metric.goal && (
                  <Progress
                    value={progress}
                    className={cn(
                      "h-1",
                      status === "behind" && "[&>div]:bg-destructive",
                      status === "ahead" && "[&>div]:bg-green-500"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Revenue */}
        {campaign.goal_revenue && (
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Faturamento</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">
                  {formatCurrency(revenue, campaign.currency)}
                </div>
                <div className="text-xs text-muted-foreground">
                  de {formatCurrency(campaign.goal_revenue, campaign.currency)}
                </div>
              </div>
            </div>
            <Progress
              value={calculateProgress(revenue, campaign.goal_revenue)}
              className="h-1.5 mt-2"
            />
          </div>
        )}

        {/* View Details Button */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => onViewDetails(campaign)}
        >
          Ver Dashboard Completo
        </Button>
      </CardContent>
    </Card>
  );
}
