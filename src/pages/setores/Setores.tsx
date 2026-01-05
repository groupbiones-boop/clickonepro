import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { AnimatedSection } from "@/hooks/use-scroll-animation";
import industryCleaning from "@/assets/industry-cleaning.jpg";
import industryConstruction from "@/assets/industry-construction.jpg";
import industryHvac from "@/assets/industry-hvac.jpg";
import industryPlumbing from "@/assets/industry-plumbing-new.jpg";
import industryElectrical from "@/assets/industry-electrical.jpg";
import industryLandscaping from "@/assets/industry-landscaping.jpg";
import industryPool from "@/assets/industry-pool.jpg";
import industryMoving from "@/assets/industry-moving.jpg";
import industryRoofing from "@/assets/industry-roofing.jpg";
import industryPestControl from "@/assets/industry-pest-control.jpg";
import industryLocksmith from "@/assets/industry-locksmith-new.jpg";
import industryPainters from "@/assets/industry-painters.jpg";
import industryDentist from "@/assets/industry-dentist.jpg";
import industryChiropractor from "@/assets/industry-chiropractor.jpg";
import industryVeterinary from "@/assets/industry-veterinary.jpg";
import industryMedicalClinic from "@/assets/industry-medical-clinic.jpg";
import industryHairSalon from "@/assets/industry-hair-salon.jpg";
import industrySpaMassage from "@/assets/industry-spa-massage.jpg";
import industryHomeInspection from "@/assets/industry-home-inspection.jpg";
import industryFlooring from "@/assets/industry-flooring.jpg";

const Setores = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  const industries = [
    { name: t("sectors.cleaning"), slug: "limpeza", image: industryCleaning, description: t("sectors.cleaningDesc") },
    { name: t("sectors.construction"), slug: "construcao", image: industryConstruction, description: t("sectors.constructionDesc") },
    { name: t("sectors.hvac"), slug: "hvac", image: industryHvac, description: t("sectors.hvacDesc") },
    { name: t("sectors.plumbing"), slug: "encanamento", image: industryPlumbing, description: t("sectors.plumbingDesc") },
    { name: t("sectors.electrical"), slug: "eletrica", image: industryElectrical, description: t("sectors.electricalDesc") },
    { name: t("sectors.landscaping"), slug: "paisagismo", image: industryLandscaping, description: t("sectors.landscapingDesc") },
    { name: t("sectors.pool"), slug: "piscinas", image: industryPool, description: t("sectors.poolDesc") },
    { name: t("sectors.moving"), slug: "mudancas", image: industryMoving, description: t("sectors.movingDesc") },
    { name: t("sectors.roofing"), slug: "telhados", image: industryRoofing, description: t("sectors.roofingDesc") },
    { name: t("sectors.pestControl"), slug: "controle-pragas", image: industryPestControl, description: t("sectors.pestControlDesc") },
    { name: t("sectors.locksmith"), slug: "chaveiro", image: industryLocksmith, description: t("sectors.locksmithDesc") },
    { name: t("sectors.painters"), slug: "pintura", image: industryPainters, description: t("sectors.paintersDesc") },
    { name: t("sectors.dentist"), slug: "dentista", image: industryDentist, description: t("sectors.dentistDesc") },
    { name: t("sectors.chiropractor"), slug: "quiropraxia", image: industryChiropractor, description: t("sectors.chiropractorDesc") },
    { name: t("sectors.veterinary"), slug: "veterinario", image: industryVeterinary, description: t("sectors.veterinaryDesc") },
    { name: t("sectors.medicalClinic"), slug: "clinica-medica", image: industryMedicalClinic, description: t("sectors.medicalClinicDesc") },
    { name: t("sectors.hairSalon"), slug: "salao-beleza", image: industryHairSalon, description: t("sectors.hairSalonDesc") },
    { name: t("sectors.spaMassage"), slug: "spa-massagem", image: industrySpaMassage, description: t("sectors.spaMassageDesc") },
    { name: t("sectors.homeInspection"), slug: "inspecao-residencial", image: industryHomeInspection, description: t("sectors.homeInspectionDesc") },
    { name: t("sectors.flooring"), slug: "pisos", image: industryFlooring, description: t("sectors.flooringDesc") },
  ];

  const filteredIndustries = industries.filter((industry) =>
    industry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    industry.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <SEO titleKey="seo.sectors.title" descriptionKey="seo.sectors.description" />
      <section className="py-16 md:py-24 bg-foreground">
        <div className="container">
          <AnimatedSection animation="fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-6">
              {t("sectors.title")}
            </h1>
            <p className="text-lg md:text-xl text-background/70 max-w-2xl mb-10">
              {t("sectors.subtitle")}
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <div className="relative max-w-lg mb-12">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t("sectors.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-6 text-base bg-background border-0 rounded-lg"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <p className="text-background/60 text-sm mb-4">
              {filteredIndustries.length} {t("sectors.available")}
            </p>
            <div className="flex flex-wrap gap-3">
              {filteredIndustries.map((industry) => (
                <Link key={industry.slug} to={`/setores/${industry.slug}`}>
                  <Button
                    variant="outline"
                    className="bg-background text-foreground border-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                  >
                    {industry.name}
                  </Button>
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredIndustries.map((industry, index) => (
              <AnimatedSection key={industry.slug} animation="fade-up" delay={index % 6 * 100}>
                <Link 
                  to={`/setores/${industry.slug}`}
                  className="group block"
                >
                  <div className="overflow-hidden rounded-xl mb-4">
                    <img 
                      src={industry.image} 
                      alt={industry.name} 
                      className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 group-hover:text-primary transition-colors">
                    {industry.name}
                    <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </h3>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-6">{t("sectors.ctaTitle")}</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              {t("sectors.ctaSubtitle")}
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/agendar-demo">
                {t("sectors.ctaButton")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Setores;
