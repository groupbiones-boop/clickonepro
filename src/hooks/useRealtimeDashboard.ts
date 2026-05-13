import { useEffect, useCallback, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useRealtimeDashboard = (onDataUpdate?: () => void) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const invalidateAnalytics = useCallback(() => {
    // Debounce analytics invalidation to prevent too many refreshes
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
      queryClient.invalidateQueries({ queryKey: ["funnel-data"] });
      onDataUpdate?.();
    }, 5000);
  }, [queryClient, onDataUpdate]);

  const invalidateLeads = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["leads-stats"] });
    queryClient.invalidateQueries({ queryKey: ["conversion-rate"] });
    queryClient.invalidateQueries({ queryKey: ["agendamentos-count"] });
    queryClient.invalidateQueries({ queryKey: ["leads-timeline"] });
    queryClient.invalidateQueries({ queryKey: ["funnel-data"] });
    onDataUpdate?.();
  }, [queryClient, onDataUpdate]);

  useEffect(() => {
    // Subscribe to analytics events
    const analyticsChannel = supabase
      .channel("analytics-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "analytics_events",
        },
        () => {
          invalidateAnalytics();
        }
      )
      .subscribe();

    // Subscribe to leads changes
    const leadsChannel = supabase
      .channel("leads-realtime-dashboard")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "leads",
        },
        (payload) => {
          invalidateLeads();
          
          if (payload.eventType === "INSERT") {
            // Play notification sound
            playNotificationSound();
            
            toast({
              title: "📊 Novo Lead",
              description: "Dashboard atualizado com novos dados.",
            });
          }
        }
      )
      .subscribe();

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      supabase.removeChannel(analyticsChannel);
      supabase.removeChannel(leadsChannel);
    };
  }, [invalidateAnalytics, invalidateLeads, toast]);
};

// Play "plin plin" notification sound using Web Audio API
const playNotificationSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const playNote = (frequency: number, startTime: number, duration: number) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = "sine";
      
      gainNode.gain.setValueAtTime(0.3, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };
    
    const now = audioContext.currentTime;
    playNote(1047, now, 0.15); // C6
    playNote(1319, now + 0.15, 0.15); // E6
  } catch (e) {
    // Audio not supported
  }
};
