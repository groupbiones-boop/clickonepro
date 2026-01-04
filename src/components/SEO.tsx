import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

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
    offers?: {
      price?: string;
      priceCurrency?: string;
    };
    aggregateRating?: {
      ratingValue: number;
      reviewCount: number;
    };
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
}

const SEO = ({
  titleKey,
  descriptionKey,
  title: directTitle,
  description: directDescription,
  ogImage = "https://lovable.dev/opengraph-image-p98pqg.png",
  noIndex = false,
  canonicalUrl,
  schemaType,
  schemaData,
}: SEOProps) => {
  const { t, i18n } = useTranslation();

  // Update HTML lang attribute when language changes
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // Use direct values if provided, otherwise use translation keys
  const title = directTitle || (titleKey ? t(titleKey) : t("seo.home.title"));
  const description = directDescription || (descriptionKey ? t(descriptionKey) : t("seo.home.description"));

  // Generate JSON-LD based on schema type
  const generateJsonLd = () => {
    const baseOrganization = {
      "@type": "Organization",
      "name": "ClickOne AI",
      "url": "https://clickone.ai",
      "logo": "https://clickone.ai/favicon.png",
      "sameAs": [
        "https://www.linkedin.com/company/clickone-ai",
        "https://twitter.com/clickoneai"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-800-CLICKONE",
        "contactType": "sales",
        "availableLanguage": ["English", "Portuguese", "Spanish"]
      }
    };

    if (!schemaType) {
      // Default Organization schema for all pages
      return {
        "@context": "https://schema.org",
        ...baseOrganization
      };
    }

    switch (schemaType) {
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
          "name": schemaData?.productName || title,
          "description": schemaData?.productDescription || description,
          "applicationCategory": schemaData?.applicationCategory || "BusinessApplication",
          "operatingSystem": schemaData?.operatingSystem || "Web, iOS, Android",
          "offers": {
            "@type": "Offer",
            "price": schemaData?.offers?.price || "0",
            "priceCurrency": schemaData?.offers?.priceCurrency || "USD",
            "availability": "https://schema.org/InStock"
          },
          ...(schemaData?.aggregateRating && {
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": schemaData.aggregateRating.ratingValue,
              "reviewCount": schemaData.aggregateRating.reviewCount,
              "bestRating": "5",
              "worstRating": "1"
            }
          }),
          "publisher": baseOrganization
        };

      case "Product":
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": schemaData?.productName || title,
          "description": schemaData?.productDescription || description,
          "brand": {
            "@type": "Brand",
            "name": "ClickOne AI"
          },
          ...(schemaData?.aggregateRating && {
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": schemaData.aggregateRating.ratingValue,
              "reviewCount": schemaData.aggregateRating.reviewCount,
              "bestRating": "5",
              "worstRating": "1"
            }
          }),
          "offers": {
            "@type": "Offer",
            "price": schemaData?.offers?.price || "0",
            "priceCurrency": schemaData?.offers?.priceCurrency || "USD",
            "availability": "https://schema.org/InStock",
            "seller": baseOrganization
          }
        };

      case "Service":
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": schemaData?.serviceName || title,
          "description": schemaData?.serviceDescription || description,
          "provider": {
            "@type": "Organization",
            "name": schemaData?.provider || "ClickOne AI",
            "url": "https://clickone.ai"
          },
          "areaServed": schemaData?.areaServed || "Worldwide",
          "serviceType": "AI Virtual Receptionist"
        };

      case "Article":
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": schemaData?.headline || title,
          "description": description,
          "image": schemaData?.articleImage || ogImage,
          "datePublished": schemaData?.datePublished,
          "dateModified": schemaData?.dateModified || schemaData?.datePublished,
          "author": {
            "@type": "Person",
            "name": schemaData?.author || "ClickOne AI Team"
          },
          "publisher": {
            "@type": "Organization",
            "name": "ClickOne AI",
            "logo": {
              "@type": "ImageObject",
              "url": "https://clickone.ai/favicon.png"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonicalUrl || "https://clickone.ai"
          }
        };

      case "FAQPage":
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": schemaData?.faqItems?.map(item => ({
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

  const jsonLd = generateJsonLd();

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

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
};

export default SEO;
