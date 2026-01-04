-- Tabela para gerenciar testes A/B de Landing Pages
CREATE TABLE public.lp_ab_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  landing_page_id UUID NOT NULL REFERENCES public.landing_pages(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed')),
  
  -- Configuração do teste
  traffic_split INTEGER DEFAULT 50 CHECK (traffic_split >= 0 AND traffic_split <= 100),
  
  -- Variantes: A = original, B = modificada
  variant_a_content JSONB,
  variant_b_content JSONB NOT NULL,
  
  -- Meta primária
  goal_type TEXT DEFAULT 'conversion' CHECK (goal_type IN ('conversion', 'clicks', 'time_on_page', 'scroll_depth')),
  goal_target TEXT,
  
  -- Resultados
  variant_a_views INTEGER DEFAULT 0,
  variant_a_conversions INTEGER DEFAULT 0,
  variant_b_views INTEGER DEFAULT 0,
  variant_b_conversions INTEGER DEFAULT 0,
  
  -- Significância estatística
  confidence_level DECIMAL(5,2) DEFAULT 0,
  winner TEXT CHECK (winner IS NULL OR winner IN ('A', 'B')),
  
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela para rastrear qual variante cada sessão viu
CREATE TABLE public.lp_ab_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id UUID NOT NULL REFERENCES public.lp_ab_tests(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  variant TEXT NOT NULL CHECK (variant IN ('A', 'B')),
  converted BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Índices para performance
CREATE INDEX idx_ab_tests_landing_page ON public.lp_ab_tests(landing_page_id);
CREATE INDEX idx_ab_tests_status ON public.lp_ab_tests(status);
CREATE INDEX idx_ab_sessions_test ON public.lp_ab_sessions(test_id);
CREATE INDEX idx_ab_sessions_session ON public.lp_ab_sessions(session_id);
CREATE UNIQUE INDEX idx_ab_sessions_unique ON public.lp_ab_sessions(test_id, session_id);

-- Habilitar RLS
ALTER TABLE public.lp_ab_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lp_ab_sessions ENABLE ROW LEVEL SECURITY;

-- Políticas para lp_ab_tests (apenas admins podem gerenciar)
CREATE POLICY "Admins can manage AB tests" ON public.lp_ab_tests
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Políticas para lp_ab_sessions (leitura pública para tracking, inserção pública)
CREATE POLICY "Anyone can read AB sessions" ON public.lp_ab_sessions
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert AB sessions" ON public.lp_ab_sessions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update own session" ON public.lp_ab_sessions
  FOR UPDATE USING (true);

-- Função para incrementar views do teste A/B
CREATE OR REPLACE FUNCTION public.increment_ab_views(p_test_id UUID, p_variant TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF p_variant = 'A' THEN
    UPDATE public.lp_ab_tests
    SET variant_a_views = variant_a_views + 1,
        updated_at = now()
    WHERE id = p_test_id;
  ELSIF p_variant = 'B' THEN
    UPDATE public.lp_ab_tests
    SET variant_b_views = variant_b_views + 1,
        updated_at = now()
    WHERE id = p_test_id;
  END IF;
END;
$$;

-- Função para registrar conversão
CREATE OR REPLACE FUNCTION public.record_ab_conversion(p_session_id TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_test_id UUID;
  v_variant TEXT;
BEGIN
  -- Buscar sessão
  SELECT test_id, variant INTO v_test_id, v_variant
  FROM public.lp_ab_sessions
  WHERE session_id = p_session_id AND converted = false
  LIMIT 1;
  
  IF v_test_id IS NOT NULL THEN
    -- Marcar como convertido
    UPDATE public.lp_ab_sessions
    SET converted = true
    WHERE session_id = p_session_id AND test_id = v_test_id;
    
    -- Incrementar conversões
    IF v_variant = 'A' THEN
      UPDATE public.lp_ab_tests
      SET variant_a_conversions = variant_a_conversions + 1,
          updated_at = now()
      WHERE id = v_test_id;
    ELSIF v_variant = 'B' THEN
      UPDATE public.lp_ab_tests
      SET variant_b_conversions = variant_b_conversions + 1,
          updated_at = now()
      WHERE id = v_test_id;
    END IF;
  END IF;
END;
$$;

-- Trigger para atualizar updated_at
CREATE TRIGGER update_lp_ab_tests_updated_at
  BEFORE UPDATE ON public.lp_ab_tests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();