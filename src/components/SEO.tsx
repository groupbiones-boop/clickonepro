import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SOCIAL_LINKS } from "@/lib/external-urls";

// Schema.org types
type SchemaType = 
  | "Organization" 
  | "SoftwareApplication" 
  | "Service" 
  | "Article" 
  | "FAQPage" 
  | "WebPage"
  | "Product";

interface FAQItem {
  question: string;
  answer: string;
}

interface SEOProps {
  titleKey?: string;
  descriptionKey?: string;
  title?: string;
  description?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
  canonicalUrl?: string;
  // JSON-LD Schema props
  schemaType?: SchemaType;
  schemaData?: {
    // For SoftwareApplication/Product
    productName?: string;
    productDescription?: string;
    applicationCategory?: string;
    operatingSystem?: string;
    // For Service
    serviceName?: string;
    serviceDescription?: string;
    provider?: string;
    areaServed?: string;
    // For Article
    headline?: string;
    datePublished?: string;
    dateModified?: string;
    author?: string;
    articleImage?: string;
    // For FAQPage
    faqItems?: FAQItem[];
  };
  // Additional schemas (for combining multiple schemas like SoftwareApplication + FAQPage)
  additionalSchemas?: Array<{
    type: SchemaType;
    data?: SEOProps["schemaData"];
  }>;
}

const BASE_URL = "https://clickonepro.com";

const SEO = ({
  titleKey,
  descriptionKey,
  title: directTitle,
  description: directDescription,
  ogImage = "https://clickonepro.com/og-image.png",
  ogType = "website",
  noIndex = false,
  canonicalUrl,
  schemaType,
  schemaData,
  additionalSchemas,
}: SEOProps) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  // Update HTML lang attribute when language changes
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // Use direct values if provided, otherwise use translation keys
  const title = directTitle || (titleKey ? t(titleKey) : t("seo.home.title"));
  const description = directDescription || (descriptionKey ? t(descriptionKey) : t("seo.home.description"));

  // Generate canonical URL automatically if not provided
  const currentPath = location.pathname.replace(/\/$/, '') || '/';
  const autoCanonical = `${BASE_URL}${currentPath === '/' ? '' : currentPath}`;
  const finalCanonical = canonicalUrl || autoCanonical;

  // Generate JSON-LD based on schema type
  const generateJsonLd = (type?: SchemaType, data?: SEOProps["schemaData"]) => {
    const baseOrganization = {
      "@type": "Organization",
      "name": "ClickOne AI",
      "url": "https://clickonepro.com",
      "logo": "https://clickonepro.com/favicon.png",
      "sameAs": Object.values(SOCIAL_LINKS),
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Woodstock",
        "addressRegion": "GA",
        "addressCountry": "US"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-770-501-7321",
        "contactType": "sales",
        "availableLanguage": ["English", "Portuguese", "Spanish"]
      }
    };

    if (!type) {
      // Default Organization schema for all pages
      return {
        "@context": "https://schema.org",
        ...baseOrganization
      };
    }

    switch (type) {
      case "Organization":
        return {
          "@context": "https://schema.org",
          ...baseOrganization,
          "description": description
        };

      case "SoftwareApplication":
        return {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": data?.productName || title,
          "description": data?.productDescription || description,
          "applicationCategory": data?.applicationCategory || "BusinessApplication",
          "operatingSystem": data?.operatingSystem || "Web, iOS, Android",
          "publisher": baseOrganization
        };

      case "Product":
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": data?.productName || title,
          "description": data?.productDescription || description,
          "brand": {
            "@type": "Brand",
            "name": "ClickOne AI"
          }
        };

      case "Service":
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": data?.serviceName || title,
          "description": data?.serviceDescription || description,
          "provider": {
            "@type": "Organization",
            "name": data?.provider || "ClickOne AI",
            "url": "https://clickonepro.com"
          },
          "areaServed": data?.areaServed || "United States (Georgia and Florida)",
          "serviceType": "AI Virtual Receptionist"
        };

      case "Article":
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": data?.headline || title,
          "description": description,
          "image": data?.articleImage || ogImage,
          "datePublished": data?.datePublished,
          "dateModified": data?.dateModified || data?.datePublished,
          "author": {
            "@type": "Person",
            "name": data?.author || "ClickOne AI Team"
          },
          "publisher": {
            "@type": "Organization",
            "name": "ClickOne AI",
            "logo": {
              "@type": "ImageObject",
              "url": "https://clickonepro.com/favicon.png"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": finalCanonical
          }
        };

      case "FAQPage":
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": data?.faqItems?.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer
            }
          })) || []
        };

      case "WebPage":
      default:
        return {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": title,
          "description": description,
          "publisher": baseOrganization
        };
    }
  };

  // Generate all JSON-LD schemas
  const schemas = [
    generateJsonLd(schemaType, schemaData),
    ...(additionalSchemas?.map(s => generateJsonLd(s.type, s.data)) || [])
  ];

  return (
    <Helmet>
      <html lang={i18n.language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:locale" content={i18n.language} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical */}
      <link rel="canonical" href={finalCanonical} />

      {/* JSON-LD Structured Data - Support for multiple schemas */}
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
