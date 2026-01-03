-- Inserir categorias padrão para o blog
INSERT INTO public.blog_categories (name, slug, description, color) VALUES
  ('Inteligência Artificial', 'inteligencia-artificial', 'Artigos sobre IA e automação', '#8B5CF6'),
  ('Atendimento ao Cliente', 'atendimento', 'Dicas para melhorar o atendimento', '#3B82F6'),
  ('Marketing Digital', 'marketing', 'Estratégias de marketing digital', '#10B981'),
  ('Negócios Locais', 'negocios-locais', 'Dicas para negócios locais', '#F59E0B'),
  ('Produtividade', 'produtividade', 'Eficiência e gestão de tempo', '#EC4899')
ON CONFLICT (slug) DO NOTHING;

-- Criar bucket para imagens do blog
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Política para upload autenticado
CREATE POLICY "Authenticated users can upload blog images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'blog-images');

-- Política para leitura pública
CREATE POLICY "Blog images are publicly accessible"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'blog-images');

-- Política para update autenticado
CREATE POLICY "Authenticated users can update blog images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'blog-images');

-- Política para delete autenticado
CREATE POLICY "Authenticated users can delete blog images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'blog-images');