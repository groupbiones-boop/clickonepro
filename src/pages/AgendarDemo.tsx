import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle } from "lucide-react";

const AgendarDemo = () => (
  <Layout>
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/30">
      <div className="container max-w-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Agende Sua Demo Grátis</h1>
        <p className="text-lg text-muted-foreground mb-8">Veja a ClickOne AI em ação e descubra como podemos transformar seu atendimento.</p>
        <form className="space-y-4 text-left bg-card p-8 rounded-2xl shadow-lg">
          <Input placeholder="Nome completo" />
          <Input type="email" placeholder="Email" />
          <Input placeholder="Telefone" />
          <Input placeholder="Nome da empresa" />
          <Button type="submit" className="w-full" size="lg">Agendar Demo <ArrowRight className="ml-2 h-4 w-4" /></Button>
        </form>
        <ul className="mt-8 space-y-2 text-left max-w-md mx-auto">
          {["Demo personalizada de 30 minutos", "Sem compromisso", "Veja a IA em ação com seu negócio"].map((t, i) => (
            <li key={i} className="flex items-center gap-2 text-muted-foreground"><CheckCircle className="h-4 w-4 text-primary" />{t}</li>
          ))}
        </ul>
      </div>
    </section>
  </Layout>
);

export default AgendarDemo;
