import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Fleet', href: '#fleet' },
    { label: 'Tour Packages', href: '#tours' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <header 
      className={`fixed py-2 top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-5">
        <div className="flex items-center justify-between w-full h-20 py-0 px-0">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/public/heritage.png" 
              alt="Heritage Rides Logo" 
              className="h-20 w-20 object-contain rounded-full"
            />
            <div className="transition-colors duration-300">
              <h1 className={`text-xl font-raleway font-bold transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white'}`}>Heritage Rides</h1>
              <p className="text-xs text-secondary font-poppins">City of Lakes</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`font-poppins font-medium transition-colors duration-300 hover:text-secondary ${
                  isScrolled ? 'text-text-primary' : 'text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:+919660103534"
              className={`flex items-center space-x-2 transition-colors duration-300 ${
                isScrolled ? 'text-primary hover:text-secondary' : 'text-white hover:text-secondary'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-poppins font-medium">+91 96601 03534</span>
            </a>
            <a
              href="https://wa.me/919660103534"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center space-x-2 text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Book Now</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 rounded-md transition-colors duration-300 ${
              isScrolled ? 'text-primary hover:text-secondary' : 'text-white hover:text-secondary'
            }`}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200">
            <nav className="flex flex-col py-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-text-primary hover:text-secondary transition-colors px-4 py-3 font-poppins"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="px-4 pt-4 border-t border-gray-200 mt-2">
                <a
                  href="tel:+919660103534"
                  className="flex items-center space-x-2 text-primary mb-3"
                >
                  <Phone className="w-4 h-4" />
                  <span className="font-poppins">+91 96601 03534</span>
                </a>
                <a
                  href="https://wa.me/919660103534"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center justify-center space-x-2 w-full"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Book Now</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;