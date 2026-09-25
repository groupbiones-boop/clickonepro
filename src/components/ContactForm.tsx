import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import {
  contactFormSchema,
  buildLeadTags,
  readUTMs,
  type ContactFormValues,
} from "@/lib/ghl-field-mapping";

interface ContactFormProps {
  /** Logical source label (becomes a `src-...` tag in GHL). Defaults to "contact-page". */
  source?: string;
  /** Optional text to prefill the message field (for example, the plan picked on /pricing). */
  initialMessage?: string;
}

export default function ContactForm({ source = "contact-page", initialMessage = "" }: ContactFormProps) {
  const { t } = useTranslation();
  const [values, setValues] = useState<ContactFormValues>({
    name: "", email: "", phone: "", company: "", message: initialMessage,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (k: keyof ContactFormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Client-side validation before hitting the edge function
    const parsed = contactFormSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof ContactFormValues, string>> = {};
      parsed.error.issues.forEach((i) => {
        const k = i.path[0] as keyof ContactFormValues;
        if (!fieldErrors[k]) fieldErrors[k] = t(`contactForm.errors.${i.message}`, { defaultValue: t("contactForm.errors.generic") });
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const utms = readUTMs();
      const path = typeof window !== "undefined" ? window.location.pathname : undefined;
      const tags = buildLeadTags({ source, path, ...utms });

      const { data, error } = await supabase.functions.invoke("ghl-upsert-contact", {
        body: { ...parsed.data, source, tags, ...utms },
      });
      if (error || !data?.success) throw new Error("send_failed");

      setSuccess(true);
      setValues({ name: "", email: "", phone: "", company: "", message: "" });
      toast({
        title: t("contactForm.successTitle"),
        description: t("contactForm.successDesc"),
      });
    } catch {
      toast({
        title: t("contactForm.errorTitle"),
        description: t("contactForm.errors.sendFailed"),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-card border border-border rounded-2xl p-8 text-center flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold">
          {t("contactForm.successTitle")}
        </h3>
        <p className="text-muted-foreground">
          {t("contactForm.successDesc")}
        </p>
        <Button variant="outline" onClick={() => setSuccess(false)}>
          {t("contactForm.sendAnother")}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">{t("contactForm.name")} *</Label>
          <Input id="name" value={values.name} onChange={set("name")} disabled={loading} required maxLength={120} />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" value={values.email} onChange={set("email")} disabled={loading} required maxLength={255} />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">{t("contactForm.phone")}</Label>
          <Input id="phone" type="tel" value={values.phone} onChange={set("phone")} disabled={loading} maxLength={40} />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">{t("contactForm.company")}</Label>
          <Input id="company" value={values.company} onChange={set("company")} disabled={loading} maxLength={200} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">{t("contactForm.message")}</Label>
        <Textarea id="message" value={values.message} onChange={set("message")} disabled={loading} rows={4} maxLength={2000} />
      </div>
      <Button type="submit" size="lg" disabled={loading} className="w-full text-lg py-6">
        {loading ? (
          <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> {t("contactForm.sending")}</>
        ) : (
          <>{t("contactForm.submit")} <Send className="ml-2 h-5 w-5" /></>
        )}
      </Button>
      <p className="text-xs leading-relaxed text-muted-foreground" data-testid="sms-consent">
        {t("contactForm.smsConsent")}{" "}
        <Link to="/privacy-policy" className="underline underline-offset-2 hover:text-foreground">
          {t("contactForm.privacyLink")}
        </Link>
        .
      </p>
    </form>
  );
}
