import { Wifi } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "About Us", href: "#about" },
  { name: "Gallery", href: "#gallery" },
  { name: "Pricing", href: "#pricing" },
  { name: "Contact", href: "#contact" }
];

const services = [
  "High-Speed Internet",
  "Printing & Scanning",
  "Computer Repair",
  "Gaming Zone",
  "Digital Documentation",
  "Online Services"
];

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Wifi className="text-2xl text-brand-cyan" />
              <div>
                <h3 className="text-xl font-bold">Mahech Internet Cafe</h3>
                <p className="text-sm text-gray-400">Online Solution Hub</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted partner for all digital solutions and internet services.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-brand-cyan transition-colors"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-brand-cyan transition-colors"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-brand-cyan transition-colors"
                aria-label="WhatsApp"
              >
                <i className="fab fa-whatsapp text-xl"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-white transition-colors text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-gray-400">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-2">
                <i className="fas fa-phone text-brand-cyan"></i>
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-envelope text-brand-cyan"></i>
                <span>info@mahechcafe.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <i className="fas fa-map-marker-alt text-brand-cyan mt-1"></i>
                <span>
                  Shop No. 123, Main Market<br />
                  Your City - 123456
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Mahech Internet Cafe. All rights reserved. | 
            <span className="text-brand-cyan"> महेच इंटरनेट कैफे</span> - आपका डिजिटल साथी
          </p>
        </div>
      </div>
    </footer>
  );
}
