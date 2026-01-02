import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { CheckCircle, Star, Clock, Shield, Headphones, Quote, Loader2 } from "lucide-react";
import { AnimatedSection } from "@/hooks/use-scroll-animation";
import { useTranslation } from "react-i18next";

const AgendarDemo = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  const benefits = [
    {
      icon: Clock,
      title: t("agendarDemo.benefits.personalizedDemo.title"),
      description: t("agendarDemo.benefits.personalizedDemo.description")
    },
    {
      icon: Shield,
      title: t("agendarDemo.benefits.noCommitment.title"),
      description: t("agendarDemo.benefits.noCommitment.description")
    },
    {
      icon: Headphones,
      title: t("agendarDemo.benefits.seeAiInAction.title"),
      description: t("agendarDemo.benefits.seeAiInAction.description")
    }
  ];

  const testimonials = [
    {
      name: "Carlos Mendes",
      company: "Mendes Cleaning LLC",
      location: "Miami, FL",
      text: t("agendarDemo.testimonials.carlos"),
      rating: 5,
    },
    {
      name: "Roberto Silva",
      company: "Silva HVAC Inc",
      location: "Houston, TX",
      text: t("agendarDemo.testimonials.roberto"),
      rating: 5,
    },
    {
      name: "Ana Ferreira",
      company: "Ferreira Landscaping LLC",
      location: "Orlando, FL",
      text: t("agendarDemo.testimonials.ana"),
      rating: 5,
    },
    {
      name: "Diego Santos",
      company: "Santos Plumbing Services",
      location: "Phoenix, AZ",
      text: t("agendarDemo.testimonials.diego"),
      rating: 5,
    },
  ];

  const quickBenefits = [
    t("agendarDemo.quickBenefits.demo30min"),
    t("agendarDemo.quickBenefits.free"),
    t("agendarDemo.quickBenefits.noCommitment")
  ];

  return (
    <Layout>
      {/* Hero Section with Form Placeholder */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/30 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        
        <div className="container max-w-4xl relative z-10">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                {t("agendarDemo.hero.badge")}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {t("agendarDemo.hero.title")} <span className="text-primary">{t("agendarDemo.hero.titleHighlight")}</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                {t("agendarDemo.hero.subtitle")}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="scale" delay={100}>
            {/* Form Container */}
            <div className="bg-card p-8 md:p-10 rounded-2xl shadow-xl border border-border max-w-xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold mb-2">{t("agendarDemo.form.title")}</h2>
                <p className="text-muted-foreground text-sm">{t("agendarDemo.form.subtitle")}</p>
              </div>
              
              {/* ClickOne Form */}
              <div className="overflow-hidden rounded-xl relative">
                {/* Loading state */}
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-card z-10 min-h-[500px]">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">Carregando formulário...</span>
                    </div>
                  </div>
                )}
                <iframe
                  src="https://links.clickonepro.com/widget/form/EtFZ7nEHXqyEHsV4eKbq"
                  style={{ width: '100%', height: '500px', border: 'none' }}
                  className="min-h-[550px] md:min-h-[500px]"
                  onLoad={() => setIsLoading(false)}
                  id="inline-EtFZ7nEHXqyEHsV4eKbq-demo"
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name="Demo Form"
                  data-height="500"
                  data-layout-iframe-id="inline-EtFZ7nEHXqyEHsV4eKbq-demo"
                  data-form-id="EtFZ7nEHXqyEHsV4eKbq"
                  title="Demo Form"
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Quick Benefits */}
          <AnimatedSection animation="fade-up" delay={200}>
            <div className="flex flex-wrap justify-center gap-6 mt-10">
              {quickBenefits.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <AnimatedSection animation="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {t("agendarDemo.benefitsSection.title")}
            </h2>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                <div className="text-center p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                {t("agendarDemo.testimonialsSection.badge")}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold">
                {t("agendarDemo.testimonialsSection.title")}
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                <div className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-shadow h-full flex flex-col">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  
                  <div className="relative flex-1">
                    <Quote className="absolute -top-2 -left-1 h-6 w-6 text-primary/20" />
                    <p className="text-muted-foreground pl-4 italic">
                      {testimonial.text}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container">
          <AnimatedSection animation="fade-up">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-1">500+</div>
                <p className="text-primary-foreground/80 text-sm">{t("agendarDemo.stats.companiesServed")}</p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-1">1M+</div>
                <p className="text-primary-foreground/80 text-sm">{t("agendarDemo.stats.callsAutomated")}</p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-1">98%</div>
                <p className="text-primary-foreground/80 text-sm">{t("agendarDemo.stats.satisfaction")}</p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-1">24/7</div>
                <p className="text-primary-foreground/80 text-sm">{t("agendarDemo.stats.activeSupport")}</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default AgendarDemo;
