import { useEffect } from 'react';

export default function AdvancedAnalytics() {
  useEffect(() => {
    // Google Analytics 4 setup
    const setupGoogleAnalytics = () => {
      // Create GA4 script
      const gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
      document.head.appendChild(gaScript);

      // GA4 initialization code
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX', {
        page_title: document.title,
        page_location: window.location.href,
        custom_map: {
          'custom_parameter_1': 'service_type',
          'custom_parameter_2': 'user_language'
        }
      });

      // Custom event tracking
      const trackCustomEvents = () => {
        // Track service clicks
        document.addEventListener('click', (e) => {
          const target = e.target as HTMLElement;
          if (target.closest('[data-service]')) {
            const serviceType = target.closest('[data-service]')?.getAttribute('data-service');
            gtag('event', 'service_click', {
              service_type: serviceType,
              page_location: window.location.href
            });
          }
        });

        // Track form submissions
        document.addEventListener('submit', (e) => {
          const form = e.target as HTMLFormElement;
          if (form.id === 'contact-form') {
            gtag('event', 'contact_form_submit', {
              form_type: 'contact',
              page_location: window.location.href
            });
          }
        });

        // Track scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
          const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
          if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
            maxScroll = scrollPercent;
            gtag('event', 'scroll', {
              scroll_depth: scrollPercent,
              page_location: window.location.href
            });
          }
        });

        // Track page engagement time
        let startTime = Date.now();
        window.addEventListener('beforeunload', () => {
          const timeSpent = Math.round((Date.now() - startTime) / 1000);
          gtag('event', 'page_engagement', {
            engagement_time_msec: timeSpent * 1000,
            page_location: window.location.href
          });
        });
      };

      setTimeout(trackCustomEvents, 1000);
    };

    // Facebook Pixel setup
    const setupFacebookPixel = () => {
      // Facebook Pixel code
      !function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

      // Initialize pixel (replace with actual pixel ID)
      // fbq('init', 'YOUR_PIXEL_ID');
      // fbq('track', 'PageView');
    };

    // Microsoft Clarity setup
    const setupMicrosoftClarity = () => {
      (function(c: any, l: any, a: any, r: any, i: any, t: any, y: any) {
        c[a] = c[a] || function() {
          (c[a].q = c[a].q || []).push(arguments);
        };
        t = l.createElement(r);
        t.async = 1;
        t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0];
        y.parentNode.insertBefore(t, y);
      })(window, document, "clarity", "script", "YOUR_CLARITY_ID");
    };

    // Custom analytics for business insights
    const setupCustomAnalytics = () => {
      const analytics = {
        trackServiceInterest: (service: string) => {
          const data = {
            service,
            timestamp: new Date().toISOString(),
            page: window.location.pathname,
            userAgent: navigator.userAgent,
            language: navigator.language
          };
          
          // Store locally for now (can be sent to backend)
          const existingData = JSON.parse(localStorage.getItem('service_analytics') || '[]');
          existingData.push(data);
          localStorage.setItem('service_analytics', JSON.stringify(existingData.slice(-100))); // Keep last 100 entries
        },

        trackUserJourney: () => {
          const journey = JSON.parse(sessionStorage.getItem('user_journey') || '[]');
          journey.push({
            page: window.location.pathname,
            timestamp: new Date().toISOString(),
            referrer: document.referrer
          });
          sessionStorage.setItem('user_journey', JSON.stringify(journey));
        },

        trackBusinessMetrics: () => {
          // Track key business metrics
          const metrics = {
            totalPageViews: parseInt(localStorage.getItem('total_page_views') || '0') + 1,
            sessionStart: new Date().toISOString(),
            deviceType: window.innerWidth > 768 ? 'desktop' : 'mobile',
            location: window.location.pathname
          };
          
          localStorage.setItem('total_page_views', metrics.totalPageViews.toString());
          localStorage.setItem('last_visit', metrics.sessionStart);
        }
      };

      // Initialize custom analytics
      analytics.trackUserJourney();
      analytics.trackBusinessMetrics();

      // Export to window for global access
      (window as any).customAnalytics = analytics;
    };

    // SEO tracking and monitoring
    const setupSEOMonitoring = () => {
      // Track core web vitals
      const trackCoreWebVitals = () => {
        // Largest Contentful Paint (LCP)
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log('LCP:', lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach((entry) => {
            console.log('FID:', entry.processingStart - entry.startTime);
          });
        }).observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        new PerformanceObserver((entryList) => {
          let clsValue = 0;
          entryList.getEntries().forEach((entry) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          console.log('CLS:', clsValue);
        }).observe({ entryTypes: ['layout-shift'] });
      };

      if ('PerformanceObserver' in window) {
        trackCoreWebVitals();
      }

      // Monitor search engine crawlers
      const userAgent = navigator.userAgent.toLowerCase();
      const crawlers = ['googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider'];
      const isCrawler = crawlers.some(crawler => userAgent.includes(crawler));
      
      if (isCrawler) {
        console.log('Search engine crawler detected:', userAgent);
        // Track crawler visits
        const crawlerData = {
          crawler: userAgent,
          page: window.location.pathname,
          timestamp: new Date().toISOString()
        };
        
        const existingCrawlerData = JSON.parse(localStorage.getItem('crawler_visits') || '[]');
        existingCrawlerData.push(crawlerData);
        localStorage.setItem('crawler_visits', JSON.stringify(existingCrawlerData.slice(-50)));
      }
    };

    // Initialize all analytics
    setupGoogleAnalytics();
    setupFacebookPixel();
    setupMicrosoftClarity();
    setupCustomAnalytics();
    setupSEOMonitoring();

    // Track page view
    console.log('Advanced analytics initialized for:', window.location.pathname);

  }, []);

  return null;
}

// Extend window type for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    fbq: any;
    clarity: any;
    customAnalytics: any;
  }
}