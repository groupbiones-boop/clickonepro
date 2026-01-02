import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Building2, BarChart3, Shield, Headphones, Star, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/hooks/use-scroll-animation";
import { AnimatedCounter } from "@/hooks/use-count-animation";

const benefits = [
  {
    icon: Building2,
    title: "Atendimento padronizado",
    description: "Mesma qualidade em todas as unidades, garantindo a consistência da marca."
  },
  {
    icon: BarChart3,
    title: "Dashboard centralizado",
    description: "Visão completa do desempenho de todas as unidades em tempo real."
  },
  {
    icon: Shield,
    title: "Controle de qualidade",
    description: "Monitore e garanta o padrão de atendimento em toda a rede."
  },
  {
    icon: Headphones,
    title: "Suporte dedicado",
    description: "Gerente de conta exclusivo e suporte prioritário para sua rede."
  }
];

const enterpriseFeatures = [
  "Configuração centralizada para toda a rede",
  "Scripts personalizados por unidade ou região",
  "Relatórios consolidados e por filial",
  "Integração com sistemas de franquia",
  "Treinamento e onboarding para franqueados",
  "SLA garantido com uptime de 99.9%"
];

const testimonials = [
  {
    name: "Eduardo Mendes",
    company: "Mendes Cleaning Franchise",
    location: "15 unidades - FL, TX, CA",
    text: "Gerenciar o atendimento de 15 unidades era um pesadelo. Com a ClickOne AI, temos padrão em todas as franquias e visibilidade total em um único dashboard.",
    rating: 5,
  },
  {
    name: "Amanda Silva",
    company: "Silva HVAC Network",
    location: "8 unidades - Southeast US",
    text: "Nossos franqueados adoraram. Eles focam no serviço enquanto a IA cuida do atendimento. A satisfação do cliente subiu 40% em toda a rede.",
    rating: 5,
  }
];

const RedeFranquias = () => (
  <Layout>
    {/* Hero Section */}
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/30 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection animation="fade-up">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              Soluções Enterprise para múltiplas unidades
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              IA de Atendimento para <span className="text-primary">Redes de Franquias</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Padronize o atendimento em toda a sua rede. 
              Controle centralizado, qualidade garantida em cada unidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/agendar-demo">
                  Agendar Demo Enterprise <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contato">Falar com Especialista</Link>
              </Button>
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
            <div className="text-3xl md:text-4xl font-bold mb-1">
              <AnimatedCounter end={50} suffix="+" />
            </div>
            <p className="text-primary-foreground/80 text-sm">Redes atendidas</p>
          </AnimatedSection>
          <AnimatedSection animation="scale" delay={100}>
            <div className="text-3xl md:text-4xl font-bold mb-1">
              <AnimatedCounter end={99.9} suffix="%" />
            </div>
            <p className="text-primary-foreground/80 text-sm">Uptime garantido</p>
          </AnimatedSection>
          <AnimatedSection animation="scale" delay={200}>
            <div className="text-3xl md:text-4xl font-bold mb-1">
              <AnimatedCounter end={40} suffix="%" />
            </div>
            <p className="text-primary-foreground/80 text-sm">Aumento em satisfação</p>
          </AnimatedSection>
          <AnimatedSection animation="scale" delay={300}>
            <div className="text-3xl md:text-4xl font-bold mb-1">
              <AnimatedCounter end={24} suffix="/7" />
            </div>
            <p className="text-primary-foreground/80 text-sm">Suporte dedicado</p>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* Enterprise Challenges */}
    <section className="py-16 bg-background">
      <div className="container max-w-4xl">
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O desafio de gerenciar múltiplas unidades
            </h2>
            <p className="text-lg text-muted-foreground">
              Cada franquia é uma extensão da sua marca. Inconsistência no atendimento afeta toda a rede.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8">
          <AnimatedSection animation="fade-right">
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-destructive">Sem padronização</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-destructive">✗</span>
                  Qualidade de atendimento varia entre unidades
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-destructive">✗</span>
                  Difícil monitorar desempenho de cada franquia
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-destructive">✗</span>
                  Custos operacionais inconsistentes
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-destructive">✗</span>
                  Treinamento constante de funcionários
                </li>
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-left">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-primary">Com ClickOne AI Enterprise</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  Atendimento idêntico em todas as unidades
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  Dashboard centralizado com métricas por filial
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  Custo previsível e escalável
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  Zero treinamento, qualidade imediata
                </li>
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* Benefits Section */}
    <section className="py-16 bg-muted/30">
      <div className="container">
        <AnimatedSection animation="fade-up">
          <h2 className="text-3xl font-bold text-center mb-12">
            Funcionalidades Enterprise
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
              <div className="bg-card p-6 rounded-xl border border-border h-full">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection animation="fade-up" delay={200}>
          <div className="bg-card border border-border rounded-xl p-8 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-6 text-center">Recursos inclusos no plano Enterprise</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {enterpriseFeatures.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-16 bg-background">
      <div className="container">
        <AnimatedSection animation="fade-up">
          <h2 className="text-3xl font-bold text-center mb-12">
            Redes que confiam na ClickOne AI
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
              <div className="bg-card p-6 rounded-xl border border-border h-full">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <div className="relative mb-4">
                  <Quote className="absolute -top-2 -left-1 h-6 w-6 text-primary/20" />
                  <p className="text-muted-foreground pl-4 italic">{testimonial.text}</p>
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container text-center">
        <AnimatedSection animation="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para padronizar sua rede?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Agende uma demo enterprise e descubra como a ClickOne AI pode transformar o atendimento de toda a sua rede de franquias.
          </p>
          <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
            <Link to="/agendar-demo">
              Agendar Demo Enterprise <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </AnimatedSection>
      </div>
    </section>
  </Layout>
);

export default RedeFranquias;
