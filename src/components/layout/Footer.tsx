import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import clickoneLogoNew from "@/assets/clickone-logo-new.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <img src={clickoneLogoNew} alt="ClickOne AI" className="h-10 w-auto" />
            <p className="text-background/70 text-sm">
              Transformando o atendimento ao cliente com inteligência artificial de voz e conversacional.
            </p>
          </div>

          {/* Produto */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Produto</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/produto/recepcionista-ia-voz" className="text-background/70 hover:text-background text-sm transition-colors">
                  Recepcionista IA de Voz
                </Link>
              </li>
              <li>
                <Link to="/produto/atendente-ia-conversacional" className="text-background/70 hover:text-background text-sm transition-colors">
                  Atendente IA Conversacional
                </Link>
              </li>
            </ul>
          </div>

          {/* Setores */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Setores</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/setores/limpeza" className="text-background/70 hover:text-background text-sm transition-colors">
                  Empresas de Limpeza
                </Link>
              </li>
              <li>
                <Link to="/setores/construcao" className="text-background/70 hover:text-background text-sm transition-colors">
                  Construção & Reformas
                </Link>
              </li>
              <li>
                <Link to="/setores/hvac" className="text-background/70 hover:text-background text-sm transition-colors">
                  HVAC / Climatização
                </Link>
              </li>
              <li>
                <Link to="/setores/encanamento" className="text-background/70 hover:text-background text-sm transition-colors">
                  Encanamento
                </Link>
              </li>
              <li>
                <Link to="/setores" className="text-primary hover:text-primary/80 text-sm transition-colors font-medium">
                  Ver todos os setores →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-background/70 text-sm">
                <Phone className="h-4 w-4" />
                <span>+55 (11) 99999-9999</span>
              </li>
              <li className="flex items-center gap-2 text-background/70 text-sm">
                <Mail className="h-4 w-4" />
                <span>contato@clickone.ai</span>
              </li>
              <li className="flex items-start gap-2 text-background/70 text-sm">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>São Paulo, Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm">
            © {new Date().getFullYear()} ClickOne AI. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <Link to="/sobre" className="text-background/60 hover:text-background text-sm transition-colors">
              Sobre
            </Link>
            <Link to="/blog" className="text-background/60 hover:text-background text-sm transition-colors">
              Blog
            </Link>
            <Link to="/contato" className="text-background/60 hover:text-background text-sm transition-colors">
              Contato
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
