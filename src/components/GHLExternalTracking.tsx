import { useEffect } from "react";
import { GHL_EXTERNAL_TRACKING } from "@/lib/external-urls";

const SCRIPT_ID = "ghl-external-tracking";

/** GHL's site-wide tracking pixel, loaded once for the whole app. */
const GHLExternalTracking = () => {
  useEffect(() => {
    if (document.getElementById(SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = GHL_EXTERNAL_TRACKING.SCRIPT_URL;
    script.dataset.trackingId = GHL_EXTERNAL_TRACKING.TRACKING_ID;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return null;
};

export default GHLExternalTracking;
