import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, MapPin, Phone, Calendar, MessageSquare, Star, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/hooks/use-scroll-animation";
import { AnimatedCounter } from "@/hooks/use-count-animation";
import { useTranslation } from "react-i18next";
import heroLocalBusiness from "@/assets/hero-local-business.jpg";

const NegociosLocais = () => {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: MapPin,
      title: t("localBusiness.benefit1Title"),
      description: t("localBusiness.benefit1Desc")
    },
    {
      icon: Phone,
      title: t("localBusiness.benefit2Title"),
      description: t("localBusiness.benefit2Desc")
    },
    {
      icon: Calendar,
      title: t("localBusiness.benefit3Title"),
      description: t("localBusiness.benefit3Desc")
    },
    {
      icon: MessageSquare,
      title: t("localBusiness.benefit4Title"),
      description: t("localBusiness.benefit4Desc")
    }
  ];

  const localChallenges = [
    t("localBusiness.challenge1"),
    t("localBusiness.challenge2"),
    t("localBusiness.challenge3"),
    t("localBusiness.challenge4"),
    t("localBusiness.challenge5")
  ];

  const testimonials = [
    {
      name: "Fernando Costa",
      company: "Costa Electric LLC",
      location: "Denver, CO",
      text: t("bookDemo.testimonial1"),
      rating: 5,
    },
    {
      name: "Maria Rodriguez",
      company: "Rodriguez Hair Studio",
      location: "San Antonio, TX",
      text: t("bookDemo.testimonial2"),
      rating: 5,
    }
  ];

  return (
    <Layout>
      <SEO titleKey="seo.localBusiness.title" descriptionKey="seo.localBusiness.description" />
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="fade-left">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                {t("localBusiness.badge")}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {t("localBusiness.title")} <span className="text-primary">{t("localBusiness.titleHighlight")}</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                {t("localBusiness.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/agendar-demo">
                    {t("localBusiness.cta")} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/agendar-demo">{t("localBusiness.ctaSecondary")}</Link>
                </Button>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-right" delay={200}>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={heroLocalBusiness} 
                  alt={t("localBusiness.title")} 
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
              <div className="text-3xl md:text-4xl font-bold mb-1">
                <AnimatedCounter end={78} suffix="%" />
              </div>
              <p className="text-primary-foreground/80 text-sm">{t("localBusiness.firstResponder")}</p>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={100}>
              <div className="text-3xl md:text-4xl font-bold mb-1">
                <AnimatedCounter end={5} suffix="s" />
              </div>
              <p className="text-primary-foreground/80 text-sm">{t("localBusiness.responseTime")}</p>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={200}>
              <div className="text-3xl md:text-4xl font-bold mb-1">
                <AnimatedCounter end={35} suffix="%" />
              </div>
              <p className="text-primary-foreground/80 text-sm">{t("localBusiness.moreBookings")}</p>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={300}>
              <div className="text-3xl md:text-4xl font-bold mb-1">
                <AnimatedCounter end={24} suffix="/7" />
              </div>
              <p className="text-primary-foreground/80 text-sm">{t("localBusiness.availability")}</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Local Market Challenges */}
      <section className="py-16 bg-background">
        <div className="container max-w-4xl">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("localBusiness.challengesTitle")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("localBusiness.challengesSubtitle")}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="bg-muted/50 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 text-center">{t("localBusiness.challengesListTitle")}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {localChallenges.map((challenge, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-background rounded-lg">
                    <span className="text-destructive">✗</span>
                    <span className="text-muted-foreground">{challenge}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-center mb-4">
              {t("localBusiness.benefitsTitle")}
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              {t("localBusiness.benefitsSubtitle")}
            </p>
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
              {t("localBusiness.testimonialsTitle")}
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
              {t("localBusiness.ctaTitle")}
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t("localBusiness.ctaSubtitle")}
            </p>
            <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
              <Link to="/agendar-demo">
                {t("localBusiness.cta")} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default NegociosLocais;