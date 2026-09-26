import { lazy, Suspense, type ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import ScrollToTop from "./components/ScrollToTop";
import PageLoader from "./components/PageLoader";
import GHLChatWidget from "./components/GHLChatWidget";
import GHLExternalTracking from "./components/GHLExternalTracking";
import AdminNoIndex from "./components/AdminNoIndex";
import { ROUTER_BASENAME } from "./i18n/lang-prefix";
import { LegacyRedirect, LegacyIndustryRedirect, IndustryRoute } from "./components/LegacyRedirect";


// Lazy load all pages for better performance
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Setores = lazy(() => import("./pages/setores/Setores"));
const Sobre = lazy(() => import("./pages/Sobre"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));

const Contato = lazy(() => import("./pages/Contato"));
const Pricing = lazy(() => import("./pages/Pricing"));
const BookADemo = lazy(() => import("./pages/BookADemo"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Obrigado = lazy(() => import("./pages/Obrigado"));
const GenerateDemoAudio = lazy(() => import("./pages/admin/GenerateDemoAudio"));
const GenerateLPImages = lazy(() => import("./pages/admin/GenerateLPImages"));
const LPBuilder = lazy(() => import("./pages/admin/LPBuilder"));
const LPEditor = lazy(() => import("./pages/admin/LPEditor"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const BlogManager = lazy(() => import("./pages/admin/BlogManager"));
const BlogEditor = lazy(() => import("./pages/admin/BlogEditor"));
const Login = lazy(() => import("./pages/admin/Login"));
const PrivacyPolicy = lazy(() => import("./pages/legal/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/legal/TermsOfService"));
const PerdendoClientes = lazy(() => import("./pages/lp/PerdendoClientes"));
const DynamicLP = lazy(() => import("./pages/lp/DynamicLP"));
const OAuthConsent = lazy(() => import("./pages/OAuthConsent"));

// QueryClient with default settings
const queryClient = new QueryClient();

/** Everything that sits outside the router: shared by the browser app and the build-time prerender. */
export const AppProviders = ({ children, helmetContext }: { children: ReactNode; helmetContext?: object }) => (
  <HelmetProvider context={helmetContext}>
    <QueryClientProvider client={queryClient}>
      <AdminAuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {children}
        </TooltipProvider>
      </AdminAuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

/** The routes, rendered inside BrowserRouter in the browser and StaticRouter at build time. */
export const AppRoutes = () => (
  <>
    <ScrollToTop />
    <AdminNoIndex />
    <GHLChatWidget />
    <GHLExternalTracking />
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/industries" element={<Setores />} />
        <Route path="/industries/:slug" element={<IndustryRoute />} />
        <Route path="/about" element={<Sobre />} />
        <Route path="/contact" element={<Contato />} />
        {/* Old Portuguese URLs forward to the English ones */}
        <Route path="/setores" element={<LegacyRedirect to="/industries" />} />
        <Route path="/setores/:slug" element={<LegacyIndustryRedirect />} />
        <Route path="/sobre" element={<LegacyRedirect to="/about" />} />
        <Route path="/contato" element={<LegacyRedirect to="/contact" />} />
        <Route path="/produto/*" element={<LegacyRedirect to="/how-it-works" />} />
        <Route path="/empresas/*" element={<LegacyRedirect to="/" />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/book-a-demo" element={<BookADemo />} />
        
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/obrigado" element={<Obrigado />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/lp/perdendo-clientes" element={<PerdendoClientes />} />
        <Route path="/lp/:slug" element={<DynamicLP />} />
        <Route path="/admin/generate-audio" element={<GenerateDemoAudio />} />
        <Route path="/admin/generate-lp-images" element={<GenerateLPImages />} />
        <Route path="/admin/lp-builder" element={<LPBuilder />} />
        <Route path="/admin/lp-builder/:id" element={<LPEditor />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/integrations" element={<Dashboard />} />
        <Route path="/admin/blog" element={<BlogManager />} />
        <Route path="/admin/blog/new" element={<BlogEditor />} />
        <Route path="/admin/blog/edit/:id" element={<BlogEditor />} />
        <Route path="/.lovable/oauth/consent" element={<OAuthConsent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </>
);

const App = () => (
  <AppProviders>
    <BrowserRouter basename={ROUTER_BASENAME}>
      <AppRoutes />
    </BrowserRouter>
  </AppProviders>
);

export default App;
