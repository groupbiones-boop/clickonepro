import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { CheckCircle, ArrowRight } from "lucide-react";
import industryCleaning from "@/assets/industry-cleaning.jpg";
import industryConstruction from "@/assets/industry-construction.jpg";
import industryHvac from "@/assets/industry-hvac.jpg";
import industryPlumbing from "@/assets/industry-plumbing.jpg";
import industryElectrical from "@/assets/industry-electrical.jpg";
import industryLandscaping from "@/assets/industry-landscaping.jpg";

const industryData: Record<string, { name: string; image: string; description: string; painPoints: string[]; solutions: string[] }> = {
  limpeza: { 
    name: "Empresas de Limpeza", 
    image: industryCleaning, 
    description: "Automatize o atendimento da sua empresa de limpeza residencial ou comercial.", 
    painPoints: ["Clientes ligam enquanto você está limpando", "Dificuldade em agendar serviços recorrentes", "Perda de leads por demora na resposta"], 
    solutions: ["Atendimento 24/7 mesmo durante serviços", "Agendamento automático de limpezas recorrentes", "Resposta instantânea a novos leads"] 
  },
  construcao: { 
    name: "Construção & Reformas", 
    image: industryConstruction, 
    description: "IA especializada para construtoras e empresas de reforma.", 
    painPoints: ["Ligações perdidas no canteiro de obras", "Orçamentos demorados para responder", "Clientes sem retorno adequado"], 
    solutions: ["Atendimento profissional 24/7", "Qualificação de projetos automatizada", "Follow-up automático de orçamentos"] 
  },
  hvac: { 
    name: "HVAC / Climatização", 
    image: industryHvac, 
    description: "Atendimento inteligente para empresas de ar condicionado.", 
    painPoints: ["Alta demanda em épocas de calor/frio", "Urgências fora do horário comercial", "Dificuldade em triagem de chamados"], 
    solutions: ["Escalabilidade em picos de demanda", "Atendimento 24/7 para emergências", "Triagem automática por urgência"] 
  },
  encanamento: { 
    name: "Encanamento", 
    image: industryPlumbing, 
    description: "IA para encanadores e empresas de serviços hidráulicos.", 
    painPoints: ["Emergências a qualquer hora", "Mãos ocupadas durante o trabalho", "Clientes impacientes esperando retorno"], 
    solutions: ["Atendimento imediato para vazamentos", "Não precisa parar o serviço para atender", "Resposta instantânea e profissional"] 
  },
  eletrica: { 
    name: "Serviços Elétricos", 
    image: industryElectrical, 
    description: "Atendimento automatizado para eletricistas.", 
    painPoints: ["Chamadas durante instalações", "Urgências elétricas noturnas", "Dificuldade em gerenciar agenda"], 
    solutions: ["IA atende enquanto você trabalha", "Suporte 24/7 para emergências", "Agendamento integrado à sua agenda"] 
  },
  paisagismo: { 
    name: "Paisagismo", 
    image: industryLandscaping, 
    description: "IA para empresas de jardinagem e paisagismo.", 
    painPoints: ["Trabalho ao ar livre dificulta atendimento", "Orçamentos de projetos complexos", "Sazonalidade de serviços"], 
    solutions: ["Atendimento mesmo no campo", "Qualificação detalhada de projetos", "Campanhas de reativação sazonal"] 
  },
};

const SetorDetalhe = () => {
  const { slug } = useParams();
  const data = industryData[slug || ""] || industryData.limpeza;

  return (
    <Layout>
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${data.image})` }}
        >
          <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.name}</h1>
            <p className="text-lg text-muted-foreground mb-8">{data.description}</p>
            <Button size="lg" asChild>
              <Link to="/agendar-demo">Agendar Demo Grátis <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Desafios do Setor</h2>
              <ul className="space-y-4">
                {data.painPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-destructive text-xl">✗</span>
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-accent/50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-primary">Como Resolvemos</h2>
              <ul className="space-y-4">
                {data.solutions.map((solution, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para Transformar Seu Negócio?</h2>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/agendar-demo">Agendar Demo Grátis</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default SetorDetalhe;
