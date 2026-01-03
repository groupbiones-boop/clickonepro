import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

interface SEOProps {
  titleKey?: string;
  descriptionKey?: string;
  title?: string;
  description?: string;
  ogImage?: string;
  noIndex?: boolean;
  canonicalUrl?: string;
}

const SEO = ({
  titleKey,
  descriptionKey,
  title: directTitle,
  description: directDescription,
  ogImage = "https://lovable.dev/opengraph-image-p98pqg.png",
  noIndex = false,
  canonicalUrl,
}: SEOProps) => {
  const { t, i18n } = useTranslation();

  // Update HTML lang attribute when language changes
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // Use direct values if provided, otherwise use translation keys
  const title = directTitle || (titleKey ? t(titleKey) : t("seo.home.title"));
  const description = directDescription || (descriptionKey ? t(descriptionKey) : t("seo.home.description"));

  return (
    <Helmet>
      <html lang={i18n.language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </Helmet>
  );
};

export default SEO;
