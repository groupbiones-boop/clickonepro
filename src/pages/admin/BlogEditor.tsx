import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AdminAuthProvider, useAdminAuth } from "@/contexts/AdminAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  useCategories,
  useCreatePost,
  useUpdatePost,
  useAllPosts,
} from "@/hooks/useBlogPosts";
import { supabase } from "@/integrations/supabase/client";
import RichTextEditor from "@/components/RichTextEditor";
import CoverImageGenerator from "@/components/CoverImageGenerator";
import CategorySelector from "@/components/CategorySelector";

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const calculateReadTime = (content: string): number => {
  const wordsPerMinute = 200;
  const textContent = content.replace(/<[^>]*>/g, " ");
  const words = textContent.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
};

const BlogEditorContent = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAdmin, isLoading: authLoading } = useAdminAuth();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [author, setAuthor] = useState("ClickOne AI Team");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const { data: posts } = useAllPosts();
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isEditing && posts) {
      const post = posts.find((p) => p.id === id);
      if (post) {
        setTitle(post.title);
        setSlug(post.slug);
        setExcerpt(post.excerpt || "");
        setContent(post.content);
        setCoverImage(post.cover_image || "");
        setCategoryId(post.category_id || "");
        setAuthor(post.author);
        setMetaTitle(post.meta_title || "");
        setMetaDescription(post.meta_description || "");
      }
    }
  }, [isEditing, id, posts]);

  useEffect(() => {
    if (!isEditing && title) {
      setSlug(generateSlug(title));
    }
  }, [title, isEditing]);

  const handleSave = async (status: "draft" | "published") => {
    if (!title || !content) {
      toast({
        title: "Erro",
        description: "Título e conteúdo são obrigatórios",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const postData = {
        title,
        slug,
        excerpt: excerpt || null,
        content,
        cover_image: coverImage || null,
        category_id: categoryId || null,
        author,
        status,
        published_at: status === "published" ? new Date().toISOString() : null,
        read_time: calculateReadTime(content),
        meta_title: metaTitle || null,
        meta_description: metaDescription || null,
      };

      if (isEditing) {
        await updatePost.mutateAsync({ id, ...postData });
        toast({ title: "Post atualizado com sucesso" });
      } else {
        await createPost.mutateAsync(postData);
        toast({ title: "Post criado com sucesso" });
        navigate("/admin/blog");
      }
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleGenerateContentImage = async (prompt: string): Promise<string> => {
    try {
      const { data, error } = await supabase.functions.invoke(
        "generate-blog-image",
        {
          body: {
            title: prompt,
            type: "content",
          },
        }
      );

      if (error) throw error;

      if (data?.imageUrl) {
        return data.imageUrl;
      }

      throw new Error("No image generated");
    } catch (error: any) {
      toast({
        title: "Erro ao gerar imagem",
        description: error.message,
        variant: "destructive",
      });
      return "";
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/admin/blog">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">
                {isEditing ? "Editar Post" : "Novo Post"}
              </h1>
              <p className="text-muted-foreground">
                {isEditing
                  ? "Atualize seu post do blog"
                  : "Crie um novo post para o blog"}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleSave("draft")}
              disabled={isSaving}
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Salvar Rascunho
            </Button>
            <Button onClick={() => handleSave("published")} disabled={isSaving}>
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Publicar
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Conteúdo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Digite o título do post"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="post-url-slug"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Resumo</Label>
                  <Textarea
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Breve descrição do post (aparece na listagem)"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Conteúdo</Label>
                  <RichTextEditor
                    content={content}
                    onChange={setContent}
                    onGenerateImage={handleGenerateContentImage}
                    placeholder="Escreva o conteúdo do seu post aqui..."
                  />
                  <p className="text-xs text-muted-foreground">
                    Tempo estimado de leitura: {calculateReadTime(content)} min
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <CategorySelector
                    value={categoryId}
                    onChange={setCategoryId}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Autor</Label>
                  <Input
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Nome do autor"
                  />
                </div>
                <CoverImageGenerator
                  value={coverImage}
                  onChange={setCoverImage}
                  postTitle={title}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">Meta Título</Label>
                  <Input
                    id="metaTitle"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder="Título para SEO"
                  />
                  <p className="text-xs text-muted-foreground">
                    {metaTitle.length}/60 caracteres
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Meta Descrição</Label>
                  <Textarea
                    id="metaDescription"
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="Descrição para SEO"
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    {metaDescription.length}/160 caracteres
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogEditor = () => {
  return (
    <AdminAuthProvider>
      <BlogEditorContent />
    </AdminAuthProvider>
  );
};

export default BlogEditor;
