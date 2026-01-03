import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Loader2, Image as ImageIcon, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CoverImageGeneratorProps {
  value: string;
  onChange: (url: string) => void;
  postTitle: string;
}

const CoverImageGenerator = ({
  value,
  onChange,
  postTitle,
}: CoverImageGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const { toast } = useToast();

  const generateImage = async () => {
    if (!postTitle && !customPrompt) {
      toast({
        title: "Erro",
        description: "Digite um título ou prompt para gerar a imagem",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke(
        "generate-blog-image",
        {
          body: {
            title: postTitle,
            prompt: customPrompt,
            type: "cover",
          },
        }
      );

      if (error) throw error;

      if (data?.imageUrl) {
        onChange(data.imageUrl);
        toast({
          title: "Imagem gerada!",
          description: "A imagem de capa foi criada com sucesso.",
        });
      }
    } catch (error: any) {
      console.error("Error generating image:", error);
      toast({
        title: "Erro ao gerar imagem",
        description: error.message || "Tente novamente mais tarde",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const removeImage = () => {
    onChange("");
  };

  return (
    <div className="space-y-3">
      <Label>Imagem de Capa</Label>

      {value && !value.includes("sua-url") ? (
        <div className="relative group">
          <img
            src={value}
            alt="Preview da capa"
            className="w-full h-40 object-cover rounded-lg border"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={removeImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed rounded-lg p-6 text-center bg-muted/30">
          <ImageIcon className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground mb-4">
            Gere uma imagem com IA baseada no título do post
          </p>
        </div>
      )}

      <div className="space-y-2">
        <Input
          placeholder="Prompt personalizado (opcional)"
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          className="text-sm"
        />
        <p className="text-xs text-muted-foreground">
          Deixe vazio para usar o título do post como base
        </p>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={generateImage}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Gerando...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4 mr-2" />
            Gerar Imagem com IA
          </>
        )}
      </Button>
    </div>
  );
};

export default CoverImageGenerator;
