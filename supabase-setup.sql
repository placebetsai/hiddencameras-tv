-- Run this in your Supabase SQL Editor at:
-- https://supabase.com/dashboard/project/ababarvluvlxukieireh/sql/new

-- Public cam submissions (user-submitted live cams for the directory)
CREATE TABLE IF NOT EXISTS cam_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  city TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT '',
  label TEXT NOT NULL,
  stream_url TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'City',
  user_email TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  views INT NOT NULL DEFAULT 0
);

-- Private cam sharing (users upload their own cam links)
CREATE TABLE IF NOT EXISTS private_cams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  stream_url TEXT NOT NULL,
  is_public BOOLEAN NOT NULL DEFAULT FALSE,
  share_token TEXT UNIQUE DEFAULT gen_random_uuid()::TEXT,
  cam_type TEXT NOT NULL DEFAULT 'home',
  last_active TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE cam_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE private_cams ENABLE ROW LEVEL SECURITY;

-- Policies: cam_submissions
CREATE POLICY "Anyone can submit a cam"
  ON cam_submissions FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view approved cams"
  ON cam_submissions FOR SELECT USING (status = 'approved');

-- Policies: private_cams
CREATE POLICY "Users manage own cams"
  ON private_cams FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view public cams"
  ON private_cams FOR SELECT USING (is_public = true);

-- Increment views safely
CREATE OR REPLACE FUNCTION increment_cam_views(cam_id UUID)
RETURNS VOID AS $$
  UPDATE cam_submissions SET views = views + 1 WHERE id = cam_id;
$$ LANGUAGE sql SECURITY DEFINER;
