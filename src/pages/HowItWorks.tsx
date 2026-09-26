import { useState, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Headphones,
  PhoneCall,
  MessageSquareText,
  CalendarCheck,
  PlugZap,
  Bot,
  ClipboardList,
  Workflow,
  CheckCircle,
  Languages,
  MessageCircleQuestion,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { AnimatedSection } from "@/hooks/use-scroll-animation";
import AudioTranscriptPlayer from "@/components/AudioTranscriptPlayer";
import { audioDemos } from "@/data/audioDemo";

interface WorkPart {
  title: string;
  plan: string;
  points: string[];
}

const asList = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);

const scrollToDemos = (event: MouseEvent<HTMLAnchorElement>) => {
  const target = document.getElementById("demo-calls");
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
};

const partIcons = [PhoneCall, MessageSquareText, CalendarCheck];
const operatedIcons = [Languages, MessageCircleQuestion];

const HowItWorks = () => {
  const { t } = useTranslation();
  const [selectedDemoId, setSelectedDemoId] = useState(audioDemos[0]?.id);
  const activeDemo = audioDemos.find((demo) => demo.id === selectedDemoId) ?? audioDemos[0];

  const parts = asList<WorkPart>(t("howItWorksPage.parts.items", { returnObjects: true }));
  const operatedPoints = asList<string>(t("home.operated.points", { returnObjects: true }));
  const steps = [
    { icon: PlugZap, title: t("home.how.step1Title"), description: t("home.how.step1Desc") },
    { icon: Bot, title: t("home.how.step2Title"), description: t("home.how.step2Desc") },
    { icon: ClipboardList, title: t("home.how.step3Title"), description: t("home.how.step3Desc") },
  ];

  return (
    <Layout>
      <SEO titleKey="howItWorksPage.seo.title" descriptionKey="howItWorksPage.seo.description" schemaType="WebPage" />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[hsl(266_45%_10%)] py-20 md:py-28 text-white">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/40 blur-3xl" aria-hidden="true" />
        <div className="container relative max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/80">
            <Workflow className="h-3.5 w-3.5" aria-hidden="true" />
            {t("howItWorksPage.hero.badge")}
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
            {t("howItWorksPage.hero.title")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">{t("howItWorksPage.hero.subtitle")}</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button size="lg" asChild className="h-auto min-h-[52px] whitespace-normal px-5 sm:px-7 py-3.5 text-sm sm:text-base leading-snug shadow-lg shadow-primary/30">
              <a href="#demo-calls" onClick={scrollToDemos}>
                <Headphones className="mr-2 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                {t("home.hero.ctaDemo")}
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="h-auto min-h-[52px] whitespace-normal px-5 sm:px-7 py-3.5 text-sm sm:text-base leading-snug bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white"
            >
              <Link to="/book-a-demo">{t("howItWorksPage.cta.book")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* The 3 steps */}
      <section className="py-20 md:py-28 bg-background" aria-labelledby="steps-title">
        <div className="container max-w-6xl">
          <AnimatedSection className="mx-auto mb-14 max-w-3xl text-center">
            <h2 id="steps-title" className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              {t("home.how.title")}
            </h2>
          </AnimatedSection>
          <ol className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="relative h-full rounded-3xl border border-border bg-card p-7 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <step.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="text-4xl font-black text-primary/15">0{index + 1}</span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-foreground">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What does the work */}
      <section className="py-20 md:py-28 bg-muted/30 border-y border-border" aria-labelledby="parts-title">
        <div className="container max-w-6xl">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">{t("howItWorksPage.parts.badge")}</span>
            <h2 id="parts-title" className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              {t("howItWorksPage.parts.title")}
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {parts.map((part, index) => {
              const Icon = partIcons[index] ?? BadgeCheck;
              return (
                <article key={part.title} className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-sm">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-xl font-bold text-foreground">{part.title}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary">{part.plan}</p>
                  <ul className="mt-5 space-y-3">
                    {part.points.map((point) => (
                      <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Demo calls */}
      <section id="demo-calls" className="scroll-mt-16 py-20 md:py-28 bg-background" aria-labelledby="demos-title">
        <div className="container max-w-4xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">{t("howItWorksPage.demos.badge")}</span>
            <h2 id="demos-title" className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              {t("howItWorksPage.demos.title")}
            </h2>
            <p className="mt-4 text-base text-muted-foreground">{t("howItWorksPage.demos.text")}</p>
          </div>
          {activeDemo && (
            <>
              <div className="flex flex-wrap justify-center gap-2 pb-4" role="tablist" aria-label="Demo call examples">
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
        </div>
      </section>

      {/* Ongoing support */}
      <section className="pb-20 md:pb-28 bg-background" aria-labelledby="operated-title">
        <div className="container max-w-6xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-[hsl(266_45%_10%)] px-6 py-12 sm:px-10 md:px-14 md:py-16 text-white">
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

      {/* Works with your tools */}
      <section className="pb-20 md:pb-28 bg-background" aria-labelledby="tools-title">
        <div className="container max-w-5xl text-center">
          <h2 id="tools-title" className="mx-auto max-w-3xl text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
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

      {/* Final CTA */}
      <section className="bg-primary py-20 md:py-24 text-primary-foreground">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">{t("howItWorksPage.cta.title")}</h2>
          <p className="mt-4 text-lg text-primary-foreground/80">{t("howItWorksPage.cta.text")}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild className="h-auto min-h-[52px] whitespace-normal bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Link to="/pricing">
                {t("howItWorksPage.cta.pricing")}
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="h-auto min-h-[52px] whitespace-normal bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <Link to="/book-a-demo">{t("howItWorksPage.cta.book")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HowItWorks;
