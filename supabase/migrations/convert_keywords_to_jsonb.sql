/*
  # Convert keywords column from TEXT[] to JSONB
  
  1. Changes
    - Drop existing keywords column (TEXT[])
    - Add new keywords column as JSONB
    - Update GIN index for JSONB
  
  2. Data Migration
    - Existing data will be lost (table should be empty or test data only)
    - If production data exists, manual migration needed
*/

-- Drop the old GIN index
DROP INDEX IF EXISTS idx_textbausteine_keywords;

-- Drop and recreate keywords column as JSONB
ALTER TABLE textbausteine 
  DROP COLUMN IF EXISTS keywords;

ALTER TABLE textbausteine 
  ADD COLUMN keywords JSONB NOT NULL DEFAULT '[]'::jsonb;

-- Create GIN index for JSONB (supports @>, ?, ?&, ?| operators)
CREATE INDEX idx_textbausteine_keywords ON textbausteine USING GIN (keywords);

-- Add check constraint to ensure keywords is always an array
ALTER TABLE textbausteine
  ADD CONSTRAINT keywords_is_array CHECK (jsonb_typeof(keywords) = 'array');