-- Create storage bucket for demo audio files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'demo-audio',
  'demo-audio',
  true,
  52428800, -- 50MB limit
  ARRAY['audio/mpeg', 'audio/mp3']
)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to demo audio files
CREATE POLICY "Public Access for demo audio" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'demo-audio');

-- Allow service role to upload audio files
CREATE POLICY "Service role can upload demo audio" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'demo-audio');