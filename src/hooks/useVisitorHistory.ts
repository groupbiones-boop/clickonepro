import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface VisitorHistoryPoint {
  lat: number;
  lon: number;
  country: string;
  countryCode: string;
  city: string;
  region: string;
  page_path: string;
  device_type: string;
  timestamp: string;
  hour: number;
}

export interface HourlyDistribution {
  hour: number;
  count: number;
  label: string;
}

export interface VisitorHistoryData {
  historyPoints: VisitorHistoryPoint[];
  hourlyDistribution: HourlyDistribution[];
  peakHour: { hour: number; count: number } | null;
  lowestHour: { hour: number; count: number } | null;
  totalVisits: number;
}

export function useVisitorHistory(pageFilter?: string) {
  return useQuery({
    queryKey: ["visitor-history", pageFilter],
    queryFn: async (): Promise<VisitorHistoryData> => {
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

      let query = supabase
        .from("analytics_events")
        .select("lat, lon, country, region, city, page_path, device_type, created_at")
        .gte("created_at", twentyFourHoursAgo)
        .not("lat", "is", null)
        .not("lon", "is", null)
        .order("created_at", { ascending: false });

      if (pageFilter && pageFilter !== "all") {
        query = query.eq("page_path", pageFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Process data into points
      const historyPoints: VisitorHistoryPoint[] = (data || []).map((event) => {
        const createdAt = new Date(event.created_at);
        return {
          lat: Number(event.lat),
          lon: Number(event.lon),
          country: event.country || "Unknown",
          countryCode: "",
          city: event.city || "Unknown",
          region: event.region || "",
          page_path: event.page_path,
          device_type: event.device_type || "desktop",
          timestamp: event.created_at,
          hour: createdAt.getHours(),
        };
      });

      // Calculate hourly distribution
      const hourCounts: Record<number, number> = {};
      for (let h = 0; h < 24; h++) {
        hourCounts[h] = 0;
      }
      
      historyPoints.forEach((point) => {
        hourCounts[point.hour]++;
      });

      const hourlyDistribution: HourlyDistribution[] = Object.entries(hourCounts).map(
        ([hour, count]) => ({
          hour: parseInt(hour),
          count,
          label: `${hour.padStart(2, "0")}:00`,
        })
      );

      // Find peak and lowest hours
      let peakHour: { hour: number; count: number } | null = null;
      let lowestHour: { hour: number; count: number } | null = null;

      hourlyDistribution.forEach((h) => {
        if (!peakHour || h.count > peakHour.count) {
          peakHour = { hour: h.hour, count: h.count };
        }
        if (!lowestHour || h.count < lowestHour.count) {
          lowestHour = { hour: h.hour, count: h.count };
        }
      });

      return {
        historyPoints,
        hourlyDistribution,
        peakHour,
        lowestHour,
        totalVisits: historyPoints.length,
      };
    },
    refetchInterval: 60000, // Refresh every minute
  });
}
