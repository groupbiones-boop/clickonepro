import { useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Loader2, Send, CheckCircle2 } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2, "Nome muito curto").max(120),
  email: z.string().trim().email("Email inválido").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

function getUTMs() {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get("utm_source") || undefined,
    utm_medium: p.get("utm_medium") || undefined,
    utm_campaign: p.get("utm_campaign") || undefined,
  };
}

export default function ContactForm() {
  const { t } = useTranslation();
  const [values, setValues] = useState<FormValues>({
    name: "", email: "", phone: "", company: "", message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (k: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormValues, string>> = {};
      parsed.error.issues.forEach((i) => {
        const k = i.path[0] as keyof FormValues;
        if (!fieldErrors[k]) fieldErrors[k] = i.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ghl-upsert-contact", {
        body: { ...parsed.data, source: "contact-page", ...getUTMs() },
      });
      if (error || !data?.success) throw new Error(data?.error || error?.message || "Falha no envio");

      setSuccess(true);
      setValues({ name: "", email: "", phone: "", company: "", message: "" });
      toast({
        title: t("contact.form.successTitle", { defaultValue: "Mensagem enviada!" }),
        description: t("contact.form.successDesc", { defaultValue: "Entraremos em contato em breve." }),
      });
    } catch (err) {
      toast({
        title: t("contact.form.errorTitle", { defaultValue: "Erro ao enviar" }),
        description: err instanceof Error ? err.message : "Tente novamente.",
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
          {t("contact.form.successTitle", { defaultValue: "Mensagem enviada!" })}
        </h3>
        <p className="text-muted-foreground">
          {t("contact.form.successDesc", { defaultValue: "Um especialista vai te responder em breve." })}
        </p>
        <Button variant="outline" onClick={() => setSuccess(false)}>
          {t("contact.form.sendAnother", { defaultValue: "Enviar outra mensagem" })}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">{t("contact.form.name", { defaultValue: "Nome" })} *</Label>
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
          <Label htmlFor="phone">{t("contact.form.phone", { defaultValue: "Telefone" })}</Label>
          <Input id="phone" type="tel" value={values.phone} onChange={set("phone")} disabled={loading} maxLength={40} />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">{t("contact.form.company", { defaultValue: "Empresa" })}</Label>
          <Input id="company" value={values.company} onChange={set("company")} disabled={loading} maxLength={200} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">{t("contact.form.message", { defaultValue: "Mensagem" })}</Label>
        <Textarea id="message" value={values.message} onChange={set("message")} disabled={loading} rows={4} maxLength={2000} />
      </div>
      <Button type="submit" size="lg" disabled={loading} className="w-full text-lg py-6">
        {loading ? (
          <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> {t("contact.form.sending", { defaultValue: "Enviando..." })}</>
        ) : (
          <>{t("contact.form.submit", { defaultValue: "Enviar mensagem" })} <Send className="ml-2 h-5 w-5" /></>
        )}
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        {t("contact.form.disclaimer", { defaultValue: "Ao enviar, você concorda em receber contato da equipe ClickOne." })}
      </p>
    </form>
  );
}
