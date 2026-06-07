import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { RealtimeChannel } from "@supabase/supabase-js";

export interface OnlineVisitor {
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
  lat: number;
  lon: number;
  joined_at: string;
  online_minutes: number;
}

export interface CountryGroup {
  country: string;
  countryCode: string;
  count: number;
}

const CHANNEL_NAME = "visitor-presence";

export const useOnlineVisitors = () => {
  const [visitors, setVisitors] = useState<OnlineVisitor[]>([]);
  const [count, setCount] = useState(0);
  const [byCountry, setByCountry] = useState<CountryGroup[]>([]);

  const calculateOnlineMinutes = useCallback((joinedAt: string): number => {
    const joined = new Date(joinedAt).getTime();
    const now = Date.now();
    return Math.floor((now - joined) / 60000);
  }, []);

  const processPresenceState = useCallback(
    (state: Record<string, unknown[]>) => {
      const allVisitors: OnlineVisitor[] = [];
      const countryMap = new Map<string, { country: string; countryCode: string; count: number }>();

      Object.values(state).forEach((presences) => {
        presences.forEach((presence: unknown) => {
          const p = presence as Record<string, unknown>;
          if (p.session_id) {
            const visitor: OnlineVisitor = {
              session_id: p.session_id as string,
              page_path: p.page_path as string,
              page_title: p.page_title as string,
              device_type: p.device_type as string,
              browser: p.browser as string,
              os: p.os as string,
              country: p.country as string,
              countryCode: p.countryCode as string,
              region: p.region as string,
              city: p.city as string,
              lat: (p.lat as number) || 0,
              lon: (p.lon as number) || 0,
              joined_at: p.joined_at as string,
              online_minutes: calculateOnlineMinutes(p.joined_at as string),
            };
            allVisitors.push(visitor);

            // Group by country
            const key = p.countryCode as string;
            if (countryMap.has(key)) {
              countryMap.get(key)!.count++;
            } else {
              countryMap.set(key, {
                country: p.country as string,
                countryCode: p.countryCode as string,
                count: 1,
              });
            }
          }
        });
      });

      // Sort visitors by joined_at (most recent first)
      allVisitors.sort((a, b) => new Date(b.joined_at).getTime() - new Date(a.joined_at).getTime());

      // Convert country map to sorted array
      const countries = Array.from(countryMap.values()).sort((a, b) => b.count - a.count);

      setVisitors(allVisitors);
      setCount(allVisitors.length);
      setByCountry(countries);
    },
    [calculateOnlineMinutes]
  );

  useEffect(() => {
    let channel: RealtimeChannel | null = null;

    const setupChannel = () => {
      // Remove any pre-existing channel with the same topic to avoid
      // "cannot add presence callbacks after subscribe()" on remount/StrictMode
      supabase.getChannels().forEach((ch) => {
        if (ch.topic === `realtime:${CHANNEL_NAME}`) {
          supabase.removeChannel(ch);
        }
      });

      channel = supabase.channel(CHANNEL_NAME);

      channel
        .on("presence", { event: "sync" }, () => {
          const state = channel?.presenceState() || {};
          processPresenceState(state);
        })
        .on("presence", { event: "join" }, () => {
          const state = channel?.presenceState() || {};
          processPresenceState(state);
        })
        .on("presence", { event: "leave" }, () => {
          const state = channel?.presenceState() || {};
          processPresenceState(state);
        })
        .subscribe();
    };

    setupChannel();

    // Update online_minutes every minute
    const interval = setInterval(() => {
      setVisitors((prev) =>
        prev.map((v) => ({
          ...v,
          online_minutes: calculateOnlineMinutes(v.joined_at),
        }))
      );
    }, 60000);

    return () => {
      clearInterval(interval);
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [processPresenceState, calculateOnlineMinutes]);

  return { visitors, count, byCountry };
};
