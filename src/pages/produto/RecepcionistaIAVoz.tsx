import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { AnimatedSection } from "@/hooks/use-scroll-animation";
import { AnimatedCounter } from "@/hooks/use-count-animation";
import {
  Clock,
  Calendar,
  Users,
  CheckCircle,
  ArrowRight,
  Globe,
  Mic,
  BarChart3,
} from "lucide-react";
import heroVoiceAi from "@/assets/hero-voice-ai.jpg";

const features = [
  {
    icon: Mic,
    title: "Voz Natural e Humanizada",
    description: "IA conversacional com voz natural que seus clientes não vão perceber que é um robô.",
  },
  {
    icon: Clock,
    title: "Disponível 24/7",
    description: "Atendimento ininterrupto, incluindo noites, fins de semana e feriados.",
  },
  {
    icon: Calendar,
    title: "Agendamento Automático",
    description: "Integra com sua agenda e marca serviços automaticamente.",
  },
  {
    icon: Users,
    title: "Qualificação de Leads",
    description: "Coleta informações essenciais antes de transferir para você.",
  },
  {
    icon: Globe,
    title: "Múltiplos Idiomas",
    description: "Atendimento em português, inglês, espanhol e outros idiomas.",
  },
  {
    icon: BarChart3,
    title: "Analytics Detalhados",
    description: "Dashboard completo com métricas de chamadas e conversões.",
  },
];

const benefits = [
  "Redução de 80% em chamadas perdidas",
  "Aumento de 40% na taxa de conversão",
  "Economia de até 70% comparado a recepcionistas tradicionais",
  "Configuração em menos de 24 horas",
  "Integração com mais de 50 ferramentas",
  "Suporte técnico dedicado",
];

const RecepcionistaIAVoz = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="fade-left">
              <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                Recepcionista IA de Voz
              </span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Atendimento Telefônico Inteligente{" "}
                <span className="text-primary">24 Horas por Dia</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Nossa IA de voz atende chamadas, qualifica leads e agenda serviços
                automaticamente. Nunca mais perca um cliente por não atender o telefone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/agendar-demo">
                    Agendar Demo Grátis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/setores">Ver Setores Atendidos</Link>
                </Button>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-right" delay={200}>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={heroVoiceAi} 
                  alt="Recepcionista virtual com IA atendendo chamadas" 
                  className="w-full h-auto"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <AnimatedSection animation="scale" delay={0}>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedCounter end={80} suffix="%" />
              </div>
              <p className="text-primary-foreground/80 text-sm">Menos Chamadas Perdidas</p>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={100}>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedCounter end={40} suffix="%" />
              </div>
              <p className="text-primary-foreground/80 text-sm">Mais Conversões</p>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={200}>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedCounter end={24} suffix="h" />
              </div>
              <p className="text-primary-foreground/80 text-sm">Setup Rápido</p>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={300}>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedCounter end={50} suffix="+" />
              </div>
              <p className="text-primary-foreground/80 text-sm">Integrações</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Recursos Avançados de Voz
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Tecnologia de ponta para um atendimento telefônico impecável.
            </p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <AnimatedSection key={index} animation="scale" delay={index * 100}>
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="fade-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Como Funciona o Atendimento por Voz
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Cliente Liga para Seu Número</h3>
                    <p className="text-muted-foreground text-sm">
                      A chamada é automaticamente direcionada para nossa IA.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">IA Atende com Voz Natural</h3>
                    <p className="text-muted-foreground text-sm">
                      Saudação personalizada e conversa fluida como um humano.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Qualifica e Coleta Informações</h3>
                    <p className="text-muted-foreground text-sm">
                      Tipo de serviço, endereço, disponibilidade e urgência.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Agenda ou Transfere</h3>
                    <p className="text-muted-foreground text-sm">
                      Marca na sua agenda ou transfere para você se necessário.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-right" delay={200}>
              <div className="bg-accent/50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">Benefícios Comprovados</h3>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para Automatizar Seu Atendimento Telefônico?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Agende uma demonstração gratuita e ouça nossa IA em ação.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/agendar-demo">
                Agendar Demo Grátis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default RecepcionistaIAVoz;
