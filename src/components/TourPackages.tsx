import React from 'react';
import { MapPin, Clock, Users, Camera, Star, ArrowRight } from 'lucide-react';
import SEOTags from './SEOTags';

const TourPackages = () => {
  const packages = [
    {
      id: 1,
      title: 'Udaipur City Tour',
      image: 'https://img.avianexperiences.com/trek/90e96e03-4abb-4ad5-984e-0b065eda1519',
      duration: '1 Day',
      includes: ['City Palace', 'Lake Pichola Boat Ride', 'Jagdish Temple', 'Saheliyon Ki Bari'],
      priceSedan: '₹3,500',
      priceInnova: '₹5,000',
      description: 'Explore the magnificent City Palace complex and surrounding heritage sites with our knowledgeable local guide.',
      featured: true
    },
    {
      id: 2,
      title: 'Udaipur – Mount Abu',
      image: 'https://s7ap1.scene7.com/is/image/incredibleindia/lake-pichola-udaipur-rajasthan-2-attr-hero?qlt=82&ts=1742161994371',
      duration: '2 Days / 1 Night',
      includes: ['Guru Shikhar', 'Nakki Lake', 'Dilwara Temples'],
      bestFor: 'groups',
      priceSedan: '₹7,000',
      priceInnova: '₹9,500',
      description: 'Experience the romantic beauty of Lake Pichola with visits to iconic islands and a magical sunset boat ride.',
      featured: false
    }
  ];

  return (
    <section id="tours" className="py-section bg-background">
      <SEOTags
        title="Udaipur Tour Packages 🏰 City Sightseeing & Day Trips | Heritage Rides"
        description="Discover expertly curated car tour packages for Udaipur city sightseeing, heritage tours, and day trips with Heritage Rides."
        keywords="Udaipur tour packages, city tour Udaipur, sightseeing tours Udaipur, heritage tour Udaipur, day trips from Udaipur, private tours Udaipur"
      />
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary font-poppins font-medium text-sm rounded-full mb-4">
            Curated Experiences
          </span>
          <h2 className="text-4xl md:text-5xl font-raleway font-bold text-primary mb-6">
            Tour Packages
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto font-poppins leading-relaxed">
            Discover Udaipur's royal heritage and natural beauty with our expertly designed tour packages, 
            each crafted to showcase the city's most magnificent attractions.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`group bg-surface rounded-2xl shadow-xl overflow-hidden hover-lift border border-gray-100 relative ${
                pkg.featured ? 'ring-2 ring-secondary' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Featured Badge */}
              {pkg.featured && (
                <div className="absolute top-4 left-4 z-10 bg-secondary text-white px-3 py-1 rounded-full text-xs font-poppins font-semibold">
                  Most Popular
                </div>
              )}

              {/* Package Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Title Overlay */}
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-raleway font-bold mb-1 text-white">{pkg.title}</h3>
                  <div className="flex items-center space-x-4 text-sm font-poppins text-white">
                    <div className="flex items-center space-x-1 text-white">
                      <Clock className="w-4 h-4 text-white" />
                      <span className="text-white">Duration: {pkg.duration}</span>
                    </div>
                    {pkg.bestFor && (
                      <div className="flex items-center space-x-1 text-white">
                        <Users className="w-4 h-4 text-white" />
                        <span className="text-white">Best for {pkg.bestFor}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Package Details */}
              <div className="p-6">
                {/* Price Section */}
                <div className="mb-4">
                  <h4 className="font-raleway font-semibold text-primary mb-2">Pricing:</h4>
                  <div className="flex flex-col space-y-1">
                    <p className="text-text-primary font-poppins text-lg"><span className="font-bold">Sedan:</span> {pkg.priceSedan}</p>
                    <p className="text-text-primary font-poppins text-lg"><span className="font-bold">Innova:</span> {pkg.priceInnova}</p>
                  </div>
                </div>

                <p className="text-text-secondary mb-6 leading-relaxed font-poppins">
                  {pkg.description}
                </p>

                {/* Includes */}
                <div className="mb-6">
                  <h4 className="font-raleway font-semibold text-primary mb-3 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-secondary" />
                    Includes
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {pkg.includes.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 text-sm font-poppins"
                      >
                        <div className="w-2 h-2 bg-secondary rounded-full"></div>
                        <span className="text-text-secondary">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Book Button */}
                <a
                  href={`https://wa.me/919660103534?text=Hello! I'm interested in booking the ${pkg.title} tour package. Could you please provide more details?`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-primary font-poppins font-semibold group flex items-center justify-center space-x-2"
                >
                  <span>Book This Package</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>

              {/* Rajasthani Pattern Overlay */}
              <div className="absolute top-0 right-0 w-20 h-20 rajasthani-pattern opacity-20"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 bg-surface px-8 py-4 rounded-full shadow-lg border border-gray-100">
            <span className="text-text-secondary font-poppins">Need a custom package?</span>
            <a href="#contact" className="text-secondary font-poppins font-semibold hover:text-accent transition-colors">
              Contact Us →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourPackages;