import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SitePage {
  path: string;
  title: string | null;
  visits: number;
  lastVisit: string;
}

export function useSitePages() {
  return useQuery({
    queryKey: ["site-pages"],
    queryFn: async (): Promise<SitePage[]> => {
      // Get distinct page paths with visit counts
      const { data, error } = await supabase
        .from("analytics_events")
        .select("page_path, page_title, created_at")
        .eq("event_type", "pageview")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Aggregate by page path
      const pageMap = new Map<string, { title: string | null; visits: number; lastVisit: string }>();

      (data || []).forEach((event) => {
        const existing = pageMap.get(event.page_path);
        if (existing) {
          existing.visits++;
          if (new Date(event.created_at) > new Date(existing.lastVisit)) {
            existing.lastVisit = event.created_at;
            if (event.page_title) {
              existing.title = event.page_title;
            }
          }
        } else {
          pageMap.set(event.page_path, {
            title: event.page_title || null,
            visits: 1,
            lastVisit: event.created_at,
          });
        }
      });

      // Convert to array and sort by visits
      const pages: SitePage[] = Array.from(pageMap.entries())
        .map(([path, data]) => ({
          path,
          ...data,
        }))
        .sort((a, b) => b.visits - a.visits);

      return pages;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
