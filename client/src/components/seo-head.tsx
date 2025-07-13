import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  image?: string;
  type?: string;
  locale?: string;
  siteName?: string;
}

export default function SEOHead({
  title = "Mahech Internet Cafe - Complete Digital Solution Hub | Government Services, Banking, Printing",
  description = "Best digital services in Dang Kalan. Government ID assistance (Aadhaar, PAN, Voter ID), banking, bill payments, printing, travel booking, computer training. सरकारी सेवाएं, बैंकिंग, प्रिंटिंग और डिजिटल समाधान।",
  keywords = "internet cafe, government services, aadhaar card, pan card, voter id, banking services, bill payment, money transfer, printing services, travel booking, computer training, digital services, Dang Kalan, महेच इंटरनेट कैफे, सरकारी सेवाएं, बैंकिंग, प्रिंटिंग",
  canonicalUrl = "https://mahech-internet-cafe.replit.app",
  image = "https://mahech-internet-cafe.replit.app/og-image.jpg",
  type = "website",
  locale = "en_IN",
  siteName = "Mahech Internet Cafe"
}: SEOHeadProps) {
  
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'Mahech Internet Cafe');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    updateMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    updateMetaTag('googlebot', 'index, follow');
    updateMetaTag('google', 'nositelinkssearchbox');
    updateMetaTag('google', 'notranslate');
    
    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:site_name', siteName, true);
    updateMetaTag('og:locale', locale, true);
    updateMetaTag('og:locale:alternate', 'hi_IN', true);
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:site', '@MahechCafe');
    updateMetaTag('twitter:creator', '@MahechCafe');
    
    // Additional SEO tags
    updateMetaTag('application-name', siteName);
    updateMetaTag('apple-mobile-web-app-title', siteName);
    updateMetaTag('theme-color', '#1e40af');
    updateMetaTag('msapplication-TileColor', '#1e40af');
    updateMetaTag('apple-mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'default');
    updateMetaTag('format-detection', 'telephone=yes');
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
    
    // Language alternate links
    const languages = [
      { hreflang: 'en-IN', href: canonicalUrl },
      { hreflang: 'hi-IN', href: canonicalUrl },
      { hreflang: 'x-default', href: canonicalUrl }
    ];
    
    languages.forEach(lang => {
      let alternate = document.querySelector(`link[hreflang="${lang.hreflang}"]`) as HTMLLinkElement;
      if (!alternate) {
        alternate = document.createElement('link');
        alternate.rel = 'alternate';
        alternate.hreflang = lang.hreflang;
        document.head.appendChild(alternate);
      }
      alternate.href = lang.href;
    });

    // Structured Data for Local Business
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "LocalBusiness",
          "@id": `${canonicalUrl}/#business`,
          "name": "Mahech Internet Cafe",
          "alternateName": "महेच इंटरनेट कैफे",
          "description": description,
          "url": canonicalUrl,
          "telephone": "+91 9306003497",
          "email": "sumit03497@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "VPO DANG KALAN NEAR BAWEJA MART",
            "addressLocality": "Dang Kalan",
            "addressRegion": "Punjab",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 31.2204,
            "longitude": 75.7644
          },
          "openingHours": "Mo-Su 08:00-23:00",
          "priceRange": "₹",
          "image": image,
          "sameAs": [
            "https://wa.me/919876543210"
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Digital Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Government ID Services",
                  "description": "Aadhaar, PAN, Voter ID, Ration Card services"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Banking Services",
                  "description": "Bill payments, money transfer, AEPS services"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Printing Services",
                  "description": "Document printing, scanning, lamination"
                }
              }
            ]
          }
        },
        {
          "@type": "WebSite",
          "@id": `${canonicalUrl}/#website`,
          "url": canonicalUrl,
          "name": siteName,
          "description": description,
          "publisher": {
            "@id": `${canonicalUrl}/#business`
          },
          "potentialAction": [
            {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${canonicalUrl}/search?q={search_term_string}`
              },
              "query-input": "required name=search_term_string"
            }
          ],
          "inLanguage": ["en-IN", "hi-IN"]
        },
        {
          "@type": "Organization",
          "@id": `${canonicalUrl}/#organization`,
          "name": siteName,
          "url": canonicalUrl,
          "email": "sumit03497@gmail.com",
          "telephone": "+91 9306003497",
          "logo": {
            "@type": "ImageObject",
            "url": `${canonicalUrl}/logo.png`,
            "width": 512,
            "height": 512
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "VPO DANG KALAN NEAR BAWEJA MART",
            "addressLocality": "Dang Kalan",
            "addressRegion": "Punjab",
            "addressCountry": "IN"
          }
        }
      ]
    };

    // Add structured data
    let structuredDataScript = document.querySelector('script[type="application/ld+json"]');
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.type = 'application/ld+json';
      document.head.appendChild(structuredDataScript);
    }
    structuredDataScript.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, canonicalUrl, image, type, locale, siteName]);

  return null;
}