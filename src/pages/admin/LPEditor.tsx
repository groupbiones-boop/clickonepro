import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useLandingPage, LPContent, LPImages } from "@/hooks/use-landing-page";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { Json } from "@/integrations/supabase/types";
import {
  ArrowLeft,
  Save,
  Loader2,
  Eye,
  Sparkles,
  Check,
  Globe,
  Smartphone,
  Monitor,
  Plus,
  Trash2,
  GripVertical
} from "lucide-react";
import { SortableList } from "@/components/admin/SortableList";

const SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "hook", label: "Hook" },
  { id: "dayInLife", label: "Dia a Dia" },
  { id: "problem", label: "Problema" },
  { id: "whyHappens", label: "Por Quê" },
  { id: "solution", label: "Solução" },
  { id: "howItWorks", label: "Como Funciona" },
  { id: "whatChanges", label: "O Que Muda" },
  { id: "whoItsFor", label: "Para Quem" },
  { id: "aboutCompany", label: "Sobre" },
  { id: "industries", label: "Setores" },
  { id: "finalCta", label: "CTA Final" },
];

const isValidUUID = (str: string) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
};

const LPEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Validate UUID and redirect if invalid
  useEffect(() => {
    if (id && !isValidUUID(id)) {
      toast({
        variant: "destructive",
        title: "ID inválido",
        description: "O ID da LP não é válido. Redirecionando para a lista..."
      });
      navigate("/admin/lp-builder");
    }
  }, [id, navigate]);

  const { landingPage, setLandingPage, isLoading } = useLandingPage(id);
  
  const [content, setContent] = useState<LPContent | null>(null);
  const [images, setImages] = useState<LPImages>({});
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [activeSection, setActiveSection] = useState("hero");
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const [isGeneratingImage, setIsGeneratingImage] = useState<string | null>(null);

  // Initialize state from landingPage
  useEffect(() => {
    if (landingPage) {
      setContent(landingPage.content);
      setImages(landingPage.images || {});
      setName(landingPage.name);
      setSlug(landingPage.slug);
      setStatus(landingPage.status);
    }
  }, [landingPage]);

  // Track changes
  useEffect(() => {
    if (landingPage && content) {
      const hasContentChanges = JSON.stringify(content) !== JSON.stringify(landingPage.content);
      const hasImageChanges = JSON.stringify(images) !== JSON.stringify(landingPage.images);
      const hasMetaChanges = name !== landingPage.name || slug !== landingPage.slug || status !== landingPage.status;
      setHasChanges(hasContentChanges || hasImageChanges || hasMetaChanges);
    }
  }, [content, images, name, slug, status, landingPage]);

  const updateContent = useCallback((section: keyof LPContent, field: string, value: unknown) => {
    setContent(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      };
    });
  }, []);

  const updateArrayItem = useCallback((section: keyof LPContent, arrayField: string, index: number, field: string, value: string) => {
    setContent(prev => {
      if (!prev) return prev;
      const sectionData = prev[section] as Record<string, unknown>;
      const array = [...(sectionData[arrayField] as Array<Record<string, string>>)];
      array[index] = { ...array[index], [field]: value };
      return {
        ...prev,
        [section]: {
          ...sectionData,
          [arrayField]: array
        }
      };
    });
  }, []);

  const addArrayItem = useCallback((section: keyof LPContent, arrayField: string, defaultItem: Record<string, string>) => {
    setContent(prev => {
      if (!prev) return prev;
      const sectionData = prev[section] as Record<string, unknown>;
      const array = [...(sectionData[arrayField] as Array<Record<string, string>>), defaultItem];
      return {
        ...prev,
        [section]: {
          ...sectionData,
          [arrayField]: array
        }
      };
    });
  }, []);

  const removeArrayItem = useCallback((section: keyof LPContent, arrayField: string, index: number) => {
    setContent(prev => {
      if (!prev) return prev;
      const sectionData = prev[section] as Record<string, unknown>;
      const array = [...(sectionData[arrayField] as Array<Record<string, string>>)];
      if (array.length <= 1) return prev; // Keep at least one item
      array.splice(index, 1);
      return {
        ...prev,
        [section]: {
          ...sectionData,
          [arrayField]: array
        }
      };
    });
  }, []);

  const reorderArrayItem = useCallback((section: keyof LPContent, arrayField: string, oldIndex: number, newIndex: number) => {
    setContent(prev => {
      if (!prev) return prev;
      const sectionData = prev[section] as Record<string, unknown>;
      const array = [...(sectionData[arrayField] as Array<Record<string, string>>)];
      const [movedItem] = array.splice(oldIndex, 1);
      array.splice(newIndex, 0, movedItem);
      return {
        ...prev,
        [section]: {
          ...sectionData,
          [arrayField]: array
        }
      };
    });
  }, []);

  const handleSave = async () => {
    if (!id || !content) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("landing_pages")
        .update({
          name,
          slug,
          content: content as unknown as Json,
          images: images as unknown as Json,
          status
        })
        .eq("id", id);

      if (error) throw error;

      // Update local state to reflect saved data
      if (landingPage) {
        setLandingPage({
          ...landingPage,
          name,
          slug,
          content,
          images,
          status
        });
      }
      
      setHasChanges(false);
      toast({
        title: "Salvo!",
        description: "Suas alterações foram salvas."
      });
    } catch (error) {
      console.error("Error saving:", error);
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Tente novamente."
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    setStatus("published");
    // Trigger save after status change
    setTimeout(handleSave, 100);
  };

  const generateImage = async (sectionId: string) => {
    setIsGeneratingImage(sectionId);
    
    try {
      const { data, error } = await supabase.functions.invoke("generate-lp-images", {
        body: { section: sectionId }
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setImages(prev => ({
        ...prev,
        [sectionId]: data.url + `?t=${Date.now()}`
      }));

      toast({
        title: "Imagem gerada!",
        description: "A imagem foi adicionada à seção."
      });
    } catch (error) {
      console.error("Error generating image:", error);
      toast({
        variant: "destructive",
        title: "Erro ao gerar imagem",
        description: error instanceof Error ? error.message : "Tente novamente."
      });
    } finally {
      setIsGeneratingImage(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!landingPage || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">LP não encontrada</h2>
          <Button onClick={() => navigate("/admin/lp-builder")}>
            Voltar para LPs
          </Button>
        </div>
      </div>
    );
  }

  const renderSectionEditor = () => {
    switch (activeSection) {
      case "hero":
        return (
          <div className="space-y-4">
            <div>
              <Label>Badge</Label>
              <Input
                value={content.hero.badge}
                onChange={(e) => updateContent("hero", "badge", e.target.value)}
              />
            </div>
            <div>
              <Label>Título</Label>
              <Textarea
                value={content.hero.title}
                onChange={(e) => updateContent("hero", "title", e.target.value)}
                className="min-h-[80px]"
              />
            </div>
            <div>
              <Label>Subtítulo</Label>
              <Textarea
                value={content.hero.subtitle}
                onChange={(e) => updateContent("hero", "subtitle", e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <div>
              <Label>Texto do CTA</Label>
              <Input
                value={content.hero.cta}
                onChange={(e) => updateContent("hero", "cta", e.target.value)}
              />
            </div>
          </div>
        );

      case "hook":
        return (
          <div className="space-y-4">
            <div>
              <Label>Título</Label>
              <Textarea
                value={content.hook.title}
                onChange={(e) => updateContent("hook", "title", e.target.value)}
              />
            </div>
            <div>
              <Label>Texto</Label>
              <Textarea
                value={content.hook.text}
                onChange={(e) => updateContent("hook", "text", e.target.value)}
                className="min-h-[120px]"
              />
            </div>
          </div>
        );

      case "dayInLife":
        return (
          <div className="space-y-4">
            <div>
              <Label>Título</Label>
              <Input
                value={content.dayInLife.title}
                onChange={(e) => updateContent("dayInLife", "title", e.target.value)}
              />
            </div>
            <div>
              <Label>Timeline</Label>
              <SortableList
                items={content.dayInLife.items}
                getItemId={(_, i) => `dayinlife-${i}`}
                onReorder={(oldIndex, newIndex) => reorderArrayItem("dayInLife", "items", oldIndex, newIndex)}
                renderItem={(item, index) => (
                  <div className="flex gap-2 items-center bg-muted/50 p-2 rounded-lg">
                    <Input
                      value={item.time}
                      onChange={(e) => updateArrayItem("dayInLife", "items", index, "time", e.target.value)}
                      className="w-24"
                      placeholder="Hora"
                    />
                    <Input
                      value={item.text}
                      onChange={(e) => updateArrayItem("dayInLife", "items", index, "text", e.target.value)}
                      placeholder="Descrição"
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive shrink-0"
                      onClick={() => removeArrayItem("dayInLife", "items", index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              />
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => addArrayItem("dayInLife", "items", { time: "", text: "" })}
              >
                <Plus className="h-4 w-4 mr-1" /> Adicionar Item
              </Button>
            </div>
            <div>
              <Label>Conclusão</Label>
              <Textarea
                value={content.dayInLife.conclusion}
                onChange={(e) => updateContent("dayInLife", "conclusion", e.target.value)}
              />
            </div>
          </div>
        );

      case "problem":
        return (
          <div className="space-y-4">
            <div>
              <Label>Título</Label>
              <Input
                value={content.problem.title}
                onChange={(e) => updateContent("problem", "title", e.target.value)}
              />
            </div>
            <div>
              <Label>Estatísticas</Label>
              <SortableList
                items={content.problem.stats}
                getItemId={(_, i) => `stat-${i}`}
                onReorder={(oldIndex, newIndex) => reorderArrayItem("problem", "stats", oldIndex, newIndex)}
                renderItem={(stat, index) => (
                  <div className="flex gap-2 items-center bg-muted/50 p-2 rounded-lg">
                    <Input
                      value={stat.value}
                      onChange={(e) => updateArrayItem("problem", "stats", index, "value", e.target.value)}
                      className="w-32"
                      placeholder="Valor"
                    />
                    <Input
                      value={stat.label}
                      onChange={(e) => updateArrayItem("problem", "stats", index, "label", e.target.value)}
                      placeholder="Label"
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive shrink-0"
                      onClick={() => removeArrayItem("problem", "stats", index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              />
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => addArrayItem("problem", "stats", { value: "", label: "" })}
              >
                <Plus className="h-4 w-4 mr-1" /> Adicionar Stat
              </Button>
            </div>
            <div>
              <Label>Texto de Suporte</Label>
              <Textarea
                value={content.problem.support}
                onChange={(e) => updateContent("problem", "support", e.target.value)}
              />
            </div>
            <div>
              <Label>Texto do CTA</Label>
              <Input
                value={content.problem.cta}
                onChange={(e) => updateContent("problem", "cta", e.target.value)}
              />
            </div>
          </div>
        );

      case "solution":
        return (
          <div className="space-y-4">
            <div>
              <Label>Título</Label>
              <Input
                value={content.solution.title}
                onChange={(e) => updateContent("solution", "title", e.target.value)}
              />
            </div>
            <div>
              <Label>Subtítulo</Label>
              <Textarea
                value={content.solution.subtitle}
                onChange={(e) => updateContent("solution", "subtitle", e.target.value)}
              />
            </div>
            <div>
              <Label>Features</Label>
              <SortableList
                items={content.solution.features}
                getItemId={(_, i) => `feature-${i}`}
                onReorder={(oldIndex, newIndex) => reorderArrayItem("solution", "features", oldIndex, newIndex)}
                renderItem={(feature, index) => (
                  <div className="space-y-1 p-3 bg-muted/50 rounded-lg relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 text-destructive"
                      onClick={() => removeArrayItem("solution", "features", index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Input
                      value={feature.title}
                      onChange={(e) => updateArrayItem("solution", "features", index, "title", e.target.value)}
                      placeholder="Título"
                    />
                    <Input
                      value={feature.text}
                      onChange={(e) => updateArrayItem("solution", "features", index, "text", e.target.value)}
                      placeholder="Descrição"
                    />
                  </div>
                )}
              />
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => addArrayItem("solution", "features", { title: "", text: "" })}
              >
                <Plus className="h-4 w-4 mr-1" /> Adicionar Feature
              </Button>
            </div>
          </div>
        );

      case "howItWorks":
        return (
          <div className="space-y-4">
            <div>
              <Label>Título</Label>
              <Input
                value={content.howItWorks.title}
                onChange={(e) => updateContent("howItWorks", "title", e.target.value)}
              />
            </div>
            <div>
              <Label>Passos</Label>
              <SortableList
                items={content.howItWorks.steps}
                getItemId={(_, i) => `step-${i}`}
                onReorder={(oldIndex, newIndex) => reorderArrayItem("howItWorks", "steps", oldIndex, newIndex)}
                renderItem={(step, index) => (
                  <div className="space-y-1 p-3 bg-muted/50 rounded-lg relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 text-destructive"
                      onClick={() => removeArrayItem("howItWorks", "steps", index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <Input
                        value={step.title}
                        onChange={(e) => updateArrayItem("howItWorks", "steps", index, "title", e.target.value)}
                        placeholder="Título"
                      />
                    </div>
                    <Input
                      value={step.text}
                      onChange={(e) => updateArrayItem("howItWorks", "steps", index, "text", e.target.value)}
                      placeholder="Descrição"
                      className="ml-8"
                    />
                  </div>
                )}
              />
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => addArrayItem("howItWorks", "steps", { title: "", text: "" })}
              >
                <Plus className="h-4 w-4 mr-1" /> Adicionar Passo
              </Button>
            </div>
            <div>
              <Label>Texto do CTA</Label>
              <Input
                value={content.howItWorks.cta}
                onChange={(e) => updateContent("howItWorks", "cta", e.target.value)}
              />
            </div>
          </div>
        );

      case "finalCta":
        return (
          <div className="space-y-4">
            <div>
              <Label>Título</Label>
              <Textarea
                value={content.finalCta.title}
                onChange={(e) => updateContent("finalCta", "title", e.target.value)}
              />
            </div>
            <div>
              <Label>Texto</Label>
              <Textarea
                value={content.finalCta.text}
                onChange={(e) => updateContent("finalCta", "text", e.target.value)}
              />
            </div>
            <div>
              <Label>Pilares</Label>
              <SortableList
                items={content.finalCta.pillars}
                getItemId={(_, i) => `pillar-${i}`}
                onReorder={(oldIndex, newIndex) => reorderArrayItem("finalCta", "pillars", oldIndex, newIndex)}
                renderItem={(pillar, index) => (
                  <div className="space-y-1 p-3 bg-muted/50 rounded-lg relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 text-destructive"
                      onClick={() => removeArrayItem("finalCta", "pillars", index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Input
                      value={pillar.title}
                      onChange={(e) => updateArrayItem("finalCta", "pillars", index, "title", e.target.value)}
                      placeholder="Título"
                    />
                    <Input
                      value={pillar.text}
                      onChange={(e) => updateArrayItem("finalCta", "pillars", index, "text", e.target.value)}
                      placeholder="Descrição"
                    />
                  </div>
                )}
              />
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => addArrayItem("finalCta", "pillars", { title: "", text: "" })}
              >
                <Plus className="h-4 w-4 mr-1" /> Adicionar Pilar
              </Button>
            </div>
            <div>
              <Label>Texto do Botão</Label>
              <Input
                value={content.finalCta.cta}
                onChange={(e) => updateContent("finalCta", "cta", e.target.value)}
              />
            </div>
            <div>
              <Label>Texto de Suporte</Label>
              <Input
                value={content.finalCta.support}
                onChange={(e) => updateContent("finalCta", "support", e.target.value)}
              />
            </div>
          </div>
        );

      case "whyHappens":
        return (
          <div className="space-y-4">
            <div>
              <Label>Título</Label>
              <Input
                value={content.whyHappens.title}
                onChange={(e) => updateContent("whyHappens", "title", e.target.value)}
              />
            </div>
            <div>
              <Label>Subtítulo</Label>
              <Textarea
                value={content.whyHappens.subtitle}
                onChange={(e) => updateContent("whyHappens", "subtitle", e.target.value)}
              />
            </div>
            <div>
              <Label>Cards de Razões</Label>
              <SortableList
                items={content.whyHappens.cards}
                getItemId={(_, i) => `card-${i}`}
                onReorder={(oldIndex, newIndex) => reorderArrayItem("whyHappens", "cards", oldIndex, newIndex)}
                renderItem={(card, index) => (
                  <div className="space-y-1 p-3 bg-muted/50 rounded-lg relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 text-destructive"
                      onClick={() => removeArrayItem("whyHappens", "cards", index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Input
                      value={card.title}
                      onChange={(e) => updateArrayItem("whyHappens", "cards", index, "title", e.target.value)}
                      placeholder="Título"
                    />
                    <Input
                      value={card.text}
                      onChange={(e) => updateArrayItem("whyHappens", "cards", index, "text", e.target.value)}
                      placeholder="Descrição"
                    />
                  </div>
                )}
              />
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => addArrayItem("whyHappens", "cards", { title: "", text: "" })}
              >
                <Plus className="h-4 w-4 mr-1" /> Adicionar Card
              </Button>
            </div>
          </div>
        );

      case "whatChanges":
        return (
          <div className="space-y-4">
            <div>
              <Label>Título</Label>
              <Input
                value={content.whatChanges.title}
                onChange={(e) => updateContent("whatChanges", "title", e.target.value)}
              />
            </div>
            <div>
              <Label>Benefícios</Label>
              <SortableList
                items={content.whatChanges.benefits}
                getItemId={(_, i) => `benefit-${i}`}
                onReorder={(oldIndex, newIndex) => reorderArrayItem("whatChanges", "benefits", oldIndex, newIndex)}
                renderItem={(benefit, index) => (
                  <div className="space-y-1 p-3 bg-muted/50 rounded-lg relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 text-destructive"
                      onClick={() => removeArrayItem("whatChanges", "benefits", index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Input
                      value={benefit.title}
                      onChange={(e) => updateArrayItem("whatChanges", "benefits", index, "title", e.target.value)}
                      placeholder="Título"
                    />
                    <Input
                      value={benefit.text}
                      onChange={(e) => updateArrayItem("whatChanges", "benefits", index, "text", e.target.value)}
                      placeholder="Descrição"
                    />
                  </div>
                )}
              />
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => addArrayItem("whatChanges", "benefits", { title: "", text: "" })}
              >
                <Plus className="h-4 w-4 mr-1" /> Adicionar Benefício
              </Button>
            </div>
          </div>
        );

      case "whoItsFor":
        return (
          <div className="space-y-4">
            <div>
              <Label>Título</Label>
              <Input
                value={content.whoItsFor.title}
                onChange={(e) => updateContent("whoItsFor", "title", e.target.value)}
              />
            </div>
            <div>
              <Label>Subtítulo</Label>
              <Textarea
                value={content.whoItsFor.subtitle}
                onChange={(e) => updateContent("whoItsFor", "subtitle", e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
        );

      case "aboutCompany":
        return (
          <div className="space-y-4">
            <div>
              <Label>Tagline</Label>
              <Input
                value={content.aboutCompany.tagline}
                onChange={(e) => updateContent("aboutCompany", "tagline", e.target.value)}
              />
            </div>
            <div>
              <Label>Headline</Label>
              <Input
                value={content.aboutCompany.headline}
                onChange={(e) => updateContent("aboutCompany", "headline", e.target.value)}
              />
            </div>
            <div>
              <Label>Badge</Label>
              <Input
                value={content.aboutCompany.badge}
                onChange={(e) => updateContent("aboutCompany", "badge", e.target.value)}
              />
            </div>
            <div>
              <Label>Diferenciais</Label>
              <SortableList
                items={content.aboutCompany.differentiators}
                getItemId={(_, i) => `diff-${i}`}
                onReorder={(oldIndex, newIndex) => reorderArrayItem("aboutCompany", "differentiators", oldIndex, newIndex)}
                renderItem={(diff, index) => (
                  <div className="space-y-1 p-3 bg-muted/50 rounded-lg relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 text-destructive"
                      onClick={() => removeArrayItem("aboutCompany", "differentiators", index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Input
                      value={diff.title}
                      onChange={(e) => updateArrayItem("aboutCompany", "differentiators", index, "title", e.target.value)}
                      placeholder="Título (ex: +500 empresas)"
                    />
                    <Input
                      value={diff.text}
                      onChange={(e) => updateArrayItem("aboutCompany", "differentiators", index, "text", e.target.value)}
                      placeholder="Descrição"
                    />
                  </div>
                )}
              />
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => addArrayItem("aboutCompany", "differentiators", { title: "", text: "" })}
              >
                <Plus className="h-4 w-4 mr-1" /> Adicionar Diferencial
              </Button>
            </div>
          </div>
        );

      case "industries":
        return (
          <div className="space-y-4">
            <div>
              <Label>Título da Seção</Label>
              <Input
                value={content.industries?.title || ""}
                onChange={(e) => updateContent("industries", "title", e.target.value)}
              />
            </div>
            <div>
              <Label>Subtítulo</Label>
              <Textarea
                value={content.industries?.subtitle || ""}
                onChange={(e) => updateContent("industries", "subtitle", e.target.value)}
              />
            </div>
            <div>
              <Label>Setores</Label>
              <SortableList
                items={content.industries?.items || []}
                getItemId={(_, i) => `industry-${i}`}
                onReorder={(oldIndex, newIndex) => reorderArrayItem("industries", "items", oldIndex, newIndex)}
                renderItem={(item, index) => (
                  <div className="space-y-1 p-3 bg-muted/50 rounded-lg relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 text-destructive"
                      onClick={() => removeArrayItem("industries", "items", index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Input
                      value={item.name}
                      onChange={(e) => updateArrayItem("industries", "items", index, "name", e.target.value)}
                      placeholder="Nome do setor"
                    />
                    <Input
                      value={item.slug}
                      onChange={(e) => updateArrayItem("industries", "items", index, "slug", e.target.value)}
                      placeholder="Slug (ex: encanamento)"
                    />
                    <Input
                      value={item.image || ""}
                      onChange={(e) => updateArrayItem("industries", "items", index, "image", e.target.value)}
                      placeholder="URL da imagem (opcional)"
                    />
                  </div>
                )}
              />
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => addArrayItem("industries", "items", { name: "", slug: "", image: "" })}
              >
                <Plus className="h-4 w-4 mr-1" /> Adicionar Setor
              </Button>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center text-muted-foreground py-10">
            Editor para "{activeSection}" em desenvolvimento.
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-background">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/admin/lp-builder")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div className="flex items-center gap-2">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="font-semibold h-8 w-48"
            />
            <Badge variant={status === "published" ? "default" : "secondary"}>
              {status === "published" ? "Publicada" : "Rascunho"}
            </Badge>
            {hasChanges && (
              <Badge variant="outline" className="text-orange-500 border-orange-500">
                Alterações não salvas
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {status === "published" && (
            <Button variant="outline" size="sm" onClick={() => window.open(`/lp/${slug}`, "_blank")}>
              <Eye className="h-4 w-4 mr-2" />
              Ver LP
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={handleSave} disabled={isSaving || !hasChanges}>
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </>
            )}
          </Button>
          {status === "draft" && (
            <Button size="sm" onClick={handlePublish} disabled={isSaving}>
              <Globe className="h-4 w-4 mr-2" />
              Publicar
            </Button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Editor Panel */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full flex flex-col">
            {/* Section Tabs */}
            <div className="border-b px-4 py-2 overflow-x-auto">
              <div className="flex gap-1">
                {SECTIONS.map((section) => (
                  <Button
                    key={section.id}
                    variant={activeSection === section.id ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setActiveSection(section.id)}
                    className="whitespace-nowrap text-xs"
                  >
                    {section.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Section Content */}
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-6">
                {/* Meta Info */}
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Configurações da Seção</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Label className="w-20">Slug:</Label>
                      <Input
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="h-8 text-sm"
                      />
                    </div>
                    
                    {/* Image Generation */}
                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <p className="text-sm font-medium">Imagem da Seção</p>
                        <p className="text-xs text-muted-foreground">
                          {images[activeSection as keyof LPImages] ? "Imagem configurada" : "Sem imagem"}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => generateImage(activeSection)}
                        disabled={isGeneratingImage === activeSection}
                      >
                        {isGeneratingImage === activeSection ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4 mr-1" />
                            Gerar Imagem
                          </>
                        )}
                      </Button>
                    </div>
                    
                    {images[activeSection as keyof LPImages] && (
                      <img
                        src={images[activeSection as keyof LPImages]}
                        alt="Preview"
                        className="w-full rounded-lg"
                      />
                    )}
                  </CardContent>
                </Card>

                {/* Section Editor */}
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">
                      {SECTIONS.find(s => s.id === activeSection)?.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderSectionEditor()}
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Preview Panel */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full flex flex-col bg-muted/30">
            {/* Preview Controls */}
            <div className="flex items-center justify-between px-4 py-2 border-b bg-background">
              <span className="text-sm font-medium">Preview</span>
              <div className="flex items-center gap-1">
                <Button
                  variant={previewDevice === "desktop" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setPreviewDevice("desktop")}
                >
                  <Monitor className="h-4 w-4" />
                </Button>
                <Button
                  variant={previewDevice === "mobile" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setPreviewDevice("mobile")}
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-auto p-4 flex justify-center">
              <div 
                className={`bg-background rounded-lg shadow-lg overflow-hidden transition-all ${
                  previewDevice === "mobile" ? "w-[375px]" : "w-full max-w-4xl"
                }`}
              >
                <ScrollArea className="h-full">
                  <div className="p-6">
                    {/* Hero Preview */}
                    <div className="mb-8 text-center">
                      <Badge variant="secondary" className="mb-4">
                        {content.hero.badge}
                      </Badge>
                      <h1 className="text-2xl md:text-3xl font-bold mb-4">
                        {content.hero.title}
                      </h1>
                      <p className="text-muted-foreground mb-6">
                        {content.hero.subtitle}
                      </p>
                      <Button>{content.hero.cta}</Button>
                      {images.hero && (
                        <img 
                          src={images.hero} 
                          alt="Hero" 
                          className="w-full rounded-xl mt-6"
                        />
                      )}
                    </div>

                    {/* Hook Preview */}
                    <div className="mb-8 p-6 bg-muted/30 rounded-xl text-center">
                      <h2 className="text-xl font-bold mb-3">{content.hook.title}</h2>
                      <p className="text-muted-foreground">{content.hook.text}</p>
                    </div>

                    {/* Problem Preview */}
                    <div className="mb-8">
                      <h2 className="text-xl font-bold mb-4 text-center">{content.problem.title}</h2>
                      <div className="grid grid-cols-3 gap-4">
                        {content.problem.stats.map((stat, i) => (
                          <Card key={i}>
                            <CardContent className="p-4 text-center">
                              <div className="text-2xl font-bold text-primary">{stat.value}</div>
                              <p className="text-xs text-muted-foreground">{stat.label}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Solution Preview */}
                    <div className="mb-8 p-6 bg-primary text-primary-foreground rounded-xl">
                      <h2 className="text-xl font-bold mb-2">{content.solution.title}</h2>
                      <p className="opacity-80 mb-4">{content.solution.subtitle}</p>
                      <div className="grid grid-cols-2 gap-3">
                        {content.solution.features.map((f, i) => (
                          <div key={i} className="p-3 bg-primary-foreground/10 rounded-lg">
                            <h3 className="font-semibold text-sm">{f.title}</h3>
                            <p className="text-xs opacity-80">{f.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* How It Works Preview */}
                    <div className="mb-8">
                      <h2 className="text-xl font-bold mb-4 text-center">{content.howItWorks.title}</h2>
                      <div className="space-y-4">
                        {content.howItWorks.steps.map((step, i) => (
                          <div key={i} className="flex gap-4 items-start">
                            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                              {i + 1}
                            </div>
                            <div>
                              <h3 className="font-semibold">{step.title}</h3>
                              <p className="text-sm text-muted-foreground">{step.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Final CTA Preview */}
                    <div className="p-6 bg-primary text-primary-foreground rounded-xl text-center">
                      <h2 className="text-xl font-bold mb-2">{content.finalCta.title}</h2>
                      <p className="opacity-80 mb-6">{content.finalCta.text}</p>
                      <Button variant="secondary" size="lg">
                        {content.finalCta.cta}
                      </Button>
                      <p className="text-sm opacity-70 mt-3">{content.finalCta.support}</p>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default LPEditor;
