import { useTranslation } from "react-i18next";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { AnimatedSection } from "@/hooks/use-scroll-animation";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Phone, Mail, MapPin, Calendar, ArrowRight, Zap } from "lucide-react";
import { EXTERNAL_URLS, CONTACT_INFO } from "@/lib/external-urls";

const Contato = () => {
  const { t } = useTranslation();

  const contactInfo = [
    {
      icon: Phone,
      label: t("contact.phone", { defaultValue: "Telefone" }),
      value: CONTACT_INFO.PHONE,
      href: CONTACT_INFO.PHONE_HREF,
    },
    {
      icon: Mail,
      label: "Email",
      value: CONTACT_INFO.EMAIL,
      href: `mailto:${CONTACT_INFO.EMAIL}`,
    },
    {
      icon: MapPin,
      label: t("contact.location"),
      value: CONTACT_INFO.LOCATION,
      href: null,
    },
  ];

  const faqs = [
    { question: t("contact.faq1Question"), answer: t("contact.faq1Answer") },
    { question: t("contact.faq2Question"), answer: t("contact.faq2Answer") },
    { question: t("contact.faq3Question"), answer: t("contact.faq3Answer") },
    { question: t("contact.faq4Question"), answer: t("contact.faq4Answer") },
    { question: t("contact.faq5Question"), answer: t("contact.faq5Answer") },
  ];

  return (
    <Layout>
      <SEO
        titleKey="seo.contact.title"
        descriptionKey="seo.contact.description"
      />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection animation="fade-up" className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              {t("contact.badge", { defaultValue: "Fale Conosco" })}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t("contact.title")}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t("contact.subtitle")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content - Two Columns */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - CTA to Book Demo */}
            <AnimatedSection animation="fade-right">
              <div className="bg-card border border-border rounded-2xl p-8 md:p-10 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {t("contact.scheduleTitle", { defaultValue: "Agende uma Conversa" })}
                  </h2>
                </div>
                
                <p className="text-muted-foreground text-lg mb-8 flex-1">
                  {t("contact.scheduleSubtitle", { defaultValue: "Escolha o melhor horário para uma demo gratuita de 30 minutos. Um especialista vai mostrar como a ClickOne AI pode transformar seu atendimento." })}
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary text-xs">✓</span>
                    </div>
                    <span>{t("bookDemo.benefit1")}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary text-xs">✓</span>
                    </div>
                    <span>{t("bookDemo.benefit2")}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary text-xs">✓</span>
                    </div>
                    <span>{t("bookDemo.benefit3")}</span>
                  </div>
                </div>

                <Button asChild size="lg" className="w-full tracking-wide text-lg py-6">
                  <a
                    href={EXTERNAL_URLS.GHL_BOOKING}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("contact.ctaButton", { defaultValue: "Agendar Demo Gratuita" })}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </AnimatedSection>

            {/* Right Column - Contact Info */}
            <AnimatedSection animation="fade-left">
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-8">
                  {t("contact.contactInfoTitle", { defaultValue: "Outras formas de contato" })}
                </h2>

                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="bg-card border border-border rounded-xl p-6 flex items-center gap-4 hover:border-primary/50 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{info.label}</p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-lg font-semibold hover:text-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-lg font-semibold">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Response Time Info */}
                <div className="bg-muted/50 rounded-xl p-6 mt-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">
                        {t("contact.responseTime", { defaultValue: "Tempo de resposta" })}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t("contact.responseTimeDesc", { defaultValue: "Aqui você será atendido em até 10 segundos pela nossa Bia." })}
                      </p>
                      <p className="text-sm text-primary font-medium mt-2">
                        {t("contact.responseTimeCta", { defaultValue: "Leve esse atendimento relâmpago para o seu negócio." })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("contact.faqTitle")}
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/50"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedSection>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up" className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("contact.ctaTitle", { defaultValue: "Pronto para transformar seu atendimento?" })}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t("contact.ctaSubtitle", { defaultValue: "Agende uma demo gratuita e veja como a ClickOne pode ajudar seu negócio." })}
            </p>
            <Button asChild size="lg" className="tracking-wide text-lg px-8 py-6">
              <a
                href={EXTERNAL_URLS.GHL_BOOKING}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("contact.ctaButton", { defaultValue: "Agendar Demo Gratuita" })}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Contato;
