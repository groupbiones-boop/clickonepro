import { useTranslation } from "react-i18next";
import Layout from "@/components/layout/Layout";
import { CheckCircle } from "lucide-react";
import { AnimatedSection } from "@/hooks/use-scroll-animation";
import { AnimatedCounter } from "@/hooks/use-count-animation";
import teamOffice from "@/assets/team-office.jpg";
import officeTech from "@/assets/office-tech.jpg";

const Sobre = () => {
  const { t } = useTranslation();

  const values = [
    t("about.value1"),
    t("about.value2"),
    t("about.value3"),
    t("about.value4"),
  ];

  const practices = [
    t("about.practice1"),
    t("about.practice2"),
    t("about.practice3"),
    t("about.practice4"),
    t("about.practice5"),
  ];

  return (
    <Layout>
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/30">
        <div className="container max-w-3xl text-center">
          <AnimatedSection animation="fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("about.title")}</h1>
            <p className="text-lg text-muted-foreground">{t("about.subtitle")}</p>
          </AnimatedSection>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <AnimatedSection animation="scale" delay={0}>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedCounter end={500} suffix="+" />
              </div>
              <p className="text-primary-foreground/80 text-sm">{t("about.activeClients")}</p>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={100}>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedCounter end={1} suffix="M+" />
              </div>
              <p className="text-primary-foreground/80 text-sm">{t("about.callsAnswered")}</p>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={200}>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedCounter end={98} suffix="%" />
              </div>
              <p className="text-primary-foreground/80 text-sm">{t("about.satisfactionRate")}</p>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={300}>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedCounter end={24} suffix="/7" />
              </div>
              <p className="text-primary-foreground/80 text-sm">{t("about.supportAvailable")}</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Team Image Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <AnimatedSection animation="fade-up">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={teamOffice} 
                  alt="Equipe ClickOne AI em atendimento" 
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={officeTech} 
                  alt="Escritório de tecnologia ClickOne AI" 
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-3xl">
          <AnimatedSection animation="fade-up">
            <h2 className="text-2xl font-bold mb-4">{t("about.missionTitle")}</h2>
            <p className="text-muted-foreground mb-8">{t("about.missionText")}</p>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-up" delay={100}>
            <h2 className="text-2xl font-bold mb-4">{t("about.visionTitle")}</h2>
            <p className="text-muted-foreground mb-8">{t("about.visionText")}</p>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-up" delay={200}>
            <h2 className="text-2xl font-bold mb-4">{t("about.valuesTitle")}</h2>
            <ul className="space-y-3 mb-8">
              {values.map((v, i) => (
                <li key={i} className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-primary" /><span>{v}</span></li>
              ))}
            </ul>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-up" delay={300}>
            <h2 className="text-2xl font-bold mb-4">{t("about.practiceTitle")}</h2>
            <p className="text-muted-foreground mb-4">{t("about.practiceIntro")}</p>
            <ul className="space-y-2 mb-8 text-muted-foreground">
              {practices.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground">{t("about.practiceConclusion")}</p>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-up" delay={400}>
            <h2 className="text-2xl font-bold mb-4 mt-8">{t("about.resultTitle")}</h2>
            <p className="text-lg text-muted-foreground">
              {t("about.result1")}<br />
              {t("about.result2")}<br />
              {t("about.result3")}
            </p>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Sobre;
