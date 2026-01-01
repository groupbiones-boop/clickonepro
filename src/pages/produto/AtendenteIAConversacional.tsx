import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import {
  MessageSquare,
  Clock,
  Calendar,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Bot,
  Smartphone,
  Zap,
  Globe,
  BarChart3,
} from "lucide-react";

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

const channels = [
  { name: "SMS", emoji: "📱" },
  { name: "WhatsApp", emoji: "💬" },
  { name: "Instagram DM", emoji: "📸" },
  { name: "Facebook Messenger", emoji: "👤" },
  { name: "Website Chat", emoji: "💻" },
  { name: "Google Business", emoji: "🔍" },
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
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/30 py-20 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
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
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-accent/40 rounded-2xl p-8 flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <Bot className="h-24 w-24 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Demonstração de Chat IA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Channels */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Um Atendente para Todos os Canais
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Centralize todas as suas conversas em uma única plataforma inteligente.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {channels.map((channel, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <span className="text-4xl mb-3 block">{channel.emoji}</span>
                  <span className="font-medium text-sm">{channel.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Recursos Avançados de Conversação
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Tecnologia de ponta para conversas naturais e eficientes.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
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
            <div>
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
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
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
        </div>
      </section>
    </Layout>
  );
};

export default AtendenteIAConversacional;
