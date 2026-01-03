import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsCard from "./StatsCard";
import { Link, Share2, Search, Mail } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { AnalyticsFilters } from "@/hooks/useAnalytics";

interface AcquisitionTabProps {
  filters: AnalyticsFilters;
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

// Mock data
const trafficSourcesData = [
  { name: "Direto", value: 4500 },
  { name: "Busca Orgânica", value: 3200 },
  { name: "Social", value: 2100 },
  { name: "Referência", value: 1500 },
  { name: "E-mail", value: 800 },
];

const trafficTrendData = [
  { date: "1 Jan", direct: 150, organic: 120, social: 80 },
  { date: "2 Jan", direct: 180, organic: 130, social: 90 },
  { date: "3 Jan", direct: 200, organic: 150, social: 100 },
  { date: "4 Jan", direct: 170, organic: 140, social: 85 },
  { date: "5 Jan", direct: 220, organic: 160, social: 110 },
  { date: "6 Jan", direct: 250, organic: 180, social: 120 },
  { date: "7 Jan", direct: 230, organic: 170, social: 115 },
];

const utmCampaigns = [
  { source: "google", medium: "cpc", campaign: "brand_2024", visitors: 1234, conversions: 45 },
  { source: "facebook", medium: "paid", campaign: "retargeting", visitors: 890, conversions: 32 },
  { source: "linkedin", medium: "social", campaign: "b2b_awareness", visitors: 567, conversions: 18 },
  { source: "newsletter", medium: "email", campaign: "jan_promo", visitors: 432, conversions: 28 },
  { source: "partner", medium: "referral", campaign: "affiliate_q1", visitors: 321, conversions: 15 },
];

const AcquisitionTab = ({ filters }: AcquisitionTabProps) => {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
        <StatsCard
          title="Direto"
          value={4500}
          changePercent={15.2}
          icon={Link}
        />
        <StatsCard
          title="Busca Orgânica"
          value={3200}
          changePercent={22.8}
          icon={Search}
        />
        <StatsCard
          title="Social"
          value={2100}
          changePercent={-5.3}
          icon={Share2}
        />
        <StatsCard
          title="E-mail"
          value={800}
          changePercent={18.9}
          icon={Mail}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Traffic Sources Pie */}
        <Card>
          <CardHeader>
            <CardTitle>Fontes de Tráfego</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficSourcesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {trafficSourcesData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Traffic Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Tendência de Tráfego por Fonte</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficTrendData}>
                  <defs>
                    <linearGradient id="colorDirect" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorSocial" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="date" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="direct"
                    stroke="hsl(var(--chart-1))"
                    fill="url(#colorDirect)"
                    strokeWidth={2}
                    name="Direto"
                  />
                  <Area
                    type="monotone"
                    dataKey="organic"
                    stroke="hsl(var(--chart-2))"
                    fill="url(#colorOrganic)"
                    strokeWidth={2}
                    name="Orgânico"
                  />
                  <Area
                    type="monotone"
                    dataKey="social"
                    stroke="hsl(var(--chart-3))"
                    fill="url(#colorSocial)"
                    strokeWidth={2}
                    name="Social"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* UTM Campaigns Table */}
      <Card>
        <CardHeader>
          <CardTitle>Campanhas UTM</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fonte</TableHead>
                <TableHead>Meio</TableHead>
                <TableHead>Campanha</TableHead>
                <TableHead className="text-right">Visitantes</TableHead>
                <TableHead className="text-right">Conversões</TableHead>
                <TableHead className="text-right">Taxa de Conv.</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {utmCampaigns.map((campaign, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{campaign.source}</TableCell>
                  <TableCell>{campaign.medium}</TableCell>
                  <TableCell>{campaign.campaign}</TableCell>
                  <TableCell className="text-right">{campaign.visitors.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{campaign.conversions}</TableCell>
                  <TableCell className="text-right">
                    {((campaign.conversions / campaign.visitors) * 100).toFixed(1)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AcquisitionTab;
