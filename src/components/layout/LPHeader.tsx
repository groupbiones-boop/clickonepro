import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import clickoneLogoOfficialWhite from "@/assets/clickone-logo-official-white.png";
import { EXTERNAL_URLS } from "@/lib/external-urls";

interface LPHeaderProps {
  onCtaClick?: () => void;
}

const LPHeader = ({ onCtaClick }: LPHeaderProps) => {
  const { t } = useTranslation();

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    }
    window.location.href = EXTERNAL_URLS.GHL_BOOKING;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-primary shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src={clickoneLogoOfficialWhite}
              alt="ClickOne AI"
              className="h-8 w-auto"
            />
          </Link>

          {/* CTA + Language Switcher */}
          <div className="flex items-center gap-3">
            <Button
              onClick={handleCtaClick}
              variant="secondary"
              size="sm"
              className="hidden sm:flex items-center gap-2 font-semibold"
            >
              <Calendar className="h-4 w-4" />
              {t("nav.bookDemo")}
            </Button>
            <Button
              onClick={handleCtaClick}
              variant="secondary"
              size="icon"
              className="sm:hidden"
            >
              <Calendar className="h-4 w-4" />
            </Button>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default LPHeader;
