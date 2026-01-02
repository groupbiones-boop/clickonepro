import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useReportExport } from "@/hooks/useReportExport";
import { Download, FileSpreadsheet, FileText, Loader2 } from "lucide-react";

// Local interface to avoid circular dependencies
interface ExportDataLocal {
  filters: { startDate: Date; endDate: Date };
  funnel: {
    visitors: number;
    pageviews: number;
    leads: number;
    agendamentos: number;
    clientes: number;
    rates?: {
      visitorsToPageviews: number;
      pageviewsToLeads: number;
      leadsToAgendamentos: number;
      agendamentosToClientes: number;
    };
  };
  funnelImage?: string;
  visitors: number;
  pageviews: number;
  leads: number;
  conversionRate: number;
  topPages: Array<{ path: string; title?: string; views: number }>;
  deviceStats: Array<{ name: string; value: number }>;
}

interface ExportSections {
  funnel: boolean;
  kpis: boolean;
  topPages: boolean;
  devices: boolean;
}

interface ExportReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exportData: ExportDataLocal | null;
}

const ExportReportDialog = ({ open, onOpenChange, exportData }: ExportReportDialogProps) => {
  const { toast } = useToast();
  const { generatePDF, generateExcel } = useReportExport();
  const [format, setFormat] = useState<"pdf" | "excel">("pdf");
  const [isExporting, setIsExporting] = useState(false);
  const [sections, setSections] = useState<ExportSections>({
    funnel: true,
    kpis: true,
    topPages: true,
    devices: true,
  });

  const handleSectionChange = (key: keyof ExportSections) => {
    setSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleExport = async () => {
    if (!exportData) {
      toast({
        title: "Erro ao exportar",
        description: "Dados do relatório não disponíveis.",
        variant: "destructive",
      });
      return;
    }

    if (!Object.values(sections).some(Boolean)) {
      toast({
        title: "Selecione ao menos uma seção",
        description: "É necessário incluir pelo menos uma seção no relatório.",
        variant: "destructive",
      });
      return;
    }

    setIsExporting(true);
    try {
      if (format === "pdf") {
        await generatePDF(exportData, sections);
      } else {
        await generateExcel(exportData, sections);
      }
      
      toast({
        title: "Relatório exportado",
        description: `O arquivo ${format.toUpperCase()} foi baixado com sucesso.`,
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "Erro ao exportar",
        description: "Ocorreu um erro ao gerar o relatório. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Exportar Relatório
          </DialogTitle>
          <DialogDescription>
            Escolha o formato e as seções que deseja incluir no relatório.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Format Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Formato</Label>
            <RadioGroup
              value={format}
              onValueChange={(value) => setFormat(value as "pdf" | "excel")}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf" className="flex items-center gap-2 cursor-pointer">
                  <FileText className="h-4 w-4 text-destructive" />
                  PDF
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="excel" id="excel" />
                <Label htmlFor="excel" className="flex items-center gap-2 cursor-pointer">
                  <FileSpreadsheet className="h-4 w-4 text-green-600" />
                  Excel
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Sections Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Seções a incluir</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="funnel"
                  checked={sections.funnel}
                  onCheckedChange={() => handleSectionChange("funnel")}
                />
                <Label htmlFor="funnel" className="cursor-pointer">
                  Métricas do Funil {format === "pdf" && "(com gráfico)"}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="kpis"
                  checked={sections.kpis}
                  onCheckedChange={() => handleSectionChange("kpis")}
                />
                <Label htmlFor="kpis" className="cursor-pointer">
                  Resumo de KPIs
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="topPages"
                  checked={sections.topPages}
                  onCheckedChange={() => handleSectionChange("topPages")}
                />
                <Label htmlFor="topPages" className="cursor-pointer">
                  Top Páginas
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="devices"
                  checked={sections.devices}
                  onCheckedChange={() => handleSectionChange("devices")}
                />
                <Label htmlFor="devices" className="cursor-pointer">
                  Dispositivos
                </Label>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isExporting}>
            Cancelar
          </Button>
          <Button onClick={handleExport} disabled={isExporting}>
            {isExporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Exportando...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Exportar {format.toUpperCase()}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportReportDialog;
