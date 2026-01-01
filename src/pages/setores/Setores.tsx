import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { ArrowRight } from "lucide-react";

const industries = [
  { name: "Empresas de Limpeza", slug: "limpeza", icon: "🧹", description: "Limpeza residencial e comercial" },
  { name: "Construção & Reformas", slug: "construcao", icon: "🏗️", description: "Construtoras e empreiteiras" },
  { name: "HVAC / Climatização", slug: "hvac", icon: "❄️", description: "Ar condicionado e refrigeração" },
  { name: "Encanamento", slug: "encanamento", icon: "🔧", description: "Serviços hidráulicos" },
  { name: "Serviços Elétricos", slug: "eletrica", icon: "⚡", description: "Eletricistas e instalações" },
  { name: "Paisagismo", slug: "paisagismo", icon: "🌳", description: "Jardinagem e paisagismo" },
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
                <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full">
                  <CardContent className="pt-6">
                    <span className="text-5xl mb-4 block">{industry.icon}</span>
                    <h3 className="text-xl font-semibold mb-2">{industry.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{industry.description}</p>
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
