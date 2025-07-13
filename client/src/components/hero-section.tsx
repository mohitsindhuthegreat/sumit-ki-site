import { PlayCircle, Phone, AlertTriangle, MapPin, Clock, Star, Users, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSiteSettings } from "@/hooks/use-site-settings";

export default function HeroSection() {
  const { getSetting, getBooleanSetting } = useSiteSettings();

  // Get dynamic values from settings
  const siteTitle = getSetting('site_title', 'Mahech Internet Cafe');
  const siteTitleHindi = getSetting('site_title_hindi', 'महेच इंटरनेट कैफे');
  const heroHeadline = getSetting('hero_headline', 'Your Complete Digital Solution Hub');
  const heroDescription = getSetting('hero_description', 'Government services, banking, travel booking, and more - all under one roof');
  const mainPhone = getSetting('contact_phone', '+91 9306003497');
  const whatsappNumber = getSetting('contact_whatsapp', '+91 9306003497');
  const businessHours = getSetting('business_hours', 'Open Daily 8 AM - 10 PM');
  const showHeroVideo = getBooleanSetting('show_hero_video', true);
  const showEmergencyNotice = getBooleanSetting('show_emergency_notice', false);
  const emergencyMessage = getSetting('emergency_message', '');

  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5ODk4OTgiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIzIi8+PC9nPjwvZz48L3N2Zz4=')] bg-repeat"></div>
      </div>

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