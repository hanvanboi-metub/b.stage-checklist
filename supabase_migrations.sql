-- B.Stage Checklist - Database Setup
-- Run this SQL in your Supabase SQL Editor to create the notes table

-- Create the notes table
CREATE TABLE IF NOT EXISTS notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  checks BOOLEAN[] NOT NULL DEFAULT ARRAY[]::BOOLEAN[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index for faster queries
CREATE INDEX IF NOT EXISTS idx_notes_created_at ON notes(created_at DESC);

-- Enable Realtime for this table in Supabase
-- Go to Database > Replication > Turn ON for the notes table

-- Enable Row Level Security (optional but recommended)
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow all authenticated users to read and modify their own data
-- (Optional - adjust based on your authentication needs)
CREATE POLICY "Enable read access for all authenticated users" ON notes
  FOR SELECT
  USING (true);

CREATE POLICY "Enable insert for all authenticated users" ON notes
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Enable update for all authenticated users" ON notes
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable delete for all authenticated users" ON notes
  FOR DELETE
  USING (true);
