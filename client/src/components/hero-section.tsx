import { PlayCircle, Phone, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, MapPin, Clock, Star, Users, Award, ArrowRight } from "lucide-react";
import { useSiteSettings } from "@/hooks/use-site-settings";

export default function HeroSection() {
  const { getSetting, getBooleanSetting } = useSiteSettings();
  const showBanner = getBooleanSetting("show_banner", false);
  const bannerText = getSetting("banner_text", "Welcome to Mahech Internet Cafe!");
  const maintenanceMode = getBooleanSetting("maintenance_mode", false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative bg-gradient-to-br from-brand-blue to-brand-navy text-white py-20">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
        }}
      ></div>

      {/* Maintenance Mode Banner */}
      {maintenanceMode && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-red-600 to-orange-600 text-white text-center py-3 z-20">
          <div className="flex items-center justify-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            <p className="font-semibold">⚠️ Maintenance Mode Active - सर्वर रखरखाव चल रहा है</p>
            <AlertTriangle className="h-5 w-5" />
          </div>
        </div>
      )}

      {/* Custom Banner */}
      {showBanner && !maintenanceMode && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-2 z-10">
          <p className="font-medium">{bannerText}</p>
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Your Complete <span className="text-brand-cyan">Online Solution</span> Hub
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200">
          Government services, banking, printing, travel booking & all digital solutions
          <br />
          <span className="text-lg font-semibold text-brand-cyan">Auto-updated with Latest Vacancies & Forms</span>
          <br />
          <span className="text-lg">सरकारी सेवाएं, बैंकिंग, प्रिंटिंग, यात्रा बुकिंग और सभी डिजिटल समाधान</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => scrollToSection("services")}
            className="bg-brand-cyan hover:bg-cyan-600 text-white px-8 py-4 text-lg font-semibold"
          >
            <PlayCircle className="mr-2 h-5 w-5" />
            Explore Services
          </Button>
          <Button 
            onClick={() => scrollToSection("contact")}
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-brand-blue px-8 py-4 text-lg font-semibold"
          >
            <Phone className="mr-2 h-5 w-5" />
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}