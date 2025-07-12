import { useState } from "react";
import { Wifi, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Wifi className="text-2xl text-brand-blue" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Mahech Internet Cafe</h1>
              <p className="text-xs text-gray-600">Online Solution Hub</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-6">
            <button 
              onClick={() => scrollToSection("home")} 
              className="text-gray-700 hover:text-brand-blue transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("services")} 
              className="text-gray-700 hover:text-brand-blue transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection("about")} 
              className="text-gray-700 hover:text-brand-blue transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection("government-services")} 
              className="text-gray-700 hover:text-brand-blue transition-colors"
            >
              Government ID
            </button>
            <button 
              onClick={() => scrollToSection("banking-services")} 
              className="text-gray-700 hover:text-brand-blue transition-colors"
            >
              Banking
            </button>
            <button 
              onClick={() => scrollToSection("printing-services")} 
              className="text-gray-700 hover:text-brand-blue transition-colors"
            >
              Printing
            </button>
            <button 
              onClick={() => scrollToSection("travel-services")} 
              className="text-gray-700 hover:text-brand-blue transition-colors"
            >
              Travel
            </button>
            <button 
              onClick={() => scrollToSection("contact")} 
              className="text-gray-700 hover:text-brand-blue transition-colors"
            >
              Contact
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-brand-blue"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button 
                onClick={() => scrollToSection("home")} 
                className="block px-3 py-2 text-gray-700 hover:text-brand-blue transition-colors w-full text-left"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection("services")} 
                className="block px-3 py-2 text-gray-700 hover:text-brand-blue transition-colors w-full text-left"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection("about")} 
                className="block px-3 py-2 text-gray-700 hover:text-brand-blue transition-colors w-full text-left"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection("government-services")} 
                className="block px-3 py-2 text-gray-700 hover:text-brand-blue transition-colors w-full text-left"
              >
                Government ID
              </button>
              <button 
                onClick={() => scrollToSection("banking-services")} 
                className="block px-3 py-2 text-gray-700 hover:text-brand-blue transition-colors w-full text-left"
              >
                Banking & Bills
              </button>
              <button 
                onClick={() => scrollToSection("printing-services")} 
                className="block px-3 py-2 text-gray-700 hover:text-brand-blue transition-colors w-full text-left"
              >
                Printing
              </button>
              <button 
                onClick={() => scrollToSection("online-forms-services")} 
                className="block px-3 py-2 text-gray-700 hover:text-brand-blue transition-colors w-full text-left"
              >
                Online Forms
              </button>
              <button 
                onClick={() => scrollToSection("travel-services")} 
                className="block px-3 py-2 text-gray-700 hover:text-brand-blue transition-colors w-full text-left"
              >
                Travel
              </button>
              <button 
                onClick={() => scrollToSection("contact")} 
                className="block px-3 py-2 text-gray-700 hover:text-brand-blue transition-colors w-full text-left"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
