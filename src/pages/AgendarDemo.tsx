import Layout from "@/components/layout/Layout";
import { CheckCircle, Star, Clock, Shield, Headphones, Quote } from "lucide-react";
import { AnimatedSection } from "@/hooks/use-scroll-animation";

const benefits = [
  {
    icon: Clock,
    title: "Demo personalizada de 30 minutos",
    description: "Um especialista vai entender seu negócio e mostrar como a IA pode ajudar."
  },
  {
    icon: Shield,
    title: "Sem compromisso",
    description: "Conheça a plataforma sem nenhuma obrigação de contratação."
  },
  {
    icon: Headphones,
    title: "Veja a IA em ação",
    description: "Simulação real de como a ClickOne AI atenderia seus clientes."
  }
];

const testimonials = [
  {
    name: "Carlos Mendes",
    company: "Mendes Cleaning LLC",
    location: "Miami, FL",
    text: "Depois que implementamos a ClickOne AI, nunca mais perdemos uma ligação. Nossos agendamentos aumentaram 40% no primeiro mês.",
    rating: 5,
  },
  {
    name: "Roberto Silva",
    company: "Silva HVAC Inc",
    location: "Houston, TX",
    text: "A IA atende meus clientes 24/7 com a mesma qualidade que eu atenderia. Minha equipe agora foca no que realmente importa: o serviço.",
    rating: 5,
  },
  {
    name: "Ana Ferreira",
    company: "Ferreira Landscaping LLC",
    location: "Orlando, FL",
    text: "Eu estava perdendo clientes por não conseguir atender todas as ligações. A ClickOne AI resolveu isso completamente.",
    rating: 5,
  },
  {
    name: "Diego Santos",
    company: "Santos Plumbing Services",
    location: "Phoenix, AZ",
    text: "O follow-up automático transformou meu negócio. Agora nenhum lead fica sem resposta e minhas conversões triplicaram.",
    rating: 5,
  },
];

const AgendarDemo = () => (
  <Layout>
    {/* Hero Section with Form Placeholder */}
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      
      <div className="container max-w-4xl relative z-10">
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              Transforme seu atendimento hoje
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Agende Sua Demo <span className="text-primary">Grátis</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Veja a ClickOne AI em ação e descubra como podemos transformar seu atendimento. 
              Nunca mais perca um cliente por falta de resposta.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="scale" delay={100}>
          {/* Form Container Placeholder */}
          <div className="bg-card p-8 md:p-10 rounded-2xl shadow-xl border border-border max-w-xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold mb-2">Preencha o formulário</h2>
              <p className="text-muted-foreground text-sm">Nossa equipe entrará em contato em até 24 horas.</p>
            </div>
            
            {/* Placeholder for external form - User will add ClickOne form here */}
            <div className="min-h-[300px] flex items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-xl bg-muted/20">
              <p className="text-muted-foreground text-center px-4">
                {/* Formulário externo será inserido aqui */}
                Área reservada para formulário ClickOne
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Quick Benefits */}
        <AnimatedSection animation="fade-up" delay={200}>
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            {["Demo personalizada de 30 min", "100% gratuito", "Sem compromisso"].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>

    {/* Benefits Section */}
    <section className="py-16 bg-background">
      <div className="container">
        <AnimatedSection animation="fade-up">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            O que você vai receber na demo
          </h2>
        </AnimatedSection>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
              <div className="text-center p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials Section */}
    <section className="py-16 bg-muted/30">
      <div className="container">
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Clientes satisfeitos
            </span>
            <h2 className="text-2xl md:text-3xl font-bold">
              O que nossos clientes dizem
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
              <div className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                
                <div className="relative flex-1">
                  <Quote className="absolute -top-2 -left-1 h-6 w-6 text-primary/20" />
                  <p className="text-muted-foreground pl-4 italic">
                    {testimonial.text}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Trust Indicators */}
    <section className="py-12 bg-primary text-primary-foreground">
      <div className="container">
        <AnimatedSection animation="fade-up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-1">500+</div>
              <p className="text-primary-foreground/80 text-sm">Empresas atendidas</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-1">1M+</div>
              <p className="text-primary-foreground/80 text-sm">Chamadas automatizadas</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-1">98%</div>
              <p className="text-primary-foreground/80 text-sm">Satisfação do cliente</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-1">24/7</div>
              <p className="text-primary-foreground/80 text-sm">Atendimento ativo</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  </Layout>
);

export default AgendarDemo;
