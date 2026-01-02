-- Tabela para relatórios agendados
CREATE TABLE public.scheduled_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  frequency TEXT NOT NULL DEFAULT 'weekly',
  day_of_week INTEGER DEFAULT 1,
  hour INTEGER DEFAULT 9,
  recipients JSONB NOT NULL DEFAULT '[]',
  sections JSONB DEFAULT '["funnel", "kpis", "top_pages"]',
  enabled BOOLEAN DEFAULT true,
  last_sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.scheduled_reports ENABLE ROW LEVEL SECURITY;

-- Policy for admins
CREATE POLICY "Admins can manage scheduled reports" 
ON public.scheduled_reports 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_scheduled_reports_updated_at
BEFORE UPDATE ON public.scheduled_reports
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();