import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo } from "react";
import DOMPurify from "dompurify";
import { format } from "date-fns";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { AnimatedSection } from "@/hooks/use-scroll-animation";
import { usePostBySlug, useIncrementViews } from "@/hooks/useBlogPosts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = usePostBySlug(slug || "");
  const incrementViews = useIncrementViews();

  useEffect(() => {
    if (slug && post) {
      incrementViews.mutate(slug);
    }
  }, [slug, post?.id]);

  if (isLoading) {
    return (
      <Layout>
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl mx-auto">
            <Skeleton className="h-8 w-32 mb-8" />
            <Skeleton className="h-12 w-3/4 mb-6" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <Skeleton className="h-64 w-full rounded-xl mb-8" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </section>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <SEO title="Post não encontrado" description="O artigo que você procura não existe." />
        <section className="py-20 min-h-[60vh] flex items-center">
          <div className="container text-center">
            <h1 className="text-3xl font-bold mb-4">Post não encontrado</h1>
            <p className="text-muted-foreground mb-8">O artigo que você procura não existe ou foi removido.</p>
            <Button asChild>
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Blog
              </Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO 
        title={post.meta_title || post.title}
        description={post.meta_description || post.excerpt || ""}
      />
      <section className="py-16 md:py-24">
        <div className="container">
          <AnimatedSection className="max-w-3xl mx-auto">
            <Button variant="ghost" asChild className="mb-8">
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Blog
              </Link>
            </Button>

            {post.cover_image && (
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
              />
            )}

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b">
              {post.published_at && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(post.published_at), "dd MMM yyyy")}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.read_time} min de leitura</span>
              </div>
            </div>

            <div 
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.content, {
                  ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre', 'hr', 'span', 'div', 'figure', 'figcaption'],
                  ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel'],
                  ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
                }),
              }}
            />

            <div className="mt-12 pt-8 border-t">
              <h3 className="text-xl font-semibold mb-4">Pronto para transformar seu atendimento?</h3>
              <Button asChild>
                <Link to="/agendar-demo">Agendar Demo Grátis</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
