import { useState } from "react";
import { Menu, X, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import Logo from "@/components/logo";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-3 hover:scale-105 transition-transform duration-200">
            <Logo size="md" showText={true} />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link href="/" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location === '/' ? 'bg-brand-blue text-white shadow-md' : 'text-gray-700 hover:text-brand-blue hover:bg-blue-50'}`}>
              Home
            </Link>
            <Link href="/about" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location === '/about' ? 'bg-brand-blue text-white shadow-md' : 'text-gray-700 hover:text-brand-blue hover:bg-blue-50'}`}>
              About
            </Link>
            <Link href="/government-services" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location === '/government-services' ? 'bg-brand-blue text-white shadow-md' : 'text-gray-700 hover:text-brand-blue hover:bg-blue-50'}`}>
              Government ID
            </Link>
            <Link href="/banking-services" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location === '/banking-services' ? 'bg-brand-blue text-white shadow-md' : 'text-gray-700 hover:text-brand-blue hover:bg-blue-50'}`}>
              Banking
            </Link>
            <Link href="/printing-services" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location === '/printing-services' ? 'bg-brand-blue text-white shadow-md' : 'text-gray-700 hover:text-brand-blue hover:bg-blue-50'}`}>
              Printing
            </Link>
            <Link href="/online-forms" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location === '/online-forms' ? 'bg-brand-blue text-white shadow-md' : 'text-gray-700 hover:text-brand-blue hover:bg-blue-50'}`}>
              Online Forms
            </Link>
            <Link href="/travel-services" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location === '/travel-services' ? 'bg-brand-blue text-white shadow-md' : 'text-gray-700 hover:text-brand-blue hover:bg-blue-50'}`}>
              Travel
            </Link>
            <Link href="/sarkari-updates" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location === '/sarkari-updates' ? 'bg-brand-blue text-white shadow-md' : 'text-gray-700 hover:text-brand-blue hover:bg-blue-50'}`}>
              Sarkari Updates
            </Link>
            <Link href="/contact" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location === '/contact' ? 'bg-brand-blue text-white shadow-md' : 'text-gray-700 hover:text-brand-blue hover:bg-blue-50'}`}>
              Contact
            </Link>
          </div>
          
          {/* Admin Access Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/admin/login">
              <Button variant="outline" size="sm" className="flex items-center space-x-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white transition-all duration-200">
                <Settings className="h-4 w-4" />
                <span>Admin</span>
              </Button>
            </Link>
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
            <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3 bg-white/95 backdrop-blur-md border-t border-gray-200">
              <Link href="/" onClick={closeMobileMenu} className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${location === '/' ? 'bg-brand-blue text-white' : 'text-gray-700 hover:text-brand-blue hover:bg-blue-50'}`}>
                Home
              </Link>
              <Link href="/about" onClick={closeMobileMenu} className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${location === '/about' ? 'bg-brand-blue text-white' : 'text-gray-700 hover:text-brand-blue hover:bg-blue-50'}`}>
                About
              </Link>
              <Link href="/government-services" onClick={closeMobileMenu} className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${location === '/government-services' ? 'bg-brand-blue text-white' : 'text-gray-700 hover:text-brand-blue hover:bg-blue-50'}`}>
                Government ID
              </Link>
              <Link href="/banking-services" onClick={closeMobileMenu} className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${location === '/banking-services' ? 'bg-brand-blue text-white' : 'text-gray-700 hover:text-brand-blue hover:bg-blue-50'}`}>
                Banking
              </Link>
              <Link href="/printing-services" onClick={closeMobileMenu} className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${location === '/printing-services' ? 'bg-brand-blue text-white' : 'text-gray-700 hover:text-brand-blue hover:bg-blue-50'}`}>
                Printing
              </Link>
              <Link href="/online-forms" onClick={closeMobileMenu} className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${location === '/online-forms' ? 'bg-brand-blue text-white' : 'text-gray-700 hover:text-brand-blue hover:bg-blue-50'}`}>
                Online Forms
              </Link>
              <Link href="/travel-services" onClick={closeMobileMenu} className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${location === '/travel-services' ? 'bg-brand-blue text-white' : 'text-gray-700 hover:text-brand-blue hover:bg-blue-50'}`}>
                Travel
              </Link>
              <Link href="/sarkari-updates" onClick={closeMobileMenu} className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${location === '/sarkari-updates' ? 'bg-brand-blue text-white' : 'text-gray-700 hover:text-brand-blue hover:bg-blue-50'}`}>
                Sarkari Updates
              </Link>
              <Link href="/contact" onClick={closeMobileMenu} className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${location === '/contact' ? 'bg-brand-blue text-white' : 'text-gray-700 hover:text-brand-blue hover:bg-blue-50'}`}>
                Contact
              </Link>
              <div className="pt-2 border-t border-gray-200 mt-2">
                <Link href="/admin/login" onClick={closeMobileMenu} className="block px-4 py-3 rounded-lg text-base font-medium text-brand-blue hover:bg-blue-50 transition-all duration-200">
                  <div className="flex items-center space-x-2">
                    <Settings className="h-4 w-4" />
                    <span>Admin Access</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
