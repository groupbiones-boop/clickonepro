import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface HourlyDistribution {
  hour: number;
  count: number;
}

export interface PagePeakData {
  path: string;
  hourlyDistribution: HourlyDistribution[];
  peakHour: { hour: number; count: number };
  lowestHour: { hour: number; count: number };
  totalVisits: number;
  color: string;
}

export interface ComparisonInsight {
  type: "flow" | "timing" | "pattern";
  message: string;
  pages: string[];
}

const COMPARISON_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
];

function generateInsights(pageData: PagePeakData[]): ComparisonInsight[] {
  const insights: ComparisonInsight[] = [];

  if (pageData.length < 2) return insights;

  // Sort by peak hour
  const sortedByPeak = [...pageData].sort(
    (a, b) => a.peakHour.hour - b.peakHour.hour
  );

  // Detect sequential flow (consecutive peaks within 1-3 hours)
  const peakDiffs = sortedByPeak.map((p, i) =>
    i > 0 ? p.peakHour.hour - sortedByPeak[i - 1].peakHour.hour : 0
  );

  const hasSequentialFlow = peakDiffs.slice(1).every((d) => d >= 1 && d <= 3);
  if (hasSequentialFlow && sortedByPeak.length >= 2) {
    insights.push({
      type: "flow",
      message: `Fluxo detectado: ${sortedByPeak.map((p) => p.path).join(" → ")}`,
      pages: sortedByPeak.map((p) => p.path),
    });
  }

  // Detect simultaneous peaks
  const peakHours = pageData.map((p) => p.peakHour.hour);
  const peakCounts: Record<number, string[]> = {};
  pageData.forEach((p) => {
    if (!peakCounts[p.peakHour.hour]) {
      peakCounts[p.peakHour.hour] = [];
    }
    peakCounts[p.peakHour.hour].push(p.path);
  });

  Object.entries(peakCounts).forEach(([hour, pages]) => {
    if (pages.length > 1) {
      insights.push({
        type: "pattern",
        message: `Pico simultâneo às ${hour}h: ${pages.join(", ")}`,
        pages,
      });
    }
  });

  // Timing correlation
  if (sortedByPeak.length >= 2) {
    const first = sortedByPeak[0];
    const last = sortedByPeak[sortedByPeak.length - 1];
    const diff = last.peakHour.hour - first.peakHour.hour;
    if (diff > 0 && diff <= 5) {
      insights.push({
        type: "timing",
        message: `${last.path} tem pico ${diff}h após ${first.path} - possível jornada de conversão`,
        pages: [first.path, last.path],
      });
    }
  }

  return insights;
}

export function usePeakHoursComparison(selectedPages: string[]) {
  return useQuery({
    queryKey: ["peak-hours-comparison", selectedPages],
    queryFn: async (): Promise<{
      pageData: PagePeakData[];
      insights: ComparisonInsight[];
    }> => {
      if (selectedPages.length === 0) {
        return { pageData: [], insights: [] };
      }

      const twentyFourHoursAgo = new Date(
        Date.now() - 24 * 60 * 60 * 1000
      ).toISOString();

      const pageDataPromises = selectedPages.map(async (path, index) => {
        const { data, error } = await supabase
          .from("analytics_events")
          .select("created_at")
          .eq("page_path", path)
          .gte("created_at", twentyFourHoursAgo);

        if (error) throw error;

        // Calculate hourly distribution
        const hourCounts: Record<number, number> = {};
        for (let h = 0; h < 24; h++) {
          hourCounts[h] = 0;
        }

        (data || []).forEach((event) => {
          const hour = new Date(event.created_at).getHours();
          hourCounts[hour]++;
        });

        const hourlyDistribution: HourlyDistribution[] = Object.entries(
          hourCounts
        ).map(([hour, count]) => ({
          hour: parseInt(hour),
          count,
        }));

        // Find peak and lowest hours
        let peakHour = { hour: 0, count: 0 };
        let lowestHour = { hour: 0, count: Infinity };

        hourlyDistribution.forEach((h) => {
          if (h.count > peakHour.count) {
            peakHour = { hour: h.hour, count: h.count };
          }
          if (h.count < lowestHour.count) {
            lowestHour = { hour: h.hour, count: h.count };
          }
        });

        if (lowestHour.count === Infinity) {
          lowestHour.count = 0;
        }

        return {
          path,
          hourlyDistribution,
          peakHour,
          lowestHour,
          totalVisits: (data || []).length,
          color: COMPARISON_COLORS[index % COMPARISON_COLORS.length],
        };
      });

      const pageData = await Promise.all(pageDataPromises);
      const insights = generateInsights(pageData);

      return { pageData, insights };
    },
    enabled: selectedPages.length > 0,
    refetchInterval: 60000,
  });
}
