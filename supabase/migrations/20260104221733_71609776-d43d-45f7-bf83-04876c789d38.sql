-- Create storage bucket for LP images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'lp-images', 
  'lp-images', 
  true, 
  5242880, -- 5MB limit
  ARRAY['image/png', 'image/jpeg', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for lp-images bucket
CREATE POLICY "LP images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'lp-images');

CREATE POLICY "Admins can upload LP images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'lp-images' 
  AND EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

CREATE POLICY "Admins can update LP images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'lp-images' 
  AND EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

CREATE POLICY "Admins can delete LP images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'lp-images' 
  AND EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Also allow service role (edge functions) to manage images
CREATE POLICY "Service role can manage LP images"
ON storage.objects FOR ALL
USING (bucket_id = 'lp-images')
WITH CHECK (bucket_id = 'lp-images');