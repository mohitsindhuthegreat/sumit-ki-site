import { useEffect } from 'react';

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      const criticalResources = [
        '/api/announcements',
        '/api/admin/site-settings'
      ];

      criticalResources.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
      });
    };

    // Lazy load non-critical resources
    const lazyLoadResources = () => {
      // Preload images after the page loads
      const imageUrls = [
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
      ];

      imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
      });
    };

    // Web Performance API optimizations
    const optimizeWebPerformance = () => {
      // Service Worker registration for caching
      if ('serviceWorker' in navigator) {
        const swCode = `
          const CACHE_NAME = 'mahech-cafe-v1';
          const urlsToCache = [
            '/',
            '/government-services',
            '/banking-services',
            '/printing-services',
            '/online-forms',
            '/travel-services',
            '/sarkari-updates',
            '/contact'
          ];

          self.addEventListener('install', function(event) {
            event.waitUntil(
              caches.open(CACHE_NAME)
                .then(function(cache) {
                  return cache.addAll(urlsToCache);
                })
            );
          });

          self.addEventListener('fetch', function(event) {
            event.respondWith(
              caches.match(event.request)
                .then(function(response) {
                  if (response) {
                    return response;
                  }
                  return fetch(event.request);
                }
              )
            );
          });
        `;

        const blob = new Blob([swCode], { type: 'application/javascript' });
        const swUrl = URL.createObjectURL(blob);
        
        navigator.serviceWorker.register(swUrl)
          .then(() => console.log('Service Worker registered'))
          .catch(() => console.log('Service Worker registration failed'));
      }

      // Preconnect to external domains
      const preconnectDomains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://wa.me',
        'https://api.groq.com'
      ];

      preconnectDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        document.head.appendChild(link);
      });

      // DNS prefetch for external domains
      const dnsPrefetchDomains = [
        'https://www.google-analytics.com',
        'https://www.googletagmanager.com'
      ];

      dnsPrefetchDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = domain;
        document.head.appendChild(link);
      });
    };

    // Advanced SEO optimizations
    const advancedSEOOptimizations = () => {
      // Add breadcrumb structured data
      const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://mahech-internet-cafe.replit.app/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://mahech-internet-cafe.replit.app/#services"
          }
        ]
      };

      const breadcrumbScript = document.createElement('script');
      breadcrumbScript.type = 'application/ld+json';
      breadcrumbScript.textContent = JSON.stringify(breadcrumbData);
      document.head.appendChild(breadcrumbScript);

      // Add FAQ structured data
      const faqData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What services do you provide?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We provide government ID services (Aadhaar, PAN, Voter ID), banking services, bill payments, printing, travel booking, and computer training."
            }
          },
          {
            "@type": "Question",
            "name": "What are your working hours?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We are open daily from 8:00 AM to 11:00 PM, including weekends and holidays."
            }
          },
          {
            "@type": "Question",
            "name": "Do you provide Aadhaar card services?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we provide complete Aadhaar card services including new registration, updates, corrections, and mobile number linking."
            }
          }
        ]
      };

      const faqScript = document.createElement('script');
      faqScript.type = 'application/ld+json';
      faqScript.textContent = JSON.stringify(faqData);
      document.head.appendChild(faqScript);

      // Add review structured data
      const reviewData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Mahech Internet Cafe",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "150",
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
            "reviewBody": "Excellent service for government documents. Quick and reliable."
          }
        ]
      };

      const reviewScript = document.createElement('script');
      reviewScript.type = 'application/ld+json';
      reviewScript.textContent = JSON.stringify(reviewData);
      document.head.appendChild(reviewScript);
    };

    // Critical rendering path optimization
    const optimizeCriticalPath = () => {
      // Inline critical CSS
      const criticalCSS = `
        .hero-section { min-height: 100vh; }
        .nav-bar { position: sticky; top: 0; z-index: 50; }
        .service-card { transition: transform 0.3s ease; }
        .service-card:hover { transform: translateY(-5px); }
      `;

      const style = document.createElement('style');
      style.textContent = criticalCSS;
      document.head.appendChild(style);
    };

    // Execute optimizations
    preloadCriticalResources();
    setTimeout(lazyLoadResources, 1000);
    optimizeWebPerformance();
    advancedSEOOptimizations();
    optimizeCriticalPath();

    // Performance monitoring
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = window.performance.timing;
          const loadTime = perfData.loadEventEnd - perfData.navigationStart;
          
          // Log performance metrics
          console.log(`Page load time: ${loadTime}ms`);
          
          // Send to analytics if needed
          if (loadTime > 3000) {
            console.warn('Page load time is slower than recommended (3s)');
          }
        }, 100);
      });
    }

  }, []);

  return null;
}