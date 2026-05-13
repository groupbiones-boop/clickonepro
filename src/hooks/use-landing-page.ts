import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Json } from "@/integrations/supabase/types";

export interface LPContent {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    cta: string;
  };
  hook: {
    title: string;
    text: string;
  };
  dayInLife: {
    title: string;
    items: { time: string; text: string }[];
    conclusion: string;
  };
  problem: {
    title: string;
    stats: { value: string; label: string }[];
    support: string;
    cta: string;
  };
  whyHappens: {
    title: string;
    subtitle: string;
    cards: { title: string; text: string }[];
  };
  solution: {
    title: string;
    subtitle: string;
    features: { title: string; text: string }[];
  };
  howItWorks: {
    title: string;
    steps: { title: string; text: string }[];
    cta: string;
  };
  whatChanges: {
    title: string;
    benefits: { title: string; text: string }[];
  };
  whoItsFor: {
    title: string;
    subtitle: string;
  };
  aboutCompany: {
    tagline: string;
    headline: string;
    differentiators: { title: string; text: string }[];
    badge: string;
  };
  finalCta: {
    title: string;
    text: string;
    pillars: { title: string; text: string }[];
    cta: string;
    support: string;
  };
  industries: {
    title: string;
    subtitle: string;
    items: { name: string; slug: string; image?: string }[];
  };
}

export interface LPImages {
  hero?: string;
  hook?: string;
  dailyLife?: string;
  problem?: string;
  whyHappens?: string;
  solution?: string;
  howItWorks?: string;
  success?: string;
}

export interface LandingPage {
  id: string;
  name: string;
  slug: string;
  content: LPContent;
  images: LPImages;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
}

// Default LP content template based on PerdendoClientes
export const DEFAULT_LP_CONTENT: LPContent = {
  hero: {
    badge: "Leitura de 3 min | Setup em 72h",
    title: "Você Está Perdendo Clientes Agora",
    subtitle: "Enquanto você trabalha, ligações não atendidas estão custando seu negócio. Descubra como capturar cada oportunidade automaticamente.",
    cta: "Quero Parar de Perder Clientes"
  },
  hook: {
    title: "Quantas ligações você perdeu hoje?",
    text: "Cada chamada não atendida é um cliente que vai direto para a concorrência. Em um mercado competitivo, você não pode se dar ao luxo de perder nenhuma oportunidade."
  },
  dayInLife: {
    title: "O dia a dia de quem trabalha duro",
    items: [
      { time: "5:30", text: "Acorda cedo para se preparar" },
      { time: "6:30", text: "Sai para o primeiro serviço do dia" },
      { time: "7:00-18:00", text: "Trabalha focado, fazendo o que faz de melhor" },
      { time: "18:30", text: "Vê as notificações: 8 chamadas perdidas" },
      { time: "19:00", text: "Liga de volta, mas metade já contratou outro" }
    ],
    conclusion: "Você trabalhou o dia inteiro e ainda assim perdeu clientes. Isso não é justo."
  },
  problem: {
    title: "O verdadeiro custo das chamadas perdidas",
    stats: [
      { value: "80%", label: "dos clientes não ligam de volta" },
      { value: "$500-$2,000", label: "valor médio por serviço perdido" },
      { value: "$20k/mês", label: "potencial de receita perdida" }
    ],
    support: "Esses números são baseados em dados reais de empresas de serviços como a sua.",
    cta: "Ver como resolver isso"
  },
  whyHappens: {
    title: "Por que isso acontece?",
    subtitle: "Não é sua culpa. É simplesmente impossível atender enquanto trabalha.",
    cards: [
      { title: "Sem tempo", text: "Você está ocupado fazendo o trabalho de verdade" },
      { title: "Custo alto", text: "Contratar uma recepcionista é caro demais" },
      { title: "Fora do horário", text: "Clientes ligam quando você não está disponível" }
    ]
  },
  solution: {
    title: "A solução: IA que trabalha por você 24/7",
    subtitle: "Uma recepcionista virtual que atende, agenda e qualifica leads automaticamente.",
    features: [
      { title: "24/7", text: "Atende a qualquer hora" },
      { title: "Voz natural", text: "Conversação humanizada" },
      { title: "Multicanal", text: "Telefone, WhatsApp e chat" },
      { title: "Agendamento", text: "Marca serviços no seu calendário" }
    ]
  },
  howItWorks: {
    title: "Como funciona",
    steps: [
      { title: "Cliente liga", text: "A IA atende instantaneamente com voz natural" },
      { title: "Entende a necessidade", text: "Faz perguntas relevantes sobre o serviço" },
      { title: "Agenda o serviço", text: "Marca diretamente na sua agenda" }
    ],
    cta: "Quero ver funcionando"
  },
  whatChanges: {
    title: "O que muda no seu negócio",
    benefits: [
      { title: "Mais clientes", text: "Capture todas as oportunidades" },
      { title: "Mais tempo", text: "Foque no que você faz de melhor" },
      { title: "Mais profissional", text: "Impressione desde o primeiro contato" },
      { title: "Menos estresse", text: "Sem preocupação com chamadas perdidas" },
      { title: "Mais receita", text: "Converta mais leads em clientes" },
      { title: "Disponibilidade", text: "Atenda 24 horas por dia" }
    ]
  },
  whoItsFor: {
    title: "Para quem é essa solução?",
    subtitle: "Perfeita para empresas de serviços que não podem perder nenhuma ligação."
  },
  aboutCompany: {
    tagline: "Tecnologia a serviço do seu negócio",
    headline: "Por que empresas confiam em nós",
    differentiators: [
      { title: "+500 empresas", text: "Já transformaram seu atendimento" },
      { title: "+30% receita", text: "Aumento médio em 6 meses" },
      { title: "Suporte humano", text: "Equipe dedicada ao seu sucesso" }
    ],
    badge: "Setup em 72 horas • Sem contrato de fidelidade"
  },
  finalCta: {
    title: "Está pronto para parar de perder clientes?",
    text: "Agende uma demonstração gratuita e veja como a IA pode transformar seu negócio.",
    pillars: [
      { title: "Setup rápido", text: "Funcionando em 72h" },
      { title: "Sem risco", text: "Teste grátis por 14 dias" },
      { title: "ROI garantido", text: "Ou seu dinheiro de volta" }
    ],
    cta: "Agendar Demonstração Gratuita",
    support: "Sem compromisso • Leva apenas 15 minutos"
  },
  industries: {
    title: "Soluções para seu setor",
    subtitle: "Atendimento especializado para cada tipo de negócio",
    items: [
      { name: "Limpeza", slug: "limpeza", image: "" },
      { name: "HVAC", slug: "hvac", image: "" },
      { name: "Encanamento", slug: "encanamento", image: "" },
      { name: "Construção", slug: "construcao", image: "" },
      { name: "Controle de Pragas", slug: "controle-pragas", image: "" },
      { name: "Clínica Médica", slug: "clinica-medica", image: "" }
    ]
  }
};

export function useLandingPages() {
  const [landingPages, setLandingPages] = useState<LandingPage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchLandingPages = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("landing_pages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      // Type assertion since we know the structure
      setLandingPages((data || []) as unknown as LandingPage[]);
    } catch (error) {
      console.error("Error fetching landing pages:", error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar LPs",
        description: "Tente novamente."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createLandingPage = async (name: string, slug: string) => {
    try {
      const { data, error } = await supabase
        .from("landing_pages")
        .insert({
          name,
          slug,
          content: DEFAULT_LP_CONTENT as unknown as Json,
          images: {} as Json,
          status: "draft"
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "LP criada!",
        description: `"${name}" foi criada com sucesso.`
      });

      return data as unknown as LandingPage;
    } catch (error: unknown) {
      console.error("Error creating landing page:", error);
      const errorMessage = error instanceof Error ? error.message : "Tente novamente.";
      toast({
        variant: "destructive",
        title: "Erro ao criar LP",
        description: errorMessage.includes("duplicate") 
          ? "Já existe uma LP com esse slug." 
          : errorMessage
      });
      return null;
    }
  };

  const updateLandingPage = async (id: string, updates: Partial<Pick<LandingPage, "name" | "slug" | "content" | "images" | "status">>) => {
    try {
      const updateData: Partial<{ name: string; slug: string; content: Json; images: Json; status: string }> = { ...updates } as unknown as Partial<{ name: string; slug: string; content: Json; images: Json; status: string }>;
      if (updates.content) updateData.content = updates.content as unknown as Json;
      if (updates.images) updateData.images = updates.images as unknown as Json;
      
      const { error } = await supabase
        .from("landing_pages")
        .update(updateData)
        .eq("id", id);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error("Error updating landing page:", error);
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Tente novamente."
      });
      return false;
    }
  };

  const deleteLandingPage = async (id: string) => {
    try {
      const { error } = await supabase
        .from("landing_pages")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "LP excluída",
        description: "A landing page foi removida."
      });

      return true;
    } catch (error) {
      console.error("Error deleting landing page:", error);
      toast({
        variant: "destructive",
        title: "Erro ao excluir",
        description: "Tente novamente."
      });
      return false;
    }
  };

  const duplicateLandingPage = async (lp: LandingPage) => {
    try {
      const { data, error } = await supabase
        .from("landing_pages")
        .insert({
          name: `${lp.name} (cópia)`,
          slug: `${lp.slug}-copy-${Date.now()}`,
          content: lp.content as unknown as Json,
          images: lp.images as unknown as Json,
          status: "draft"
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "LP duplicada!",
        description: "Uma cópia foi criada."
      });

      return data as unknown as LandingPage;
    } catch (error) {
      console.error("Error duplicating landing page:", error);
      toast({
        variant: "destructive",
        title: "Erro ao duplicar",
        description: "Tente novamente."
      });
      return null;
    }
  };

  useEffect(() => {
    fetchLandingPages();
  }, []);

  return {
    landingPages,
    isLoading,
    fetchLandingPages,
    createLandingPage,
    updateLandingPage,
    deleteLandingPage,
    duplicateLandingPage
  };
}

export function useLandingPage(id: string | undefined) {
  const [landingPage, setLandingPage] = useState<LandingPage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    async function fetchLandingPage() {
      try {
        const { data, error } = await supabase
          .from("landing_pages")
          .select("*")
          .eq("id", id)
          .maybeSingle();

        if (error) throw error;
        setLandingPage(data as unknown as LandingPage);
      } catch (error) {
        console.error("Error fetching landing page:", error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar LP",
          description: "Tente novamente."
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchLandingPage();
  }, [id]);

  return { landingPage, setLandingPage, isLoading };
}

export function useLandingPageBySlug(slug: string | undefined) {
  const [landingPage, setLandingPage] = useState<LandingPage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) {
      setIsLoading(false);
      return;
    }

    async function fetchLandingPage() {
      try {
        const { data, error } = await supabase
          .from("landing_pages")
          .select("*")
          .eq("slug", slug)
          .eq("status", "published")
          .maybeSingle();

        if (error) throw error;
        
        if (!data) {
          setNotFound(true);
        } else {
          setLandingPage(data as unknown as LandingPage);
        }
      } catch (error) {
        console.error("Error fetching landing page:", error);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLandingPage();
  }, [slug]);

  return { landingPage, isLoading, notFound };
}
