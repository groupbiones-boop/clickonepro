import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import clickoneLogoNew from "@/assets/clickone-logo-new.png";

const Header = () => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [whoWeServeDropdownOpen, setWhoWeServeDropdownOpen] = useState(false);

  const industries = [
    { name: t("nav.cleaning"), slug: "limpeza", highlight: true },
    { name: t("nav.construction"), slug: "construcao" },
    { name: t("industries.hvac"), slug: "hvac" },
    { name: t("industries.plumbing"), slug: "encanamento" },
    { name: t("nav.electrical"), slug: "eletrica" },
    { name: t("industries.landscaping"), slug: "paisagismo" },
    { name: t("sectors.medicalClinic"), slug: "clinicas-medicas" },
    { name: t("nav.viewAll"), slug: "", isViewAll: true },
  ];

  const businessTypes = [
    { name: t("nav.smallBusiness"), description: "1-10", slug: "/empresas/pequena-empresa" },
    { name: t("nav.mediumBusiness"), description: "11-50", slug: "/empresas/media-empresa" },
    { name: t("nav.localBusiness"), slug: "/empresas/negocios-locais" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-primary">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={clickoneLogoNew} alt="ClickOne AI" className="h-8 md:h-10 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground transition-colors">
            Home
          </Link>
          
          {/* Produto Dropdown */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground bg-transparent hover:bg-primary-foreground/10 data-[state=open]:bg-primary-foreground/10">
                  {t("nav.product")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-2 p-4 bg-primary/60 backdrop-blur-lg border border-primary-foreground/10 shadow-xl">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/produto/recepcionista-ia-voz"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary-foreground/10 text-primary-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{t("nav.voiceReceptionist")}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-primary-foreground/70">
                            {t("voiceProduct.subtitle")}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/produto/atendente-ia-conversacional"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary-foreground/10 text-primary-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{t("nav.chatAttendant")}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-primary-foreground/70">
                            {t("chatProduct.subtitle")}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* A quem servimos - Mega Menu */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground bg-transparent hover:bg-primary-foreground/10 data-[state=open]:bg-primary-foreground/10">
                  {t("nav.sectors")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid grid-cols-2 w-[520px] bg-primary/60 backdrop-blur-lg border border-primary-foreground/10 shadow-xl">
                    {/* Indústrias Column */}
                    <div className="p-5 border-r border-primary-foreground/20">
                      <h3 className="text-xs font-semibold text-primary-foreground/70 uppercase tracking-wider mb-4">
                        {t("nav.sectors")}
                      </h3>
                      <ul className="space-y-1">
                        {industries.map((industry) => (
                          <li key={industry.slug || 'view-all'}>
                            <NavigationMenuLink asChild>
                              <Link
                                to={industry.isViewAll ? "/setores" : `/setores/${industry.slug}`}
                                className={`flex items-center justify-between py-2 px-3 rounded-md text-sm transition-colors hover:bg-primary-foreground/10 text-primary-foreground ${
                                  industry.highlight 
                                    ? "font-medium bg-primary-foreground/5" 
                                    : ""
                                } ${industry.isViewAll ? "font-medium mt-2" : ""}`}
                              >
                                {industry.name}
                                {industry.highlight && <ChevronRight className="h-4 w-4" />}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tipos de Empresa Column */}
                    <div className="p-5">
                      <h3 className="text-xs font-semibold text-primary-foreground/70 uppercase tracking-wider mb-4">
                        {t("nav.companies")}
                      </h3>
                      <ul className="space-y-1">
                        {businessTypes.map((type) => (
                          <li key={type.name}>
                            <NavigationMenuLink asChild>
                              <Link
                                to={type.slug}
                                className="block py-2 px-3 rounded-md transition-colors hover:bg-primary-foreground/10"
                              >
                                <div className="text-sm font-medium text-primary-foreground">
                                  {type.name}
                                </div>
                                {type.description && (
                                  <p className="text-xs text-primary-foreground/70">
                                    {type.description}
                                  </p>
                                )}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link to="/sobre" className="text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground transition-colors">
            {t("nav.about")}
          </Link>
          <Link to="/contato" className="text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground transition-colors">
            {t("nav.contact")}
          </Link>
          <LanguageSwitcher />
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Button asChild variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            <Link to="/agendar-demo">{t("nav.bookDemo")}</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-primary-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-primary/95 backdrop-blur-sm border-t border-primary-foreground/20">
          <nav className="container py-4 flex flex-col gap-4">
            <Link
              to="/"
              className="text-sm font-medium py-2 text-primary-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            {/* Produto Dropdown Mobile */}
            <div>
              <button
                className="flex items-center justify-between w-full text-sm font-medium py-2 text-primary-foreground"
                onClick={() => setProductDropdownOpen(!productDropdownOpen)}
              >
                {t("nav.product")}
                <ChevronDown className={`h-4 w-4 transition-transform ${productDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {productDropdownOpen && (
                <div className="pl-4 flex flex-col gap-2 mt-2">
                  <Link
                    to="/produto/recepcionista-ia-voz"
                    className="text-sm text-primary-foreground/70 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t("nav.voiceReceptionist")}
                  </Link>
                  <Link
                    to="/produto/atendente-ia-conversacional"
                    className="text-sm text-primary-foreground/70 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t("nav.chatAttendant")}
                  </Link>
                </div>
              )}
            </div>

            {/* A quem servimos Dropdown Mobile */}
            <div>
              <button
                className="flex items-center justify-between w-full text-sm font-medium py-2 text-primary-foreground"
                onClick={() => setWhoWeServeDropdownOpen(!whoWeServeDropdownOpen)}
              >
                {t("nav.sectors")}
                <ChevronDown className={`h-4 w-4 transition-transform ${whoWeServeDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {whoWeServeDropdownOpen && (
                <div className="pl-4 flex flex-col gap-2 mt-2">
                  <span className="text-xs font-semibold text-primary-foreground/60 uppercase tracking-wider py-2">
                    {t("nav.sectors")}
                  </span>
                  {industries.slice(0, 5).map((industry) => (
                    <Link
                      key={industry.slug}
                      to={`/setores/${industry.slug}`}
                      className="text-sm text-primary-foreground/70 py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {industry.name}
                    </Link>
                  ))}
                  <Link
                    to="/setores"
                    className="text-sm text-primary-foreground font-medium py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t("nav.viewAll")}
                  </Link>
                  
                  <span className="text-xs font-semibold text-primary-foreground/60 uppercase tracking-wider py-2 mt-2">
                    {t("nav.companies")}
                  </span>
                  {businessTypes.map((type) => (
                    <Link
                      key={type.name}
                      to={type.slug}
                      className="text-sm text-primary-foreground/70 py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {type.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/sobre"
              className="text-sm font-medium py-2 text-primary-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.about")}
            </Link>
            <Link
              to="/contato"
              className="text-sm font-medium py-2 text-primary-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.contact")}
            </Link>

            {/* Language Switcher Mobile */}
            <div className="py-2">
              <LanguageSwitcher />
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <Button asChild variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                <Link to="/agendar-demo" onClick={() => setMobileMenuOpen(false)}>
                  {t("nav.bookDemo")}
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
