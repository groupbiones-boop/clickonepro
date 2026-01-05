-- Add page_path column to lp_campaigns for tracking any site page
ALTER TABLE public.lp_campaigns 
ADD COLUMN IF NOT EXISTS page_path TEXT;