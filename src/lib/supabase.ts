import { createClient } from '@supabase/supabase-js';

export interface Vehicle {
  id: string;
  name: string;
  model: string;
  type: 'sedan' | 'suv' | 'hatchback' | 'luxury';
  price_per_day: number;
  passengers: number;
  features: string[];
  image_url: string | null;
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
  vehicles?: Vehicle; // Joined vehicle data
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  pickup_date: string;
  pickup_time: string;
  pickup_location: string;
  dropoff_location: string | null;
  passengers: number;
  duration: string | null;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  total_price: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// Basic API client for Supabase tables
class SupabaseAPI<T> {
  private tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  private getClient() {
    console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
    console.log('Supabase Anon Key:', import.meta.env.VITE_SUPABASE_ANON_KEY);
    return createClient(
      import.meta.env.VITE_SUPABASE_URL! || '',
      import.meta.env.VITE_SUPABASE_ANON_KEY! || ''
    );
  }

  async getAll(): Promise<T[]> {
    const { data, error } = await this.getClient().from(this.tableName).select('*');
    if (error) throw error;
    return data as T[];
  }

  async getById(id: string): Promise<T | null> {
    const { data, error } = await this.getClient().from(this.tableName).select('*').eq('id', id).single();
    if (error) throw error;
    return data as T | null;
  }

  async create(data: Omit<T, 'id' | 'created_at' | 'updated_at'>): Promise<T> {
    // Supabase insert returns an array of the inserted row(s)
    const { data: newData, error } = await this.getClient().from(this.tableName).insert(data as any).select().single();
    if (error) throw error;
    return newData as T;
  }

  async update(id: string, data: Partial<Omit<T, 'id' | 'created_at'>>): Promise<T> {
    const { data: updatedData, error } = await this.getClient().from(this.tableName).update(data as any).eq('id', id).select().single();
    if (error) throw error;
    return updatedData as T;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.getClient().from(this.tableName).delete().eq('id', id);
    if (error) throw error;
  }
}

export const vehicleAPI = new SupabaseAPI<Vehicle>('vehicles');
export const bookingAPI = new SupabaseAPI<Booking>('bookings');
export const availabilityAPI = new SupabaseAPI<any>('availability_calendar'); // Define a proper type for Availability if needed 