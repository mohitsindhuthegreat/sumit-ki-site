import Navigation from "@/components/navigation";
import GovernmentServices from "@/components/government-services";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";

export default function GovernmentServicesPage() {
  return (
    <>
      <SEOHead 
        title="Government ID Services in Dang Kalan | Aadhaar, PAN, Voter ID | Mahech Internet Cafe"
        description="Expert government ID services in Dang Kalan. Aadhaar card, PAN card, Voter ID, Ration Card, Ayushman Bharat applications. Quick processing, affordable rates. सरकारी पहचान सेवाएं - आधार, पैन, वोटर आईडी कार्ड। Call +91 9306003497"
        keywords="aadhaar card Dang Kalan, pan card service Punjab, voter id card apply, ration card online, ayushman bharat card, government id services, digital india services, जन सेवा केंद्र, आधार कार्ड सेवा, पैन कार्ड बनवाएं, वोटर आईडी कार्ड"
        canonicalUrl="https://mahech-internet-cafe.replit.app/government-services"
      />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Navigation />
        <main>
          <GovernmentServices />
        </main>
        <Footer />
      </div>
    </>
  );
}