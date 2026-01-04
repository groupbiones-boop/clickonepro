import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import {
  FlaskConical,
  Plus,
  Play,
  Pause,
  Trophy,
  Trash2,
  BarChart3,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { useABTests, calculateStatisticalSignificance } from "@/hooks/use-ab-tests";
import { useLandingPages } from "@/hooks/use-landing-page";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const ABTestManager = () => {
  const navigate = useNavigate();
  const { tests, isLoading, createTest, startTest, pauseTest, completeTest, deleteTest } = useABTests();
  const { landingPages, fetchLandingPages } = useLandingPages();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newTestName, setNewTestName] = useState("");
  const [selectedLPId, setSelectedLPId] = useState<string>("");
  const [isCreating, setIsCreating] = useState(false);

  // Fetch LPs on mount
  useState(() => {
    fetchLandingPages();
  });

  const handleCreateTest = async () => {
    if (!newTestName || !selectedLPId) return;

    setIsCreating(true);
    const selectedLP = landingPages.find((lp) => lp.id === selectedLPId);
    if (!selectedLP) return;

    const result = await createTest(newTestName, selectedLPId, selectedLP.content);

    if (result) {
      setIsCreateDialogOpen(false);
      setNewTestName("");
      setSelectedLPId("");
    }
    setIsCreating(false);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      draft: { label: "Rascunho", variant: "secondary" },
      active: { label: "Ativo", variant: "default" },
      paused: { label: "Pausado", variant: "outline" },
      completed: { label: "Concluído", variant: "destructive" },
    };
    const config = variants[status] || variants.draft;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getTestStats = (test: typeof tests[0]) => {
    const rateA = test.variant_a_views > 0 ? (test.variant_a_conversions / test.variant_a_views) * 100 : 0;
    const rateB = test.variant_b_views > 0 ? (test.variant_b_conversions / test.variant_b_views) * 100 : 0;
    const stats = calculateStatisticalSignificance(
      test.variant_a_views,
      test.variant_a_conversions,
      test.variant_b_views,
      test.variant_b_conversions
    );
    return { rateA, rateB, ...stats };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Testes A/B</h2>
          <p className="text-muted-foreground">
            Crie e gerencie testes A/B para suas Landing Pages
          </p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Teste
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Teste A/B</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Nome do Teste</Label>
                <Input
                  placeholder="Ex: Teste Hero CTA"
                  value={newTestName}
                  onChange={(e) => setNewTestName(e.target.value)}
                />
              </div>
              <div>
                <Label>Landing Page</Label>
                <Select value={selectedLPId} onValueChange={setSelectedLPId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma LP" />
                  </SelectTrigger>
                  <SelectContent>
                    {landingPages
                      .filter((lp) => lp.status === "published")
                      .map((lp) => (
                        <SelectItem key={lp.id} value={lp.id}>
                          {lp.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                className="w-full"
                onClick={handleCreateTest}
                disabled={!newTestName || !selectedLPId || isCreating}
              >
                {isCreating ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <FlaskConical className="h-4 w-4 mr-2" />
                )}
                Criar Teste
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tests List */}
      {tests.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FlaskConical className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum teste criado</h3>
            <p className="text-muted-foreground text-center mb-4">
              Crie seu primeiro teste A/B para otimizar suas conversões
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Primeiro Teste
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {tests.map((test) => {
            const stats = getTestStats(test);
            const lpName = landingPages.find((lp) => lp.id === test.landing_page_id)?.name;

            return (
              <Card key={test.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {test.name}
                        {getStatusBadge(test.status)}
                        {test.winner && (
                          <Badge className="bg-amber-500">
                            <Trophy className="h-3 w-3 mr-1" />
                            Variante {test.winner} Venceu
                          </Badge>
                        )}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        LP: {lpName || "Desconhecida"} • Criado em{" "}
                        {format(new Date(test.created_at), "dd/MM/yyyy", { locale: ptBR })}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {test.status === "draft" && (
                        <Button size="sm" onClick={() => startTest(test.id)}>
                          <Play className="h-4 w-4 mr-1" />
                          Iniciar
                        </Button>
                      )}
                      {test.status === "active" && (
                        <Button size="sm" variant="outline" onClick={() => pauseTest(test.id)}>
                          <Pause className="h-4 w-4 mr-1" />
                          Pausar
                        </Button>
                      )}
                      {test.status === "paused" && (
                        <Button size="sm" onClick={() => startTest(test.id)}>
                          <Play className="h-4 w-4 mr-1" />
                          Retomar
                        </Button>
                      )}
                      {(test.status === "active" || test.status === "paused") && stats.winner && (
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => completeTest(test.id, stats.winner!)}
                        >
                          <Trophy className="h-4 w-4 mr-1" />
                          Declarar Vencedor
                        </Button>
                      )}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="ghost" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Excluir teste?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Todos os dados do teste serão perdidos. Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-destructive text-destructive-foreground"
                              onClick={() => deleteTest(test.id)}
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Variant A */}
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Variante A</span>
                        <span className="text-sm text-muted-foreground">Original</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Views:</span>
                          <span className="font-medium">{test.variant_a_views.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Conversões:</span>
                          <span className="font-medium">{test.variant_a_conversions.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Taxa:</span>
                          <span className="font-bold text-primary">{stats.rateA.toFixed(2)}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Variant B */}
                    <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Variante B</span>
                        <span className="text-sm text-primary">Modificada</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Views:</span>
                          <span className="font-medium">{test.variant_b_views.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Conversões:</span>
                          <span className="font-medium">{test.variant_b_conversions.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Taxa:</span>
                          <span className="font-bold text-primary">{stats.rateB.toFixed(2)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Confidence Level */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Confiança Estatística</span>
                      <span className="font-medium">
                        {stats.confidence.toFixed(1)}%
                        {stats.confidence >= 95 && " ✓"}
                      </span>
                    </div>
                    <Progress value={stats.confidence} className="h-2" />
                    {stats.improvement !== 0 && (
                      <p className="text-sm text-muted-foreground">
                        {stats.improvement > 0 ? (
                          <span className="text-green-600">
                            Variante B está +{stats.improvement.toFixed(1)}% melhor
                          </span>
                        ) : (
                          <span className="text-red-600">
                            Variante B está {stats.improvement.toFixed(1)}% pior
                          </span>
                        )}
                      </p>
                    )}
                    {stats.confidence < 95 && test.variant_a_views + test.variant_b_views > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Recomendado: mínimo 95% de confiança para declarar um vencedor
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ABTestManager;
