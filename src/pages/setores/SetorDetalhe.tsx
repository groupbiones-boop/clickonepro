import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  Headphones
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
import industryVeterinary from "@/assets/industry-veterinary.jpg";
import industryVeterinary2 from "@/assets/industry-veterinary-2.jpg";
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

// Map feature icon names to actual icons
const featureIcons: Record<string, typeof Phone> = {
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
};

// Default feature icons for each position if not specified
const defaultFeatureIcons = [Phone, Calendar, Users, BarChart3, MessageSquare, Zap];

const SetorDetalhe = () => {
  const { setor } = useParams();
  const { t } = useTranslation('industries');

  // Check if industry exists in translations
  const industryKey = setor || '';
  const industryExists = t(`${industryKey}.name`, { defaultValue: '' }) !== '';

  if (!industryExists) {
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

  // Get images for industry
  const images = industryImages[industryKey] || industryImages.limpeza;

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

  // Common translations
  const problemLabel = t('common.problemLabel');
  const solutionLabel = t('common.solutionLabel');
  const getStarted = t('common.getStarted');
  const learnMore = t('common.learnMore');
  const whatMakesDifferent = t('common.whatMakesDifferent');
  const keyFeatures = t('common.keyFeatures');
  const marketStats = t('common.marketStats');
  const popularUseCases = t('common.popularUseCases');
  const whatClientsSay = t('common.whatClientsSay');
  const faq = t('common.faq');
  const readyToTransform = t('common.readyToTransform');
  const scheduleDemo = t('common.scheduleDemo');
  const bookFreeDemo = t('common.bookFreeDemo');

  return (
    <Layout>
      {/* Hero Section */}
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
              <span className="text-primary-foreground/80 text-sm font-semibold tracking-wider mb-2 block">
                {heroSubtitle}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {heroTitle}
              </h1>
              <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
                {heroDescription}
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

      {/* Problem & Solution Section - Side by Side */}
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
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{problemTitle}</h2>
                  <ul className="space-y-3 flex-grow">
                    {Array.isArray(problems) && problems.map((problem, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-destructive rounded-full mt-2" />
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

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            {marketStats}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {Array.isArray(stats) && stats.map((stat, index) => {
              const numericMatch = stat.value.match(/^(\d+\.?\d*)(.*)$/);
              const numericValue = numericMatch ? parseFloat(numericMatch[1]) : 0;
              const suffix = numericMatch ? numericMatch[2] : stat.value;
              
              return (
                <AnimatedSection 
                  key={index} 
                  animation="scale"
                  delay={index * 150}
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

      {/* Features Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {keyFeatures}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(features) && features.map((feature, index) => {
              const Icon = defaultFeatureIcons[index % defaultFeatureIcons.length];
              return (
                <Card 
                  key={index} 
                  className="hover:shadow-lg transition-shadow hover-scale animate-fade-in"
                  style={{ animationDelay: `${0.15 + index * 0.08}s`, animationFillMode: 'both' }}
                >
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {popularUseCases}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.isArray(useCases) && useCases.map((useCase, index) => (
              <div 
                key={index} 
                className="bg-background rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow hover-scale animate-fade-in"
                style={{ animationDelay: `${0.15 + index * 0.08}s`, animationFillMode: 'both' }}
              >
                <h4 className="font-semibold mb-2">{useCase.title}</h4>
                <p className="text-muted-foreground text-sm">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      {Array.isArray(testimonials) && testimonials.length > 0 && (
        <TestimonialsCarousel testimonials={testimonials} industry={name} />
      )}

      {/* Integrations */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              <span className="text-primary text-sm font-semibold tracking-wider mb-2 block">
                {t('common.integrations', { defaultValue: 'INTEGRAÇÕES COMPLETAS' })}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t('common.worksWithTools', { defaultValue: 'Funciona com suas ferramentas' })}
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                {t('common.integrationsDescription', { defaultValue: 'Chamadas, agendamentos e pagamentos são automaticamente registrados nos seus sistemas. Sincronização em tempo real com mais de 50 integrações.' })}
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>{t('common.integration1', { defaultValue: 'WhatsApp Business, Instagram e Facebook' })}</span>
                </li>
                <li className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: '0.25s', animationFillMode: 'both' }}>
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>{t('common.integration2', { defaultValue: 'E-mail e SMS automatizados' })}</span>
                </li>
                <li className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>{t('common.integration3', { defaultValue: 'Stripe, PayPal e sistemas de pagamento' })}</span>
                </li>
                <li className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: '0.35s', animationFillMode: 'both' }}>
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>{t('common.integration4', { defaultValue: 'Google Calendar e Outlook' })}</span>
                </li>
              </ul>
            </div>
            <div className="bg-muted/50 rounded-2xl p-8 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              <h3 className="text-xl font-semibold mb-6">{t('common.scheduleConsultation', { defaultValue: 'Agende uma consulta' })}</h3>
              <p className="text-muted-foreground mb-6">
                {t('common.improveExperience', { defaultValue: 'Melhore a experiência do cliente com atendimento 24/7 alimentado por IA.' })}
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm">{t('common.benefit1', { defaultValue: 'IA configurada para seu setor' })}</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm">{t('common.benefit2', { defaultValue: 'Atendimento inteligente com transferência quando necessário' })}</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm">{t('common.benefit3', { defaultValue: 'Integração com suas ferramentas existentes' })}</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm">{t('common.benefit4', { defaultValue: 'Equipe dedicada para configuração perfeita' })}</span>
                </li>
              </ul>
              <Button className="w-full" size="lg" asChild>
                <Link to="/agendar-demo">{t('common.contactUs', { defaultValue: 'Fale Conosco' })}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <span className="text-primary text-sm font-semibold tracking-wider mb-2 block">
              {faq}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('common.faqTitle', { defaultValue: 'Perguntas Frequentes', industry: name })}
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <Accordion type="single" collapsible className="w-full">
              {Array.isArray(faqs) && faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="border-b border-border">
                  <AccordionTrigger className="text-left text-lg font-medium hover:text-primary py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            <p className="text-muted-foreground mb-4">
              {t('common.stillHaveQuestions', { defaultValue: 'Ainda tem dúvidas? Fale com nossa equipe.' })}
            </p>
            <Button variant="outline" asChild>
              <Link to="/contato">{t('common.getInTouch', { defaultValue: 'Entrar em Contato' })}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {readyToTransform}
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            {scheduleDemo}
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
        </div>
      </section>
    </Layout>
  );
};

export default SetorDetalhe;