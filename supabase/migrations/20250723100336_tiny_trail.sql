/*
  # Admin Dashboard System for Heritage Rides

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
    - Add policies for authenticated users (admin access)
    - Public read access for vehicles and availability
    - Authenticated write access for bookings

  3. Functions
    - Function to check vehicle availability
    - Function to update availability after booking
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

-- Enable RLS
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_calendar ENABLE ROW LEVEL SECURITY;

-- Policies for vehicles (public read, authenticated write)
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

-- Policies for bookings (authenticated read/write)
CREATE POLICY "Authenticated users can view bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can create bookings"
  ON bookings
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (true);

-- Policies for availability calendar (public read, authenticated write)
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

-- Function to check vehicle availability
CREATE OR REPLACE FUNCTION check_vehicle_availability(
  p_vehicle_id uuid,
  p_date date
)
RETURNS integer
LANGUAGE plpgsql
AS $$
DECLARE
  v_available_count integer;
  v_total_count integer;
  v_booked_count integer;
BEGIN
  -- Get vehicle total count
  SELECT total_count INTO v_total_count
  FROM vehicles
  WHERE id = p_vehicle_id;
  
  -- Get booked count for the date
  SELECT COALESCE(COUNT(*), 0) INTO v_booked_count
  FROM bookings
  WHERE vehicle_id = p_vehicle_id
    AND pickup_date = p_date
    AND status IN ('confirmed', 'pending');
  
  -- Calculate available count
  v_available_count := v_total_count - v_booked_count;
  
  -- Ensure availability calendar entry exists
  INSERT INTO availability_calendar (vehicle_id, date, available_count, booked_count)
  VALUES (p_vehicle_id, p_date, v_available_count, v_booked_count)
  ON CONFLICT (vehicle_id, date)
  DO UPDATE SET
    available_count = v_available_count,
    booked_count = v_booked_count,
    updated_at = now();
  
  RETURN GREATEST(v_available_count, 0);
END;
$$;

-- Function to update availability after booking
CREATE OR REPLACE FUNCTION update_availability_after_booking()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  -- Update availability for the booking date
  PERFORM check_vehicle_availability(NEW.vehicle_id, NEW.pickup_date);
  
  RETURN NEW;
END;
$$;

-- Trigger to update availability after booking changes
CREATE OR REPLACE TRIGGER update_availability_trigger
  AFTER INSERT OR UPDATE OR DELETE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_availability_after_booking();

-- Insert sample vehicles
INSERT INTO vehicles (name, model, type, price_per_day, passengers, features, image_url, total_count, available_count) VALUES
('Royal Sedan', 'Toyota Camry Hybrid', 'sedan', 2500, 4, ARRAY['Premium AC', 'GPS Navigation', 'WiFi Hotspot', 'Premium Sound', 'Leather Seats', 'Phone Charger'], 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800', 2, 2),
('Heritage SUV', 'Toyota Fortuner 4WD', 'suv', 3200, 7, ARRAY['Dual AC', 'GPS Navigation', '4WD System', 'Spacious Luggage', 'Captain Seats', 'Entertainment System'], 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=800', 1, 1);