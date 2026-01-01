import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, ChevronRight, LogIn } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import clickoneLogo from "@/assets/clickone-logo.png";

const industries = [
  { name: "Serviços Domiciliares", slug: "limpeza", highlight: true },
  { name: "Construção & Reformas", slug: "construcao" },
  { name: "HVAC / Climatização", slug: "hvac" },
  { name: "Encanamento", slug: "encanamento" },
  { name: "Serviços Elétricos", slug: "servicos-eletricos" },
  { name: "Paisagismo", slug: "paisagismo" },
  { name: "Saúde & Bem-estar", slug: "clinicas-medicas" },
  { name: "Ver todos", slug: "", isViewAll: true },
];

const businessTypes = [
  { name: "Pequena empresa", description: "1-10 funcionários" },
  { name: "Média empresa", description: "11-50 funcionários" },
  { name: "Negócios locais", description: "Uma ou várias localizações" },
  { name: "Rede de franquias", description: "Múltiplas unidades" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [whoWeServeDropdownOpen, setWhoWeServeDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={clickoneLogo} alt="ClickOne AI" className="h-10 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Home
          </Link>
          
          {/* Produto Dropdown */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium text-foreground/80 hover:text-foreground bg-transparent">
                  Produto
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-2 p-4 bg-background">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/produto/recepcionista-ia-voz"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Recepcionista IA de Voz</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Atendimento telefônico automatizado 24/7
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/produto/atendente-ia-conversacional"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Atendente IA Conversacional</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Automação de chat e mensagens de texto
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
                <NavigationMenuTrigger className="text-sm font-medium text-foreground/80 hover:text-foreground bg-transparent">
                  A quem servimos
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid grid-cols-2 w-[520px] bg-background">
                    {/* Indústrias Column */}
                    <div className="p-5 border-r border-border">
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                        Indústrias
                      </h3>
                      <ul className="space-y-1">
                        {industries.map((industry) => (
                          <li key={industry.slug || 'view-all'}>
                            <NavigationMenuLink asChild>
                              <Link
                                to={industry.isViewAll ? "/setores" : `/setores/${industry.slug}`}
                                className={`flex items-center justify-between py-2 px-3 rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                                  industry.highlight 
                                    ? "text-primary font-medium bg-primary/5" 
                                    : "text-foreground"
                                } ${industry.isViewAll ? "text-primary font-medium mt-2" : ""}`}
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
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                        Empresas
                      </h3>
                      <ul className="space-y-1">
                        {businessTypes.map((type) => (
                          <li key={type.name}>
                            <NavigationMenuLink asChild>
                              <Link
                                to="/agendar-demo"
                                className="block py-2 px-3 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                              >
                                <div className="text-sm font-medium text-foreground">
                                  {type.name}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {type.description}
                                </p>
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

          <Link to="/blog" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Blog
          </Link>
          <Link to="/sobre" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Sobre
          </Link>
          <Link to="/contato" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Contato
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <a href="https://app.clickone.ai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Acesso
            </a>
          </Button>
          <Button asChild>
            <Link to="/agendar-demo">Agendar Demo</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container py-4 flex flex-col gap-4">
            <Link
              to="/"
              className="text-sm font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            {/* Produto Dropdown Mobile */}
            <div>
              <button
                className="flex items-center justify-between w-full text-sm font-medium py-2"
                onClick={() => setProductDropdownOpen(!productDropdownOpen)}
              >
                Produto
                <ChevronDown className={`h-4 w-4 transition-transform ${productDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {productDropdownOpen && (
                <div className="pl-4 flex flex-col gap-2 mt-2">
                  <Link
                    to="/produto/recepcionista-ia-voz"
                    className="text-sm text-muted-foreground py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Recepcionista IA de Voz
                  </Link>
                  <Link
                    to="/produto/atendente-ia-conversacional"
                    className="text-sm text-muted-foreground py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Atendente IA Conversacional
                  </Link>
                </div>
              )}
            </div>

            {/* A quem servimos Dropdown Mobile */}
            <div>
              <button
                className="flex items-center justify-between w-full text-sm font-medium py-2"
                onClick={() => setWhoWeServeDropdownOpen(!whoWeServeDropdownOpen)}
              >
                A quem servimos
                <ChevronDown className={`h-4 w-4 transition-transform ${whoWeServeDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {whoWeServeDropdownOpen && (
                <div className="pl-4 flex flex-col gap-2 mt-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider py-2">
                    Indústrias
                  </span>
                  {industries.slice(0, 5).map((industry) => (
                    <Link
                      key={industry.slug}
                      to={`/setores/${industry.slug}`}
                      className="text-sm text-muted-foreground py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {industry.name}
                    </Link>
                  ))}
                  <Link
                    to="/setores"
                    className="text-sm text-primary font-medium py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Ver todos os setores
                  </Link>
                  
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider py-2 mt-2">
                    Empresas
                  </span>
                  {businessTypes.map((type) => (
                    <Link
                      key={type.name}
                      to="/agendar-demo"
                      className="text-sm text-muted-foreground py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {type.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/blog"
              className="text-sm font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/sobre"
              className="text-sm font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sobre
            </Link>
            <Link
              to="/contato"
              className="text-sm font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contato
            </Link>

            <div className="flex flex-col gap-2 mt-2">
              <Button variant="outline" asChild>
                <a 
                  href="https://app.clickone.ai" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LogIn className="h-4 w-4" />
                  Acesso
                </a>
              </Button>
              <Button asChild>
                <Link to="/agendar-demo" onClick={() => setMobileMenuOpen(false)}>
                  Agendar Demo
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