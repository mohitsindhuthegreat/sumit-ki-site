import Navigation from "@/components/navigation";
import BankingServices from "@/components/banking-services";
import Footer from "@/components/footer";

export default function BankingServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navigation />
      <BankingServices />
      <Footer />
    </div>
  );
}