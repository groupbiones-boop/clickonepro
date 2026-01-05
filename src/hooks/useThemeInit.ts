import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Hook que garante que páginas públicas sempre usem tema claro.
 * O dark mode é restrito apenas ao dashboard admin.
 */
export const useThemeInit = () => {
  const location = useLocation();

  useEffect(() => {
    const isAdminRoute = location.pathname.startsWith("/admin");
    
    if (!isAdminRoute) {
      // Páginas públicas sempre em modo claro
      document.documentElement.classList.remove("dark");
    } else {
      // No admin, respeitar a preferência salva
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [location.pathname]);
};
