import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { AnimatedSection } from "@/hooks/use-scroll-animation";
import { AnimatedCounter } from "@/hooks/use-count-animation";
import {
  MessageSquare,
  Clock,
  Calendar,
  Users,
  CheckCircle,
  ArrowRight,
  Zap,
  Globe,
  BarChart3,
  Smartphone,
  MessageCircle,
  Instagram,
  Facebook,
  Monitor,
  Search,
  type LucideIcon,
} from "lucide-react";
import heroChatAi from "@/assets/hero-chat-ai.jpg";
import { useTranslation } from "react-i18next";

const AtendenteIAConversacional = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: MessageSquare,
      title: t("atendenteConversacional.features.multiChannel.title"),
      description: t("atendenteConversacional.features.multiChannel.description"),
    },
    {
      icon: Zap,
      title: t("atendenteConversacional.features.instantResponses.title"),
      description: t("atendenteConversacional.features.instantResponses.description"),
    },
    {
      icon: Calendar,
      title: t("atendenteConversacional.features.chatScheduling.title"),
      description: t("atendenteConversacional.features.chatScheduling.description"),
    },
    {
      icon: Users,
      title: t("atendenteConversacional.features.autoFollowUp.title"),
      description: t("atendenteConversacional.features.autoFollowUp.description"),
    },
    {
      icon: Globe,
      title: t("atendenteConversacional.features.multiLanguage.title"),
      description: t("atendenteConversacional.features.multiLanguage.description"),
    },
    {
      icon: BarChart3,
      title: t("atendenteConversacional.features.realTimeMetrics.title"),
      description: t("atendenteConversacional.features.realTimeMetrics.description"),
    },
  ];

  const channels: { name: string; icon: LucideIcon }[] = [
    { name: "SMS", icon: Smartphone },
    { name: "WhatsApp", icon: MessageCircle },
    { name: "Instagram DM", icon: Instagram },
    { name: "Facebook Messenger", icon: Facebook },
    { name: t("atendenteConversacional.channels.websiteChat"), icon: Monitor },
    { name: "Google Business", icon: Search },
  ];

  const benefits = [
    t("atendenteConversacional.benefits.responseRate"),
    t("atendenteConversacional.benefits.leadEngagement"),
    t("atendenteConversacional.benefits.conversionTime"),
    t("atendenteConversacional.benefits.crmIntegration"),
    t("atendenteConversacional.benefits.customTemplates"),
    t("atendenteConversacional.benefits.unlimitedScalability"),
  ];

  const useCases = [
    {
      title: t("atendenteConversacional.useCases.autoLeadResponse.title"),
      description: t("atendenteConversacional.useCases.autoLeadResponse.description"),
    },
    {
      title: t("atendenteConversacional.useCases.clientReactivation.title"),
      description: t("atendenteConversacional.useCases.clientReactivation.description"),
    },
    {
      title: t("atendenteConversacional.useCases.bookingConfirmation.title"),
      description: t("atendenteConversacional.useCases.bookingConfirmation.description"),
    },
    {
      title: t("atendenteConversacional.useCases.reviewCollection.title"),
      description: t("atendenteConversacional.useCases.reviewCollection.description"),
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="fade-left">
              <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                {t("atendenteConversacional.hero.badge")}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                {t("atendenteConversacional.hero.title")}{" "}
                <span className="text-primary">{t("atendenteConversacional.hero.titleHighlight")}</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                {t("atendenteConversacional.hero.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/agendar-demo">
                    {t("common.bookFreeDemo")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/setores">{t("atendenteConversacional.hero.viewSectors")}</Link>
                </Button>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-right" delay={200}>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={heroChatAi} 
                  alt={t("atendenteConversacional.hero.imageAlt")} 
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
                <AnimatedCounter end={100} suffix="%" />
              </div>
              <p className="text-primary-foreground/80 text-sm">{t("atendenteConversacional.stats.responseRate")}</p>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={100}>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedCounter end={3} suffix="s" />
              </div>
              <p className="text-primary-foreground/80 text-sm">{t("atendenteConversacional.stats.responseTime")}</p>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={200}>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedCounter end={60} suffix="%" />
              </div>
              <p className="text-primary-foreground/80 text-sm">{t("atendenteConversacional.stats.moreEngagement")}</p>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={300}>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedCounter end={6} suffix="+" />
              </div>
              <p className="text-primary-foreground/80 text-sm">{t("atendenteConversacional.stats.integratedChannels")}</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Channels */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("atendenteConversacional.channelsSection.title")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("atendenteConversacional.channelsSection.subtitle")}
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {channels.map((channel, index) => (
              <AnimatedSection key={index} animation="scale" delay={index * 50}>
                <Card className="text-center hover:shadow-lg transition-shadow h-full">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                      <channel.icon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <span className="font-medium text-sm">{channel.name}</span>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("atendenteConversacional.featuresSection.title")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("atendenteConversacional.featuresSection.subtitle")}
            </p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
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

      {/* Use Cases */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="fade-left">
              <div className="bg-accent/50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">{t("atendenteConversacional.useCasesSection.title")}</h3>
                <div className="space-y-4">
                  {useCases.map((useCase, index) => (
                    <div key={index} className="bg-background rounded-lg p-4">
                      <h4 className="font-semibold mb-1">{useCase.title}</h4>
                      <p className="text-muted-foreground text-sm">
                        {useCase.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-right" delay={200}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t("atendenteConversacional.benefitsSection.title")}
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-8" asChild>
                <Link to="/agendar-demo">
                  {t("atendenteConversacional.benefitsSection.viewDemo")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("atendenteConversacional.cta.title")}
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              {t("atendenteConversacional.cta.subtitle")}
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

export default AtendenteIAConversacional;
