import { useState, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  CheckCircle,
  Headphones,
  PlugZap,
  Bot,
  ClipboardList,
  Languages,
  MessageCircleQuestion,
  ShieldCheck,
  PhoneOff,
  CalendarX,
  Workflow,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { AnimatedSection } from "@/hooks/use-scroll-animation";
import AudioTranscriptPlayer from "@/components/AudioTranscriptPlayer";
import { audioDemos } from "@/data/audioDemo";
import MissedCallsCalculator from "@/components/MissedCallsCalculator";
import { GEOFAQSection, getFAQItems } from "@/components/GEOFAQSection";
import MoneyLeakChain from "@/components/home/MoneyLeakChain";
import industryHvac from "@/assets/industry-hvac.jpg";
import industryHvacWebp from "@/assets/industry-hvac.webp";
import industryPlumbing from "@/assets/industry-plumbing-new.jpg";
import industryPlumbingWebp from "@/assets/industry-plumbing-new.webp";
import industryRoofing from "@/assets/industry-roofing.jpg";
import industryConstruction from "@/assets/industry-construction.jpg";
import industryConstructionWebp from "@/assets/industry-construction.webp";

// The demo recording shown when a visitor clicks "Hear our AI answer a call".
const HERO_DEMO = audioDemos.find((demo) => demo.id === "plumbing") ?? audioDemos[0];

const scrollToCalculator = (event: MouseEvent<HTMLAnchorElement>) => {
  const target = document.getElementById("calculator");
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
};

const asList = (value: unknown): string[] => (Array.isArray(value) ? (value as string[]) : []);

const Index = () => {
  const { t } = useTranslation();
  const [demoOpen, setDemoOpen] = useState(false);
  const [selectedDemoId, setSelectedDemoId] = useState(HERO_DEMO.id);
  const activeDemo = audioDemos.find((demo) => demo.id === selectedDemoId) ?? HERO_DEMO;

  const industries = [
    { name: t("home.industries.hvac"), slug: "hvac", image: industryHvac, webp: industryHvacWebp },
    { name: t("home.industries.plumbing"), slug: "encanamento", image: industryPlumbing, webp: industryPlumbingWebp },
    { name: t("home.industries.roofing"), slug: "telhados", image: industryRoofing, webp: undefined },
    { name: t("home.industries.remodeling"), slug: "construcao", image: industryConstruction, webp: industryConstructionWebp },
  ];

  const steps = [
    { icon: PlugZap, title: t("home.how.step1Title"), description: t("home.how.step1Desc") },
    { icon: Bot, title: t("home.how.step2Title"), description: t("home.how.step2Desc") },
    { icon: ClipboardList, title: t("home.how.step3Title"), description: t("home.how.step3Desc") },
  ];

  const operatedIcons = [Languages, MessageCircleQuestion];
  const operatedPoints = asList(t("home.operated.points", { returnObjects: true }));

  const trust = [t("home.hero.trust1"), t("home.hero.trust3")];

  const heroButtons = (variant: "hero" | "cta") => (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
      <Button
        size="lg"
        asChild
        className={
          variant === "hero"
            ? "group h-auto min-h-[52px] px-7 py-3.5 text-base shadow-lg shadow-primary/30"
            : "group h-auto min-h-[52px] px-7 py-3.5 text-base bg-primary-foreground text-primary hover:bg-primary-foreground/90"
        }
      >
        <a href="#calculator" onClick={scrollToCalculator} data-testid={`${variant}-cta-calculator`}>
          {t("home.hero.ctaCalculator")}
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </a>
      </Button>
      <Button
        size="lg"
        variant="outline"
        onClick={() => setDemoOpen(true)}
        data-testid={`${variant}-cta-demo`}
        className="h-auto min-h-[52px] whitespace-normal px-5 sm:px-7 py-3.5 text-sm sm:text-base leading-snug bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white hover:border-white/50 backdrop-blur-sm"
      >
        <Headphones className="mr-2 h-5 w-5 flex-shrink-0" aria-hidden="true" />
        {t("home.hero.ctaDemo")}
      </Button>
    </div>
  );

  return (
    <Layout>
      <SEO
        titleKey="seo.home.title"
        descriptionKey="seo.home.description"
        schemaType="Organization"
        additionalSchemas={[
          {
            type: "FAQPage",
            data: { faqItems: getFAQItems(t) },
          },
        ]}
      />

      {/* 1. Hero */}
      <section className="relative overflow-hidden min-h-[88vh] flex items-center py-20 md:py-28">
        <picture className="absolute inset-0 h-full w-full">
          <source
            type="image/webp"
            srcSet="/assets/hero-home-sm.webp 896w, /assets/hero-home-md.webp 1024w, /assets/hero-home-optimized.webp 1920w"
            sizes="100vw"
          />
          <img
            src="/assets/hero-home.jpg"
            alt={t("seo.home.heroAlt")}
            width={1920}
            height={1080}
            // Lowercase attribute: React 18 warns on the camelCase fetchPriority prop.
            {...{ fetchpriority: "high" }}
            decoding="sync"
            className="h-full w-full object-cover object-center"
          />
        </picture>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, hsla(266, 60%, 6%, 0.85) 0%, transparent 70%), linear-gradient(135deg, hsla(266, 60%, 7%, 0.94) 0%, hsla(266, 60%, 10%, 0.88) 55%, hsla(266, 86%, 30%, 0.7) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-primary/30 blur-3xl" aria-hidden="true" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px]" aria-hidden="true" />

        <div className="container relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs sm:text-sm font-medium text-white/90 backdrop-blur-sm">
              <span className="h-2 w-2 flex-shrink-0 rounded-full bg-emerald-400" aria-hidden="true" />
              {t("home.hero.eyebrow")}
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-white text-balance">
              {t("home.hero.title")}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-white/75">
              {t("home.hero.subtitle")}
            </p>
            <div className="mt-10">{heroButtons("hero")}</div>
            <ul className="mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/70">
              {trust.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 flex-shrink-0 text-emerald-400" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" aria-hidden="true" />
      </section>

      {/* 2. The problem, with a sourced number */}
      <section className="py-20 md:py-28 bg-background" aria-labelledby="problem-title">
        <div className="container max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimatedSection animation="fade-left">
              <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-destructive">
                <span className="h-[2px] w-8 bg-destructive" aria-hidden="true" />
                {t("home.problem.badge")}
              </span>
              <h2 id="problem-title" className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-foreground">
                {t("home.problem.title")}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {t("home.problem.text")} <span className="whitespace-nowrap">{t("home.problem.source")}</span>
              </p>
            </AnimatedSection>
            <AnimatedSection animation="fade-right" delay={150}>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { value: "52%", label: t("home.problem.stat1Label"), icon: PhoneOff },
                  { value: "55%", label: t("home.problem.stat2Label"), icon: CalendarX },
                ].map((stat) => (
                  <figure key={stat.value} className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
                    <stat.icon className="h-6 w-6 text-destructive" aria-hidden="true" />
                    <p className="mt-4 text-5xl md:text-6xl font-black tracking-tight text-foreground">{stat.value}</p>
                    <figcaption className="mt-3 text-sm leading-snug text-muted-foreground">
                      {stat.label}
                      <span className="mt-2 block text-xs font-medium text-muted-foreground/80">{t("home.problem.source")}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 3. Calculator (anchor target for the hero button) */}
      <div id="calculator" className="scroll-mt-16">
        <MissedCallsCalculator className="border-t border-border" />
      </div>

      {/* 4. Where the money leaks */}
      <MoneyLeakChain />

      {/* 5. How it works */}
      <section id="how-it-works" className="scroll-mt-16 py-20 md:py-28 bg-background" aria-labelledby="how-title">
        <div className="container max-w-6xl">
          <AnimatedSection className="mx-auto mb-14 max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <Workflow className="h-3.5 w-3.5" aria-hidden="true" />
              {t("home.how.badge")}
            </span>
            <h2 id="how-title" className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              {t("home.how.title")}
            </h2>
          </AnimatedSection>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <AnimatedSection key={step.title} animation="fade-up" delay={index * 100}>
                <div className="relative h-full rounded-3xl border border-border bg-card p-7 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <step.icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="text-4xl font-black text-primary/15">0{index + 1}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-foreground">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Two ways to start (no prices on the home page; prices live on /pricing) */}
      <section id="plans" className="scroll-mt-16 py-20 md:py-28 bg-muted/30 border-y border-border" aria-labelledby="plans-title">
        <div className="container max-w-5xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              {t("home.plansSection.badge")}
            </span>
            <h2 id="plans-title" className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              {t("home.plansSection.title")}
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">{t("home.plansSection.subtitle")}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { name: t("plans.recover.name"), desc: t("home.plansSection.recoverDesc"), highlighted: false },
              { name: t("plans.frontOffice.name"), desc: t("home.plansSection.frontOfficeDesc"), highlighted: true },
            ].map((plan) => (
              <article
                key={plan.name}
                data-testid="home-plan-teaser"
                className={
                  plan.highlighted
                    ? "relative rounded-3xl border-2 border-primary bg-card p-7 shadow-xl shadow-primary/10"
                    : "relative rounded-3xl border border-border bg-card p-7 shadow-sm"
                }
              >
                {plan.highlighted && (
                  <span className="absolute -top-3.5 left-7 inline-flex items-center rounded-full bg-primary px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
                    {t("home.plansSection.mostComplete")}
                  </span>
                )}
                <h3 className="text-2xl font-extrabold tracking-tight text-foreground">{plan.name}</h3>
                <p className="mt-3 text-sm md:text-base leading-relaxed text-muted-foreground">{plan.desc}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="h-auto min-h-[48px] px-7 py-3">
              <Link to="/pricing" data-testid="home-cta-pricing">
                {t("home.plansSection.ctaPricing")}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-auto min-h-[48px] px-7 py-3 border-primary/40 text-primary hover:bg-primary/5 hover:text-primary">
              <Link to="/book-a-demo">{t("home.plansSection.ctaDemo")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 7. Ongoing support ("You're never on your own") */}
      <section className="py-20 md:py-28 bg-background" aria-labelledby="operated-title">
        <div className="container max-w-6xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-[hsl(266_45%_10%)] px-6 py-12 sm:px-10 md:px-14 md:py-16 text-white">
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/40 blur-3xl" aria-hidden="true" />
            <div className="relative grid gap-10 lg:grid-cols-5 lg:items-center">
              <div className="lg:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/60">{t("home.operated.badge")}</span>
                <h2 id="operated-title" className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
                  {t("home.operated.title")}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-white/80">{t("home.operated.text")}</p>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
                {operatedPoints.map((point, index) => {
                  const Icon = operatedIcons[index] ?? BadgeCheck;
                  return (
                    <li key={point} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <Icon className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                      <p className="mt-3 text-sm leading-relaxed text-white/85">{point}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Works with your tools (text only, verified integrations) */}
      <section className="pb-20 md:pb-28 bg-background" aria-labelledby="tools-title">
        <div className="container max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <PlugZap className="h-3.5 w-3.5" aria-hidden="true" />
            {t("home.tools.badge")}
          </span>
          <h2 id="tools-title" className="mx-auto mt-4 max-w-3xl text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            {t("home.tools.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-muted-foreground">{t("home.tools.text")}</p>
          <div className="mt-10 grid gap-4 text-left sm:grid-cols-2">
            <div className="rounded-3xl border border-primary/30 bg-primary/5 p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-primary">{t("home.tools.officialLabel")}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {["Jobber", "Housecall Pro", "QuickBooks"].map((tool) => (
                  <li key={tool} className="rounded-full border border-primary/30 bg-card px-4 py-2 text-sm font-semibold text-foreground">
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("home.tools.automationLabel")}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {["ServiceTitan", "JobNimbus", "Roofr"].map((tool) => (
                  <li key={tool} className="rounded-full border border-border bg-muted/40 px-4 py-2 text-sm font-medium text-foreground">
                    {tool}
                  </li>
                ))}
                <li className="px-2 py-2 text-sm text-muted-foreground">{t("home.tools.andMore")}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Guarantee */}
      <section className="py-20 md:py-24 bg-muted/30 border-y border-border" aria-labelledby="guarantee-title">
        <div className="container max-w-4xl">
          <div className="flex flex-col items-center gap-6 rounded-[2rem] border-2 border-emerald-500/30 bg-card p-8 text-center shadow-lg sm:p-12">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="h-8 w-8" aria-hidden="true" />
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">{t("home.guarantee.badge")}</span>
              <h2 id="guarantee-title" className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                {t("home.guarantee.title")}
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-relaxed text-foreground">{t("home.guarantee.text")}</p>
          </div>
        </div>
      </section>

      {/* 10a. Industries highlight */}
      <section className="py-20 md:py-28 bg-background" aria-labelledby="industries-title">
        <div className="container max-w-6xl">
          <AnimatedSection className="mx-auto mb-12 max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              {t("home.industries.badge")}
            </span>
            <h2 id="industries-title" className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              {t("home.industries.title")}
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">{t("home.industries.subtitle")}</p>
          </AnimatedSection>
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {industries.map((industry, index) => (
              <AnimatedSection key={industry.slug} animation="fade-up" delay={index * 80}>
                <Link
                  to={`/setores/${industry.slug}`}
                  className="group block overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <picture>
                      {industry.webp && <source srcSet={industry.webp} type="image/webp" />}
                      <img
                        src={industry.image}
                        alt={industry.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                  </div>
                  <div className="flex items-center justify-between gap-2 p-4">
                    <h3 className="text-base md:text-lg font-bold text-foreground">{industry.name}</h3>
                    <ArrowRight className="h-4 w-4 flex-shrink-0 text-primary transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button variant="outline" asChild>
              <Link to="/setores">{t("home.industries.viewAll")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 10b. FAQ (also emitted as FAQPage JSON-LD) */}
      <GEOFAQSection className="border-t border-border" />

      {/* 10c. Final call to action */}
      <section className="relative overflow-hidden bg-primary py-20 md:py-24 text-primary-foreground">
        <div className="absolute -left-24 -bottom-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
        <div className="container relative text-center">
          <h2 className="mx-auto max-w-3xl text-3xl md:text-5xl font-extrabold tracking-tight text-balance">{t("home.finalCta.title")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">{t("home.finalCta.subtitle")}</p>
          <div className="mt-10">{heroButtons("cta")}</div>
        </div>
      </section>

      {/* Demo call player, opened by "Hear our AI answer a call" */}
      <Dialog open={demoOpen} onOpenChange={setDemoOpen}>
        <DialogContent className="w-[calc(100vw-2rem)] max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle>{t("home.hero.demoTitle")}</DialogTitle>
            <DialogDescription>{t("home.hero.demoSubtitle")}</DialogDescription>
          </DialogHeader>
          {demoOpen && (
            <>
              <div className="flex justify-center gap-2 pb-2" role="tablist" aria-label="Demo call examples">
                {audioDemos.map((demo) => (
                  <Button
                    key={demo.id}
                    type="button"
                    size="sm"
                    variant={demo.id === selectedDemoId ? "default" : "outline"}
                    role="tab"
                    aria-selected={demo.id === selectedDemoId}
                    onClick={() => setSelectedDemoId(demo.id)}
                  >
                    {demo.title}
                  </Button>
                ))}
              </div>
              <AudioTranscriptPlayer demo={activeDemo} />
            </>
          )}
          <div className="flex justify-center pt-2">
            <Button asChild>
              <Link to="/book-a-demo" onClick={() => setDemoOpen(false)}>
                {t("home.hero.demoCta")}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Index;
