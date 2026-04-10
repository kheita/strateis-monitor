-- Strateis Monitor: StrateisOS Module Tables
-- Migration 002

-- ============================================
-- CONSULTING PROJECTS
-- ============================================
CREATE TABLE IF NOT EXISTS consulting_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  client TEXT,
  score INTEGER,
  status TEXT CHECK (status IN ('prospect','active','completed','lost')),
  offer_type TEXT,
  price_fcfa BIGINT,
  scores NUMERIC[] DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE consulting_projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Auth users read consulting" ON consulting_projects FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Auth users write consulting" ON consulting_projects FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- IDEELAB ANALYTICS
-- ============================================
CREATE TABLE IF NOT EXISTS ideelab_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric TEXT NOT NULL,
  value NUMERIC NOT NULL,
  period TEXT,
  recorded_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE ideelab_analytics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read ideelab" ON ideelab_analytics FOR SELECT USING (true);
CREATE POLICY "Auth write ideelab" ON ideelab_analytics FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- OPS TASKS
-- ============================================
CREATE TABLE IF NOT EXISTS ops_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('todo','in_progress','done')) DEFAULT 'todo',
  priority TEXT CHECK (priority IN ('low','medium','high','urgent')) DEFAULT 'medium',
  due_date DATE,
  assigned_to TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE ops_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Auth users read tasks" ON ops_tasks FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Auth users write tasks" ON ops_tasks FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- EDITORIAL CALENDAR
-- ============================================
CREATE TABLE IF NOT EXISTS editorial_calendar (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  platform TEXT CHECK (platform IN ('linkedin','twitter','blog','newsletter')),
  scheduled_date DATE,
  status TEXT CHECK (status IN ('draft','scheduled','published')) DEFAULT 'draft',
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE editorial_calendar ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Auth users read calendar" ON editorial_calendar FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Auth users write calendar" ON editorial_calendar FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- CONTENT POSTS
-- ============================================
CREATE TABLE IF NOT EXISTS content_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  theme TEXT NOT NULL,
  tone TEXT NOT NULL,
  format TEXT NOT NULL,
  topic TEXT,
  generated_content TEXT,
  platform TEXT DEFAULT 'linkedin',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE content_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Auth users read posts" ON content_posts FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Auth users write posts" ON content_posts FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- FRAMEWORK ANALYSES
-- ============================================
CREATE TABLE IF NOT EXISTS framework_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  framework TEXT CHECK (framework IN ('orbiscore','neurospark','helixops','kpro')),
  client TEXT,
  data JSONB,
  score INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE framework_analyses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Auth users read frameworks" ON framework_analyses FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Auth users write frameworks" ON framework_analyses FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- AUTO-UPDATE TRIGGERS
-- ============================================
CREATE TRIGGER trg_consulting_updated BEFORE UPDATE ON consulting_projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_tasks_updated BEFORE UPDATE ON ops_tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
