import { useState, useEffect } from "react";
import { format, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Campaign, CampaignFormData, useLandingPages } from "@/hooks/use-campaigns";

const QUICK_PERIODS = [
  { label: "7 dias", days: 7 },
  { label: "14 dias", days: 14 },
  { label: "30 dias", days: 30 },
  { label: "60 dias", days: 60 },
  { label: "90 dias", days: 90 },
  { label: "6 meses", days: 180 },
  { label: "1 ano", days: 365 },
];

interface CampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaign?: Campaign | null;
  onSave: (data: CampaignFormData) => void;
  isLoading?: boolean;
}

export function CampaignDialog({
  open,
  onOpenChange,
  campaign,
  onSave,
  isLoading,
}: CampaignDialogProps) {
  const { data: landingPages } = useLandingPages();
  const [formData, setFormData] = useState<CampaignFormData>({
    name: "",
    landing_page_id: null,
    start_date: format(new Date(), "yyyy-MM-dd"),
    end_date: format(addDays(new Date(), 30), "yyyy-MM-dd"),
    currency: "USD",
    goal_reach: null,
    goal_visitors: null,
    goal_pageviews: null,
    goal_conversions: null,
    goal_revenue: null,
    avg_conversion_value: 497,
    status: "active",
  });

  useEffect(() => {
    if (campaign) {
      setFormData({
        name: campaign.name,
        landing_page_id: campaign.landing_page_id,
        start_date: campaign.start_date,
        end_date: campaign.end_date,
        currency: campaign.currency,
        goal_reach: campaign.goal_reach,
        goal_visitors: campaign.goal_visitors,
        goal_pageviews: campaign.goal_pageviews,
        goal_conversions: campaign.goal_conversions,
        goal_revenue: campaign.goal_revenue,
        avg_conversion_value: campaign.avg_conversion_value,
        status: campaign.status,
      });
    } else {
      setFormData({
        name: "",
        landing_page_id: null,
        start_date: format(new Date(), "yyyy-MM-dd"),
        end_date: format(addDays(new Date(), 30), "yyyy-MM-dd"),
        currency: "USD",
        goal_reach: null,
        goal_visitors: null,
        goal_pageviews: null,
        goal_conversions: null,
        goal_revenue: null,
        avg_conversion_value: 497,
        status: "active",
      });
    }
  }, [campaign, open]);

  const handleQuickPeriod = (days: number) => {
    const start = new Date();
    const end = addDays(start, days);
    setFormData((prev) => ({
      ...prev,
      start_date: format(start, "yyyy-MM-dd"),
      end_date: format(end, "yyyy-MM-dd"),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const updateField = <K extends keyof CampaignFormData>(
    field: K,
    value: CampaignFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {campaign ? "Editar Campanha" : "Nova Campanha"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="name">Nome da Campanha</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Ex: Campanha Janeiro 2025"
                required
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="landing_page">Landing Page Vinculada</Label>
              <Select
                value={formData.landing_page_id || "none"}
                onValueChange={(v) =>
                  updateField("landing_page_id", v === "none" ? null : v)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma LP" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Nenhuma (todas as LPs)</SelectItem>
                  {landingPages?.map((lp) => (
                    <SelectItem key={lp.id} value={lp.id}>
                      {lp.name} ({lp.slug})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Period */}
          <div className="space-y-3">
            <Label>Período da Campanha</Label>
            <div className="flex flex-wrap gap-2">
              {QUICK_PERIODS.map((period) => (
                <Button
                  key={period.days}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickPeriod(period.days)}
                >
                  {period.label}
                </Button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Data Início</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.start_date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.start_date
                        ? format(new Date(formData.start_date), "dd/MM/yyyy", {
                            locale: ptBR,
                          })
                        : "Selecione"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={
                        formData.start_date
                          ? new Date(formData.start_date)
                          : undefined
                      }
                      onSelect={(date) =>
                        date && updateField("start_date", format(date, "yyyy-MM-dd"))
                      }
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Data Fim</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.end_date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.end_date
                        ? format(new Date(formData.end_date), "dd/MM/yyyy", {
                            locale: ptBR,
                          })
                        : "Selecione"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={
                        formData.end_date
                          ? new Date(formData.end_date)
                          : undefined
                      }
                      onSelect={(date) =>
                        date && updateField("end_date", format(date, "yyyy-MM-dd"))
                      }
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Currency */}
          <div className="flex items-center gap-4">
            <Label>Moeda</Label>
            <div className="flex rounded-lg border overflow-hidden">
              <Button
                type="button"
                variant={formData.currency === "USD" ? "default" : "ghost"}
                size="sm"
                className="rounded-none"
                onClick={() => updateField("currency", "USD")}
              >
                <DollarSign className="h-4 w-4 mr-1" />
                USD
              </Button>
              <Button
                type="button"
                variant={formData.currency === "BRL" ? "default" : "ghost"}
                size="sm"
                className="rounded-none"
                onClick={() => updateField("currency", "BRL")}
              >
                R$ BRL
              </Button>
            </div>
          </div>

          {/* Goals */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Metas</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="goal_reach">Alcance</Label>
                <Input
                  id="goal_reach"
                  type="number"
                  value={formData.goal_reach || ""}
                  onChange={(e) =>
                    updateField(
                      "goal_reach",
                      e.target.value ? Number(e.target.value) : null
                    )
                  }
                  placeholder="Ex: 10000"
                />
              </div>
              <div>
                <Label htmlFor="goal_visitors">Visitantes Únicos</Label>
                <Input
                  id="goal_visitors"
                  type="number"
                  value={formData.goal_visitors || ""}
                  onChange={(e) =>
                    updateField(
                      "goal_visitors",
                      e.target.value ? Number(e.target.value) : null
                    )
                  }
                  placeholder="Ex: 5000"
                />
              </div>
              <div>
                <Label htmlFor="goal_pageviews">Visualizações</Label>
                <Input
                  id="goal_pageviews"
                  type="number"
                  value={formData.goal_pageviews || ""}
                  onChange={(e) =>
                    updateField(
                      "goal_pageviews",
                      e.target.value ? Number(e.target.value) : null
                    )
                  }
                  placeholder="Ex: 15000"
                />
              </div>
              <div>
                <Label htmlFor="goal_conversions">Conversões</Label>
                <Input
                  id="goal_conversions"
                  type="number"
                  value={formData.goal_conversions || ""}
                  onChange={(e) =>
                    updateField(
                      "goal_conversions",
                      e.target.value ? Number(e.target.value) : null
                    )
                  }
                  placeholder="Ex: 100"
                />
              </div>
              <div>
                <Label htmlFor="goal_revenue">
                  Meta de Faturamento ({formData.currency === "BRL" ? "R$" : "$"})
                </Label>
                <Input
                  id="goal_revenue"
                  type="number"
                  step="0.01"
                  value={formData.goal_revenue || ""}
                  onChange={(e) =>
                    updateField(
                      "goal_revenue",
                      e.target.value ? Number(e.target.value) : null
                    )
                  }
                  placeholder="Ex: 50000"
                />
              </div>
              <div>
                <Label htmlFor="avg_conversion_value">
                  Valor Médio por Conversão ({formData.currency === "BRL" ? "R$" : "$"})
                </Label>
                <Input
                  id="avg_conversion_value"
                  type="number"
                  step="0.01"
                  value={formData.avg_conversion_value}
                  onChange={(e) =>
                    updateField("avg_conversion_value", Number(e.target.value) || 497)
                  }
                  placeholder="Ex: 497"
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(v) => updateField("status", v as CampaignFormData["status"])}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Rascunho</SelectItem>
                <SelectItem value="active">Ativa</SelectItem>
                <SelectItem value="completed">Concluída</SelectItem>
                <SelectItem value="archived">Arquivada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : campaign ? "Atualizar" : "Criar Campanha"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
