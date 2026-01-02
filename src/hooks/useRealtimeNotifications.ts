import { useEffect, useState, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  severity: string;
  data: Record<string, unknown> | null;
  read: boolean;
  created_at: string;
}

// Notification sound - simple beep using Web Audio API
const playNotificationSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = "sine";
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (error) {
    console.log("Could not play notification sound:", error);
  }
};

export const useRealtimeNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { toast } = useToast();
  const hasNewNotification = useRef(false);

  const triggerAnimation = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 2000);
  }, []);

  // Fetch initial notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) {
        console.error("Error fetching notifications:", error);
        return;
      }

      setNotifications(data as Notification[]);
      setUnreadCount(data?.filter((n) => !n.read).length || 0);
    };

    fetchNotifications();
  }, []);

  // Subscribe to realtime notifications
  useEffect(() => {
    const channel = supabase
      .channel("notifications-channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
        },
        (payload) => {
          const newNotification = payload.new as Notification;
          setNotifications((prev) => [newNotification, ...prev]);
          setUnreadCount((prev) => prev + 1);
          
          // Play sound and trigger animation
          playNotificationSound();
          triggerAnimation();

          // Show toast
          const variant =
            newNotification.severity === "critical"
              ? "destructive"
              : newNotification.severity === "success"
              ? "default"
              : "default";

          toast({
            title: newNotification.title,
            description: newNotification.message,
            variant,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast, triggerAnimation]);

  // Subscribe to new leads
  useEffect(() => {
    const channel = supabase
      .channel("leads-channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "leads",
        },
        (payload) => {
          const newLead = payload.new as { email: string; name?: string; source?: string };
          
          // Play sound and trigger animation
          playNotificationSound();
          triggerAnimation();
          
          toast({
            title: "🎉 Novo Lead!",
            description: `${newLead.name || newLead.email} via ${newLead.source || "website"}`,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast, triggerAnimation]);

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("id", id);

    if (!error) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    }
  };

  const markAllAsRead = async () => {
    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("read", false);

    if (!error) {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    }
  };

  return {
    notifications,
    unreadCount,
    isAnimating,
    markAsRead,
    markAllAsRead,
  };
};
