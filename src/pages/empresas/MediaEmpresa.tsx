import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Users, BarChart3, Zap, Settings, Star, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/hooks/use-scroll-animation";
import { AnimatedCounter } from "@/hooks/use-count-animation";
import { useTranslation } from "react-i18next";

const MediaEmpresa = () => {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: Users,
      title: t("mediaEmpresa.benefits.scale.title"),
      description: t("mediaEmpresa.benefits.scale.description")
    },
    {
      icon: BarChart3,
      title: t("mediaEmpresa.benefits.reports.title"),
      description: t("mediaEmpresa.benefits.reports.description")
    },
    {
      icon: Zap,
      title: t("mediaEmpresa.benefits.crmIntegration.title"),
      description: t("mediaEmpresa.benefits.crmIntegration.description")
    },
    {
      icon: Settings,
      title: t("mediaEmpresa.benefits.customization.title"),
      description: t("mediaEmpresa.benefits.customization.description")
    }
  ];

  const challenges = [
    t("mediaEmpresa.challenges.callVolume"),
    t("mediaEmpresa.challenges.highCost"),
    t("mediaEmpresa.challenges.inconsistency"),
    t("mediaEmpresa.challenges.scalingDifficulty"),
    t("mediaEmpresa.challenges.lostLeads")
  ];

  const solutions = [
    t("mediaEmpresa.solutions.unlimitedVolume"),
    t("mediaEmpresa.solutions.fixedCost"),
    t("mediaEmpresa.solutions.standardizedService"),
    t("mediaEmpresa.solutions.instantScaling"),
    t("mediaEmpresa.solutions.coverage247")
  ];

  const testimonials = [
    {
      name: "Ricardo Ferreira",
      company: "Ferreira HVAC Services Inc",
      location: "Dallas, TX",
      text: t("mediaEmpresa.testimonials.ricardo"),
      rating: 5,
    },
    {
      name: "Patricia Lima",
      company: "Lima Construction LLC",
      location: "Atlanta, GA",
      text: t("mediaEmpresa.testimonials.patricia"),
      rating: 5,
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/30 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection animation="fade-up">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                {t("mediaEmpresa.hero.badge")}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {t("mediaEmpresa.hero.title")} <span className="text-primary">{t("mediaEmpresa.hero.titleHighlight")}</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                {t("mediaEmpresa.hero.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/agendar-demo">
                    {t("common.bookFreeDemo")} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contato">{t("common.talkToSpecialist")}</Link>
                </Button>
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
              <div className="text-3xl md:text-4xl font-bold mb-1">
                <AnimatedCounter end={60} suffix="%" />
              </div>
              <p className="text-primary-foreground/80 text-sm">{t("mediaEmpresa.stats.costReduction")}</p>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={100}>
              <div className="text-3xl md:text-4xl font-bold mb-1">
                <AnimatedCounter end={100} suffix="%" />
              </div>
              <p className="text-primary-foreground/80 text-sm">{t("mediaEmpresa.stats.callsAnswered")}</p>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={200}>
              <div className="text-3xl md:text-4xl font-bold mb-1">
                <AnimatedCounter end={3} suffix="x" />
              </div>
              <p className="text-primary-foreground/80 text-sm">{t("mediaEmpresa.stats.moreCapacity")}</p>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={300}>
              <div className="text-3xl md:text-4xl font-bold mb-1">
                <AnimatedCounter end={0} suffix="" prefix="$" />
              </div>
              <p className="text-primary-foreground/80 text-sm">{t("mediaEmpresa.stats.initialSetup")}</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Problem vs Solution */}
      <section className="py-16 bg-background">
        <div className="container max-w-5xl">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("mediaEmpresa.problemSection.title")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("mediaEmpresa.problemSection.subtitle")}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection animation="fade-right">
              <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-destructive">{t("mediaEmpresa.problemSection.challengesTitle")}</h3>
                <ul className="space-y-3 text-muted-foreground">
                  {challenges.map((challenge, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-destructive">✗</span>
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-left">
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary">{t("mediaEmpresa.problemSection.solutionTitle")}</h3>
                <ul className="space-y-3 text-muted-foreground">
                  {solutions.map((solution, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      {solution}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-center mb-12">
              {t("mediaEmpresa.benefitsSection.title")}
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                <div className="bg-card p-6 rounded-xl border border-border h-full">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-background">
        <div className="container">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-center mb-12">
              {t("mediaEmpresa.testimonialsSection.title")}
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                <div className="bg-card p-6 rounded-xl border border-border h-full">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <div className="relative mb-4">
                    <Quote className="absolute -top-2 -left-1 h-6 w-6 text-primary/20" />
                    <p className="text-muted-foreground pl-4 italic">{testimonial.text}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("mediaEmpresa.cta.title")}
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t("mediaEmpresa.cta.subtitle")}
            </p>
            <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
              <Link to="/agendar-demo">
                {t("common.bookFreeDemo")} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default MediaEmpresa;
