import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";

const Contato = () => (
  <Layout>
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/30">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Entre em Contato</h1>
          <p className="text-lg text-muted-foreground">Estamos prontos para ajudar seu negócio a crescer.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="space-y-6">
            <div className="flex items-center gap-4"><Phone className="h-5 w-5 text-primary" /><span>+55 (11) 99999-9999</span></div>
            <div className="flex items-center gap-4"><Mail className="h-5 w-5 text-primary" /><span>contato@clickone.ai</span></div>
            <div className="flex items-center gap-4"><MapPin className="h-5 w-5 text-primary" /><span>São Paulo, Brasil</span></div>
          </div>
          <form className="space-y-4">
            <Input placeholder="Seu nome" />
            <Input type="email" placeholder="Seu email" />
            <Input placeholder="Telefone" />
            <Textarea placeholder="Sua mensagem" rows={4} />
            <Button type="submit" className="w-full">Enviar Mensagem</Button>
          </form>
        </div>
      </div>
    </section>
  </Layout>
);

export default Contato;
