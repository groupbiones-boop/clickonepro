import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { 
  CheckCircle, 
  ArrowRight, 
  Phone, 
  Calendar, 
  Users, 
  Clock, 
  TrendingUp, 
  MessageSquare,
  Star,
  BarChart3,
  Zap,
  Shield,
  Headphones
} from "lucide-react";
import industryCleaning from "@/assets/industry-cleaning.jpg";
import industryConstruction from "@/assets/industry-construction.jpg";
import industryHvac from "@/assets/industry-hvac.jpg";
import industryPlumbing from "@/assets/industry-plumbing.jpg";
import industryElectrical from "@/assets/industry-electrical.jpg";
import industryLandscaping from "@/assets/industry-landscaping.jpg";

interface IndustryData {
  name: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  image: string;
  problemTitle: string;
  problemDescription: string;
  problems: string[];
  solutionTitle: string;
  solutionDescription: string;
  solutions: Array<{ title: string; description: string }>;
  features: Array<{ icon: typeof Phone; title: string; description: string }>;
  stats: Array<{ value: string; label: string }>;
  useCases: Array<{ title: string; description: string }>;
  testimonial: { quote: string; author: string; company: string };
}

const industryData: Record<string, IndustryData> = {
  limpeza: {
    name: "Empresas de Limpeza",
    heroTitle: "Recepcionista IA para Empresas de Limpeza",
    heroSubtitle: "ATENDIMENTO 24/7 PARA LIMPEZA",
    heroDescription: "Como uma solução de atendimento inteligente para empresas de limpeza residencial e comercial, a ClickOne AI combina atendimento telefônico automatizado com suporte profissional disponível 24 horas por dia.",
    image: industryCleaning,
    problemTitle: "Ligações chegam a qualquer momento.",
    problemDescription: "Você está limpando uma casa ou escritório e o telefone toca. É um novo cliente em potencial, mas você não pode atender. Nós capturamos leads, agendamos serviços, coletamos informações e registramos tudo no seu sistema. Gerenciamos suas chamadas para que você possa focar no que só você pode fazer: entregar serviços de limpeza excepcionais.",
    problems: [
      "Ligações perdidas enquanto você está em serviço",
      "Clientes desistem se não conseguem falar com alguém",
      "Dificuldade em agendar limpezas recorrentes",
      "Perda de leads por demora na resposta",
      "Falta de tempo para follow-up com clientes"
    ],
    solutionTitle: "Limpe enquanto cuidamos das ligações.",
    solutionDescription: "A Recepcionista IA da ClickOne atende cada ligação profissionalmente e coleta informações essenciais através de perguntas estruturadas. Ao coletar dados importantes antecipadamente — como tipo e tamanho do imóvel, frequência de limpeza necessária e serviços específicos requeridos — o sistema ajuda a identificar e priorizar leads qualificados.",
    solutions: [
      { title: "Configuração personalizada", description: "IA treinada especificamente para as necessidades do seu negócio de limpeza" },
      { title: "Cobertura 24/7", description: "Atendimento inteligente com transferência quando necessário" },
      { title: "Agendamento completo", description: "Marcação de horários, processamento de pagamentos e conversas sensíveis" },
      { title: "Integração avançada", description: "Conexão com mais de 50 ferramentas e automação de fluxos de trabalho" },
      { title: "Suporte dedicado", description: "Equipe de implementação garantindo configuração otimizada" },
      { title: "Representação profissional", description: "IA que se adapta à voz da sua marca" }
    ],
    features: [
      { icon: Phone, title: "Atendimento Instantâneo", description: "Resposta imediata a cada chamada, sem espera" },
      { icon: Calendar, title: "Agendamento Automático", description: "Marcação de limpezas recorrentes e pontuais" },
      { icon: Users, title: "Qualificação de Leads", description: "Coleta tipo de imóvel, tamanho e serviços necessários" },
      { icon: BarChart3, title: "Analytics em Tempo Real", description: "Dashboard com métricas de chamadas e conversões" },
      { icon: MessageSquare, title: "Multi-Canal", description: "Telefone, SMS, WhatsApp e chat integrados" },
      { icon: Zap, title: "Follow-up Automático", description: "Lembretes e reativação de clientes" }
    ],
    stats: [
      { value: "82%", label: "dos consumidores esperam resposta imediata a uma consulta" },
      { value: "50%", label: "dos orçamentos de leads são desperdiçados com leads nunca contatados" },
      { value: "67%", label: "dos clientes que recebem excelente serviço gastam até 14% a mais" }
    ],
    useCases: [
      { title: "Orçamentos de Limpeza", description: "Colete informações do imóvel e forneça estimativas automaticamente" },
      { title: "Agendamento Recorrente", description: "Configure limpezas semanais, quinzenais ou mensais" },
      { title: "Confirmação de Serviços", description: "Envie lembretes automáticos antes de cada limpeza" },
      { title: "Coleta de Avaliações", description: "Solicite feedback após cada serviço concluído" }
    ],
    testimonial: {
      quote: "A ClickOne AI transformou nosso atendimento. Antes perdíamos 60% das ligações quando estávamos em serviço. Agora capturamos 100% dos leads.",
      author: "Maria Santos",
      company: "Limpeza Brilhante"
    }
  },
  construcao: {
    name: "Construção & Reformas",
    heroTitle: "Recepcionista IA para Construtoras e Reformas",
    heroSubtitle: "ATENDIMENTO 24/7 PARA CONSTRUÇÃO",
    heroDescription: "Solução de atendimento inteligente para construtoras, empreiteiras e empresas de reforma. A ClickOne AI atende chamadas, qualifica projetos e agenda visitas técnicas automaticamente.",
    image: industryConstruction,
    problemTitle: "O canteiro de obras não para.",
    problemDescription: "Você está no canteiro supervisionando a obra e o telefone não para de tocar. São clientes pedindo orçamentos, fornecedores confirmando entregas, clientes atuais com dúvidas. Nós gerenciamos todas as chamadas para que você possa focar na execução dos projetos.",
    problems: [
      "Ligações perdidas no canteiro de obras",
      "Orçamentos demoram para serem respondidos",
      "Clientes sem retorno adequado sobre andamento",
      "Dificuldade em qualificar projetos por telefone",
      "Perda de oportunidades por falta de resposta rápida"
    ],
    solutionTitle: "Construa enquanto qualificamos seus projetos.",
    solutionDescription: "Nossa IA coleta informações essenciais sobre cada projeto — tipo de construção, metragem, orçamento estimado, prazo desejado — e agenda visitas técnicas automaticamente. Você recebe leads já qualificados prontos para orçamento.",
    solutions: [
      { title: "Qualificação de projetos", description: "Coleta metragem, tipo de obra, orçamento e prazo" },
      { title: "Agendamento de visitas", description: "Marca visitas técnicas na sua agenda automaticamente" },
      { title: "Triagem de urgência", description: "Identifica reparos urgentes vs projetos planejados" },
      { title: "Follow-up de orçamentos", description: "Acompanha propostas enviadas automaticamente" },
      { title: "Gestão de fornecedores", description: "Recebe e direciona chamadas de fornecedores" },
      { title: "Atualização de clientes", description: "Responde dúvidas sobre andamento de obras" }
    ],
    features: [
      { icon: Phone, title: "Atendimento no Canteiro", description: "Resposta profissional enquanto você trabalha" },
      { icon: Calendar, title: "Agenda de Visitas", description: "Marcação automática de visitas técnicas" },
      { icon: Users, title: "Qualificação de Projetos", description: "Coleta escopo, orçamento e prazos" },
      { icon: BarChart3, title: "Pipeline de Vendas", description: "Acompanhe leads e propostas em tempo real" },
      { icon: Shield, title: "Triagem Inteligente", description: "Separa urgências de projetos planejados" },
      { icon: Zap, title: "Follow-up Automático", description: "Acompanhamento de propostas enviadas" }
    ],
    stats: [
      { value: "73%", label: "dos clientes de construção escolhem a primeira empresa que responde" },
      { value: "45%", label: "das propostas são perdidas por falta de follow-up" },
      { value: "3.5x", label: "mais conversões com resposta em menos de 5 minutos" }
    ],
    useCases: [
      { title: "Orçamentos de Obras", description: "Qualifique projetos e colete informações para orçamento" },
      { title: "Visitas Técnicas", description: "Agende visitas para avaliação de projetos" },
      { title: "Acompanhamento de Obras", description: "Responda dúvidas sobre andamento" },
      { title: "Reparos Urgentes", description: "Identifique e priorize emergências" }
    ],
    testimonial: {
      quote: "Antes eu perdia horas no telefone. Agora a IA qualifica os projetos e eu só falo com clientes realmente interessados.",
      author: "Carlos Oliveira",
      company: "Oliveira Construções"
    }
  },
  hvac: {
    name: "HVAC / Climatização",
    heroTitle: "Recepcionista IA para Empresas de HVAC",
    heroSubtitle: "ATENDIMENTO 24/7 PARA CLIMATIZAÇÃO",
    heroDescription: "Atendimento inteligente especializado para empresas de ar condicionado, refrigeração e climatização. Gerencie picos de demanda e emergências com IA.",
    image: industryHvac,
    problemTitle: "Verão chega e as ligações explodem.",
    problemDescription: "Na temporada de calor, as ligações não param. Ar condicionado quebrado, instalações urgentes, manutenções preventivas. Você não consegue atender todos e perde clientes para a concorrência. Nossa IA escala com sua demanda.",
    problems: [
      "Picos de demanda em épocas de calor/frio",
      "Emergências fora do horário comercial",
      "Dificuldade em triagem de chamados por urgência",
      "Técnicos em campo não podem atender telefone",
      "Perda de contratos de manutenção preventiva"
    ],
    solutionTitle: "Instale enquanto gerenciamos sua demanda.",
    solutionDescription: "Nossa IA identifica a urgência de cada chamado — ar condicionado parado no verão é prioridade máxima. Agenda manutenções preventivas, qualifica instalações e garante que emergências cheguem a você imediatamente.",
    solutions: [
      { title: "Triagem por urgência", description: "Prioriza emergências vs manutenções agendadas" },
      { title: "Escalabilidade ilimitada", description: "Atende picos de demanda sem contratar" },
      { title: "Contratos de manutenção", description: "Vende e agenda manutenções preventivas" },
      { title: "Atendimento 24/7", description: "Emergências noturnas e de fim de semana" },
      { title: "Qualificação técnica", description: "Coleta modelo, sintomas e localização" },
      { title: "Roteirização inteligente", description: "Agrupa chamados por região" }
    ],
    features: [
      { icon: Zap, title: "Resposta a Emergências", description: "Priorização automática de urgências" },
      { icon: Clock, title: "Atendimento 24/7", description: "Noites, fins de semana e feriados" },
      { icon: Calendar, title: "Manutenção Preventiva", description: "Agendamento de contratos recorrentes" },
      { icon: BarChart3, title: "Gestão de Demanda", description: "Escale atendimento em picos" },
      { icon: Users, title: "Qualificação Técnica", description: "Coleta modelo e sintomas do equipamento" },
      { icon: Phone, title: "Multi-Canal", description: "Telefone, WhatsApp e chat integrados" }
    ],
    stats: [
      { value: "89%", label: "dos clientes com ar quebrado no verão querem solução no mesmo dia" },
      { value: "4x", label: "aumento de chamadas em ondas de calor" },
      { value: "35%", label: "de receita adicional com contratos de manutenção preventiva" }
    ],
    useCases: [
      { title: "Emergências de AC", description: "Priorize chamados urgentes automaticamente" },
      { title: "Manutenção Preventiva", description: "Venda e agende contratos recorrentes" },
      { title: "Instalações Novas", description: "Qualifique projetos de instalação" },
      { title: "Picos de Demanda", description: "Escale atendimento sem contratar" }
    ],
    testimonial: {
      quote: "No último verão atendemos 3x mais chamados sem contratar ninguém. A IA triou as emergências e agendou o resto.",
      author: "Roberto Souza",
      company: "Frio & Ar Climatização"
    }
  },
  encanamento: {
    name: "Encanamento",
    heroTitle: "Recepcionista IA para Encanadores",
    heroSubtitle: "ATENDIMENTO 24/7 PARA ENCANAMENTO",
    heroDescription: "Atendimento inteligente para encanadores e empresas de serviços hidráulicos. Atenda emergências de vazamentos e qualifique serviços automaticamente.",
    image: industryPlumbing,
    problemTitle: "Vazamentos não esperam.",
    problemDescription: "Quando um cano estoura às 2h da manhã, o cliente precisa de resposta imediata. Você está dormindo ou em outro serviço. Nossa IA atende emergências 24/7, qualifica a urgência e aciona você quando necessário.",
    problems: [
      "Emergências de vazamento a qualquer hora",
      "Mãos molhadas durante o trabalho",
      "Clientes impacientes esperando retorno",
      "Dificuldade em avaliar urgência por telefone",
      "Perda de serviços por não atender"
    ],
    solutionTitle: "Conserte enquanto atendemos emergências.",
    solutionDescription: "Nossa IA identifica vazamentos ativos como prioridade máxima e aciona você imediatamente. Para serviços não urgentes, qualifica o problema, coleta endereço e agenda o atendimento.",
    solutions: [
      { title: "Triagem de emergências", description: "Vazamentos ativos são prioridade máxima" },
      { title: "Atendimento 24/7", description: "Emergências noturnas e de fim de semana" },
      { title: "Qualificação de problemas", description: "Coleta sintomas, localização e fotos" },
      { title: "Agendamento inteligente", description: "Otimiza rota por região" },
      { title: "Orçamentos preliminares", description: "Estimativas baseadas no problema" },
      { title: "Follow-up de serviços", description: "Acompanha satisfação pós-serviço" }
    ],
    features: [
      { icon: Zap, title: "Emergências 24/7", description: "Vazamentos ativos priorizados" },
      { icon: Phone, title: "Atendimento Instantâneo", description: "Resposta imediata a cada chamada" },
      { icon: Users, title: "Qualificação de Problemas", description: "Coleta sintomas e localização" },
      { icon: Calendar, title: "Agendamento Otimizado", description: "Agrupa serviços por região" },
      { icon: MessageSquare, title: "Coleta de Fotos", description: "Recebe imagens do problema via WhatsApp" },
      { icon: BarChart3, title: "Métricas de Serviço", description: "Tempo de resposta e satisfação" }
    ],
    stats: [
      { value: "95%", label: "dos clientes com vazamento ativo ligam para várias empresas" },
      { value: "2min", label: "é o tempo máximo que um cliente espera por resposta em emergência" },
      { value: "78%", label: "escolhem o primeiro encanador que atende" }
    ],
    useCases: [
      { title: "Vazamentos Urgentes", description: "Priorize e acione imediatamente" },
      { title: "Entupimentos", description: "Qualifique gravidade e agende" },
      { title: "Instalações", description: "Colete especificações do projeto" },
      { title: "Manutenção Preventiva", description: "Agende inspeções regulares" }
    ],
    testimonial: {
      quote: "Antes eu perdia 70% das emergências noturnas. Agora a IA me acorda só para vazamentos reais e agenda o resto.",
      author: "João Silva",
      company: "Silva Encanamento"
    }
  },
  eletrica: {
    name: "Serviços Elétricos",
    heroTitle: "Recepcionista IA para Eletricistas",
    heroSubtitle: "ATENDIMENTO 24/7 PARA ELÉTRICA",
    heroDescription: "Atendimento inteligente para eletricistas e empresas de instalações elétricas. Gerencie emergências, instalações e manutenções com IA.",
    image: industryElectrical,
    problemTitle: "Emergências elétricas são perigosas.",
    problemDescription: "Falta de energia, curto-circuito, cheiro de queimado — emergências elétricas não podem esperar. Você está em uma instalação complexa e não pode atender. Nossa IA identifica a urgência e age.",
    problems: [
      "Emergências elétricas durante instalações",
      "Curtos-circuitos noturnos",
      "Dificuldade em avaliar perigo por telefone",
      "Instalações complexas exigem foco total",
      "Clientes ansiosos com falta de energia"
    ],
    solutionTitle: "Instale enquanto gerenciamos emergências.",
    solutionDescription: "Nossa IA avalia o nível de perigo de cada chamado — cheiro de queimado e faíscas são prioridade máxima. Para instalações, qualifica o projeto completo antes de você visitar.",
    solutions: [
      { title: "Avaliação de perigo", description: "Identifica riscos de incêndio e choques" },
      { title: "Atendimento 24/7", description: "Emergências noturnas e de fim de semana" },
      { title: "Qualificação de projetos", description: "Coleta especificações técnicas" },
      { title: "Agendamento inteligente", description: "Otimiza rota de instalações" },
      { title: "Orientação de segurança", description: "Instrui cliente a desligar disjuntor" },
      { title: "Orçamentos de projetos", description: "Coleta informações para orçamento" }
    ],
    features: [
      { icon: Shield, title: "Avaliação de Perigo", description: "Identifica riscos de segurança" },
      { icon: Zap, title: "Emergências 24/7", description: "Curtos e quedas de energia" },
      { icon: Calendar, title: "Agenda de Instalações", description: "Projetos residenciais e comerciais" },
      { icon: Users, title: "Qualificação Técnica", description: "Coleta especificações do projeto" },
      { icon: Phone, title: "Orientação Imediata", description: "Instrui cliente em emergências" },
      { icon: BarChart3, title: "Gestão de Projetos", description: "Acompanhe instalações em andamento" }
    ],
    stats: [
      { value: "92%", label: "dos clientes com emergência elétrica querem resposta em minutos" },
      { value: "60%", label: "das instalações são perdidas por demora no orçamento" },
      { value: "5x", label: "mais conversões com qualificação prévia do projeto" }
    ],
    useCases: [
      { title: "Emergências Elétricas", description: "Avalie perigo e acione imediatamente" },
      { title: "Instalações Residenciais", description: "Qualifique projetos completos" },
      { title: "Manutenção Preventiva", description: "Agende inspeções elétricas" },
      { title: "Projetos Comerciais", description: "Colete especificações técnicas" }
    ],
    testimonial: {
      quote: "A IA instrui clientes a desligar o disjuntor enquanto eu termino o serviço atual. Isso já evitou acidentes.",
      author: "Pedro Costa",
      company: "Costa Elétrica"
    }
  },
  paisagismo: {
    name: "Paisagismo",
    heroTitle: "Recepcionista IA para Paisagismo",
    heroSubtitle: "ATENDIMENTO 24/7 PARA PAISAGISMO",
    heroDescription: "Atendimento inteligente para empresas de jardinagem, paisagismo e manutenção de áreas verdes. Qualifique projetos e agende manutenções automaticamente.",
    image: industryLandscaping,
    problemTitle: "Você está no jardim, não no escritório.",
    problemDescription: "Seu trabalho é ao ar livre, longe do telefone. Enquanto você planta, poda e transforma jardins, leads estão ligando e não conseguem falar com você. Nossa IA cuida das chamadas enquanto você cuida dos jardins.",
    problems: [
      "Trabalho ao ar livre dificulta atendimento",
      "Projetos de paisagismo são complexos de orçar",
      "Sazonalidade de serviços cria picos",
      "Manutenções recorrentes precisam de follow-up",
      "Clientes querem ver portfólio antes de contratar"
    ],
    solutionTitle: "Plante enquanto cultivamos seus leads.",
    solutionDescription: "Nossa IA qualifica projetos de paisagismo — tamanho do terreno, estilo desejado, orçamento, prazo — e agenda visitas para orçamento. Para manutenções recorrentes, gerencia toda a agenda automaticamente.",
    solutions: [
      { title: "Qualificação de projetos", description: "Coleta tamanho, estilo e orçamento" },
      { title: "Agenda de visitas", description: "Marca visitas para orçamento no local" },
      { title: "Manutenção recorrente", description: "Gerencia agenda de manutenções" },
      { title: "Campanhas sazonais", description: "Reativa clientes na primavera" },
      { title: "Envio de portfólio", description: "Compartilha trabalhos anteriores" },
      { title: "Follow-up de propostas", description: "Acompanha orçamentos enviados" }
    ],
    features: [
      { icon: Calendar, title: "Manutenção Recorrente", description: "Agenda semanal, quinzenal ou mensal" },
      { icon: Users, title: "Qualificação de Projetos", description: "Coleta escopo completo do paisagismo" },
      { icon: Phone, title: "Atendimento no Campo", description: "Resposta profissional enquanto trabalha" },
      { icon: Zap, title: "Campanhas Sazonais", description: "Reativação na primavera e verão" },
      { icon: MessageSquare, title: "Envio de Portfólio", description: "Compartilha trabalhos via WhatsApp" },
      { icon: BarChart3, title: "Gestão de Contratos", description: "Acompanhe manutenções ativas" }
    ],
    stats: [
      { value: "3x", label: "mais projetos de paisagismo são fechados na primavera" },
      { value: "85%", label: "dos clientes querem ver portfólio antes de contratar" },
      { value: "70%", label: "da receita vem de manutenções recorrentes" }
    ],
    useCases: [
      { title: "Projetos de Paisagismo", description: "Qualifique escopo e agende visitas" },
      { title: "Manutenção de Jardins", description: "Gerencie agenda recorrente" },
      { title: "Podas e Limpezas", description: "Serviços pontuais agendados" },
      { title: "Reativação Sazonal", description: "Campanhas de primavera" }
    ],
    testimonial: {
      quote: "Minha agenda de manutenções recorrentes cresceu 200% depois que a IA começou a gerenciar os follow-ups.",
      author: "Ana Lima",
      company: "Verde & Arte Paisagismo"
    }
  }
};

const SetorDetalhe = () => {
  const { slug } = useParams();
  const data = industryData[slug || ""] || industryData.limpeza;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0 grid lg:grid-cols-2">
          <div className="bg-foreground" />
          <div 
            className="hidden lg:block bg-cover bg-center"
            style={{ backgroundImage: `url(${data.image})` }}
          />
        </div>
        <div className="container relative z-10">
          <div className="lg:w-1/2 lg:pr-12">
            <span className="inline-block text-primary text-sm font-semibold tracking-wider mb-4">
              {data.heroSubtitle}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-6">
              {data.heroTitle}
            </h1>
            <p className="text-lg text-background/80 mb-8 max-w-xl">
              {data.heroDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="default" asChild>
                <Link to="/agendar-demo">
                  Começar Agora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-background/30 text-background hover:bg-background/10" asChild>
                <Link to="#recursos">Saiba Mais</Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Mobile Image */}
        <div 
          className="lg:hidden absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${data.image})` }}
        />
      </section>

      {/* Problem Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {data.problemTitle}
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                {data.problemDescription}
              </p>
            </div>
            <div>
              <ul className="space-y-4">
                {data.problems.map((problem, index) => (
                  <li key={index} className="flex items-start gap-4 bg-destructive/5 rounded-lg p-4">
                    <span className="text-destructive text-xl font-bold">✗</span>
                    <span className="text-foreground">{problem}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="recursos" className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {data.solutionTitle}
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                {data.solutionDescription}
              </p>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={data.image} 
                  alt={data.name}
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6">O que torna a ClickOne AI diferente:</h3>
              <ul className="space-y-4">
                {data.solutions.map((solution, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">{solution.title}</span>
                      <span className="text-muted-foreground"> — {solution.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Inteligência de chamadas para vantagem competitiva
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              Tome melhores decisões de negócio com dados de chamadas em tempo real, visualizados no dashboard da ClickOne AI.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {data.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <span className="text-5xl md:text-6xl font-bold block mb-4">{stat.value}</span>
                <p className="text-primary-foreground/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Recursos especializados para {data.name.toLowerCase()}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Tecnologia de ponta personalizada para as necessidades específicas do seu setor.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
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
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Casos de uso para {data.name.toLowerCase()}
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Veja como empresas do seu setor estão usando a ClickOne AI para crescer.
              </p>
              <div className="space-y-4">
                {data.useCases.map((useCase, index) => (
                  <div key={index} className="bg-background rounded-lg p-5 shadow-sm">
                    <h4 className="font-semibold mb-1">{useCase.title}</h4>
                    <p className="text-muted-foreground text-sm">{useCase.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-accent/50 rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <Star className="h-5 w-5 text-primary fill-primary" />
                <Star className="h-5 w-5 text-primary fill-primary" />
                <Star className="h-5 w-5 text-primary fill-primary" />
                <Star className="h-5 w-5 text-primary fill-primary" />
                <Star className="h-5 w-5 text-primary fill-primary" />
              </div>
              <blockquote className="text-xl italic mb-6">
                "{data.testimonial.quote}"
              </blockquote>
              <div>
                <p className="font-semibold">{data.testimonial.author}</p>
                <p className="text-muted-foreground text-sm">{data.testimonial.company}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary text-sm font-semibold tracking-wider mb-2 block">
                INTEGRAÇÕES COMPLETAS
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Funciona com suas ferramentas
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Chamadas, agendamentos e pagamentos são automaticamente registrados nos seus sistemas. Sincronização em tempo real com mais de 50 integrações.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>WhatsApp Business, Instagram e Facebook</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>E-mail e SMS automatizados</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Stripe, PayPal e sistemas de pagamento</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Google Calendar e Outlook</span>
                </li>
              </ul>
            </div>
            <div className="bg-muted/50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6">Agende uma consulta</h3>
              <p className="text-muted-foreground mb-6">
                Melhore a experiência do cliente com atendimento 24/7 alimentado por IA, desenvolvido especificamente para {data.name.toLowerCase()}.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm">IA configurada para seu setor</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm">Atendimento inteligente com transferência quando necessário</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm">Integração com suas ferramentas existentes</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm">Equipe dedicada para configuração perfeita</span>
                </li>
              </ul>
              <Button className="w-full" size="lg" asChild>
                <Link to="/agendar-demo">Fale Conosco</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para transformar o atendimento da sua empresa?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Agende uma demonstração gratuita e veja como a ClickOne AI pode aumentar suas conversões e liberar seu tempo para focar no que importa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/agendar-demo">
                Agendar Demo Grátis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/setores">Ver Outros Setores</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SetorDetalhe;
