import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Clock, Send, Globe, Award } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Message sent successfully! We will get back to you within 2 hours.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone',
      primary: '+91 96601 03534',
      secondary: 'Available 24/7 for bookings',
      action: 'tel:+919660103534',
      actionText: 'Call Now',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      primary: '+91 96601 03534',
      secondary: 'Instant booking & support',
      action: 'https://wa.me/919660103534',
      actionText: 'Start Chat',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Mail,
      title: 'Email',
      primary: 'heritagerides@gmail.com',
      secondary: 'Response within 2 hours',
      action: 'mailto:heritagerides@gmail.com',
      actionText: 'Send Email',
      color: 'bg-amber-100 text-amber-600'
    }
  ];

  return (
    <section id="contact" className="py-section bg-background">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <span className="inline-block px-4 py-2 bg-accent/10 text-accent font-poppins font-medium text-sm rounded-full mb-4">
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-raleway font-bold text-primary mb-6">
            Start Your Royal Journey
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto font-poppins leading-relaxed">
            Ready to explore Udaipur? Contact us for instant bookings, personalized tour recommendations, 
            or any questions about our premium services.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Contact Methods */}
          <div className="lg:col-span-1 px-4 lg:px-0">
            <h3 className="text-xl sm:text-2xl font-raleway font-bold text-primary mb-6 sm:mb-8">Contact Information</h3>
            
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className="group bg-surface p-3 sm:p-4 rounded-xl shadow-md hover-lift border border-gray-100"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`flex items-center justify-center w-10 h-10 ${method.color} rounded-full shrink-0`}>
                      <method.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-raleway font-semibold text-primary mb-1 text-sm sm:text-base">{method.title}</h4>
                      <p className="text-text-primary font-poppins font-medium text-sm sm:text-base">{method.primary}</p>
                      <p className="text-xs text-text-secondary font-poppins mb-2">{method.secondary}</p>
                      <a
                        href={method.action}
                        target={method.action.startsWith('http') ? '_blank' : undefined}
                        rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center text-secondary hover:text-accent font-poppins font-medium text-xs transition-colors"
                      >
                        {method.actionText} →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Info */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-3 sm:p-4 rounded-xl">
              <p className="text-xs sm:text-sm font-poppins text-text-secondary text-center">
                <strong className="text-primary">24/7 Service</strong> • Govt. Licensed • Fully Insured
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 px-4 lg:px-0">
            <div className="bg-surface rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rajasthani-pattern opacity-5"></div>
              
              <h3 className="text-xl sm:text-2xl font-raleway font-bold text-primary mb-6 sm:mb-8 relative z-10">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-poppins font-medium text-primary mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-3 sm:p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-300 font-poppins text-sm sm:text-base"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-poppins font-medium text-primary mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 sm:p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-300 font-poppins text-sm sm:text-base"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-poppins font-medium text-primary mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 sm:p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-300 font-poppins text-sm sm:text-base"
                    placeholder="+91 96601 03534"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-poppins font-medium text-primary mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full p-3 sm:p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-300 font-poppins resize-none text-sm sm:text-base"
                    placeholder="Tell us about your travel plans, preferred dates, destinations, or any special requests..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary py-3 sm:py-4 font-poppins font-semibold text-base sm:text-lg group"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    <span>Send Message</span>
                  </div>
                </button>
              </form>

              {/* Quick Contact */}
              <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl">
                <h4 className="font-raleway font-bold text-primary mb-3 sm:mb-4 text-sm sm:text-base">Need Immediate Assistance?</h4>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:+919660103534"
                    className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-300 font-poppins font-medium text-sm sm:text-base"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Now</span>
                  </a>
                  <a
                    href="https://wa.me/919660103534"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 font-poppins font-medium text-sm sm:text-base"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-6 sm:mt-8 bg-surface rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-primary to-secondary p-4">
                <h4 className="font-raleway font-bold text-white flex items-center text-sm sm:text-base">
                  <MapPin className="w-5 h-5 mr-2" />
                  Our Location in Udaipur
                </h4>
              </div>
              <div className="bg-gray-100 h-48 sm:h-64 flex items-center justify-center p-4">
                <div className="text-center text-text-secondary">
                  <MapPin className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-3 sm:mb-4 text-secondary" />
                  <p className="font-raleway font-bold text-primary text-base sm:text-lg">Heritage Rides Office</p>
                  <p className="font-poppins text-sm sm:text-base">Lake Palace Road, Udaipur</p>
                  <p className="font-poppins text-xs sm:text-sm">Rajasthan 313001, India</p>
                  <button className="mt-3 sm:mt-4 text-secondary hover:text-accent font-poppins font-medium text-xs sm:text-sm">
                    View on Google Maps →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;