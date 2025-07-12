import { useState } from "react";
import { Wifi, Menu, X, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const closeMobileMenu = () => {
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
            <Link href="/" className={`text-gray-700 hover:text-brand-blue transition-colors ${location === '/' ? 'text-brand-blue font-semibold' : ''}`}>
              Home
            </Link>
            <Link href="/about" className={`text-gray-700 hover:text-brand-blue transition-colors ${location === '/about' ? 'text-brand-blue font-semibold' : ''}`}>
              About
            </Link>
            <Link href="/government-services" className={`text-gray-700 hover:text-brand-blue transition-colors ${location === '/government-services' ? 'text-brand-blue font-semibold' : ''}`}>
              Government ID
            </Link>
            <Link href="/banking-services" className={`text-gray-700 hover:text-brand-blue transition-colors ${location === '/banking-services' ? 'text-brand-blue font-semibold' : ''}`}>
              Banking
            </Link>
            <Link href="/printing-services" className={`text-gray-700 hover:text-brand-blue transition-colors ${location === '/printing-services' ? 'text-brand-blue font-semibold' : ''}`}>
              Printing
            </Link>
            <Link href="/online-forms" className={`text-gray-700 hover:text-brand-blue transition-colors ${location === '/online-forms' ? 'text-brand-blue font-semibold' : ''}`}>
              Online Forms
            </Link>
            <Link href="/travel-services" className={`text-gray-700 hover:text-brand-blue transition-colors ${location === '/travel-services' ? 'text-brand-blue font-semibold' : ''}`}>
              Travel
            </Link>
            <Link href="/sarkari-updates" className={`text-gray-700 hover:text-brand-blue transition-colors ${location === '/sarkari-updates' ? 'text-brand-blue font-semibold' : ''}`}>
              Sarkari Updates
            </Link>
            <Link href="/contact" className={`text-gray-700 hover:text-brand-blue transition-colors ${location === '/contact' ? 'text-brand-blue font-semibold' : ''}`}>
              Contact
            </Link>
          </div>
          
          {/* Admin Access Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/admin/login">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
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
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link href="/" onClick={closeMobileMenu} className={`block px-3 py-2 text-gray-700 hover:text-brand-blue transition-colors ${location === '/' ? 'text-brand-blue font-semibold' : ''}`}>
                Home
              </Link>
              <Link href="/about" onClick={closeMobileMenu} className={`block px-3 py-2 text-gray-700 hover:text-brand-blue transition-colors ${location === '/about' ? 'text-brand-blue font-semibold' : ''}`}>
                About
              </Link>
              <Link href="/government-services" onClick={closeMobileMenu} className={`block px-3 py-2 text-gray-700 hover:text-brand-blue transition-colors ${location === '/government-services' ? 'text-brand-blue font-semibold' : ''}`}>
                Government ID
              </Link>
              <Link href="/banking-services" onClick={closeMobileMenu} className={`block px-3 py-2 text-gray-700 hover:text-brand-blue transition-colors ${location === '/banking-services' ? 'text-brand-blue font-semibold' : ''}`}>
                Banking & Bills
              </Link>
              <Link href="/printing-services" onClick={closeMobileMenu} className={`block px-3 py-2 text-gray-700 hover:text-brand-blue transition-colors ${location === '/printing-services' ? 'text-brand-blue font-semibold' : ''}`}>
                Printing
              </Link>
              <Link href="/online-forms" onClick={closeMobileMenu} className={`block px-3 py-2 text-gray-700 hover:text-brand-blue transition-colors ${location === '/online-forms' ? 'text-brand-blue font-semibold' : ''}`}>
                Online Forms
              </Link>
              <Link href="/travel-services" onClick={closeMobileMenu} className={`block px-3 py-2 text-gray-700 hover:text-brand-blue transition-colors ${location === '/travel-services' ? 'text-brand-blue font-semibold' : ''}`}>
                Travel
              </Link>
              <Link href="/sarkari-updates" onClick={closeMobileMenu} className={`block px-3 py-2 text-gray-700 hover:text-brand-blue transition-colors ${location === '/sarkari-updates' ? 'text-brand-blue font-semibold' : ''}`}>
                Sarkari Updates
              </Link>
              <Link href="/contact" onClick={closeMobileMenu} className={`block px-3 py-2 text-gray-700 hover:text-brand-blue transition-colors ${location === '/contact' ? 'text-brand-blue font-semibold' : ''}`}>
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
