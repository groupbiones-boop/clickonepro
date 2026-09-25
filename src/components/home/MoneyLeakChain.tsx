import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  PhoneMissed,
  FileQuestion,
  FileClock,
  CalendarX,
  Star,
  UserX,
  ChevronRight,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LeakStep {
  label: string;
  fix: string;
}

const ICONS: LucideIcon[] = [PhoneMissed, FileQuestion, FileClock, CalendarX, Star, UserX];

const asSteps = (value: unknown): LeakStep[] => (Array.isArray(value) ? (value as LeakStep[]) : []);

/**
 * "Where the money leaks": 6 steps. Hover, focus or tap a step to see how ClickOne fixes it.
 * The fix is shown in one shared panel (aria-live) so it works the same with mouse, touch and keyboard.
 */
export const MoneyLeakChain = () => {
  const { t } = useTranslation();
  const steps = asSteps(t("home.leak.steps", { returnObjects: true }));
  const [active, setActive] = useState(0);
  const current = steps[active];
  const ActiveIcon = ICONS[active] ?? Wrench;

  return (
    <section className="py-20 md:py-28 bg-muted/30 border-y border-border" aria-labelledby="leak-title">
      <div className="container max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-destructive/20 bg-destructive/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-destructive">
            {t("home.leak.badge")}
          </span>
          <h2 id="leak-title" className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            {t("home.leak.title")}
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground">{t("home.leak.subtitle")}</p>
        </div>

        <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-2">
          {steps.map((step, index) => {
            const Icon = ICONS[index] ?? Wrench;
            const isActive = index === active;
            return (
              <li key={step.label} className="relative flex">
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  aria-pressed={isActive}
                  aria-controls="leak-fix-panel"
                  data-testid={`leak-step-${index + 1}`}
                  className={cn(
                    "group flex w-full flex-col items-start gap-3 rounded-2xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    isActive
                      ? "border-primary bg-card shadow-lg shadow-primary/10"
                      : "border-border bg-card/70 hover:border-primary/40",
                  )}
                >
                  <div className="flex w-full items-center justify-between">
                    <span
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-xl transition-colors",
                        isActive ? "bg-primary text-primary-foreground" : "bg-destructive/10 text-destructive",
                      )}
                    >
                      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </span>
                    <span className="text-xs font-bold text-muted-foreground">0{index + 1}</span>
                  </div>
                  <span className="text-sm font-semibold leading-snug text-foreground">{step.label}</span>
                </button>
                {index < steps.length - 1 && (
                  <ChevronRight
                    className="pointer-events-none absolute -right-2.5 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 text-muted-foreground/60 lg:block"
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ol>

        {current && (
          <div
            id="leak-fix-panel"
            aria-live="polite"
            data-testid="leak-fix-panel"
            className="mt-6 flex flex-col gap-4 rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/5 via-card to-card p-6 sm:flex-row sm:items-center sm:p-8"
          >
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
              <ActiveIcon className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary">
                {t("home.leak.fixLabel")} · {current.label}
              </p>
              <p className="mt-1.5 text-base md:text-lg font-medium leading-relaxed text-foreground">{current.fix}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MoneyLeakChain;
