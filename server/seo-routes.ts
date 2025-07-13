import { Request, Response } from 'express';

// Generate dynamic sitemap.xml
export function generateSitemap(req: Request, res: Response) {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  
  const pages = [
    { url: '/', priority: '1.0', changefreq: 'daily', lastmod: new Date().toISOString().split('T')[0] },
    { url: '/about', priority: '0.8', changefreq: 'monthly', lastmod: '2025-01-13' },
    { url: '/government-services', priority: '0.9', changefreq: 'weekly', lastmod: '2025-01-13' },
    { url: '/banking-services', priority: '0.9', changefreq: 'weekly', lastmod: '2025-01-13' },
    { url: '/printing-services', priority: '0.9', changefreq: 'weekly', lastmod: '2025-01-13' },
    { url: '/online-forms', priority: '0.9', changefreq: 'weekly', lastmod: '2025-01-13' },
    { url: '/travel-services', priority: '0.9', changefreq: 'weekly', lastmod: '2025-01-13' },
    { url: '/contact', priority: '0.8', changefreq: 'monthly', lastmod: '2025-01-13' },
    { url: '/sarkari-updates', priority: '1.0', changefreq: 'daily', lastmod: new Date().toISOString().split('T')[0] },
    { url: '/privacy-policy', priority: '0.3', changefreq: 'yearly', lastmod: '2025-01-13' },
    { url: '/terms-conditions', priority: '0.3', changefreq: 'yearly', lastmod: '2025-01-13' }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  res.set('Content-Type', 'application/xml');
  res.send(sitemap);
}

// Generate robots.txt
export function generateRobots(req: Request, res: Response) {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  
  const robots = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

# Special crawlers
User-agent: Googlebot
Allow: /
Disallow: /admin/
Disallow: /api/
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Disallow: /admin/
Disallow: /api/
Crawl-delay: 1

User-agent: Slurp
Allow: /
Disallow: /admin/
Disallow: /api/

# Block bad bots
User-agent: SemrushBot
Disallow: /

User-agent: AhrefsBot
Disallow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Host directive
Host: ${baseUrl}`;

  res.set('Content-Type', 'text/plain');
  res.send(robots);
}

// Generate favicon.ico redirect
export function generateFavicon(req: Request, res: Response) {
  // For now, redirect to a placeholder. In production, serve actual favicon
  res.redirect(301, '/favicon.ico');
}

// Generate OpenGraph image
export function generateOGImage(req: Request, res: Response) {
  // This would generate a dynamic OG image
  // For now, we'll redirect to a placeholder
  const svgImage = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1e40af;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#0891b2;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)" />
    <text x="600" y="300" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle">
      Mahech Internet Cafe
    </text>
    <text x="600" y="360" font-family="Arial, sans-serif" font-size="24" fill="#e0f2fe" text-anchor="middle">
      Complete Digital Solution Hub
    </text>
    <text x="600" y="420" font-family="Arial, sans-serif" font-size="20" fill="#bae6fd" text-anchor="middle">
      Government Services • Banking • Printing • Travel
    </text>
    <text x="600" y="480" font-family="Arial, sans-serif" font-size="18" fill="#87ceeb" text-anchor="middle">
      सरकारी सेवाएं • बैंकिंग • प्रिंटिंग • यात्रा
    </text>
  </svg>`;

  res.set('Content-Type', 'image/svg+xml');
  res.send(svgImage);
}

// JSON-LD structured data for home page
export function generateHomeStructuredData(req: Request, res: Response) {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${baseUrl}/#business`,
        "name": "Mahech Internet Cafe",
        "alternateName": "महेच इंटरनेट कैफे",
        "description": "Complete digital solution hub in Dang Kalan. Expert services for Aadhaar, PAN, Voter ID, banking, bill payments, money transfer, printing, travel booking, computer training.",
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
        "openingHours": "Mo-Su 08:00-23:00",
        "priceRange": "₹",
        "image": `${baseUrl}/og-image.jpg`,
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Digital Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Government ID Services",
                "description": "Aadhaar, PAN, Voter ID, Ration Card services",
                "category": "Government Services"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Banking Services",
                "description": "Bill payments, money transfer, AEPS services",
                "category": "Financial Services"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Printing Services",
                "description": "Document printing, scanning, lamination",
                "category": "Business Services"
              }
            }
          ]
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "150",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": "Mahech Internet Cafe",
        "description": "Complete digital solution hub for government services, banking, and more",
        "publisher": {
          "@id": `${baseUrl}/#business`
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${baseUrl}/sarkari-updates?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          }
        ],
        "inLanguage": ["en-IN", "hi-IN"]
      }
    ]
  };

  res.json(structuredData);
}