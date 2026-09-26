import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Loader2, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buildLeadTags, normalizePhone, readUTMs } from "@/lib/ghl-field-mapping";

export type DemoPlan = "recover" | "front-office" | "not-sure";

export interface DemoLead {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
}

const TRADES = ["hvac", "plumbing", "roofing", "remodeling", "electrical", "cleaning", "landscaping", "other"] as const;
const PLANS: DemoPlan[] = ["recover", "front-office", "not-sure"];

interface DemoLeadFormProps {
  initialPlan: DemoPlan;
  onSubmitted: (lead: DemoLead) => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Step 1 of /book-a-demo: saves the lead in GHL before the calendar is shown. */
const DemoLeadForm = ({ initialPlan, onSubmitted }: DemoLeadFormProps) => {
  const { t } = useTranslation();
  const [values, setValues] = useState({ name: "", email: "", phone: "", company: "", trade: "", plan: initialPlan });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const set = (key: keyof typeof values) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValues((current) => ({ ...current, [key]: event.target.value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: "" }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const name = values.name.trim();
    const email = values.email.trim();
    const phone = normalizePhone(values.phone);
    const nextErrors: Record<string, string> = {};
    if (name.length < 2) nextErrors.name = t("contactForm.errors.nameTooShort");
    else if (name.split(/\s+/).length < 2) nextErrors.name = t("bookDemoPage.lead.errors.fullName");
    if (!values.company.trim()) nextErrors.company = t("bookDemoPage.lead.errors.company");
    if (!EMAIL_RE.test(email)) nextErrors.email = t("contactForm.errors.invalidEmail");
    if (!phone) nextErrors.phone = t("contactForm.errors.invalidPhone");
    if (!values.trade) nextErrors.trade = t("bookDemoPage.lead.errors.trade");
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setLoading(true);
    const source = `book-a-demo-${values.plan}`;
    const utms = readUTMs();
    const tags = [
      ...buildLeadTags({ source, path: window.location.pathname, ...utms }),
      "demo-request",
      `plan-${values.plan}`,
      `trade-${values.trade}`,
    ];
    const message = [
      `Demo request from the website.`,
      `Plan: ${t(`bookDemoPage.lead.plans.${values.plan}`)}`,
      `Trade: ${t(`bookDemoPage.lead.trades.${values.trade}`)}`,
    ].join("\n");

    // Saving the lead must never block the booking: if the CRM call fails, the calendar still
    // opens with the details pre-filled, and the booking itself creates the contact in GHL.
    try {
      // Give the CRM 8 seconds at most, then move on to the calendar.
      const { data, error } = await Promise.race([
        supabase.functions.invoke("ghl-upsert-contact", {
          body: { name, email, phone, company: values.company.trim(), message, source, tags, ...utms },
        }),
        new Promise<{ data: null; error: Error }>((resolve) =>
          setTimeout(() => resolve({ data: null, error: new Error("timeout") }), 8000),
        ),
      ]);
      if (error || !data?.success) console.warn("[book-a-demo] lead was not saved before booking", error ?? data);
    } catch (saveError) {
      console.warn("[book-a-demo] lead was not saved before booking", saveError);
    }

    if (typeof window.gtag === "function") {
      window.gtag("event", "generate_lead", { form: "book_a_demo", plan: values.plan, trade: values.trade });
    }

    const [firstName, ...rest] = name.split(/\s+/);
    onSubmitted({ firstName, lastName: rest.join(" "), email, phone: phone as string, company: values.company.trim() });
    setLoading(false);
  };

  const selectClass =
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <form onSubmit={onSubmit} noValidate className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-5" data-testid="demo-lead-form">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">{t("bookDemoPage.lead.step")}</p>
        <h2 className="mt-2 text-xl md:text-2xl font-bold text-foreground">{t("bookDemoPage.lead.title")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("bookDemoPage.lead.subtitle")}</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="demo-name">{t("bookDemoPage.lead.fullName")} *</Label>
          <Input id="demo-name" autoComplete="name" value={values.name} onChange={set("name")} disabled={loading} maxLength={120} aria-invalid={!!errors.name} />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="demo-company">{t("contactForm.company")} *</Label>
          <Input id="demo-company" autoComplete="organization" value={values.company} onChange={set("company")} disabled={loading} maxLength={200} aria-invalid={!!errors.company} />
          {errors.company && <p className="text-xs text-destructive">{errors.company}</p>}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="demo-email">Email *</Label>
          <Input id="demo-email" type="email" autoComplete="email" value={values.email} onChange={set("email")} disabled={loading} maxLength={255} aria-invalid={!!errors.email} />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="demo-phone">{t("contactForm.phone")} *</Label>
          <Input id="demo-phone" type="tel" autoComplete="tel" value={values.phone} onChange={set("phone")} disabled={loading} maxLength={40} aria-invalid={!!errors.phone} />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="demo-trade">{t("bookDemoPage.lead.trade")} *</Label>
          <select id="demo-trade" className={selectClass} value={values.trade} onChange={set("trade")} disabled={loading} aria-invalid={!!errors.trade}>
            <option value="" disabled>
              {t("bookDemoPage.lead.tradePlaceholder")}
            </option>
            {TRADES.map((trade) => (
              <option key={trade} value={trade}>
                {t(`bookDemoPage.lead.trades.${trade}`)}
              </option>
            ))}
          </select>
          {errors.trade && <p className="text-xs text-destructive">{errors.trade}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="demo-plan">{t("bookDemoPage.lead.plan")}</Label>
          <select id="demo-plan" className={selectClass} value={values.plan} onChange={set("plan")} disabled={loading}>
            {PLANS.map((plan) => (
              <option key={plan} value={plan}>
                {t(`bookDemoPage.lead.plans.${plan}`)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Button type="submit" size="lg" disabled={loading} className="w-full h-auto min-h-[52px] whitespace-normal text-base">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" /> {t("contactForm.sending")}
          </>
        ) : (
          <>
            {t("bookDemoPage.lead.submit")} <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </>
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
};

export default DemoLeadForm;
