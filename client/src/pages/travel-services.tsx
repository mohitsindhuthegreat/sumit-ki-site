import Navigation from "@/components/navigation";
import TravelServices from "@/components/travel-services";
import Footer from "@/components/footer";

export default function TravelServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navigation />
      <TravelServices />
      <Footer />
    </div>
  );
}