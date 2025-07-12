import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ServicesOverview from "@/components/services-overview";
import AnnouncementsSection from "@/components/announcements-section";
import NewsletterSignup from "@/components/newsletter-signup";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navigation />
      <HeroSection />
      <AnnouncementsSection />
      <ServicesOverview />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <NewsletterSignup />
      </div>
      <Footer />
    </div>
  );
}
