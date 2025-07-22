import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Crown, Star, Shield } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Our Fleet', href: '#fleet' },
    { label: 'Tour Packages', href: '#tours' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ];

  const services = [
    'Airport Transfers',
    'City Palace Tours',
    'Lake Pichola Cruises',
    'Heritage Site Visits',
    'Custom Packages',
    'Wedding Transportation'
  ];

  const policies = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cancellation Policy', href: '#' },
    { label: 'Booking Terms', href: '#' }
  ];

  return (
    <footer className="bg-primary text-white relative overflow-hidden">
      {/* Background Pattern */}
      
      <div className="container mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="/public/IMG_5624.PNG" 
                  alt="Heritage Rides Logo" 
                  className="h-12 w-auto object-contain"
                />
                <div>
                  <h3 className="text-2xl font-raleway font-bold">Heritage Rides</h3>
                  <p className="text-sm text-secondary font-poppins">City of Lakes</p>
                </div>
              </div>
              <p className="text-blue-200 leading-relaxed mb-6 font-poppins">
                Your trusted partner for premium car rentals and curated tours in Udaipur. 
                Experience the royal heritage with personalized service and local expertise.
              </p>
              
              {/* Trust Badges */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1 bg-white/10 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-poppins">4.9 Rating</span>
                </div>
                <div className="flex items-center space-x-1 bg-white/10 px-3 py-1 rounded-full">
                  <Shield className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-poppins">Verified</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-blue-300 hover:text-secondary hover:bg-white/20 transition-all duration-300">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-blue-300 hover:text-secondary hover:bg-white/20 transition-all duration-300">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-blue-300 hover:text-secondary hover:bg-white/20 transition-all duration-300">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-raleway font-bold mb-6 text-secondary">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-blue-200 hover:text-secondary transition-colors font-poppins hover:translate-x-1 transform duration-300 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-raleway font-bold mb-6 text-secondary">Our Services</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Crown className="w-3 h-3 text-secondary" />
                    <span className="text-blue-200 font-poppins text-sm">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-raleway font-bold mb-6 text-secondary">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-secondary mt-1 shrink-0" />
                  <div>
                    <p className="text-blue-200 font-poppins font-medium">+91 96601 03534</p>
                    <p className="text-sm text-blue-300 font-poppins">24/7 Available</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-secondary mt-1 shrink-0" />
                  <div>
                    <p className="text-blue-200 font-poppins font-medium">heritagerides@gmail.com</p>
                    <p className="text-sm text-blue-300 font-poppins">Quick Response</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-secondary mt-1 shrink-0" />
                  <div>
                    <p className="text-blue-200 font-poppins">Lake Palace Road</p>
                    <p className="text-blue-200 font-poppins">Udaipur, Rajasthan 313001</p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                <h5 className="font-raleway font-semibold text-secondary mb-2">Emergency Support</h5>
                <p className="text-blue-200 font-poppins text-sm">Available 24/7 for any assistance during your journey</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-blue-800 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-wrap items-center space-x-6 text-sm text-blue-300 font-poppins">
              <span>© {currentYear} Heritage Rides. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">Proudly serving Udaipur since 2019</span>
            </div>
            <div className="flex flex-wrap items-center space-x-6 text-sm">
              {policies.map((policy, index) => (
                <a 
                  key={index}
                  href={policy.href} 
                  className="text-blue-300 hover:text-secondary transition-colors font-poppins"
                >
                  {policy.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Heritage Quote */}
        <div className="border-t border-blue-800 py-6">
          <div className="text-center">
            <p className="text-blue-200 font-poppins italic">
              "Discover the royal heritage of Udaipur with Heritage Rides - Where every journey becomes a royal experience"
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;