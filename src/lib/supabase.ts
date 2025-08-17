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

  // This would typically use a Supabase client, which needs to be initialized.
  // For now, we'll use placeholder functions.
  // In a real app, you'd import and use 'createClient' from '@supabase/supabase-js'.

  private getClient() {
    const mockQuery = (data: any[] = []) => ({
      data,
      error: null,
      select: (columns: string = '*') => {
        console.warn(`Placeholder: Selecting ${columns}`);
        return mockQuery(data);
      },
      insert: (newData: any) => {
        console.warn("Placeholder: Inserting", newData);
        return mockQuery([...data, newData]);
      },
      update: (updateData: any) => {
        console.warn("Placeholder: Updating", updateData);
        return mockQuery(data.map(item => item.id === updateData.id ? { ...item, ...updateData } : item));
      },
      delete: () => {
        console.warn("Placeholder: Deleting");
        return mockQuery([]);
      },
      eq: (column: string, value: any) => {
        console.warn(`Placeholder: Filtering by ${column} = ${value}`);
        return mockQuery(data.filter(item => item[column] === value));
      },
      // Added .single() to handle cases where a single result is expected
      single: () => {
        console.warn("Placeholder: Fetching single result");
        return Promise.resolve({ data: data[0] || null, error: null });
      }
    });

    return {
      from: (tableName: string) => {
        console.warn(`Placeholder: Accessing table ${tableName}`);
        // In a real scenario, this would interact with a database.
        // For now, it returns a mock query builder.
        return mockQuery();
      }
    };
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