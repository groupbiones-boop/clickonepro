import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Users, Clock, TrendingUp, Headphones, Star, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/hooks/use-scroll-animation";
import { AnimatedCounter } from "@/hooks/use-count-animation";
import { useTranslation } from "react-i18next";
import heroSmallBusiness from "@/assets/hero-small-business.jpg";

const PequenaEmpresa = () => {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: Clock,
      title: t("smallBusiness.benefit1Title"),
      description: t("smallBusiness.benefit1Desc")
    },
    {
      icon: Users,
      title: t("smallBusiness.benefit2Title"),
      description: t("smallBusiness.benefit2Desc")
    },
    {
      icon: TrendingUp,
      title: t("smallBusiness.benefit3Title"),
      description: t("smallBusiness.benefit3Desc")
    },
    {
      icon: Headphones,
      title: t("smallBusiness.benefit4Title"),
      description: t("smallBusiness.benefit4Desc")
    }
  ];

  const useCases = [
    t("smallBusiness.useCase1"),
    t("smallBusiness.useCase2"),
    t("smallBusiness.useCase3"),
    t("smallBusiness.useCase4"),
    t("smallBusiness.useCase5")
  ];

  const testimonials = [
    {
      name: "Marco Oliveira",
      company: "Oliveira Plumbing LLC",
      location: "Austin, TX",
      text: t("bookDemo.testimonial1"),
      rating: 5,
    },
    {
      name: "Lucia Santos",
      company: "Santos Cleaning Services",
      location: "Miami, FL",
      text: t("bookDemo.testimonial2"),
      rating: 5,
    }
  ];

  const problemsWithoutAI = [
    t("smallBusiness.withoutAI1"),
    t("smallBusiness.withoutAI2"),
    t("smallBusiness.withoutAI3"),
    t("smallBusiness.withoutAI4")
  ];

  const solutionsWithAI = [
    t("smallBusiness.withClickOne1"),
    t("smallBusiness.withClickOne2"),
    t("smallBusiness.withClickOne3"),
    t("smallBusiness.withClickOne4")
  ];

  return (
    <Layout>
      <SEO titleKey="seo.smallBusiness.title" descriptionKey="seo.smallBusiness.description" />
      {/* Hero Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroSmallBusiness})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <AnimatedSection animation="fade-up">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                {t("smallBusiness.badge")}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {t("smallBusiness.title")} <span className="text-primary">{t("smallBusiness.titleHighlight")}</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                {t("smallBusiness.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/agendar-demo">
                    {t("smallBusiness.cta")} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-background/50 backdrop-blur-sm" asChild>
                  <Link to="/agendar-demo">{t("smallBusiness.ctaSecondary")}</Link>
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
                <AnimatedCounter end={40} suffix="%" />
              </div>
              <p className="text-primary-foreground/80 text-sm">{t("smallBusiness.moreAppointments")}</p>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={100}>
              <div className="text-3xl md:text-4xl font-bold mb-1">
                <AnimatedCounter end={0} suffix="" prefix="$" />
              </div>
              <p className="text-primary-foreground/80 text-sm">{t("smallBusiness.extraSalaries")}</p>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={200}>
              <div className="text-3xl md:text-4xl font-bold mb-1">
                <AnimatedCounter end={24} suffix="/7" />
              </div>
              <p className="text-primary-foreground/80 text-sm">{t("smallBusiness.availability")}</p>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={300}>
              <div className="text-3xl md:text-4xl font-bold mb-1">
                <AnimatedCounter end={5} suffix="s" />
              </div>
              <p className="text-primary-foreground/80 text-sm">{t("smallBusiness.responseTime")}</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-background">
        <div className="container max-w-4xl">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("smallBusiness.problemTitle")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("smallBusiness.problemSubtitle")}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection animation="fade-right">
              <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-destructive">{t("smallBusiness.withoutAI")}</h3>
                <ul className="space-y-3 text-muted-foreground">
                  {problemsWithoutAI.map((problem, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-destructive">✗</span>
                      {problem}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-left">
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary">{t("smallBusiness.withClickOne")}</h3>
                <ul className="space-y-3 text-muted-foreground">
                  {solutionsWithAI.map((solution, i) => (
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
              {t("smallBusiness.benefitsTitle")}
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

      {/* Use Cases */}
      <section className="py-16 bg-background">
        <div className="container max-w-4xl">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-center mb-12">
              {t("smallBusiness.useCasesTitle")}
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-4">
            {useCases.map((useCase, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 50}>
                <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{useCase}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-center mb-12">
              {t("smallBusiness.testimonialsTitle")}
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
              {t("smallBusiness.ctaTitle")}
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t("smallBusiness.ctaSubtitle")}
            </p>
            <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
              <Link to="/agendar-demo">
                {t("smallBusiness.cta")} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default PequenaEmpresa;