-- Create textbausteine table
CREATE TABLE IF NOT EXISTS textbausteine (
  id BIGSERIAL PRIMARY KEY,
  textbaustein TEXT NOT NULL,
  keywords TEXT[] NOT NULL DEFAULT '{}',
  topic TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE textbausteine ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust based on your auth requirements)
CREATE POLICY "Allow all operations on textbausteine" ON textbausteine
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_textbausteine_keywords ON textbausteine USING GIN (keywords);
CREATE INDEX IF NOT EXISTS idx_textbausteine_created_at ON textbausteine (created_at DESC);
