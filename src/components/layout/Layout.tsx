import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ChatWidget from "../ChatWidget";
import AnalyticsTracker from "../AnalyticsTracker";
import FloatingDashboardButton from "../FloatingDashboardButton";
import { useThemeInit } from "@/hooks/useThemeInit";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  useThemeInit(); // Garante tema claro nas páginas públicas
  
  return (
    <div className="min-h-screen flex flex-col">
      <AnalyticsTracker />
      <Header />
      <main role="main" className="flex-1">{children}</main>
      <Footer />
      <FloatingDashboardButton />
      <ChatWidget />
    </div>
  );
};

export default Layout;
