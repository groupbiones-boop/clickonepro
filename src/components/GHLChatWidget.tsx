import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GHL_CHAT_WIDGET } from "@/lib/external-urls";

const SCRIPT_ID = "ghl-chat-widget-loader";
const CONTAINER_SELECTOR = `[data-chat-widget][data-widget-id="${GHL_CHAT_WIDGET.ID}"]`;

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

    return () => {
      document.querySelector(CONTAINER_SELECTOR)?.remove();
      document.getElementById(SCRIPT_ID)?.remove();
      document.querySelectorAll("chat-widget").forEach((element) => element.remove());
      document.querySelectorAll(`iframe[src*="${GHL_CHAT_WIDGET.ID}"]`).forEach((element) => element.remove());
    };
  }, [isPrivatePage]);

  return null;
};

export default GHLChatWidget;