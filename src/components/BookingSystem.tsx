import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Calendar, Clock, MapPin, Users, Phone, Mail, User } from 'lucide-react';

interface Vehicle {
  id: string;
  name: string;
  model: string;
  type: string;
  price_per_day: number;
  passengers: number;
  features: string[];
  image_url: string;
  is_available: boolean;
  available_count: number;
}

interface BookingFormData {
  serviceType: string;
  vehicleId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupDate: string;
  pickupTime: string;
  pickupLocation: string;
  dropoffLocation: string;
  passengers: number;
  duration: string;
  notes: string;
}

const BookingSystem: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    serviceType: 'rental',
    vehicleId: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    pickupDate: '',
    pickupTime: '',
    pickupLocation: '',
    dropoffLocation: '',
    passengers: 1,
    duration: '',
    notes: ''
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('is_available', true)
        .gt('available_count', 0);

      if (error) throw error;
      setVehicles(data || []);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Calculate total price
      const selectedVehicle = vehicles.find(v => v.id === formData.vehicleId);
      const totalPrice = selectedVehicle ? selectedVehicle.price_per_day : 0;

      // Save booking to database
      const { data, error } = await supabase
        .from('bookings')
        .insert([{
          service_type: formData.serviceType,
          vehicle_id: formData.vehicleId || null,
          customer_name: formData.customerName,
          customer_email: formData.customerEmail,
          customer_phone: formData.customerPhone,
          pickup_date: formData.pickupDate,
          pickup_time: formData.pickupTime,
          pickup_location: formData.pickupLocation,
          dropoff_location: formData.dropoffLocation,
          passengers: formData.passengers,
          duration: formData.duration,
          total_price: totalPrice,
          notes: formData.notes,
          status: 'pending'
        }]);

      if (error) throw error;

      // Generate email content
      const emailSubject = `Heritage Rides Booking Request - ${formData.customerName}`;
      const emailBody = `
New booking request received:

Customer Details:
- Name: ${formData.customerName}
- Email: ${formData.customerEmail}
- Phone: ${formData.customerPhone}

Booking Details:
- Service: ${formData.serviceType}
- Vehicle: ${selectedVehicle?.name || 'Not specified'}
- Date: ${formData.pickupDate}
- Time: ${formData.pickupTime}
- Pickup: ${formData.pickupLocation}
- Dropoff: ${formData.dropoffLocation}
- Passengers: ${formData.passengers}
- Duration: ${formData.duration}
- Total Price: ₹${totalPrice}

Notes: ${formData.notes}

Please contact the customer to confirm the booking.
      `;

      // Generate WhatsApp message
      const whatsappMessage = `🚗 *Heritage Rides Booking*

👤 *Customer:* ${formData.customerName}
📧 *Email:* ${formData.customerEmail}
📱 *Phone:* ${formData.customerPhone}

🚙 *Service:* ${formData.serviceType}
🚗 *Vehicle:* ${selectedVehicle?.name || 'Not specified'}
📅 *Date:* ${formData.pickupDate}
⏰ *Time:* ${formData.pickupTime}
📍 *Pickup:* ${formData.pickupLocation}
📍 *Dropoff:* ${formData.dropoffLocation}
👥 *Passengers:* ${formData.passengers}
⏱️ *Duration:* ${formData.duration}
💰 *Price:* ₹${totalPrice}

📝 *Notes:* ${formData.notes}`;

      // Open email client
      const mailtoLink = `mailto:info@heritagerides.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      window.open(mailtoLink, '_blank');

      // Open WhatsApp
      const whatsappLink = `https://wa.me/919876543210?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappLink, '_blank');

      alert('Booking request submitted successfully! Please check your email and WhatsApp.');
      
      // Reset form
      setFormData({
        serviceType: 'rental',
        vehicleId: '',
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        pickupDate: '',
        pickupTime: '',
        pickupLocation: '',
        dropoffLocation: '',
        passengers: 1,
        duration: '',
        notes: ''
      });

    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Error submitting booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Book Your Heritage Ride</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Service Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Type
          </label>
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="rental">Vehicle Rental</option>
            <option value="tour">Guided Tour</option>
            <option value="transfer">Airport Transfer</option>
          </select>
        </div>

        {/* Vehicle Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Vehicle
          </label>
          <select
            name="vehicleId"
            value={formData.vehicleId}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Choose a vehicle</option>
            {vehicles.map(vehicle => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.name} - ₹{vehicle.price_per_day}/day ({vehicle.available_count} available)
              </option>
            ))}
          </select>
        </div>

        {/* Customer Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="inline w-4 h-4 mr-1" />
              Full Name
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="inline w-4 h-4 mr-1" />
              Email
            </label>
            <input
              type="email"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="inline w-4 h-4 mr-1" />
              Phone
            </label>
            <input
              type="tel"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-1" />
              Pickup Date
            </label>
            <input
              type="date"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="inline w-4 h-4 mr-1" />
              Pickup Time
            </label>
            <input
              type="time"
              name="pickupTime"
              value={formData.pickupTime}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline w-4 h-4 mr-1" />
              Pickup Location
            </label>
            <input
              type="text"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleInputChange}
              placeholder="Enter pickup address"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline w-4 h-4 mr-1" />
              Dropoff Location
            </label>
            <input
              type="text"
              name="dropoffLocation"
              value={formData.dropoffLocation}
              onChange={handleInputChange}
              placeholder="Enter dropoff address"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Passengers and Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="inline w-4 h-4 mr-1" />
              Number of Passengers
            </label>
            <input
              type="number"
              name="passengers"
              value={formData.passengers}
              onChange={handleInputChange}
              min="1"
              max="20"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration
            </label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select duration</option>
              <option value="4 hours">4 Hours</option>
              <option value="8 hours">8 Hours</option>
              <option value="1 day">1 Day</option>
              <option value="2 days">2 Days</option>
              <option value="3 days">3 Days</option>
              <option value="1 week">1 Week</option>
              <option value="custom">Custom</option>
            </select>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Special Requirements / Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows={4}
            placeholder="Any special requirements or additional information..."
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit Booking Request'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingSystem;