import { useState } from "react";
import { Plus, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  useCampaigns,
  useCreateCampaign,
  useUpdateCampaign,
  useDeleteCampaign,
  Campaign,
  CampaignFormData,
} from "@/hooks/use-campaigns";
import { CampaignCard } from "./CampaignCard";
import { CampaignDialog } from "./CampaignDialog";
import { CampaignDashboard } from "./CampaignDashboard";

interface CampaignsTabProps {
  filters: {
    startDate: Date;
    endDate: Date;
  };
}

export function CampaignsTab({ filters }: CampaignsTabProps) {
  const { data: campaigns, isLoading } = useCampaigns();
  const createCampaign = useCreateCampaign();
  const updateCampaign = useUpdateCampaign();
  const deleteCampaign = useDeleteCampaign();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [viewingCampaign, setViewingCampaign] = useState<Campaign | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleCreate = () => {
    setEditingCampaign(null);
    setDialogOpen(true);
  };

  const handleEdit = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setDialogOpen(true);
  };

  const handleSave = (data: CampaignFormData) => {
    if (editingCampaign) {
      updateCampaign.mutate(
        { id: editingCampaign.id, data },
        { onSuccess: () => setDialogOpen(false) }
      );
    } else {
      createCampaign.mutate(data, { onSuccess: () => setDialogOpen(false) });
    }
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteCampaign.mutate(deleteId, { onSuccess: () => setDeleteId(null) });
    }
  };

  // If viewing a specific campaign, show the dashboard
  if (viewingCampaign) {
    return (
      <CampaignDashboard
        campaign={viewingCampaign}
        onBack={() => setViewingCampaign(null)}
      />
    );
  }

  const activeCampaigns = campaigns?.filter((c) => c.status === "active") || [];
  const otherCampaigns = campaigns?.filter((c) => c.status !== "active") || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Target className="h-6 w-6" />
            Campanhas
          </h2>
          <p className="text-muted-foreground">
            Gerencie metas e acompanhe o desempenho das suas Landing Pages
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Campanha
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-[400px] rounded-lg bg-muted animate-pulse"
            />
          ))}
        </div>
      ) : campaigns?.length === 0 ? (
        <div className="text-center py-12 bg-muted/50 rounded-lg">
          <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Nenhuma campanha criada</h3>
          <p className="text-muted-foreground mb-4">
            Crie sua primeira campanha para definir metas e acompanhar resultados
          </p>
          <Button onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Criar Primeira Campanha
          </Button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Active Campaigns */}
          {activeCampaigns.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Campanhas Ativas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeCampaigns.map((campaign) => (
                  <CampaignCard
                    key={campaign.id}
                    campaign={campaign}
                    onEdit={handleEdit}
                    onDelete={setDeleteId}
                    onViewDetails={setViewingCampaign}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Other Campaigns */}
          {otherCampaigns.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-muted-foreground">
                Outras Campanhas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {otherCampaigns.map((campaign) => (
                  <CampaignCard
                    key={campaign.id}
                    campaign={campaign}
                    onEdit={handleEdit}
                    onDelete={setDeleteId}
                    onViewDetails={setViewingCampaign}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Create/Edit Dialog */}
      <CampaignDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        campaign={editingCampaign}
        onSave={handleSave}
        isLoading={createCampaign.isPending || updateCampaign.isPending}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Campanha</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta campanha? Esta ação não pode
              ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
