import Layout from "@/components/layout/Layout";
import { CheckCircle, Calendar, Rocket, Users, Zap } from "lucide-react";
import { AnimatedSection } from "@/hooks/use-scroll-animation";
import { AnimatedCounter } from "@/hooks/use-count-animation";
import teamOffice from "@/assets/team-office.jpg";
import officeTech from "@/assets/office-tech.jpg";

const timelineEvents = [
  {
    year: "2021",
    title: "O Início",
    description: "A ClickOne AI nasceu da própria necessidade do fundador. Com mais de 30 anos na indústria de controle de pragas e outras empresas do setor de serviços, ele viveu na pele a falta de atendimento e padronização, perdendo muitos clientes por não ter uma solução inteligente e viável para atendimento e vendas.",
    icon: Rocket,
  },
  {
    year: "2022",
    title: "Primeira Versão",
    description: "Começamos a ajudar empresas de serviço usando tecnologia de atendimento automatizado por voz, atendendo 50 empresas piloto.",
    icon: Zap,
  },
  {
    year: "2023",
    title: "Expansão Multicanal",
    description: "Integramos WhatsApp, Instagram, Facebook e SMS em uma única plataforma de atendimento.",
    icon: Users,
  },
  {
    year: "2025",
    title: "Crescimento Acelerado",
    description: "Ultrapassamos 500 clientes ativos e 1 milhão de chamadas atendidas com 98% de satisfação.",
    icon: Calendar,
  },
];

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

    {/* Team Image Section */}
    <section className="py-16 bg-muted/30">
      <div className="container">
        <AnimatedSection animation="fade-up">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={teamOffice} 
                alt="Equipe ClickOne AI em atendimento" 
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={officeTech} 
                alt="Escritório de tecnologia ClickOne AI" 
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>

    {/* Timeline Section */}
    <section className="py-16 bg-background">
      <div className="container max-w-4xl">
        <AnimatedSection animation="fade-up">
          <h2 className="text-3xl font-bold mb-12 text-center">Nossa História</h2>
        </AnimatedSection>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 transform md:-translate-x-1/2" />
          
          {timelineEvents.map((event, index) => (
            <AnimatedSection 
              key={event.year} 
              animation={index % 2 === 0 ? "fade-right" : "fade-left"} 
              delay={index * 150}
            >
              <div className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center transform -translate-x-1/2 z-10 shadow-lg">
                  <event.icon className="w-4 h-4 text-primary-foreground" />
                </div>
                
                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-3">
                      {event.year}
                    </span>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-muted-foreground">{event.description}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Mission & Values Section */}
    <section className="py-16 bg-muted/30">
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
