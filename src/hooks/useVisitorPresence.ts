import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { GeoData } from "@/lib/geolocation";

export interface VisitorPresenceData {
  session_id: string;
  page_path: string;
  page_title: string;
  device_type: string;
  browser: string;
  os: string;
  country: string;
  countryCode: string;
  region: string;
  city: string;
}

const CHANNEL_NAME = "visitor-presence";

export const useVisitorPresence = (
  data: Omit<VisitorPresenceData, "country" | "countryCode" | "region" | "city"> & {
    geoData: GeoData | null;
  }
) => {
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const isSubscribedRef = useRef(false);

  useEffect(() => {
    const presenceData: VisitorPresenceData = {
      session_id: data.session_id,
      page_path: data.page_path,
      page_title: data.page_title,
      device_type: data.device_type,
      browser: data.browser,
      os: data.os,
      country: data.geoData?.country || "Unknown",
      countryCode: data.geoData?.countryCode || "XX",
      region: data.geoData?.region || "",
      city: data.geoData?.city || "",
    };

    const setupPresence = async () => {
      // Create channel if not exists
      if (!channelRef.current) {
        channelRef.current = supabase.channel(CHANNEL_NAME, {
          config: {
            presence: {
              key: data.session_id,
            },
          },
        });

        channelRef.current.subscribe(async (status) => {
          if (status === "SUBSCRIBED") {
            isSubscribedRef.current = true;
            await channelRef.current?.track({
              ...presenceData,
              joined_at: new Date().toISOString(),
            });
          }
        });
      } else if (isSubscribedRef.current) {
        // Update presence when page changes
        await channelRef.current.track({
          ...presenceData,
          joined_at: new Date().toISOString(),
        });
      }
    };

    setupPresence();

    return () => {
      // Only unsubscribe when component unmounts (not on page change)
    };
  }, [data.page_path, data.session_id, data.geoData]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (channelRef.current) {
        channelRef.current.untrack();
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
        isSubscribedRef.current = false;
      }
    };
  }, []);
};
