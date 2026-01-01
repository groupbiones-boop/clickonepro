import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { ArrowRight } from "lucide-react";
import industryCleaning from "@/assets/industry-cleaning.jpg";
import industryConstruction from "@/assets/industry-construction.jpg";
import industryHvac from "@/assets/industry-hvac.jpg";
import industryPlumbing from "@/assets/industry-plumbing.jpg";
import industryElectrical from "@/assets/industry-electrical.jpg";
import industryLandscaping from "@/assets/industry-landscaping.jpg";
import industryPool from "@/assets/industry-pool.jpg";
import industryMoving from "@/assets/industry-moving.jpg";
import industryRoofing from "@/assets/industry-roofing.jpg";

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
];

const Setores = () => {
  return (
    <Layout>
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/30">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Setores que Atendemos</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Soluções de IA personalizadas para cada tipo de negócio de serviços.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <Link key={industry.slug} to={`/setores/${industry.slug}`}>
                <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full overflow-hidden">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={industry.image} 
                      alt={industry.name} 
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="text-xl font-semibold mb-1">{industry.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{industry.description}</p>
                    <span className="text-primary font-medium text-sm flex items-center gap-1">
                      Saiba mais <ArrowRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Não encontrou seu setor?</h2>
          <p className="text-primary-foreground/80 mb-8">Entre em contato e criaremos uma solução personalizada.</p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/contato">Fale Conosco</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Setores;
