-- Create priorities table
CREATE TABLE priorities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  importance INTEGER NOT NULL CHECK (importance BETWEEN 1 AND 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create activities table
CREATE TABLE activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  priority_id UUID REFERENCES priorities(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  effort INTEGER NOT NULL CHECK (effort BETWEEN 1 AND 5),
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create consistency_scores table
CREATE TABLE consistency_scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  priority_id UUID REFERENCES priorities(id) ON DELETE CASCADE,
  score INTEGER NOT NULL CHECK (score BETWEEN 0 AND 100),
  week_start DATE NOT NULL,
  week_end DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create weekly_feedback table
CREATE TABLE weekly_feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  week_start DATE NOT NULL,
  week_end DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create RLS policies
ALTER TABLE priorities ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE consistency_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_feedback ENABLE ROW LEVEL SECURITY;

-- Policies for priorities
CREATE POLICY "Users can view their own priorities"
  ON priorities FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own priorities"
  ON priorities FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own priorities"
  ON priorities FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own priorities"
  ON priorities FOR DELETE
  USING (auth.uid() = user_id);

-- Policies for activities
CREATE POLICY "Users can view their own activities"
  ON activities FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own activities"
  ON activities FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own activities"
  ON activities FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own activities"
  ON activities FOR DELETE
  USING (auth.uid() = user_id);

-- Policies for consistency_scores
CREATE POLICY "Users can view their own consistency scores"
  ON consistency_scores FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own consistency scores"
  ON consistency_scores FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policies for weekly_feedback
CREATE POLICY "Users can view their own weekly feedback"
  ON weekly_feedback FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own weekly feedback"
  ON weekly_feedback FOR INSERT
  WITH CHECK (auth.uid() = user_id); 