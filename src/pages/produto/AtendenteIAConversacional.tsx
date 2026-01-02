import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { AnimatedSection } from "@/hooks/use-scroll-animation";
import { AnimatedCounter } from "@/hooks/use-count-animation";
import {
  MessageSquare,
  Clock,
  Calendar,
  Users,
  CheckCircle,
  ArrowRight,
  Zap,
  Globe,
  BarChart3,
  Smartphone,
  MessageCircle,
  Instagram,
  Facebook,
  Monitor,
  Search,
  type LucideIcon,
} from "lucide-react";
import heroChatAi from "@/assets/hero-chat-ai.jpg";

const features = [
  {
    icon: MessageSquare,
    title: "Multi-Canal",
    description: "SMS, WhatsApp, Instagram, Facebook Messenger e chat do site em uma única plataforma.",
  },
  {
    icon: Zap,
    title: "Respostas Instantâneas",
    description: "Tempo de resposta de menos de 3 segundos, 24 horas por dia.",
  },
  {
    icon: Calendar,
    title: "Agendamento por Chat",
    description: "Clientes agendam serviços diretamente pela conversa.",
  },
  {
    icon: Users,
    title: "Follow-up Automático",
    description: "Sequências de mensagens para nutrir leads e recuperar clientes.",
  },
  {
    icon: Globe,
    title: "Múltiplos Idiomas",
    description: "Conversação natural em português, inglês, espanhol e mais.",
  },
  {
    icon: BarChart3,
    title: "Métricas em Tempo Real",
    description: "Acompanhe conversões, tempo de resposta e satisfação.",
  },
];

const channels: { name: string; icon: LucideIcon }[] = [
  { name: "SMS", icon: Smartphone },
  { name: "WhatsApp", icon: MessageCircle },
  { name: "Instagram DM", icon: Instagram },
  { name: "Facebook Messenger", icon: Facebook },
  { name: "Website Chat", icon: Monitor },
  { name: "Google Business", icon: Search },
];

const benefits = [
  "Taxa de resposta de 100% em todos os canais",
  "Aumento de 60% no engajamento de leads",
  "Redução de 50% no tempo de conversão",
  "Integração com CRM e ferramentas existentes",
  "Templates personalizáveis para seu negócio",
  "Escalabilidade ilimitada de conversas",
];

const AtendenteIAConversacional = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="fade-left">
              <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                Atendente IA Conversacional
              </span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Automação de Chat e Mensagens{" "}
                <span className="text-primary">em Todos os Canais</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Nossa IA responde mensagens de texto, qualifica leads e faz follow-up
                automaticamente em SMS, WhatsApp, Instagram e mais.
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
                  src={heroChatAi} 
                  alt="IA Conversacional em múltiplos canais de mensagem" 
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
                <AnimatedCounter end={100} suffix="%" />
              </div>
              <p className="text-primary-foreground/80 text-sm">Taxa de Resposta</p>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={100}>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedCounter end={3} suffix="s" />
              </div>
              <p className="text-primary-foreground/80 text-sm">Tempo de Resposta</p>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={200}>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedCounter end={60} suffix="%" />
              </div>
              <p className="text-primary-foreground/80 text-sm">Mais Engajamento</p>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={300}>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedCounter end={6} suffix="+" />
              </div>
              <p className="text-primary-foreground/80 text-sm">Canais Integrados</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Channels */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Um Atendente para Todos os Canais
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Centralize todas as suas conversas em uma única plataforma inteligente.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {channels.map((channel, index) => (
              <AnimatedSection key={index} animation="scale" delay={index * 50}>
                <Card className="text-center hover:shadow-lg transition-shadow h-full">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                      <channel.icon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <span className="font-medium text-sm">{channel.name}</span>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Recursos Avançados de Conversação
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Tecnologia de ponta para conversas naturais e eficientes.
            </p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
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

      {/* Use Cases */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="fade-left">
              <div className="bg-accent/50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">Casos de Uso Populares</h3>
                <div className="space-y-4">
                  <div className="bg-background rounded-lg p-4">
                    <h4 className="font-semibold mb-1">Resposta Automática a Leads</h4>
                    <p className="text-muted-foreground text-sm">
                      Responda formulários do site em segundos, não horas.
                    </p>
                  </div>
                  <div className="bg-background rounded-lg p-4">
                    <h4 className="font-semibold mb-1">Reativação de Clientes</h4>
                    <p className="text-muted-foreground text-sm">
                      Envie lembretes e ofertas para clientes inativos.
                    </p>
                  </div>
                  <div className="bg-background rounded-lg p-4">
                    <h4 className="font-semibold mb-1">Confirmação de Agendamentos</h4>
                    <p className="text-muted-foreground text-sm">
                      Reduza no-shows com lembretes automáticos.
                    </p>
                  </div>
                  <div className="bg-background rounded-lg p-4">
                    <h4 className="font-semibold mb-1">Coleta de Avaliações</h4>
                    <p className="text-muted-foreground text-sm">
                      Solicite reviews após cada serviço concluído.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-right" delay={200}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Benefícios Comprovados
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-8" asChild>
                <Link to="/agendar-demo">
                  Ver Demonstração
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para Automatizar Suas Conversas?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Agende uma demonstração gratuita e veja a IA conversando com seus clientes.
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

export default AtendenteIAConversacional;
