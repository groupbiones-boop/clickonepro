import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, eachDayOfInterval, parseISO, differenceInDays } from "date-fns";

interface CampaignAnalyticsFilters {
  lpSlug?: string;
  startDate: string;
  endDate: string;
}

interface DailyMetrics {
  date: string;
  visitors: number;
  pageviews: number;
  conversions: number;
}

interface CampaignMetrics {
  reach: number;
  visitors: number;
  pageviews: number;
  conversions: number;
  timeline: DailyMetrics[];
}

export function useCampaignAnalytics(filters: CampaignAnalyticsFilters | null) {
  return useQuery({
    queryKey: ["campaign-analytics", filters],
    queryFn: async (): Promise<CampaignMetrics> => {
      if (!filters) {
        return { reach: 0, visitors: 0, pageviews: 0, conversions: 0, timeline: [] };
      }

      const { lpSlug, startDate, endDate } = filters;
      const pagePath = lpSlug ? `/lp/${lpSlug}` : "/lp/";

      // Get pageviews and visitors
      const { data: analyticsData, error: analyticsError } = await supabase
        .from("analytics_events")
        .select("session_id, event_type, created_at")
        .gte("created_at", startDate)
        .lte("created_at", endDate + "T23:59:59")
        .like("page_path", `${pagePath}%`);

      if (analyticsError) throw analyticsError;

      // Get conversions (leads)
      const { data: leadsData, error: leadsError } = await supabase
        .from("leads")
        .select("id, created_at, source")
        .gte("created_at", startDate)
        .lte("created_at", endDate + "T23:59:59");

      if (leadsError) throw leadsError;

      // Filter leads by LP source if applicable
      const relevantLeads = lpSlug
        ? leadsData?.filter(l => l.source?.includes(lpSlug)) || []
        : leadsData || [];

      // Calculate metrics
      const uniqueSessions = new Set(analyticsData?.map(e => e.session_id) || []);
      const pageviews = analyticsData?.filter(e => e.event_type === "pageview").length || 0;
      const visitors = uniqueSessions.size;
      const reach = pageviews; // Using pageviews as reach proxy
      const conversions = relevantLeads.length;

      // Build timeline
      const days = eachDayOfInterval({
        start: parseISO(startDate),
        end: parseISO(endDate),
      });

      const timeline: DailyMetrics[] = days.map(day => {
        const dayStr = format(day, "yyyy-MM-dd");
        const dayAnalytics = analyticsData?.filter(e => 
          e.created_at?.startsWith(dayStr)
        ) || [];
        const dayLeads = relevantLeads.filter(l => 
          l.created_at?.startsWith(dayStr)
        );

        return {
          date: dayStr,
          visitors: new Set(dayAnalytics.map(e => e.session_id)).size,
          pageviews: dayAnalytics.filter(e => e.event_type === "pageview").length,
          conversions: dayLeads.length,
        };
      });

      return {
        reach,
        visitors,
        pageviews,
        conversions,
        timeline,
      };
    },
    enabled: !!filters,
  });
}

export function calculateProgress(current: number, goal: number | null): number {
  if (!goal || goal === 0) return 0;
  return Math.min((current / goal) * 100, 100);
}

export function calculateProjection(
  current: number,
  startDate: string,
  endDate: string
): number {
  const start = parseISO(startDate);
  const end = parseISO(endDate);
  const today = new Date();
  
  const totalDays = differenceInDays(end, start) + 1;
  const elapsedDays = Math.max(1, differenceInDays(today, start) + 1);
  
  if (elapsedDays >= totalDays) return current;
  
  const dailyRate = current / elapsedDays;
  return Math.round(dailyRate * totalDays);
}

export function getProgressStatus(
  current: number,
  goal: number | null,
  startDate: string,
  endDate: string
): "on_track" | "behind" | "ahead" {
  if (!goal || goal === 0) return "on_track";
  
  const start = parseISO(startDate);
  const end = parseISO(endDate);
  const today = new Date();
  
  const totalDays = differenceInDays(end, start) + 1;
  const elapsedDays = Math.max(1, differenceInDays(today, start) + 1);
  
  const expectedProgress = (elapsedDays / totalDays) * goal;
  const threshold = 0.1; // 10% tolerance
  
  if (current >= expectedProgress * (1 + threshold)) return "ahead";
  if (current < expectedProgress * (1 - threshold)) return "behind";
  return "on_track";
}

export function formatCurrency(value: number, currency: "USD" | "BRL"): string {
  if (currency === "BRL") {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}
