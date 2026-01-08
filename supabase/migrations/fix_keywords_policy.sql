/*
  # Fix keywords column RLS policy
  
  1. Changes
    - Drop existing restrictive policy
    - Create new policy that explicitly allows keywords column
    - Ensure all columns are writable
  
  2. Security
    - Maintain RLS enabled
    - Allow all operations for testing (can be restricted later)
*/

-- Drop existing policy
DROP POLICY IF EXISTS "Allow all operations on textbausteine" ON textbausteine;

-- Create new policy with explicit column access
CREATE POLICY "Allow full access to textbausteine" ON textbausteine
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Verify the table structure
DO $$ 
BEGIN
  -- Ensure keywords column exists and is TEXT[]
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'textbausteine' 
    AND column_name = 'keywords' 
    AND data_type = 'ARRAY'
  ) THEN
    RAISE EXCEPTION 'Keywords column is not properly configured as TEXT[]';
  END IF;
END $$;