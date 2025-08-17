import React, { useState, useEffect } from 'react';
import { 
  Car, 
  Calendar, 
  Users, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  Phone,
  Mail,
  MapPin,
  Filter,
  Search,
  Download,
  BarChart3,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { vehicleAPI, bookingAPI, availabilityAPI, Vehicle, Booking } from '../lib/supabase';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [vehiclesData, bookingsData] = await Promise.all([
        vehicleAPI.getAll(),
        bookingAPI.getAll()
      ]);
      setVehicles(vehiclesData);
      setBookings(bookingsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVehicleSubmit = async (vehicleData: Partial<Vehicle>) => {
    try {
      if (selectedVehicle) {
        await vehicleAPI.update(selectedVehicle.id, vehicleData);
      } else {
        await vehicleAPI.create(vehicleData as Omit<Vehicle, 'id' | 'created_at' | 'updated_at'>);
      }
      await loadData();
      setShowVehicleModal(false);
      setSelectedVehicle(null);
    } catch (error) {
      console.error('Error saving vehicle:', error);
    }
  };

  const handleBookingStatusUpdate = async (bookingId: string, status: string) => {
    try {
      await bookingAPI.update(bookingId, { status: status as any });
      await loadData();
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const handleDeleteVehicle = async (vehicleId: string) => {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      try {
        await vehicleAPI.delete(vehicleId);
        await loadData();
      } catch (error) {
        console.error('Error deleting vehicle:', error);
      }
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.customer_phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalVehicles: vehicles.length,
    availableVehicles: vehicles.filter(v => v.is_available).length,
    totalBookings: bookings.length,
    pendingBookings: bookings.filter(b => b.status === 'pending').length,
    confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
    revenue: bookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + (b.total_price || 0), 0)
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <img src="/heritage.png" alt="Heritage Rides" className="h-8 w-8 sm:h-10 sm:w-10 rounded-full" />
              <div>
                <h1 className="text-lg sm:text-xl font-raleway font-bold text-primary">Heritage Rides Admin</h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Vehicle & Booking Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="text-xs sm:text-sm text-gray-600 hidden sm:inline">Welcome, Admin</span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-xs sm:text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-6 sm:mb-8">
          <nav className="flex space-x-2 sm:space-x-4 lg:space-x-8 overflow-x-auto pb-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'vehicles', label: 'Vehicles', icon: Car },
              { id: 'bookings', label: 'Bookings', icon: Calendar },
              { id: 'availability', label: 'Availability', icon: Clock }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap text-sm sm:text-base ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Total Vehicles</p>
                    <p className="text-xl sm:text-3xl font-bold text-primary">{stats.totalVehicles}</p>
                  </div>
                  <Car className="w-8 h-8 sm:w-12 sm:h-12 text-primary/20" />
                </div>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Available Now</p>
                    <p className="text-xl sm:text-3xl font-bold text-green-600">{stats.availableVehicles}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 sm:w-12 sm:h-12 text-green-600/20" />
                </div>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Total Bookings</p>
                    <p className="text-xl sm:text-3xl font-bold text-blue-600">{stats.totalBookings}</p>
                  </div>
                  <Calendar className="w-8 h-8 sm:w-12 sm:h-12 text-blue-600/20" />
                </div>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Revenue</p>
                    <p className="text-xl sm:text-3xl font-bold text-secondary">₹{stats.revenue.toLocaleString()}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 sm:w-12 sm:h-12 text-secondary/20" />
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-4 sm:p-6 border-b">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Recent Bookings</h3>
              </div>
              <div className="p-4 sm:p-6">
                <div className="space-y-4">
                  {bookings.slice(0, 5).map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{booking.customer_name}</p>
                          <p className="text-xs sm:text-sm text-gray-600 truncate">{booking.pickup_date} • {booking.service_type}</p>
                        </div>
                      </div>
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vehicles Tab */}
        {activeTab === 'vehicles' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Vehicle Management</h2>
              <button
                onClick={() => {
                  setSelectedVehicle(null);
                  setShowVehicleModal(true);
                }}
                className="btn-primary flex items-center space-x-2 text-sm sm:text-base"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Add Vehicle</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                  <img
                    src={vehicle.image_url ?? 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400'}
                    alt={vehicle.name}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                  <div className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">{vehicle.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">{vehicle.model}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                        vehicle.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {vehicle.is_available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <p className="text-xs sm:text-sm text-gray-600">
                        <span className="font-medium">Price:</span> ₹{vehicle.price_per_day}/day
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        <span className="font-medium">Capacity:</span> {vehicle.passengers} passengers
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        <span className="font-medium">Available:</span> {vehicle.available_count}/{vehicle.total_count}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <button
                        onClick={() => {
                          setSelectedVehicle(vehicle);
                          setShowVehicleModal(true);
                        }}
                        className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteVehicle(vehicle.id)}
                        className="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-red-200 transition-colors flex items-center justify-center space-x-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Booking Management</h2>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
                <div className="relative">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm w-full sm:w-auto"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm w-full sm:w-auto"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              {/* Mobile View */}
              <div className="block lg:hidden">
                <div className="divide-y divide-gray-200">
                  {filteredBookings.map((booking) => (
                    <div key={booking.id} className="p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{booking.customer_name}</h4>
                          <p className="text-sm text-gray-600">{booking.customer_email}</p>
                          <p className="text-sm text-gray-600">{booking.customer_phone}</p>
                        </div>
                        <select
                          value={booking.status}
                          onChange={(e) => handleBookingStatusUpdate(booking.id, e.target.value)}
                          className={`px-2 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-primary ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Service:</span>
                          <p className="capitalize">{booking.service_type}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Date:</span>
                          <p>{booking.pickup_date}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Vehicle:</span>
                          <p>{booking.vehicles?.name || 'N/A'}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Passengers:</span>
                          <p>{booking.passengers}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedBooking(booking);
                          setShowBookingModal(true);
                        }}
                        className="w-full text-primary hover:text-primary/80 flex items-center justify-center space-x-1 py-2 border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{booking.customer_name}</div>
                            <div className="text-sm text-gray-500">{booking.customer_email}</div>
                            <div className="text-sm text-gray-500">{booking.customer_phone}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 capitalize">{booking.service_type}</div>
                          <div className="text-sm text-gray-500">{booking.passengers} passengers</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{booking.pickup_date}</div>
                          <div className="text-sm text-gray-500">{booking.pickup_time}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{booking.vehicles?.name || 'N/A'}</div>
                          <div className="text-sm text-gray-500">{booking.vehicles?.model || ''}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={booking.status}
                            onChange={(e) => handleBookingStatusUpdate(booking.id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-primary ${
                              booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                              booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                              'bg-red-100 text-red-800'
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => {
                              setSelectedBooking(booking);
                              setShowBookingModal(true);
                            }}
                            className="text-primary hover:text-primary/80 flex items-center space-x-1"
                          >
                            <Eye className="w-4 h-4" />
                            <span>View</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Availability Tab */}
        {activeTab === 'availability' && (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Vehicle Availability</h2>
            <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
              <p className="text-gray-600 mb-4">Availability management coming soon...</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {vehicles.map((vehicle) => (
                  <div key={vehicle.id} className="p-4 border rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">{vehicle.name}</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Total: {vehicle.total_count}</p>
                      <p>Available: {vehicle.available_count}</p>
                      <p>Booked: {vehicle.total_count - vehicle.available_count}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Vehicle Modal */}
      {showVehicleModal && (
        <VehicleModal
          vehicle={selectedVehicle}
          onClose={() => {
            setShowVehicleModal(false);
            setSelectedVehicle(null);
          }}
          onSubmit={handleVehicleSubmit}
        />
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedBooking && (
        <BookingModal
          booking={selectedBooking}
          onClose={() => {
            setShowBookingModal(false);
            setSelectedBooking(null);
          }}
        />
      )}
    </div>
  );
};

// Vehicle Modal Component
const VehicleModal: React.FC<{
  vehicle: Vehicle | null;
  onClose: () => void;
  onSubmit: (data: Partial<Vehicle>) => void;
}> = ({ vehicle, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: vehicle?.name || '',
    model: vehicle?.model || '',
    type: vehicle?.type || 'sedan',
    price_per_day: vehicle?.price_per_day || 0,
    passengers: vehicle?.passengers || 4,
    features: vehicle?.features || [],
    image_url: vehicle?.image_url || '',
    is_available: vehicle?.is_available ?? true,
    total_count: vehicle?.total_count || 1,
    available_count: vehicle?.available_count || 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6 border-b">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            {vehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
          </h3>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Model</label>
              <input
                type="text"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as Vehicle['type'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm"
              >
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="hatchback">Hatchback</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Price per Day (₹)</label>
              <input
                type="number"
                value={formData.price_per_day}
                onChange={(e) => setFormData({ ...formData, price_per_day: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Passengers</label>
              <input
                type="number"
                value={formData.passengers}
                onChange={(e) => setFormData({ ...formData, passengers: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Total Count</label>
              <input
                type="number"
                value={formData.total_count}
                onChange={(e) => setFormData({ ...formData, total_count: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Available Count</label>
              <input
                type="number"
                value={formData.available_count}
                onChange={(e) => setFormData({ ...formData, available_count: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm"
            />
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.is_available}
                onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-xs sm:text-sm font-medium text-gray-700">Available for booking</span>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm"
            >
              {vehicle ? 'Update' : 'Create'} Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Booking Modal Component
const BookingModal: React.FC<{
  booking: Booking;
  onClose: () => void;
}> = ({ booking, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6 border-b">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Booking Details</h3>
        </div>
        
        <div className="p-4 sm:p-6 space-y-6">
          {/* Customer Information */}
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">Customer Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-xs sm:text-sm text-gray-600">Name:</span>
                <span className="text-xs sm:text-sm font-medium">{booking.customer_name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-xs sm:text-sm text-gray-600">Email:</span>
                <span className="text-xs sm:text-sm font-medium break-all">{booking.customer_email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-xs sm:text-sm text-gray-600">Phone:</span>
                <span className="text-xs sm:text-sm font-medium">{booking.customer_phone}</span>
              </div>
            </div>
          </div>

          {/* Booking Information */}
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">Booking Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-xs sm:text-sm text-gray-600">Service Type:</span>
                <p className="text-sm font-medium capitalize">{booking.service_type}</p>
              </div>
              <div>
                <span className="text-xs sm:text-sm text-gray-600">Vehicle:</span>
                <p className="text-sm font-medium">{booking.vehicles?.name} ({booking.vehicles?.model})</p>
              </div>
              <div>
                <span className="text-xs sm:text-sm text-gray-600">Date & Time:</span>
                <p className="text-sm font-medium">{booking.pickup_date} at {booking.pickup_time}</p>
              </div>
              <div>
                <span className="text-xs sm:text-sm text-gray-600">Passengers:</span>
                <p className="text-sm font-medium">{booking.passengers} people</p>
              </div>
              <div className="sm:col-span-2">
                <span className="text-xs sm:text-sm text-gray-600">Pickup Location:</span>
                <p className="text-sm font-medium">{booking.pickup_location}</p>
              </div>
              {booking.dropoff_location && (
                <div className="sm:col-span-2">
                  <span className="text-xs sm:text-sm text-gray-600">Drop-off Location:</span>
                  <p className="text-sm font-medium">{booking.dropoff_location}</p>
                </div>
              )}
              {booking.duration && (
                <div>
                  <span className="text-xs sm:text-sm text-gray-600">Duration:</span>
                  <p className="text-sm font-medium">{booking.duration}</p>
                </div>
              )}
              <div>
                <span className="text-xs sm:text-sm text-gray-600">Status:</span>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ml-2 ${
                  booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {booking.status}
                </span>
              </div>
            </div>
          </div>

          {booking.notes && (
            <div>
              <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">Notes</h4>
              <p className="text-xs sm:text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{booking.notes}</p>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;