import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, eachDayOfInterval, parseISO } from "date-fns";

interface PipelineFilters {
  startDate: Date;
  endDate: Date;
}

interface PipelineTimelineData {
  date: string;
  leads: number;
  agendamentos: number;
  clientes: number;
  valor: number;
}

export interface PipelineComparison {
  currentLeads: number;
  previousLeads: number;
  leadsChange: number;
  leadsChangePercent: number;
  currentAgendamentos: number;
  previousAgendamentos: number;
  agendamentosChange: number;
  agendamentosChangePercent: number;
  currentClientes: number;
  previousClientes: number;
  clientesChange: number;
  clientesChangePercent: number;
  currentValue: number;
  previousValue: number;
  valueChange: number;
  valueChangePercent: number;
}

export interface PipelineResult {
  timeline: PipelineTimelineData[];
  comparison: PipelineComparison;
}

const calculatePreviousPeriod = (startDate: Date, endDate: Date) => {
  const durationMs = endDate.getTime() - startDate.getTime();
  const previousEndDate = new Date(startDate.getTime() - 1);
  const previousStartDate = new Date(previousEndDate.getTime() - durationMs);
  return { startDate: previousStartDate, endDate: previousEndDate };
};

const fetchPeriodTotals = async (startDate: Date, endDate: Date) => {
  const { count: leadsCount } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true })
    .gte("created_at", startDate.toISOString())
    .lte("created_at", endDate.toISOString());

  const { count: agendamentosCount } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true })
    .in("source", ["demo", "agendamento"])
    .gte("created_at", startDate.toISOString())
    .lte("created_at", endDate.toISOString());

  const { count: clientesCount } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true })
    .eq("status", "convertido")
    .gte("created_at", startDate.toISOString())
    .lte("created_at", endDate.toISOString());

  return {
    leads: leadsCount || 0,
    agendamentos: agendamentosCount || 0,
    clientes: clientesCount || 0,
  };
};

export const usePipelineTimeline = (filters: PipelineFilters, baseValueUSD: number = 497) => {
  return useQuery({
    queryKey: ["pipeline-timeline", filters.startDate, filters.endDate, baseValueUSD],
    queryFn: async (): Promise<PipelineResult> => {
      // Get all leads in the date range
      const { data: leadsData } = await supabase
        .from("leads")
        .select("created_at, source, status")
        .gte("created_at", filters.startDate.toISOString())
        .lte("created_at", filters.endDate.toISOString())
        .order("created_at", { ascending: true });

      // Create a map of dates
      const dateMap = new Map<string, { leads: number; agendamentos: number; clientes: number }>();

      // Initialize all days in the range
      const days = eachDayOfInterval({
        start: filters.startDate,
        end: filters.endDate,
      });

      days.forEach((day) => {
        const dateKey = format(day, "yyyy-MM-dd");
        dateMap.set(dateKey, { leads: 0, agendamentos: 0, clientes: 0 });
      });

      // Aggregate leads by date
      leadsData?.forEach((lead) => {
        const dateKey = format(parseISO(lead.created_at), "yyyy-MM-dd");
        const existing = dateMap.get(dateKey);
        
        if (existing) {
          existing.leads += 1;
          
          if (lead.source === "demo" || lead.source === "agendamento") {
            existing.agendamentos += 1;
          }
          
          if (lead.status === "convertido") {
            existing.clientes += 1;
          }
          
          dateMap.set(dateKey, existing);
        }
      });

      // Convert to array with cumulative values and calculate monetary value
      let cumulativeLeads = 0;
      let cumulativeAgendamentos = 0;
      let cumulativeClientes = 0;

      const timeline: PipelineTimelineData[] = [];
      
      dateMap.forEach((data, dateKey) => {
        cumulativeLeads += data.leads;
        cumulativeAgendamentos += data.agendamentos;
        cumulativeClientes += data.clientes;

        const totalPipeline = cumulativeLeads + cumulativeAgendamentos + cumulativeClientes;
        
        timeline.push({
          date: format(parseISO(dateKey), "dd/MM"),
          leads: cumulativeLeads,
          agendamentos: cumulativeAgendamentos,
          clientes: cumulativeClientes,
          valor: totalPipeline * baseValueUSD,
        });
      });

      // Fetch previous period data for comparison
      const previousPeriod = calculatePreviousPeriod(filters.startDate, filters.endDate);
      const [currentTotals, previousTotals] = await Promise.all([
        fetchPeriodTotals(filters.startDate, filters.endDate),
        fetchPeriodTotals(previousPeriod.startDate, previousPeriod.endDate),
      ]);

      const currentValue = (currentTotals.leads + currentTotals.agendamentos + currentTotals.clientes) * baseValueUSD;
      const previousValue = (previousTotals.leads + previousTotals.agendamentos + previousTotals.clientes) * baseValueUSD;

      const calcPercent = (current: number, previous: number) => 
        previous > 0 ? ((current - previous) / previous) * 100 : current > 0 ? 100 : 0;

      const comparison: PipelineComparison = {
        currentLeads: currentTotals.leads,
        previousLeads: previousTotals.leads,
        leadsChange: currentTotals.leads - previousTotals.leads,
        leadsChangePercent: calcPercent(currentTotals.leads, previousTotals.leads),
        currentAgendamentos: currentTotals.agendamentos,
        previousAgendamentos: previousTotals.agendamentos,
        agendamentosChange: currentTotals.agendamentos - previousTotals.agendamentos,
        agendamentosChangePercent: calcPercent(currentTotals.agendamentos, previousTotals.agendamentos),
        currentClientes: currentTotals.clientes,
        previousClientes: previousTotals.clientes,
        clientesChange: currentTotals.clientes - previousTotals.clientes,
        clientesChangePercent: calcPercent(currentTotals.clientes, previousTotals.clientes),
        currentValue,
        previousValue,
        valueChange: currentValue - previousValue,
        valueChangePercent: calcPercent(currentValue, previousValue),
      };

      return { timeline, comparison };
    },
  });
};
