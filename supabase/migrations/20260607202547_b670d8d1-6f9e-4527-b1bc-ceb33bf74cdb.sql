
-- 1. Remove overly broad storage policy on lp-images (service role bypasses RLS anyway)
DROP POLICY IF EXISTS "Service role can manage LP images" ON storage.objects;

-- 2. Remove redundant service-role insert policy on notifications (service role bypasses RLS)
DROP POLICY IF EXISTS "Service role can insert notifications" ON public.notifications;

-- 3. Remove similarly redundant demo-audio service-role insert policy
DROP POLICY IF EXISTS "Service role can upload demo audio" ON storage.objects;

-- 4. Allow public/anon to read only ACTIVE A/B tests with minimal exposure needed for variant assignment.
--    Admins keep full access via existing "Admins can manage AB tests" policy.
CREATE POLICY "Public can read active AB tests"
ON public.lp_ab_tests
FOR SELECT
TO anon, authenticated
USING (status = 'active');
