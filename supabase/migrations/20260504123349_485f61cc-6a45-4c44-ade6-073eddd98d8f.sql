
-- 1. Notifications: remove public INSERT, restrict to service role
DROP POLICY IF EXISTS "Anyone can insert notifications" ON public.notifications;
CREATE POLICY "Service role can insert notifications"
ON public.notifications FOR INSERT
WITH CHECK (auth.role() = 'service_role');

-- 2. lp_ab_sessions: restrict SELECT and UPDATE to admins/service role
DROP POLICY IF EXISTS "Anyone can read AB sessions" ON public.lp_ab_sessions;
DROP POLICY IF EXISTS "Anyone can update own session" ON public.lp_ab_sessions;

CREATE POLICY "Admins can read AB sessions"
ON public.lp_ab_sessions FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- INSERT remains public (anonymous visitors need to record sessions);
-- conversions are recorded server-side via SECURITY DEFINER function record_ab_conversion.

-- 3. Storage: restrict blog-images write/update/delete to admins
DROP POLICY IF EXISTS "Authenticated users can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update blog images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete blog images" ON storage.objects;

CREATE POLICY "Admins can upload blog images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'blog-images'
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can update blog images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'blog-images'
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete blog images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'blog-images'
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- 4. Realtime: remove leads and notifications from public realtime publication
-- These tables contain PII / admin-only data. Admin dashboard can poll instead,
-- or use server-side webhooks / edge functions.
ALTER PUBLICATION supabase_realtime DROP TABLE public.leads;
ALTER PUBLICATION supabase_realtime DROP TABLE public.notifications;
