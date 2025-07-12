import { Wifi } from "lucide-react";
import { Link } from "wouter";
import { useContactInfo } from "@/hooks/use-contact-info";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Government ID", href: "/government-services" },
  { name: "Banking & Bills", href: "/banking-services" },
  { name: "Printing", href: "/printing-services" },
  { name: "Online Forms", href: "/online-forms" },
  { name: "Travel Booking", href: "/travel-services" },
  { name: "Contact", href: "/contact" }
];

const services = [
  "Government ID Services",
  "Banking & Bill Payments", 
  "Printing & Stationery",
  "Online Forms & Exams",
  "Travel & Booking",
  "Expert Digital Support"
];

export default function Footer() {
  const contactInfo = useContactInfo();

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
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
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
                <span>{contactInfo.phone || '+91 98765 43210'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-envelope text-brand-cyan"></i>
                <span>{contactInfo.email || 'info@mahechcafe.com'}</span>
              </div>
              <div className="flex items-start space-x-2">
                <i className="fas fa-map-marker-alt text-brand-cyan mt-1"></i>
                <span>
                  {contactInfo.address ? contactInfo.address.split('\n').map((line, i) => (
                    <span key={i}>{line}<br /></span>
                  )) : 'Shop No. 123, Main Market\nYour City - 123456'.split('\n').map((line, i) => (
                    <span key={i}>{line}<br /></span>
                  ))}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="text-center mb-4">
            <div className="flex justify-center space-x-6 mb-4">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-brand-cyan transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms-conditions" className="text-gray-400 hover:text-brand-cyan transition-colors text-sm">
                Terms & Conditions
              </Link>
              <a 
                href="mailto:info@mahechcafe.com" 
                className="text-gray-400 hover:text-brand-cyan transition-colors text-sm"
              >
                Support
              </a>
            </div>
          </div>
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 Mahech Internet Cafe. All rights reserved. | 
              <span className="text-brand-cyan"> महेच इंटरनेट कैफे</span> - आपका डिजिटल साथी
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
