import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const FloatingDashboardButton = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  // Don't show on admin pages
  const isAdminPage = location.pathname.startsWith("/admin");

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAuthenticated(!!session?.user);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Don't render if not authenticated or on admin pages
  if (!isAuthenticated || isAdminPage) {
    return null;
  }

  return (
    <Link to="/admin/dashboard">
      <Button
        size="sm"
        className="fixed bottom-20 right-4 z-50 shadow-lg gap-2 bg-primary hover:bg-primary/90 animate-fade-in"
      >
        <LayoutDashboard className="h-4 w-4" />
        <span className="hidden sm:inline">Ir para Dashboard</span>
        <span className="sm:hidden">Dashboard</span>
      </Button>
    </Link>
  );
};

export default FloatingDashboardButton;
