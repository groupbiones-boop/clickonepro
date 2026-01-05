-- Add lat/lon columns to analytics_events for geographical history
ALTER TABLE public.analytics_events 
ADD COLUMN IF NOT EXISTS lat DECIMAL(9,6),
ADD COLUMN IF NOT EXISTS lon DECIMAL(9,6);

-- Create index for efficient 24h queries
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at_geo 
ON public.analytics_events (created_at DESC) 
WHERE lat IS NOT NULL AND lon IS NOT NULL;