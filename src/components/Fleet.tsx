import React from 'react';
import { Users, Fuel, Settings, Star, Calendar, Shield, Award } from 'lucide-react';

const Fleet = () => {
  const cars = [
    {
      id: 1,
      name: 'Royal Sedan',
      model: 'Toyota Camry Hybrid',
      image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800',
      passengers: 4,
      fuel: 'Hybrid',
      transmission: 'Automatic',
      features: ['Premium AC', 'GPS Navigation', 'WiFi Hotspot', 'Premium Sound', 'Leather Seats', 'Phone Charger'],
      rating: 4.9,
      price: '₹2,500',
      originalPrice: '₹3,000',
      available: true,
      description: 'Experience luxury and comfort in our premium sedan, perfect for city tours and airport transfers.'
    },
    {
      id: 2,
      name: 'Heritage SUV',
      model: 'Toyota Fortuner 4WD',
      image: 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=800',
      passengers: 7,
      fuel: 'Diesel',
      transmission: 'Manual',
      features: ['Dual AC', 'GPS Navigation', '4WD System', 'Spacious Luggage', 'Captain Seats', 'Entertainment System'],
      rating: 4.8,
      price: '₹3,200',
      originalPrice: '₹3,800',
      available: true,
      description: 'Ideal for group travels and hill station visits with superior comfort and safety features.'
    }
  ];

  return (
    <section id="fleet" className="py-section bg-surface">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-poppins font-medium text-sm rounded-full mb-4">
            Premium Collection
          </span>
          <h2 className="text-4xl md:text-5xl font-raleway font-bold text-primary mb-6">
            Our Exclusive Fleet
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto font-poppins leading-relaxed">
            Choose from our carefully maintained vehicles, each equipped with modern amenities 
            and perfect for exploring Udaipur's royal heritage and scenic beauty.
          </p>
        </div>

        {/* Cars Grid */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {cars.map((car, index) => (
            <div
              key={car.id}
              className="group bg-surface rounded-3xl shadow-2xl overflow-hidden hover-lift border border-gray-100 relative"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Availability Badge */}
              <div className="absolute top-6 left-6 z-10">
                <span className={`px-4 py-2 rounded-full text-sm font-poppins font-medium shadow-lg ${
                  car.available 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {car.available ? '✓ Available Now' : '✗ Currently Booked'}
                </span>
              </div>

              {/* Rating Badge */}
              <div className="absolute top-6 right-6 z-10 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-secondary fill-current" />
                  <span className="text-sm font-poppins font-medium">{car.rating}</span>
                </div>
              </div>

              {/* Car Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>

              {/* Car Details */}
              <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-raleway font-bold text-primary mb-1">{car.name}</h3>
                    <p className="text-text-secondary font-poppins">{car.model}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-raleway font-bold text-secondary">{car.price}</span>
                      <span className="text-lg text-text-light line-through font-poppins">{car.originalPrice}</span>
                    </div>
                    <p className="text-sm text-text-secondary font-poppins">per day</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-text-secondary font-poppins leading-relaxed mb-6">
                  {car.description}
                </p>

                {/* Specifications */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="flex flex-col items-center p-3 bg-background rounded-lg">
                    <Users className="w-6 h-6 text-primary mb-2" />
                    <span className="text-sm font-poppins font-medium text-text-primary">{car.passengers} Seats</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-background rounded-lg">
                    <Fuel className="w-6 h-6 text-primary mb-2" />
                    <span className="text-sm font-poppins font-medium text-text-primary">{car.fuel}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-background rounded-lg">
                    <Settings className="w-6 h-6 text-primary mb-2" />
                    <span className="text-sm font-poppins font-medium text-text-primary">{car.transmission}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="font-raleway font-semibold text-primary mb-3 flex items-center">
                    <Award className="w-4 h-4 mr-2 text-secondary" />
                    Premium Features
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {car.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 text-sm font-poppins"
                      >
                        <div className="w-2 h-2 bg-secondary rounded-full"></div>
                        <span className="text-text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Book Button */}
                <button
                  className={`w-full py-4 rounded-lg font-poppins font-semibold transition-all duration-300 ${
                    car.available
                      ? 'btn-primary group'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!car.available}
                >
                  {car.available ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Calendar className="w-5 h-5" />
                      <span>Reserve Now</span>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                        Save {Math.round(((parseInt(car.originalPrice.slice(1)) - parseInt(car.price.slice(1))) / parseInt(car.originalPrice.slice(1))) * 100)}%
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Shield className="w-5 h-5" />
                      <span>Currently Unavailable</span>
                    </div>
                  )}
                </button>
              </div>

              {/* Rajasthani Pattern */}
              <div className="absolute bottom-0 left-0 w-32 h-32 rajasthani-pattern opacity-10"></div>
            </div>
          ))}
        </div>

        {/* Fleet Benefits */}
        <div className="mt-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Shield className="w-12 h-12 text-primary mb-4" />
              <h4 className="font-raleway font-bold text-primary mb-2">Fully Insured</h4>
              <p className="text-text-secondary font-poppins text-sm">Comprehensive insurance coverage for your peace of mind</p>
            </div>
            <div className="flex flex-col items-center">
              <Award className="w-12 h-12 text-secondary mb-4" />
              <h4 className="font-raleway font-bold text-primary mb-2">Premium Maintained</h4>
              <p className="text-text-secondary font-poppins text-sm">Regular servicing and quality checks for optimal performance</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-12 h-12 text-accent mb-4" />
              <h4 className="font-raleway font-bold text-primary mb-2">Expert Drivers</h4>
              <p className="text-text-secondary font-poppins text-sm">Licensed, experienced drivers with local knowledge</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fleet;