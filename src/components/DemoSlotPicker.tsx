import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { CalendarCheck, Loader2, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { CONTACT_INFO } from "@/lib/external-urls";
import type { DemoLead } from "@/components/DemoLeadForm";

/**
 * Step 2 of /book-a-demo: our own slot picker. It reads free slots from the GHL "ClickOne AI Demo"
 * calendar through the ghl-demo-booking edge function and books in one click, so the visitor never
 * sees the GHL widget (its details form and Cloudflare check).
 */

type SlotsByDay = Record<string, string[]>;
type Status = "loading" | "ready" | "empty" | "error" | "booking" | "booked";

const visitorTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone || "America/New_York";

/** Regroups GHL's Eastern-time days by the visitor's own calendar date (YYYY-MM-DD). */
const groupByLocalDay = (byEasternDay: SlotsByDay, tz: string): SlotsByDay => {
  const key = new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" });
  const out: SlotsByDay = {};
  for (const iso of Object.values(byEasternDay).flat().sort((a, b) => Date.parse(a) - Date.parse(b))) {
    const d = key.format(new Date(iso));
    (out[d] ??= []).push(iso);
  }
  return out;
};

const DemoSlotPicker = ({ lead }: { lead: DemoLead }) => {
  const { t, i18n } = useTranslation();
  const [status, setStatus] = useState<Status>("loading");
  const [slots, setSlots] = useState<SlotsByDay>({});
  const [day, setDay] = useState<string | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const tz = useMemo(visitorTimeZone, []);
  const locale = i18n.language || "en-US";
  const bookedHeading = useRef<HTMLHeadingElement>(null);

  const loadSlots = async () => {
    setStatus("loading");
    const { data, error } = await supabase.functions.invoke("ghl-demo-booking", { body: { action: "slots" } });
    if (error || !data?.success) {
      setStatus("error");
      return;
    }
    const next = groupByLocalDay((data.slots ?? {}) as SlotsByDay, tz);
    const days = Object.keys(next).sort();
    setSlots(next);
    setDay((current) => (current && next[current] ? current : days[0] ?? null));
    setStatus(days.length ? "ready" : "empty");
  };

  useEffect(() => {
    void loadSlots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Screen readers and keyboard users land on the confirmation instead of losing focus.
  useEffect(() => {
    if (status === "booked") bookedHeading.current?.focus();
  }, [status]);

  const fmtDay = (iso: string) =>
    new Date(iso).toLocaleDateString(locale, { weekday: "short", month: "short", day: "numeric", timeZone: tz });
  const fmtTime = (iso: string) => new Date(iso).toLocaleTimeString(locale, { hour: "numeric", minute: "2-digit", timeZone: tz });
  const fmtWhen = (iso: string) =>
    new Date(iso).toLocaleString(locale, {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: tz,
      timeZoneName: "short",
    });

  const book = async () => {
    if (!picked) return;
    setStatus("booking");
    setNotice(null);
    const name = [lead.firstName, lead.lastName].filter(Boolean).join(" ");
    const { data, error } = await supabase.functions.invoke("ghl-demo-booking", {
      body: { action: "book", startTime: picked, name, email: lead.email, phone: lead.phone, company: lead.company },
    });
    if (!error && data?.success) {
      setStatus("booked");
      if (typeof window.gtag === "function") window.gtag("event", "book_demo", { form: "book_a_demo" });
      return;
    }
    // supabase-js reports non-2xx as `error`, with the fetch Response in `context`.
    let reason: string | undefined = data?.error;
    const ctx = (error as { context?: Response } | null)?.context;
    if (!reason && ctx && typeof ctx.json === "function") {
      reason = await ctx
        .json()
        .then((b: { error?: string }) => b?.error)
        .catch(() => undefined);
    }
    if (reason === "already_booked") {
      setNotice(t("bookDemoPage.slots.alreadyBooked", { email: lead.email }));
      setStatus("ready");
      setPicked(null);
      return;
    }
    setNotice(reason === "slot_taken" ? t("bookDemoPage.slots.taken") : t("bookDemoPage.slots.failed"));
    setPicked(null);
    await loadSlots();
  };

  const card = "bg-card border border-border rounded-2xl p-6 md:p-8";

  if (status === "booked" && picked) {
    return (
      <div className={card} data-testid="demo-booked" role="status">
        <CalendarCheck className="h-10 w-10 text-primary" aria-hidden="true" />
        <h2 ref={bookedHeading} tabIndex={-1} className="mt-4 text-xl md:text-2xl font-bold text-foreground outline-none">
          {t("bookDemoPage.slots.bookedTitle", { name: lead.firstName })}
        </h2>
        <p className="mt-3 text-base text-foreground">{t("bookDemoPage.slots.bookedWhen", { when: fmtWhen(picked) })}</p>
        <p className="mt-2 text-sm text-muted-foreground">{t("bookDemoPage.slots.bookedEmail", { email: lead.email })}</p>
      </div>
    );
  }

  return (
    <div className={card} data-testid="demo-slot-picker">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">{t("bookDemoPage.lead.step2")}</p>
      <h2 className="mt-2 text-xl md:text-2xl font-bold text-foreground">
        {t("bookDemoPage.lead.calendarTitle", { name: lead.firstName })}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">{t("bookDemoPage.slots.timezone", { tz: tz.replace(/_/g, " ") })}</p>

      {notice && (
        <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive" role="alert">
          {notice}
        </p>
      )}

      {status === "loading" && (
        <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground" role="status">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          {t("bookDemoPage.slots.loading")}
        </div>
      )}

      {(status === "error" || status === "empty") && (
        <div className="mt-6 space-y-4">
          <p className="text-sm text-foreground">
            {status === "error" ? t("bookDemoPage.slots.error") : t("bookDemoPage.slots.empty")}
          </p>
          <div className="flex flex-wrap gap-3">
            {status === "error" && (
              <Button variant="outline" onClick={() => void loadSlots()}>
                {t("bookDemoPage.slots.retry")}
              </Button>
            )}
            <Button asChild>
              <a href={CONTACT_INFO.PHONE_HREF}>
                <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                {CONTACT_INFO.PHONE}
              </a>
            </Button>
          </div>
        </div>
      )}

      {(status === "ready" || status === "booking") && day && (
        <>
          <div className="mt-6 flex gap-2 overflow-x-auto pb-2" role="group" aria-label={t("bookDemoPage.slots.days")}>
            {Object.keys(slots)
              .sort()
              .map((d) => (
                <button
                  key={d}
                  type="button"
                  aria-pressed={d === day}
                  onClick={() => {
                    setDay(d);
                    setPicked(null);
                  }}
                  disabled={status === "booking"}
                  className={`shrink-0 rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
                    d === day ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:border-primary"
                  }`}
                >
                  {fmtDay(slots[d][0])}
                </button>
              ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {slots[day].map((iso) => (
              <button
                key={iso}
                type="button"
                onClick={() => setPicked(iso)}
                disabled={status === "booking"}
                aria-pressed={picked === iso}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                  picked === iso ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-foreground hover:border-primary"
                }`}
              >
                {fmtTime(iso)}
              </button>
            ))}
          </div>

          <Button className="mt-6 h-auto min-h-11 w-full whitespace-normal py-3" size="lg" disabled={!picked || status === "booking"} onClick={() => void book()}>
            {status === "booking" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                {t("bookDemoPage.slots.booking")}
              </>
            ) : picked ? (
              t("bookDemoPage.slots.confirm", { when: `${fmtDay(picked)}, ${fmtTime(picked)}` })
            ) : (
              t("bookDemoPage.slots.pick")
            )}
          </Button>
        </>
      )}
    </div>
  );
};

export default DemoSlotPicker;
