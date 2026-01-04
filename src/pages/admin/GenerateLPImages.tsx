import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Loader2, 
  ImageIcon, 
  RefreshCw, 
  CheckCircle, 
  XCircle,
  Download,
  Sparkles
} from "lucide-react";

interface SectionConfig {
  id: string;
  title: string;
  description: string;
}

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
      const { data, error } = await supabase.functions.invoke("generate-lp-images", {
        body: { section: sectionId }
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
