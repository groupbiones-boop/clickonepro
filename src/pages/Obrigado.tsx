import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, ArrowRight, Phone, MessageSquare, Building2, Calendar } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/hooks/use-scroll-animation";

type SourceType = "demo" | "contato" | "default";

const Obrigado = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  
  // Get source from UTM parameters
  const source = (searchParams.get("source") as SourceType) || "default";
  const isDemo = source === "demo";

  const nextSteps = [
    {
      icon: Phone,
      titleKey: "thankYou.steps.contact.title",
      descriptionKey: "thankYou.steps.contact.description",
    },
    {
      icon: MessageSquare,
      titleKey: "thankYou.steps.demo.title",
      descriptionKey: "thankYou.steps.demo.description",
    },
    {
      icon: Building2,
      titleKey: "thankYou.steps.setup.title",
      descriptionKey: "thankYou.steps.setup.description",
    },
  ];

  const exploreSuggestions = [
    {
      titleKey: "thankYou.explore.sectors.title",
      descriptionKey: "thankYou.explore.sectors.description",
      link: "/setores",
      ctaKey: "thankYou.explore.sectors.cta",
    },
    {
      titleKey: "thankYou.explore.voice.title",
      descriptionKey: "thankYou.explore.voice.description",
      link: "/produto/recepcionista-ia-voz",
      ctaKey: "thankYou.explore.voice.cta",
    },
    {
      titleKey: "thankYou.explore.chat.title",
      descriptionKey: "thankYou.explore.chat.description",
      link: "/produto/atendente-ia-conversacional",
      ctaKey: "thankYou.explore.chat.cta",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-primary/5 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/15 rounded-full blur-2xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <AnimatedSection animation="scale" className="text-center max-w-3xl mx-auto">
            {/* Success Icon */}
            <div className="mb-8 inline-flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                <div className="relative bg-primary/10 p-6 rounded-full border-2 border-primary/30">
                  <CheckCircle className="w-16 h-16 md:w-20 md:h-20 text-primary" strokeWidth={1.5} />
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {t(isDemo ? "thankYou.titleDemo" : "thankYou.title")}
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              {t(isDemo ? "thankYou.subtitleDemo" : "thankYou.subtitle")}
            </p>

            {/* Response time badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-8">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <span className="text-foreground font-medium">
                {t(isDemo ? "thankYou.responseTimeDemo" : "thankYou.responseTime")}
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Next Steps Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up" className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {t("thankYou.nextStepsTitle")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("thankYou.nextStepsDescription")}
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {nextSteps.map((step, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center mb-4">
                      <div className="bg-primary/10 p-4 rounded-full">
                        <step.icon className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <div className="text-sm text-primary font-semibold mb-2">
                      {t("thankYou.stepLabel", { number: index + 1 })}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {t(step.titleKey)}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {t(step.descriptionKey)}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up" className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {t("thankYou.exploreTitle")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("thankYou.exploreDescription")}
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {exploreSuggestions.map((suggestion, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                <Card className="h-full border-border/50 bg-card hover:shadow-lg hover:border-primary/30 transition-all group">
                  <CardContent className="p-6 flex flex-col h-full">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {t(suggestion.titleKey)}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-grow">
                      {t(suggestion.descriptionKey)}
                    </p>
                    <Button variant="outline" asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Link to={suggestion.link}>
                        {t(suggestion.ctaKey)}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Home CTA */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection animation="fade-up">
            <Button asChild size="lg">
              <Link to="/">
                {t("thankYou.backHome")}
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Obrigado;
