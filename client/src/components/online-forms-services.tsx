import { FileText, GraduationCap, Award, DollarSign, Heart, Home } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const onlineFormServices = [
  {
    icon: FileText,
    title: "Online Form Filling",
    titleHindi: "ऑनलाइन फॉर्म भरना",
    description: "Expert assistance for all types of online form filling",
    services: [
      "Government Job Applications",
      "Private Job Applications",
      "University Admissions",
      "Entrance Exam Forms",
      "Registration Forms",
      "Survey Forms"
    ],
    charges: "₹50 - ₹200 per form",
    color: "bg-blue-600"
  },
  {
    icon: GraduationCap,
    title: "Admit Card Download",
    titleHindi: "प्रवेश पत्र डाउनलोड",
    description: "Download and print admit cards for all examinations",
    services: [
      "Government Exam Admit Cards",
      "University Exam Admit Cards",
      "Competitive Exam Admit Cards",
      "Board Exam Admit Cards",
      "Banking Exam Admit Cards",
      "SSC/Railway Admit Cards"
    ],
    charges: "₹20 - ₹50 per admit card",
    color: "bg-green-600"
  },
  {
    icon: Award,
    title: "Result Print & Certificate",
    titleHindi: "परिणाम प्रिंट और प्रमाणपत्र",
    description: "Download and print examination results and certificates",
    services: [
      "Board Exam Results",
      "University Results",
      "Competitive Exam Results",
      "Mark Sheets Download",
      "Digital Certificates",
      "Provisional Certificates"
    ],
    charges: "₹10 - ₹30 per result",
    color: "bg-purple-600"
  },
  {
    icon: DollarSign,
    title: "Scholarship Forms",
    titleHindi: "छात्रवृत्ति फॉर्म",
    description: "Apply for various government and private scholarships",
    services: [
      "Merit-based Scholarships",
      "Need-based Scholarships",
      "Government Scholarships",
      "Private Scholarships",
      "State Scholarships",
      "Central Scholarships"
    ],
    charges: "₹100 - ₹300 per application",
    color: "bg-orange-600"
  },
  {
    icon: Heart,
    title: "PM Yojana Forms",
    titleHindi: "प्रधानमंत्री योजना फॉर्म",
    description: "Apply for all Prime Minister scheme applications",
    services: [
      "PM Kisan Yojana",
      "PM Awas Yojana",
      "PM Mudra Yojana",
      "PM Jan Dhan Yojana",
      "PM Ujjwala Yojana",
      "PM Ayushman Bharat"
    ],
    charges: "₹50 - ₹150 per application",
    color: "bg-red-600"
  },
  {
    icon: Home,
    title: "State Government Schemes",
    titleHindi: "राज्य सरकार की योजनाएं",
    description: "Apply for various state government welfare schemes",
    services: [
      "Housing Schemes",
      "Agricultural Schemes",
      "Employment Schemes",
      "Healthcare Schemes",
      "Education Schemes",
      "Women Welfare Schemes"
    ],
    charges: "₹75 - ₹200 per application",
    color: "bg-indigo-600"
  }
];

const popularForms = [
  { name: "NEET Application", category: "Medical Entrance", fee: "₹150" },
  { name: "JEE Main Application", category: "Engineering Entrance", fee: "₹120" },
  { name: "SSC CGL Form", category: "Government Job", fee: "₹100" },
  { name: "Bank PO Application", category: "Banking Job", fee: "₹130" },
  { name: "UPSC Form", category: "Civil Services", fee: "₹200" },
  { name: "Railway Group D", category: "Railway Job", fee: "₹80" }
];

export default function OnlineFormsServices() {
  return (
    <section id="online-forms-services" className="py-20 bg-white dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Online Forms & Examination Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Complete assistance for online form filling, admit cards, results, and scholarship applications
            <br />
            <span className="text-brand-blue font-medium">
              ऑनलाइन फॉर्म भरने, प्रवेश पत्र, परिणाम और छात्रवृत्ति आवेदन के लिए पूर्ण सहायता
            </span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {onlineFormServices.map((service, index) => (
            <Card key={index} className="bg-slate-50 dark:bg-slate-700 hover:shadow-xl transition-all duration-300">
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

                <Badge variant="secondary" className="bg-green-100 text-green-800 mb-6">
                  Service Charges: {service.charges}
                </Badge>

                <Button className={`w-full ${service.color} hover:opacity-90 text-white`}>
                  Get Help / सहायता लें
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-12">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Popular Form Applications
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularForms.map((form, index) => (
              <Card key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-600">
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                    {form.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {form.category}
                  </p>
                  <div className="flex justify-between items-center">
                    <Badge className="bg-green-600 text-white">
                      {form.fee}
                    </Badge>
                    <Button size="sm" variant="outline">
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">
              Why Choose Our Form Services?
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <FileText className="mr-3" size={20} />
                <span>Expert form filling with 100% accuracy</span>
              </div>
              <div className="flex items-center">
                <Award className="mr-3" size={20} />
                <span>Updated with latest application procedures</span>
              </div>
              <div className="flex items-center">
                <GraduationCap className="mr-3" size={20} />
                <span>Document verification and guidance</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">
              Special Packages
            </h3>
            <div className="space-y-3">
              <div className="bg-white bg-opacity-20 rounded p-3">
                <p className="font-semibold">Student Package</p>
                <p className="text-sm">Multiple exam forms with discount</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded p-3">
                <p className="font-semibold">Job Seeker Package</p>
                <p className="text-sm">Government job forms assistance</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded p-3">
                <p className="font-semibold">Family Package</p>
                <p className="text-sm">Scheme applications for family</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}