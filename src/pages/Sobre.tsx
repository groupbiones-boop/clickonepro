import Layout from "@/components/layout/Layout";
import { CheckCircle } from "lucide-react";

const Sobre = () => (
  <Layout>
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/30">
      <div className="container max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre a ClickOne AI</h1>
        <p className="text-lg text-muted-foreground">Transformando o atendimento ao cliente com inteligência artificial.</p>
      </div>
    </section>
    <section className="py-16 bg-background">
      <div className="container max-w-3xl">
        <h2 className="text-2xl font-bold mb-4">Nossa Missão</h2>
        <p className="text-muted-foreground mb-8">Ajudar empresas de serviços a nunca mais perder uma ligação ou lead, utilizando tecnologia de IA de ponta para automatizar o atendimento ao cliente.</p>
        <h2 className="text-2xl font-bold mb-4">Nossos Valores</h2>
        <ul className="space-y-3">
          {["Inovação constante", "Foco no cliente", "Simplicidade e eficiência", "Resultados mensuráveis"].map((v, i) => (
            <li key={i} className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-primary" /><span>{v}</span></li>
          ))}
        </ul>
      </div>
    </section>
  </Layout>
);

export default Sobre;
