
CREATE TABLE public.demo_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  scheduled_at TIMESTAMPTZ NOT NULL,
  timezone TEXT DEFAULT 'America/Sao_Paulo',
  notes TEXT,
  source TEXT DEFAULT 'mcp',
  status TEXT NOT NULL DEFAULT 'scheduled',
  confirmation_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.demo_bookings TO authenticated;
GRANT INSERT ON public.demo_bookings TO anon;
GRANT ALL ON public.demo_bookings TO service_role;

ALTER TABLE public.demo_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert demo bookings"
  ON public.demo_bookings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can read demo bookings"
  ON public.demo_bookings FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update demo bookings"
  ON public.demo_bookings FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_demo_bookings_updated_at
  BEFORE UPDATE ON public.demo_bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_demo_bookings_scheduled_at ON public.demo_bookings(scheduled_at DESC);
CREATE INDEX idx_demo_bookings_email ON public.demo_bookings(email);
