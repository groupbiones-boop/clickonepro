import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Users, BarChart3, Zap, Settings, Star, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/hooks/use-scroll-animation";
import { AnimatedCounter } from "@/hooks/use-count-animation";

const benefits = [
  {
    icon: Users,
    title: "Escale sem aumentar a equipe",
    description: "Atenda mais clientes sem contratar recepcionistas adicionais."
  },
  {
    icon: BarChart3,
    title: "Relatórios detalhados",
    description: "Métricas completas de atendimento para decisões baseadas em dados."
  },
  {
    icon: Zap,
    title: "Integração com seu CRM",
    description: "Conecte a IA ao seu sistema atual sem complicações."
  },
  {
    icon: Settings,
    title: "Personalização avançada",
    description: "Scripts e fluxos customizados para sua operação específica."
  }
];

const challenges = [
  "Volume de ligações que sobrecarrega a equipe",
  "Custo alto para manter recepcionistas em turnos",
  "Inconsistência no atendimento entre funcionários",
  "Dificuldade em escalar durante picos de demanda",
  "Leads perdidos fora do horário comercial"
];

const solutions = [
  "IA que atende volume ilimitado simultaneamente",
  "Custo fixo previsível, sem encargos trabalhistas",
  "Atendimento padronizado e profissional sempre",
  "Escalabilidade instantânea em qualquer momento",
  "Cobertura 24/7 sem custo adicional"
];

const testimonials = [
  {
    name: "Ricardo Ferreira",
    company: "Ferreira HVAC Services Inc",
    location: "Dallas, TX",
    text: "Com 15 funcionários, não podíamos ter uma recepcionista em tempo integral. A ClickOne AI nos deu atendimento profissional 24/7 por uma fração do custo.",
    rating: 5,
  },
  {
    name: "Patricia Lima",
    company: "Lima Construction LLC",
    location: "Atlanta, GA",
    text: "Nosso volume de ligações triplicou na temporada alta. A IA absorveu tudo sem problemas e nossos clientes nem perceberam a diferença.",
    rating: 5,
  }
];

const MediaEmpresa = () => (
  <Layout>
    {/* Hero Section */}
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/30 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection animation="fade-up">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              Para empresas de 11-50 funcionários
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              IA de Atendimento para <span className="text-primary">Médias Empresas</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Escale sua operação de atendimento sem aumentar custos fixos. 
              Atendimento consistente e profissional em qualquer volume.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/agendar-demo">
                  Agendar Demo Grátis <ArrowRight className="ml-2 h-4 w-4" />
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
              <AnimatedCounter end={60} suffix="%" />
            </div>
            <p className="text-primary-foreground/80 text-sm">Redução de custos</p>
          </AnimatedSection>
          <AnimatedSection animation="scale" delay={100}>
            <div className="text-3xl md:text-4xl font-bold mb-1">
              <AnimatedCounter end={100} suffix="%" />
            </div>
            <p className="text-primary-foreground/80 text-sm">Ligações atendidas</p>
          </AnimatedSection>
          <AnimatedSection animation="scale" delay={200}>
            <div className="text-3xl md:text-4xl font-bold mb-1">
              <AnimatedCounter end={3} suffix="x" />
            </div>
            <p className="text-primary-foreground/80 text-sm">Mais capacidade</p>
          </AnimatedSection>
          <AnimatedSection animation="scale" delay={300}>
            <div className="text-3xl md:text-4xl font-bold mb-1">
              <AnimatedCounter end={0} suffix="" prefix="$" />
            </div>
            <p className="text-primary-foreground/80 text-sm">Setup inicial</p>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* Problem vs Solution */}
    <section className="py-16 bg-background">
      <div className="container max-w-5xl">
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Os desafios de escalar o atendimento
            </h2>
            <p className="text-lg text-muted-foreground">
              Médias empresas enfrentam um dilema: crescer a equipe de atendimento é caro, mas não crescer limita o negócio.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8">
          <AnimatedSection animation="fade-right">
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-destructive">Desafios comuns</h3>
              <ul className="space-y-3 text-muted-foreground">
                {challenges.map((challenge, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-destructive">✗</span>
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-left">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-primary">Solução ClickOne AI</h3>
              <ul className="space-y-3 text-muted-foreground">
                {solutions.map((solution, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    {solution}
                  </li>
                ))}
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
            Benefícios para médias empresas
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-16 bg-background">
      <div className="container">
        <AnimatedSection animation="fade-up">
          <h2 className="text-3xl font-bold text-center mb-12">
            O que dizem nossos clientes
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
            Pronto para escalar seu atendimento?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Agende uma demo gratuita e descubra como a ClickOne AI pode ajudar sua empresa a crescer sem complicações.
          </p>
          <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
            <Link to="/agendar-demo">
              Agendar Demo Grátis <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </AnimatedSection>
      </div>
    </section>
  </Layout>
);

export default MediaEmpresa;
