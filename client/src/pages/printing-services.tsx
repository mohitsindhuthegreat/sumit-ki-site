import Navigation from "@/components/navigation";
import PrintingServices from "@/components/printing-services";
import Footer from "@/components/footer";

export default function PrintingServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navigation />
      <PrintingServices />
      <Footer />
    </div>
  );
}