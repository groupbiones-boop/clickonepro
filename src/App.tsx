import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RecepcionistaIAVoz from "./pages/produto/RecepcionistaIAVoz";
import AtendenteIAConversacional from "./pages/produto/AtendenteIAConversacional";
import InfraestruturaVertical from "./pages/produto/InfraestruturaVertical";
import Setores from "./pages/setores/Setores";
import SetorDetalhe from "./pages/setores/SetorDetalhe";
import Sobre from "./pages/Sobre";

import AgendarDemo from "./pages/AgendarDemo";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Obrigado from "./pages/Obrigado";
import PequenaEmpresa from "./pages/empresas/PequenaEmpresa";
import MediaEmpresa from "./pages/empresas/MediaEmpresa";
import NegociosLocais from "./pages/empresas/NegociosLocais";
import GenerateDemoAudio from "./pages/admin/GenerateDemoAudio";
import Dashboard from "./pages/admin/Dashboard";
import BlogManager from "./pages/admin/BlogManager";
import BlogEditor from "./pages/admin/BlogEditor";
import Login from "./pages/admin/Login";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";

// QueryClient with default settings
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AdminAuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/produto/recepcionista-ia-voz" element={<RecepcionistaIAVoz />} />
            <Route path="/produto/atendente-ia-conversacional" element={<AtendenteIAConversacional />} />
            <Route path="/produto/infraestrutura-vertical" element={<InfraestruturaVertical />} />
            <Route path="/setores" element={<Setores />} />
            <Route path="/setores/:slug" element={<SetorDetalhe />} />
            <Route path="/empresas/pequena-empresa" element={<PequenaEmpresa />} />
            <Route path="/empresas/media-empresa" element={<MediaEmpresa />} />
            <Route path="/empresas/negocios-locais" element={<NegociosLocais />} />
            <Route path="/sobre" element={<Sobre />} />
            
            <Route path="/agendar-demo" element={<AgendarDemo />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/obrigado" element={<Obrigado />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/admin/generate-audio" element={<GenerateDemoAudio />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/blog" element={<BlogManager />} />
            <Route path="/admin/blog/new" element={<BlogEditor />} />
            <Route path="/admin/blog/edit/:id" element={<BlogEditor />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AdminAuthProvider>
  </QueryClientProvider>
);

export default App;
