import { useState, useMemo, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Calculator, DollarSign, TrendingUp, ArrowRight, Sparkles, Plus, Minus, PhoneMissed, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Average number of weeks in a month (4.33), kept in hundredths so the math stays exact.
const WEEKS_PER_MONTH_X100 = 433;

const CALLS = { min: 0, max: 40, step: 1, initial: 5 };
const JOB_VALUE = { min: 100, max: 15000, step: 50, initial: 800 };
const RATE = { min: 5, max: 60, step: 5, initial: 20 };

const formatUSD = (value: number) => `$${value.toLocaleString("en-US")}`;
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const percentOf = (value: number, min: number, max: number) => ((value - min) / (max - min)) * 100;

interface SliderControlProps {
  icon: ReactNode;
  label: string;
  helper: string;
  valueLabel: string;
  value: number;
  min: number;
  max: number;
  step: number;
  minLabel: string;
  maxLabel: string;
  decreaseLabel: string;
  increaseLabel: string;
  onChange: (value: number) => void;
  testId: string;
}

const SliderControl = ({
  icon,
  label,
  helper,
  valueLabel,
  value,
  min,
  max,
  step,
  minLabel,
  maxLabel,
  decreaseLabel,
  increaseLabel,
  onChange,
  testId,
}: SliderControlProps) => {
  const fill = percentOf(value, min, max);
  return (
    <div className="bg-muted/40 p-5 rounded-2xl border border-border/60">
      <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
          <div>
            <label htmlFor={testId} className="text-sm font-bold text-foreground block">
              {label}
            </label>
            <span className="text-[11px] text-muted-foreground">{helper}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            type="button"
            onClick={() => onChange(clamp(value - step, min, max))}
            className="w-8 h-8 rounded-lg bg-background border border-border hover:bg-primary/10 hover:border-primary/40 text-foreground flex items-center justify-center transition-all font-bold cursor-pointer"
            aria-label={decreaseLabel}
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          <div className="px-3.5 py-1.5 bg-primary text-primary-foreground font-black text-sm rounded-xl min-w-[95px] text-center shadow-md shadow-primary/20">
            {valueLabel}
          </div>

          <button
            type="button"
            onClick={() => onChange(clamp(value + step, min, max))}
            className="w-8 h-8 rounded-lg bg-background border border-border hover:bg-primary/10 hover:border-primary/40 text-foreground flex items-center justify-center transition-all font-bold cursor-pointer"
            aria-label={increaseLabel}
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <input
        id={testId}
        data-testid={testId}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${fill}%, hsl(var(--muted)) ${fill}%, hsl(var(--muted)) 100%)`,
        }}
        className="w-full h-3 rounded-lg appearance-none cursor-pointer accent-primary border border-border/40"
      />

      <div className="flex justify-between text-xs text-muted-foreground mt-2 font-medium">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
};

interface MissedCallsCalculatorProps {
  className?: string;
}

export const MissedCallsCalculator = ({ className = "" }: MissedCallsCalculatorProps) => {
  const { t } = useTranslation();

  const [missedPerWeek, setMissedPerWeek] = useState<number>(CALLS.initial);
  const [jobValue, setJobValue] = useState<number>(JOB_VALUE.initial);
  const [recoveryRate, setRecoveryRate] = useState<number>(RATE.initial);

  // Owner decision (25/09/2026): no prices on the home page, so the calculator links to /pricing
  // instead of showing a payback figure.
  const { monthly, annual } = useMemo(() => {
    // missedPerWeek x 4.33 x (rate / 100) x jobValue, using integers to avoid floating point drift.
    const monthlyValue = Math.round((missedPerWeek * WEEKS_PER_MONTH_X100 * recoveryRate * jobValue) / 10000);
    return {
      monthly: monthlyValue,
      annual: monthlyValue * 12,
    };
  }, [missedPerWeek, jobValue, recoveryRate]);

  return (
    <section className={`py-20 bg-background relative overflow-hidden ${className}`}>
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>{t("calculator.badge")}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            {t("calculator.title")} <span className="text-primary">{t("calculator.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">{t("calculator.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs */}
          <div className="lg:col-span-7 bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col space-y-6">
            <SliderControl
              testId="calc-calls"
              icon={<PhoneMissed className="w-4 h-4" />}
              label={t("calculator.callsLabel")}
              helper={t("calculator.callsHelper")}
              valueLabel={t("calculator.callsValue", { count: missedPerWeek })}
              value={missedPerWeek}
              min={CALLS.min}
              max={CALLS.max}
              step={CALLS.step}
              minLabel={t("calculator.callsMin")}
              maxLabel={t("calculator.callsMax")}
              decreaseLabel={t("calculator.ariaDecreaseCalls")}
              increaseLabel={t("calculator.ariaIncreaseCalls")}
              onChange={setMissedPerWeek}
            />
            <SliderControl
              testId="calc-job-value"
              icon={<DollarSign className="w-4 h-4" />}
              label={t("calculator.jobLabel")}
              helper={t("calculator.jobHelper")}
              valueLabel={formatUSD(jobValue)}
              value={jobValue}
              min={JOB_VALUE.min}
              max={JOB_VALUE.max}
              step={JOB_VALUE.step}
              minLabel={formatUSD(JOB_VALUE.min)}
              maxLabel={formatUSD(JOB_VALUE.max)}
              decreaseLabel={t("calculator.ariaDecreaseJob")}
              increaseLabel={t("calculator.ariaIncreaseJob")}
              onChange={setJobValue}
            />
            <SliderControl
              testId="calc-rate"
              icon={<Percent className="w-4 h-4" />}
              label={t("calculator.rateLabel")}
              helper={t("calculator.rateHelper")}
              valueLabel={`${recoveryRate}%`}
              value={recoveryRate}
              min={RATE.min}
              max={RATE.max}
              step={RATE.step}
              minLabel={`${RATE.min}%`}
              maxLabel={`${RATE.max}%`}
              decreaseLabel={t("calculator.ariaDecreaseRate")}
              increaseLabel={t("calculator.ariaIncreaseRate")}
              onChange={setRecoveryRate}
            />
          </div>

          {/* Results */}
          <div className="lg:col-span-5 bg-card border-2 border-primary/40 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-primary/15 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-primary mb-6">
                <TrendingUp className="w-4 h-4" />
                <span>{t("calculator.resultHeader")}</span>
              </div>

              <div className="mb-6">
                <p className="text-xs text-muted-foreground mb-1 font-semibold">{t("calculator.monthlyLabel")}</p>
                <div className="text-4xl sm:text-5xl font-black text-primary tracking-tight" data-testid="calc-monthly">
                  {formatUSD(monthly)}
                  <span className="text-sm font-medium text-muted-foreground">/{t("calculator.month")}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 mb-6">
                <p className="text-xs text-primary font-bold mb-1">{t("calculator.annualLabel")}</p>
                <p className="text-2xl sm:text-3xl font-black text-foreground" data-testid="calc-annual">
                  {formatUSD(annual)} / {t("calculator.year")}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t("calculator.paybackHeader")}</span>
                </div>
                <p className="text-sm text-foreground font-semibold leading-snug" data-testid="calc-payback">
                  {missedPerWeek === 0 ? (
                    t("calculator.zeroPrompt")
                  ) : (
                    <>
                      {t("calculator.paybackPrompt")}{" "}
                      <Link to="/pricing" className="text-primary underline underline-offset-2 hover:no-underline">
                        {t("calculator.paybackLink")}
                      </Link>
                    </>
                  )}
                </p>
              </div>
            </div>

            <div>
              <Button
                asChild
                className="w-full h-auto min-h-[52px] py-3.5 px-4 sm:px-6 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm sm:text-base shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] cursor-pointer"
              >
                <Link to="/book-a-demo" className="flex items-center justify-center text-center gap-2 w-full">
                  <span className="leading-snug">{t("calculator.ctaButton")}</span>
                  <ArrowRight className="w-4 h-4 flex-shrink-0" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissedCallsCalculator;
