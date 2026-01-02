import { useTranslation } from "react-i18next";
import { CheckCircle, Phone } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/hooks/use-scroll-animation";

const Obrigado = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      {/* Hero Section - Success Confirmation */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-primary/5 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/15 rounded-full blur-2xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <AnimatedSection animation="scale" className="text-center max-w-3xl mx-auto">
            {/* Animated Success Icon */}
            <div className="mb-8 inline-flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                <div className="relative bg-primary/10 p-6 rounded-full border-2 border-primary/30">
                  <CheckCircle className="w-16 h-16 md:w-20 md:h-20 text-primary" strokeWidth={1.5} />
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {t("thankYou.title")}
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-primary font-medium mb-8">
              {t("thankYou.subtitle")}
            </p>

            {/* Main Message */}
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-8 mb-8 text-left md:text-center">
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t("thankYou.mainMessage")}
              </p>
            </div>

            {/* CTA - Ligue para a Bia */}
            <div className="w-full max-w-md mx-auto">
              <Button
                asChild
                size="lg"
                className="w-full text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all"
              >
                <a href="tel:+17705017321">
                  <Phone className="mr-2 h-5 w-5" />
                  Ligue para a Bia agora
                </a>
              </Button>
              <p className="text-muted-foreground text-sm mt-4">
                E tire todas as suas dúvidas sobre a ClickOne
              </p>
            </div>

            {/* Value Reinforcement */}
            <p className="text-muted-foreground text-sm mt-6">
              {t("thankYou.valueReinforcement")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Reassurance Footer */}
      <section className="py-12 bg-muted/30 border-t border-border/50">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection animation="fade-up">
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("thankYou.reassurance")}
            </p>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Obrigado;
