import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Check, Info, ShieldCheck, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PlanId = "recover" | "frontOffice";

interface PlanConfig {
  id: PlanId;
  /** Value sent to /book-a-demo?plan=... (online checkout comes later). */
  slug: "recover" | "front-office";
  highlighted: boolean;
}

const PLANS: PlanConfig[] = [
  { id: "recover", slug: "recover", highlighted: false },
  { id: "frontOffice", slug: "front-office", highlighted: true },
];

const asList = (value: unknown): string[] => (Array.isArray(value) ? (value as string[]) : []);

interface PricingPlansProps {
  className?: string;
}

/**
 * The two ClickOne plans (Recover and Front Office). Used on the home page and on /pricing.
 * All copy lives in the `plans.*` translation keys so the 3 locales stay in sync.
 */
export const PricingPlans = ({ className = "" }: PricingPlansProps) => {
  const { t } = useTranslation();

  return (
    <div className={cn("max-w-5xl mx-auto", className)}>
      <div className="grid gap-8 md:grid-cols-2 items-stretch">
        {PLANS.map((plan) => {
          const features = asList(t(`plans.${plan.id}.features`, { returnObjects: true }));
          const excluded = asList(t(`plans.${plan.id}.excluded`, { returnObjects: true, defaultValue: [] }));
          const name = t(`plans.${plan.id}.name`);

          return (
            <article
              key={plan.id}
              aria-labelledby={`plan-${plan.slug}-name`}
              data-testid={`plan-${plan.slug}`}
              className={cn(
                "relative flex flex-col rounded-3xl border bg-card p-6 sm:p-8 transition-shadow",
                plan.highlighted
                  ? "border-primary border-2 shadow-2xl shadow-primary/15 md:-translate-y-2"
                  : "border-border shadow-sm hover:shadow-md",
              )}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-primary px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/30">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    {t("plans.mostComplete")}
                  </span>
                </div>
              )}

              <header className="mb-6">
                <h3 id={`plan-${plan.slug}-name`} className="text-2xl font-extrabold tracking-tight text-foreground">
                  {name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t(`plans.${plan.id}.tagline`)}</p>

                <div className="mt-6 flex items-end gap-1">
                  <span className="text-5xl font-black tracking-tight text-foreground">{t(`plans.${plan.id}.price`)}</span>
                  <span className="mb-1.5 text-base font-medium text-muted-foreground">{t("plans.perMonth")}</span>
                </div>
                <p className="mt-2 text-sm font-medium text-foreground">
                  {t(`plans.${plan.id}.setup`)}
                  <span className="mx-2 text-muted-foreground" aria-hidden="true">·</span>
                  <span className="text-primary">{t(`plans.${plan.id}.delivery`)}</span>
                </p>
              </header>

              <Button
                asChild
                size="lg"
                variant={plan.highlighted ? "default" : "outline"}
                className={cn(
                  "w-full h-auto min-h-[48px] py-3 text-base font-semibold whitespace-normal",
                  plan.highlighted
                    ? "shadow-lg shadow-primary/25"
                    : "border-primary/40 text-primary hover:bg-primary/5 hover:text-primary",
                )}
              >
                <Link to={`/book-a-demo?plan=${plan.slug}`} data-testid={`plan-${plan.slug}-cta`}>
                  {t(`plans.${plan.id}.cta`)}
                  <ArrowRight className="ml-2 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                </Link>
              </Button>

              <ul className="mt-8 space-y-3.5 flex-1">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm leading-snug text-foreground">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="sr-only">{t("plans.includedLabel")}: </span>
                      {feature}
                    </span>
                  </li>
                ))}
                {excluded.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm leading-snug text-muted-foreground">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-muted">
                      <X className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="sr-only">{t("plans.notIncludedLabel")}: </span>
                      <span className="line-through decoration-muted-foreground/50">{feature}</span>
                    </span>
                  </li>
                ))}
              </ul>

              {plan.id === "recover" && (
                <p className="mt-6 flex items-start gap-2.5 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs leading-relaxed text-foreground">
                  <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                  <span>{t("plans.smsNotice")}</span>
                </p>
              )}

              <p className="mt-4 flex items-start gap-2.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm leading-snug text-foreground">
                <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                <span>
                  <strong className="font-semibold">{t("plans.guaranteeLabel")}:</strong> {t(`plans.${plan.id}.guarantee`)}
                </span>
              </p>
            </article>
          );
        })}
      </div>

    </div>
  );
};

export default PricingPlans;
