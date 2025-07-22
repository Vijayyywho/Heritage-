import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Star, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'City Palace Heritage',
      subtitle: 'Explore Royal Grandeur'
    },
    {
      image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Lake Pichola Serenity',
      subtitle: 'Romantic Lakeside Journeys'
    },
    {
      image: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Monsoon Palace Views',
      subtitle: 'Panoramic Hill Experiences'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(30, 64, 175, 0.4), rgba(217, 119, 6, 0.3)), url('${slide.image}')`
              }}
            />
          </div>
        ))}
      </div>

      {/* Slider Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-secondary' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
      
      {/* Decorative Rajasthani Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-4 border-secondary rounded-full opacity-20 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 border-4 border-accent rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-20 w-12 h-12 border-2 border-secondary opacity-30 transform rotate-45"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto animate-fade-in">
        <div className="mb-6">
          <span className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white font-poppins font-medium text-sm shadow-lg border border-white/20">
            <MapPin className="w-4 h-4 mr-2" />
            Udaipur, City of Lakes
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-raleway font-bold text-white mb-4 sm:mb-6 leading-tight">
          Experience
          <span className="block text-secondary bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Royal Journeys
          </span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed font-poppins px-4">
          Premium car rentals and curated tours in the majestic City of Lakes.
        </p>

        {/* Current Slide Info */}
        <div className="mb-6 sm:mb-8">
          <h3 className="text-lg sm:text-xl md:text-2xl font-raleway font-semibold text-secondary mb-2">
            {slides[currentSlide].title}
          </h3>
          <p className="text-sm sm:text-base text-white/80 font-poppins px-4">
            {slides[currentSlide].subtitle}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16 px-4">
          <a
            href="#fleet"
            className="btn-primary text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 font-poppins font-semibold shadow-xl w-full sm:w-auto"
          >
            Explore Fleet
          </a>
          <a
            href="#tours"
            className="inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white font-poppins font-semibold rounded-lg border-2 border-white/30 hover:bg-white/20 transform hover:scale-105 transition-all duration-300 text-base sm:text-lg w-full sm:w-auto"
          >
            View Tours
          </a>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-white/70" />
        </div>
      </div>
    </section>
  );
};

export default Hero;