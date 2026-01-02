import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Users, Clock, TrendingUp, Headphones, Star, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/hooks/use-scroll-animation";
import { AnimatedCounter } from "@/hooks/use-count-animation";

const benefits = [
  {
    icon: Clock,
    title: "Atendimento 24/7",
    description: "Nunca perca uma ligação, mesmo fora do horário comercial ou aos finais de semana."
  },
  {
    icon: Users,
    title: "Sem necessidade de contratar",
    description: "Economize com salários, encargos e treinamento de funcionários para atendimento."
  },
  {
    icon: TrendingUp,
    title: "Aumente suas conversões",
    description: "Responda leads em segundos e agende mais clientes automaticamente."
  },
  {
    icon: Headphones,
    title: "Atendimento profissional",
    description: "IA treinada para representar sua empresa com qualidade e cordialidade."
  }
];

const useCases = [
  "Atender ligações quando você está em serviço",
  "Responder mensagens no WhatsApp instantaneamente",
  "Agendar clientes sem interrupções no seu trabalho",
  "Fazer follow-up automático com leads",
  "Qualificar clientes antes de retornar a ligação"
];

const testimonials = [
  {
    name: "Marco Oliveira",
    company: "Oliveira Plumbing LLC",
    location: "Austin, TX",
    text: "Eu trabalhava sozinho e perdia muitas ligações. Agora a IA atende tudo e eu só foco no serviço. Meus agendamentos dobraram!",
    rating: 5,
  },
  {
    name: "Lucia Santos",
    company: "Santos Cleaning Services",
    location: "Miami, FL",
    text: "Como empreendedora solo, não tinha como atender o telefone enquanto limpava. A ClickOne AI mudou meu negócio completamente.",
    rating: 5,
  }
];

const PequenaEmpresa = () => (
  <Layout>
    {/* Hero Section */}
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/30 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection animation="fade-up">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              Para empresas de 1-10 funcionários
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              IA de Atendimento para <span className="text-primary">Pequenas Empresas</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Pare de perder clientes por não conseguir atender o telefone. 
              Nossa IA cuida do atendimento enquanto você foca no que faz de melhor: seu trabalho.
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
              <AnimatedCounter end={40} suffix="%" />
            </div>
            <p className="text-primary-foreground/80 text-sm">Mais agendamentos</p>
          </AnimatedSection>
          <AnimatedSection animation="scale" delay={100}>
            <div className="text-3xl md:text-4xl font-bold mb-1">
              <AnimatedCounter end={0} suffix="" prefix="$" />
            </div>
            <p className="text-primary-foreground/80 text-sm">Em salários extras</p>
          </AnimatedSection>
          <AnimatedSection animation="scale" delay={200}>
            <div className="text-3xl md:text-4xl font-bold mb-1">
              <AnimatedCounter end={24} suffix="/7" />
            </div>
            <p className="text-primary-foreground/80 text-sm">Disponibilidade</p>
          </AnimatedSection>
          <AnimatedSection animation="scale" delay={300}>
            <div className="text-3xl md:text-4xl font-bold mb-1">
              <AnimatedCounter end={5} suffix="s" />
            </div>
            <p className="text-primary-foreground/80 text-sm">Tempo de resposta</p>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* Problem Section */}
    <section className="py-16 bg-background">
      <div className="container max-w-4xl">
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O desafio de ser pequeno
            </h2>
            <p className="text-lg text-muted-foreground">
              Quando você é o dono, o técnico e o atendente ao mesmo tempo, algo sempre fica para trás.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8">
          <AnimatedSection animation="fade-right">
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-destructive">Sem IA</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-destructive">✗</span>
                  Ligações perdidas enquanto está em serviço
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-destructive">✗</span>
                  Clientes frustrados por falta de resposta
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-destructive">✗</span>
                  Leads que vão para a concorrência
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-destructive">✗</span>
                  Noites e finais de semana sem atendimento
                </li>
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-left">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-primary">Com ClickOne AI</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  100% das ligações atendidas, sempre
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  Respostas instantâneas no WhatsApp
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  Agendamentos feitos automaticamente
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  Atendimento 24/7, 365 dias por ano
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
            Por que pequenas empresas escolhem a ClickOne AI
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

    {/* Use Cases */}
    <section className="py-16 bg-background">
      <div className="container max-w-4xl">
        <AnimatedSection animation="fade-up">
          <h2 className="text-3xl font-bold text-center mb-12">
            O que a IA faz por você
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-4">
          {useCases.map((useCase, index) => (
            <AnimatedSection key={index} animation="fade-up" delay={index * 50}>
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <span>{useCase}</span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-16 bg-muted/30">
      <div className="container">
        <AnimatedSection animation="fade-up">
          <h2 className="text-3xl font-bold text-center mb-12">
            Histórias de pequenos empreendedores
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
            Pronto para crescer sem contratar?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Agende uma demo gratuita e veja como a ClickOne AI pode transformar o atendimento da sua pequena empresa.
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

export default PequenaEmpresa;
