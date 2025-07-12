import { Printer, Scan, Copy, Shield, FileText, Image } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const printingServices = [
  {
    icon: Printer,
    title: "Printing Services",
    titleHindi: "प्रिंटिंग सेवाएं",
    description: "High-quality printing services for all your document needs",
    services: [
      "Black & White Printing",
      "Color Printing", 
      "Photo Printing",
      "Large Format Printing",
      "Poster Printing",
      "Certificate Printing"
    ],
    pricing: [
      { service: "B&W Single Side", price: "₹2" },
      { service: "B&W Double Side", price: "₹3" },
      { service: "Color Single Side", price: "₹8" },
      { service: "Color Double Side", price: "₹12" },
      { service: "Photo Print 4x6", price: "₹15" },
      { service: "Photo Print 6x8", price: "₹25" }
    ],
    color: "bg-blue-600"
  },
  {
    icon: Scan,
    title: "Scanning Services",
    titleHindi: "स्कैनिंग सेवाएं",
    description: "Professional document and photo scanning services",
    services: [
      "Document Scanning",
      "Photo Scanning",
      "Multi-page Scanning",
      "High Resolution Scanning",
      "PDF Creation",
      "Email/WhatsApp Delivery"
    ],
    pricing: [
      { service: "Document Scan (per page)", price: "₹5" },
      { service: "Photo Scan", price: "₹10" },
      { service: "Multi-page PDF", price: "₹3/page" },
      { service: "High Resolution", price: "₹15" },
      { service: "Email Delivery", price: "Free" },
      { service: "WhatsApp Delivery", price: "Free" }
    ],
    color: "bg-green-600"
  },
  {
    icon: Copy,
    title: "Photocopy Services",
    titleHindi: "फोटोकॉपी सेवाएं",
    description: "Fast and clear photocopying for all document types",
    services: [
      "Single Side Photocopy",
      "Double Side Photocopy",
      "Bulk Photocopying",
      "ID Card Photocopy",
      "Book Binding",
      "Spiral Binding"
    ],
    pricing: [
      { service: "Single Side Copy", price: "₹1" },
      { service: "Double Side Copy", price: "₹1.5" },
      { service: "Bulk (100+ pages)", price: "₹0.75/page" },
      { service: "ID Card Copy", price: "₹2" },
      { service: "Spiral Binding", price: "₹20" },
      { service: "Book Binding", price: "₹50" }
    ],
    color: "bg-purple-600"
  },
  {
    icon: Shield,
    title: "Lamination Services",
    titleHindi: "लैमिनेशन सेवाएं",
    description: "Protect your important documents with professional lamination",
    services: [
      "A4 Size Lamination",
      "A3 Size Lamination",
      "ID Card Lamination",
      "Certificate Lamination",
      "Photo Lamination",
      "Custom Size Lamination"
    ],
    pricing: [
      { service: "A4 Lamination", price: "₹15" },
      { service: "A3 Lamination", price: "₹25" },
      { service: "ID Card Lamination", price: "₹10" },
      { service: "Certificate Lamination", price: "₹20" },
      { service: "Photo Lamination", price: "₹12" },
      { service: "Custom Size", price: "₹30+" }
    ],
    color: "bg-orange-600"
  },
  {
    icon: FileText,
    title: "Resume & CV Services",
    titleHindi: "रिज्यूमे और सीवी सेवाएं",
    description: "Professional resume creation and formatting services",
    services: [
      "Resume Creation",
      "CV Formatting",
      "Cover Letter Writing",
      "LinkedIn Profile Setup",
      "Job Application Forms",
      "Professional Templates"
    ],
    pricing: [
      { service: "Basic Resume", price: "₹200" },
      { service: "Professional Resume", price: "₹500" },
      { service: "CV with Cover Letter", price: "₹700" },
      { service: "LinkedIn Setup", price: "₹300" },
      { service: "Job Application Help", price: "₹100" },
      { service: "Template Design", price: "₹150" }
    ],
    color: "bg-indigo-600"
  },
  {
    icon: Image,
    title: "Photo Services",
    titleHindi: "फोटो सेवाएं",
    description: "Complete photo services for documents and personal use",
    services: [
      "Passport Size Photos",
      "Stamp Size Photos",
      "Document Photos",
      "Photo Editing",
      "Background Removal",
      "Photo Restoration"
    ],
    pricing: [
      { service: "Passport Photos (4 copies)", price: "₹40" },
      { service: "Stamp Photos (8 copies)", price: "₹30" },
      { service: "Document Photos", price: "₹50" },
      { service: "Photo Editing", price: "₹100" },
      { service: "Background Change", price: "₹150" },
      { service: "Photo Restoration", price: "₹200" }
    ],
    color: "bg-pink-600"
  }
];

export default function PrintingServices() {
  return (
    <section id="printing-services" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Printing & Stationery Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Professional printing, scanning, and document services with latest technology
            <br />
            <span className="text-brand-blue font-medium">
              नवीनतम तकनीक के साथ पेशेवर प्रिंटिंग, स्कैनिंग और दस्तावेज सेवाएं
            </span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {printingServices.map((service, index) => (
            <Card key={index} className="bg-white dark:bg-slate-800 hover:shadow-xl transition-all duration-300">
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
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {service.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Services:</h4>
                  {service.services.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Pricing:</h4>
                  {service.pricing.slice(0, 3).map((item, itemIndex) => (
                    <div key={itemIndex} className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">{item.service}</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {item.price}
                      </Badge>
                    </div>
                  ))}
                  {service.pricing.length > 3 && (
                    <p className="text-xs text-gray-500">+ {service.pricing.length - 3} more services</p>
                  )}
                </div>

                <Button className={`w-full ${service.color} hover:opacity-90 text-white`}>
                  Get Service / सेवा लें
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">
              Quality Guarantee
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Printer className="mr-3" size={20} />
                <span>High-quality printers and paper</span>
              </div>
              <div className="flex items-center">
                <Shield className="mr-3" size={20} />
                <span>Document privacy and security</span>
              </div>
              <div className="flex items-center">
                <Copy className="mr-3" size={20} />
                <span>Fast turnaround time</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">
              Bulk Discounts
            </h3>
            <div className="space-y-3">
              <div className="bg-white bg-opacity-20 rounded p-3">
                <p className="font-semibold">50+ Pages</p>
                <p className="text-sm">10% discount on printing</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded p-3">
                <p className="font-semibold">100+ Pages</p>
                <p className="text-sm">15% discount + free binding</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded p-3">
                <p className="font-semibold">Student Special</p>
                <p className="text-sm">20% off on all services</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}