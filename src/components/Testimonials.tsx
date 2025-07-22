import React from 'react';
import { Star, Quote, MapPin } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'London, UK',
      rating: 5,
      text: 'Absolutely magical experience! The driver was incredibly knowledgeable about Udaipur\'s history and took us to the most breathtaking spots. The car was immaculate and comfortable. Heritage Rides made our honeymoon unforgettable.',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      tour: 'City Palace Heritage Tour'
    },
    {
      id: 2,
      name: 'Rajesh Patel',
      location: 'Mumbai, India',
      rating: 5,
      text: 'Heritage Rides made our anniversary trip unforgettable. The sunset tour around Lake Pichola was perfectly timed, and their attention to detail was remarkable. Professional service with a personal touch.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      tour: 'Lake Pichola & Islands'
    },
    {
      id: 3,
      name: 'Emily Chen',
      location: 'Singapore',
      rating: 5,
      text: 'Professional, punctual, and passionate about their city. They didn\'t just drive us around - they shared stories and insights that made Udaipur come alive. The Royal Sedan was luxurious and spotless.',
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      tour: 'Airport Transfer Service'
    },
    {
      id: 4,
      name: 'Michael Weber',
      location: 'Berlin, Germany',
      rating: 5,
      text: 'The airport transfer was seamless, and the city tour exceeded all expectations. Great value for money and truly personalized service. The Heritage SUV was perfect for our family of 6.',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      tour: 'Monsoon Palace & Hills'
    }
  ];

  return (
    <section id="reviews" className="py-section bg-gradient-to-br from-background to-surface">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <span className="inline-block px-4 py-2 bg-accent/10 text-accent font-poppins font-medium text-sm rounded-full mb-4">
            Guest Experiences
          </span>
          <h2 className="text-4xl md:text-5xl font-raleway font-bold text-primary mb-6">
            What Our Guests Say
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto font-poppins leading-relaxed">
            Real experiences from travelers who discovered Udaipur's magic with Heritage Rides. 
            Every review reflects our commitment to exceptional service.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group bg-surface rounded-2xl shadow-xl p-8 hover-lift border border-gray-100 relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 rajasthani-pattern opacity-5"></div>
              
              {/* Quote Icon */}
              <div className="absolute top-6 right-6">
                <Quote className="w-8 h-8 text-secondary/20" />
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-secondary fill-current" />
                ))}
                <span className="ml-2 text-sm font-poppins text-text-secondary">
                  ({testimonial.rating}.0)
                </span>
              </div>

              {/* Tour Badge */}
              <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-poppins font-medium mb-4">
                {testimonial.tour}
              </div>

              {/* Testimonial Text */}
              <p className="text-text-secondary leading-relaxed mb-6 font-poppins italic text-lg">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-secondary/20"
                />
                <div>
                  <h4 className="font-raleway font-bold text-primary text-lg">{testimonial.name}</h4>
                  <div className="flex items-center space-x-1 text-text-secondary">
                    <MapPin className="w-3 h-3" />
                    <span className="text-sm font-poppins">{testimonial.location}</span>
                  </div>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-secondary/20 rounded-2xl transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* Overall Rating Section */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-6 bg-surface px-10 py-6 rounded-2xl shadow-xl border border-gray-100">
            <div className="flex items-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-7 h-7 text-secondary fill-current" />
              ))}
            </div>
            <div className="border-l border-gray-200 pl-6">
              <div className="text-4xl font-raleway font-bold text-primary">4.9</div>
              <div className="text-text-secondary font-poppins text-sm">Average Rating</div>
            </div>
            <div className="border-l border-gray-200 pl-6">
              <div className="text-4xl font-raleway font-bold text-primary">127</div>
              <div className="text-text-secondary font-poppins text-sm">Happy Guests</div>
            </div>
            <div className="border-l border-gray-200 pl-6">
              <div className="text-4xl font-raleway font-bold text-primary">100%</div>
              <div className="text-text-secondary font-poppins text-sm">Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-surface p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8" />
            </div>
            <h4 className="font-raleway font-bold text-primary mb-2">Verified Reviews</h4>
            <p className="text-text-secondary font-poppins text-sm">All reviews are from verified bookings and real guests</p>
          </div>
          <div className="bg-surface p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Quote className="w-8 h-8" />
            </div>
            <h4 className="font-raleway font-bold text-primary mb-2">Authentic Experiences</h4>
            <p className="text-text-secondary font-poppins text-sm">Genuine feedback from travelers across the globe</p>
          </div>
          <div className="bg-surface p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8" />
            </div>
            <h4 className="font-raleway font-bold text-primary mb-2">Global Reach</h4>
            <p className="text-text-secondary font-poppins text-sm">Trusted by travelers from over 25 countries</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;