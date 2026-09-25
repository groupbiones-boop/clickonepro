import { useEffect } from "react";
import { GHL_CONTACT_FORM } from "@/lib/external-urls";

const SCRIPT_ID = "ghl-form-embed-loader";

/** GoHighLevel-hosted "Formulário de Contato ClickOne AI" form, embedded inline. */
const GHLContactFormEmbed = () => {
  useEffect(() => {
    if (document.getElementById(SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = GHL_CONTACT_FORM.EMBED_SCRIPT_URL;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <iframe
      src={GHL_CONTACT_FORM.EMBED_URL}
      style={{ width: "100%", height: `${GHL_CONTACT_FORM.HEIGHT}px`, border: "none", borderRadius: "4px" }}
      id={`inline-${GHL_CONTACT_FORM.ID}`}
      data-layout="{'id':'INLINE'}"
      data-trigger-type="alwaysShow"
      data-trigger-value=""
      data-activation-type="alwaysActivated"
      data-activation-value=""
      data-deactivation-type="neverDeactivate"
      data-deactivation-value=""
      data-form-name="Formulário de Contato ClickOne AI"
      data-height={GHL_CONTACT_FORM.HEIGHT}
      data-layout-iframe-id={`inline-${GHL_CONTACT_FORM.ID}`}
      data-form-id={GHL_CONTACT_FORM.ID}
      data-cookie-consent="true"
      data-cookie-consent-provider="auto"
      title="Formulário de Contato ClickOne AI"
    />
  );
};

export default GHLContactFormEmbed;
