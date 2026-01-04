import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { LPContent } from "@/hooks/use-landing-page";
import type { Json } from "@/integrations/supabase/types";

export interface ABTest {
  id: string;
  name: string;
  landing_page_id: string;
  status: "draft" | "active" | "paused" | "completed";
  traffic_split: number;
  variant_a_content: LPContent | null;
  variant_b_content: LPContent;
  goal_type: "conversion" | "clicks" | "time_on_page" | "scroll_depth";
  goal_target: string | null;
  variant_a_views: number;
  variant_a_conversions: number;
  variant_b_views: number;
  variant_b_conversions: number;
  confidence_level: number;
  winner: "A" | "B" | null;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

interface ABTestRow {
  id: string;
  name: string;
  landing_page_id: string;
  status: string | null;
  traffic_split: number | null;
  variant_a_content: Json | null;
  variant_b_content: Json;
  goal_type: string | null;
  goal_target: string | null;
  variant_a_views: number | null;
  variant_a_conversions: number | null;
  variant_b_views: number | null;
  variant_b_conversions: number | null;
  confidence_level: number | null;
  winner: string | null;
  start_date: string | null;
  end_date: string | null;
  created_at: string | null;
  updated_at: string | null;
}

function mapRowToABTest(row: ABTestRow): ABTest {
  return {
    id: row.id,
    name: row.name,
    landing_page_id: row.landing_page_id,
    status: (row.status as ABTest["status"]) || "draft",
    traffic_split: row.traffic_split ?? 50,
    variant_a_content: row.variant_a_content as unknown as LPContent | null,
    variant_b_content: row.variant_b_content as unknown as LPContent,
    goal_type: (row.goal_type as ABTest["goal_type"]) || "conversion",
    goal_target: row.goal_target,
    variant_a_views: row.variant_a_views ?? 0,
    variant_a_conversions: row.variant_a_conversions ?? 0,
    variant_b_views: row.variant_b_views ?? 0,
    variant_b_conversions: row.variant_b_conversions ?? 0,
    confidence_level: row.confidence_level ?? 0,
    winner: row.winner as ABTest["winner"],
    start_date: row.start_date,
    end_date: row.end_date,
    created_at: row.created_at || new Date().toISOString(),
    updated_at: row.updated_at || new Date().toISOString(),
  };
}

// Hook para listar todos os testes A/B
export function useABTests(landingPageId?: string) {
  const [tests, setTests] = useState<ABTest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTests = useCallback(async () => {
    setIsLoading(true);
    try {
      let query = supabase.from("lp_ab_tests").select("*").order("created_at", { ascending: false });

      if (landingPageId) {
        query = query.eq("landing_page_id", landingPageId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setTests((data || []).map(mapRowToABTest));
    } catch (error) {
      console.error("Error fetching AB tests:", error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar testes A/B",
        description: "Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [landingPageId]);

  useEffect(() => {
    fetchTests();
  }, [fetchTests]);

  const createTest = async (
    name: string,
    landingPageId: string,
    variantBContent: LPContent,
    variantAContent?: LPContent
  ): Promise<ABTest | null> => {
    try {
      const { data, error } = await supabase
        .from("lp_ab_tests")
        .insert({
          name,
          landing_page_id: landingPageId,
          variant_a_content: variantAContent as unknown as Json,
          variant_b_content: variantBContent as unknown as Json,
        })
        .select()
        .single();

      if (error) throw error;

      const newTest = mapRowToABTest(data);
      setTests((prev) => [newTest, ...prev]);
      toast({
        title: "Teste A/B criado!",
        description: "Configure e ative o teste quando estiver pronto.",
      });
      return newTest;
    } catch (error) {
      console.error("Error creating AB test:", error);
      toast({
        variant: "destructive",
        title: "Erro ao criar teste",
        description: "Tente novamente.",
      });
      return null;
    }
  };

  const updateTest = async (id: string, updates: Partial<ABTest>): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from("lp_ab_tests")
        .update({
          ...updates,
          variant_a_content: updates.variant_a_content as unknown as Json,
          variant_b_content: updates.variant_b_content as unknown as Json,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;

      setTests((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
      toast({
        title: "Teste atualizado!",
      });
      return true;
    } catch (error) {
      console.error("Error updating AB test:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar",
        description: "Tente novamente.",
      });
      return false;
    }
  };

  const deleteTest = async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase.from("lp_ab_tests").delete().eq("id", id);

      if (error) throw error;

      setTests((prev) => prev.filter((t) => t.id !== id));
      toast({
        title: "Teste excluído!",
      });
      return true;
    } catch (error) {
      console.error("Error deleting AB test:", error);
      toast({
        variant: "destructive",
        title: "Erro ao excluir",
        description: "Tente novamente.",
      });
      return false;
    }
  };

  const startTest = async (id: string): Promise<boolean> => {
    return updateTest(id, {
      status: "active",
      start_date: new Date().toISOString(),
    });
  };

  const pauseTest = async (id: string): Promise<boolean> => {
    return updateTest(id, { status: "paused" });
  };

  const completeTest = async (id: string, winner: "A" | "B"): Promise<boolean> => {
    return updateTest(id, {
      status: "completed",
      winner,
      end_date: new Date().toISOString(),
    });
  };

  return {
    tests,
    isLoading,
    fetchTests,
    createTest,
    updateTest,
    deleteTest,
    startTest,
    pauseTest,
    completeTest,
  };
}

// Hook para obter um teste específico
export function useABTest(testId: string | undefined) {
  const [test, setTest] = useState<ABTest | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!testId) {
      setIsLoading(false);
      return;
    }

    const fetchTest = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("lp_ab_tests")
          .select("*")
          .eq("id", testId)
          .maybeSingle();

        if (error) throw error;
        setTest(data ? mapRowToABTest(data) : null);
      } catch (error) {
        console.error("Error fetching AB test:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTest();
  }, [testId]);

  return { test, setTest, isLoading };
}

// Hook para obter teste ativo de uma LP
export function useActiveABTest(landingPageId: string | undefined) {
  const [test, setTest] = useState<ABTest | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!landingPageId) {
      setIsLoading(false);
      return;
    }

    const fetchActiveTest = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("lp_ab_tests")
          .select("*")
          .eq("landing_page_id", landingPageId)
          .eq("status", "active")
          .maybeSingle();

        if (error) throw error;
        setTest(data ? mapRowToABTest(data) : null);
      } catch (error) {
        console.error("Error fetching active AB test:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActiveTest();
  }, [landingPageId]);

  return { test, isLoading };
}

// Funções utilitárias para tracking

// Gera ou recupera ID de sessão
export function getOrCreateSessionId(): string {
  const storageKey = "ab_session_id";
  let sessionId = sessionStorage.getItem(storageKey);

  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    sessionStorage.setItem(storageKey, sessionId);
  }

  return sessionId;
}

// Registra sessão e retorna variante atribuída
export async function assignVariant(
  testId: string,
  trafficSplit: number
): Promise<{ variant: "A" | "B"; isNew: boolean }> {
  const sessionId = getOrCreateSessionId();

  // Verificar se já existe sessão
  const { data: existing } = await supabase
    .from("lp_ab_sessions")
    .select("variant")
    .eq("test_id", testId)
    .eq("session_id", sessionId)
    .maybeSingle();

  if (existing) {
    return { variant: existing.variant as "A" | "B", isNew: false };
  }

  // Sortear variante
  const variant: "A" | "B" = Math.random() * 100 < trafficSplit ? "B" : "A";

  // Registrar sessão
  await supabase.from("lp_ab_sessions").insert({
    test_id: testId,
    session_id: sessionId,
    variant,
  });

  // Incrementar views
  await supabase.rpc("increment_ab_views", {
    p_test_id: testId,
    p_variant: variant,
  });

  return { variant, isNew: true };
}

// Registra conversão
export async function recordConversion(): Promise<void> {
  const sessionId = getOrCreateSessionId();
  await supabase.rpc("record_ab_conversion", { p_session_id: sessionId });
}

// Cálculo de significância estatística (Z-test para proporções)
export function calculateStatisticalSignificance(
  viewsA: number,
  conversionsA: number,
  viewsB: number,
  conversionsB: number
): { confidence: number; winner: "A" | "B" | null; improvement: number } {
  if (viewsA < 30 || viewsB < 30) {
    return { confidence: 0, winner: null, improvement: 0 };
  }

  const rateA = conversionsA / viewsA;
  const rateB = conversionsB / viewsB;

  // Pooled rate
  const pooledRate = (conversionsA + conversionsB) / (viewsA + viewsB);
  const se = Math.sqrt(pooledRate * (1 - pooledRate) * (1 / viewsA + 1 / viewsB));

  if (se === 0) {
    return { confidence: 0, winner: null, improvement: 0 };
  }

  // Z-score
  const z = Math.abs(rateA - rateB) / se;

  // Converter Z para confiança (aproximação)
  const confidence = Math.min(99.9, normalCDF(z) * 100);

  // Determinar vencedor
  const winner = confidence >= 95 ? (rateB > rateA ? "B" : "A") : null;

  // Calcular melhoria percentual
  const improvement = rateA > 0 ? ((rateB - rateA) / rateA) * 100 : 0;

  return { confidence, winner, improvement };
}

// Função CDF normal (aproximação)
function normalCDF(z: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = z < 0 ? -1 : 1;
  z = Math.abs(z) / Math.sqrt(2);

  const t = 1.0 / (1.0 + p * z);
  const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-z * z);

  return 0.5 * (1.0 + sign * y);
}
