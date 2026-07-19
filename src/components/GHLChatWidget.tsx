import { useEffect } from "react";

const WIDGET_ID = "689a6e0381758b3ba63c1230";
const LOCATION_ID = "yUk5li3I0wg4YGcbKlSF";
const LOADER_SRC = "https://widgets.leadconnectorhq.com/loader.js";

/**
 * Embeds the GoHighLevel chat widget inline.
 * Loads the loader script once and mounts the widget container.
 */
const GHLChatWidget = () => {
  useEffect(() => {
    if (document.querySelector(`script[src="${LOADER_SRC}"]`)) return;
    const s = document.createElement("script");
    s.src = LOADER_SRC;
    s.async = true;
    s.setAttribute("data-resources-url", "https://widgets.leadconnectorhq.com/chat-widget/loader.js");
    s.setAttribute("data-widget-id", WIDGET_ID);
    document.body.appendChild(s);
  }, []);

  return (
    <div className="w-full rounded-xl border border-border bg-card p-4 md:p-6 min-h-[560px]">
      <div
        data-chat-widget
        data-widget-id={WIDGET_ID}
        data-location-id={LOCATION_ID}
      />
    </div>
  );
};

export default GHLChatWidget;
