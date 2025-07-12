import { FileText, CreditCard, Users, Heart, Wallet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const governmentServices = [
  {
    icon: FileText,
    title: "Aadhaar Card Services",
    titleHindi: "आधार कार्ड सेवाएं",
    description: "Complete Aadhaar card services - new enrollment, updates, and corrections",
    services: [
      "New Aadhaar Enrollment",
      "Aadhaar Update/Correction", 
      "Mobile/Email Update",
      "Address Change",
      "Biometric Update",
      "Aadhaar Download"
    ],
    price: "₹50 - ₹100",
    time: "15-30 minutes",
    color: "bg-blue-600"
  },
  {
    icon: CreditCard,
    title: "PAN Card Services", 
    titleHindi: "पैन कार्ड सेवाएं",
    description: "PAN card application, correction, and replacement services",
    services: [
      "New PAN Application",
      "PAN Correction",
      "Lost PAN Replacement",
      "PAN Status Check",
      "PAN Download",
      "Income Tax Filing"
    ],
    price: "₹100 - ₹300",
    time: "20-45 minutes", 
    color: "bg-green-600"
  },
  {
    icon: Users,
    title: "Voter ID Services",
    titleHindi: "वोटर आईडी सेवाएं", 
    description: "Voter ID card registration, correction, and related services",
    services: [
      "New Voter Registration",
      "Voter ID Correction",
      "Address Change",
      "Duplicate Voter ID",
      "Voter List Check",
      "Election Information"
    ],
    price: "₹30 - ₹80",
    time: "10-25 minutes",
    color: "bg-purple-600"
  },
  {
    icon: Wallet,
    title: "Ration Card Services",
    titleHindi: "राशन कार्ड सेवाएं",
    description: "Ration card application, updates, and BPL/APL services", 
    services: [
      "New Ration Card",
      "Ration Card Update",
      "Member Addition/Deletion",
      "Category Change (BPL/APL)",
      "Duplicate Ration Card",
      "Fair Price Shop Info"
    ],
    price: "₹50 - ₹150",
    time: "15-40 minutes",
    color: "bg-orange-600"
  },
  {
    icon: Heart,
    title: "Ayushman Bharat Card",
    titleHindi: "आयुष्मान भारत कार्ड",
    description: "Health insurance card registration and related healthcare services",
    services: [
      "Ayushman Card Registration",
      "Eligibility Check", 
      "Card Download",
      "Hospital List",
      "Claim Status",
      "Health Scheme Info"
    ],
    price: "₹20 - ₹50",
    time: "10-20 minutes",
    color: "bg-red-600"
  }
];

export default function GovernmentServices() {
  return (
    <section id="government-services" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Government ID Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Complete assistance for all government identification and documentation services
            <br />
            <span className="text-brand-blue font-medium">
              सभी सरकारी पहचान और दस्तावेज सेवाओं के लिए पूर्ण सहायता
            </span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {governmentServices.map((service, index) => (
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
                  {service.services.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 mb-6">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {service.price}
                  </Badge>
                  <Badge variant="outline" className="border-blue-200 text-blue-800">
                    {service.time}
                  </Badge>
                </div>

                <Button 
                  className={`w-full ${service.color} hover:opacity-90 text-white`}
                  onClick={() => {
                    const serviceRequest = {
                      service_category: "government",
                      service_type: service.title,
                      details: `Interested in ${service.title} - ${service.titleHindi}. Services needed: ${service.services.slice(0, 3).join(', ')}. Price: ${service.price}`
                    };
                    localStorage.setItem('service_request', JSON.stringify(serviceRequest));
                    window.location.href = '/contact';
                  }}
                >
                  Apply Now / अभी आवेदन करें
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-4">
              Special Government Services Package
            </h3>
            <p className="text-lg">
              Get multiple government services done together and save money!
              <br />
              <span className="text-blue-200">
                एक साथ कई सरकारी सेवाएं कराएं और पैसे बचाएं!
              </span>
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h4 className="font-bold text-lg mb-2">Basic Package</h4>
              <p className="text-sm mb-2">Aadhaar + PAN Card</p>
              <p className="text-2xl font-bold">₹120</p>
              <p className="text-sm text-blue-200">(Save ₹30)</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h4 className="font-bold text-lg mb-2">Complete Package</h4>
              <p className="text-sm mb-2">All 5 Services</p>
              <p className="text-2xl font-bold">₹350</p>
              <p className="text-sm text-blue-200">(Save ₹100)</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h4 className="font-bold text-lg mb-2">Family Package</h4>
              <p className="text-sm mb-2">For 4+ Members</p>
              <p className="text-2xl font-bold">₹800</p>
              <p className="text-sm text-blue-200">(Save ₹200)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}