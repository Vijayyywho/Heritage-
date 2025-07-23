import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Car, CreditCard, CheckCircle, ArrowRight, ArrowLeft, Shield, Star, Mail, MessageCircle, Search } from 'lucide-react';
import { vehicleAPI, bookingAPI } from '../lib/supabase';

const BookingSystem = () => {
  const [bookingStep, setBookingStep] = useState(1);
  const [availabilityChecked, setAvailabilityChecked] = useState(false);
  const [availableVehicles, setAvailableVehicles] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
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

  // Load vehicles on component mount
  React.useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const vehiclesData = await vehicleAPI.getAll();
      setVehicles(vehiclesData);
    } catch (error) {
      console.error('Error loading vehicles:', error);
    }
  };

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const checkAvailability = () => {
    if (!formData.pickupDate || !formData.pickupTime) {
      alert('Please select pickup date and time first');
      return;
    }

    setLoading(true);
    
    // Check availability for each vehicle
    Promise.all(
      vehicles.map(async (vehicle) => {
        try {
          const availableCount = await vehicleAPI.checkAvailability(vehicle.id, formData.pickupDate);
          return {
            ...vehicle,
            value: vehicle.type,
            label: vehicle.name,
            icon: vehicle.type === 'sedan' ? '🚙' : '🚐',
            price: `₹${vehicle.price_per_day}/day`,
            passengers: `${vehicle.passengers} passengers`,
            available: availableCount > 0,
            count: availableCount
          };
        } catch (error) {
          console.error('Error checking availability for vehicle:', vehicle.id, error);
          return {
            ...vehicle,
            value: vehicle.type,
            label: vehicle.name,
            icon: vehicle.type === 'sedan' ? '🚙' : '🚐',
            price: `₹${vehicle.price_per_day}/day`,
            passengers: `${vehicle.passengers} passengers`,
            available: false,
            count: 0
          };
        }
      })
    ).then((results) => {
      setAvailableVehicles(results);
      setAvailabilityChecked(true);
      setLoading(false);
    });
  };

  const nextStep = () => {
    if (bookingStep < 3) setBookingStep(bookingStep + 1);
  };

  const prevStep = () => {
    if (bookingStep > 1) setBookingStep(bookingStep - 1);
  };

  const generateEmailBody = () => {
    return `
New Booking Request - Heritage Rides

Service Details:
- Service Type: ${formData.serviceType}
- Vehicle: ${formData.carType}
- Date: ${formData.pickupDate}
- Time: ${formData.pickupTime}
- Pickup Location: ${formData.pickupLocation}
- Drop-off Location: ${formData.dropoffLocation || 'Not specified'}
- Passengers: ${formData.passengers}
- Duration: ${formData.duration || 'As per service'}

Customer Details:
- Name: ${formData.name}
- Phone: ${formData.phone}
- Email: ${formData.email}

Please confirm availability and pricing.

Best regards,
Heritage Rides Booking System
    `.trim();
  };

  const generateWhatsAppMessage = () => {
    return `🚗 *Heritage Rides Booking Request*

*Service Details:*
• Service: ${formData.serviceType}
• Vehicle: ${formData.carType}
• Date: ${formData.pickupDate}
• Time: ${formData.pickupTime}
• Pickup: ${formData.pickupLocation}
• Drop-off: ${formData.dropoffLocation || 'Not specified'}
• Passengers: ${formData.passengers}
• Duration: ${formData.duration || 'As per service'}

*Customer Details:*
• Name: ${formData.name}
• Phone: ${formData.phone}
• Email: ${formData.email}

Please confirm availability and send quote. Thank you! 🙏`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save booking to database first
    const selectedVehicle = vehicles.find(v => v.type === formData.carType);
    
    if (selectedVehicle) {
      const bookingData = {
        service_type: formData.serviceType,
        vehicle_id: selectedVehicle.id,
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        pickup_date: formData.pickupDate,
        pickup_time: formData.pickupTime,
        pickup_location: formData.pickupLocation,
        dropoff_location: formData.dropoffLocation || null,
        passengers: parseInt(formData.passengers),
        duration: formData.duration || null,
        status: 'pending' as const,
        total_price: selectedVehicle.price_per_day
      };

      bookingAPI.create(bookingData)
        .then(() => {
          // Generate email and WhatsApp content
          const emailBody = generateEmailBody();
          const whatsappMessage = generateWhatsAppMessage();
          
          // Create mailto link
          const mailtoLink = `mailto:heritagerides@gmail.com?subject=New Booking Request - ${formData.name}&body=${encodeURIComponent(emailBody)}`;
          
          // Create WhatsApp link
          const whatsappLink = `https://wa.me/919660103534?text=${encodeURIComponent(whatsappMessage)}`;
          
          // Open both email and WhatsApp
          window.open(mailtoLink, '_blank');
          setTimeout(() => {
            window.open(whatsappLink, '_blank');
          }, 1000);
          
          alert('Booking saved successfully! Please check your email client and WhatsApp to send the booking details.');
          
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
          setAvailabilityChecked(false);
          setAvailableVehicles([]);
        })
        .catch((error) => {
          console.error('Error saving booking:', error);
          alert('Error saving booking. Please try again.');
        });
    }
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
                    
                    {/* Availability Checker */}
                    {formData.pickupDate && formData.pickupTime && (
                      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-raleway font-semibold text-primary mb-1">Check Vehicle Availability</h4>
                            <p className="text-sm text-text-secondary font-poppins">
                              {formData.pickupDate} at {formData.pickupTime}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={checkAvailability}
                            disabled={loading}
                            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-300 font-poppins font-medium text-sm"
                          >
                            {loading ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                <span>Checking...</span>
                              </>
                            ) : (
                              <>
                                <Search className="w-4 h-4" />
                                <span>Check Now</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                      {(availabilityChecked ? availableVehicles : vehicles.map(v => ({
                        ...v,
                        value: v.type,
                        label: v.name,
                        icon: v.type === 'sedan' ? '🚙' : '🚐',
                        price: `₹${v.price_per_day}/day`,
                        passengers: `${v.passengers} passengers`,
                        available: v.is_available,
                        count: v.available_count
                      }))).map((car) => (
                        <div
                          key={car.value}
                          className={`group p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover-lift relative ${
                            formData.carType === car.value
                              ? 'border-secondary bg-secondary/5 shadow-lg'
                              : car.available 
                                ? 'border-gray-200 hover:border-gray-300 bg-surface'
                                : 'border-red-200 bg-red-50 opacity-60 cursor-not-allowed'
                          }`}
                          onClick={() => car.available && setFormData({ ...formData, carType: car.value })}
                        >
                          {/* Availability Badge */}
                          {availabilityChecked && (
                            <div className="absolute top-3 right-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-poppins font-medium ${
                                car.available 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {car.available ? `${car.count} Available` : 'Not Available'}
                              </span>
                            </div>
                          )}
                          
                          <div className="flex items-start space-x-4">
                            <div className="text-3xl">{car.icon}</div>
                            <div className="flex-1">
                              <h4 className="font-raleway font-bold text-primary text-lg mb-1">{car.label}</h4>
                              <p className="text-text-secondary font-poppins text-sm mb-2">{car.model}</p>
                              <p className="text-secondary font-poppins font-semibold mb-2">{car.price}</p>
                              <p className="text-text-secondary font-poppins text-sm mb-3">{car.passengers}</p>
                              {!car.available && availabilityChecked && (
                                <p className="text-red-600 font-poppins text-sm mb-3 font-medium">
                                  Not available for selected date/time
                                </p>
                              )}
                              <div className="flex flex-wrap gap-1">
                                {(car.features || []).map((feature, index) => (
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
                    className="btn-primary flex items-center space-x-2 text-lg px-8 py-4 group"
                  >
                    <div className="flex items-center space-x-2">
                      <Mail className="w-5 h-5" />
                      <MessageCircle className="w-5 h-5" />
                      <span>Send Booking Request</span>
                    </div>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center bg-surface p-6 rounded-2xl shadow-lg border border-gray-100">
            <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h4 className="font-raleway font-bold text-primary mb-2">Email Integration</h4>
            <p className="text-text-secondary font-poppins text-sm">Booking details sent directly to your email</p>
          </div>
          <div className="text-center bg-surface p-6 rounded-2xl shadow-lg border border-gray-100">
            <MessageCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h4 className="font-raleway font-bold text-primary mb-2">WhatsApp Support</h4>
            <p className="text-text-secondary font-poppins text-sm">Instant communication via WhatsApp</p>
          </div>
          <div className="text-center bg-surface p-6 rounded-2xl shadow-lg border border-gray-100">
            <CheckCircle className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h4 className="font-raleway font-bold text-primary mb-2">Real-time Availability</h4>
            <p className="text-text-secondary font-poppins text-sm">Check vehicle availability instantly</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSystem;