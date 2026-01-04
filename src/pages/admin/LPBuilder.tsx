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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLandingPages } from "@/hooks/use-landing-page";
import {
  Plus,
  Loader2,
  FileText,
  MoreVertical,
  Pencil,
  Copy,
  Trash2,
  ExternalLink,
  RefreshCw,
  LayoutTemplate
} from "lucide-react";

const LPBuilder = () => {
  const navigate = useNavigate();
  const { 
    landingPages, 
    isLoading, 
    fetchLandingPages,
    createLandingPage, 
    deleteLandingPage, 
    duplicateLandingPage 
  } = useLandingPages();
  
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async () => {
    if (!newName || !newSlug) return;
    
    setIsCreating(true);
    const lp = await createLandingPage(newName, newSlug);
    setIsCreating(false);
    
    if (lp) {
      setIsCreateOpen(false);
      setNewName("");
      setNewSlug("");
      fetchLandingPages();
      navigate(`/admin/lp-builder/${lp.id}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta LP?")) {
      await deleteLandingPage(id);
      fetchLandingPages();
    }
  };

  const handleDuplicate = async (lp: typeof landingPages[0]) => {
    const newLp = await duplicateLandingPage(lp);
    if (newLp) {
      fetchLandingPages();
    }
  };

  // Auto-generate slug from name
  const handleNameChange = (name: string) => {
    setNewName(name);
    const slug = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    setNewSlug(slug);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              LP Builder
            </h1>
            <p className="text-muted-foreground">
              Crie e gerencie landing pages com editor visual e preview em tempo real.
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => fetchLandingPages()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar
            </Button>
            
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova LP
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar Nova Landing Page</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label htmlFor="name">Nome da LP</Label>
                    <Input
                      id="name"
                      placeholder="Ex: Promoção de Janeiro"
                      value={newName}
                      onChange={(e) => handleNameChange(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">Slug (URL)</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">/lp/</span>
                      <Input
                        id="slug"
                        placeholder="promocao-janeiro"
                        value={newSlug}
                        onChange={(e) => setNewSlug(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={handleCreate}
                    disabled={!newName || !newSlug || isCreating}
                  >
                    {isCreating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Criando...
                      </>
                    ) : (
                      <>
                        <LayoutTemplate className="h-4 w-4 mr-2" />
                        Criar LP
                      </>
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : landingPages.length === 0 ? (
          /* Empty State */
          <Card className="text-center py-20">
            <CardContent>
              <FileText className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhuma LP criada</h3>
              <p className="text-muted-foreground mb-6">
                Crie sua primeira landing page para começar.
              </p>
              <Button onClick={() => setIsCreateOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Criar Primeira LP
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* LP Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {landingPages.map((lp) => (
              <Card key={lp.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg truncate">{lp.name}</CardTitle>
                      <p className="text-sm text-muted-foreground truncate">
                        /lp/{lp.slug}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={lp.status === "published" ? "default" : "secondary"}>
                        {lp.status === "published" ? "Publicada" : "Rascunho"}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => navigate(`/admin/lp-builder/${lp.id}`)}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          {lp.status === "published" && (
                            <DropdownMenuItem onClick={() => window.open(`/lp/${lp.slug}`, "_blank")}>
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Visualizar
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => handleDuplicate(lp)}>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicar
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(lp.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                    {lp.images?.hero ? (
                      <img
                        src={lp.images.hero}
                        alt={lp.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FileText className="h-12 w-12 text-muted-foreground/30" />
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1" 
                      onClick={() => navigate(`/admin/lp-builder/${lp.id}`)}
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                    {lp.status === "published" && (
                      <Button 
                        variant="outline"
                        onClick={() => window.open(`/lp/${lp.slug}`, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 text-center">
                    Atualizado em {new Date(lp.updated_at).toLocaleDateString("pt-BR")}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LPBuilder;
