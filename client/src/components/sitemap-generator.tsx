import { useEffect } from 'react';

export default function SitemapGenerator() {
  useEffect(() => {
    const generateSitemap = () => {
      const baseUrl = 'https://mahech-internet-cafe.replit.app';
      const pages = [
        { url: '/', priority: '1.0', changefreq: 'daily' },
        { url: '/about', priority: '0.8', changefreq: 'monthly' },
        { url: '/government-services', priority: '0.9', changefreq: 'weekly' },
        { url: '/banking-services', priority: '0.9', changefreq: 'weekly' },
        { url: '/printing-services', priority: '0.9', changefreq: 'weekly' },
        { url: '/online-forms', priority: '0.9', changefreq: 'weekly' },
        { url: '/travel-services', priority: '0.9', changefreq: 'weekly' },
        { url: '/contact', priority: '0.8', changefreq: 'monthly' },
        { url: '/sarkari-updates', priority: '1.0', changefreq: 'daily' },
        { url: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
        { url: '/terms-conditions', priority: '0.3', changefreq: 'yearly' }
      ];

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

      // Create a downloadable sitemap
      const blob = new Blob([sitemap], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      
      // Store sitemap data for potential backend use
      localStorage.setItem('sitemap', sitemap);
      
      console.log('Sitemap generated and stored');
    };

    generateSitemap();
  }, []);

  return null;
}

// Robots.txt content
export const robotsContent = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

# Special crawlers
User-agent: Googlebot
Allow: /
Disallow: /admin/
Disallow: /api/

User-agent: Bingbot
Allow: /
Disallow: /admin/
Disallow: /api/

# Sitemap
Sitemap: https://mahech-internet-cafe.replit.app/sitemap.xml

# Crawl delay
Crawl-delay: 1`;