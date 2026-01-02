import Layout from "@/components/layout/Layout";
import { CheckCircle } from "lucide-react";
import { AnimatedSection } from "@/hooks/use-scroll-animation";
import { AnimatedCounter } from "@/hooks/use-count-animation";

const Sobre = () => (
  <Layout>
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/30">
      <div className="container max-w-3xl text-center">
        <AnimatedSection animation="fade-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre a ClickOne AI</h1>
          <p className="text-lg text-muted-foreground">Transformando o atendimento ao cliente com inteligência artificial.</p>
        </AnimatedSection>
      </div>
    </section>
    
    {/* Stats Section */}
    <section className="py-12 bg-primary text-primary-foreground">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <AnimatedSection animation="scale" delay={0}>
            <div className="text-4xl md:text-5xl font-bold mb-2">
              <AnimatedCounter end={500} suffix="+" />
            </div>
            <p className="text-primary-foreground/80 text-sm">Clientes Ativos</p>
          </AnimatedSection>
          <AnimatedSection animation="scale" delay={100}>
            <div className="text-4xl md:text-5xl font-bold mb-2">
              <AnimatedCounter end={1} suffix="M+" />
            </div>
            <p className="text-primary-foreground/80 text-sm">Chamadas Atendidas</p>
          </AnimatedSection>
          <AnimatedSection animation="scale" delay={200}>
            <div className="text-4xl md:text-5xl font-bold mb-2">
              <AnimatedCounter end={98} suffix="%" />
            </div>
            <p className="text-primary-foreground/80 text-sm">Taxa de Satisfação</p>
          </AnimatedSection>
          <AnimatedSection animation="scale" delay={300}>
            <div className="text-4xl md:text-5xl font-bold mb-2">
              <AnimatedCounter end={24} suffix="/7" />
            </div>
            <p className="text-primary-foreground/80 text-sm">Suporte Disponível</p>
          </AnimatedSection>
        </div>
      </div>
    </section>

    <section className="py-16 bg-background">
      <div className="container max-w-3xl">
        <AnimatedSection animation="fade-up">
          <h2 className="text-2xl font-bold mb-4">Nossa Missão</h2>
          <p className="text-muted-foreground mb-8">Ajudar empresas de serviços a nunca mais perder uma ligação ou lead, utilizando tecnologia de IA de ponta para automatizar o atendimento ao cliente.</p>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-up" delay={200}>
          <h2 className="text-2xl font-bold mb-4">Nossos Valores</h2>
          <ul className="space-y-3">
            {["Inovação constante", "Foco no cliente", "Simplicidade e eficiência", "Resultados mensuráveis"].map((v, i) => (
              <li key={i} className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-primary" /><span>{v}</span></li>
            ))}
          </ul>
        </AnimatedSection>
      </div>
    </section>
  </Layout>
);

export default Sobre;
