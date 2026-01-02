import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { startOfDay, subDays, format } from "date-fns";

export interface AnalyticsFilters {
  startDate: Date;
  endDate: Date;
  deviceType?: string;
  country?: string;
}

export interface StatsData {
  current: number;
  previous: number;
  change: number;
  changePercent: number;
}

export const useVisitorStats = (filters: AnalyticsFilters) => {
  return useQuery({
    queryKey: ["analytics", "visitors", filters],
    queryFn: async () => {
      const { data: currentData, error: currentError } = await supabase
        .from("analytics_events")
        .select("session_id")
        .eq("event_type", "pageview")
        .gte("created_at", filters.startDate.toISOString())
        .lte("created_at", filters.endDate.toISOString());

      if (currentError) throw currentError;

      const periodLength = filters.endDate.getTime() - filters.startDate.getTime();
      const previousStart = new Date(filters.startDate.getTime() - periodLength);
      const previousEnd = new Date(filters.endDate.getTime() - periodLength);

      const { data: previousData, error: previousError } = await supabase
        .from("analytics_events")
        .select("session_id")
        .eq("event_type", "pageview")
        .gte("created_at", previousStart.toISOString())
        .lte("created_at", previousEnd.toISOString());

      if (previousError) throw previousError;

      const currentUnique = new Set(currentData?.map((e) => e.session_id) || []).size;
      const previousUnique = new Set(previousData?.map((e) => e.session_id) || []).size;

      const change = currentUnique - previousUnique;
      const changePercent = previousUnique > 0 ? (change / previousUnique) * 100 : 0;

      return {
        current: currentUnique,
        previous: previousUnique,
        change,
        changePercent,
      } as StatsData;
    },
  });
};

export const usePageviewStats = (filters: AnalyticsFilters) => {
  return useQuery({
    queryKey: ["analytics", "pageviews", filters],
    queryFn: async () => {
      const { count: currentCount, error: currentError } = await supabase
        .from("analytics_events")
        .select("*", { count: "exact", head: true })
        .eq("event_type", "pageview")
        .gte("created_at", filters.startDate.toISOString())
        .lte("created_at", filters.endDate.toISOString());

      if (currentError) throw currentError;

      const periodLength = filters.endDate.getTime() - filters.startDate.getTime();
      const previousStart = new Date(filters.startDate.getTime() - periodLength);
      const previousEnd = new Date(filters.endDate.getTime() - periodLength);

      const { count: previousCount, error: previousError } = await supabase
        .from("analytics_events")
        .select("*", { count: "exact", head: true })
        .eq("event_type", "pageview")
        .gte("created_at", previousStart.toISOString())
        .lte("created_at", previousEnd.toISOString());

      if (previousError) throw previousError;

      const current = currentCount || 0;
      const previous = previousCount || 0;
      const change = current - previous;
      const changePercent = previous > 0 ? (change / previous) * 100 : 0;

      return { current, previous, change, changePercent } as StatsData;
    },
  });
};

export const useTimelineData = (filters: AnalyticsFilters) => {
  return useQuery({
    queryKey: ["analytics", "timeline", filters],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("analytics_events")
        .select("created_at, session_id")
        .eq("event_type", "pageview")
        .gte("created_at", filters.startDate.toISOString())
        .lte("created_at", filters.endDate.toISOString())
        .order("created_at", { ascending: true });

      if (error) throw error;

      // Group by date
      const grouped = (data || []).reduce((acc, event) => {
        const date = format(new Date(event.created_at), "yyyy-MM-dd");
        if (!acc[date]) {
          acc[date] = { pageviews: 0, sessions: new Set() };
        }
        acc[date].pageviews++;
        acc[date].sessions.add(event.session_id);
        return acc;
      }, {} as Record<string, { pageviews: number; sessions: Set<string> }>);

      return Object.entries(grouped).map(([date, data]) => ({
        date,
        pageviews: data.pageviews,
        visitors: data.sessions.size,
      }));
    },
  });
};

export const useDeviceStats = (filters: AnalyticsFilters) => {
  return useQuery({
    queryKey: ["analytics", "devices", filters],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("analytics_events")
        .select("device_type, session_id")
        .eq("event_type", "pageview")
        .gte("created_at", filters.startDate.toISOString())
        .lte("created_at", filters.endDate.toISOString());

      if (error) throw error;

      const grouped = (data || []).reduce((acc, event) => {
        const device = event.device_type || "unknown";
        if (!acc[device]) acc[device] = new Set();
        acc[device].add(event.session_id);
        return acc;
      }, {} as Record<string, Set<string>>);

      return Object.entries(grouped).map(([name, sessions]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value: sessions.size,
      }));
    },
  });
};

export const useTopPages = (filters: AnalyticsFilters) => {
  return useQuery({
    queryKey: ["analytics", "topPages", filters],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("analytics_events")
        .select("page_path, page_title")
        .eq("event_type", "pageview")
        .gte("created_at", filters.startDate.toISOString())
        .lte("created_at", filters.endDate.toISOString());

      if (error) throw error;

      const grouped = (data || []).reduce((acc, event) => {
        const path = event.page_path;
        if (!acc[path]) {
          acc[path] = { count: 0, title: event.page_title || path };
        }
        acc[path].count++;
        return acc;
      }, {} as Record<string, { count: number; title: string }>);

      return Object.entries(grouped)
        .map(([path, data]) => ({
          path,
          title: data.title,
          views: data.count,
        }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 10);
    },
  });
};

export const useCountryStats = (filters: AnalyticsFilters) => {
  return useQuery({
    queryKey: ["analytics", "countries", filters],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("analytics_events")
        .select("country, session_id")
        .eq("event_type", "pageview")
        .gte("created_at", filters.startDate.toISOString())
        .lte("created_at", filters.endDate.toISOString());

      if (error) throw error;

      const grouped = (data || []).reduce((acc, event) => {
        const country = event.country || "Unknown";
        if (!acc[country]) acc[country] = new Set();
        acc[country].add(event.session_id);
        return acc;
      }, {} as Record<string, Set<string>>);

      return Object.entries(grouped)
        .map(([name, sessions]) => ({
          name,
          value: sessions.size,
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 10);
    },
  });
};

export const useBrowserStats = (filters: AnalyticsFilters) => {
  return useQuery({
    queryKey: ["analytics", "browsers", filters],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("analytics_events")
        .select("browser, session_id")
        .eq("event_type", "pageview")
        .gte("created_at", filters.startDate.toISOString())
        .lte("created_at", filters.endDate.toISOString());

      if (error) throw error;

      const grouped = (data || []).reduce((acc, event) => {
        const browser = event.browser || "Unknown";
        if (!acc[browser]) acc[browser] = new Set();
        acc[browser].add(event.session_id);
        return acc;
      }, {} as Record<string, Set<string>>);

      return Object.entries(grouped)
        .map(([name, sessions]) => ({
          name,
          value: sessions.size,
        }))
        .sort((a, b) => b.value - a.value);
    },
  });
};

export const useOSStats = (filters: AnalyticsFilters) => {
  return useQuery({
    queryKey: ["analytics", "os", filters],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("analytics_events")
        .select("os, session_id")
        .eq("event_type", "pageview")
        .gte("created_at", filters.startDate.toISOString())
        .lte("created_at", filters.endDate.toISOString());

      if (error) throw error;

      const grouped = (data || []).reduce((acc, event) => {
        const os = event.os || "Unknown";
        if (!acc[os]) acc[os] = new Set();
        acc[os].add(event.session_id);
        return acc;
      }, {} as Record<string, Set<string>>);

      return Object.entries(grouped)
        .map(([name, sessions]) => ({
          name,
          value: sessions.size,
        }))
        .sort((a, b) => b.value - a.value);
    },
  });
};

export const useUSStateStats = (filters: AnalyticsFilters) => {
  return useQuery({
    queryKey: ["analytics", "usStates", filters],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("analytics_events")
        .select("region, session_id")
        .eq("event_type", "pageview")
        .eq("country", "United States")
        .gte("created_at", filters.startDate.toISOString())
        .lte("created_at", filters.endDate.toISOString());

      if (error) throw error;

      const grouped = (data || []).reduce((acc, event) => {
        const state = event.region || "Unknown";
        if (!acc[state]) acc[state] = new Set();
        acc[state].add(event.session_id);
        return acc;
      }, {} as Record<string, Set<string>>);

      return Object.entries(grouped)
        .map(([name, sessions]) => ({
          name,
          value: sessions.size,
        }))
        .sort((a, b) => b.value - a.value);
    },
  });
};
