import Navigation from "@/components/navigation";
import TermsConditions from "@/components/terms-conditions";
import Footer from "@/components/footer";

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navigation />
      <TermsConditions />
      <Footer />
    </div>
  );
}