import { useState } from "react";
import { useTranslation } from "react-i18next";
import Layout from "@/components/layout/Layout";
import { Phone, Mail, MapPin, Loader2 } from "lucide-react";
import { AnimatedSection } from "@/hooks/use-scroll-animation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Contato = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  const faqs = [
    { question: t("contact.faq1Question"), answer: t("contact.faq1Answer") },
    { question: t("contact.faq2Question"), answer: t("contact.faq2Answer") },
    { question: t("contact.faq3Question"), answer: t("contact.faq3Answer") },
    { question: t("contact.faq4Question"), answer: t("contact.faq4Answer") },
    { question: t("contact.faq5Question"), answer: t("contact.faq5Answer") },
  ];

  return (
    <Layout>
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/30">
        <div className="container">
          <AnimatedSection className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("contact.title")}</h1>
            <p className="text-lg text-muted-foreground">{t("contact.subtitle")}</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
            <AnimatedSection animation="fade-left">
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <span>+1 (770) 501-7321</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <span>contato@clickonepro.com</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <span>United States</span>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-right" delay={200}>
              <div className="bg-card p-6 rounded-2xl shadow-xl border border-border relative overflow-hidden">
                {/* Loading state */}
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-card z-10">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">Carregando formulário...</span>
                    </div>
                  </div>
                )}
                <iframe
                  src="https://links.clickonepro.com/widget/form/EtFZ7nEHXqyEHsV4eKbq"
                  style={{ width: '100%', height: '550px', border: 'none' }}
                  className="min-h-[600px] md:min-h-[550px]"
                  onLoad={() => setIsLoading(false)}
                  id="inline-EtFZ7nEHXqyEHsV4eKbq"
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name="Contact Form"
                  data-height="550"
                  data-layout-iframe-id="inline-EtFZ7nEHXqyEHsV4eKbq"
                  data-form-id="EtFZ7nEHXqyEHsV4eKbq"
                  title="Contact Form"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-3xl">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">{t("contact.faqTitle")}</h2>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={100}>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left font-medium hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Contato;
