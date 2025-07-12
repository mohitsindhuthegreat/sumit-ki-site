import { CreditCard, Zap, Send, Smartphone, Shield, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const bankingServices = [
  {
    icon: Zap,
    title: "Bill Payments",
    titleHindi: "बिल भुगतान",
    description: "Pay all your utility bills quickly and securely",
    services: [
      "Electricity Bill Payment",
      "Water Bill Payment", 
      "Gas Bill Payment",
      "Broadband/WiFi Bills",
      "DTH Recharge",
      "Postpaid Mobile Bills"
    ],
    charges: "₹5 - ₹15 per transaction",
    color: "bg-green-600"
  },
  {
    icon: Smartphone,
    title: "Mobile Recharge",
    titleHindi: "मोबाइल रिचार्ज",
    description: "Instant mobile recharge for all operators",
    services: [
      "Prepaid Recharge (All Networks)",
      "DTH Recharge",
      "Data Card Recharge",
      "Special Tariff Plans",
      "Roaming Plans",
      "International Recharge"
    ],
    charges: "₹2 - ₹5 per recharge", 
    color: "bg-blue-600"
  },
  {
    icon: Send,
    title: "Money Transfer",
    titleHindi: "पैसे भेजना",
    description: "Safe and fast money transfer services",
    services: [
      "Domestic Money Transfer",
      "IMPS Transfer",
      "NEFT Transfer", 
      "Bank to Bank Transfer",
      "Cash Pickup Service",
      "Account Credit"
    ],
    charges: "₹10 - ₹25 per transfer",
    color: "bg-purple-600"
  },
  {
    icon: CreditCard,
    title: "Balance Check & Mini Statement",
    titleHindi: "बैलेंस चेक और मिनी स्टेटमेंट",
    description: "Check account balance and get mini statements",
    services: [
      "Account Balance Inquiry",
      "Mini Statement Print",
      "Last 5 Transactions",
      "SMS Banking Setup",
      "PIN Change Service",
      "Account Information"
    ],
    charges: "₹5 - ₹10 per service",
    color: "bg-indigo-600"
  },
  {
    icon: Shield,
    title: "AEPS Services",
    titleHindi: "आधार इनेबल्ड पेमेंट सिस्टम",
    description: "Aadhaar-enabled payment system services",
    services: [
      "Cash Withdrawal",
      "Cash Deposit",
      "Balance Inquiry",
      "Fund Transfer",
      "Aadhaar Pay",
      "Micro ATM Services"
    ],
    charges: "₹5 - ₹20 per transaction",
    color: "bg-orange-600"
  },
  {
    icon: DollarSign,
    title: "Insurance & Investment",
    titleHindi: "बीमा और निवेश",
    description: "Insurance premium payments and investment services",
    services: [
      "Life Insurance Premium",
      "Health Insurance Premium",
      "Vehicle Insurance",
      "Term Insurance",
      "SIP/Mutual Funds",
      "Policy Information"
    ],
    charges: "₹10 - ₹50 per payment",
    color: "bg-red-600"
  }
];

export default function BankingServices() {
  return (
    <section id="banking-services" className="py-20 bg-white dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Banking & Bill Payment Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Complete banking solutions, bill payments, and money transfer services
            <br />
            <span className="text-brand-blue font-medium">
              पूर्ण बैंकिंग समाधान, बिल भुगतान और पैसे ट्रांसफर सेवाएं
            </span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {bankingServices.map((service, index) => (
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
                  Use Service / सेवा का उपयोग करें
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">
              Secure Banking Partner
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Shield className="mr-3" size={20} />
                <span>Bank-grade security for all transactions</span>
              </div>
              <div className="flex items-center">
                <Zap className="mr-3" size={20} />
                <span>Instant processing and confirmation</span>
              </div>
              <div className="flex items-center">
                <CreditCard className="mr-3" size={20} />
                <span>Support for all major banks</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">
              Special Offers
            </h3>
            <div className="space-y-3">
              <div className="bg-white bg-opacity-20 rounded p-3">
                <p className="font-semibold">Free Bill Payment</p>
                <p className="text-sm">On transactions above ₹500</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded p-3">
                <p className="font-semibold">Cashback Offers</p>
                <p className="text-sm">Up to ₹50 on money transfers</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded p-3">
                <p className="font-semibold">Loyalty Rewards</p>
                <p className="text-sm">Earn points on every transaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}