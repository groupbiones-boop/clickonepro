import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const GHL_DEMO_URL = "https://api.leadconnectorhq.com/widget/booking/MPXMwtJNT8r70fFVkpXS";

interface LPFloatingCTAProps {
  onCtaClick?: () => void;
}

const LPFloatingCTA = ({ onCtaClick }: LPFloatingCTAProps) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    if (onCtaClick) {
      onCtaClick();
    }
    window.open(GHL_DEMO_URL, "_blank");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden animate-fade-in">
      <Button
        onClick={handleClick}
        size="lg"
        className="rounded-full shadow-xl flex items-center gap-2 px-6"
      >
        <Calendar className="h-5 w-5" />
        <span className="font-semibold">{t("lp.perdendoClientes.floatingCta")}</span>
      </Button>
    </div>
  );
};

export default LPFloatingCTA;
