import { Wifi, Printer, Monitor, FileText, Gamepad2, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Wifi,
    title: "High-Speed Internet",
    description: "Lightning-fast broadband internet access with unlimited browsing, gaming, and streaming capabilities.",
    features: ["100+ Mbps Speed", "24/7 Availability", "Gaming Optimized"],
    color: "bg-brand-blue"
  },
  {
    icon: Printer,
    title: "Printing & Scanning",
    description: "Professional printing and scanning services for documents, photos, and projects.",
    features: ["Color & B/W Printing", "Document Scanning", "Photo Printing"],
    color: "bg-brand-cyan"
  },
  {
    icon: Monitor,
    title: "Computer Services",
    description: "Complete computer solutions including repairs, software installation, and technical support.",
    features: ["Hardware Repair", "Software Installation", "Data Recovery"],
    color: "bg-brand-navy"
  },
  {
    icon: FileText,
    title: "Digital Documentation",
    description: "Document typing, form filling, and digital paperwork assistance.",
    features: ["Document Typing", "Form Filling", "Resume Creation"],
    color: "bg-green-600"
  },
  {
    icon: Gamepad2,
    title: "Gaming Zone",
    description: "High-performance gaming computers with latest games and comfortable gaming environment.",
    features: ["Latest Games", "High-End PCs", "Comfortable Setup"],
    color: "bg-purple-600"
  },
  {
    icon: Globe,
    title: "Online Services",
    description: "Bill payments, online applications, and various government service assistance.",
    features: ["Bill Payments", "Online Applications", "Government Services"],
    color: "bg-orange-600"
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete digital solutions for all your technology needs
            <br />
            <span className="text-brand-blue">आपकी सभी तकनीकी आवश्यकताओं के लिए संपूर्ण डिजिटल समाधान</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-slate-50 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mb-6`}>
                  <service.icon className="text-white text-2xl" size={32} />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="text-sm text-gray-600 space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
