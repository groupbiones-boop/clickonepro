import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
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
  Headphones,
  Bot,
  Zap,
} from "lucide-react";

const industries = [
  { name: "Empresas de Limpeza", slug: "limpeza", icon: "🧹" },
  { name: "Construção & Reformas", slug: "construcao", icon: "🏗️" },
  { name: "HVAC / Climatização", slug: "hvac", icon: "❄️" },
  { name: "Encanamento", slug: "encanamento", icon: "🔧" },
  { name: "Serviços Elétricos", slug: "eletrica", icon: "⚡" },
  { name: "Paisagismo", slug: "paisagismo", icon: "🌳" },
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
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/30 py-20 md:py-32">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Nunca Perca Uma Ligação.{" "}
              <span className="text-primary">Nunca Perca Um Cliente.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Recepcionista virtual com inteligência artificial que atende chamadas,
              qualifica leads e agenda serviços 24 horas por dia, 7 dias por semana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                O Problema: Ligações Perdidas = Dinheiro Perdido
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-destructive text-xl">✗</span>
                  <span className="text-muted-foreground">
                    62% das chamadas para pequenas empresas não são atendidas
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-destructive text-xl">✗</span>
                  <span className="text-muted-foreground">
                    85% dos clientes não ligam de volta após uma chamada perdida
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-destructive text-xl">✗</span>
                  <span className="text-muted-foreground">
                    Você está no trabalho e não pode atender o telefone
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-accent/50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-primary">
                A Solução: ClickOne AI
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                  <span>Atendimento instantâneo 24/7, sem espera</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                  <span>Qualificação automática de leads</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                  <span>Agendamento integrado à sua agenda</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                  <span>Você trabalha enquanto a IA atende</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Como Funciona</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Em 4 passos simples, você transforma cada ligação em uma oportunidade de negócio.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardContent className="pt-6">
                  <span className="text-5xl font-bold text-primary/20">{step.number}</span>
                  <h3 className="text-xl font-semibold mt-2 mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Recursos Poderosos de IA
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Tecnologia de ponta para maximizar seu atendimento e conversões.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
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

      {/* Omnichannel */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Atendimento Omnichannel
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Esteja presente em todos os canais onde seus clientes estão.
            </p>
          </div>
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
        </div>
      </section>

      {/* Mobile App */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
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
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-accent/40 rounded-2xl p-8 flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <Smartphone className="h-24 w-24 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Visualização do App</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Preview */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Setores que Atendemos
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Soluções personalizadas para cada tipo de negócio de serviços.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <Link key={index} to={`/setores/${industry.slug}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="pt-6 flex items-center gap-4">
                    <span className="text-4xl">{industry.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold">{industry.name}</h3>
                      <span className="text-sm text-primary">Saiba mais →</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
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
