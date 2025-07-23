/*
  # Heritage Rides Admin System

  1. New Tables
    - `vehicles`
      - `id` (uuid, primary key)
      - `name` (text)
      - `model` (text)
      - `type` (text)
      - `price_per_day` (integer)
      - `passengers` (integer)
      - `features` (text array)
      - `image_url` (text)
      - `is_available` (boolean)
      - `total_count` (integer)
      - `available_count` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `bookings`
      - `id` (uuid, primary key)
      - `service_type` (text)
      - `vehicle_id` (uuid, foreign key)
      - `customer_name` (text)
      - `customer_email` (text)
      - `customer_phone` (text)
      - `pickup_date` (date)
      - `pickup_time` (time)
      - `pickup_location` (text)
      - `dropoff_location` (text)
      - `passengers` (integer)
      - `duration` (text)
      - `status` (text)
      - `total_price` (integer)
      - `notes` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `availability_calendar`
      - `id` (uuid, primary key)
      - `vehicle_id` (uuid, foreign key)
      - `date` (date)
      - `available_count` (integer)
      - `booked_count` (integer)
      - `blocked_count` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage data
    - Add policies for public users to view vehicles and create bookings
*/

-- Create vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  model text NOT NULL,
  type text NOT NULL,
  price_per_day integer NOT NULL,
  passengers integer NOT NULL,
  features text[] DEFAULT '{}',
  image_url text,
  is_available boolean DEFAULT true,
  total_count integer DEFAULT 1,
  available_count integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_type text NOT NULL,
  vehicle_id uuid REFERENCES vehicles(id),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  pickup_date date NOT NULL,
  pickup_time time NOT NULL,
  pickup_location text NOT NULL,
  dropoff_location text,
  passengers integer NOT NULL,
  duration text,
  status text DEFAULT 'pending',
  total_price integer,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create availability calendar table
CREATE TABLE IF NOT EXISTS availability_calendar (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id uuid REFERENCES vehicles(id),
  date date NOT NULL,
  available_count integer DEFAULT 0,
  booked_count integer DEFAULT 0,
  blocked_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(vehicle_id, date)
);

-- Enable Row Level Security
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_calendar ENABLE ROW LEVEL SECURITY;

-- Create policies for vehicles
CREATE POLICY "Anyone can view vehicles"
  ON vehicles
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage vehicles"
  ON vehicles
  FOR ALL
  TO authenticated
  USING (true);

-- Create policies for bookings
CREATE POLICY "Anyone can create bookings"
  ON bookings
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create policies for availability calendar
CREATE POLICY "Anyone can view availability"
  ON availability_calendar
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage availability"
  ON availability_calendar
  FOR ALL
  TO authenticated
  USING (true);

-- Function to update availability after booking
CREATE OR REPLACE FUNCTION update_availability_after_booking()
RETURNS TRIGGER AS $$
BEGIN
  -- Update availability when booking is created or updated
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    INSERT INTO availability_calendar (vehicle_id, date, booked_count, available_count)
    VALUES (
      NEW.vehicle_id,
      NEW.pickup_date,
      1,
      (SELECT available_count - 1 FROM vehicles WHERE id = NEW.vehicle_id)
    )
    ON CONFLICT (vehicle_id, date)
    DO UPDATE SET
      booked_count = availability_calendar.booked_count + 1,
      available_count = GREATEST(0, availability_calendar.available_count - 1),
      updated_at = now();
    
    -- Update vehicle available count
    UPDATE vehicles
    SET available_count = GREATEST(0, available_count - 1),
        updated_at = now()
    WHERE id = NEW.vehicle_id;
  END IF;

  -- Restore availability when booking is deleted
  IF TG_OP = 'DELETE' THEN
    UPDATE availability_calendar
    SET booked_count = GREATEST(0, booked_count - 1),
        available_count = available_count + 1,
        updated_at = now()
    WHERE vehicle_id = OLD.vehicle_id AND date = OLD.pickup_date;
    
    UPDATE vehicles
    SET available_count = available_count + 1,
        updated_at = now()
    WHERE id = OLD.vehicle_id;
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create trigger for booking changes
DROP TRIGGER IF EXISTS update_availability_trigger ON bookings;
CREATE TRIGGER update_availability_trigger
  AFTER INSERT OR UPDATE OR DELETE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_availability_after_booking();

-- Insert sample vehicles
INSERT INTO vehicles (name, model, type, price_per_day, passengers, features, image_url, total_count, available_count) VALUES
('Royal Sedan', 'Toyota Camry Hybrid', 'sedan', 2500, 4, ARRAY['Premium AC', 'GPS Navigation', 'WiFi Hotspot', 'Premium Sound', 'Leather Seats', 'Phone Charger'], 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800', 2, 2),
('Heritage SUV', 'Toyota Fortuner 4WD', 'suv', 3200, 7, ARRAY['Dual AC', 'GPS Navigation', '4WD System', 'Spacious Luggage', 'Captain Seats', 'Entertainment System'], 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=800', 1, 1)
ON CONFLICT DO NOTHING;