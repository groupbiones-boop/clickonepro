import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { AnimatedSection } from "@/hooks/use-scroll-animation";
import AudioTranscriptPlayer from "@/components/AudioTranscriptPlayer";
import { audioDemos } from "@/data/audioDemo";
import {
  Phone,
  MessageSquare,
  Calendar,
  Users,
  Clock,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Smartphone,
  Bot,
  Headphones,
  Star,
} from "lucide-react";
import heroHome from "@/assets/hero-home.jpg";
import mobileApp from "@/assets/mobile-app-clickone.jpg";
import industryCleaning from "@/assets/industry-cleaning.jpg";
import industryConstruction from "@/assets/industry-construction.jpg";
import industryHvac from "@/assets/industry-hvac.jpg";
import industryPlumbing from "@/assets/industry-plumbing-new.jpg";
import industryElectrical from "@/assets/industry-electrical.jpg";
import industryLandscaping from "@/assets/industry-landscaping.jpg";
import logoClutch from "@/assets/logo-clutch.svg";
import logoG2 from "@/assets/logo-g2.svg";
import logoCapterra from "@/assets/logo-capterra.svg";
import logoTrustpilot from "@/assets/logo-trustpilot.svg";

const industries = [
  { name: "Empresas de Limpeza", slug: "limpeza", image: industryCleaning },
  { name: "Construção & Reformas", slug: "construcao", image: industryConstruction },
  { name: "HVAC / Climatização", slug: "hvac", image: industryHvac },
  { name: "Encanamento", slug: "encanamento", image: industryPlumbing },
  { name: "Serviços Elétricos", slug: "eletrica", image: industryElectrical },
  { name: "Paisagismo", slug: "paisagismo", image: industryLandscaping },
];

const features = [
  {
    icon: Clock,
    title: "Atendimento 24/7",
    description: "Nunca perca uma chamada, mesmo fora do horário comercial.",
  },
  {
    icon: Calendar,
    title: "Agendamento Automático",
    description: "A IA agenda serviços diretamente na sua agenda.",
  },
  {
    icon: Users,
    title: "Qualificação de Leads",
    description: "Identifica e prioriza os melhores clientes automaticamente.",
  },
  {
    icon: TrendingUp,
    title: "Aumento de Conversões",
    description: "Mais leads convertidos em clientes pagantes.",
  },
];

const channels = [
  { name: "Telefone", icon: Phone },
  { name: "SMS", icon: MessageSquare },
  { name: "WhatsApp", icon: Smartphone },
  { name: "Instagram", icon: MessageSquare },
  { name: "Facebook", icon: MessageSquare },
  { name: "Website Chat", icon: Bot },
];

const steps = [
  {
    number: "01",
    title: "Cliente Liga",
    description: "Seu cliente liga ou envia mensagem a qualquer hora.",
  },
  {
    number: "02",
    title: "IA Atende",
    description: "Nossa IA atende instantaneamente, sem tempo de espera.",
  },
  {
    number: "03",
    title: "Qualifica & Agenda",
    description: "A IA coleta informações e agenda o serviço.",
  },
  {
    number: "04",
    title: "Você Recebe",
    description: "Você recebe o lead qualificado e agendado.",
  },
];

const Index = () => {
  const [selectedDemo, setSelectedDemo] = useState(audioDemos[0]);

  return (
    <Layout>
      {/* Hero Section - Enhanced */}
      <section className="relative overflow-hidden py-24 md:py-40 min-h-[90vh] flex items-center">
        {/* Background Image with Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroHome})` }}
        />
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/95 via-foreground/85 to-primary/40" />
        
        {/* Floating Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 mb-8 animate-fade-in">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm text-primary-foreground/90 font-medium">Recepcionista IA para Empresas de Serviços</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-background leading-tight">
              Nunca Perca Uma Ligação.{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                  Nunca Perca Um Cliente.
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-background/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              Recepcionista virtual com inteligência artificial que atende chamadas,
              qualifica leads e agenda serviços 24 horas por dia, 7 dias por semana.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group text-base px-8 py-6 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all" asChild>
                <Link to="/agendar-demo">
                  Agendar Demo Grátis
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 py-6 bg-background/10 border-background/30 text-background hover:bg-background/20 hover:border-background/50 backdrop-blur-sm" asChild>
                <Link to="/setores">Ver Setores Atendidos</Link>
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-background/50">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm">Setup em 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm">Sem contrato longo</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm">Suporte em português</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Audio Demo Section */}
      <section className="py-16 md:py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.05),transparent_50%)]" />
        
        <div className="container relative">
          <AnimatedSection className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
              <Headphones className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Demonstração ao Vivo</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ouça Nossa IA em Ação
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Escute demonstrações reais de como a ClickOne AI atende chamadas e qualifica leads para diferentes tipos de negócios.
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {audioDemos.map((demo) => (
                <Button
                  key={demo.id}
                  variant={selectedDemo.id === demo.id ? "default" : "outline"}
                  onClick={() => setSelectedDemo(demo)}
                  className="rounded-full px-6"
                >
                  {demo.title}
                </Button>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <div className="max-w-4xl mx-auto">
              <AudioTranscriptPlayer demo={selectedDemo} />
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={300} className="text-center mt-10">
            <p className="text-muted-foreground mb-4">
              Impressionado? Veja como isso pode funcionar para seu negócio.
            </p>
            <Button asChild>
              <Link to="/agendar-demo">
                Agendar Minha Demo Personalizada
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Social Proof Ratings */}
      <section className="bg-foreground py-8 border-y border-border/20">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {/* Clutch */}
            <div className="flex items-center gap-3">
              <span className="text-background/90 font-bold text-2xl">4.8</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                ))}
              </div>
              <img src={logoClutch} alt="Clutch" className="h-6" />
            </div>
            
            {/* G2 */}
            <div className="flex items-center gap-3">
              <span className="text-background/90 font-bold text-2xl">4.9</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                ))}
              </div>
              <img src={logoG2} alt="G2" className="h-7" />
            </div>
            
            {/* Capterra */}
            <div className="flex items-center gap-3">
              <span className="text-background/90 font-bold text-2xl">4.8</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                ))}
              </div>
              <img src={logoCapterra} alt="Capterra" className="h-6" />
            </div>
            
            {/* Trustpilot */}
            <div className="flex items-center gap-3">
              <span className="text-background/90 font-bold text-2xl">4.3</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < 4 ? 'fill-green-500 text-green-500' : 'fill-green-500/30 text-green-500/30'}`} />
                ))}
              </div>
              <img src={logoTrustpilot} alt="Trustpilot" className="h-6" />
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution - Enhanced */}
      <section className="py-20 md:py-32 bg-background relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.05),transparent_50%)]" />
        
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-stretch">
            {/* Problem Card */}
            <AnimatedSection animation="fade-left">
              <div className="group relative h-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-destructive/20 to-destructive/5 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative bg-card rounded-2xl p-8 md:p-10 border border-border/50 h-full">
                <div className="inline-flex items-center gap-2 text-destructive text-sm font-semibold mb-6 uppercase tracking-wide">
                  <span className="w-8 h-[2px] bg-destructive" />
                  O Problema
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
                  Ligações Perdidas = <br />
                  <span className="text-destructive">Dinheiro Perdido</span>
                </h2>
                <ul className="space-y-5">
                  <li className="flex items-start gap-4 group/item">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center text-destructive font-bold text-sm">✗</span>
                    <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">
                      <strong className="text-foreground">62%</strong> das chamadas para pequenas empresas não são atendidas
                    </span>
                  </li>
                  <li className="flex items-start gap-4 group/item">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center text-destructive font-bold text-sm">✗</span>
                    <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">
                      <strong className="text-foreground">85%</strong> dos clientes não ligam de volta após uma chamada perdida
                    </span>
                  </li>
                  <li className="flex items-start gap-4 group/item">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center text-destructive font-bold text-sm">✗</span>
                    <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">
                      Você está no trabalho e <strong className="text-foreground">não pode atender</strong> o telefone
                    </span>
                  </li>
                </ul>
              </div>
              </div>
            </AnimatedSection>
            
            {/* Solution Card */}
            <AnimatedSection animation="fade-right" delay={200}>
              <div className="group relative h-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-primary/10 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 rounded-2xl p-8 md:p-10 border border-primary/20 h-full">
                <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-6 uppercase tracking-wide">
                  <span className="w-8 h-[2px] bg-primary" />
                  A Solução
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
                  ClickOne AI <br />
                  <span className="text-primary">Trabalha Por Você</span>
                </h3>
                <ul className="space-y-5">
                  <li className="flex items-start gap-4 group/item">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </span>
                    <span className="text-foreground group-hover/item:text-primary transition-colors">
                      Atendimento instantâneo <strong>24/7</strong>, sem espera
                    </span>
                  </li>
                  <li className="flex items-start gap-4 group/item">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </span>
                    <span className="text-foreground group-hover/item:text-primary transition-colors">
                      <strong>Qualificação automática</strong> de leads
                    </span>
                  </li>
                  <li className="flex items-start gap-4 group/item">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </span>
                    <span className="text-foreground group-hover/item:text-primary transition-colors">
                      Agendamento <strong>integrado à sua agenda</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-4 group/item">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </span>
                    <span className="text-foreground group-hover/item:text-primary transition-colors">
                      Você trabalha enquanto a <strong>IA atende</strong>
                    </span>
                  </li>
                </ul>
                
                {/* CTA inside solution */}
                <div className="mt-8 pt-6 border-t border-primary/20">
                  <Button className="w-full group" asChild>
                    <Link to="/agendar-demo">
                      Começar Agora
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Como Funciona</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Em 4 passos simples, você transforma cada ligação em uma oportunidade de negócio.
            </p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                <Card className="relative overflow-hidden h-full">
                  <CardContent className="pt-6">
                    <span className="text-5xl font-bold text-primary/20">{step.number}</span>
                    <h3 className="text-xl font-semibold mt-2 mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Recursos Poderosos de IA
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Tecnologia de ponta para maximizar seu atendimento e conversões.
            </p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <AnimatedSection key={index} animation="scale" delay={index * 100}>
                <Card className="text-center h-full">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
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

      {/* Omnichannel */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Atendimento Omnichannel
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Esteja presente em todos os canais onde seus clientes estão.
            </p>
          </AnimatedSection>
          <AnimatedSection animation="fade-up">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {channels.map((channel, index) => (
                <div
                  key={index}
                  className="bg-primary-foreground/10 rounded-lg p-4 text-center hover:bg-primary-foreground/20 transition-colors"
                >
                  <channel.icon className="h-8 w-8 mx-auto mb-2" />
                  <span className="text-sm font-medium">{channel.name}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mobile App */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="fade-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Aplicativo Mobile para Profissionais em Campo
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Receba notificações instantâneas de novos leads, gerencie agendamentos
                e acompanhe métricas em tempo real, tudo na palma da sua mão.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Notificações push de novos leads</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Gestão de agenda em tempo real</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Histórico de conversas com clientes</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Dashboard de métricas e performance</span>
                </li>
              </ul>
              <Button asChild>
                <Link to="/agendar-demo">Saiba Mais</Link>
              </Button>
            </AnimatedSection>
            <AnimatedSection animation="fade-right" delay={200}>
              <div className="relative rounded-2xl overflow-hidden">
                <img 
                  src={mobileApp} 
                  alt="Aplicativo mobile ClickOne AI mostrando notificações e agenda" 
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Industries Preview */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Setores que Atendemos
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Soluções personalizadas para cada tipo de negócio de serviços.
            </p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                <Link to={`/setores/${industry.slug}`}>
                  <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full overflow-hidden">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={industry.image} 
                        alt={industry.name} 
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="text-lg font-semibold">{industry.name}</h3>
                      <span className="text-sm text-primary">Saiba mais →</span>
                    </CardContent>
                  </Card>
                </Link>
              </AnimatedSection>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/setores">Ver Todos os Setores</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para Transformar Seu Atendimento?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Agende uma demonstração gratuita e veja como a ClickOne AI pode
            aumentar suas conversões em até 40%.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/agendar-demo">
              Agendar Demo Grátis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
