import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Phone, Mail, MapPin } from "lucide-react";
import clickoneLogoNew from "@/assets/clickone-logo-new.png";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-foreground text-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <img src={clickoneLogoNew} alt="ClickOne AI" className="h-8 md:h-10 w-auto" />
            <p className="text-background/70 text-sm">
              {t("footer.description")}
            </p>
          </div>

          {/* Produto */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t("footer.product")}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/produto/recepcionista-ia-voz" className="text-background/70 hover:text-background text-sm transition-colors">
                  {t("nav.voiceReceptionist")}
                </Link>
              </li>
              <li>
                <Link to="/produto/atendente-ia-conversacional" className="text-background/70 hover:text-background text-sm transition-colors">
                  {t("nav.chatAttendant")}
                </Link>
              </li>
              <li>
                <Link to="/instalar" className="text-background/70 hover:text-background text-sm transition-colors">
                  {t("footer.installApp")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Setores */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t("footer.sectors")}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/setores/limpeza" className="text-background/70 hover:text-background text-sm transition-colors">
                  {t("industries.cleaning")}
                </Link>
              </li>
              <li>
                <Link to="/setores/construcao" className="text-background/70 hover:text-background text-sm transition-colors">
                  {t("industries.construction")}
                </Link>
              </li>
              <li>
                <Link to="/setores/hvac" className="text-background/70 hover:text-background text-sm transition-colors">
                  {t("industries.hvac")}
                </Link>
              </li>
              <li>
                <Link to="/setores/encanamento" className="text-background/70 hover:text-background text-sm transition-colors">
                  {t("industries.plumbing")}
                </Link>
              </li>
              <li>
                <Link to="/setores" className="text-background font-bold hover:text-background/80 text-sm transition-colors">
                  {t("footer.viewAllSectors")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t("footer.contact")}</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="tel:+17705017321" 
                  className="flex items-center gap-2 text-background/70 hover:text-background text-sm transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>+1 (770) 501-7321</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@clickonepro.com" 
                  className="flex items-center gap-2 text-background/70 hover:text-background text-sm transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>info@clickonepro.com</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-background/70 text-sm">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>United States</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm">
            © {new Date().getFullYear()} ClickOne AI. {t("footer.rights")}
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link to="/sobre" className="text-background/60 hover:text-background text-sm transition-colors">
              {t("footer.about")}
            </Link>
            <Link to="/blog" className="text-background/60 hover:text-background text-sm transition-colors">
              {t("footer.blog")}
            </Link>
            <Link to="/privacy-policy" className="text-background/60 hover:text-background text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-background/60 hover:text-background text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
