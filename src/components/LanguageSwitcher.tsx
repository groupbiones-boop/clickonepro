import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { localizedPath, type SiteLanguage } from '@/i18n/lang-prefix';

const languages = [
  { code: 'en-US', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  // The language lives in the URL, so switching loads the same page under /es, /pt or no prefix.
  const handleLanguageChange = (langCode: string) => {
    setIsOpen(false);
    if (langCode === currentLanguage.code) return;
    const target = localizedPath(location.pathname, langCode as SiteLanguage);
    window.location.assign(`${target}${location.search}${location.hash}`);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-md hover:bg-background/10 transition-colors text-background"
        aria-label="Select language"
      >
        <span className="text-2xl leading-none">{currentLanguage.flag}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50 min-w-[64px]">
          {languages.map((lang) => (
            <button
              type="button"
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              aria-label={lang.name}
              className={`w-full flex items-center justify-center px-3 py-2.5 hover:bg-muted transition-colors ${
                currentLanguage.code === lang.code ? 'bg-muted' : ''
              }`}
            >
              <span className="text-2xl leading-none">{lang.flag}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;