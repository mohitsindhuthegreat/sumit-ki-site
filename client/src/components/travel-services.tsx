import { Train, Bus, Plane, Hotel, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const travelServices = [
  {
    icon: Train,
    title: "Train Ticket Booking",
    titleHindi: "ट्रेन टिकट बुकिंग",
    description: "Book train tickets for all destinations across India",
    services: [
      "General Ticket Booking",
      "Tatkal Booking",
      "Premium Tatkal",
      "Railway Reservation",
      "Waitlist Booking",
      "PNR Status Check"
    ],
    features: [
      "All classes available (SL/3A/2A/1A)",
      "Online payment & cash accepted",
      "Instant confirmation",
      "Ticket cancellation service",
      "Seat availability check",
      "Train schedule information"
    ],
    charges: "₹15 - ₹50 per ticket",
    color: "bg-blue-600"
  },
  {
    icon: Bus,
    title: "Bus Ticket Booking",
    titleHindi: "बस टिकट बुकिंग",
    description: "Book bus tickets for state and private transport",
    services: [
      "State Transport Buses",
      "Private Bus Booking",
      "Volvo & AC Buses",
      "Sleeper Bus Booking",
      "Local Bus Passes",
      "Route Information"
    ],
    features: [
      "Government & private operators",
      "Seat selection available",
      "Live tracking support",
      "Cancellation & refund",
      "Multiple pickup points",
      "Best fare guarantee"
    ],
    charges: "₹10 - ₹30 per ticket",
    color: "bg-green-600"
  },
  {
    icon: Plane,
    title: "Flight Ticket Booking",
    titleHindi: "हवाई टिकट बुकिंग",
    description: "Domestic and international flight bookings",
    services: [
      "Domestic Flight Booking",
      "International Flights",
      "Flight Status Check",
      "Seat Selection",
      "Meal Preferences",
      "Group Bookings"
    ],
    features: [
      "All major airlines",
      "Best price comparison",
      "Flexible booking options",
      "Travel insurance available",
      "24/7 booking support",
      "Web check-in assistance"
    ],
    charges: "₹100 - ₹500 per ticket",
    color: "bg-purple-600"
  },
  {
    icon: Hotel,
    title: "Hotel Booking",
    titleHindi: "होटल बुकिंग",
    description: "Book hotels and accommodations for your travel",
    services: [
      "Budget Hotels",
      "Luxury Hotels",
      "Guest Houses",
      "Resort Booking",
      "Homestays",
      "Business Hotels"
    ],
    features: [
      "Wide range of options",
      "Photo gallery & reviews",
      "Flexible cancellation",
      "Best rate guarantee",
      "Location-based search",
      "Amenities comparison"
    ],
    charges: "₹50 - ₹200 per booking",
    color: "bg-orange-600"
  }
];

const travelPackages = [
  {
    destination: "Goa Package",
    duration: "3 Days / 2 Nights",
    includes: "Flight + Hotel + Breakfast",
    price: "₹12,000 per person",
    highlights: ["Beach resorts", "Sightseeing", "Local transfers"]
  },
  {
    destination: "Rajasthan Package",
    duration: "5 Days / 4 Nights", 
    includes: "Train + Hotel + Meals",
    price: "₹15,000 per person",
    highlights: ["Palace tours", "Desert safari", "Cultural shows"]
  },
  {
    destination: "Kerala Package",
    duration: "4 Days / 3 Nights",
    includes: "Flight + Houseboat + Meals",
    price: "₹18,000 per person",
    highlights: ["Backwaters", "Hill stations", "Ayurveda spa"]
  }
];

export default function TravelServices() {
  return (
    <section id="travel-services" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Travel & Booking Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Complete travel booking solutions for trains, buses, flights, and hotels
            <br />
            <span className="text-brand-blue font-medium">
              ट्रेन, बस, फ्लाइट और होटल के लिए पूर्ण यात्रा बुकिंग समाधान
            </span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {travelServices.map((service, index) => (
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
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Services:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {service.services.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Features:</h4>
                  <div className="space-y-2">
                    {service.features.slice(0, 3).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <span className="text-blue-500 mr-2">★</span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Badge variant="secondary" className="bg-green-100 text-green-800 mb-6">
                  Service Charges: {service.charges}
                </Badge>

                <Button 
                  className={`w-full ${service.color} hover:opacity-90 text-white`}
                  onClick={() => {
                    const serviceRequest = {
                      service_category: "travel",
                      service_type: service.title,
                      details: `Interested in ${service.title} - ${service.titleHindi}. Services needed: ${service.services.slice(0, 3).join(', ')}. Charges: ${service.charges}`
                    };
                    localStorage.setItem('service_request', JSON.stringify(serviceRequest));
                    window.location.href = '/contact';
                  }}
                >
                  Book Now / अभी बुक करें
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-12">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Popular Travel Packages
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {travelPackages.map((pkg, index) => (
              <Card key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-600">
                <CardContent className="p-8">
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {pkg.destination}
                  </h4>
                  <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
                    <Clock className="mr-2" size={16} />
                    <span>{pkg.duration}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {pkg.includes}
                  </p>
                  <div className="mb-4">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Highlights:</h5>
                    {pkg.highlights.map((highlight, hIndex) => (
                      <div key={hIndex} className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{highlight}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-brand-blue mb-4">
                      {pkg.price}
                    </div>
                    <Button 
                      className="bg-brand-blue hover:bg-brand-navy text-white"
                      onClick={() => {
                        const serviceRequest = {
                          service_category: "travel",
                          service_type: `Travel Package - ${pkg.destination}`,
                          details: `Interested in ${pkg.destination} travel package. Duration: ${pkg.duration}. Price: ${pkg.price}. Includes: ${pkg.includes}. Highlights: ${pkg.highlights.join(', ')}`
                        };
                        localStorage.setItem('service_request', JSON.stringify(serviceRequest));
                        window.location.href = '/contact';
                      }}
                    >
                      Book Package
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">
              Travel Assistance
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="mr-3" size={20} />
                <span>Complete travel planning support</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-3" size={20} />
                <span>24/7 booking and support service</span>
              </div>
              <div className="flex items-center">
                <Train className="mr-3" size={20} />
                <span>All transport modes available</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">
              Special Offers
            </h3>
            <div className="space-y-3">
              <div className="bg-white bg-opacity-20 rounded p-3">
                <p className="font-semibold">Group Bookings</p>
                <p className="text-sm">10+ people get 15% discount</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded p-3">
                <p className="font-semibold">Early Bird Offers</p>
                <p className="text-sm">Book 30 days advance, save 20%</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded p-3">
                <p className="font-semibold">Student Discounts</p>
                <p className="text-sm">Valid ID holders get special rates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}