import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import AnalyticsTracker from "../AnalyticsTracker";
import ClientOnly from "../ClientOnly";
import FloatingDashboardButton from "../FloatingDashboardButton";
import { useThemeInit } from "@/hooks/useThemeInit";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  useThemeInit(); // Garante tema claro nas páginas públicas
  
  return (
    <div className="min-h-screen flex flex-col">
      <ClientOnly>
        <AnalyticsTracker />
      </ClientOnly>
      <Header />
      <main role="main" className="flex-1">{children}</main>
      <Footer />
      <FloatingDashboardButton />
    </div>
  );
};

export default Layout;
