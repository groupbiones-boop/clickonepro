import { useEffect, useRef } from "react";

const ChatWidget = () => {
  const loadedRef = useRef(false);

  useEffect(() => {
    const loadChat = () => {
      if (loadedRef.current || document.getElementById("ghl-chat-widget")) return;
      loadedRef.current = true;

      const script = document.createElement("script");
      script.id = "ghl-chat-widget";
      script.src = "https://beta.leadconnectorhq.com/loader.js";
      script.setAttribute("data-resources-url", "https://beta.leadconnectorhq.com/chat-widget/loader.js");
      script.setAttribute("data-widget-id", "6958160ae056feed599822d0");
      script.async = true;
      document.body.appendChild(script);
    };

    // Defer loading: use requestIdleCallback or fallback to 5s timeout
    let timeoutId: ReturnType<typeof setTimeout>;
    
    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(loadChat, { timeout: 5000 });
      return () => window.cancelIdleCallback(idleId);
    } else {
      timeoutId = setTimeout(loadChat, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, []);

  return null;
};

export default ChatWidget;
