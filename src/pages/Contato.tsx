import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";
import { AnimatedSection } from "@/hooks/use-scroll-animation";

const Contato = () => (
  <Layout>
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/30">
      <div className="container">
        <AnimatedSection className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Entre em Contato</h1>
          <p className="text-lg text-muted-foreground">Estamos prontos para ajudar seu negócio a crescer.</p>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <AnimatedSection animation="fade-left">
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <span>+55 (11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <span>contato@clickone.ai</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <span>São Paulo, Brasil</span>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection animation="fade-right" delay={200}>
            <form className="space-y-4 bg-card p-6 rounded-xl border border-border/50">
              <Input placeholder="Seu nome" />
              <Input type="email" placeholder="Seu email" />
              <Input placeholder="Telefone" />
              <Textarea placeholder="Sua mensagem" rows={4} />
              <Button type="submit" className="w-full">Enviar Mensagem</Button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  </Layout>
);

export default Contato;
