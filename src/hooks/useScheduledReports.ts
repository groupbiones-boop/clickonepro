import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ScheduledReport {
  id: string;
  name: string;
  frequency: string;
  day_of_week: number;
  hour: number;
  recipients: string[];
  sections: string[];
  enabled: boolean;
  last_sent_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateScheduledReportInput {
  name: string;
  frequency: string;
  day_of_week: number;
  hour: number;
  recipients: string[];
  sections: string[];
  enabled?: boolean;
}

export const useScheduledReports = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: reports, isLoading } = useQuery({
    queryKey: ["scheduled-reports"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("scheduled_reports")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      return (data || []).map(report => ({
        ...report,
        recipients: report.recipients as string[],
        sections: report.sections as string[],
      })) as ScheduledReport[];
    },
  });

  const createReport = useMutation({
    mutationFn: async (input: CreateScheduledReportInput) => {
      const { data, error } = await supabase
        .from("scheduled_reports")
        .insert({
          name: input.name,
          frequency: input.frequency,
          day_of_week: input.day_of_week,
          hour: input.hour,
          recipients: input.recipients,
          sections: input.sections,
          enabled: input.enabled ?? true,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scheduled-reports"] });
      toast({
        title: "Relatório agendado criado",
        description: "O relatório será enviado automaticamente conforme configurado.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao criar relatório",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateReport = useMutation({
    mutationFn: async ({ id, ...input }: Partial<CreateScheduledReportInput> & { id: string }) => {
      const { data, error } = await supabase
        .from("scheduled_reports")
        .update(input)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scheduled-reports"] });
      toast({
        title: "Relatório atualizado",
        description: "As configurações foram salvas.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao atualizar relatório",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteReport = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("scheduled_reports")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scheduled-reports"] });
      toast({
        title: "Relatório excluído",
        description: "O agendamento foi removido.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao excluir relatório",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const toggleEnabled = useMutation({
    mutationFn: async ({ id, enabled }: { id: string; enabled: boolean }) => {
      const { error } = await supabase
        .from("scheduled_reports")
        .update({ enabled })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scheduled-reports"] });
    },
    onError: (error) => {
      toast({
        title: "Erro ao atualizar status",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    reports,
    isLoading,
    createReport,
    updateReport,
    deleteReport,
    toggleEnabled,
  };
};
