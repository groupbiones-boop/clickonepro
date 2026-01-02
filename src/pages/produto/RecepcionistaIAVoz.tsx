import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { AnimatedSection } from "@/hooks/use-scroll-animation";
import { AnimatedCounter } from "@/hooks/use-count-animation";
import {
  Clock,
  Calendar,
  Users,
  CheckCircle,
  ArrowRight,
  Globe,
  Mic,
  BarChart3,
} from "lucide-react";
import heroVoiceAi from "@/assets/hero-voice-ai.jpg";
import { useTranslation } from "react-i18next";

const RecepcionistaIAVoz = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Mic,
      title: t("recepcionistaVoz.features.naturalVoice.title"),
      description: t("recepcionistaVoz.features.naturalVoice.description"),
    },
    {
      icon: Clock,
      title: t("recepcionistaVoz.features.available247.title"),
      description: t("recepcionistaVoz.features.available247.description"),
    },
    {
      icon: Calendar,
      title: t("recepcionistaVoz.features.autoScheduling.title"),
      description: t("recepcionistaVoz.features.autoScheduling.description"),
    },
    {
      icon: Users,
      title: t("recepcionistaVoz.features.leadQualification.title"),
      description: t("recepcionistaVoz.features.leadQualification.description"),
    },
    {
      icon: Globe,
      title: t("recepcionistaVoz.features.multiLanguage.title"),
      description: t("recepcionistaVoz.features.multiLanguage.description"),
    },
    {
      icon: BarChart3,
      title: t("recepcionistaVoz.features.analytics.title"),
      description: t("recepcionistaVoz.features.analytics.description"),
    },
  ];

  const benefits = [
    t("recepcionistaVoz.benefits.missedCalls"),
    t("recepcionistaVoz.benefits.conversionRate"),
    t("recepcionistaVoz.benefits.savings"),
    t("recepcionistaVoz.benefits.setup"),
    t("recepcionistaVoz.benefits.integrations"),
    t("recepcionistaVoz.benefits.support"),
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="fade-left">
              <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                {t("recepcionistaVoz.hero.badge")}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                {t("recepcionistaVoz.hero.title")}{" "}
                <span className="text-primary">{t("recepcionistaVoz.hero.titleHighlight")}</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                {t("recepcionistaVoz.hero.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/agendar-demo">
                    {t("common.bookFreeDemo")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/setores">{t("recepcionistaVoz.hero.viewSectors")}</Link>
                </Button>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-right" delay={200}>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={heroVoiceAi} 
                  alt={t("recepcionistaVoz.hero.imageAlt")} 
                  className="w-full h-auto"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <AnimatedSection animation="scale" delay={0}>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedCounter end={80} suffix="%" />
              </div>
              <p className="text-primary-foreground/80 text-sm">{t("recepcionistaVoz.stats.lessMissedCalls")}</p>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={100}>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedCounter end={40} suffix="%" />
              </div>
              <p className="text-primary-foreground/80 text-sm">{t("recepcionistaVoz.stats.moreConversions")}</p>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={200}>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedCounter end={24} suffix="h" />
              </div>
              <p className="text-primary-foreground/80 text-sm">{t("recepcionistaVoz.stats.quickSetup")}</p>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={300}>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedCounter end={50} suffix="+" />
              </div>
              <p className="text-primary-foreground/80 text-sm">{t("recepcionistaVoz.stats.integrations")}</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("recepcionistaVoz.featuresSection.title")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("recepcionistaVoz.featuresSection.subtitle")}
            </p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <AnimatedSection key={index} animation="scale" delay={index * 100}>
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="fade-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t("recepcionistaVoz.howItWorks.title")}
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t("recepcionistaVoz.howItWorks.step1.title")}</h3>
                    <p className="text-muted-foreground text-sm">
                      {t("recepcionistaVoz.howItWorks.step1.description")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t("recepcionistaVoz.howItWorks.step2.title")}</h3>
                    <p className="text-muted-foreground text-sm">
                      {t("recepcionistaVoz.howItWorks.step2.description")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t("recepcionistaVoz.howItWorks.step3.title")}</h3>
                    <p className="text-muted-foreground text-sm">
                      {t("recepcionistaVoz.howItWorks.step3.description")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t("recepcionistaVoz.howItWorks.step4.title")}</h3>
                    <p className="text-muted-foreground text-sm">
                      {t("recepcionistaVoz.howItWorks.step4.description")}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-right" delay={200}>
              <div className="bg-accent/50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">{t("recepcionistaVoz.benefitsSection.title")}</h3>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("recepcionistaVoz.cta.title")}
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              {t("recepcionistaVoz.cta.subtitle")}
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/agendar-demo">
                {t("common.bookFreeDemo")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default RecepcionistaIAVoz;
