import Navigation from "@/components/navigation";
import BankingServices from "@/components/banking-services";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";

export default function BankingServicesPage() {
  return (
    <>
      <SEOHead 
        title="Banking Services in Dang Kalan | Bill Payment, Money Transfer, AEPS | Mahech Internet Cafe"
        description="Complete banking services in Dang Kalan. Bill payment, money transfer, AEPS, balance check, mobile recharge, DTH recharge, insurance premium. Safe & secure transactions. बैंकिंग सेवाएं - बिल पेमेंट, मनी ट्रांसफर। Call +91 9306003497"
        keywords="banking services Dang Kalan, bill payment Punjab, money transfer service, AEPS service, mobile recharge, DTH recharge, electricity bill payment, gas bill payment, water bill payment, insurance premium, बैंकिंग सेवाएं पंजाब, बिल पेमेंट सेवा, मनी ट्रांसफर"
        canonicalUrl="https://mahech-internet-cafe.replit.app/banking-services"
      />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Navigation />
        <main>
          <BankingServices />
        </main>
        <Footer />
      </div>
    </>
  );
}