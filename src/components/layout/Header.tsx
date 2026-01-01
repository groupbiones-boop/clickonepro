import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import clickoneLogo from "@/assets/clickone-logo.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);

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
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium text-foreground/80 hover:text-foreground bg-transparent">
                  Produto
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-2 p-4">
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

          <Link to="/setores" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Setores
          </Link>
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

        <div className="hidden lg:flex">
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

            <Link
              to="/setores"
              className="text-sm font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Setores
            </Link>
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

            <Button asChild className="mt-2">
              <Link to="/agendar-demo" onClick={() => setMobileMenuOpen(false)}>
                Agendar Demo
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
