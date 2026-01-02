import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import { AnimatedSection } from "@/hooks/use-scroll-animation";
import { AnimatedCounter } from "@/hooks/use-count-animation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  CheckCircle, 
  ArrowRight, 
  Phone, 
  Calendar, 
  Users, 
  Clock, 
  TrendingUp, 
  MessageSquare,
  Star,
  BarChart3,
  Zap,
  Shield,
  Headphones,
  XCircle,
  Settings,
  Rocket,
  Target,
  HeadphonesIcon
} from "lucide-react";
import industryCleaning from "@/assets/industry-cleaning-new.jpg";
import industryConstruction from "@/assets/industry-construction.jpg";
import industryHvac from "@/assets/industry-hvac.jpg";
import industryPlumbing from "@/assets/industry-plumbing-new.jpg";
import industryElectrical from "@/assets/industry-electrical.jpg";
import industryLandscaping from "@/assets/industry-landscaping.jpg";
import industryPool from "@/assets/industry-pool.jpg";
import industryMoving from "@/assets/industry-moving.jpg";
import industryRoofing from "@/assets/industry-roofing.jpg";
import industryCleaning2 from "@/assets/industry-cleaning-2.jpg";
import industryConstruction2 from "@/assets/industry-construction-2.jpg";
import industryHvac2 from "@/assets/industry-hvac-2.jpg";
import industryPlumbing2 from "@/assets/industry-plumbing-2.jpg";
import industryElectrical2 from "@/assets/industry-electrical-2.jpg";
import industryLandscaping2 from "@/assets/industry-landscaping-2.jpg";
import industryPool2 from "@/assets/industry-pool-2.jpg";
import industryMoving2 from "@/assets/industry-moving-2.jpg";
import industryRoofing2 from "@/assets/industry-roofing-2.jpg";
import industryPestControl from "@/assets/industry-pest-control.jpg";
import industryPestControl2 from "@/assets/industry-pest-control-2.jpg";
import industryLocksmith from "@/assets/industry-locksmith.jpg";
import industryLocksmith2 from "@/assets/industry-locksmith-2.jpg";
import industryPainters from "@/assets/industry-painters.jpg";
import industryPainters2 from "@/assets/industry-painters-2.jpg";
import industryDentist from "@/assets/industry-dentist.jpg";
import industryDentist2 from "@/assets/industry-dentist-2.jpg";
import industryChiropractor from "@/assets/industry-chiropractor.jpg";
import industryChiropractor2 from "@/assets/industry-chiropractor-2.jpg";
import industryVeterinary from "@/assets/industry-veterinary-new.jpg";
import industryVeterinary2 from "@/assets/industry-veterinary-2-new.jpg";
import industryMedicalClinic from "@/assets/industry-medical-clinic.jpg";
import industryMedicalClinic2 from "@/assets/industry-medical-clinic-2.jpg";
import industryHairSalon from "@/assets/industry-hair-salon.jpg";
import industryHairSalon2 from "@/assets/industry-hair-salon-2.jpg";
import industrySpaMassage from "@/assets/industry-spa-massage.jpg";
import industrySpaMassage2 from "@/assets/industry-spa-massage-2.jpg";
import industryHomeInspection from "@/assets/industry-home-inspection.jpg";
import industryHomeInspection2 from "@/assets/industry-home-inspection-2.jpg";
import industryFlooring from "@/assets/industry-flooring.jpg";
import industryFlooring2 from "@/assets/industry-flooring-2.jpg";

// Map industry slugs to images
const industryImages: Record<string, { primary: string; secondary: string }> = {
  limpeza: { primary: industryCleaning, secondary: industryCleaning2 },
  construcao: { primary: industryConstruction, secondary: industryConstruction2 },
  hvac: { primary: industryHvac, secondary: industryHvac2 },
  encanamento: { primary: industryPlumbing, secondary: industryPlumbing2 },
  eletrica: { primary: industryElectrical, secondary: industryElectrical2 },
  paisagismo: { primary: industryLandscaping, secondary: industryLandscaping2 },
  piscinas: { primary: industryPool, secondary: industryPool2 },
  mudancas: { primary: industryMoving, secondary: industryMoving2 },
  telhados: { primary: industryRoofing, secondary: industryRoofing2 },
  "controle-pragas": { primary: industryPestControl, secondary: industryPestControl2 },
  chaveiro: { primary: industryLocksmith, secondary: industryLocksmith2 },
  pintura: { primary: industryPainters, secondary: industryPainters2 },
  pisos: { primary: industryFlooring, secondary: industryFlooring2 },
  "inspecao-residencial": { primary: industryHomeInspection, secondary: industryHomeInspection2 },
  "clinica-medica": { primary: industryMedicalClinic, secondary: industryMedicalClinic2 },
  dentista: { primary: industryDentist, secondary: industryDentist2 },
  quiropraxia: { primary: industryChiropractor, secondary: industryChiropractor2 },
  veterinario: { primary: industryVeterinary, secondary: industryVeterinary2 },
  "salao-beleza": { primary: industryHairSalon, secondary: industryHairSalon2 },
  "spa-massagem": { primary: industrySpaMassage, secondary: industrySpaMassage2 },
};

// Default feature icons for each position
const defaultFeatureIcons = [Phone, Calendar, Users, BarChart3, MessageSquare, Zap];

// How it works step icons
const stepIcons = [Settings, Headphones, Target, Rocket];

const SetorDetalhe = () => {
  const { slug } = useParams();
  const { t } = useTranslation('industries');

  // Check if industry exists using the images map
  const industryKey = slug || '';
  const images = industryImages[industryKey];

  if (!images) {
    return (
      <Layout>
        <div className="container py-24 text-center">
          <h1 className="text-3xl font-bold mb-4">{t('common.industryNotFound', { defaultValue: 'Setor não encontrado' })}</h1>
          <Button asChild>
            <Link to="/setores">{t('common.backToIndustries', { defaultValue: 'Voltar para Setores' })}</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  // Get translated data
  const name = t(`${industryKey}.name`);
  const heroTitle = t(`${industryKey}.heroTitle`);
  const heroSubtitle = t(`${industryKey}.heroSubtitle`);
  const heroDescription = t(`${industryKey}.heroDescription`);
  const problemTitle = t(`${industryKey}.problemTitle`);
  const problems = t(`${industryKey}.problems`, { returnObjects: true }) as string[];
  const solutionTitle = t(`${industryKey}.solutionTitle`);
  const solutionDescription = t(`${industryKey}.solutionDescription`);
  const solutions = t(`${industryKey}.solutions`, { returnObjects: true }) as Array<{ title: string; description: string }>;
  const features = t(`${industryKey}.features`, { returnObjects: true }) as Array<{ title: string; description: string }>;
  const stats = t(`${industryKey}.stats`, { returnObjects: true }) as Array<{ value: string; label: string }>;
  const useCases = t(`${industryKey}.useCases`, { returnObjects: true }) as Array<{ title: string; description: string }>;
  const testimonials = t(`${industryKey}.testimonials`, { returnObjects: true }) as Array<{ quote: string; author: string; role?: string; company: string; location?: string }>;
  const faqs = t(`${industryKey}.faqs`, { returnObjects: true }) as Array<{ question: string; answer: string }>;
  const howItWorks = t('common.howItWorks', { returnObjects: true }) as Array<{ title: string; description: string }>;

  // Common translations
  const problemLabel = t('common.problemLabel');
  const solutionLabel = t('common.solutionLabel');
  const getStarted = t('common.getStarted');
  const learnMore = t('common.learnMore');
  const keyFeatures = t('common.keyFeatures');
  const marketStats = t('common.marketStats');
  const popularUseCases = t('common.popularUseCases');
  const faq = t('common.faq');
  const readyToTransform = t('common.readyToTransform');
  const scheduleDemo = t('common.scheduleDemo');
  const bookFreeDemo = t('common.bookFreeDemo');
  const implementationBadge = t('common.implementationBadge');
  const howItWorksTitle = t('common.howItWorksTitle');
  const implementationHighlight = t('common.implementationHighlight');
  const trustedBadge = t('common.trustedBadge');
  const ctaSubtitle = t('common.ctaSubtitle');

  return (
    <Layout>
      {/* FOLD 1: Hero Section with 72h Badge */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${images.primary})`,
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/90 to-primary/80" />
        
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-primary-foreground animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              {/* Industry Badge */}
              <span className="text-primary-foreground/80 text-sm font-semibold tracking-wider mb-2 block">
                {heroSubtitle}
              </span>
              
              {/* 72h Implementation Badge */}
              <div className="mb-4">
                <Badge className="bg-secondary text-secondary-foreground px-4 py-2 text-sm font-semibold animate-pulse">
                  <Clock className="w-4 h-4 mr-2" />
                  {implementationBadge}
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {heroTitle}
              </h1>
              <p className="text-xl text-primary-foreground/90 mb-6 leading-relaxed">
                {heroDescription}
              </p>
              
              {/* Trust Badge */}
              <p className="text-primary-foreground/70 text-sm mb-8 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                {trustedBadge}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" asChild className="font-semibold">
                  <Link to="/agendar-demo">
                    {getStarted}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="hero" asChild>
                  <Link to="/produto/recepcionista-ia-voz">{learnMore}</Link>
                </Button>
              </div>
            </div>
            <div className="relative animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={images.secondary}
                  alt={name}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOLD 2: Problem vs Solution - Side by Side */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Problem Section */}
            <AnimatedSection animation="fade" className="h-full">
              <Card className="border-destructive/30 bg-destructive/5 h-full">
                <CardContent className="pt-6 h-full flex flex-col">
                  <span className="text-destructive text-sm font-semibold tracking-wider mb-2 block">
                    {problemLabel}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">{problemTitle}</h2>
                  <ul className="space-y-4 flex-grow">
                    {Array.isArray(problems) && problems.map((problem, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{problem}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Solution Section */}
            <AnimatedSection animation="fade" delay={100} className="h-full">
              <Card className="border-primary/30 bg-primary/5 h-full">
                <CardContent className="pt-6 h-full flex flex-col">
                  <span className="text-primary text-sm font-semibold tracking-wider mb-2 block">
                    {solutionLabel}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{solutionTitle}</h2>
                  <p className="text-muted-foreground mb-6">{solutionDescription}</p>
                  <div className="grid sm:grid-cols-2 gap-4 flex-grow">
                    {Array.isArray(solutions) && solutions.map((solution, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium block">{solution.title}</span>
                          <span className="text-sm text-muted-foreground">{solution.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FOLD 3: How It Works - Step by Step with 72h Highlight */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <AnimatedSection animation="fade">
              <span className="text-primary text-sm font-semibold tracking-wider mb-2 block">
                {t('common.simpleProcess', { defaultValue: 'PROCESSO SIMPLES' })}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {howItWorksTitle}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {implementationHighlight}
              </p>
            </AnimatedSection>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.isArray(howItWorks) && howItWorks.map((step, index) => {
              const Icon = stepIcons[index % stepIcons.length];
              const isFirst = index === 0;
              
              return (
                <AnimatedSection key={index} animation="scale" delay={index * 100}>
                  <Card className={`h-full relative ${isFirst ? 'border-primary border-2' : ''}`}>
                    {isFirst && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold">
                          <Clock className="w-3 h-3 mr-1" />
                          72h
                        </Badge>
                      </div>
                    )}
                    <CardContent className="pt-8 text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-primary">{index + 1}</span>
                      </div>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground text-sm">{step.description}</p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOLD 4: Key Features Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <AnimatedSection animation="fade">
              <span className="text-primary text-sm font-semibold tracking-wider mb-2 block">
                {t('common.featuresLabel', { defaultValue: 'RECURSOS' })}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {keyFeatures}
              </h2>
            </AnimatedSection>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(features) && features.map((feature, index) => {
              const Icon = defaultFeatureIcons[index % defaultFeatureIcons.length];
              return (
                <AnimatedSection key={index} animation="scale" delay={index * 80}>
                  <Card className="hover:shadow-lg transition-shadow hover-scale h-full">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOLD 5: Market Stats with 72h Highlight */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <AnimatedSection animation="fade">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {marketStats}
            </h2>
            <p className="text-primary-foreground/80 text-center mb-12 max-w-2xl mx-auto">
              {t('common.statsSubtitle', { defaultValue: 'Dados de mercado que demonstram a importância do atendimento rápido' })}
            </p>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-4 gap-8">
            {/* 72h Implementation Stat */}
            <AnimatedSection animation="scale" className="text-center">
              <span className="text-5xl md:text-6xl font-bold block mb-4">
                72h
              </span>
              <p className="text-primary-foreground/80">
                {t('common.implementationTime', { defaultValue: 'Tempo máximo de implementação da ClickOne AI' })}
              </p>
            </AnimatedSection>
            
            {Array.isArray(stats) && stats.map((stat, index) => {
              const numericMatch = stat.value.match(/^(\d+\.?\d*)(.*)$/);
              const numericValue = numericMatch ? parseFloat(numericMatch[1]) : 0;
              const suffix = numericMatch ? numericMatch[2] : stat.value;
              
              return (
                <AnimatedSection 
                  key={index} 
                  animation="scale"
                  delay={(index + 1) * 150}
                  className="text-center"
                >
                  <span className="text-5xl md:text-6xl font-bold block mb-4">
                    {numericValue > 0 ? (
                      <AnimatedCounter end={numericValue} suffix={suffix} duration={2500} />
                    ) : (
                      stat.value
                    )}
                  </span>
                  <p className="text-primary-foreground/80">{stat.label}</p>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOLD 6: Use Cases */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <AnimatedSection animation="fade">
              <span className="text-primary text-sm font-semibold tracking-wider mb-2 block">
                {t('common.useCasesLabel', { defaultValue: 'APLICAÇÕES PRÁTICAS' })}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {popularUseCases}
              </h2>
            </AnimatedSection>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.isArray(useCases) && useCases.map((useCase, index) => (
              <AnimatedSection key={index} animation="fade" delay={index * 80}>
                <div className="bg-muted/30 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow hover-scale h-full">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">{useCase.title}</h4>
                  <p className="text-muted-foreground text-sm">{useCase.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FOLD 7: Testimonials Carousel */}
      {Array.isArray(testimonials) && testimonials.length > 0 && (
        <TestimonialsCarousel testimonials={testimonials} industry={name} />
      )}

      {/* FOLD 8: FAQ Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <AnimatedSection animation="fade">
              <span className="text-primary text-sm font-semibold tracking-wider mb-2 block">
                {faq}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('common.faqTitle', { defaultValue: 'Perguntas Frequentes' })}
              </h2>
            </AnimatedSection>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <AnimatedSection animation="fade" delay={100}>
              <Accordion type="single" collapsible className="w-full">
                {Array.isArray(faqs) && faqs.map((faqItem, index) => (
                  <AccordionItem key={index} value={`faq-${index}`} className="border-b border-border">
                    <AccordionTrigger className="text-left text-lg font-medium hover:text-primary py-6">
                      {faqItem.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base pb-6">
                      {faqItem.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AnimatedSection>
          </div>

          <AnimatedSection animation="fade" delay={200}>
            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                {t('common.stillHaveQuestions', { defaultValue: 'Ainda tem dúvidas? Fale com nossa equipe.' })}
              </p>
              <Button variant="outline" asChild>
                <Link to="/contato">{t('common.getInTouch', { defaultValue: 'Entrar em Contato' })}</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FOLD 9: Final CTA with 72h Highlight */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <AnimatedSection animation="scale">
            {/* 72h Badge */}
            <Badge className="bg-secondary text-secondary-foreground px-4 py-2 text-sm font-semibold mb-6 inline-flex items-center">
              <Rocket className="w-4 h-4 mr-2" />
              {implementationBadge}
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {readyToTransform}
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-4 max-w-2xl mx-auto">
              {scheduleDemo}
            </p>
            <p className="text-primary-foreground/90 text-xl font-semibold mb-8">
              {ctaSubtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/agendar-demo">
                  {bookFreeDemo}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="hero" asChild>
                <Link to="/setores">{t('common.viewOtherIndustries', { defaultValue: 'Ver Outros Setores' })}</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default SetorDetalhe;
