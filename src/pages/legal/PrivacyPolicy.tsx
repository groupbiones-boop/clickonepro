import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { AnimatedSection } from "@/hooks/use-scroll-animation";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <SEO titleKey="seo.privacy.title" descriptionKey="seo.privacy.description" />
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl">
          <AnimatedSection animation="fade-up">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">{t("legal.privacy.title")}</h1>
            <p className="text-muted-foreground mb-8">
              {t("legal.lastUpdated")}: January 2, 2025
            </p>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.intro.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">{t("legal.privacy.intro.p1")}</p>
                <p className="text-muted-foreground leading-relaxed mt-4">{t("legal.privacy.intro.p2")}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.collection.title")}</h2>
                <h3 className="text-xl font-medium mb-3">{t("legal.privacy.collection.personal")}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{t("legal.privacy.collection.personalDesc")}</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  {(t("legal.privacy.collection.personalItems", { returnObjects: true }) as string[]).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <h3 className="text-xl font-medium mb-3 mt-6">{t("legal.privacy.collection.automatic")}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{t("legal.privacy.collection.automaticDesc")}</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  {(t("legal.privacy.collection.automaticItems", { returnObjects: true }) as string[]).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <h3 className="text-xl font-medium mb-3 mt-6">{t("legal.privacy.collection.thirdParty")}</h3>
                <p className="text-muted-foreground leading-relaxed">{t("legal.privacy.collection.thirdPartyDesc")}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.use.title")}</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">{t("legal.privacy.use.desc")}</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  {(t("legal.privacy.use.items", { returnObjects: true }) as string[]).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.disclosure.title")}</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">{t("legal.privacy.disclosure.desc")}</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  {(t("legal.privacy.disclosure.items", { returnObjects: true }) as string[]).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">{t("legal.privacy.disclosure.noSell")}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.security.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">{t("legal.privacy.security.desc")}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.retention.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">{t("legal.privacy.retention.desc")}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.rights.title")}</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">{t("legal.privacy.rights.desc")}</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  {(t("legal.privacy.rights.items", { returnObjects: true }) as string[]).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">{t("legal.privacy.rights.contact")}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.california.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">{t("legal.privacy.california.desc")}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.cookies.title")}</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">{t("legal.privacy.cookies.desc")}</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  {(t("legal.privacy.cookies.items", { returnObjects: true }) as string[]).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">{t("legal.privacy.cookies.control")}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.thirdPartyLinks.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">{t("legal.privacy.thirdPartyLinks.desc")}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.children.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">{t("legal.privacy.children.desc")}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.international.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">{t("legal.privacy.international.desc")}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.changes.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">{t("legal.privacy.changes.desc")}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.contact.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">{t("legal.privacy.contact.desc")}</p>
                <div className="mt-4 p-6 bg-muted/30 rounded-lg">
                  <p className="font-semibold mb-2">ClickOne AI</p>
                  <p className="text-muted-foreground">Email: info@clickonepro.com</p>
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

export default PrivacyPolicy;
