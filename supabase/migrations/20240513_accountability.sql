-- Create accountability_buddies table
CREATE TABLE accountability_buddies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  buddy_email TEXT NOT NULL,
  buddy_name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create accountability_pacts table
CREATE TABLE accountability_pacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  buddy_id UUID REFERENCES accountability_buddies(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  deadline TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create weekly_reports table
CREATE TABLE weekly_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  buddy_id UUID REFERENCES accountability_buddies(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  week_start DATE NOT NULL,
  week_end DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE accountability_buddies ENABLE ROW LEVEL SECURITY;
ALTER TABLE accountability_pacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_reports ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for accountability_buddies
CREATE POLICY "Users can view their own buddies"
  ON accountability_buddies FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own buddies"
  ON accountability_buddies FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own buddies"
  ON accountability_buddies FOR UPDATE
  USING (auth.uid() = user_id);

-- Create RLS policies for accountability_pacts
CREATE POLICY "Users can view their own pacts"
  ON accountability_pacts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own pacts"
  ON accountability_pacts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pacts"
  ON accountability_pacts FOR UPDATE
  USING (auth.uid() = user_id);

-- Create RLS policies for weekly_reports
CREATE POLICY "Users can view their own reports"
  ON weekly_reports FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own reports"
  ON weekly_reports FOR INSERT
  WITH CHECK (auth.uid() = user_id); 