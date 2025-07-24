import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Car, CreditCard, CheckCircle, ArrowRight, ArrowLeft, Shield, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';

const BookingSystem = () => {
  const [bookingStep, setBookingStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceType: '',
    carType: '',
    pickupDate: '',
    pickupTime: '',
    pickupLocation: '',
    dropoffLocation: '',
    passengers: '4',
    duration: '',
    name: '',
    phone: '',
    email: ''
  });

  const serviceTypes = [
    { 
      value: 'airport', 
      label: 'Airport Transfer', 
      icon: '✈️',
      description: 'Comfortable pickup/drop service',
      price: 'From ₹800'
    },
    { 
      value: 'tour', 
      label: 'City Tour', 
      icon: '🏰',
      description: 'Curated heritage experiences',
      price: 'From ₹1,800'
    },
    { 
      value: 'rental', 
      label: 'Car Rental', 
      icon: '🚗',
      description: 'Self-drive or with driver',
      price: 'From ₹2,500'
    }
  ];

  const carTypes = [
    { 
      value: 'sedan', 
      label: 'Royal Sedan', 
      model: 'Toyota Camry Hybrid',
      icon: '🚙',
      price: '₹2,500/day',
      passengers: '4 passengers',
      features: ['Premium AC', 'GPS', 'WiFi']
    },
    { 
      value: 'suv', 
      label: 'Heritage SUV', 
      model: 'Toyota Fortuner 4WD',
      icon: '🚐',
      price: '₹3,200/day',
      passengers: '7 passengers',
      features: ['Dual AC', '4WD', 'Spacious']
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const nextStep = () => {
    if (bookingStep < 3) setBookingStep(bookingStep + 1);
  };

  const prevStep = () => {
    if (bookingStep > 1) setBookingStep(bookingStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare data for Supabase
    const bookingData = {
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      pickup_date: formData.pickupDate,
      pickup_time: formData.pickupTime,
      pickup_location: formData.pickupLocation,
      dropoff_location: formData.dropoffLocation,
      passengers: Number(formData.passengers),
      service_type: formData.serviceType,
      car_type: formData.carType,
      duration: formData.duration,
      status: 'pending',
      notes: ''
    };

    const { error } = await supabase.from('bookings').insert([bookingData]);
    if (error) {
      alert('Booking failed: ' + error.message);
      return;
    }

    alert('Booking request submitted successfully! We will contact you within 15 minutes to confirm your reservation.');
    // Reset form
    setFormData({
      serviceType: '',
      carType: '',
      pickupDate: '',
      pickupTime: '',
      pickupLocation: '',
      dropoffLocation: '',
      passengers: '4',
      duration: '',
      name: '',
      phone: '',
      email: ''
    });
    setBookingStep(1);
  };

  const stepTitles = [
    'Choose Your Service',
    'Travel Details',
    'Contact Information'
  ];

  return (
    <section className="py-section bg-gradient-to-br from-background to-surface">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-poppins font-medium text-sm rounded-full mb-4">
            Easy Booking
          </span>
          <h2 className="text-4xl md:text-5xl font-raleway font-bold text-primary mb-6">
            Book Your Royal Journey
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto font-poppins leading-relaxed">
            Simple 3-step booking process for your perfect Udaipur experience. 
            Get instant confirmation and premium service guaranteed.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-gradient-to-r from-secondary to-accent rounded-full transition-all duration-500"
                style={{ width: `${((bookingStep - 1) / 2) * 100}%` }}
              ></div>
            </div>
            
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-raleway font-bold transition-all duration-300 ${
                    bookingStep >= step
                      ? 'bg-secondary text-white shadow-lg'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {bookingStep > step ? <CheckCircle className="w-6 h-6" /> : step}
                </div>
                <span className={`mt-2 text-sm font-poppins font-medium ${
                  bookingStep >= step ? 'text-primary' : 'text-text-secondary'
                }`}>
                  {stepTitles[step - 1]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        <div className="max-w-4xl mx-auto bg-surface rounded-3xl shadow-2xl overflow-hidden border border-gray-100 relative">
          <div className="absolute top-0 right-0 w-40 h-40 rajasthani-pattern opacity-5"></div>
          
          <div className="p-8 md:p-12 relative z-10">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Service Selection */}
              {bookingStep === 1 && (
                <div className="space-y-8 animate-fade-in">
                  <h3 className="text-3xl font-raleway font-bold text-primary mb-2">Select Your Service</h3>
                  <p className="text-text-secondary font-poppins mb-8">Choose the type of service that best fits your travel needs</p>
                  
                  <div>
                    <label className="block text-lg font-raleway font-semibold text-primary mb-6">
                      Service Type
                    </label>
                    <div className="grid md:grid-cols-3 gap-6">
                      {serviceTypes.map((service) => (
                        <div
                          key={service.value}
                          className={`group p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover-lift ${
                            formData.serviceType === service.value
                              ? 'border-secondary bg-secondary/5 shadow-lg'
                              : 'border-gray-200 hover:border-gray-300 bg-surface'
                          }`}
                          onClick={() => setFormData({ ...formData, serviceType: service.value })}
                        >
                          <div className="text-center">
                            <div className="text-4xl mb-4">{service.icon}</div>
                            <h4 className="font-raleway font-bold text-primary text-lg mb-2">{service.label}</h4>
                            <p className="text-text-secondary font-poppins text-sm mb-3">{service.description}</p>
                            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-poppins font-medium">
                              {service.price}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-lg font-raleway font-semibold text-primary mb-6">
                      Choose Your Vehicle
                    </label>
                    <div className="grid md:grid-cols-2 gap-6">
                      {carTypes.map((car) => (
                        <div
                          key={car.value}
                          className={`group p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover-lift ${
                            formData.carType === car.value
                              ? 'border-secondary bg-secondary/5 shadow-lg'
                              : 'border-gray-200 hover:border-gray-300 bg-surface'
                          }`}
                          onClick={() => setFormData({ ...formData, carType: car.value })}
                        >
                          <div className="flex items-start space-x-4">
                            <div className="text-3xl">{car.icon}</div>
                            <div className="flex-1">
                              <h4 className="font-raleway font-bold text-primary text-lg mb-1">{car.label}</h4>
                              <p className="text-text-secondary font-poppins text-sm mb-2">{car.model}</p>
                              <p className="text-secondary font-poppins font-semibold mb-2">{car.price}</p>
                              <p className="text-text-secondary font-poppins text-sm mb-3">{car.passengers}</p>
                              <div className="flex flex-wrap gap-1">
                                {car.features.map((feature, index) => (
                                  <span key={index} className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-poppins">
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Travel Details */}
              {bookingStep === 2 && (
                <div className="space-y-8 animate-fade-in">
                  <h3 className="text-3xl font-raleway font-bold text-primary mb-2">Travel Details</h3>
                  <p className="text-text-secondary font-poppins mb-8">Provide your travel information for a seamless experience</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-poppins font-medium text-primary mb-3">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Pickup Date *
                      </label>
                      <input
                        type="date"
                        name="pickupDate"
                        value={formData.pickupDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-300 font-poppins"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-poppins font-medium text-primary mb-3">
                        <Clock className="w-4 h-4 inline mr-2" />
                        Pickup Time *
                      </label>
                      <input
                        type="time"
                        name="pickupTime"
                        value={formData.pickupTime}
                        onChange={handleInputChange}
                        className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-300 font-poppins"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-poppins font-medium text-primary mb-3">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Pickup Location *
                    </label>
                    <input
                      type="text"
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleInputChange}
                      placeholder="Hotel name, address, or landmark in Udaipur"
                      className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-300 font-poppins"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-poppins font-medium text-primary mb-3">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Drop-off Location
                    </label>
                    <input
                      type="text"
                      name="dropoffLocation"
                      value={formData.dropoffLocation}
                      onChange={handleInputChange}
                      placeholder="Destination or return location (optional for tours)"
                      className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-300 font-poppins"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-poppins font-medium text-primary mb-3">
                        <Users className="w-4 h-4 inline mr-2" />
                        Number of Passengers *
                      </label>
                      <select
                        name="passengers"
                        value={formData.passengers}
                        onChange={handleInputChange}
                        className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-300 font-poppins"
                      >
                        {[1,2,3,4,5,6,7].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-poppins font-medium text-primary mb-3">
                        Duration (for rentals)
                      </label>
                      <select
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-300 font-poppins"
                      >
                        <option value="">Select duration</option>
                        <option value="4-hours">4 Hours (₹1,200)</option>
                        <option value="8-hours">8 Hours (₹2,000)</option>
                        <option value="1-day">1 Day (₹2,500)</option>
                        <option value="2-days">2 Days (₹4,800)</option>
                        <option value="3-days">3 Days (₹7,000)</option>
                        <option value="weekly">Weekly (₹15,000)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Contact Information */}
              {bookingStep === 3 && (
                <div className="space-y-8 animate-fade-in">
                  <h3 className="text-3xl font-raleway font-bold text-primary mb-2">Contact Information</h3>
                  <p className="text-text-secondary font-poppins mb-8">Almost done! We need your details to confirm the booking</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-poppins font-medium text-primary mb-3">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-300 font-poppins"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-poppins font-medium text-primary mb-3">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 96601 03534"
                        className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-300 font-poppins"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-poppins font-medium text-primary mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="heritagerides@gmail.com"
                      className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-300 font-poppins"
                      required
                    />
                  </div>

                  {/* Booking Summary */}
                  <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-2xl border border-gray-100">
                    <h4 className="font-raleway font-bold text-primary mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-secondary" />
                      Booking Summary
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm font-poppins">
                      <div className="space-y-2">
                        <p><span className="text-text-secondary">Service:</span> <span className="font-medium text-primary">{formData.serviceType}</span></p>
                        <p><span className="text-text-secondary">Vehicle:</span> <span className="font-medium text-primary">{formData.carType}</span></p>
                        <p><span className="text-text-secondary">Date:</span> <span className="font-medium text-primary">{formData.pickupDate}</span></p>
                      </div>
                      <div className="space-y-2">
                        <p><span className="text-text-secondary">Time:</span> <span className="font-medium text-primary">{formData.pickupTime}</span></p>
                        <p><span className="text-text-secondary">Passengers:</span> <span className="font-medium text-primary">{formData.passengers}</span></p>
                        <p><span className="text-text-secondary">Duration:</span> <span className="font-medium text-primary">{formData.duration || 'As per service'}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
                {bookingStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-text-primary font-poppins font-medium rounded-lg hover:bg-gray-200 transition-all duration-300"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Previous</span>
                  </button>
                ) : (
                  <div></div>
                )}
                
                {bookingStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={
                      (bookingStep === 1 && (!formData.serviceType || !formData.carType)) ||
                      (bookingStep === 2 && (!formData.pickupDate || !formData.pickupTime || !formData.pickupLocation))
                    }
                    className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn-primary flex items-center space-x-2 text-lg px-8 py-4"
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>Confirm Booking</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center bg-surface p-6 rounded-2xl shadow-lg border border-gray-100">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h4 className="font-raleway font-bold text-primary mb-2">Instant Confirmation</h4>
            <p className="text-text-secondary font-poppins text-sm">Get booking confirmation within 15 minutes</p>
          </div>
          <div className="text-center bg-surface p-6 rounded-2xl shadow-lg border border-gray-100">
            <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h4 className="font-raleway font-bold text-primary mb-2">Secure Payment</h4>
            <p className="text-text-secondary font-poppins text-sm">Safe and encrypted payment processing</p>
          </div>
          <div className="text-center bg-surface p-6 rounded-2xl shadow-lg border border-gray-100">
            <Star className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h4 className="font-raleway font-bold text-primary mb-2">Quality Guaranteed</h4>
            <p className="text-text-secondary font-poppins text-sm">Premium service with 4.9-star rating</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSystem;