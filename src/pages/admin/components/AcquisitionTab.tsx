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
  { name: "Direct", value: 4500 },
  { name: "Organic Search", value: 3200 },
  { name: "Social", value: 2100 },
  { name: "Referral", value: 1500 },
  { name: "Email", value: 800 },
];

const trafficTrendData = [
  { date: "Jan 1", direct: 150, organic: 120, social: 80 },
  { date: "Jan 2", direct: 180, organic: 130, social: 90 },
  { date: "Jan 3", direct: 200, organic: 150, social: 100 },
  { date: "Jan 4", direct: 170, organic: 140, social: 85 },
  { date: "Jan 5", direct: 220, organic: 160, social: 110 },
  { date: "Jan 6", direct: 250, organic: 180, social: 120 },
  { date: "Jan 7", direct: 230, organic: 170, social: 115 },
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
      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Direct"
          value={4500}
          changePercent={15.2}
          icon={Link}
        />
        <StatsCard
          title="Organic Search"
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
          title="Email"
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
            <CardTitle>Traffic Sources</CardTitle>
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
            <CardTitle>Traffic Trend by Source</CardTitle>
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
                    name="Direct"
                  />
                  <Area
                    type="monotone"
                    dataKey="organic"
                    stroke="hsl(var(--chart-2))"
                    fill="url(#colorOrganic)"
                    strokeWidth={2}
                    name="Organic"
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
          <CardTitle>UTM Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead>Medium</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead className="text-right">Visitors</TableHead>
                <TableHead className="text-right">Conversions</TableHead>
                <TableHead className="text-right">Conv. Rate</TableHead>
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
