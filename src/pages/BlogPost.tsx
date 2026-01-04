import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { AnimatedSection } from "@/hooks/use-scroll-animation";

const posts: Record<string, { title: string; date: string; author: string; content: string[] }> = {
  "ia-atendimento": {
    title: "Como a IA está revolucionando o atendimento ao cliente",
    date: "15 Dez 2025",
    author: "Equipe ClickOne AI",
    content: [
      "A inteligência artificial está transformando a forma como empresas de serviços interagem com seus clientes. De atendimento telefônico automatizado a chatbots inteligentes, as possibilidades são infinitas.",
      "Para empresas de serviços residenciais e comerciais, isso significa nunca mais perder uma ligação importante. A IA pode atender chamadas 24/7, qualificar leads e agendar serviços automaticamente.",
      "Estudos mostram que 62% das chamadas para pequenas empresas não são atendidas. Com uma recepcionista IA, esse número pode cair para zero, resultando em mais conversões e crescimento do negócio.",
      "A ClickOne AI oferece soluções personalizadas para diversos setores, desde empresas de limpeza até construtoras, garantindo que cada chamada seja uma oportunidade aproveitada."
    ]
  },
  "automatizar-telefone": {
    title: "5 motivos para automatizar seu atendimento telefônico",
    date: "10 Dez 2025",
    author: "Equipe ClickOne AI",
    content: [
      "1. Disponibilidade 24/7: Seus clientes podem ligar a qualquer hora e sempre serão atendidos.",
      "2. Redução de custos: Uma IA custa uma fração do salário de uma recepcionista tradicional.",
      "3. Consistência: O atendimento é sempre profissional, sem variações de humor ou cansaço.",
      "4. Escalabilidade: Atenda 1 ou 100 chamadas simultâneas sem perder qualidade.",
      "5. Dados e insights: Cada chamada gera dados valiosos para melhorar seu negócio."
    ]
  },
  "futuro-servicos": {
    title: "O futuro dos serviços residenciais com inteligência artificial",
    date: "5 Dez 2025",
    author: "Equipe ClickOne AI",
    content: [
      "O mercado de serviços residenciais está passando por uma transformação digital sem precedentes. A inteligência artificial está no centro dessa revolução.",
      "Empresas que adotam tecnologia de IA para atendimento reportam até 40% de aumento nas conversões de leads.",
      "Além do atendimento, a IA está sendo usada para otimização de rotas, previsão de demanda e até mesmo diagnósticos remotos.",
      "O futuro pertence às empresas que souberem combinar o toque humano com a eficiência da tecnologia. A ClickOne AI ajuda você a fazer exatamente isso."
    ]
  }
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? posts[slug] : null;

  if (!post) {
    return (
      <Layout>
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/30 min-h-[60vh] flex items-center">
          <div className="container text-center">
            <h1 className="text-3xl font-bold mb-4">Post não encontrado</h1>
            <p className="text-muted-foreground mb-8">O artigo que você procura não existe.</p>
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
        title={`${post.title} | ClickOne AI Blog`}
        description={post.content[0]?.substring(0, 160)}
        schemaType="Article"
        schemaData={{
          headline: post.title,
          datePublished: "2025-12-15",
          author: post.author,
          articleImage: "https://clickone.ai/favicon.png"
        }}
      />
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/30">
        <div className="container">
          <AnimatedSection animation="fade-up" className="max-w-3xl mx-auto">
            <Button variant="ghost" asChild className="mb-8">
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Blog
              </Link>
            </Button>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              {post.content.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground mb-6 leading-relaxed text-base md:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-xl font-semibold mb-4">Pronto para transformar seu atendimento?</h3>
              <Button asChild>
                <Link to="/agendar-demo">
                  Agendar Demo Grátis
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
