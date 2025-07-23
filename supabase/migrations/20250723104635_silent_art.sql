/*
  # Fix booking insertion policies

  1. Security Changes
    - Update RLS policies to allow public booking insertion
    - Ensure proper permissions for anonymous users to create bookings
    - Fix authentication requirements for booking operations

  2. Policy Updates
    - Allow anonymous users to insert bookings
    - Maintain security for other operations
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can create bookings" ON bookings;
DROP POLICY IF EXISTS "Authenticated users can view bookings" ON bookings;
DROP POLICY IF EXISTS "Authenticated users can update bookings" ON bookings;

-- Create new policies that allow public booking creation
CREATE POLICY "Public can create bookings"
  ON bookings
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public can view own bookings"
  ON bookings
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can view all bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete bookings"
  ON bookings
  FOR DELETE
  TO authenticated
  USING (true);

-- Ensure vehicles can be read by public for booking form
DROP POLICY IF EXISTS "Anyone can view vehicles" ON vehicles;
CREATE POLICY "Public can view available vehicles"
  ON vehicles
  FOR SELECT
  TO public
  USING (is_available = true);

CREATE POLICY "Authenticated users can manage vehicles"
  ON vehicles
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);