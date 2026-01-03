import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { 
  Layers, 
  Globe,
  Share2, 
  Star, 
  Mail, 
  Brain,
  Check,
  ArrowRight,
  Phone,
  MessageSquare,
  Smartphone,
  Zap,
  TrendingUp,
  Users,
  Clock,
  Shield
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useCountAnimation } from "@/hooks/use-count-animation";

const InfraestruturaVertical = () => {
  const { t } = useTranslation();
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: overviewRef, isVisible: overviewVisible } = useScrollAnimation();
  const { ref: benefitsRef, isVisible: benefitsVisible } = useScrollAnimation();

  const modules = [
    {
      id: "omnichannel",
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
      features: [
        t("verticalInfra.modules.omnichannel.feature1"),
        t("verticalInfra.modules.omnichannel.feature2"),
        t("verticalInfra.modules.omnichannel.feature3"),
      ],
      channels: [Phone, MessageSquare, Smartphone]
    },
    {
      id: "socialMedia",
      icon: Share2,
      color: "from-pink-500 to-rose-500",
      features: [
        t("verticalInfra.modules.socialMedia.feature1"),
        t("verticalInfra.modules.socialMedia.feature2"),
        t("verticalInfra.modules.socialMedia.feature3"),
      ]
    },
    {
      id: "googleBusiness",
      icon: Star,
      color: "from-amber-500 to-orange-500",
      features: [
        t("verticalInfra.modules.googleBusiness.feature1"),
        t("verticalInfra.modules.googleBusiness.feature2"),
        t("verticalInfra.modules.googleBusiness.feature3"),
      ]
    },
    {
      id: "emailMarketing",
      icon: Mail,
      color: "from-green-500 to-emerald-500",
      features: [
        t("verticalInfra.modules.emailMarketing.feature1"),
        t("verticalInfra.modules.emailMarketing.feature2"),
        t("verticalInfra.modules.emailMarketing.feature3"),
      ]
    },
    {
      id: "crm",
      icon: Brain,
      color: "from-purple-500 to-violet-500",
      features: [
        t("verticalInfra.modules.crm.feature1"),
        t("verticalInfra.modules.crm.feature2"),
        t("verticalInfra.modules.crm.feature3"),
      ]
    },
  ];

  const benefits = [
    {
      icon: Layers,
      titleKey: "benefit1Title",
      descKey: "benefit1Desc"
    },
    {
      icon: TrendingUp,
      titleKey: "benefit2Title",
      descKey: "benefit2Desc"
    },
    {
      icon: Users,
      titleKey: "benefit3Title",
      descKey: "benefit3Desc"
    },
    {
      icon: Zap,
      titleKey: "benefit4Title",
      descKey: "benefit4Desc"
    }
  ];

  const stats = [
    { value: "5+", label: t("verticalInfra.stat1") },
    { value: "6+", label: t("verticalInfra.stat2") },
    { value: "70%", label: t("verticalInfra.stat3") },
    { value: "40%", label: t("verticalInfra.stat4") },
  ];

  return (
    <Layout>
      <SEO titleKey="seo.verticalInfra.title" descriptionKey="seo.verticalInfra.description" />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-20 md:py-28 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-foreground rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
        </div>
        
        <div 
          ref={heroRef}
          className={`container relative z-10 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 mb-6">
              <Layers className="w-4 h-4 mr-2" />
              {t("verticalInfra.badge")}
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t("verticalInfra.title")}{" "}
              <span className="bg-gradient-to-r from-primary-foreground/80 to-primary-foreground bg-clip-text">
                {t("verticalInfra.titleHighlight")}
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t("verticalInfra.subtitle")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                <Link to="/agendar-demo">
                  {t("verticalInfra.cta")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="hero">
                <Link to="/contato">
                  {t("verticalInfra.ctaSecondary")}
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-foreground">{stat.value}</div>
                <div className="text-sm text-primary-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 md:py-28 bg-background">
        <div 
          ref={overviewRef}
          className={`container transition-all duration-700 ${overviewVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("verticalInfra.overviewTitle")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("verticalInfra.overviewSubtitle")}
            </p>
          </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <Card 
                key={module.id} 
                className="group hover:shadow-xl transition-all duration-300 border-border/50 overflow-hidden"
              >
                <CardContent className="p-6">
                  {/* Icon with Gradient */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <module.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {t(`verticalInfra.modules.${module.id}.title`)}
                  </h3>
                  
                  <p className="text-sm font-medium text-primary mb-3">
                    {t(`verticalInfra.modules.${module.id}.subtitle`)}
                  </p>
                  
                  <p className="text-muted-foreground text-sm mb-4">
                    {t(`verticalInfra.modules.${module.id}.desc`)}
                  </p>
                  
                  {/* Features List */}
                  <ul className="space-y-2">
                    {module.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Connection Diagram Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-background rounded-2xl p-8 md:p-12 shadow-lg border border-border/50">
              {/* Central Hub */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg mb-8">
                  <Layers className="w-12 h-12 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground text-center mb-2">ClickOne AI</h3>
                <p className="text-muted-foreground text-center mb-8">Plataforma Unificada</p>
                
                {/* Connected Modules */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full">
                  {modules.map((module) => (
                    <div key={module.id} className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${module.color} flex items-center justify-center`}>
                        <module.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs font-medium text-center text-foreground">
                        {t(`verticalInfra.modules.${module.id}.title`)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-28 bg-background">
        <div 
          ref={benefitsRef}
          className={`container transition-all duration-700 ${benefitsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("verticalInfra.benefitsTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow border-border/50">
                <CardContent className="p-0">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {t(`verticalInfra.${benefit.titleKey}`)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(`verticalInfra.${benefit.descKey}`)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("verticalInfra.ctaTitle")}
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              {t("verticalInfra.ctaSubtitle")}
            </p>
            <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Link to="/agendar-demo">
                {t("verticalInfra.cta")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default InfraestruturaVertical;
