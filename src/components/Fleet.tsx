import React from 'react';
import { Users, Fuel, Settings, Star, Calendar, Shield, Award } from 'lucide-react';
import SEOTags from './SEOTags';

const Fleet = () => {
  const cars = [
    {
      id: 1,
      name: 'Sedan',
      model: 'Dzire/Etios',
      image: '/sedan.png',  // Assuming you have a sedan image
      passengers: 4,
      fuel: 'Petrol',
      transmission: 'Manual/Automatic',
      features: ['AC', 'Music System', 'Comfortable Seating'],
      rating: 4.7,
      price: '₹14/km',
      originalPrice: '₹3,500/day', // This will be the minimum charge per day
      ratePerKm: 14,
      minChargesPerDay: 3000,
      available: true,
      description: 'Experience luxury and comfort in our premium sedan, perfect for city tours and airport transfers.'
    },
    {
      id: 2,
      name: 'Innova/Crysta',
      model: 'Toyota Innova/Crysta',
      image: '/inovaa.jpg',  // fixed path
      passengers: 6,
      fuel: 'Diesel',
      transmission: 'Manual/Automatic',
      features: ['AC', 'Music System', 'Comfortable for family trips', 'Spacious Luggage'],
      rating: 4.8,
      price: '₹22/km',
      originalPrice: '₹4,500/day', // Minimum charge per day
      ratePerKm: 22,
      minChargesPerDay: 4000,
      available: true,
      description: 'Ideal for group travels and hill station visits with superior comfort and safety features.'
    },
    {
      id: 3,
      name: 'Tempo Traveller',
      model: 'Force Traveller',
      image: 'tempo.png', // Assuming you have a tempo traveller image
      passengers: 12,
      fuel: 'Diesel',
      transmission: 'Manual',
      features: ['Comfortable Seating', 'Spacious Interior', 'Music System', 'AC', 'Luggage Space'],
      rating: 4.9,
      price: '₹25/km',
      originalPrice: '₹9,000/day', // Minimum charge per day
      ratePerKm: 25,
      minChargesPerDay: 8500,
      available: true,
      description: 'Perfect for large groups and family trips, offering ample space and comfort.'
    }
  ];

  return (
    <section id="fleet" className="py-section bg-surface">
      <SEOTags
        title="Our Fleet 🚗 Premium Car Rental Udaipur | Heritage Rides Vehicles"
        description="Explore the premium fleet of Heritage Rides for car rentals in Udaipur. Choose from our sedans and SUVs for comfortable and luxurious travel."
        keywords="car fleet Udaipur, premium car rental Udaipur, SUV rental Udaipur, sedan rental Udaipur, luxury cars Udaipur, Heritage Rides vehicles"
      />
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
     {/* Cars Grid */}
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
  {cars.map((car, index) => (
    <div
      key={car.id}
      className={`group bg-surface rounded-3xl shadow-2xl overflow-hidden hover-lift border border-gray-100 relative
        ${index === 2 ? "lg:col-span-2 lg:mx-auto lg:w-[70%] w-full" : "w-full"}`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      {/* Availability Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span
          className={`px-3 py-1 rounded-full text-xs sm:text-sm font-poppins font-medium shadow-lg break-words ${
            car.available
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          {car.available ? "✓ Available Now" : "✗ Currently Booked"}
        </span>
      </div>
      {/* Rating Badge */}
      <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-2 rounded-lg shadow-lg">
        <div className="flex items-center space-x-1">
          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-secondary fill-current" />
          <span className="text-xs sm:text-sm font-poppins font-medium">{car.rating}</span>
        </div>
      </div>

      {/* Car Image */}
      <div className="relative h-56 sm:h-72 overflow-hidden">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>

      {/* Car Details */}
      <div className="p-5 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-raleway font-bold text-primary mb-1 break-words">
              {car.name}
            </h3>
            <p className="text-sm sm:text-base text-text-secondary font-poppins break-words">{car.model}</p>
          </div>
          <div className="text-left sm:text-right mt-2 sm:mt-0">
            <div className="flex flex-wrap sm:flex-nowrap items-center space-x-2">
              <span className="text-2xl sm:text-3xl font-raleway font-bold text-secondary">{car.price}</span>
              <span className="text-sm sm:text-lg text-text-light line-through font-poppins">{car.originalPrice}</span>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary font-poppins">starting from</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-text-secondary font-poppins leading-relaxed mb-4 sm:mb-6 break-words">
          {car.description}
        </p>

        {/* Specifications */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
          <div className="flex flex-col items-center p-3 bg-background rounded-lg text-center">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary mb-2" />
            <span className="text-xs sm:text-sm font-poppins font-medium text-text-primary break-words">
              {car.passengers}+1 Seats
            </span>
          </div>
          <div className="flex flex-col items-center p-3 bg-background rounded-lg text-center">
            <Fuel className="w-5 h-5 sm:w-6 sm:h-6 text-primary mb-2" />
            <span className="text-xs sm:text-sm font-poppins font-medium text-text-primary break-words">
              {car.fuel}
            </span>
          </div>
          <div className="flex flex-col items-center p-3 bg-background rounded-lg text-center">
            <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-primary mb-2" />
            <span className="text-xs sm:text-sm font-poppins font-medium text-text-primary break-words">
              {car.transmission}
            </span>
          </div>
        </div>

        {/* Features */}
        <div className="mb-6 sm:mb-8">
          <h4 className="font-raleway font-semibold text-primary mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
            <Award className="w-4 h-4 mr-2 text-secondary" />
            Premium Features
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
            {car.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 text-xs sm:text-sm font-poppins break-words"
              >
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span className="text-text-secondary">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Book Button */}
        <a
          href={`https://wa.me/919660103534?text=Hello! I'm interested in booking a ${car.name}. Could you please provide more details?`}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full block ${!car.available ? 'pointer-events-none' : ''}`}
          onClick={(e) => !car.available && e.preventDefault()}
        >
          <button
            className={`w-full py-3 sm:py-4 rounded-lg font-poppins font-semibold transition-all duration-300 ${
              car.available ? 'btn-primary group' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!car.available}
          >
            {car.available ? (
              <div className="flex items-center justify-center space-x-2">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Reserve Now</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Currently Unavailable</span>
              </div>
            )}
          </button>
        </a>
      </div>
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