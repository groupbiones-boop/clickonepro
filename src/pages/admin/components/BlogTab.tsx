import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsCard from "./StatsCard";
import { FileText, Eye, Clock, CheckCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  FunnelChart,
  Funnel,
  LabelList,
} from "recharts";
import { useBlogStats, useAllPosts } from "@/hooks/useBlogPosts";
import { AnalyticsFilters } from "@/hooks/useAnalytics";
import { Badge } from "@/components/ui/badge";

interface BlogTabProps {
  filters: AnalyticsFilters;
}

// Mock reading retention data
const retentionData = [
  { name: "Started", value: 1000, fill: "hsl(var(--chart-1))" },
  { name: "25% Read", value: 750, fill: "hsl(var(--chart-2))" },
  { name: "50% Read", value: 500, fill: "hsl(var(--chart-3))" },
  { name: "75% Read", value: 350, fill: "hsl(var(--chart-4))" },
  { name: "Completed", value: 250, fill: "hsl(var(--chart-5))" },
];

// Mock blog views trend
const blogViewsTrend = [
  { date: "Week 1", views: 120 },
  { date: "Week 2", views: 180 },
  { date: "Week 3", views: 150 },
  { date: "Week 4", views: 220 },
  { date: "Week 5", views: 280 },
  { date: "Week 6", views: 350 },
];

const BlogTab = ({ filters }: BlogTabProps) => {
  const { data: blogStats } = useBlogStats();
  const { data: posts } = useAllPosts();

  const topPosts = posts
    ?.filter((p) => p.status === "published")
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 10) || [];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Total Posts"
          value={blogStats?.totalPosts || 0}
          icon={FileText}
        />
        <StatsCard
          title="Total Views"
          value={blogStats?.totalViews || 0}
          changePercent={25.4}
          icon={Eye}
        />
        <StatsCard
          title="Avg. Read Time"
          value={(blogStats?.avgReadTime || 0) * 60}
          format="time"
          icon={Clock}
        />
        <StatsCard
          title="Completion Rate"
          value={25}
          format="percent"
          changePercent={5.2}
          icon={CheckCircle}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Top 10 Posts by Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topPosts} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis type="number" className="text-muted-foreground" />
                  <YAxis
                    type="category"
                    dataKey="title"
                    width={150}
                    tick={{ fontSize: 10 }}
                    tickFormatter={(value) =>
                      value.length > 20 ? `${value.substring(0, 20)}...` : value
                    }
                    className="text-muted-foreground"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="views" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Blog Views Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Blog Views Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={blogViewsTrend}>
                  <defs>
                    <linearGradient id="colorBlogViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
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
                    dataKey="views"
                    stroke="hsl(var(--chart-2))"
                    fill="url(#colorBlogViews)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reading Retention Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Reading Retention Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Funnel dataKey="value" data={retentionData} isAnimationActive>
                  <LabelList
                    position="right"
                    fill="hsl(var(--foreground))"
                    stroke="none"
                    dataKey="name"
                  />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Posts Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Posts Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Views</TableHead>
                <TableHead className="text-right">Read Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(posts || []).map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium max-w-xs truncate">
                    {post.title}
                  </TableCell>
                  <TableCell>
                    <Badge variant={post.status === "published" ? "default" : "secondary"}>
                      {post.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{post.views?.toLocaleString() || 0}</TableCell>
                  <TableCell className="text-right">{post.read_time} min</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogTab;
