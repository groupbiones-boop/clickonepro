import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { usePublishedPosts } from "@/hooks/useBlogPosts";
import { format } from "date-fns";

const Blog = () => {
  const { data: posts, isLoading } = usePublishedPosts();

  return (
    <Layout>
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/30">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Blog</h1>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Insights, tips, and news about AI-powered customer service
          </p>

          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : posts?.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No posts published yet. Check back soon!
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {posts?.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`}>
                  <Card className="hover:shadow-lg transition-shadow h-full group">
                    {post.cover_image && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-muted-foreground">
                          {post.published_at
                            ? format(new Date(post.published_at), "MMM d, yyyy")
                            : ""}
                        </span>
                        {post.blog_categories && (
                          <Badge variant="secondary" style={{ backgroundColor: post.blog_categories.color + "20", color: post.blog_categories.color }}>
                            {post.blog_categories.name}
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {post.read_time} min read
                        </span>
                        <span className="text-primary text-sm font-medium">
                          Read more →
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
