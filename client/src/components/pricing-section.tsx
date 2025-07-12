import { Wifi, Printer, Gamepad2, Wrench, Percent } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const pricingCategories = [
  {
    icon: Wifi,
    title: "Internet Access",
    description: "High-speed browsing",
    color: "text-brand-blue",
    pricing: [
      { duration: "30 minutes", price: "₹10" },
      { duration: "1 hour", price: "₹20" },
      { duration: "Full day", price: "₹150" },
      { duration: "Monthly", price: "₹1000" }
    ]
  },
  {
    icon: Printer,
    title: "Printing Services",
    description: "Quality printing",
    color: "text-brand-cyan",
    pricing: [
      { duration: "B&W page", price: "₹2" },
      { duration: "Color page", price: "₹8" },
      { duration: "Scanning", price: "₹5" },
      { duration: "Photo print", price: "₹15" }
    ]
  },
  {
    icon: Gamepad2,
    title: "Gaming Zone",
    description: "Premium gaming",
    color: "text-brand-blue",
    popular: true,
    pricing: [
      { duration: "30 minutes", price: "₹25" },
      { duration: "1 hour", price: "₹45" },
      { duration: "Full day", price: "₹300" },
      { duration: "Monthly", price: "₹2000" }
    ]
  },
  {
    icon: Wrench,
    title: "Other Services",
    description: "Digital solutions",
    color: "text-green-600",
    pricing: [
      { duration: "Document typing", price: "₹50" },
      { duration: "Form filling", price: "₹100" },
      { duration: "Resume creation", price: "₹200" },
      { duration: "Tech support", price: "Custom" }
    ]
  }
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Affordable Pricing</h2>
          <p className="text-xl text-gray-600">
            Transparent and competitive rates for all our services
            <br />
            <span className="text-brand-blue">सभी सेवाओं के लिए पारदर्शी और प्रतिस्पर्धी दरें</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingCategories.map((category, index) => (
            <Card 
              key={index} 
              className={`bg-white shadow-lg hover:shadow-xl transition-shadow ${
                category.popular ? 'border-2 border-brand-blue' : ''
              }`}
            >
              <CardContent className="p-8">
                {category.popular && (
                  <div className="text-center mb-6">
                    <div className="bg-brand-blue text-white px-3 py-1 rounded-full text-sm font-semibold mb-2 inline-block">
                      Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <category.icon className={`${category.color} mb-4 mx-auto`} size={48} />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.title}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
                
                <div className="space-y-3 text-center">
                  {category.pricing.map((item, priceIndex) => (
                    <div 
                      key={priceIndex} 
                      className={`${priceIndex < category.pricing.length - 1 ? 'border-b pb-3' : ''}`}
                    >
                      <span className="text-lg font-semibold">{item.price}</span>
                      <span className="text-gray-600"> / {item.duration}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Special discounts available for students and regular customers</p>
          <Button className="bg-brand-blue hover:bg-brand-navy text-white px-8 py-3 font-semibold">
            <Percent className="mr-2 h-5 w-5" />
            View Discounts
          </Button>
        </div>
      </div>
    </section>
  );
}
