import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GHL_CHAT_WIDGET } from "@/lib/external-urls";

const SCRIPT_ID = "ghl-chat-widget-loader";
const CONTAINER_SELECTOR = `[data-chat-widget][data-widget-id="${GHL_CHAT_WIDGET.ID}"]`;
const MOBILE_STYLE_ID = "clickone-chat-mobile-fix";
// On phones the widget's auto-open greeting bubble covers page content (the calculator sliders)
// and blocks taps. Hide only the greeting below 768px; the round launcher button stays.
const MOBILE_STYLE = `@media (max-width: 767px) { .lc_text-widget--prompt { display: none !important; } }`;

/** The widget renders inside a shadow root after it loads, so retry until it exists. */
const injectMobileStyle = (): boolean => {
  const root = document.querySelector("chat-widget")?.shadowRoot;
  if (!root) return false;
  if (!root.getElementById(MOBILE_STYLE_ID)) {
    const style = document.createElement("style");
    style.id = MOBILE_STYLE_ID;
    style.textContent = MOBILE_STYLE;
    root.appendChild(style);
  }
  return true;
};

const GHLChatWidget = () => {
  const { pathname } = useLocation();
  const isPrivatePage = pathname.startsWith("/admin") || pathname.startsWith("/.lovable");

  useEffect(() => {
    if (isPrivatePage) return;

    let container = document.querySelector<HTMLElement>(CONTAINER_SELECTOR);
    if (!container) {
      container = document.createElement("div");
      container.dataset.chatWidget = "";
      container.dataset.widgetId = GHL_CHAT_WIDGET.ID;
      container.dataset.locationId = GHL_CHAT_WIDGET.LOCATION_ID;
      document.body.appendChild(container);
    }

    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = GHL_CHAT_WIDGET.LOADER_URL;
      script.dataset.resourcesUrl = GHL_CHAT_WIDGET.RESOURCES_URL;
      script.dataset.widgetId = GHL_CHAT_WIDGET.ID;
      script.async = true;
      document.body.appendChild(script);
    }

    let attempts = 0;
    const timer = window.setInterval(() => {
      if (injectMobileStyle() || ++attempts > 60) window.clearInterval(timer);
    }, 500);

    return () => {
      window.clearInterval(timer);
      document.querySelector(CONTAINER_SELECTOR)?.remove();
      document.getElementById(SCRIPT_ID)?.remove();
      document.querySelectorAll("chat-widget").forEach((element) => element.remove());
      document.querySelectorAll(`iframe[src*="${GHL_CHAT_WIDGET.ID}"]`).forEach((element) => element.remove());
    };
  }, [isPrivatePage]);

  return null;
};

export default GHLChatWidget;