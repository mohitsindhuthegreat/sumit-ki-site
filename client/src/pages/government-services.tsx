import Navigation from "@/components/navigation";
import GovernmentServices from "@/components/government-services";
import Footer from "@/components/footer";

export default function GovernmentServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navigation />
      <GovernmentServices />
      <Footer />
    </div>
  );
}