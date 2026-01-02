import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Trash2, Bell, TrendingUp, Users, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface AlertRule {
  id: string;
  name: string;
  type: string;
  condition: {
    metric: string;
    threshold: number;
    period: string;
    comparison: string;
  };
  enabled: boolean;
  created_at: string;
}

const metricOptions = [
  { value: "pageviews", label: "Pageviews" },
  { value: "visitors", label: "Unique Visitors" },
  { value: "leads", label: "New Leads" },
  { value: "bounce_rate", label: "Bounce Rate" },
];

const periodOptions = [
  { value: "1h", label: "1 Hour" },
  { value: "24h", label: "24 Hours" },
  { value: "7d", label: "7 Days" },
  { value: "30d", label: "30 Days" },
];

const comparisonOptions = [
  { value: "above", label: "Above" },
  { value: "below", label: "Below" },
  { value: "increase_by", label: "Increase by %" },
  { value: "decrease_by", label: "Decrease by %" },
];

const AlertsTab = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newRule, setNewRule] = useState({
    name: "",
    metric: "pageviews",
    threshold: 100,
    period: "1h",
    comparison: "above",
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: alertRules, isLoading } = useQuery({
    queryKey: ["alertRules"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("alert_rules")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as AlertRule[];
    },
  });

  const createRuleMutation = useMutation({
    mutationFn: async (rule: typeof newRule) => {
      const { data, error } = await supabase.from("alert_rules").insert([
        {
          name: rule.name,
          type: "threshold",
          condition: {
            metric: rule.metric,
            threshold: rule.threshold,
            period: rule.period,
            comparison: rule.comparison,
          },
          enabled: true,
        },
      ]);

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alertRules"] });
      setIsDialogOpen(false);
      setNewRule({
        name: "",
        metric: "pageviews",
        threshold: 100,
        period: "1h",
        comparison: "above",
      });
      toast({
        title: "Alert rule created",
        description: "You will be notified when the condition is met.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const toggleRuleMutation = useMutation({
    mutationFn: async ({ id, enabled }: { id: string; enabled: boolean }) => {
      const { error } = await supabase
        .from("alert_rules")
        .update({ enabled })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alertRules"] });
    },
  });

  const deleteRuleMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("alert_rules").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alertRules"] });
      toast({
        title: "Alert rule deleted",
      });
    },
  });

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case "pageviews":
        return TrendingUp;
      case "visitors":
        return Users;
      case "leads":
        return Bell;
      default:
        return AlertTriangle;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Alert Rules</h2>
          <p className="text-muted-foreground">
            Configure alerts to be notified of important events
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Alert
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Alert Rule</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Rule Name</Label>
                <Input
                  id="name"
                  value={newRule.name}
                  onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                  placeholder="e.g., High Traffic Alert"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Metric</Label>
                  <Select
                    value={newRule.metric}
                    onValueChange={(value) => setNewRule({ ...newRule, metric: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {metricOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Comparison</Label>
                  <Select
                    value={newRule.comparison}
                    onValueChange={(value) => setNewRule({ ...newRule, comparison: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {comparisonOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="threshold">Threshold</Label>
                  <Input
                    id="threshold"
                    type="number"
                    value={newRule.threshold}
                    onChange={(e) =>
                      setNewRule({ ...newRule, threshold: parseInt(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Time Period</Label>
                  <Select
                    value={newRule.period}
                    onValueChange={(value) => setNewRule({ ...newRule, period: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {periodOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                onClick={() => createRuleMutation.mutate(newRule)}
                className="w-full"
                disabled={!newRule.name || createRuleMutation.isPending}
              >
                Create Alert
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Rules</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : alertRules?.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No alert rules configured yet
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Enabled</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alertRules?.map((rule) => {
                  const Icon = getMetricIcon(rule.condition.metric);
                  return (
                    <TableRow key={rule.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          {rule.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        {rule.condition.metric} {rule.condition.comparison}{" "}
                        {rule.condition.threshold}
                      </TableCell>
                      <TableCell>{rule.condition.period}</TableCell>
                      <TableCell>
                        <Switch
                          checked={rule.enabled}
                          onCheckedChange={(checked) =>
                            toggleRuleMutation.mutate({ id: rule.id, enabled: checked })
                          }
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteRuleMutation.mutate(rule.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AlertsTab;
