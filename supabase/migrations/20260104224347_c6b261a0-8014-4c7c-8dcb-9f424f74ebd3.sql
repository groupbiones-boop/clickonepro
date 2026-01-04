-- Create landing_pages table for storing dynamic LPs
CREATE TABLE public.landing_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  images JSONB DEFAULT '{}',
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add constraint for status values
ALTER TABLE public.landing_pages ADD CONSTRAINT landing_pages_status_check 
  CHECK (status IN ('draft', 'published'));

-- Trigger for updated_at
CREATE TRIGGER update_landing_pages_updated_at
  BEFORE UPDATE ON public.landing_pages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable RLS
ALTER TABLE public.landing_pages ENABLE ROW LEVEL SECURITY;

-- Admins can manage all landing pages
CREATE POLICY "Admins can manage landing pages"
  ON public.landing_pages
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Anyone can read published landing pages
CREATE POLICY "Anyone can read published landing pages"
  ON public.landing_pages
  FOR SELECT
  USING (status = 'published');