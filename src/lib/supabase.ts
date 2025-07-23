import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface Vehicle {
  id: string;
  name: string;
  model: string;
  type: string;
  price_per_day: number;
  passengers: number;
  features: string[];
  image_url?: string;
  is_available: boolean;
  total_count: number;
  available_count: number;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  service_type: string;
  vehicle_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  pickup_date: string;
  pickup_time: string;
  pickup_location: string;
  dropoff_location?: string;
  passengers: number;
  duration?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  total_price?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
  vehicles?: Vehicle;
}

export interface AvailabilityCalendar {
  id: string;
  vehicle_id: string;
  date: string;
  available_count: number;
  booked_count: number;
  blocked_count: number;
  created_at: string;
  updated_at: string;
}

// API Functions
export const vehicleAPI = {
  getAll: async (): Promise<Vehicle[]> => {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  getById: async (id: string): Promise<Vehicle | null> => {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  create: async (vehicle: Omit<Vehicle, 'id' | 'created_at' | 'updated_at'>): Promise<Vehicle> => {
    const { data, error } = await supabase
      .from('vehicles')
      .insert(vehicle)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  update: async (id: string, updates: Partial<Vehicle>): Promise<Vehicle> => {
    const { data, error } = await supabase
      .from('vehicles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('vehicles')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  checkAvailability: async (vehicleId: string, date: string): Promise<number> => {
    const { data, error } = await supabase
      .rpc('check_vehicle_availability', {
        p_vehicle_id: vehicleId,
        p_date: date
      });
    
    if (error) throw error;
    return data || 0;
  }
};

export const bookingAPI = {
  getAll: async (): Promise<Booking[]> => {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        vehicles (
          name,
          model,
          type
        )
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  getById: async (id: string): Promise<Booking | null> => {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        vehicles (
          name,
          model,
          type
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  create: async (booking: Omit<Booking, 'id' | 'created_at' | 'updated_at' | 'vehicles'>): Promise<Booking> => {
    const { data, error } = await supabase
      .from('bookings')
      .insert(booking)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  update: async (id: string, updates: Partial<Booking>): Promise<Booking> => {
    const { data, error } = await supabase
      .from('bookings')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

export const availabilityAPI = {
  getByVehicleAndDateRange: async (vehicleId: string, startDate: string, endDate: string): Promise<AvailabilityCalendar[]> => {
    const { data, error } = await supabase
      .from('availability_calendar')
      .select('*')
      .eq('vehicle_id', vehicleId)
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  updateAvailability: async (vehicleId: string, date: string, updates: Partial<AvailabilityCalendar>): Promise<AvailabilityCalendar> => {
    const { data, error } = await supabase
      .from('availability_calendar')
      .upsert({
        vehicle_id: vehicleId,
        date,
        ...updates,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};