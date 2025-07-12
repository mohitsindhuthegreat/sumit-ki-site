import Navigation from "@/components/navigation";
import OnlineFormsServices from "@/components/online-forms-services";
import Footer from "@/components/footer";

export default function OnlineFormsServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navigation />
      <OnlineFormsServices />
      <Footer />
    </div>
  );
}