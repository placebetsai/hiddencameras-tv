-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/ababarvluvlxukieireh/sql

CREATE TABLE IF NOT EXISTS private_cams (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now() NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text DEFAULT '',
  stream_url text NOT NULL,
  cam_type text DEFAULT 'home',
  is_public boolean DEFAULT false
);

ALTER TABLE private_cams ENABLE ROW LEVEL SECURITY;

-- Drop first so re-running this script never fails
DROP POLICY IF EXISTS "Users can view own cams" ON private_cams;
DROP POLICY IF EXISTS "Users can insert own cams" ON private_cams;
DROP POLICY IF EXISTS "Users can update own cams" ON private_cams;
DROP POLICY IF EXISTS "Users can delete own cams" ON private_cams;
DROP POLICY IF EXISTS "Public can view public cams" ON private_cams;

CREATE POLICY "Users can view own cams"   ON private_cams FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own cams" ON private_cams FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cams" ON private_cams FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own cams" ON private_cams FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Public can view public cams" ON private_cams FOR SELECT TO anon USING (is_public = true);
