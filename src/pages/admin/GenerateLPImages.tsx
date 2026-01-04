import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Loader2, 
  ImageIcon, 
  RefreshCw, 
  CheckCircle, 
  XCircle,
  Download,
  Sparkles,
  Pencil,
  ChevronDown
} from "lucide-react";

interface SectionConfig {
  id: string;
  title: string;
  description: string;
}

// Default prompts for each section
const DEFAULT_PROMPTS: Record<string, string> = {
  hero: "Professional business owner in a modern office setting, looking at smartphone with concerned expression seeing multiple missed call notifications on screen. Warm natural lighting, cinematic quality, realistic photo style. The person is a middle-aged professional wearing business casual attire. Ultra high resolution, 16:9 aspect ratio hero image.",
  hook: "Close-up view of a smartphone screen showing multiple red missed call notification badges and unread message alerts. The phone is held by a hand of a busy professional. Dramatic lighting with focus on the notifications. Business context, urgent feeling. Ultra high resolution.",
  dailyLife: "Service professional (plumber or HVAC technician) in work uniform standing next to a branded white work van in early morning light. The worker is checking their phone while loading equipment. Realistic, warm lighting, professional appearance. The van has a ladder on top. Ultra high resolution.",
  problem: "Clean infographic-style visualization showing money (dollar bills and coins) metaphorically flying away from a ringing phone icon. Modern design with purple and red color accents on white background. Business loss concept. Minimalist and professional graphic style. Ultra high resolution.",
  whyHappens: "Overwhelmed small business owner at a cluttered desk with phone ringing, multiple papers and notes scattered around. Expression of stress and time pressure. The person is trying to work on a laptop while the phone demands attention. Relatable and emotional scene. Ultra high resolution.",
  solution: "Futuristic AI virtual assistant hologram in soft purple and blue colors, elegantly answering phone calls in a modern business environment. Clean, professional aesthetic with tech elements. The AI appears friendly and helpful. Digital glowing effects. Ultra high resolution.",
  howItWorks: "Split screen composition showing on one side a customer making a phone call on their smartphone, and on the other side a friendly AI chat interface responding. Clean modern design with purple accent colors. The flow shows the connection between customer and AI. Ultra high resolution.",
  success: "Happy and relaxed business owner in a comfortable office setting, smiling confidently while looking at positive business metrics on a tablet. In the background, subtle visual indication of AI handling calls. Warm lighting, success and relief feeling. Professional photography style. Ultra high resolution.",
};

const LP_SECTIONS: SectionConfig[] = [
  { id: "hero", title: "Hero", description: "Empresário com chamadas perdidas no celular" },
  { id: "hook", title: "Hook Emocional", description: "Celular com notificações de chamadas" },
  { id: "dailyLife", title: "O Dia a Dia", description: "Profissional de serviços ao lado da van" },
  { id: "problem", title: "O Problema", description: "Visualização de perda financeira" },
  { id: "whyHappens", title: "Por Que Acontece", description: "Empresário sobrecarregado" },
  { id: "solution", title: "A Solução", description: "IA atendendo chamadas" },
  { id: "howItWorks", title: "Como Funciona", description: "Fluxo de atendimento" },
  { id: "success", title: "O Que Muda", description: "Empresário relaxado com sucesso" },
];

type GenerationStatus = "idle" | "generating" | "success" | "error";

interface ImageState {
  status: GenerationStatus;
  url?: string;
  error?: string;
}

const GenerateLPImages = () => {
  const [imageStates, setImageStates] = useState<Record<string, ImageState>>({});
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);
  const [customPrompts, setCustomPrompts] = useState<Record<string, string>>({});
  const [openPrompts, setOpenPrompts] = useState<Record<string, boolean>>({});

  // Check for existing images on mount
  useEffect(() => {
    checkExistingImages();
  }, []);

  const checkExistingImages = async () => {
    const { data: files } = await supabase.storage
      .from("lp-images")
      .list();

    if (files) {
      const newStates: Record<string, ImageState> = {};
      
      for (const section of LP_SECTIONS) {
        const filename = `lp-${section.id}.png`;
        const file = files.find(f => f.name === filename || f.name === `lp-${section.id.toLowerCase()}.png`);
        
        if (file) {
          const { data } = supabase.storage
            .from("lp-images")
            .getPublicUrl(file.name);
          
          newStates[section.id] = {
            status: "success",
            url: data.publicUrl + `?t=${file.updated_at}`
          };
        } else {
          newStates[section.id] = { status: "idle" };
        }
      }
      
      setImageStates(newStates);
    }
  };

  const generateImage = async (sectionId: string) => {
    setImageStates(prev => ({
      ...prev,
      [sectionId]: { status: "generating" }
    }));

    try {
      const promptToUse = customPrompts[sectionId] || undefined;
      const { data, error } = await supabase.functions.invoke("generate-lp-images", {
        body: { section: sectionId, customPrompt: promptToUse }
      });

      if (error) throw error;

      if (data?.error) {
        throw new Error(data.error);
      }

      setImageStates(prev => ({
        ...prev,
        [sectionId]: { 
          status: "success", 
          url: data.url + `?t=${Date.now()}`
        }
      }));

      toast({
        title: "Imagem gerada!",
        description: `Seção "${LP_SECTIONS.find(s => s.id === sectionId)?.title}" atualizada.`
      });

    } catch (error) {
      console.error("Error generating image:", error);
      
      setImageStates(prev => ({
        ...prev,
        [sectionId]: { 
          status: "error", 
          error: error instanceof Error ? error.message : "Erro desconhecido"
        }
      }));

      toast({
        variant: "destructive",
        title: "Erro ao gerar imagem",
        description: error instanceof Error ? error.message : "Tente novamente."
      });
    }
  };

  const generateAllImages = async () => {
    setIsGeneratingAll(true);

    for (const section of LP_SECTIONS) {
      await generateImage(section.id);
      // Small delay between generations to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    setIsGeneratingAll(false);
    
    toast({
      title: "Todas as imagens geradas!",
      description: "Verifique cada seção para revisar as imagens."
    });
  };

  const getStatusBadge = (status: GenerationStatus) => {
    switch (status) {
      case "generating":
        return <Badge variant="secondary"><Loader2 className="h-3 w-3 mr-1 animate-spin" /> Gerando...</Badge>;
      case "success":
        return <Badge variant="default" className="bg-green-600"><CheckCircle className="h-3 w-3 mr-1" /> Gerada</Badge>;
      case "error":
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Erro</Badge>;
      default:
        return <Badge variant="outline"><ImageIcon className="h-3 w-3 mr-1" /> Pendente</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Gerador de Imagens - LP Perdendo Clientes
          </h1>
          <p className="text-muted-foreground">
            Gere imagens profissionais com IA para cada seção da landing page.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mb-8">
          <Button
            size="lg"
            onClick={generateAllImages}
            disabled={isGeneratingAll}
            className="font-semibold"
          >
            {isGeneratingAll ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Gerando todas...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Gerar Todas as Imagens
              </>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={checkExistingImages}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Atualizar Lista
          </Button>
        </div>

        {/* Image Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LP_SECTIONS.map((section) => {
            const state = imageStates[section.id] || { status: "idle" };
            
            return (
              <Card key={section.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                    {getStatusBadge(state.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                </CardHeader>
                
                <CardContent>
                  {/* Prompt Customization */}
                  <Collapsible 
                    open={openPrompts[section.id]} 
                    onOpenChange={(open) => setOpenPrompts(prev => ({ ...prev, [section.id]: open }))}
                    className="mb-4"
                  >
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-full justify-between text-muted-foreground hover:text-foreground">
                        <span className="flex items-center gap-2">
                          <Pencil className="h-3 w-3" />
                          Customizar Prompt
                        </span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${openPrompts[section.id] ? "rotate-180" : ""}`} />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-2">
                      <Textarea
                        placeholder={DEFAULT_PROMPTS[section.id]}
                        value={customPrompts[section.id] || ""}
                        onChange={(e) => setCustomPrompts(prev => ({ ...prev, [section.id]: e.target.value }))}
                        className="min-h-[100px] text-xs"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Deixe vazio para usar o prompt padrão.
                      </p>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Image Preview */}
                  <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                    {state.url ? (
                      <img
                        src={state.url}
                        alt={section.title}
                        className="w-full h-full object-cover"
                      />
                    ) : state.status === "generating" ? (
                      <div className="text-center text-muted-foreground">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                        <p className="text-sm">Gerando com IA...</p>
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Sem imagem</p>
                      </div>
                    )}
                  </div>

                  {/* Error Message */}
                  {state.error && (
                    <p className="text-sm text-destructive mb-4">{state.error}</p>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => generateImage(section.id)}
                      disabled={state.status === "generating" || isGeneratingAll}
                      className="flex-1"
                    >
                      {state.status === "generating" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : state.url ? (
                        <>
                          <RefreshCw className="mr-1 h-4 w-4" />
                          Regenerar
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-1 h-4 w-4" />
                          Gerar
                        </>
                      )}
                    </Button>

                    {state.url && (
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                      >
                        <a href={state.url} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Instruções de Uso</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm text-muted-foreground">
            <ol className="list-decimal list-inside space-y-2">
              <li>Clique em "Gerar Todas as Imagens" para criar todas de uma vez, ou gere individualmente.</li>
              <li>Cada imagem é gerada com IA baseada em prompts otimizados para cada seção.</li>
              <li>Se uma imagem não ficou boa, clique em "Regenerar" para criar uma nova versão.</li>
              <li>As imagens são salvas automaticamente e já aparecem na LP.</li>
              <li>Pode haver um tempo de espera devido aos limites de rate da API.</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GenerateLPImages;
