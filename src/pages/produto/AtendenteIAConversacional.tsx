import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
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
      title: t("chatProduct.feature1Title"),
      description: t("chatProduct.feature1Desc"),
    },
    {
      icon: Zap,
      title: t("chatProduct.feature2Title"),
      description: t("chatProduct.feature2Desc"),
    },
    {
      icon: Calendar,
      title: t("chatProduct.feature3Title"),
      description: t("chatProduct.feature3Desc"),
    },
    {
      icon: Users,
      title: t("chatProduct.feature4Title"),
      description: t("chatProduct.feature4Desc"),
    },
    {
      icon: Globe,
      title: t("chatProduct.feature5Title"),
      description: t("chatProduct.feature5Desc"),
    },
    {
      icon: BarChart3,
      title: t("chatProduct.feature6Title"),
      description: t("chatProduct.feature6Desc"),
    },
  ];

  const channels: { name: string; icon: LucideIcon }[] = [
    { name: t("chatProduct.sms"), icon: Smartphone },
    { name: t("chatProduct.whatsapp"), icon: MessageCircle },
    { name: t("chatProduct.instagramDm"), icon: Instagram },
    { name: t("chatProduct.facebookMessenger"), icon: Facebook },
    { name: t("chatProduct.websiteChat"), icon: Monitor },
    { name: t("chatProduct.googleBusiness"), icon: Search },
  ];

  const benefits = [
    t("chatProduct.benefit1"),
    t("chatProduct.benefit2"),
    t("chatProduct.benefit3"),
    t("chatProduct.benefit4"),
    t("chatProduct.benefit5"),
    t("chatProduct.benefit6"),
  ];

  const useCases = [
    {
      title: t("chatProduct.useCase1Title"),
      description: t("chatProduct.useCase1Desc"),
    },
    {
      title: t("chatProduct.useCase2Title"),
      description: t("chatProduct.useCase2Desc"),
    },
    {
      title: t("chatProduct.useCase3Title"),
      description: t("chatProduct.useCase3Desc"),
    },
    {
      title: t("chatProduct.useCase4Title"),
      description: t("chatProduct.useCase4Desc"),
    },
  ];

  return (
    <Layout>
      <SEO 
        titleKey="seo.chatProduct.title" 
        descriptionKey="seo.chatProduct.description"
        schemaType="SoftwareApplication"
        schemaData={{
          productName: t("chatProduct.title"),
          productDescription: t("chatProduct.subtitle"),
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web, iOS, Android",
          aggregateRating: { ratingValue: 4.9, reviewCount: 200 }
        }}
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="fade-left">
              <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                {t("chatProduct.badge")}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                {t("chatProduct.title")}{" "}
                <span className="text-primary">{t("chatProduct.titleHighlight")}</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                {t("chatProduct.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/agendar-demo">
                    {t("common.bookFreeDemo")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/setores">{t("chatProduct.ctaSecondary")}</Link>
                </Button>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-right" delay={200}>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={heroChatAi} 
                  alt={t("chatProduct.title")} 
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
              <p className="text-primary-foreground/80 text-sm">{t("chatProduct.responseRate")}</p>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={100}>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedCounter end={3} suffix="s" />
              </div>
              <p className="text-primary-foreground/80 text-sm">{t("chatProduct.responseTime")}</p>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={200}>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedCounter end={60} suffix="%" />
              </div>
              <p className="text-primary-foreground/80 text-sm">{t("chatProduct.moreEngagement")}</p>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={300}>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedCounter end={6} suffix="+" />
              </div>
              <p className="text-primary-foreground/80 text-sm">{t("chatProduct.integratedChannels")}</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Channels */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("chatProduct.channelsTitle")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("chatProduct.channelsSubtitle")}
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
              {t("chatProduct.featuresTitle")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("chatProduct.featuresSubtitle")}
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
                    <p className="text-muted-foreground text-base leading-relaxed">{feature.description}</p>
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
                <h3 className="text-2xl font-bold mb-6">{t("chatProduct.useCasesTitle")}</h3>
                <div className="space-y-4">
                  {useCases.map((useCase, index) => (
                    <div key={index} className="bg-background rounded-lg p-4">
                      <h4 className="text-lg font-semibold mb-2">{useCase.title}</h4>
                      <p className="text-muted-foreground text-base leading-relaxed">
                        {useCase.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-right" delay={200}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t("chatProduct.benefitsTitle")}
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-base leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-8" asChild>
                <Link to="/agendar-demo">
                  {t("chatProduct.viewDemo")}
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
              {t("chatProduct.ctaTitle")}
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              {t("chatProduct.ctaSubtitle")}
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
