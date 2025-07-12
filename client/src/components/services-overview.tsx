import { FileText, CreditCard, Printer, Globe, Plane, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const mainServices = [
  {
    icon: FileText,
    title: "Government ID Services",
    titleHindi: "सरकारी पहचान सेवाएं",
    description: "Complete assistance for all government ID documentation and applications",
    descriptionHindi: "सभी सरकारी पहचान दस्तावेज और आवेदन के लिए पूर्ण सहायता",
    services: ["Aadhaar Card", "PAN Card", "Voter ID", "Ration Card", "Ayushman Bharat"],
    color: "bg-brand-blue",
    sectionId: "government-services"
  },
  {
    icon: CreditCard,
    title: "Banking & Bill Payments",
    titleHindi: "बैंकिंग और बिल भुगतान",
    description: "All banking services, bill payments, and money transfer solutions",
    descriptionHindi: "सभी बैंकिंग सेवाएं, बिल भुगतान और पैसे ट्रांसफर समाधान",
    services: ["Bill Payments", "Money Transfer", "AEPS", "Balance Check", "Insurance"],
    color: "bg-green-600",
    sectionId: "banking-services"
  },
  {
    icon: Printer,
    title: "Printing & Stationery",
    titleHindi: "प्रिंटिंग और स्टेशनरी",
    description: "Professional printing, scanning, and document services",
    descriptionHindi: "व्यावसायिक प्रिंटिंग, स्कैनिंग और दस्तावेज सेवाएं",
    services: ["Color/B&W Printing", "Scanning", "Lamination", "Resume Making"],
    color: "bg-brand-cyan",
    sectionId: "printing-services"
  },
  {
    icon: Globe,
    title: "Online Forms & Exams",
    titleHindi: "ऑनलाइन फॉर्म और परीक्षाएं",
    description: "Complete online form filling and exam-related services",
    descriptionHindi: "पूर्ण ऑनलाइन फॉर्म भरना और परीक्षा संबंधी सेवाएं",
    services: ["Form Filling", "Admit Cards", "Results", "Scholarship Forms"],
    color: "bg-purple-600",
    sectionId: "online-forms-services"
  },
  {
    icon: Plane,
    title: "Travel & Booking",
    titleHindi: "यात्रा और बुकिंग",
    description: "Complete travel booking solutions for all your journey needs",
    descriptionHindi: "आपकी सभी यात्रा आवश्यकताओं के लिए पूर्ण यात्रा बुकिंग समाधान",
    services: ["Train Tickets", "Bus Tickets", "Flight Booking", "Hotel Booking"],
    color: "bg-orange-600",
    sectionId: "travel-services"
  },
  {
    icon: Users,
    title: "Expert Support",
    titleHindi: "विशेषज्ञ सहायता",
    description: "24/7 professional support for all your digital needs",
    descriptionHindi: "आपकी सभी डिजिटल आवश्यकताओं के लिए 24/7 पेशेवर सहायता",
    services: ["Technical Support", "Digital Guidance", "Form Assistance", "Documentation"],
    color: "bg-indigo-600",
    sectionId: "contact"
  }
];

export default function ServicesOverview() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-20 bg-white dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Complete Digital Solutions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your one-stop destination for all government, banking, printing, and digital services
            <br />
            <span className="text-brand-blue font-medium">
              सभी सरकारी, बैंकिंग, प्रिंटिंग और डिजिटल सेवाओं के लिए आपका वन-स्टॉप गंतव्य
            </span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mainServices.map((service, index) => (
            <Card key={index} className="bg-slate-50 dark:bg-slate-700 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-8">
                <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mb-6`}>
                  <service.icon className="text-white text-2xl" size={32} />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-lg font-medium text-brand-blue mb-3">
                  {service.titleHindi}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {service.description}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  {service.descriptionHindi}
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2 mb-6">
                  {service.services.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => scrollToSection(service.sectionId)}
                  className={`w-full ${service.color} hover:opacity-90 text-white`}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-brand-blue to-brand-cyan text-white rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">
              Why Choose Mahech Internet Cafe?
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sm">Service Available</div>
              </div>
              <div>
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm">Services Offered</div>
              </div>
              <div>
                <div className="text-3xl font-bold">5+</div>
                <div className="text-sm">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}