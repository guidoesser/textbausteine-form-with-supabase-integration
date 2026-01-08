/*
  # Create textbausteine table
  
  1. New Tables
    - `textbausteine`
      - `id` (bigserial, primary key)
      - `textbaustein` (text, required)
      - `keywords` (text array, required)
      - `topic` (text, required)
      - `created_at` (timestamptz, default now)
  
  2. Security
    - Enable RLS on `textbausteine` table
    - Add policy for all operations (public access)
  
  3. Performance
    - Add GIN index on keywords for efficient array searches
    - Add index on created_at for sorting
*/

-- Create textbausteine table
CREATE TABLE IF NOT EXISTS textbausteine (
  id BIGSERIAL PRIMARY KEY,
  textbaustein TEXT NOT NULL,
  keywords TEXT[] NOT NULL DEFAULT '{}',
  topic TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE textbausteine ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations
CREATE POLICY "Allow all operations on textbausteine" ON textbausteine
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_textbausteine_keywords ON textbausteine USING GIN (keywords);
CREATE INDEX IF NOT EXISTS idx_textbausteine_created_at ON textbausteine (created_at DESC);