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
  const maintenanceMode = getBooleanSetting('maintenance_mode', false);
  const showBanner = getBooleanSetting('show_banner', false);
  const bannerText = getSetting('banner_text', '');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5Q0Q3REYiIGZpbGwtb3BhY2l0eT0iMC4zIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] bg-repeat"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <div className="space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Your Complete{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Online Solution
            </span>{" "}
            Hub
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Government services, banking, printing, travel booking & all digital solutions
          </p>
          
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-cyan-300 font-semibold text-lg">
              Auto-updated with Latest Vacancies & Forms
            </p>
            <p className="text-gray-300 mt-2">
              सरकारी सेवाएं, बैंकिंग, प्रिंटिंग, यात्रा बुकिंग और सभी डिजिटल समाधान
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Button 
              onClick={() => scrollToSection("services")}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              Explore Services
            </Button>
            <Button 
              onClick={() => scrollToSection("contact")}
              variant="outline"
              className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <Phone className="mr-2 h-5 w-5" />
              Contact Us
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                <h3 className="text-2xl font-bold">1000+</h3>
                <p className="text-gray-300">Happy Customers</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <Award className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                <h3 className="text-2xl font-bold">15+</h3>
                <p className="text-gray-300">Digital Services</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                <h3 className="text-2xl font-bold">4.9/5</h3>
                <p className="text-gray-300">Customer Rating</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}