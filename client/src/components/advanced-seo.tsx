import { useEffect } from 'react';
import { useLocation } from 'wouter';

export default function AdvancedSEO() {
  const [location] = useLocation();

  useEffect(() => {
    // Advanced Schema.org markup for different pages
    const generatePageSchema = () => {
      const baseUrl = window.location.origin;
      
      // Common organization schema
      const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `${baseUrl}/#organization`,
        "name": "Mahech Internet Cafe",
        "alternateName": ["महेच इंटरनेट कैफे", "Sumit Internet Cafe"],
        "description": "Complete digital solution hub in Dang Kalan offering government services, banking, printing, travel booking, and computer training.",
        "url": baseUrl,
        "telephone": "+91 9306003497",
        "email": "sumit03497@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "VPO DANG KALAN NEAR BAWEJA MART",
          "addressLocality": "Dang Kalan",
          "addressRegion": "Punjab", 
          "postalCode": "144801",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 31.2204,
          "longitude": 75.7644
        },
        "openingHours": ["Mo-Su 08:00-23:00"],
        "priceRange": "₹₹",
        "image": `${baseUrl}/logo.png`,
        "logo": `${baseUrl}/logo.png`,
        "sameAs": [
          "https://wa.me/919306003497",
          "mailto:sumit03497@gmail.com"
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
                "description": "Aadhaar, PAN, Voter ID, Ration Card applications and updates",
                "category": "Government Services",
                "provider": {
                  "@id": `${baseUrl}/#organization`
                }
              },
              "price": "50",
              "priceCurrency": "INR"
            },
            {
              "@type": "Offer", 
              "itemOffered": {
                "@type": "Service",
                "name": "Banking & Bill Payment",
                "description": "AEPS, money transfer, mobile recharge, bill payments",
                "category": "Financial Services",
                "provider": {
                  "@id": `${baseUrl}/#organization`
                }
              },
              "price": "10",
              "priceCurrency": "INR"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service", 
                "name": "Printing & Stationery",
                "description": "Document printing, scanning, lamination, photocopying",
                "category": "Business Services",
                "provider": {
                  "@id": `${baseUrl}/#organization`
                }
              },
              "price": "2",
              "priceCurrency": "INR"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Travel Services", 
                "description": "Train, bus, flight booking, hotel reservations",
                "category": "Travel Services",
                "provider": {
                  "@id": `${baseUrl}/#organization`
                }
              },
              "price": "100",
              "priceCurrency": "INR"
            }
          ]
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "250",
          "bestRating": "5",
          "worstRating": "1"
        },
        "review": [
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": "Rajesh Kumar"
            },
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5"
            },
            "reviewBody": "Excellent service for government documents. Quick Aadhaar and PAN card processing.",
            "datePublished": "2024-12-15"
          },
          {
            "@type": "Review", 
            "author": {
              "@type": "Person",
              "name": "Priya Singh"
            },
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5"
            },
            "reviewBody": "Best internet cafe in Dang Kalan. All services available at one place.",
            "datePublished": "2024-12-10"
          }
        ]
      };

      // Page-specific schemas
      let pageSchema = {};
      
      switch (location) {
        case '/government-services':
          pageSchema = {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Government ID Services",
            "description": "Complete government identity document services including Aadhaar, PAN, Voter ID, Ration Card, and Ayushman Bharat applications",
            "provider": {
              "@id": `${baseUrl}/#organization`
            },
            "areaServed": {
              "@type": "Place",
              "name": "Punjab, India"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Government Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Aadhaar Card Services",
                    "description": "New Aadhaar registration, updates, corrections, mobile linking"
                  }
                },
                {
                  "@type": "Offer", 
                  "itemOffered": {
                    "@type": "Service",
                    "name": "PAN Card Services",
                    "description": "New PAN application, corrections, duplicate PAN"
                  }
                }
              ]
            }
          };
          break;
          
        case '/banking-services':
          pageSchema = {
            "@context": "https://schema.org",
            "@type": "FinancialService",
            "name": "Banking & Bill Payment Services",
            "description": "Complete banking services including AEPS, money transfer, bill payments, mobile recharge",
            "provider": {
              "@id": `${baseUrl}/#organization`
            },
            "serviceType": ["Bill Payment", "Money Transfer", "Mobile Recharge", "AEPS"]
          };
          break;
          
        case '/sarkari-updates':
          pageSchema = {
            "@context": "https://schema.org",
            "@type": "NewsMediaOrganization",
            "name": "Sarkari Updates - Government Job Notifications",
            "description": "Latest government job notifications, form updates, admit cards, and exam results",
            "provider": {
              "@id": `${baseUrl}/#organization`
            }
          };
          break;
      }

      // Remove existing schema scripts
      const existingSchemas = document.querySelectorAll('script[type="application/ld+json"]');
      existingSchemas.forEach(script => {
        if (script.textContent?.includes('mahech') || script.textContent?.includes('organization')) {
          script.remove();
        }
      });

      // Add organization schema
      const orgScript = document.createElement('script');
      orgScript.type = 'application/ld+json';
      orgScript.textContent = JSON.stringify(organizationSchema);
      document.head.appendChild(orgScript);

      // Add page-specific schema if exists
      if (Object.keys(pageSchema).length > 0) {
        const pageScript = document.createElement('script');
        pageScript.type = 'application/ld+json';
        pageScript.textContent = JSON.stringify(pageSchema);
        document.head.appendChild(pageScript);
      }
    };

    // Enhanced Open Graph tags
    const updateOpenGraphTags = () => {
      const ogTags = {
        'og:site_name': 'Mahech Internet Cafe',
        'og:locale': 'en_IN',
        'og:locale:alternate': 'hi_IN',
        'og:type': 'website',
        'og:image:width': '1200',
        'og:image:height': '630',
        'og:image:type': 'image/png',
        'twitter:card': 'summary_large_image',
        'twitter:site': '@mahechcafe',
        'twitter:creator': '@sumitinternetcafe'
      };

      Object.entries(ogTags).forEach(([property, content]) => {
        let meta = document.querySelector(`meta[property="${property}"], meta[name="${property}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          if (property.startsWith('twitter:')) {
            meta.name = property;
          } else {
            meta.setAttribute('property', property);
          }
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      });
    };

    // Add hreflang tags for bilingual content
    const addHreflangTags = () => {
      const baseUrl = window.location.origin;
      
      // Remove existing hreflang tags
      document.querySelectorAll('link[hreflang]').forEach(link => link.remove());
      
      const hreflangs = [
        { lang: 'en-IN', href: `${baseUrl}${location}` },
        { lang: 'hi-IN', href: `${baseUrl}${location}` },
        { lang: 'x-default', href: `${baseUrl}${location}` }
      ];
      
      hreflangs.forEach(({ lang, href }) => {
        const link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = lang;
        link.href = href;
        document.head.appendChild(link);
      });
    };

    // Add technical SEO tags
    const addTechnicalSEOTags = () => {
      const technicalTags = [
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'googlebot', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'bingbot', content: 'index, follow' },
        { name: 'format-detection', content: 'telephone=yes' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'theme-color', content: '#1e40af' },
        { name: 'msapplication-TileColor', content: '#1e40af' },
        { name: 'application-name', content: 'Mahech Internet Cafe' },
        { name: 'apple-mobile-web-app-title', content: 'Mahech Internet Cafe' },
        { name: 'generator', content: 'Replit' },
        { name: 'referrer', content: 'strict-origin-when-cross-origin' }
      ];
      
      technicalTags.forEach(({ name, content }) => {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.name = name;
          document.head.appendChild(meta);
        }
        meta.content = content;
      });
    };

    // Execute all SEO enhancements
    generatePageSchema();
    updateOpenGraphTags();
    addHreflangTags();
    addTechnicalSEOTags();

    // Performance optimization
    const preloadCriticalResources = () => {
      const criticalPaths = ['/api/announcements', '/api/admin/site-settings'];
      criticalPaths.forEach(path => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = path;
        document.head.appendChild(link);
      });
    };

    setTimeout(preloadCriticalResources, 1000);

  }, [location]);

  return null;
}