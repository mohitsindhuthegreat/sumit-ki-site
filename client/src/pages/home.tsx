import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ServicesOverview from "@/components/services-overview";
import AboutSection from "@/components/about-section";
import GovernmentServices from "@/components/government-services";
import BankingServices from "@/components/banking-services";
import PrintingServices from "@/components/printing-services";
import OnlineFormsServices from "@/components/online-forms-services";
import TravelServices from "@/components/travel-services";
import ContactSection from "@/components/contact-section";
import PrivacyPolicy from "@/components/privacy-policy";
import TermsConditions from "@/components/terms-conditions";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navigation />
      <HeroSection />
      <ServicesOverview />
      <AboutSection />
      <GovernmentServices />
      <BankingServices />
      <PrintingServices />
      <OnlineFormsServices />
      <TravelServices />
      <ContactSection />
      <PrivacyPolicy />
      <TermsConditions />
      <Footer />
    </div>
  );
}
