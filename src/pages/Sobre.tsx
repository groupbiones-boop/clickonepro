import { useTranslation } from "react-i18next";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { 
  CheckCircle, 
  Phone, 
  MessageSquare, 
  Calendar, 
  TrendingUp, 
  Clock, 
  Shield, 
  Zap, 
  Users, 
  Award,
  ArrowRight,
  Star,
  Globe,
  Brain,
  Headphones,
  BarChart3
} from "lucide-react";
import { AnimatedSection } from "@/hooks/use-scroll-animation";
import { AnimatedCounter } from "@/hooks/use-count-animation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import logoClutch from "@/assets/logo-clutch.svg";
import logoG2 from "@/assets/logo-g2.svg";
import logoCapterra from "@/assets/logo-capterra.svg";
import logoTrustpilot from "@/assets/logo-trustpilot.svg";
import officeImage from "@/assets/office-tech.jpg";

const Sobre = () => {
  const { t } = useTranslation();

  const differentiators = [
    {
      icon: Brain,
      titleKey: "whyClickone.diff1Title",
      descKey: "whyClickone.diff1Desc",
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: Globe,
      titleKey: "whyClickone.diff2Title",
      descKey: "whyClickone.diff2Desc",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: Headphones,
      titleKey: "whyClickone.diff3Title",
      descKey: "whyClickone.diff3Desc",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: BarChart3,
      titleKey: "whyClickone.diff4Title",
      descKey: "whyClickone.diff4Desc",
      color: "from-orange-500 to-amber-600"
    }
  ];

  const ecosystemFeatures = [
    { icon: Phone, label: t("whyClickone.eco1") },
    { icon: MessageSquare, label: t("whyClickone.eco2") },
    { icon: Calendar, label: t("whyClickone.eco3") },
    { icon: TrendingUp, label: t("whyClickone.eco5") },
    { icon: Users, label: t("whyClickone.eco6") }
  ];

  const stats = [
    { value: 500, suffix: "+", label: t("about.activeClients") },
    { value: 1, suffix: "M+", label: t("about.callsAnswered") },
    { value: 98, suffix: "%", label: t("about.satisfactionRate") },
    { value: 24, suffix: "/7", label: t("about.supportAvailable") }
  ];

  const commitments = [
    t("whyClickone.commitment1"),
    t("whyClickone.commitment2"),
    t("whyClickone.commitment3"),
    t("whyClickone.commitment4"),
    t("whyClickone.commitment5")
  ];

  const testimonials = [
    {
      name: "Carlos Rodriguez",
      company: "Clean Pro Services LLC",
      location: "Miami, FL",
      quote: t("whyClickone.testimonial1")
    },
    {
      name: "Maria Santos",
      company: "Santos Plumbing Inc",
      location: "Houston, TX",
      quote: t("whyClickone.testimonial2")
    },
    {
      name: "José Fernandez",
      company: "Fernandez HVAC Solutions",
      location: "Dallas, TX",
      quote: t("whyClickone.testimonial3")
    }
  ];

  return (
    <Layout>
      <SEO titleKey="seo.about.title" descriptionKey="seo.about.description" />
      
      {/* Hero Section - 2 colunas com imagem */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="fade-right">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {t("whyClickone.heroTitle")}
              </h1>
              <p className="text-xl text-gray-300">
                {t("whyClickone.heroSubtitle")}
              </p>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-left">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent rounded-3xl blur-2xl" />
                <img 
                  src={officeImage} 
                  alt="ClickOne Team" 
                  className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Nossa História - Narrativa autêntica */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fade-up">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                {t("whyClickone.storyLabel")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-8">
                {t("whyClickone.storyTitle")}
              </h2>
              
              <div className="space-y-6 text-lg text-muted-foreground">
                <p>{t("whyClickone.storyP1")}</p>
                <p>{t("whyClickone.storyP2")}</p>
                <p>{t("whyClickone.storyP3")}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Por que ClickOne? */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fade-up">
              <Card className="p-8 md:p-10 border-2 border-primary/20 bg-primary/5">
                <h3 className="text-2xl font-bold mb-6">{t("whyClickone.whyTitle")}</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>{t("whyClickone.whyP1")}</p>
                  <p>{t("whyClickone.whyP2")}</p>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <AnimatedSection key={i} animation="scale" delay={i * 100}>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-primary-foreground/80 text-sm">{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Logos */}
      <section className="py-12 bg-background border-y border-border/50">
        <div className="container">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-8">
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
                {t("whyClickone.trustedBy")}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
                <img src={logoClutch} alt="Clutch" className="h-8 md:h-10 w-auto" />
              </div>
              <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
                <img src={logoG2} alt="G2" className="h-8 md:h-10 w-auto" />
              </div>
              <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
                <img src={logoCapterra} alt="Capterra" className="h-8 md:h-10 w-auto" />
              </div>
              <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
                <img src={logoTrustpilot} alt="Trustpilot" className="h-8 md:h-10 w-auto" />
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="text-sm font-medium">4.9/5 Clutch</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="text-sm font-medium">4.8/5 G2</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50">
                <Award className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{t("whyClickone.topRated")}</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                {t("whyClickone.diffLabel")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
                {t("whyClickone.diffTitle")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("whyClickone.diffSubtitle")}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((diff, i) => (
              <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
                <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 group border-2 hover:border-primary/30">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${diff.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <diff.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{t(diff.titleKey)}</h3>
                  <p className="text-muted-foreground text-sm">{t(diff.descKey)}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Ecossistema Completo */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="fade-right">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                {t("whyClickone.ecoLabel")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
                {t("whyClickone.ecoTitle")}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t("whyClickone.ecoSubtitle")}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {ecosystemFeatures.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-card border hover:border-primary/30 transition-colors">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium">{feature.label}</span>
                  </div>
                ))}
              </div>

              <Link to="/produto/infraestrutura-vertical" className="mt-8 inline-block">
                <Button size="lg" variant="outline" className="group">
                  {t("whyClickone.ecoExplore")}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </AnimatedSection>

            <AnimatedSection animation="fade-left">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-3xl" />
                <Card className="relative p-8 bg-card/80 backdrop-blur border-2">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
                      <Zap className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold">{t("whyClickone.platformTitle")}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                      <Shield className="h-6 w-6 text-primary" />
                      <div>
                        <p className="font-semibold">{t("whyClickone.platform1Title")}</p>
                        <p className="text-sm text-muted-foreground">{t("whyClickone.platform1Desc")}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                      <Clock className="h-6 w-6 text-primary" />
                      <div>
                        <p className="font-semibold">{t("whyClickone.platform2Title")}</p>
                        <p className="text-sm text-muted-foreground">{t("whyClickone.platform2Desc")}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                      <Award className="h-6 w-6 text-primary" />
                      <div>
                        <p className="font-semibold">{t("whyClickone.platform3Title")}</p>
                        <p className="text-sm text-muted-foreground">{t("whyClickone.platform3Desc")}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Nosso Compromisso */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <AnimatedSection animation="fade-up">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                {t("whyClickone.commitmentLabel")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
                {t("whyClickone.commitmentTitle")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("whyClickone.commitmentIntro")}
              </p>
            </div>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fade-up" delay={100}>
              <Card className="p-8 border-2 border-primary/20">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {commitments.map((commitment, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-primary/5">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="font-medium text-sm">{commitment}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                {t("whyClickone.testimonialsLabel")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4">
                {t("whyClickone.testimonialsTitle")}
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
                <Card className="p-6 h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 flex-grow italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-primary-foreground/10 via-transparent to-transparent" />
        <div className="container relative">
          <AnimatedSection animation="scale">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t("whyClickone.ctaTitle")}
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8">
                {t("whyClickone.ctaSubtitle")}
              </p>
              <Link to="/agendar-demo">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  {t("common.bookFreeDemo")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Sobre;
