import React from 'react';
import { MapPin, Clock, Users, Camera, Star, ArrowRight } from 'lucide-react';

const TourPackages = () => {
  const packages = [
    {
      id: 1,
      title: 'City Palace Heritage Tour',
      image: 'https://img.avianexperiences.com/trek/90e96e03-4abb-4ad5-984e-0b065eda1519',
      duration: '4 Hours',
      capacity: '4-7 People',
      price: '₹1,800',
      originalPrice: '₹2,200',
      rating: 4.9,
      highlights: ['City Palace Complex', 'Jagdish Temple', 'Bagore Ki Haveli', 'Local Markets'],
      description: 'Explore the magnificent City Palace complex and surrounding heritage sites with our knowledgeable local guide.',
      featured: true
    },
    {
      id: 2,
      title: 'Lake Pichola & Islands',
      image: 'https://s7ap1.scene7.com/is/image/incredibleindia/lake-pichola-udaipur-rajasthan-2-attr-hero?qlt=82&ts=1742161994371',
      duration: '6 Hours',
      capacity: '4-7 People',
      price: '₹2,500',
      originalPrice: '₹3,000',
      rating: 4.8,
      highlights: ['Lake Pichola Cruise', 'Jag Mandir Island', 'Boat Ride', 'Sunset Views'],
      description: 'Experience the romantic beauty of Lake Pichola with visits to iconic islands and a magical sunset boat ride.',
      featured: false
    },
    {
      id: 3,
      title: 'Airport Transfer Service',
      image: 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '1 Hour',
      capacity: '4-7 People',
      price: '₹800',
      originalPrice: '₹1,000',
      rating: 5.0,
      highlights: ['Door-to-door Service', 'Flight Tracking', 'Meet & Greet', '24/7 Availability'],
      description: 'Comfortable and reliable airport transfers with professional drivers and luxury vehicles.',
      featured: false
    },
    {
      id: 4,
      title: 'Monsoon Palace & Hills',
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1e/6e/3b/30/the-monsoon-palace-also.jpg?w=800&h=500&s=1',
      duration: '5 Hours',
      capacity: '4-7 People',
      price: '₹2,200',
      originalPrice: '₹2,600',
      rating: 4.7,
      highlights: ['Monsoon Palace', 'Ahar Cenotaphs', 'Hilltop Views', 'Photography Spots'],
      description: 'Journey to the hilltops for breathtaking panoramic views of Udaipur and visit the historic Monsoon Palace.',
      featured: false
    }
  ];

  return (
    <section id="tours" className="py-section bg-background">
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
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-secondary fill-current" />
                    <span className="text-sm font-poppins font-medium">{pkg.rating}</span>
                  </div>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-raleway font-bold mb-1 text-white">{pkg.title}</h3>
                  <div className="flex items-center space-x-4 text-sm font-poppins text-white">
                    <div className="flex items-center space-x-1 text-white">
                      <Clock className="w-4 h-4 text-white" />
                      <span className="text-white">{pkg.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-white">
                      <Users className="w-4 h-4 text-white" />
                      <span className="text-white">{pkg.capacity}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Package Details */}
              <div className="p-6">
                {/* Price Section */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-raleway font-bold text-primary">{pkg.price}</span>
                      <span className="text-lg text-text-light line-through font-poppins">{pkg.originalPrice}</span>
                    </div>
                    <p className="text-sm text-text-secondary font-poppins">per trip</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-poppins font-medium">
                      Save {Math.round(((parseInt(pkg.originalPrice.slice(1)) - parseInt(pkg.price.slice(1))) / parseInt(pkg.originalPrice.slice(1))) * 100)}%
                    </span>
                  </div>
                </div>

                <p className="text-text-secondary mb-6 leading-relaxed font-poppins">
                  {pkg.description}
                </p>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="font-raleway font-semibold text-primary mb-3 flex items-center">
                    <Camera className="w-4 h-4 mr-2 text-secondary" />
                    Tour Highlights
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {pkg.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 text-sm font-poppins"
                      >
                        <div className="w-2 h-2 bg-secondary rounded-full"></div>
                        <span className="text-text-secondary">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Book Button */}
                <button className="w-full btn-primary font-poppins font-semibold group flex items-center justify-center space-x-2">
                  <span>Book This Package</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
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