-- Run this in your Supabase SQL editor (https://supabase.com → SQL Editor)
-- Creates the submitted_cams table with moderation queue

CREATE TABLE IF NOT EXISTS submitted_cams (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now() NOT NULL,
  label text NOT NULL,
  city text NOT NULL,
  country text DEFAULT '',
  continent text DEFAULT 'Other',
  stream_url text NOT NULL,
  cam_type text DEFAULT 'City',
  status text DEFAULT 'pending',
  submitter_email text DEFAULT '',
  yt_id text DEFAULT '',
  flag text DEFAULT '🌍',
  reviewed_at timestamptz
);

-- Enable Row Level Security
ALTER TABLE submitted_cams ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running this script
DROP POLICY IF EXISTS "Public can submit cams" ON submitted_cams;
DROP POLICY IF EXISTS "Public can view approved cams" ON submitted_cams;
DROP POLICY IF EXISTS "Admin can view all" ON submitted_cams;
DROP POLICY IF EXISTS "Admin can update" ON submitted_cams;
DROP POLICY IF EXISTS "Admin can delete" ON submitted_cams;

-- Anyone (anonymous visitors) can submit
CREATE POLICY "Public can submit cams" ON submitted_cams
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Anonymous visitors only see approved cams
CREATE POLICY "Public can view approved cams" ON submitted_cams
  FOR SELECT TO anon USING (status = 'approved');

-- Logged-in admin sees all submissions
CREATE POLICY "Admin can view all" ON submitted_cams
  FOR SELECT TO authenticated USING (true);

-- Admin can approve / reject
CREATE POLICY "Admin can update" ON submitted_cams
  FOR UPDATE TO authenticated USING (true);

-- Admin can delete spam
CREATE POLICY "Admin can delete" ON submitted_cams
  FOR DELETE TO authenticated USING (true);
