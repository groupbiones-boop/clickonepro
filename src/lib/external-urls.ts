// ============================================
// External URLs - Centralized Constants
// ============================================
// This file centralizes all external URLs used across the site
// to ensure consistency and easy maintenance.

export const EXTERNAL_URLS = {
  // Demo Booking - native page. The old GHL widget URLs return 404 (checked 25/09/2026),
  // so every "Book a demo" button points to /book-a-demo.
  GHL_BOOKING: "/book-a-demo",
  
  // App Login
  APP_LOGIN: "https://app.clickonepro.com/",
} as const;

// GoHighLevel chat widget
export const GHL_CHAT_WIDGET = {
  ID: "6958160ae056feed599822d0",
  LOCATION_ID: "yUk5li3I0wg4YGcbKlSF",
  LOADER_URL: "https://widgets.leadconnectorhq.com/loader.js",
  RESOURCES_URL: "https://widgets.leadconnectorhq.com/chat-widget/loader.js",
} as const;

// GoHighLevel external tracking pixel (site-wide)
export const GHL_EXTERNAL_TRACKING = {
  SCRIPT_URL: "https://links.clickonepro.com/js/external-tracking.js",
  TRACKING_ID: "tk_531b6c6032d649b4bcd4df3738d1324d",
} as const;

// GoHighLevel contact form embed (replaces the native Supabase-backed form on /contato)
export const GHL_CONTACT_FORM = {
  ID: "fQvIkU31RDCnYLT9ld3P",
  EMBED_URL: "https://links.clickonepro.com/widget/form/fQvIkU31RDCnYLT9ld3P",
  EMBED_SCRIPT_URL: "https://links.clickonepro.com/js/form_embed.js",
  HEIGHT: 987,
} as const;

// Contact Information
export const CONTACT_INFO = {
  EMAIL: "info@clickonepro.com",
  PHONE: "+1 (770) 501-7321",
  PHONE_HREF: "tel:+17705017321",
  LOCATION: "Woodstock, GA",
} as const;

// Official ClickOne social profiles (footer icons + Organization schema sameAs)
export const SOCIAL_LINKS = {
  FACEBOOK: "https://www.facebook.com/310455115479921",
  INSTAGRAM: "https://www.instagram.com/clickoneai",
  YOUTUBE: "https://www.youtube.com/@clickonepro",
} as const;

// UTM Parameter Helper
export interface UTMParams {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
}

/**
 * Appends UTM parameters to a URL for campaign tracking
 */
export const appendUTMParams = (baseUrl: string, utmParams: UTMParams): string => {
  const origin = typeof window !== "undefined" ? window.location.origin : "https://clickonepro.com";
  const url = new URL(baseUrl, origin);
  if (utmParams.source) url.searchParams.set("utm_source", utmParams.source);
  if (utmParams.medium) url.searchParams.set("utm_medium", utmParams.medium);
  if (utmParams.campaign) url.searchParams.set("utm_campaign", utmParams.campaign);
  if (utmParams.content) url.searchParams.set("utm_content", utmParams.content);
  if (utmParams.term) url.searchParams.set("utm_term", utmParams.term);
  return url.toString();
};
