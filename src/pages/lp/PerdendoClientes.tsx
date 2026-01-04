import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { 
  Phone, 
  PhoneOff, 
  Clock, 
  DollarSign, 
  Users, 
  Calendar,
  MessageSquare,
  CheckCircle,
  TrendingUp,
  Headphones,
  Zap,
  Shield,
  Star,
  ArrowRight,
  Smartphone,
  Timer,
  UserCheck,
  BellOff,
  Briefcase,
  CalendarCheck,
  Heart,
  Brain,
  Mic
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SEO from "@/components/SEO";
import LPHeader from "@/components/layout/LPHeader";
import LPFloatingCTA from "@/components/LPFloatingCTA";
import Footer from "@/components/layout/Footer";
import { AnimatedSection } from "@/hooks/use-scroll-animation";
import { AnimatedCounter } from "@/hooks/use-count-animation";
import { supabase } from "@/integrations/supabase/client";
import { useLPImages } from "@/hooks/use-lp-images";

// Social proof logos
import logoClutch from "@/assets/logo-clutch.svg";
import logoG2 from "@/assets/logo-g2.svg";
import logoCapterra from "@/assets/logo-capterra.svg";
import logoTrustpilot from "@/assets/logo-trustpilot.svg";

// Industry images
import industryCleaning from "@/assets/industry-cleaning-new.jpg";
import industryHvac from "@/assets/industry-hvac.jpg";
import industryPlumbing from "@/assets/industry-plumbing-new.jpg";
import industryConstruction from "@/assets/industry-construction.jpg";
import industryPestControl from "@/assets/industry-pest-control.jpg";
import industryMedical from "@/assets/industry-medical-clinic.jpg";

// Mobile app
import mobileApp from "@/assets/mobile-app-clickone.jpg";

const GHL_DEMO_URL = "https://api.leadconnectorhq.com/widget/booking/MPXMwtJNT8r70fFVkpXS";

const PerdendoClientes = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { images } = useLPImages();

  // Get UTM params from URL
  const getUTMParams = () => {
    const searchParams = new URLSearchParams(location.search);
    return {
      utm_source: searchParams.get("utm_source") || undefined,
      utm_medium: searchParams.get("utm_medium") || undefined,
      utm_campaign: searchParams.get("utm_campaign") || undefined,
    };
  };

  // Track CTA click
  const trackCtaClick = async (ctaLocation: string) => {
    const utmParams = getUTMParams();
    try {
      await supabase.from("analytics_events").insert({
        event_type: "lp_cta_click",
        page_path: location.pathname,
        page_title: "LP Perdendo Clientes",
        session_id: sessionStorage.getItem("session_id") || crypto.randomUUID(),
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
      });
    } catch (error) {
      console.error("Error tracking CTA click:", error);
    }
  };

  const handleCtaClick = (ctaLocation: string) => {
    trackCtaClick(ctaLocation);
    window.open(GHL_DEMO_URL, "_blank");
  };

  const industries = [
    { image: industryCleaning, key: "cleaning" },
    { image: industryHvac, key: "hvac" },
    { image: industryPlumbing, key: "plumbing" },
    { image: industryConstruction, key: "construction" },
    { image: industryPestControl, key: "pestControl" },
    { image: industryMedical, key: "medicalClinic" },
  ];

  const proofLogos = [
    { src: logoClutch, alt: "Clutch", rating: "4.8" },
    { src: logoG2, alt: "G2", rating: "4.9" },
    { src: logoCapterra, alt: "Capterra", rating: "4.8" },
    { src: logoTrustpilot, alt: "Trustpilot", rating: "4.3" },
  ];

  return (
    <>
      <SEO
        title={t("lp.perdendoClientes.seo.title")}
        description={t("lp.perdendoClientes.seo.description")}
        ogImage="https://clickone.ai/og-lp-perdendo-clientes.jpg"
      />

      <LPHeader onCtaClick={() => trackCtaClick("header")} />
      <LPFloatingCTA onCtaClick={() => trackCtaClick("floating")} />

      <main className="min-h-screen bg-background">
        {/* Section 1: Hero */}
        <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <AnimatedSection className="text-center md:text-left">
                <Badge variant="secondary" className="mb-6 text-sm px-4 py-2">
                  {t("lp.perdendoClientes.hero.badge")}
                </Badge>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                  {t("lp.perdendoClientes.hero.title")}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                  {t("lp.perdendoClientes.hero.subtitle")}
                </p>
                <Button
                  size="lg"
                  onClick={() => handleCtaClick("hero")}
                  className="w-full sm:w-auto text-lg px-8 py-6 font-semibold"
                >
                  {t("lp.perdendoClientes.hero.cta")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </AnimatedSection>
              
              {images.hero && (
                <AnimatedSection delay={200} className="hidden md:block">
                  <img
                    src={images.hero}
                    alt="Empresário com chamadas perdidas"
                    className="w-full rounded-2xl shadow-2xl"
                    loading="lazy"
                  />
                </AnimatedSection>
              )}
            </div>
          </div>
        </section>

        {/* Section 2: Hook Emocional */}
        <section className="py-12 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {images["hook-phone"] && (
                <AnimatedSection className="order-2 md:order-1">
                  <img
                    src={images["hook-phone"]}
                    alt="Celular com notificações perdidas"
                    className="w-full max-w-md mx-auto rounded-2xl shadow-xl"
                    loading="lazy"
                  />
                </AnimatedSection>
              )}
              
              <AnimatedSection className={`text-center ${images["hook-phone"] ? "md:text-left order-1 md:order-2" : ""}`}>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-6">
                  <PhoneOff className="h-8 w-8 text-destructive" />
                </div>
                <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-6">
                  {t("lp.perdendoClientes.hook.title")}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("lp.perdendoClientes.hook.text")}
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Section 3: O Dia a Dia */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                {t("lp.perdendoClientes.dayInLife.title")}
              </h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              {images["daily-worker"] && (
                <AnimatedSection className="hidden md:block">
                  <img
                    src={images["daily-worker"]}
                    alt="Profissional de serviços trabalhando"
                    className="w-full rounded-2xl shadow-xl sticky top-24"
                    loading="lazy"
                  />
                </AnimatedSection>
              )}
              
              <div className={images["daily-worker"] ? "" : "max-w-2xl mx-auto"}>
                {[
                  { time: "5:30", icon: Clock, key: "item1" },
                  { time: "6:30", icon: Briefcase, key: "item2" },
                  { time: "7:00-18:00", icon: Users, key: "item3" },
                  { time: "18:30", icon: BellOff, key: "item4" },
                  { time: "19:00", icon: PhoneOff, key: "item5" },
                ].map((item, index) => (
                  <AnimatedSection key={item.key} delay={index * 100}>
                    <div className="flex items-start gap-4 mb-6 last:mb-0">
                      <div className="flex-shrink-0 w-20 text-right">
                        <span className="text-sm font-bold text-primary">{item.time}</span>
                      </div>
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 pb-6 border-l-2 border-border pl-4 -ml-5">
                        <p className="text-muted-foreground">
                          {t(`lp.perdendoClientes.dayInLife.${item.key}`)}
                        </p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}

                <AnimatedSection delay={500}>
                  <Card className="mt-8 border-destructive/20 bg-destructive/5">
                    <CardContent className="p-6 text-center">
                      <p className="text-foreground font-medium">
                        {t("lp.perdendoClientes.dayInLife.conclusion")}
                      </p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: O Verdadeiro Problema + CTA */}
        <section className="py-12 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                {t("lp.perdendoClientes.problem.title")}
              </h2>
            </AnimatedSection>

            {images["problem-stats"] && (
              <AnimatedSection className="max-w-2xl mx-auto mb-10">
                <img
                  src={images["problem-stats"]}
                  alt="Impacto financeiro"
                  className="w-full rounded-xl shadow-lg"
                  loading="lazy"
                />
              </AnimatedSection>
            )}

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
              <AnimatedSection delay={0}>
                <Card className="text-center h-full">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                      <PhoneOff className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                      <AnimatedCounter end={80} suffix="%" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t("lp.perdendoClientes.problem.stat1")}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={150}>
                <Card className="text-center h-full">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                      $500-$2,000
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t("lp.perdendoClientes.problem.stat2")}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={300}>
                <Card className="text-center h-full">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                      $<AnimatedCounter end={20} />k/mo
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t("lp.perdendoClientes.problem.stat3")}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>

            <AnimatedSection className="text-center">
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                {t("lp.perdendoClientes.problem.support")}
              </p>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleCtaClick("section4")}
                className="font-semibold"
              >
                {t("lp.perdendoClientes.problem.cta")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </AnimatedSection>
          </div>
        </section>

        {/* Section 5: Por Que Isso Acontece */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                {t("lp.perdendoClientes.whyHappens.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("lp.perdendoClientes.whyHappens.subtitle")}
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
              {images["why-overwhelmed"] && (
                <AnimatedSection>
                  <img
                    src={images["why-overwhelmed"]}
                    alt="Empresário sobrecarregado"
                    className="w-full rounded-2xl shadow-xl"
                    loading="lazy"
                  />
                </AnimatedSection>
              )}
              
              <div className={`grid gap-4 ${images["why-overwhelmed"] ? "" : "md:grid-cols-3 max-w-4xl mx-auto"}`}>
                {[
                  { icon: Timer, key: "card1" },
                  { icon: DollarSign, key: "card2" },
                  { icon: Zap, key: "card3" },
                ].map((card, index) => (
                  <AnimatedSection key={card.key} delay={index * 150}>
                    <Card className="h-full">
                      <CardContent className="p-6 text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                          <card.icon className="h-6 w-6 text-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                          {t(`lp.perdendoClientes.whyHappens.${card.key}.title`)}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {t(`lp.perdendoClientes.whyHappens.${card.key}.text`)}
                        </p>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: A Solucao */}
        <section className="py-12 md:py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <AnimatedSection className="text-center md:text-left">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">
                  {t("lp.perdendoClientes.solution.title")}
                </h2>
                <p className="text-lg opacity-90 mb-8">
                  {t("lp.perdendoClientes.solution.subtitle")}
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Clock, key: "feature1" },
                    { icon: Mic, key: "feature2" },
                    { icon: MessageSquare, key: "feature3" },
                    { icon: CalendarCheck, key: "feature4" },
                  ].map((feature, index) => (
                    <AnimatedSection key={feature.key} delay={index * 100}>
                      <div className="text-center p-4 rounded-xl bg-primary-foreground/10 backdrop-blur">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-foreground/20 mb-3">
                          <feature.icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-semibold mb-1 text-sm">
                          {t(`lp.perdendoClientes.solution.${feature.key}.title`)}
                        </h3>
                        <p className="text-xs opacity-80">
                          {t(`lp.perdendoClientes.solution.${feature.key}.text`)}
                        </p>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </AnimatedSection>
              
              {images["solution-ai"] && (
                <AnimatedSection delay={200} className="hidden md:block">
                  <img
                    src={images["solution-ai"]}
                    alt="IA Recepcionista"
                    className="w-full rounded-2xl shadow-2xl"
                    loading="lazy"
                  />
                </AnimatedSection>
              )}
            </div>
          </div>
        </section>

        {/* Section 7: Como Funciona + CTA */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                {t("lp.perdendoClientes.howItWorks.title")}
              </h2>
            </AnimatedSection>

            {images["how-works"] && (
              <AnimatedSection className="max-w-3xl mx-auto mb-10">
                <img
                  src={images["how-works"]}
                  alt="Como funciona o atendimento"
                  className="w-full rounded-xl shadow-lg"
                  loading="lazy"
                />
              </AnimatedSection>
            )}

            <div className="max-w-3xl mx-auto mb-10">
              {[
                { icon: Phone, number: 1, key: "step1" },
                { icon: Brain, number: 2, key: "step2" },
                { icon: UserCheck, number: 3, key: "step3" },
              ].map((step, index) => (
                <AnimatedSection key={step.key} delay={index * 150}>
                  <div className="flex items-center gap-4 md:gap-6 mb-8 last:mb-0">
                    <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl md:text-2xl font-bold">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">
                        {t(`lp.perdendoClientes.howItWorks.${step.key}.title`)}
                      </h3>
                      <p className="text-muted-foreground">
                        {t(`lp.perdendoClientes.howItWorks.${step.key}.text`)}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection className="text-center">
              <Button
                size="lg"
                onClick={() => handleCtaClick("section7")}
                className="font-semibold"
              >
                {t("lp.perdendoClientes.howItWorks.cta")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </AnimatedSection>
          </div>
        </section>

        {/* Section 8: O Que Muda No Seu Negocio */}
        <section className="py-12 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                {t("lp.perdendoClientes.whatChanges.title")}
              </h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: CheckCircle, key: "benefit1" },
                  { icon: Zap, key: "benefit2" },
                  { icon: Users, key: "benefit3" },
                  { icon: Heart, key: "benefit4" },
                  { icon: TrendingUp, key: "benefit5" },
                  { icon: Clock, key: "benefit6" },
                ].map((benefit, index) => (
                  <AnimatedSection key={benefit.key} delay={index * 100}>
                    <Card className="h-full">
                      <CardContent className="p-4 text-center">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-3">
                          <benefit.icon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-semibold text-sm mb-1">
                          {t(`lp.perdendoClientes.whatChanges.${benefit.key}.title`)}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {t(`lp.perdendoClientes.whatChanges.${benefit.key}.text`)}
                        </p>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
              
              {images.success && (
                <AnimatedSection delay={200} className="hidden md:block">
                  <img
                    src={images.success}
                    alt="Empresário de sucesso"
                    className="w-full rounded-2xl shadow-xl"
                    loading="lazy"
                  />
                </AnimatedSection>
              )}
            </div>
          </div>
        </section>

        {/* Section 9: Para Quem Funciona */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                {t("lp.perdendoClientes.whoItsFor.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("lp.perdendoClientes.whoItsFor.subtitle")}
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
              {industries.map((industry, index) => (
                <AnimatedSection key={industry.key} delay={index * 100}>
                  <Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={industry.image}
                        alt={t(`sectors.${industry.key}`)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <CardContent className="p-3 md:p-4 text-center">
                      <h3 className="font-semibold text-sm md:text-base">
                        {t(`sectors.${industry.key}`)}
                      </h3>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection className="text-center">
              <Button variant="outline" asChild>
                <a href="/setores">{t("lp.perdendoClientes.whoItsFor.viewAll")}</a>
              </Button>
            </AnimatedSection>
          </div>
        </section>

        {/* Section 10: Sobre a ClickOne */}
        <section className="py-12 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-10">
              <Badge variant="outline" className="mb-4">
                {t("lp.perdendoClientes.aboutClickone.tagline")}
              </Badge>
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                {t("lp.perdendoClientes.aboutClickone.headline")}
              </h2>
            </AnimatedSection>

            {/* Social Proof */}
            <AnimatedSection className="mb-10">
              <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
                {proofLogos.map((logo) => (
                  <div key={logo.alt} className="flex flex-col items-center gap-1">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="h-6 md:h-8 w-auto opacity-70"
                    />
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium text-muted-foreground">
                        {logo.rating}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Differentiators */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              {[
                { icon: Users, key: "diff1" },
                { icon: TrendingUp, key: "diff2" },
                { icon: Headphones, key: "diff3" },
              ].map((diff, index) => (
                <AnimatedSection key={diff.key} delay={index * 150}>
                  <Card className="h-full">
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                        <diff.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">
                        {t(`lp.perdendoClientes.aboutClickone.${diff.key}.title`)}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {t(`lp.perdendoClientes.aboutClickone.${diff.key}.text`)}
                      </p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection className="text-center">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                <Shield className="h-3 w-3 mr-1" />
                {t("lp.perdendoClientes.aboutClickone.badge")}
              </Badge>
            </AnimatedSection>
          </div>
        </section>

        {/* Section 11: CTA Final */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-10">
              <h2 className="text-2xl md:text-4xl font-bold mb-6">
                {t("lp.perdendoClientes.finalCta.title")}
              </h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
                {t("lp.perdendoClientes.finalCta.text")}
              </p>
            </AnimatedSection>

            {/* 3 Pillars */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto mb-10">
              {[
                { icon: Zap, key: "pillar1" },
                { icon: Shield, key: "pillar2" },
                { icon: TrendingUp, key: "pillar3" },
              ].map((pillar, index) => (
                <AnimatedSection key={pillar.key} delay={index * 100}>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary-foreground/20 mb-3">
                      <pillar.icon className="h-6 w-6 md:h-7 md:w-7" />
                    </div>
                    <h3 className="font-semibold text-sm md:text-base">
                      {t(`lp.perdendoClientes.finalCta.${pillar.key}.title`)}
                    </h3>
                    <p className="text-xs md:text-sm opacity-80 hidden md:block">
                      {t(`lp.perdendoClientes.finalCta.${pillar.key}.text`)}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Mobile App Mention */}
            <AnimatedSection className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10 max-w-2xl mx-auto">
              <div className="w-32 md:w-40 flex-shrink-0">
                <img
                  src={mobileApp}
                  alt="ClickOne Mobile App"
                  className="w-full rounded-2xl shadow-2xl"
                  loading="lazy"
                />
              </div>
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                  <Smartphone className="h-5 w-5" />
                  <span className="font-semibold">
                    {t("lp.perdendoClientes.finalCta.appMention.title")}
                  </span>
                </div>
                <p className="text-sm opacity-80">
                  {t("lp.perdendoClientes.finalCta.appMention.text")}
                </p>
              </div>
            </AnimatedSection>

            {/* Final CTA */}
            <AnimatedSection className="text-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => handleCtaClick("final")}
                className="text-lg px-10 py-7 font-bold shadow-xl hover:shadow-2xl transition-shadow"
              >
                <Calendar className="mr-2 h-6 w-6" />
                {t("lp.perdendoClientes.finalCta.cta")}
              </Button>
              <p className="mt-4 text-sm opacity-80">
                {t("lp.perdendoClientes.finalCta.support")}
              </p>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default PerdendoClientes;
