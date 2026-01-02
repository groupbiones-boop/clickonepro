import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const generateSessionId = (): string => {
  const stored = sessionStorage.getItem("analytics_session_id");
  if (stored) return stored;
  const newId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  sessionStorage.setItem("analytics_session_id", newId);
  return newId;
};

const getDeviceType = (): string => {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return "mobile";
  return "desktop";
};

const getBrowser = (): string => {
  const ua = navigator.userAgent;
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("SamsungBrowser")) return "Samsung Browser";
  if (ua.includes("Opera") || ua.includes("OPR")) return "Opera";
  if (ua.includes("Edge")) return "Edge";
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Safari")) return "Safari";
  return "Other";
};

const getOS = (): string => {
  const ua = navigator.userAgent;
  if (ua.includes("Win")) return "Windows";
  if (ua.includes("Mac")) return "macOS";
  if (ua.includes("Linux")) return "Linux";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iOS") || ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  return "Other";
};

const getUTMParams = (): Record<string, string | null> => {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
  };
};

const AnalyticsTracker = () => {
  const location = useLocation();
  const startTimeRef = useRef<number>(Date.now());
  const lastPathRef = useRef<string>("");
  const scrollDepthRef = useRef<number>(0);
  const hasTrackedScrollRef = useRef<Set<number>>(new Set());

  const trackEvent = async (
    eventType: string,
    additionalData: Record<string, unknown> = {}
  ) => {
    const sessionId = generateSessionId();
    const utmParams = getUTMParams();

    const eventData = {
      session_id: sessionId,
      event_type: eventType,
      page_path: location.pathname,
      page_title: document.title,
      referrer: document.referrer || null,
      utm_source: utmParams.utm_source,
      utm_medium: utmParams.utm_medium,
      utm_campaign: utmParams.utm_campaign,
      device_type: getDeviceType(),
      browser: getBrowser(),
      os: getOS(),
      screen_width: window.innerWidth,
      screen_height: window.innerHeight,
      ...additionalData,
    };

    try {
      await supabase.from("analytics_events").insert(eventData);
    } catch (error) {
      console.error("Analytics tracking error:", error);
    }
  };

  // Track pageview
  useEffect(() => {
    if (location.pathname !== lastPathRef.current) {
      // Track time on previous page
      if (lastPathRef.current) {
        const timeOnPage = Math.round((Date.now() - startTimeRef.current) / 1000);
        trackEvent("time_on_page", {
          page_path: lastPathRef.current,
          time_on_page: timeOnPage,
          scroll_depth: scrollDepthRef.current,
        });
      }

      // Reset for new page
      startTimeRef.current = Date.now();
      scrollDepthRef.current = 0;
      hasTrackedScrollRef.current = new Set();
      lastPathRef.current = location.pathname;

      // Track pageview
      trackEvent("pageview");
    }
  }, [location.pathname]);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      // Track at 25%, 50%, 75%, 100% milestones
      const milestones = [25, 50, 75, 100];
      for (const milestone of milestones) {
        if (scrollPercent >= milestone && !hasTrackedScrollRef.current.has(milestone)) {
          hasTrackedScrollRef.current.add(milestone);
          scrollDepthRef.current = milestone;
          trackEvent("scroll", { scroll_depth: milestone });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Track time on page when leaving
  useEffect(() => {
    const handleBeforeUnload = () => {
      const timeOnPage = Math.round((Date.now() - startTimeRef.current) / 1000);
      // Use sendBeacon for reliability
      const data = JSON.stringify({
        session_id: generateSessionId(),
        event_type: "time_on_page",
        page_path: location.pathname,
        time_on_page: timeOnPage,
        scroll_depth: scrollDepthRef.current,
      });
      navigator.sendBeacon(
        `https://ojyzegzdlpjlbdhvqhav.supabase.co/rest/v1/analytics_events`,
        data
      );
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [location.pathname]);

  return null;
};

export default AnalyticsTracker;
