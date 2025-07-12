import Navigation from "@/components/navigation";
import PrivacyPolicy from "@/components/privacy-policy";
import Footer from "@/components/footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navigation />
      <PrivacyPolicy />
      <Footer />
    </div>
  );
}