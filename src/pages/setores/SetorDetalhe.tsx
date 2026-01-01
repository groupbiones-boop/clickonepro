import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import industryPool from "@/assets/industry-pool.jpg";
import industryMoving from "@/assets/industry-moving.jpg";
import industryRoofing from "@/assets/industry-roofing.jpg";
import industryCleaning2 from "@/assets/industry-cleaning-2.jpg";
import industryConstruction2 from "@/assets/industry-construction-2.jpg";
import industryHvac2 from "@/assets/industry-hvac-2.jpg";
import industryPlumbing2 from "@/assets/industry-plumbing-2.jpg";
import industryElectrical2 from "@/assets/industry-electrical-2.jpg";
import industryLandscaping2 from "@/assets/industry-landscaping-2.jpg";
import industryPool2 from "@/assets/industry-pool-2.jpg";
import industryMoving2 from "@/assets/industry-moving-2.jpg";
import industryRoofing2 from "@/assets/industry-roofing-2.jpg";

interface Testimonial {
  quote: string;
  author: string;
  company: string;
  role?: string;
  location?: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface IndustryData {
  name: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  image: string;
  secondaryImage: string;
  problemTitle: string;
  problemDescription: string;
  problems: string[];
  solutionTitle: string;
  solutionDescription: string;
  solutions: Array<{ title: string; description: string }>;
  features: Array<{ icon: typeof Phone; title: string; description: string }>;
  stats: Array<{ value: string; label: string }>;
  useCases: Array<{ title: string; description: string }>;
  testimonials: Testimonial[];
  faqs: FAQ[];
}

const industryData: Record<string, IndustryData> = {
  limpeza: {
    name: "Empresas de Limpeza",
    heroTitle: "Recepcionista IA para Empresas de Limpeza",
    heroSubtitle: "ATENDIMENTO 24/7 PARA LIMPEZA",
    heroDescription: "Como uma solução de atendimento inteligente para empresas de limpeza residencial e comercial, a ClickOne AI combina atendimento telefônico automatizado com suporte profissional disponível 24 horas por dia.",
    image: industryCleaning,
    secondaryImage: industryCleaning2,
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
    testimonials: [
      {
        quote: "A ClickOne AI transformou nosso atendimento. Antes perdíamos 60% das ligações quando estávamos em serviço. Agora capturamos 100% dos leads.",
        author: "Lucia Fernandes",
        role: "Proprietária",
        company: "BrightClean Pro Services",
        location: "Houston, TX"
      },
      {
        quote: "Agora minha equipe foca 100% na limpeza. A IA agenda, confirma e até coleta feedback dos clientes automaticamente.",
        author: "Carlos Rodriguez",
        role: "Gerente de Operações",
        company: "Rodriguez Cleaning Solutions",
        location: "Miami, FL"
      },
      {
        quote: "Triplicamos nossos clientes recorrentes em 6 meses. O follow-up automático faz toda a diferença.",
        author: "Ana Paula Silva",
        role: "Fundadora",
        company: "Premier Home Services",
        location: "Orlando, FL"
      }
    ],
    faqs: [
      {
        question: "A IA consegue lidar com pedidos específicos de limpeza?",
        answer: "Sim! Nossa IA é treinada para coletar todas as informações necessárias, incluindo tipo de imóvel, tamanho, frequência desejada e serviços específicos como limpeza de janelas, deep cleaning ou limpeza pós-obra."
      },
      {
        question: "Como funciona o agendamento de limpezas recorrentes?",
        answer: "A IA gerencia automaticamente sua agenda de clientes recorrentes, enviando lembretes antes de cada serviço e permitindo reagendamentos sem sua intervenção manual."
      },
      {
        question: "A IA pode fornecer orçamentos?",
        answer: "A IA coleta todas as informações necessárias e pode fornecer estimativas baseadas nos seus parâmetros de preço. Para orçamentos personalizados, ela agenda uma ligação com você."
      },
      {
        question: "Funciona com WhatsApp e mensagens de texto?",
        answer: "Sim! Além de ligações telefônicas, nossa IA responde mensagens de WhatsApp, SMS e chat do site, tudo integrado em uma única plataforma."
      },
      {
        question: "Quanto tempo leva para configurar?",
        answer: "A configuração inicial leva cerca de 30 minutos. Nossa equipe de implementação trabalha com você para personalizar as respostas e integrar com suas ferramentas existentes."
      }
    ]
  },
  construcao: {
    name: "Construção & Reformas",
    heroTitle: "Recepcionista IA para Construtoras e Reformas",
    heroSubtitle: "ATENDIMENTO 24/7 PARA CONSTRUÇÃO",
    heroDescription: "Solução de atendimento inteligente para construtoras, empreiteiras e empresas de reforma. A ClickOne AI atende chamadas, qualifica projetos e agenda visitas técnicas automaticamente.",
    image: industryConstruction,
    secondaryImage: industryConstruction2,
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
    testimonials: [
      {
        quote: "Antes eu perdia horas no telefone. Agora a IA qualifica os projetos e eu só falo com clientes realmente interessados.",
        author: "Roberto Oliveira",
        role: "Proprietário",
        company: "Oliveira Construction LLC",
        location: "Los Angeles, CA"
      },
      {
        quote: "A IA agenda visitas técnicas automaticamente. Minha produtividade no canteiro aumentou 40%.",
        author: "Marco Antonio",
        role: "Engenheiro Civil",
        company: "MA Builders Inc",
        location: "Newark, NJ"
      },
      {
        quote: "Fechamos 30% mais contratos desde que a IA começou a fazer follow-up nas propostas.",
        author: "Diego Hernandez",
        role: "Diretor Comercial",
        company: "Hernandez Renovations",
        location: "Atlanta, GA"
      }
    ],
    faqs: [
      {
        question: "A IA consegue qualificar projetos de construção complexos?",
        answer: "Sim! A IA coleta informações detalhadas como tipo de obra, metragem, orçamento estimado, prazo desejado e especificações técnicas antes de agendar uma visita técnica."
      },
      {
        question: "Como a IA diferencia emergências de projetos planejados?",
        answer: "Nossa IA faz perguntas específicas para identificar a urgência. Reparos urgentes são priorizados e encaminhados imediatamente, enquanto projetos maiores são agendados para visita técnica."
      },
      {
        question: "Posso receber chamadas de fornecedores também?",
        answer: "Sim! A IA identifica chamadas de fornecedores e pode coletar informações sobre entregas, prazos e orçamentos, organizando tudo para você revisar depois."
      },
      {
        question: "A IA funciona quando estou no canteiro de obras?",
        answer: "Exatamente para isso que foi projetada! Você pode trabalhar focado enquanto a IA atende todas as ligações e organiza sua agenda de visitas."
      },
      {
        question: "Como funciona o follow-up de propostas?",
        answer: "A IA acompanha automaticamente propostas enviadas, entra em contato com clientes que não responderam e agenda ligações de fechamento com você."
      }
    ]
  },
  hvac: {
    name: "HVAC / Climatização",
    heroTitle: "Recepcionista IA para Empresas de HVAC",
    heroSubtitle: "ATENDIMENTO 24/7 PARA CLIMATIZAÇÃO",
    heroDescription: "Atendimento inteligente especializado para empresas de ar condicionado, refrigeração e climatização. Gerencie picos de demanda e emergências com IA.",
    image: industryHvac,
    secondaryImage: industryHvac2,
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
    testimonials: [
      {
        quote: "No último verão atendemos 3x mais chamados sem contratar ninguém. A IA triou as emergências e agendou o resto.",
        author: "Paulo Mendes",
        role: "Proprietário",
        company: "Mendes HVAC Solutions",
        location: "Phoenix, AZ"
      },
      {
        quote: "Vendemos 50% mais contratos de manutenção preventiva. A IA oferece automaticamente para quem liga.",
        author: "Miguel Santos",
        role: "Gerente Comercial",
        company: "Cool Air Services LLC",
        location: "Houston, TX"
      },
      {
        quote: "Emergências noturnas eram um pesadelo. Agora a IA filtra e só me aciona quando é realmente urgente.",
        author: "Eduardo Lima",
        role: "Técnico Sênior",
        company: "Lima Climate Control",
        location: "Dallas, TX"
      }
    ],
    faqs: [
      {
        question: "Como a IA lida com picos de demanda no verão?",
        answer: "Nossa IA escala automaticamente para atender qualquer volume de chamadas. Ela triagem urgências (AC parado no calor) das manutenções preventivas, garantindo que você atenda primeiro quem mais precisa."
      },
      {
        question: "A IA pode vender contratos de manutenção preventiva?",
        answer: "Sim! Quando um cliente liga para um reparo, a IA oferece automaticamente um plano de manutenção preventiva, explicando os benefícios e agendando se o cliente aceitar."
      },
      {
        question: "Funciona para emergências noturnas e de fim de semana?",
        answer: "Sim! A IA atende 24/7. Para emergências reais (como AC parado em dia quente), ela aciona você imediatamente. Para outros casos, agenda para o próximo horário disponível."
      },
      {
        question: "A IA coleta informações técnicas do equipamento?",
        answer: "Sim! Ela pergunta marca, modelo, idade do equipamento e sintomas do problema, permitindo que você chegue preparado com as peças certas."
      },
      {
        question: "Como a IA organiza chamados por região?",
        answer: "A IA agrupa chamados por localização geográfica, otimizando suas rotas e permitindo que você atenda mais clientes por dia."
      }
    ]
  },
  encanamento: {
    name: "Encanamento",
    heroTitle: "Recepcionista IA para Encanadores",
    heroSubtitle: "ATENDIMENTO 24/7 PARA ENCANAMENTO",
    heroDescription: "Atendimento inteligente para encanadores e empresas de serviços hidráulicos. Atenda emergências de vazamentos e qualifique serviços automaticamente.",
    image: industryPlumbing,
    secondaryImage: industryPlumbing2,
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
    testimonials: [
      {
        quote: "Antes eu perdia 70% das emergências noturnas. Agora a IA me acorda só para vazamentos reais e agenda o resto.",
        author: "Jose Roberto",
        role: "Proprietário",
        company: "JR Plumbing Services",
        location: "Miami, FL"
      },
      {
        quote: "A IA coleta fotos do problema pelo WhatsApp. Chego preparado com as peças certas.",
        author: "Fernando Rocha",
        role: "Encanador",
        company: "Reliable Plumbing LLC",
        location: "Tampa, FL"
      },
      {
        quote: "Meus clientes adoram a resposta instantânea. Minha taxa de conversão subiu 85%.",
        author: "Antonio Gomes",
        role: "Gerente",
        company: "Gomes Plumbing Co",
        location: "Chicago, IL"
      }
    ],
    faqs: [
      {
        question: "Como a IA identifica vazamentos urgentes?",
        answer: "A IA faz perguntas específicas: 'Há água vazando agora?', 'A água já foi fechada no registro?'. Vazamentos ativos são classificados como prioridade máxima e você é acionado imediatamente."
      },
      {
        question: "A IA pode coletar fotos do problema?",
        answer: "Sim! Via WhatsApp, a IA solicita fotos e vídeos do problema, permitindo que você avalie a situação antes de chegar e leve as peças corretas."
      },
      {
        question: "Funciona para emergências às 2h da manhã?",
        answer: "Sim! A IA atende 24/7. Ela avalia a urgência real do problema e decide se aciona você imediatamente ou agenda para a manhã seguinte."
      },
      {
        question: "A IA pode orientar o cliente a fechar a água?",
        answer: "Sim! Em casos de vazamento ativo, a IA orienta o cliente a localizar e fechar o registro principal enquanto você está a caminho."
      },
      {
        question: "Como funciona o agendamento de serviços não urgentes?",
        answer: "Para entupimentos leves, instalações e manutenções, a IA coleta as informações, fornece uma estimativa de preço e agenda no melhor horário disponível."
      }
    ]
  },
  eletrica: {
    name: "Serviços Elétricos",
    heroTitle: "Recepcionista IA para Eletricistas",
    heroSubtitle: "ATENDIMENTO 24/7 PARA ELÉTRICA",
    heroDescription: "Atendimento inteligente para eletricistas e empresas de instalações elétricas. Gerencie emergências, instalações e manutenções com IA.",
    image: industryElectrical,
    secondaryImage: industryElectrical2,
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
    testimonials: [
      {
        quote: "A IA instrui clientes a desligar o disjuntor enquanto eu termino o serviço atual. Isso já evitou acidentes.",
        author: "Pedro Almeida",
        role: "Proprietário",
        company: "Almeida Electric LLC",
        location: "Boston, MA"
      },
      {
        quote: "Instalações comerciais exigem foco total. A IA qualifica tudo antes e eu só preciso orçar.",
        author: "Luis Morales",
        role: "Eletricista Industrial",
        company: "Morales Electrical Services",
        location: "San Antonio, TX"
      },
      {
        quote: "Dobramos nossa carteira de clientes em 8 meses. A IA nunca perde uma oportunidade.",
        author: "Ricardo Costa",
        role: "Diretor",
        company: "RC Electric Solutions",
        location: "Denver, CO"
      }
    ],
    faqs: [
      {
        question: "Como a IA avalia o perigo de emergências elétricas?",
        answer: "A IA pergunta sobre sintomas específicos: faíscas, cheiro de queimado, disjuntores desarmando. Situações de risco são classificadas como prioridade máxima e você é acionado imediatamente."
      },
      {
        question: "A IA pode orientar o cliente a desligar o disjuntor?",
        answer: "Sim! Em casos de risco, a IA orienta o cliente a localizar o quadro elétrico e desligar o disjuntor principal enquanto você está a caminho, evitando acidentes."
      },
      {
        question: "Funciona para projetos de instalação comercial?",
        answer: "Sim! A IA coleta especificações técnicas, metragem, número de pontos e requisitos especiais, qualificando projetos comerciais antes de você visitar."
      },
      {
        question: "A IA diferencia emergências de serviços programados?",
        answer: "Sim! Queda de energia total ou faíscas são emergências. Instalação de tomadas adicionais ou projetos são agendados normalmente."
      },
      {
        question: "Como funciona o acompanhamento de projetos em andamento?",
        answer: "A IA atende chamadas de clientes com projetos ativos, responde dúvidas sobre prazos e agenda visitas de acompanhamento quando necessário."
      }
    ]
  },
  paisagismo: {
    name: "Paisagismo",
    heroTitle: "Recepcionista IA para Paisagismo",
    heroSubtitle: "ATENDIMENTO 24/7 PARA PAISAGISMO",
    heroDescription: "Atendimento inteligente para empresas de jardinagem, paisagismo e manutenção de áreas verdes. Qualifique projetos e agende manutenções automaticamente.",
    image: industryLandscaping,
    secondaryImage: industryLandscaping2,
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
    testimonials: [
      {
        quote: "Minha agenda de manutenções recorrentes cresceu 200% depois que a IA começou a gerenciar os follow-ups.",
        author: "Marcelo Green",
        role: "Proprietário",
        company: "Green Touch Landscaping",
        location: "San Diego, CA"
      },
      {
        quote: "Na primavera, as ligações triplicam. A IA atende todas e eu foco nos jardins.",
        author: "Patricia Jardim",
        role: "Paisagista",
        company: "Jardim Landscaping LLC",
        location: "Orlando, FL"
      },
      {
        quote: "A IA envia meu portfólio automaticamente. Os clientes já chegam apaixonados pelo meu trabalho.",
        author: "Carlos Vega",
        role: "Designer de Jardins",
        company: "Vega Outdoor Services",
        location: "Austin, TX"
      }
    ],
    faqs: [
      {
        question: "A IA consegue qualificar projetos de paisagismo?",
        answer: "Sim! A IA coleta tamanho do terreno, estilo desejado (moderno, tropical, mediterrâneo), orçamento estimado e prazo, qualificando projetos antes da visita técnica."
      },
      {
        question: "Como funciona o envio de portfólio?",
        answer: "Quando um cliente demonstra interesse, a IA envia automaticamente seu portfólio via WhatsApp ou email, mostrando projetos similares ao que ele deseja."
      },
      {
        question: "A IA gerencia manutenções recorrentes?",
        answer: "Sim! Para clientes com contrato de manutenção, a IA gerencia toda a agenda, envia lembretes, permite reagendamentos e coleta feedback após cada visita."
      },
      {
        question: "Funciona para campanhas sazonais de primavera?",
        answer: "Sim! A IA pode reativar clientes antigos na primavera, oferecendo serviços sazonais como preparação de jardins, plantio de flores e limpeza de inverno."
      },
      {
        question: "A IA pode fornecer estimativas de preço?",
        answer: "Com base no tamanho do terreno e tipo de serviço, a IA fornece faixas de preço. Para orçamentos detalhados, ela agenda uma visita técnica."
      }
    ]
  },
  piscinas: {
    name: "Serviços de Piscina",
    heroTitle: "Recepcionista IA para Pool Services",
    heroSubtitle: "ATENDIMENTO 24/7 PARA PISCINAS",
    heroDescription: "Atendimento inteligente para empresas de manutenção, limpeza e reparos de piscinas. Gerencie manutenções recorrentes e emergências com IA.",
    image: industryPool,
    secondaryImage: industryPool2,
    problemTitle: "Piscinas precisam de atenção constante.",
    problemDescription: "A água verde não espera. Clientes ligam desesperados com problemas de química, bombas quebradas ou piscinas sujas para festas. Você está em outra manutenção e não pode atender. Nossa IA prioriza emergências e gerencia sua agenda.",
    problems: [
      "Emergências de água verde ou equipamento quebrado",
      "Manutenções recorrentes difíceis de gerenciar",
      "Picos de demanda na primavera e verão",
      "Clientes querem resposta imediata antes de festas",
      "Dificuldade em vender contratos de manutenção"
    ],
    solutionTitle: "Limpe piscinas enquanto gerenciamos sua agenda.",
    solutionDescription: "Nossa IA identifica emergências (água verde, bomba quebrada) e prioriza automaticamente. Para manutenções regulares, gerencia toda sua agenda de clientes recorrentes e vende novos contratos.",
    solutions: [
      { title: "Triagem de emergências", description: "Água verde e equipamentos quebrados são prioridade" },
      { title: "Gestão de recorrentes", description: "Agenda automática de manutenções semanais/mensais" },
      { title: "Venda de contratos", description: "IA oferece planos de manutenção preventiva" },
      { title: "Atendimento 24/7", description: "Emergências antes de festas e eventos" },
      { title: "Coleta de informações", description: "Tipo de piscina, tamanho, sintomas do problema" },
      { title: "Lembretes automáticos", description: "Notifica clientes sobre visitas agendadas" }
    ],
    features: [
      { icon: Zap, title: "Emergências Priorizadas", description: "Água verde e bombas são urgência máxima" },
      { icon: Calendar, title: "Manutenção Recorrente", description: "Gestão automática de clientes mensais" },
      { icon: Phone, title: "Atendimento Instantâneo", description: "Resposta imediata a cada chamada" },
      { icon: Users, title: "Qualificação de Serviços", description: "Coleta tipo e tamanho da piscina" },
      { icon: BarChart3, title: "Contratos de Serviço", description: "Venda planos de manutenção" },
      { icon: MessageSquare, title: "Multi-Canal", description: "Telefone, SMS e WhatsApp integrados" }
    ],
    stats: [
      { value: "85%", label: "dos clientes de piscina querem resposta no mesmo dia" },
      { value: "70%", label: "da receita vem de contratos de manutenção recorrente" },
      { value: "3x", label: "aumento de chamadas na primavera e verão" }
    ],
    useCases: [
      { title: "Água Verde Urgente", description: "Priorize e acione imediatamente" },
      { title: "Manutenção Semanal", description: "Gerencie toda a agenda recorrente" },
      { title: "Reparos de Equipamento", description: "Qualifique problemas de bombas e filtros" },
      { title: "Abertura de Temporada", description: "Campanhas de primavera automáticas" }
    ],
    testimonials: [
      {
        quote: "Na primavera, as ligações triplicam. A IA atende todas e eu foco nas piscinas. Minha receita subiu 45%.",
        author: "Rafael Santos",
        role: "Proprietário",
        company: "Crystal Clear Pool Service",
        location: "Phoenix, AZ"
      },
      {
        quote: "A IA vende contratos de manutenção automaticamente. Aumentamos clientes recorrentes em 60%.",
        author: "Maria Gonzalez",
        role: "Gerente",
        company: "AquaPro Services LLC",
        location: "Miami, FL"
      },
      {
        quote: "Emergências de água verde são atendidas na hora. Meus clientes adoram a resposta rápida.",
        author: "Carlos Oliveira",
        role: "Técnico Sênior",
        company: "Blue Wave Pools",
        location: "Las Vegas, NV"
      }
    ],
    faqs: [
      {
        question: "Como a IA identifica emergências de piscina?",
        answer: "A IA pergunta sobre a cor da água, funcionamento da bomba e se há evento marcado. Água verde ou equipamento parado são classificados como emergência."
      },
      {
        question: "A IA pode vender contratos de manutenção?",
        answer: "Sim! Quando um cliente liga para serviço avulso, a IA oferece planos mensais explicando os benefícios e economia a longo prazo."
      },
      {
        question: "Como funciona a gestão de manutenções recorrentes?",
        answer: "A IA gerencia toda a agenda de clientes com contrato, envia lembretes, permite reagendamentos e coleta feedback após cada visita."
      },
      {
        question: "Funciona para serviços comerciais de piscina?",
        answer: "Sim! A IA qualifica piscinas residenciais e comerciais, coletando informações específicas como tamanho, tipo de filtragem e frequência necessária."
      },
      {
        question: "A IA pode lidar com picos sazonais?",
        answer: "Absolutamente! A IA escala para atender qualquer volume de chamadas e pode reativar clientes antigos no início da temporada."
      }
    ]
  },
  mudancas: {
    name: "Empresas de Mudança",
    heroTitle: "Recepcionista IA para Moving Companies",
    heroSubtitle: "ATENDIMENTO 24/7 PARA MUDANÇAS",
    heroDescription: "Atendimento inteligente para empresas de mudança residencial e comercial. Qualifique projetos, forneça estimativas e agende visitas automaticamente.",
    image: industryMoving,
    secondaryImage: industryMoving2,
    problemTitle: "Orçamentos de mudança são complexos.",
    problemDescription: "Cada mudança é única. O cliente liga querendo preço imediato, mas você precisa saber quantos cômodos, distância, itens especiais. Você está no caminhão e não pode fazer orçamento. Nossa IA qualifica tudo antes.",
    problems: [
      "Orçamentos complexos requerem muitas informações",
      "Ligações durante mudanças em andamento",
      "Clientes querem preço imediato por telefone",
      "Alta concorrência — primeiro a responder ganha",
      "Dificuldade em qualificar mudanças grandes vs pequenas"
    ],
    solutionTitle: "Carregue caminhões enquanto qualificamos leads.",
    solutionDescription: "Nossa IA coleta todas as informações necessárias — número de cômodos, endereço de origem e destino, itens especiais, data desejada — e fornece estimativas ou agenda visitas para orçamentos detalhados.",
    solutions: [
      { title: "Qualificação completa", description: "Coleta cômodos, distância, itens especiais" },
      { title: "Estimativas automáticas", description: "Faixas de preço baseadas nas informações" },
      { title: "Agendamento de visitas", description: "Marca visitas para orçamentos presenciais" },
      { title: "Resposta imediata", description: "Primeiro a responder ganha o cliente" },
      { title: "Triagem por tamanho", description: "Separa mudanças pequenas de grandes projetos" },
      { title: "Follow-up de propostas", description: "Acompanha orçamentos enviados" }
    ],
    features: [
      { icon: Phone, title: "Resposta Instantânea", description: "Primeiro a atender ganha" },
      { icon: Users, title: "Qualificação Completa", description: "Cômodos, distância, itens especiais" },
      { icon: Calendar, title: "Agendamento de Visitas", description: "Orçamentos presenciais" },
      { icon: BarChart3, title: "Estimativas Automáticas", description: "Faixas de preço por telefone" },
      { icon: Zap, title: "Follow-up Automático", description: "Acompanha propostas enviadas" },
      { icon: MessageSquare, title: "Multi-Canal", description: "Telefone, SMS e WhatsApp" }
    ],
    stats: [
      { value: "78%", label: "dos clientes escolhem a primeira empresa que responde" },
      { value: "60%", label: "das propostas são perdidas por falta de follow-up" },
      { value: "5min", label: "é o tempo máximo para responder e ganhar o cliente" }
    ],
    useCases: [
      { title: "Mudanças Residenciais", description: "Qualifique tamanho e forneça estimativas" },
      { title: "Mudanças Comerciais", description: "Colete especificações de projetos grandes" },
      { title: "Mudanças de Longa Distância", description: "Calcule distância e complexidade" },
      { title: "Follow-up de Propostas", description: "Acompanhe orçamentos automaticamente" }
    ],
    testimonials: [
      {
        quote: "Antes eu perdia 50% dos leads durante mudanças. Agora a IA qualifica tudo e eu só ligo para fechar.",
        author: "Roberto Martinez",
        role: "Proprietário",
        company: "Martinez Moving LLC",
        location: "Houston, TX"
      },
      {
        quote: "A IA fornece estimativas por telefone. Minha taxa de conversão subiu 40% porque respondemos primeiro.",
        author: "Andre Silva",
        role: "Gerente Comercial",
        company: "Fast Move Services",
        location: "Atlanta, GA"
      },
      {
        quote: "O follow-up automático recupera clientes indecisos. Fechamos 25% mais contratos.",
        author: "Jose Hernandez",
        role: "Diretor",
        company: "Hernandez Movers Inc",
        location: "Dallas, TX"
      }
    ],
    faqs: [
      {
        question: "Como a IA qualifica mudanças complexas?",
        answer: "A IA faz perguntas estruturadas: número de cômodos, itens especiais (piano, cofre), distância entre endereços, data desejada e requisitos de acesso (escadas, elevador)."
      },
      {
        question: "A IA pode fornecer preços por telefone?",
        answer: "Sim! Com base nas informações coletadas, a IA fornece faixas de preço. Para orçamentos exatos, ela agenda uma visita presencial."
      },
      {
        question: "Como funciona para mudanças de longa distância?",
        answer: "A IA coleta endereços de origem e destino, calcula a distância e ajusta as estimativas. Para mudanças interestaduais, qualifica requisitos especiais."
      },
      {
        question: "A IA diferencia mudanças pequenas de grandes?",
        answer: "Sim! Apartamentos de 1 quarto são tratados diferente de casas de 5 quartos. A IA prioriza projetos grandes que geram mais receita."
      },
      {
        question: "Como funciona o follow-up de propostas?",
        answer: "Após enviar um orçamento, a IA entra em contato automaticamente em 24-48 horas para verificar interesse e responder dúvidas."
      }
    ]
  },
  telhados: {
    name: "Serviços de Telhado",
    heroTitle: "Recepcionista IA para Roofing Companies",
    heroSubtitle: "ATENDIMENTO 24/7 PARA TELHADOS",
    heroDescription: "Atendimento inteligente para empresas de reparos, substituição e manutenção de telhados. Gerencie emergências pós-tempestade e projetos de instalação com IA.",
    image: industryRoofing,
    secondaryImage: industryRoofing2,
    problemTitle: "Tempestades trazem picos de demanda.",
    problemDescription: "Após uma tempestade, as ligações explodem. Goteiras, telhas arrancadas, danos estruturais. Você está em um telhado e não pode atender. Nossa IA escala com a demanda e prioriza emergências.",
    problems: [
      "Picos de demanda após tempestades",
      "Emergências de goteiras ativas",
      "Projetos de substituição são complexos de orçar",
      "Trabalho em altura impede atender telefone",
      "Alta concorrência por projetos de seguro"
    ],
    solutionTitle: "Cubra telhados enquanto cobrimos suas ligações.",
    solutionDescription: "Nossa IA identifica emergências (goteira ativa, dano de tempestade) e prioriza. Para projetos de instalação, qualifica tipo de telhado, metragem e orçamento antes da visita.",
    solutions: [
      { title: "Triagem de emergências", description: "Goteiras ativas e danos de tempestade" },
      { title: "Escalabilidade ilimitada", description: "Atende picos pós-tempestade" },
      { title: "Qualificação de projetos", description: "Tipo de telhado, metragem, orçamento" },
      { title: "Projetos de seguro", description: "Coleta informações para claims" },
      { title: "Agendamento de inspeções", description: "Visitas para orçamentos detalhados" },
      { title: "Follow-up automático", description: "Acompanha propostas enviadas" }
    ],
    features: [
      { icon: Zap, title: "Emergências Priorizadas", description: "Goteiras e danos de tempestade" },
      { icon: Shield, title: "Projetos de Seguro", description: "Qualifica claims de seguradoras" },
      { icon: Calendar, title: "Inspeções Agendadas", description: "Visitas para orçamento no local" },
      { icon: Users, title: "Qualificação Técnica", description: "Tipo, metragem e material" },
      { icon: BarChart3, title: "Gestão de Demanda", description: "Escala em picos de tempestade" },
      { icon: Phone, title: "Atendimento 24/7", description: "Emergências noturnas e fins de semana" }
    ],
    stats: [
      { value: "10x", label: "aumento de chamadas após tempestades severas" },
      { value: "90%", label: "dos clientes com goteira querem resposta imediata" },
      { value: "65%", label: "dos projetos grandes vêm de claims de seguro" }
    ],
    useCases: [
      { title: "Emergências de Goteira", description: "Priorize e acione imediatamente" },
      { title: "Danos de Tempestade", description: "Escale atendimento pós-tempestade" },
      { title: "Substituição de Telhado", description: "Qualifique projetos completos" },
      { title: "Claims de Seguro", description: "Colete informações para seguradoras" }
    ],
    testimonials: [
      {
        quote: "Após a última tempestade, recebemos 200 ligações em um dia. A IA atendeu todas e priorizou as emergências reais.",
        author: "Miguel Rocha",
        role: "Proprietário",
        company: "Rocha Roofing LLC",
        location: "Orlando, FL"
      },
      {
        quote: "A IA qualifica projetos de seguro perfeitamente. Economizo horas em cada claim.",
        author: "David Santos",
        role: "Gerente de Projetos",
        company: "Santos Roofing Services",
        location: "Denver, CO"
      },
      {
        quote: "Trabalhar no telhado e atender telefone é impossível. A IA resolve isso e nunca perdemos um lead.",
        author: "Fernando Costa",
        role: "Instalador Sênior",
        company: "Costa Roofing Inc",
        location: "Charlotte, NC"
      }
    ],
    faqs: [
      {
        question: "Como a IA lida com picos pós-tempestade?",
        answer: "A IA escala automaticamente para atender qualquer volume de chamadas, triando emergências reais (goteiras ativas) de inspeções que podem esperar."
      },
      {
        question: "A IA pode qualificar projetos de seguro?",
        answer: "Sim! A IA coleta informações específicas para claims: data do dano, número da apólice, tipo de dano e fotos via WhatsApp."
      },
      {
        question: "Como funciona para substituições de telhado?",
        answer: "A IA qualifica tipo de telhado atual, metragem aproximada, material desejado e orçamento, permitindo que você chegue preparado para a visita."
      },
      {
        question: "A IA prioriza emergências de goteira?",
        answer: "Sim! Goteiras ativas são classificadas como prioridade máxima. A IA pode orientar o cliente a colocar baldes enquanto você está a caminho."
      },
      {
        question: "Como funciona o follow-up de orçamentos?",
        answer: "Após enviar uma proposta, a IA entra em contato automaticamente para responder dúvidas e ajudar no processo de decisão."
      }
    ]
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
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Image */}
            <div className="order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={data.secondaryImage} 
                  alt={`Profissional de ${data.name.toLowerCase()} trabalhando`}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            
            {/* Right: Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {data.solutionTitle}
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                {data.solutionDescription}
              </p>
              
              <h3 className="text-lg font-semibold mb-5 text-foreground">
                O que torna a ClickOne AI diferente:
              </h3>
              <ul className="space-y-3">
                {data.solutions.map((solution, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-foreground">{solution.title}</span>
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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Casos de uso para {data.name.toLowerCase()}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Veja como empresas do seu setor estão usando a ClickOne AI para crescer.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.useCases.map((useCase, index) => (
              <div key={index} className="bg-background rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-semibold mb-2">{useCase.title}</h4>
                <p className="text-muted-foreground text-sm">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <TestimonialsCarousel testimonials={data.testimonials} industry={data.name} />

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

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-semibold tracking-wider mb-2 block">
              PERGUNTAS FREQUENTES
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Dúvidas sobre IA para {data.name}?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Respostas para as perguntas mais comuns sobre como a ClickOne AI pode ajudar seu negócio.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {data.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="border-b border-border">
                  <AccordionTrigger className="text-left text-lg font-medium hover:text-primary py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Ainda tem dúvidas? Fale com nossa equipe.
            </p>
            <Button variant="outline" asChild>
              <Link to="/contato">Entrar em Contato</Link>
            </Button>
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
