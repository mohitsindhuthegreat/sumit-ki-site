import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ServicesOverview from "@/components/services-overview";
import AnnouncementsSection from "@/components/announcements-section";
import ContactSection from "@/components/contact-section";
import NewsletterSignup from "@/components/newsletter-signup";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";
import SitemapGenerator from "@/components/sitemap-generator";

export default function Home() {
  return (
    <>
      <SEOHead 
        title="Mahech Internet Cafe - Best Digital Services in Dang Kalan | Government ID, Banking, Printing"
        description="Complete digital solution hub in Dang Kalan. Expert services for Aadhaar, PAN, Voter ID, banking, bill payments, money transfer, printing, travel booking, computer training. सरकारी सेवाएं, बैंकिंग, प्रिंटिंग। Call +91 9306003497"
        keywords="internet cafe Dang Kalan, government services Punjab, aadhaar card service, pan card apply, voter id card, banking services, bill payment, money transfer, AEPS, printing services, travel booking, computer training, digital services Punjab, महेच इंटरनेट कैफे, सरकारी सेवाएं पंजाब, बैंकिंग सेवाएं, प्रिंटिंग सेवाएं"
        canonicalUrl="https://mahech-internet-cafe.replit.app"
      />
      <SitemapGenerator />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Navigation />
        <main>
          <HeroSection />
          <AnnouncementsSection />
          <ServicesOverview />
          <ContactSection />
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <NewsletterSignup />
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
