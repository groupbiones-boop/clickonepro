import Layout from "@/components/layout/Layout";
import { AnimatedSection } from "@/hooks/use-scroll-animation";
import { useTranslation } from "react-i18next";

const TermsOfService = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl">
          <AnimatedSection animation="fade-up">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">{t("legal.terms.title")}</h1>
            <p className="text-muted-foreground mb-8">
              {t("legal.lastUpdated")}: January 2, 2025
            </p>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">{t("legal.terms.acceptance.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">{t("legal.terms.acceptance.p1")}</p>
                <p className="text-muted-foreground leading-relaxed mt-4">{t("legal.terms.acceptance.p2")}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t("legal.terms.description.title")}</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">{t("legal.terms.description.desc")}</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  {(t("legal.terms.description.items", { returnObjects: true }) as string[]).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">{t("legal.terms.description.note")}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t("legal.terms.account.title")}</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">{t("legal.terms.account.desc")}</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  {(t("legal.terms.account.items", { returnObjects: true }) as string[]).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">{t("legal.terms.account.note")}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t("legal.terms.subscription.title")}</h2>
                <h3 className="text-xl font-medium mb-3">{t("legal.terms.subscription.plans")}</h3>
                <p className="text-muted-foreground leading-relaxed">{t("legal.terms.subscription.plansDesc")}</p>
                <h3 className="text-xl font-medium mb-3 mt-6">{t("legal.terms.subscription.payment")}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{t("legal.terms.subscription.paymentDesc")}</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  {(t("legal.terms.subscription.paymentItems", { returnObjects: true }) as string[]).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <h3 className="text-xl font-medium mb-3 mt-6">{t("legal.terms.subscription.cancellation")}</h3>
                <p className="text-muted-foreground leading-relaxed">{t("legal.terms.subscription.cancellationDesc")}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t("legal.terms.acceptable.title")}</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">{t("legal.terms.acceptable.desc")}</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  {(t("legal.terms.acceptable.items", { returnObjects: true }) as string[]).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t("legal.terms.ip.title")}</h2>
                <h3 className="text-xl font-medium mb-3">{t("legal.terms.ip.our")}</h3>
                <p className="text-muted-foreground leading-relaxed">{t("legal.terms.ip.ourDesc")}</p>
                <h3 className="text-xl font-medium mb-3 mt-6">{t("legal.terms.ip.your")}</h3>
                <p className="text-muted-foreground leading-relaxed">{t("legal.terms.ip.yourDesc")}</p>
                <h3 className="text-xl font-medium mb-3 mt-6">{t("legal.terms.ip.feedback")}</h3>
                <p className="text-muted-foreground leading-relaxed">{t("legal.terms.ip.feedbackDesc")}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t("legal.terms.privacy.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">{t("legal.terms.privacy.p1")}</p>
                <p className="text-muted-foreground leading-relaxed mt-4">{t("legal.terms.privacy.p2")}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t("legal.terms.confidentiality.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">{t("legal.terms.confidentiality.desc")}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t("legal.terms.availability.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">{t("legal.terms.availability.p1")}</p>
                <p className="text-muted-foreground leading-relaxed mt-4">{t("legal.terms.availability.p2")}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t("legal.terms.disclaimer.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">{t("legal.terms.disclaimer.p1")}</p>
                <p className="text-muted-foreground leading-relaxed mt-4">{t("legal.terms.disclaimer.p2")}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t("legal.terms.liability.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">{t("legal.terms.liability.p1")}</p>
                <p className="text-muted-foreground leading-relaxed mt-4">{t("legal.terms.liability.p2")}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t("legal.terms.indemnification.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">{t("legal.terms.indemnification.desc")}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t("legal.terms.governing.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">{t("legal.terms.governing.p1")}</p>
                <p className="text-muted-foreground leading-relaxed mt-4">{t("legal.terms.governing.p2")}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t("legal.terms.termination.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">{t("legal.terms.termination.desc")}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t("legal.terms.changes.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">{t("legal.terms.changes.desc")}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t("legal.terms.general.title")}</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  {(t("legal.terms.general.items", { returnObjects: true }) as string[]).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t("legal.terms.contact.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">{t("legal.terms.contact.desc")}</p>
                <div className="mt-4 p-6 bg-muted/30 rounded-lg">
                  <p className="font-semibold mb-2">ClickOne AI</p>
                  <p className="text-muted-foreground">Email: contato@clickonepro.com</p>
                  <p className="text-muted-foreground">Phone: +1 (770) 501-7321</p>
                  <p className="text-muted-foreground">Location: United States</p>
                </div>
              </section>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default TermsOfService;
