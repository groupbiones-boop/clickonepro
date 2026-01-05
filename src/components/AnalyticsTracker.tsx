import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { getGeoLocation, GeoData } from "@/lib/geolocation";
import { useVisitorPresence } from "@/hooks/useVisitorPresence";

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
  const maxScrollDepthRef = useRef<number>(0);
  const [geoData, setGeoData] = useState<GeoData | null>(null);
  const sessionId = generateSessionId();

  // Fetch geolocation on first render
  useEffect(() => {
    getGeoLocation().then((data) => {
      if (data) {
        setGeoData(data);
      }
    });
  }, []);

  // Register visitor presence for real-time tracking
  useVisitorPresence({
    session_id: sessionId,
    page_path: location.pathname,
    page_title: document.title,
    device_type: getDeviceType(),
    browser: getBrowser(),
    os: getOS(),
    geoData,
  });

  const trackEvent = async (
    eventType: string,
    additionalData: Record<string, unknown> = {}
  ) => {
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
      country: geoData?.country || null,
      region: geoData?.region || null,
      city: geoData?.city || null,
      lat: geoData?.lat || null,
      lon: geoData?.lon || null,
      ...additionalData,
    };

    try {
      await supabase.from("analytics_events").insert(eventData);
    } catch (error) {
      console.error("Analytics tracking error:", error);
    }
  };

  // Track pageview and consolidate previous page metrics
  useEffect(() => {
    if (location.pathname !== lastPathRef.current) {
      // Save metrics from previous page (time + scroll consolidated)
      if (lastPathRef.current) {
        const timeOnPage = Math.round((Date.now() - startTimeRef.current) / 1000);
        trackEvent("page_exit", {
          page_path: lastPathRef.current,
          time_on_page: timeOnPage,
          scroll_depth: maxScrollDepthRef.current,
        });
      }

      // Reset for new page
      startTimeRef.current = Date.now();
      maxScrollDepthRef.current = 0;
      lastPathRef.current = location.pathname;

      // Track pageview (single entry event)
      trackEvent("pageview");
    }
  }, [location.pathname]);

  // Track scroll silently (no events generated)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      // Only update max, no event sent
      if (scrollPercent > maxScrollDepthRef.current) {
        maxScrollDepthRef.current = scrollPercent;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return null;
};

export default AnalyticsTracker;
