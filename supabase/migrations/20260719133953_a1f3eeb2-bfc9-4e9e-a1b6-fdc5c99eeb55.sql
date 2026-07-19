CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;

CREATE OR REPLACE FUNCTION public.auto_publish_scheduled_posts()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.blog_posts
  SET status = 'published', updated_at = now()
  WHERE status = 'draft'
    AND published_at IS NOT NULL
    AND published_at <= now();
$$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'auto-publish-scheduled-blog-posts') THEN
    PERFORM cron.schedule(
      'auto-publish-scheduled-blog-posts',
      '*/5 * * * *',
      $CRON$ SELECT public.auto_publish_scheduled_posts(); $CRON$
    );
  END IF;
END $$;