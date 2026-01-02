import { useEffect } from "react";

const ChatWidget = () => {
  useEffect(() => {
    if (document.getElementById("ghl-chat-widget")) return;

    const script = document.createElement("script");
    script.id = "ghl-chat-widget";
    script.src = "https://beta.leadconnectorhq.com/loader.js";
    script.setAttribute("data-resources-url", "https://beta.leadconnectorhq.com/chat-widget/loader.js");
    script.setAttribute("data-widget-id", "6958160ae056feed599822d0");
    script.async = true;
    
    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById("ghl-chat-widget");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null;
};

export default ChatWidget;
