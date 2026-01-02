import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { useScheduledReports, CreateScheduledReportInput } from "@/hooks/useScheduledReports";
import { Calendar, Clock, Loader2, Mail, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const DAYS_OF_WEEK = [
  { value: 0, label: "Domingo" },
  { value: 1, label: "Segunda-feira" },
  { value: 2, label: "Terça-feira" },
  { value: 3, label: "Quarta-feira" },
  { value: 4, label: "Quinta-feira" },
  { value: 5, label: "Sexta-feira" },
  { value: 6, label: "Sábado" },
];

const HOURS = Array.from({ length: 24 }, (_, i) => ({
  value: i,
  label: `${i.toString().padStart(2, "0")}:00`,
}));

const SECTIONS = [
  { key: "funnel", label: "Funil de Conversão" },
  { key: "kpis", label: "Resumo de KPIs" },
  { key: "top_pages", label: "Top Páginas" },
  { key: "devices", label: "Dispositivos" },
];

const ScheduledReportsManager = () => {
  const { reports, isLoading, createReport, deleteReport, toggleEnabled } = useScheduledReports();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<CreateScheduledReportInput>({
    name: "",
    frequency: "weekly",
    day_of_week: 1,
    hour: 9,
    recipients: [],
    sections: ["funnel", "kpis", "top_pages"],
  });
  const [emailInput, setEmailInput] = useState("");

  const handleAddEmail = () => {
    const email = emailInput.trim().toLowerCase();
    if (email && email.includes("@") && !formData.recipients.includes(email)) {
      setFormData(prev => ({
        ...prev,
        recipients: [...prev.recipients, email],
      }));
      setEmailInput("");
    }
  };

  const handleRemoveEmail = (email: string) => {
    setFormData(prev => ({
      ...prev,
      recipients: prev.recipients.filter(e => e !== email),
    }));
  };

  const handleSectionToggle = (section: string) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.includes(section)
        ? prev.sections.filter(s => s !== section)
        : [...prev.sections, section],
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || formData.recipients.length === 0) return;
    
    await createReport.mutateAsync(formData);
    setIsDialogOpen(false);
    setFormData({
      name: "",
      frequency: "weekly",
      day_of_week: 1,
      hour: 9,
      recipients: [],
      sections: ["funnel", "kpis", "top_pages"],
    });
  };

  const getNextSendDate = (report: { day_of_week: number; hour: number }) => {
    const now = new Date();
    const dayDiff = (report.day_of_week - now.getDay() + 7) % 7;
    const nextDate = new Date(now);
    nextDate.setDate(now.getDate() + (dayDiff === 0 && now.getHours() >= report.hour ? 7 : dayDiff));
    nextDate.setHours(report.hour, 0, 0, 0);
    return format(nextDate, "dd/MM 'às' HH:mm", { locale: ptBR });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Relatórios Agendados
          </CardTitle>
          <CardDescription>
            Configure envio automático de relatórios por email
          </CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Novo Agendamento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Criar Relatório Agendado</DialogTitle>
              <DialogDescription>
                Configure um novo relatório para ser enviado automaticamente.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              {/* Nome */}
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Relatório</Label>
                <Input
                  id="name"
                  placeholder="Ex: Relatório Semanal de Vendas"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              {/* Frequência */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Dia da Semana</Label>
                  <Select
                    value={formData.day_of_week.toString()}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, day_of_week: parseInt(value) }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DAYS_OF_WEEK.map(day => (
                        <SelectItem key={day.value} value={day.value.toString()}>
                          {day.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Horário (UTC)</Label>
                  <Select
                    value={formData.hour.toString()}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, hour: parseInt(value) }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {HOURS.map(hour => (
                        <SelectItem key={hour.value} value={hour.value.toString()}>
                          {hour.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Destinatários */}
              <div className="space-y-2">
                <Label>Destinatários</Label>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="email@exemplo.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddEmail())}
                  />
                  <Button type="button" variant="outline" onClick={handleAddEmail}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.recipients.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.recipients.map(email => (
                      <span
                        key={email}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-sm"
                      >
                        <Mail className="h-3 w-3" />
                        {email}
                        <button
                          type="button"
                          onClick={() => handleRemoveEmail(email)}
                          className="ml-1 hover:text-destructive"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Seções */}
              <div className="space-y-2">
                <Label>Seções do Relatório</Label>
                <div className="space-y-2">
                  {SECTIONS.map(section => (
                    <div key={section.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={section.key}
                        checked={formData.sections.includes(section.key)}
                        onCheckedChange={() => handleSectionToggle(section.key)}
                      />
                      <Label htmlFor={section.key} className="cursor-pointer">
                        {section.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={!formData.name || formData.recipients.length === 0 || createReport.isPending}
              >
                {createReport.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : null}
                Criar Agendamento
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : reports && reports.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Agendamento</TableHead>
                <TableHead>Destinatários</TableHead>
                <TableHead>Próximo Envio</TableHead>
                <TableHead>Ativo</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map(report => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {DAYS_OF_WEEK.find(d => d.value === report.day_of_week)?.label.slice(0, 3)},{" "}
                      {HOURS.find(h => h.value === report.hour)?.label}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{report.recipients.length}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {getNextSendDate(report)}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={report.enabled}
                      onCheckedChange={(enabled) => toggleEnabled.mutate({ id: report.id, enabled })}
                    />
                  </TableCell>
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Excluir agendamento?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta ação não pode ser desfeita. O relatório "{report.name}" não será mais enviado.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteReport.mutate(report.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Nenhum relatório agendado</p>
            <p className="text-sm">Clique em "Novo Agendamento" para criar um.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ScheduledReportsManager;
