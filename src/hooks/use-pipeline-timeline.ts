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

export const usePipelineTimeline = (filters: PipelineFilters, baseValueUSD: number = 497) => {
  return useQuery({
    queryKey: ["pipeline-timeline", filters.startDate, filters.endDate, baseValueUSD],
    queryFn: async (): Promise<PipelineTimelineData[]> => {
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

      const result: PipelineTimelineData[] = [];
      
      dateMap.forEach((data, dateKey) => {
        cumulativeLeads += data.leads;
        cumulativeAgendamentos += data.agendamentos;
        cumulativeClientes += data.clientes;

        const totalPipeline = cumulativeLeads + cumulativeAgendamentos + cumulativeClientes;
        
        result.push({
          date: format(parseISO(dateKey), "dd/MM"),
          leads: cumulativeLeads,
          agendamentos: cumulativeAgendamentos,
          clientes: cumulativeClientes,
          valor: totalPipeline * baseValueUSD,
        });
      });

      return result;
    },
  });
};
