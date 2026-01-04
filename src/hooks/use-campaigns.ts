import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Campaign {
  id: string;
  landing_page_id: string | null;
  name: string;
  start_date: string;
  end_date: string;
  currency: "USD" | "BRL";
  goal_reach: number | null;
  goal_visitors: number | null;
  goal_pageviews: number | null;
  goal_conversions: number | null;
  goal_revenue: number | null;
  avg_conversion_value: number;
  status: "draft" | "active" | "completed" | "archived";
  created_at: string;
  updated_at: string;
  landing_page?: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

export interface CampaignFormData {
  landing_page_id: string | null;
  name: string;
  start_date: string;
  end_date: string;
  currency: "USD" | "BRL";
  goal_reach: number | null;
  goal_visitors: number | null;
  goal_pageviews: number | null;
  goal_conversions: number | null;
  goal_revenue: number | null;
  avg_conversion_value: number;
  status: "draft" | "active" | "completed" | "archived";
}

export function useCampaigns() {
  return useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lp_campaigns")
        .select(`
          *,
          landing_page:landing_pages(id, name, slug)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Campaign[];
    },
  });
}

export function useCampaign(id: string | null) {
  return useQuery({
    queryKey: ["campaign", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("lp_campaigns")
        .select(`
          *,
          landing_page:landing_pages(id, name, slug)
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Campaign;
    },
    enabled: !!id,
  });
}

export function useCreateCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CampaignFormData) => {
      const { data: result, error } = await supabase
        .from("lp_campaigns")
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      toast.success("Campanha criada com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao criar campanha: " + error.message);
    },
  });
}

export function useUpdateCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CampaignFormData> }) => {
      const { data: result, error } = await supabase
        .from("lp_campaigns")
        .update(data)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["campaign", variables.id] });
      toast.success("Campanha atualizada com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao atualizar campanha: " + error.message);
    },
  });
}

export function useDeleteCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("lp_campaigns")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      toast.success("Campanha excluída com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao excluir campanha: " + error.message);
    },
  });
}

export function useLandingPages() {
  return useQuery({
    queryKey: ["landing-pages-list"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("landing_pages")
        .select("id, name, slug, status")
        .order("name");

      if (error) throw error;
      return data;
    },
  });
}
