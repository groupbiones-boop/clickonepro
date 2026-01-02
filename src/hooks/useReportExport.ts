/**
 * Report Export Hook
 * Handles PDF and Excel generation for analytics reports
 */
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import type { FunnelData } from "./useFunnelData";

export interface ExportData {
  filters: { startDate: Date; endDate: Date };
  funnel: FunnelData;
  funnelImage?: string;
  visitors: number;
  pageviews: number;
  leads: number;
  conversionRate: number;
  topPages: Array<{ path: string; title?: string; views: number }>;
  deviceStats: Array<{ name: string; value: number }>;
}

export interface ExportSections {
  funnel: boolean;
  kpis: boolean;
  topPages: boolean;
  devices: boolean;
}

export const useReportExport = () => {
  const formatDate = (date: Date) => format(date, "dd/MM/yyyy", { locale: ptBR });

  const generatePDF = async (data: ExportData, sections: ExportSections) => {
    const doc = new jsPDF();
    let yPosition = 20;

    // Header
    doc.setFontSize(20);
    doc.setTextColor(80, 13, 170); // ClickOne purple
    doc.text("Relatório de Conversão", 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(14);
    doc.setTextColor(107, 47, 184);
    doc.text("ClickOne AI", 20, yPosition);
    yPosition += 10;

    // Período
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text(`Período: ${formatDate(data.filters.startDate)} - ${formatDate(data.filters.endDate)}`, 20, yPosition);
    yPosition += 15;

    // Funnel Image
    if (sections.funnel && data.funnelImage) {
      doc.setFontSize(14);
      doc.setTextColor(80, 13, 170);
      doc.text("Funil de Conversão", 20, yPosition);
      yPosition += 5;
      
      try {
        doc.addImage(data.funnelImage, "PNG", 20, yPosition, 170, 80);
        yPosition += 90;
      } catch (error) {
        console.error("Error adding funnel image:", error);
      }
    }

    // Funnel Metrics Table
    if (sections.funnel) {
      doc.setFontSize(14);
      doc.setTextColor(80, 13, 170);
      doc.text("Métricas do Funil", 20, yPosition);
      yPosition += 5;

      const funnelTableData = [
        ["Prospecting (Visitantes)", data.funnel.visitors.toLocaleString("pt-BR"), "-"],
        ["Outreach (Pageviews)", data.funnel.pageviews.toLocaleString("pt-BR"), 
          data.funnel.visitors > 0 ? `${((data.funnel.pageviews / data.funnel.visitors) * 100).toFixed(1)}%` : "0%"],
        ["Discovery (Leads)", data.funnel.leads.toLocaleString("pt-BR"), 
          data.funnel.pageviews > 0 ? `${((data.funnel.leads / data.funnel.pageviews) * 100).toFixed(1)}%` : "0%"],
        ["Demo (Agendamentos)", data.funnel.agendamentos.toLocaleString("pt-BR"), 
          data.funnel.leads > 0 ? `${((data.funnel.agendamentos / data.funnel.leads) * 100).toFixed(1)}%` : "0%"],
        ["Closing (Clientes)", data.funnel.clientes.toLocaleString("pt-BR"), 
          data.funnel.agendamentos > 0 ? `${((data.funnel.clientes / data.funnel.agendamentos) * 100).toFixed(1)}%` : "0%"],
      ];

      autoTable(doc, {
        startY: yPosition,
        head: [["Etapa", "Quantidade", "Taxa de Conversão"]],
        body: funnelTableData,
        theme: "striped",
        headStyles: { fillColor: [80, 13, 170] },
        styles: { fontSize: 10 },
      });

      yPosition = (doc as any).lastAutoTable.finalY + 15;
    }

    // KPIs Summary
    if (sections.kpis) {
      // Check if we need a new page
      if (yPosition > 230) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(14);
      doc.setTextColor(80, 13, 170);
      doc.text("Resumo de KPIs", 20, yPosition);
      yPosition += 5;

      const kpisData = [
        ["Total de Visitantes", data.visitors.toLocaleString("pt-BR")],
        ["Total de Pageviews", data.pageviews.toLocaleString("pt-BR")],
        ["Total de Leads", data.leads.toLocaleString("pt-BR")],
        ["Taxa de Conversão Geral", `${data.conversionRate.toFixed(2)}%`],
        ["Demos Agendados", data.funnel.agendamentos.toLocaleString("pt-BR")],
        ["Clientes Fechados", data.funnel.clientes.toLocaleString("pt-BR")],
      ];

      autoTable(doc, {
        startY: yPosition,
        body: kpisData,
        theme: "plain",
        styles: { fontSize: 10 },
        columnStyles: {
          0: { fontStyle: "bold", cellWidth: 80 },
          1: { halign: "right" },
        },
      });

      yPosition = (doc as any).lastAutoTable.finalY + 15;
    }

    // Top Pages
    if (sections.topPages && data.topPages.length > 0) {
      if (yPosition > 200) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(14);
      doc.setTextColor(80, 13, 170);
      doc.text("Top 10 Páginas", 20, yPosition);
      yPosition += 5;

      const topPagesData = data.topPages.slice(0, 10).map((page, index) => [
        (index + 1).toString(),
        page.title || page.path,
        page.views.toLocaleString("pt-BR"),
      ]);

      autoTable(doc, {
        startY: yPosition,
        head: [["#", "Página", "Visualizações"]],
        body: topPagesData,
        theme: "striped",
        headStyles: { fillColor: [107, 47, 184] },
        styles: { fontSize: 9 },
        columnStyles: {
          0: { cellWidth: 15 },
          1: { cellWidth: 120 },
          2: { halign: "right", cellWidth: 35 },
        },
      });

      yPosition = (doc as any).lastAutoTable.finalY + 15;
    }

    // Devices
    if (sections.devices && data.deviceStats.length > 0) {
      if (yPosition > 220) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(14);
      doc.setTextColor(80, 13, 170);
      doc.text("Dispositivos", 20, yPosition);
      yPosition += 5;

      const total = data.deviceStats.reduce((sum, d) => sum + d.value, 0);
      const devicesData = data.deviceStats.map(device => [
        device.name,
        device.value.toLocaleString("pt-BR"),
        total > 0 ? `${((device.value / total) * 100).toFixed(1)}%` : "0%",
      ]);

      autoTable(doc, {
        startY: yPosition,
        head: [["Dispositivo", "Sessões", "Porcentagem"]],
        body: devicesData,
        theme: "striped",
        headStyles: { fillColor: [134, 81, 198] },
        styles: { fontSize: 10 },
      });
    }

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

    doc.save(`relatorio-conversao-${format(new Date(), "yyyy-MM-dd")}.pdf`);
  };

  const generateExcel = async (data: ExportData, sections: ExportSections) => {
    const wb = XLSX.utils.book_new();

    // Resumo Sheet
    if (sections.kpis) {
      const resumoData = [
        ["Relatório de Conversão - ClickOne AI"],
        [`Período: ${formatDate(data.filters.startDate)} - ${formatDate(data.filters.endDate)}`],
        [],
        ["Métrica", "Valor"],
        ["Total de Visitantes", data.visitors],
        ["Total de Pageviews", data.pageviews],
        ["Total de Leads", data.leads],
        ["Taxa de Conversão Geral", `${data.conversionRate.toFixed(2)}%`],
        ["Demos Agendados", data.funnel.agendamentos],
        ["Clientes Fechados", data.funnel.clientes],
      ];
      const resumoSheet = XLSX.utils.aoa_to_sheet(resumoData);
      resumoSheet["!cols"] = [{ wch: 30 }, { wch: 20 }];
      XLSX.utils.book_append_sheet(wb, resumoSheet, "Resumo");
    }

    // Funil Sheet
    if (sections.funnel) {
      const funnelData = [
        ["Etapa", "Quantidade", "Taxa de Conversão"],
        ["Prospecting (Visitantes)", data.funnel.visitors, "-"],
        ["Outreach (Pageviews)", data.funnel.pageviews, 
          data.funnel.visitors > 0 ? `${((data.funnel.pageviews / data.funnel.visitors) * 100).toFixed(1)}%` : "0%"],
        ["Discovery (Leads)", data.funnel.leads, 
          data.funnel.pageviews > 0 ? `${((data.funnel.leads / data.funnel.pageviews) * 100).toFixed(1)}%` : "0%"],
        ["Demo (Agendamentos)", data.funnel.agendamentos, 
          data.funnel.leads > 0 ? `${((data.funnel.agendamentos / data.funnel.leads) * 100).toFixed(1)}%` : "0%"],
        ["Closing (Clientes)", data.funnel.clientes, 
          data.funnel.agendamentos > 0 ? `${((data.funnel.clientes / data.funnel.agendamentos) * 100).toFixed(1)}%` : "0%"],
      ];
      const funnelSheet = XLSX.utils.aoa_to_sheet(funnelData);
      funnelSheet["!cols"] = [{ wch: 30 }, { wch: 15 }, { wch: 20 }];
      XLSX.utils.book_append_sheet(wb, funnelSheet, "Funil");
    }

    // Top Páginas Sheet
    if (sections.topPages && data.topPages.length > 0) {
      const topPagesData = [
        ["Posição", "Página", "Visualizações"],
        ...data.topPages.map((page, index) => [
          index + 1,
          page.title || page.path,
          page.views,
        ]),
      ];
      const topPagesSheet = XLSX.utils.aoa_to_sheet(topPagesData);
      topPagesSheet["!cols"] = [{ wch: 10 }, { wch: 50 }, { wch: 15 }];
      XLSX.utils.book_append_sheet(wb, topPagesSheet, "Top Páginas");
    }

    // Dispositivos Sheet
    if (sections.devices && data.deviceStats.length > 0) {
      const total = data.deviceStats.reduce((sum, d) => sum + d.value, 0);
      const devicesData = [
        ["Dispositivo", "Sessões", "Porcentagem"],
        ...data.deviceStats.map(device => [
          device.name,
          device.value,
          total > 0 ? `${((device.value / total) * 100).toFixed(1)}%` : "0%",
        ]),
      ];
      const devicesSheet = XLSX.utils.aoa_to_sheet(devicesData);
      devicesSheet["!cols"] = [{ wch: 20 }, { wch: 15 }, { wch: 15 }];
      XLSX.utils.book_append_sheet(wb, devicesSheet, "Dispositivos");
    }

    XLSX.writeFile(wb, `relatorio-conversao-${format(new Date(), "yyyy-MM-dd")}.xlsx`);
  };

  return { generatePDF, generateExcel };
};
