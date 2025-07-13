import { useEffect } from 'react';
import { useLocation } from 'wouter';

export default function EnhancedMetaTags() {
  const [location] = useLocation();

  useEffect(() => {
    // Update page title with beautiful branding
    const updateTitle = () => {
      const siteName = "Mahech Internet Cafe | महेच इंटरनेट कैफे";
      
      const pageTitles: Record<string, string> = {
        '/': `Digital Solution Hub - ${siteName}`,
        '/about': `About Us - ${siteName}`,
        '/government-services': `Government ID Services - ${siteName}`,
        '/banking-services': `Banking & Bill Payment - ${siteName}`,
        '/printing-services': `Printing & Stationery - ${siteName}`,
        '/online-forms': `Online Forms & Exams - ${siteName}`,
        '/travel-services': `Travel Booking - ${siteName}`,
        '/sarkari-updates': `Government Job Updates - ${siteName}`,
        '/contact': `Contact Us - ${siteName}`,
        '/admin/login': `Admin Login - ${siteName}`,
        '/admin/dashboard': `Admin Dashboard - ${siteName}`
      };
      
      document.title = pageTitles[location] || siteName;
    };

    // Add Google verification meta tag
    const addGoogleVerification = () => {
      // Remove existing verification meta tag
      const existingMeta = document.querySelector('meta[name="google-site-verification"]');
      if (existingMeta) {
        existingMeta.remove();
      }
      
      // Add Google site verification meta tag
      const googleMeta = document.createElement('meta');
      googleMeta.name = 'google-site-verification';
      googleMeta.content = 'googledbb31191f1908500';
      document.head.appendChild(googleMeta);
    };

    // Add professional favicon and meta tags
    const updateFavicon = () => {
      // Remove existing favicon links
      const existingLinks = document.querySelectorAll('link[rel*="icon"]');
      existingLinks.forEach(link => link.remove());
      
      // Add new beautiful favicon - force refresh with timestamp
      const timestamp = Date.now();
      const faviconLink = document.createElement('link');
      faviconLink.rel = 'icon';
      faviconLink.type = 'image/svg+xml';
      faviconLink.href = `/favicon.ico?v=${timestamp}`;
      document.head.appendChild(faviconLink);
      
      // Add 16x16 favicon for better browser support
      const favicon16 = document.createElement('link');
      favicon16.rel = 'icon';
      favicon16.type = 'image/svg+xml';
      favicon16.sizes = '16x16';
      favicon16.href = `/favicon.ico?v=${timestamp}`;
      document.head.appendChild(favicon16);
      
      // Add 32x32 favicon
      const favicon32 = document.createElement('link');
      favicon32.rel = 'icon';
      favicon32.type = 'image/svg+xml';
      favicon32.sizes = '32x32';
      favicon32.href = `/favicon.ico?v=${timestamp}`;
      document.head.appendChild(favicon32);
      
      // Add Apple touch icon
      const appleIcon = document.createElement('link');
      appleIcon.rel = 'apple-touch-icon';
      appleIcon.sizes = '180x180';
      appleIcon.href = `/favicon.ico?v=${timestamp}`;
      document.head.appendChild(appleIcon);
      
      // Add manifest
      const manifest = document.createElement('link');
      manifest.rel = 'manifest';
      manifest.href = '/site.webmanifest';
      document.head.appendChild(manifest);
      
      // Force browser to refresh favicon with multiple attempts
      setTimeout(() => {
        // Method 1: Update existing favicon
        const existingFavicon = document.querySelector("link[rel*='icon']");
        if (existingFavicon) {
          existingFavicon.href = `/favicon.ico?v=${timestamp}`;
        }
        
        // Method 2: Add shortcut icon
        const shortcutIcon = document.createElement('link');
        shortcutIcon.rel = 'shortcut icon';
        shortcutIcon.type = 'image/svg+xml';
        shortcutIcon.href = `/favicon.ico?v=${timestamp}`;
        document.head.appendChild(shortcutIcon);
        
        // Method 3: Force reload by changing href
        setTimeout(() => {
          const allIcons = document.querySelectorAll('link[rel*="icon"]');
          allIcons.forEach(icon => {
            const oldHref = icon.href;
            icon.href = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="15" fill="%23ff0000"/></svg>';
            setTimeout(() => {
              icon.href = oldHref;
            }, 100);
          });
        }, 200);
      }, 100);
    };

    // Add professional meta description based on page
    const updateMetaDescription = () => {
      const descriptions: Record<string, string> = {
        '/': 'Complete digital solution hub in Dang Kalan offering government services, banking, printing, travel booking, and computer training. Your one-stop internet cafe.',
        '/about': 'Learn about Mahech Internet Cafe - Punjab\'s premier digital service center providing government ID, banking, printing and travel services since 2020.',
        '/government-services': 'Government ID services including Aadhaar, PAN, Voter ID, Ration Card applications and updates. Fast and reliable service in Dang Kalan, Punjab.',
        '/banking-services': 'Banking services including AEPS, money transfer, bill payments, mobile recharge, and account opening assistance. Trusted financial services.',
        '/printing-services': 'Professional printing, scanning, lamination, and stationery services. High-quality document printing and office supplies in Dang Kalan.',
        '/online-forms': 'Online form filling, exam applications, admit card downloads, and result checking services. Expert assistance for government exams.',
        '/travel-services': 'Train, bus, flight booking and hotel reservations. Complete travel planning and ticket booking services at competitive prices.',
        '/sarkari-updates': 'Latest government job notifications, form updates, admit cards, and exam results. Stay updated with Punjab and central government opportunities.',
        '/contact': 'Contact Mahech Internet Cafe for all digital services. Located at VPO Dang Kalan near Baweja Mart. Call +91 9306003497 for assistance.'
      };
      
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', descriptions[location] || descriptions['/']);
    };

    // Add schema markup for better search results
    const addBreadcrumbSchema = () => {
      // Remove existing breadcrumb schema
      const existingBreadcrumb = document.querySelector('script[data-type="breadcrumb"]');
      if (existingBreadcrumb) existingBreadcrumb.remove();
      
      if (location === '/') return; // No breadcrumb for home
      
      const pathParts = location.split('/').filter(Boolean);
      const breadcrumbItems = [
        { name: 'Home', url: '/' },
        ...pathParts.map((part, index) => ({
          name: part.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
          url: '/' + pathParts.slice(0, index + 1).join('/')
        }))
      ];
      
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": `${window.location.origin}${item.url}`
        }))
      };
      
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-type', 'breadcrumb');
      script.textContent = JSON.stringify(breadcrumbSchema);
      document.head.appendChild(script);
    };

    // Update all meta elements
    updateTitle();
    addGoogleVerification();
    updateFavicon();
    updateMetaDescription();
    addBreadcrumbSchema();
    
  }, [location]);

  return null;
}