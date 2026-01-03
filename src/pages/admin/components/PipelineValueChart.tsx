import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePipelineTimeline } from "@/hooks/use-pipeline-timeline";
import { DollarSign, TrendingUp, TrendingDown, Minus, Download, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";
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
  const chartRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const { data, isLoading } = usePipelineTimeline(filters, baseValueUSD);

  const timelineData = data?.timeline || [];
  const comparison = data?.comparison;

  // Calculate growth within the current period
  const firstValue = timelineData[0]?.valor || 0;
  const lastValue = timelineData[timelineData.length - 1]?.valor || 0;
  const growth = firstValue > 0 ? ((lastValue - firstValue) / firstValue) * 100 : 0;

  const formatDateRange = () => {
    return `${format(filters.startDate, "dd/MM/yyyy", { locale: ptBR })} - ${format(filters.endDate, "dd/MM/yyyy", { locale: ptBR })}`;
  };

  const exportToPDF = async () => {
    if (!comparison) return;
    
    setIsExporting(true);
    try {
      const doc = new jsPDF();
      let yPosition = 20;

      // Header
      doc.setFontSize(20);
      doc.setTextColor(34, 197, 94); // Green
      doc.text("Relatório do Pipeline", 20, yPosition);
      yPosition += 10;
      
      doc.setFontSize(14);
      doc.setTextColor(80, 13, 170); // Purple
      doc.text("ClickOne AI", 20, yPosition);
      yPosition += 10;

      // Período
      doc.setFontSize(11);
      doc.setTextColor(100, 100, 100);
      doc.text(`Período: ${formatDateRange()}`, 20, yPosition);
      doc.text(`Valor base por lead: $${baseValueUSD}`, 20, yPosition + 6);
      yPosition += 20;

      // Capture chart as image
      if (chartRef.current) {
        try {
          const canvas = await html2canvas(chartRef.current, {
            backgroundColor: "#ffffff",
            scale: 2,
          });
          const chartImage = canvas.toDataURL("image/png");
          doc.addImage(chartImage, "PNG", 15, yPosition, 180, 90);
          yPosition += 100;
        } catch (error) {
          console.error("Error capturing chart:", error);
        }
      }

      // Resumo do Pipeline
      doc.setFontSize(14);
      doc.setTextColor(34, 197, 94);
      doc.text("Resumo do Pipeline", 20, yPosition);
      yPosition += 5;

      const summaryData = [
        ["Leads (atual)", comparison.currentLeads.toLocaleString("pt-BR")],
        ["Leads (período anterior)", comparison.previousLeads.toLocaleString("pt-BR")],
        ["Variação de Leads", `${comparison.leadsChangePercent >= 0 ? "+" : ""}${comparison.leadsChangePercent.toFixed(1)}%`],
        ["", ""],
        ["Agendamentos (atual)", comparison.currentAgendamentos.toLocaleString("pt-BR")],
        ["Agendamentos (período anterior)", comparison.previousAgendamentos.toLocaleString("pt-BR")],
        ["Variação de Agendamentos", `${comparison.agendamentosChangePercent >= 0 ? "+" : ""}${comparison.agendamentosChangePercent.toFixed(1)}%`],
        ["", ""],
        ["Clientes (atual)", comparison.currentClientes.toLocaleString("pt-BR")],
        ["Clientes (período anterior)", comparison.previousClientes.toLocaleString("pt-BR")],
        ["Variação de Clientes", `${comparison.clientesChangePercent >= 0 ? "+" : ""}${comparison.clientesChangePercent.toFixed(1)}%`],
      ];

      autoTable(doc, {
        startY: yPosition,
        body: summaryData,
        theme: "plain",
        styles: { fontSize: 10 },
        columnStyles: {
          0: { fontStyle: "bold", cellWidth: 80 },
          1: { halign: "right" },
        },
      });

      yPosition = (doc as any).lastAutoTable.finalY + 15;

      // Valor do Pipeline
      doc.setFontSize(14);
      doc.setTextColor(34, 197, 94);
      doc.text("Valor Monetário do Pipeline", 20, yPosition);
      yPosition += 5;

      const valueData = [
        ["Valor atual do Pipeline", comparison.currentValue.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })],
        ["Valor período anterior", comparison.previousValue.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })],
        ["Variação absoluta", `${comparison.valueChange >= 0 ? "+" : ""}${comparison.valueChange.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}`],
        ["Variação percentual", `${comparison.valueChangePercent >= 0 ? "+" : ""}${comparison.valueChangePercent.toFixed(1)}%`],
      ];

      autoTable(doc, {
        startY: yPosition,
        body: valueData,
        theme: "striped",
        headStyles: { fillColor: [34, 197, 94] },
        styles: { fontSize: 11 },
        columnStyles: {
          0: { fontStyle: "bold", cellWidth: 80 },
          1: { halign: "right", fontStyle: "bold" },
        },
      });

      // Footer
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(9);
        doc.setTextColor(150, 150, 150);
        doc.text(
          `Gerado em: ${format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })} | Página ${i} de ${pageCount}`,
          20,
          285
        );
      }

      doc.save(`relatorio-pipeline-${format(new Date(), "yyyy-MM-dd")}.pdf`);
    } catch (error) {
      console.error("Error exporting PDF:", error);
    } finally {
      setIsExporting(false);
    }
  };

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
            <Button
              variant="outline"
              size="sm"
              onClick={exportToPDF}
              disabled={isExporting || !comparison}
              className="h-7 px-2"
            >
              {isExporting ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Download className="h-3 w-3" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div ref={chartRef} className="h-[300px] bg-card rounded-lg p-2">
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
