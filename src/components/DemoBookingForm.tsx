import { useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { CalendarCheck2, CheckCircle2, Loader2, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const phoneRegex = /^\+?[1-9][\d\s().-]{7,20}$/;

const schema = z.object({
  name: z.string().trim().min(2, "Nome muito curto").max(120),
  email: z.string().trim().email("Email inválido").max(255),
  phone: z
    .string()
    .trim()
    .max(40)
    .regex(phoneRegex, "Telefone inválido (use formato internacional, ex: +1 555 123 4567)"),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  preferredDate: z.string().trim().min(1, "Escolha uma data"),
  preferredTime: z.string().trim().min(1, "Escolha um horário"),
  message: z.string().trim().max(1200).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

function getUTMs() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") || undefined,
    utm_medium: params.get("utm_medium") || undefined,
    utm_campaign: params.get("utm_campaign") || undefined,
  };
}

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  preferredDate: "",
  preferredTime: "",
  message: "",
};

export default function DemoBookingForm() {
  const { t } = useTranslation();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (field: keyof FormValues) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = schema.safeParse(values);

    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormValues, string>> = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormValues;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const payload = parsed.data;
      const message = [
        `Preferred demo date: ${payload.preferredDate}`,
        `Preferred demo time: ${payload.preferredTime}`,
        payload.message && `Notes: ${payload.message}`,
      ].filter(Boolean).join("\n");

      const { data, error } = await supabase.functions.invoke("ghl-upsert-contact", {
        body: {
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          company: payload.company,
          message,
          source: "demo-booking-page",
          ...getUTMs(),
        },
      });

      if (error || !data?.success) throw new Error(data?.error || error?.message || "Falha ao solicitar agendamento");

      setSuccess(true);
      setValues(initialValues);
      toast({
        title: t("agendarDemo.form.successTitle", { defaultValue: "Solicitação recebida" }),
        description: t("agendarDemo.form.successDesc", { defaultValue: "Seu contato foi registrado. Vamos confirmar o melhor horário com você." }),
      });
    } catch (err) {
      toast({
        title: t("agendarDemo.form.errorTitle", { defaultValue: "Erro ao agendar" }),
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
          {t("agendarDemo.form.successTitle", { defaultValue: "Solicitação recebida" })}
        </h3>
        <p className="text-muted-foreground max-w-xl">
          {t("agendarDemo.form.successDesc", { defaultValue: "Seu contato foi registrado. Vamos confirmar o melhor horário com você." })}
        </p>
        <Button variant="outline" onClick={() => setSuccess(false)}>
          {t("agendarDemo.form.sendAnother", { defaultValue: "Enviar outra solicitação" })}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-5">
      <div className="flex items-center gap-3 pb-2">
        <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
          <CalendarCheck2 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">
            {t("agendarDemo.form.title", { defaultValue: "Agendar demo" })}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("agendarDemo.form.subtitle", { defaultValue: "Informe seus dados e o melhor horário." })}
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="demo-name">{t("contact.form.name", { defaultValue: "Nome" })} *</Label>
          <Input id="demo-name" value={values.name} onChange={set("name")} disabled={loading} required maxLength={120} />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="demo-email">Email *</Label>
          <Input id="demo-email" type="email" value={values.email} onChange={set("email")} disabled={loading} required maxLength={255} />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="demo-phone">{t("contact.form.phone", { defaultValue: "Telefone" })} *</Label>
          <Input id="demo-phone" type="tel" value={values.phone} onChange={set("phone")} disabled={loading} required maxLength={40} />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="demo-company">{t("contact.form.company", { defaultValue: "Empresa" })}</Label>
          <Input id="demo-company" value={values.company} onChange={set("company")} disabled={loading} maxLength={200} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="demo-date">{t("agendarDemo.form.date", { defaultValue: "Data preferida" })} *</Label>
          <Input id="demo-date" type="date" value={values.preferredDate} onChange={set("preferredDate")} disabled={loading} required />
          {errors.preferredDate && <p className="text-xs text-destructive">{errors.preferredDate}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="demo-time">{t("agendarDemo.form.time", { defaultValue: "Horário preferido" })} *</Label>
          <Input id="demo-time" type="time" value={values.preferredTime} onChange={set("preferredTime")} disabled={loading} required />
          {errors.preferredTime && <p className="text-xs text-destructive">{errors.preferredTime}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="demo-message">{t("contact.form.message", { defaultValue: "Mensagem" })}</Label>
        <Textarea id="demo-message" value={values.message} onChange={set("message")} disabled={loading} rows={4} maxLength={1200} />
      </div>

      <Button type="submit" size="lg" disabled={loading} className="w-full min-h-[56px] text-lg">
        {loading ? (
          <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> {t("contact.form.sending", { defaultValue: "Enviando..." })}</>
        ) : (
          <>{t("agendarDemo.form.submit", { defaultValue: "Solicitar agendamento" })} <Send className="ml-2 h-5 w-5" /></>
        )}
      </Button>
    </form>
  );
}