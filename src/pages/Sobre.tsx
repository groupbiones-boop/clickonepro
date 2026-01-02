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
          <p className="text-muted-foreground mb-8">Ajudar empresas de serviço a atender, responder e acompanhar clientes de forma automática e inteligente, utilizando inteligência artificial para aumentar eficiência, organização e conversão.</p>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-up" delay={100}>
          <h2 className="text-2xl font-bold mb-4">Nossa Visão</h2>
          <p className="text-muted-foreground mb-8">Ser a principal plataforma de inteligência artificial para atendimento e operação de empresas de serviço, eliminando falhas humanas no processo de resposta, acompanhamento e agendamento.</p>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-up" delay={200}>
          <h2 className="text-2xl font-bold mb-4">O que orienta nossas decisões</h2>
          <ul className="space-y-3 mb-8">
            {["Atendimento imediato e contínuo", "Uso prático de inteligência artificial", "Simplicidade operacional", "Resultados mensuráveis"].map((v, i) => (
              <li key={i} className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-primary" /><span>{v}</span></li>
            ))}
          </ul>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-up" delay={300}>
          <h2 className="text-2xl font-bold mb-4">Como colocamos isso em prática</h2>
          <p className="text-muted-foreground mb-4">A ClickOne AI automatiza:</p>
          <ul className="space-y-2 mb-8 text-muted-foreground">
            {["Atendimento multicanal", "Respostas em tempo real", "Qualificação de leads", "Agendamentos", "Follow-up contínuo"].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground">Tudo integrado em uma única plataforma, criada para operar no ritmo de empresas de serviço.</p>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-up" delay={400}>
          <h2 className="text-2xl font-bold mb-4 mt-8">O resultado</h2>
          <p className="text-lg text-muted-foreground">
            Menos esforço operacional.<br />
            Mais controle.<br />
            Mais conversões.
          </p>
        </AnimatedSection>
      </div>
    </section>
  </Layout>
);

export default Sobre;
