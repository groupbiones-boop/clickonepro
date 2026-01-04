-- Create table for campaign goals
CREATE TABLE public.lp_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  landing_page_id UUID REFERENCES public.landing_pages(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  currency TEXT DEFAULT 'USD' CHECK (currency IN ('USD', 'BRL')),
  
  -- Goals
  goal_reach INTEGER,
  goal_visitors INTEGER,
  goal_pageviews INTEGER,
  goal_conversions INTEGER,
  goal_revenue DECIMAL(12,2),
  
  -- Average conversion value for revenue calculation
  avg_conversion_value DECIMAL(12,2) DEFAULT 497.00,
  
  status TEXT DEFAULT 'active' CHECK (status IN ('draft', 'active', 'completed', 'archived')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.lp_campaigns ENABLE ROW LEVEL SECURITY;

-- RLS Policy - Only admins can manage campaigns
CREATE POLICY "Admins can manage campaigns"
  ON public.lp_campaigns
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_lp_campaigns_updated_at
  BEFORE UPDATE ON public.lp_campaigns
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();