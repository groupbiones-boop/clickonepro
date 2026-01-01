import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";

const posts = [
  { title: "Como a IA está revolucionando o atendimento ao cliente", slug: "ia-atendimento", date: "15 Dez 2025" },
  { title: "5 motivos para automatizar seu atendimento telefônico", slug: "automatizar-telefone", date: "10 Dez 2025" },
  { title: "O futuro dos serviços residenciais com inteligência artificial", slug: "futuro-servicos", date: "5 Dez 2025" },
];

const Blog = () => (
  <Layout>
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/30">
      <div className="container">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">Blog</h1>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {posts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`}>
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="pt-6">
                  <span className="text-sm text-muted-foreground">{post.date}</span>
                  <h3 className="text-lg font-semibold mt-2">{post.title}</h3>
                  <span className="text-primary text-sm mt-4 block">Ler mais →</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Blog;
