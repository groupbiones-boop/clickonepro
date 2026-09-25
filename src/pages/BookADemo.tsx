import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CheckCircle, Headphones, Phone } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import ContactForm from "@/components/ContactForm";
import BookingCalendar, { hasBookingCalendar } from "@/components/BookingCalendar";
import { CONTACT_INFO } from "@/lib/external-urls";

const PLAN_KEYS = {
  recover: "recover",
  "front-office": "frontOffice",
} as const;

type PlanSlug = keyof typeof PLAN_KEYS;

const isPlanSlug = (value: string | null): value is PlanSlug => value === "recover" || value === "front-office";

const asList = (value: unknown): string[] => (Array.isArray(value) ? (value as string[]) : []);

const BookADemo = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const planParam = searchParams.get("plan");
  const plan = isPlanSlug(planParam) ? planParam : null;
  const planName = plan ? t(`plans.${PLAN_KEYS[plan]}.name`) : null;
  const points = asList(t("bookDemoPage.points", { returnObjects: true }));

  return (
    <Layout>
      <SEO titleKey="seo.bookADemo.title" descriptionKey="seo.bookADemo.description" schemaType="WebPage" />

      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-14 md:py-20">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-primary/15 blur-3xl" aria-hidden="true" />
        <div className="container relative max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
            {/* Left: promise */}
            <div className="lg:col-span-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                <Headphones className="h-3.5 w-3.5" aria-hidden="true" />
                {t("bookDemoPage.badge")}
              </span>
              <h1 className="mt-5 text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-foreground">
                {t("bookDemoPage.title")}
              </h1>
              <p className="mt-5 text-base md:text-lg leading-relaxed text-muted-foreground">{t("bookDemoPage.subtitle")}</p>

              {planName && (
                <p
                  className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-4 text-sm font-medium text-foreground"
                  data-testid="book-demo-plan"
                >
                  {t("bookDemoPage.planSelected", { plan: planName })}
                </p>
              )}

              <ul className="mt-8 space-y-4">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm md:text-base text-foreground">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-sm text-muted-foreground">
                {t("bookDemoPage.callUs")}{" "}
                <a href={CONTACT_INFO.PHONE_HREF} className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  {CONTACT_INFO.PHONE}
                </a>
              </p>
            </div>

            {/* Right: calendar when configured, contact form otherwise */}
            <div className="lg:col-span-3">
              {hasBookingCalendar ? (
                <BookingCalendar />
              ) : (
                <div data-testid="book-demo-form">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">{t("bookDemoPage.formTitle")}</h2>
                  <p className="mt-2 mb-6 text-sm text-muted-foreground">{t("bookDemoPage.formSubtitle")}</p>
                  <ContactForm
                    key={plan ?? "none"}
                    source={plan ? `book-a-demo-${plan}` : "book-a-demo"}
                    initialMessage={planName ? t("bookDemoPage.prefillMessage", { plan: planName }) : ""}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BookADemo;
