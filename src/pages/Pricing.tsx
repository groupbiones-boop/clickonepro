import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import PricingPlans from "@/components/pricing/PricingPlans";
import PlanCompareTable from "@/components/pricing/PlanCompareTable";

interface PricingFAQ {
  q: string;
  a: string;
}

const asFaq = (value: unknown): PricingFAQ[] => (Array.isArray(value) ? (value as PricingFAQ[]) : []);

const Pricing = () => {
  const { t } = useTranslation();
  const faq = asFaq(t("pricingPage.faq", { returnObjects: true }));

  return (
    <Layout>
      <SEO
        titleKey="seo.pricing.title"
        descriptionKey="seo.pricing.description"
        schemaType="FAQPage"
        schemaData={{ faqItems: faq.map((item) => ({ question: item.q, answer: item.a })) }}
      />

      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" aria-hidden="true" />
        <div className="container relative text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            {t("pricingPage.badge")}
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
            {t("pricingPage.title")}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-muted-foreground">{t("pricingPage.subtitle")}</p>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-16 md:pb-24 pt-6" aria-label={t("pricingPage.badge")}>
        <div className="container">
          <PricingPlans />
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-16 md:py-24 bg-muted/30 border-y border-border" aria-labelledby="compare-title">
        <div className="container">
          <h2 id="compare-title" className="mb-10 text-center text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            {t("plans.compare.title")}
          </h2>
          <PlanCompareTable />
          <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">
            {t("plans.smsNotice")}
          </p>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-16 md:py-24" aria-labelledby="pricing-guarantee-title">
        <div className="container max-w-4xl">
          <div className="flex flex-col items-center gap-5 rounded-[2rem] border-2 border-emerald-500/30 bg-card p-8 text-center shadow-lg sm:p-12">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="h-7 w-7" aria-hidden="true" />
            </span>
            <h2 id="pricing-guarantee-title" className="text-3xl font-extrabold tracking-tight text-foreground">
              {t("pricingPage.guaranteeTitle")}
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-foreground">{t("home.guarantee.text")}</p>
          </div>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="py-16 md:py-24 bg-muted/30 border-t border-border" aria-labelledby="pricing-faq-title">
        <div className="container max-w-3xl">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              {t("pricingPage.faqBadge")}
            </span>
            <h2 id="pricing-faq-title" className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              {t("pricingPage.faqTitle")}
            </h2>
          </div>
          <Accordion type="single" collapsible defaultValue="faq-0" className="space-y-3">
            {faq.map((item, index) => (
              <AccordionItem
                key={item.q}
                value={`faq-${index}`}
                className="rounded-2xl border border-border bg-card px-5 data-[state=open]:border-primary/40 data-[state=open]:shadow-md"
              >
                <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">{item.q}</AccordionTrigger>
                <AccordionContent className="text-sm md:text-base leading-relaxed text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary py-16 md:py-20 text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">{t("pricingPage.ctaTitle")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">{t("pricingPage.ctaSubtitle")}</p>
          <Button asChild size="lg" className="mt-8 h-auto min-h-[52px] px-8 py-3.5 bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            <Link to="/book-a-demo">
              {t("plans.frontOffice.cta")}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
