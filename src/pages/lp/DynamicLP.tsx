import { useParams, Navigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  Phone, 
  PhoneOff, 
  Clock, 
  DollarSign, 
  Users, 
  Calendar,
  MessageSquare,
  CheckCircle,
  TrendingUp,
  Headphones,
  Zap,
  Shield,
  Star,
  ArrowRight,
  Smartphone,
  Timer,
  UserCheck,
  BellOff,
  Briefcase,
  CalendarCheck,
  Heart,
  Brain,
  Mic,
  Loader2,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SEO from "@/components/SEO";
import LPHeader from "@/components/layout/LPHeader";
import LPFloatingCTA from "@/components/LPFloatingCTA";
import Footer from "@/components/layout/Footer";
import { AnimatedSection } from "@/hooks/use-scroll-animation";
import { AnimatedCounter } from "@/hooks/use-count-animation";
import { useLandingPageBySlug, LPContent } from "@/hooks/use-landing-page";
import { useActiveABTest, assignVariant, recordConversion, getOrCreateSessionId } from "@/hooks/use-ab-tests";
import { EXTERNAL_URLS, appendUTMParams } from "@/lib/external-urls";

const DynamicLP = () => {
  const { slug } = useParams();
  const location = useLocation();
  const { landingPage, isLoading, notFound } = useLandingPageBySlug(slug);
  const { test: activeTest, isLoading: isTestLoading } = useActiveABTest(landingPage?.id);
  const [displayContent, setDisplayContent] = useState<LPContent | null>(null);
  const [activeVariant, setActiveVariant] = useState<"A" | "B">("A");

  // Get UTM params from URL
  const getUTMParams = () => {
    const searchParams = new URLSearchParams(location.search);
    return {
      utm_source: searchParams.get("utm_source") || undefined,
      utm_medium: searchParams.get("utm_medium") || undefined,
      utm_campaign: searchParams.get("utm_campaign") || undefined,
    };
  };

  // Handle A/B test variant assignment
  useEffect(() => {
    if (!landingPage || isTestLoading) return;

    const setupVariant = async () => {
      if (activeTest) {
        const { variant } = await assignVariant(activeTest.id, activeTest.traffic_split);
        setActiveVariant(variant);
        
        if (variant === "B" && activeTest.variant_b_content) {
          setDisplayContent(activeTest.variant_b_content);
        } else if (variant === "A" && activeTest.variant_a_content) {
          setDisplayContent(activeTest.variant_a_content);
        } else {
          setDisplayContent(landingPage.content);
        }
      } else {
        setDisplayContent(landingPage.content);
      }
    };

    setupVariant();
  }, [landingPage, activeTest, isTestLoading]);

  const handleCtaClick = (ctaLocation: string = "cta") => {
    // Record conversion for A/B test
    recordConversion();
    const utmParams = getUTMParams();
    const bookingUrl = appendUTMParams(EXTERNAL_URLS.GHL_BOOKING, {
      source: utmParams.utm_source || "landing_page",
      medium: utmParams.utm_medium || "organic",
      campaign: utmParams.utm_campaign || slug || "dynamic_lp",
      content: ctaLocation,
    });
    window.open(bookingUrl, "_blank");
  };

  if (isLoading || isTestLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (notFound || !landingPage || !displayContent) {
    return <Navigate to="/404" replace />;
  }

  const { images } = landingPage;
  const content = displayContent;

  return (
    <>
      <SEO
        title={content.hero.title}
        description={content.hero.subtitle}
      />

      <LPHeader onCtaClick={handleCtaClick} />
      <LPFloatingCTA onCtaClick={handleCtaClick} />

      <main className="min-h-screen bg-background">
        {/* Section 1: Hero */}
        <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <AnimatedSection className="text-center md:text-left">
                <Badge variant="secondary" className="mb-6 text-sm px-4 py-2">
                  {content.hero.badge}
                </Badge>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                  {content.hero.title}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                  {content.hero.subtitle}
                </p>
                <Button
                  size="lg"
                  onClick={() => handleCtaClick("hero")}
                  className="w-full sm:w-auto text-lg px-8 py-6 font-semibold min-h-[56px]"
                >
                  {content.hero.cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </AnimatedSection>
              
              {images.hero && (
                <AnimatedSection delay={200} className="hidden md:block">
                  <img
                    src={images.hero}
                    alt="Hero"
                    className="w-full rounded-2xl shadow-2xl"
                    loading="lazy"
                  />
                </AnimatedSection>
              )}
            </div>
          </div>
        </section>

        {/* Section 2: Hook Emocional */}
        <section className="py-12 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-6">
                <PhoneOff className="h-8 w-8 text-destructive" />
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-6">
                {content.hook.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {content.hook.text}
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Section 3: O Dia a Dia */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                {content.dayInLife.title}
              </h2>
            </AnimatedSection>

            <div className="max-w-2xl mx-auto">
              {content.dayInLife.items.map((item, index) => (
                <AnimatedSection key={index} delay={index * 100}>
                  <div className="flex items-start gap-4 mb-6 last:mb-0">
                    <div className="flex-shrink-0 w-20 text-right">
                      <span className="text-sm font-bold text-primary">{item.time}</span>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 pb-6 border-l-2 border-border pl-4 -ml-5">
                      <p className="text-muted-foreground">{item.text}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}

              <AnimatedSection delay={500}>
                <Card className="mt-8 border-destructive/20 bg-destructive/5">
                  <CardContent className="p-6 text-center">
                    <p className="text-foreground font-medium">
                      {content.dayInLife.conclusion}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Section 4: O Verdadeiro Problema */}
        <section className="py-12 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                {content.problem.title}
              </h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
              {content.problem.stats.map((stat, index) => (
                <AnimatedSection key={index} delay={index * 150}>
                  <Card className="text-center h-full">
                    <CardContent className="p-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                        <DollarSign className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                        {stat.value}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection className="text-center">
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                {content.problem.support}
              </p>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleCtaClick("problem")}
                className="font-semibold"
              >
                {content.problem.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </AnimatedSection>
          </div>
        </section>

        {/* Section 5: Por Que Isso Acontece */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                {content.whyHappens.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {content.whyHappens.subtitle}
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {content.whyHappens.cards.map((card, index) => (
                <AnimatedSection key={index} delay={index * 150}>
                  <Card className="h-full">
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                        <Timer className="h-6 w-6 text-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                      <p className="text-sm text-muted-foreground">{card.text}</p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: A Solução */}
        <section className="py-12 md:py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <AnimatedSection className="text-center md:text-left">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">
                  {content.solution.title}
                </h2>
                <p className="text-lg opacity-90 mb-8">
                  {content.solution.subtitle}
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  {content.solution.features.map((feature, index) => (
                    <AnimatedSection key={index} delay={index * 100}>
                      <div className="text-center p-4 rounded-xl bg-primary-foreground/10 backdrop-blur">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-foreground/20 mb-3">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <h3 className="font-semibold mb-1 text-sm">{feature.title}</h3>
                        <p className="text-xs opacity-80">{feature.text}</p>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </AnimatedSection>
              
              {images.solution && (
                <AnimatedSection delay={200} className="hidden md:block">
                  <img
                    src={images.solution}
                    alt="Solução"
                    className="w-full rounded-2xl shadow-2xl"
                    loading="lazy"
                  />
                </AnimatedSection>
              )}
            </div>
          </div>
        </section>

        {/* Section 7: Como Funciona */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                {content.howItWorks.title}
              </h2>
            </AnimatedSection>

            <div className="max-w-3xl mx-auto mb-10">
              {content.howItWorks.steps.map((step, index) => (
                <AnimatedSection key={index} delay={index * 150}>
                  <div className="flex items-center gap-4 md:gap-6 mb-8 last:mb-0">
                    <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl md:text-2xl font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                      <p className="text-muted-foreground">{step.text}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection className="text-center">
              <Button
                size="lg"
                onClick={() => handleCtaClick("how_it_works")}
                className="font-semibold"
              >
                {content.howItWorks.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </AnimatedSection>
          </div>
        </section>

        {/* Section 8: O Que Muda */}
        <section className="py-12 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                {content.whatChanges.title}
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {content.whatChanges.benefits.map((benefit, index) => (
                <AnimatedSection key={index} delay={index * 100}>
                  <Card className="h-full">
                    <CardContent className="p-4 text-center">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-sm mb-1">{benefit.title}</h3>
                      <p className="text-xs text-muted-foreground">{benefit.text}</p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Section 9: Para Quem */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                {content.whoItsFor.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {content.whoItsFor.subtitle}
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Section 10: Sobre */}
        <section className="py-12 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-10">
              <Badge variant="outline" className="mb-4">
                {content.aboutCompany.tagline}
              </Badge>
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                {content.aboutCompany.headline}
              </h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              {content.aboutCompany.differentiators.map((diff, index) => (
                <AnimatedSection key={index} delay={index * 150}>
                  <Card className="h-full">
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                        <TrendingUp className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{diff.title}</h3>
                      <p className="text-sm text-muted-foreground">{diff.text}</p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection className="text-center">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                <Shield className="h-3 w-3 mr-1" />
                {content.aboutCompany.badge}
              </Badge>
            </AnimatedSection>
          </div>
        </section>

        {/* Section: Setores/Indústrias */}
        {content.industries?.items && content.industries.items.length > 0 && (
          <section className="py-12 md:py-20">
            <div className="container mx-auto px-4">
              <AnimatedSection className="text-center mb-10">
                <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                  {content.industries.title}
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {content.industries.subtitle}
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {content.industries.items.map((industry, index) => (
                  <AnimatedSection key={index} delay={index * 100}>
                    <Link 
                      to={`/setores/${industry.slug}`}
                      className="group block"
                    >
                      <Card className="overflow-hidden h-full transition-all hover:shadow-lg hover:border-primary/50">
                        {industry.image ? (
                          <img 
                            src={industry.image} 
                            alt={industry.name} 
                            className="h-32 w-full object-cover"
                          />
                        ) : (
                          <div className="h-32 bg-muted flex items-center justify-center">
                            <Building2 className="h-10 w-10 text-muted-foreground" />
                          </div>
                        )}
                        <CardContent className="p-4 text-center">
                          <h3 className="font-semibold group-hover:text-primary transition-colors">
                            {industry.name}
                          </h3>
                        </CardContent>
                      </Card>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Section 11: CTA Final */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-10">
              <h2 className="text-2xl md:text-4xl font-bold mb-6">
                {content.finalCta.title}
              </h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
                {content.finalCta.text}
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto mb-10">
              {content.finalCta.pillars.map((pillar, index) => (
                <AnimatedSection key={index} delay={index * 100}>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary-foreground/20 mb-3">
                      <Zap className="h-6 w-6 md:h-7 md:w-7" />
                    </div>
                    <h3 className="font-semibold text-sm md:text-base">{pillar.title}</h3>
                    <p className="text-xs md:text-sm opacity-80 hidden md:block">{pillar.text}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection className="text-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => handleCtaClick("final_cta")}
                className="text-lg px-10 py-7 font-bold shadow-xl hover:shadow-2xl transition-shadow"
              >
                <Calendar className="mr-2 h-6 w-6" />
                {content.finalCta.cta}
              </Button>
              <p className="mt-4 text-sm opacity-80">
                {content.finalCta.support}
              </p>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default DynamicLP;
