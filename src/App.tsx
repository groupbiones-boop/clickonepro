import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RecepcionistaIAVoz from "./pages/produto/RecepcionistaIAVoz";
import AtendenteIAConversacional from "./pages/produto/AtendenteIAConversacional";
import Setores from "./pages/setores/Setores";
import SetorDetalhe from "./pages/setores/SetorDetalhe";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import AgendarDemo from "./pages/AgendarDemo";
import Blog from "./pages/Blog";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/produto/recepcionista-ia-voz" element={<RecepcionistaIAVoz />} />
          <Route path="/produto/atendente-ia-conversacional" element={<AtendenteIAConversacional />} />
          <Route path="/setores" element={<Setores />} />
          <Route path="/setores/:slug" element={<SetorDetalhe />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/agendar-demo" element={<AgendarDemo />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
