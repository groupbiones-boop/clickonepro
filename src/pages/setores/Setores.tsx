import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
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
import industryLocksmith from "@/assets/industry-locksmith.jpg";
import industryPainters from "@/assets/industry-painters.jpg";
import industryDentist from "@/assets/industry-dentist.jpg";
import industryChiropractor from "@/assets/industry-chiropractor.jpg";
import industryVeterinary from "@/assets/industry-veterinary.jpg";
import industryMedicalClinic from "@/assets/industry-medical-clinic.jpg";
import industryHairSalon from "@/assets/industry-hair-salon.jpg";
import industrySpaMassage from "@/assets/industry-spa-massage.jpg";
import industryHomeInspection from "@/assets/industry-home-inspection.jpg";
import industryFlooring from "@/assets/industry-flooring.jpg";

const industries = [
  { name: "Empresas de Limpeza", slug: "limpeza", image: industryCleaning, description: "Limpeza residencial e comercial" },
  { name: "Construção & Reformas", slug: "construcao", image: industryConstruction, description: "Construtoras e empreiteiras" },
  { name: "HVAC / Climatização", slug: "hvac", image: industryHvac, description: "Ar condicionado e refrigeração" },
  { name: "Encanamento", slug: "encanamento", image: industryPlumbing, description: "Serviços hidráulicos" },
  { name: "Serviços Elétricos", slug: "eletrica", image: industryElectrical, description: "Eletricistas e instalações" },
  { name: "Paisagismo", slug: "paisagismo", image: industryLandscaping, description: "Jardinagem e paisagismo" },
  { name: "Serviços de Piscina", slug: "piscinas", image: industryPool, description: "Manutenção e limpeza de piscinas" },
  { name: "Empresas de Mudança", slug: "mudancas", image: industryMoving, description: "Mudanças residenciais e comerciais" },
  { name: "Serviços de Telhado", slug: "telhados", image: industryRoofing, description: "Reparos e instalação de telhados" },
  { name: "Controle de Pragas", slug: "controle-pragas", image: industryPestControl, description: "Exterminação e prevenção de pragas" },
  { name: "Chaveiro", slug: "chaveiro", image: industryLocksmith, description: "Serviços de chaveiro 24h" },
  { name: "Pintores", slug: "pintores", image: industryPainters, description: "Pintura residencial e comercial" },
  { name: "Dentistas", slug: "dentistas", image: industryDentist, description: "Clínicas odontológicas" },
  { name: "Quiropráticos", slug: "quiropraticos", image: industryChiropractor, description: "Clínicas de quiropraxia" },
  { name: "Veterinários", slug: "veterinarios", image: industryVeterinary, description: "Clínicas veterinárias" },
  { name: "Clínicas Médicas", slug: "clinicas-medicas", image: industryMedicalClinic, description: "Clínicas de saúde e bem-estar" },
  { name: "Salões de Cabelo", slug: "saloes-cabelo", image: industryHairSalon, description: "Salões de beleza e cabeleireiros" },
  { name: "Spas e Massagens", slug: "spas-massagens", image: industrySpaMassage, description: "Spas e terapias de relaxamento" },
  { name: "Inspeção Residencial", slug: "inspecao-residencial", image: industryHomeInspection, description: "Inspeções de imóveis" },
  { name: "Pisos", slug: "pisos", image: industryFlooring, description: "Instalação e reparo de pisos" },
];

const Setores = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredIndustries = industries.filter((industry) =>
    industry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    industry.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-foreground">
        <div className="container">
          <AnimatedSection animation="fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-6">
              Setores em que atuamos
            </h1>
            <p className="text-lg md:text-xl text-background/70 max-w-2xl mb-10">
              Soluções baseadas em IA para atender às necessidades específicas do seu negócio.
            </p>
          </AnimatedSection>

          {/* Search Input */}
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="relative max-w-lg mb-12">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Pesquisar setores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-6 text-base bg-background border-0 rounded-lg"
              />
            </div>
          </AnimatedSection>

          {/* Industry Pills/Tags */}
          <AnimatedSection animation="fade-up" delay={200}>
            <p className="text-background/60 text-sm mb-4">
              {filteredIndustries.length} setores disponíveis
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

      {/* Industry Cards Grid */}
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

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-6">Não encontrou seu setor?</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Entre em contato e criaremos uma solução personalizada para o seu negócio.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contato">
                Fale Conosco
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
