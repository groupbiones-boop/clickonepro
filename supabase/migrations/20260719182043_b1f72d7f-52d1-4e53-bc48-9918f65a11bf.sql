
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS ghl_contact_id text,
  ADD COLUMN IF NOT EXISTS ghl_sync_status text,
  ADD COLUMN IF NOT EXISTS ghl_response jsonb,
  ADD COLUMN IF NOT EXISTS ghl_error text,
  ADD COLUMN IF NOT EXISTS last_synced_at timestamptz;
CREATE INDEX IF NOT EXISTS leads_ghl_sync_status_idx ON public.leads(ghl_sync_status);
