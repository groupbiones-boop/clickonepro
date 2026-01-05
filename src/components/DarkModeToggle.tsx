import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

/**
 * Toggle de dark mode que funciona apenas no dashboard admin.
 * Não considera preferência do sistema operacional.
 */
const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Apenas verificar preferência salva, ignorar prefers-color-scheme
    const savedTheme = localStorage.getItem("theme");
    const shouldBeDark = savedTheme === "dark";
    
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative"
      aria-label={isDark ? "Mudar para modo claro" : "Mudar para modo escuro"}
    >
      <Sun className={`h-5 w-5 transition-all ${isDark ? "scale-0 rotate-90" : "scale-100 rotate-0"}`} />
      <Moon className={`absolute h-5 w-5 transition-all ${isDark ? "scale-100 rotate-0" : "scale-0 -rotate-90"}`} />
    </Button>
  );
};

export default DarkModeToggle;
