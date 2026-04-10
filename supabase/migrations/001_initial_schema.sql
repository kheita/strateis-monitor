-- Strateis Monitor: Initial Schema
-- Project: ajmfiddqmjhsrqynwpkg (West EU London)

-- ============================================
-- 1. FEEDS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS feeds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('startup', 'ai_tech')),
  title TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  published_at TIMESTAMPTZ,
  tags TEXT[] DEFAULT '{}',
  summary TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_feeds_category ON feeds(category);
CREATE INDEX idx_feeds_published_at ON feeds(published_at DESC);

-- ============================================
-- 2. MACRO INDICATORS
-- ============================================
CREATE TABLE IF NOT EXISTS macro_indicators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  change TEXT,
  status TEXT CHECK (status IN ('up', 'down', 'stable')),
  category TEXT DEFAULT 'commodity',
  sparkline_data NUMERIC[] DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 3. MONITOR KPIs
-- ============================================
CREATE TABLE IF NOT EXISTS monitor_kpis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  change NUMERIC DEFAULT 0,
  icon TEXT,
  sparkline_data NUMERIC[] DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 4. MONITOR EVENTS
-- ============================================
CREATE TABLE IF NOT EXISTS monitor_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date_label TEXT NOT NULL,
  title TEXT NOT NULL,
  type TEXT CHECK (type IN ('CONF', 'SUMMIT', 'DEADLINE', 'MEETUP')),
  is_hot BOOLEAN DEFAULT false,
  event_date DATE,
  url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_events_date ON monitor_events(event_date);

-- ============================================
-- 5. COUNTRY INDEX
-- ============================================
CREATE TABLE IF NOT EXISTS country_index (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country TEXT NOT NULL,
  flag TEXT,
  score INTEGER,
  trend TEXT CHECK (trend IN ('up', 'down', 'stable')),
  economy INTEGER,
  stability INTEGER,
  tech INTEGER,
  regulatory INTEGER,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 6. REGULATORY SIGNALS
-- ============================================
CREATE TABLE IF NOT EXISTS regulatory_signals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  zone TEXT NOT NULL,
  signal_name TEXT NOT NULL,
  level TEXT CHECK (level IN ('HIGH', 'MEDIUM', 'LOW')),
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 7. MONITOR NOTES
-- ============================================
CREATE TABLE IF NOT EXISTS monitor_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_notes_user ON monitor_notes(user_id);
CREATE INDEX idx_notes_created ON monitor_notes(created_at DESC);

-- ============================================
-- AUTO-UPDATE TRIGGERS
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_feeds_updated BEFORE UPDATE ON feeds
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_macro_updated BEFORE UPDATE ON macro_indicators
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_kpis_updated BEFORE UPDATE ON monitor_kpis
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_country_updated BEFORE UPDATE ON country_index
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_regulatory_updated BEFORE UPDATE ON regulatory_signals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE feeds ENABLE ROW LEVEL SECURITY;
ALTER TABLE macro_indicators ENABLE ROW LEVEL SECURITY;
ALTER TABLE monitor_kpis ENABLE ROW LEVEL SECURITY;
ALTER TABLE monitor_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE country_index ENABLE ROW LEVEL SECURITY;
ALTER TABLE regulatory_signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE monitor_notes ENABLE ROW LEVEL SECURITY;

-- Public read access for data tables
CREATE POLICY "Public read feeds" ON feeds FOR SELECT USING (true);
CREATE POLICY "Public read macro" ON macro_indicators FOR SELECT USING (true);
CREATE POLICY "Public read kpis" ON monitor_kpis FOR SELECT USING (true);
CREATE POLICY "Public read events" ON monitor_events FOR SELECT USING (true);
CREATE POLICY "Public read countries" ON country_index FOR SELECT USING (true);
CREATE POLICY "Public read regulatory" ON regulatory_signals FOR SELECT USING (true);

-- Notes: authenticated users CRUD their own
CREATE POLICY "Users read own notes" ON monitor_notes
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own notes" ON monitor_notes
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own notes" ON monitor_notes
  FOR DELETE USING (auth.uid() = user_id);

-- Service role can write to all tables (for edge functions)
CREATE POLICY "Service write feeds" ON feeds
  FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service write macro" ON macro_indicators
  FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service write kpis" ON monitor_kpis
  FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service write events" ON monitor_events
  FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service write countries" ON country_index
  FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service write regulatory" ON regulatory_signals
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- SEED DATA
-- ============================================

-- Macro Indicators
INSERT INTO macro_indicators (label, value, change, status, category, sparkline_data) VALUES
  ('Taux BCEAO', '3.50%', '+0.00', 'stable', 'rate', ARRAY[3.5,3.5,3.5,3.5,3.5,3.5,3.5,3.5,3.5,3.5,3.5,3.5]),
  ('Inflation UEMOA', '3.2%', '-0.3', 'down', 'rate', ARRAY[4.1,3.9,3.8,3.7,3.6,3.5,3.5,3.4,3.3,3.3,3.2,3.2]),
  ('Cacao CIF', '$8,942', '+2.4%', 'up', 'commodity', ARRAY[7200,7400,7600,7800,8000,8200,8400,8500,8600,8700,8800,8942]),
  ('Or XAU', '$3,089', '+1.1%', 'up', 'commodity', ARRAY[2800,2850,2900,2920,2960,2980,3000,3020,3040,3060,3075,3089]),
  ('Brent', '$96.85', '-0.8%', 'down', 'commodity', ARRAY[92,93,94,95,96,97,98,97.5,97,96.5,97,96.85]),
  ('EUR/XOF', '655.96', '+0.00', 'stable', 'forex', ARRAY[655.96,655.96,655.96,655.96,655.96,655.96,655.96,655.96,655.96,655.96,655.96,655.96]),
  ('USD/XOF', '602.14', '-0.3%', 'down', 'forex', ARRAY[610,608,607,606,605,604,604,603,603,602.5,602.3,602.14]),
  ('BTC', '$72,731', '+3.2%', 'up', 'crypto', ARRAY[62000,63500,65000,64000,66000,67500,68000,69000,70000,71000,72000,72731]);

-- KPIs
INSERT INTO monitor_kpis (label, value, change, icon, sparkline_data) VALUES
  ('GDP Growth (Africa Avg)', '3.8%', 0.4, '📈', ARRAY[3.1,3.2,3.0,3.3,3.5,3.4,3.6,3.5,3.7,3.6,3.8,3.8]),
  ('FDI Inflows (B$)', '$48.2B', 2.1, '💰', ARRAY[38,40,42,41,44,43,45,44,46,47,48,48.2]),
  ('Active Startups', '5,847', 12.3, '🚀', ARRAY[4200,4400,4500,4700,4900,5000,5100,5300,5400,5600,5700,5847]),
  ('Tech Talent Pool', '714K', 8.6, '👩‍💻', ARRAY[520,540,570,590,610,630,650,670,680,695,705,714]),
  ('Funding Rounds (Q1)', '287', -3.2, '🎯', ARRAY[320,310,295,305,290,285,300,295,288,290,285,287]),
  ('Digital Adoption', '38.4%', 5.1, '📱', ARRAY[28,29.5,30.2,31.8,32.5,33.4,34.6,35.2,36.1,37.0,37.8,38.4]);

-- Events
INSERT INTO monitor_events (date_label, title, type, is_hot, event_date) VALUES
  ('APR 14-16', 'AfricArena Summit — Cape Town', 'SUMMIT', true, '2026-04-14'),
  ('APR 18', 'UEMOA Fintech Regulatory Review', 'DEADLINE', true, '2026-04-18'),
  ('APR 22-23', 'Lagos Tech Week Satellite Event', 'CONF', false, '2026-04-22'),
  ('APR 25', 'Nairobi AI/ML Meetup #42', 'MEETUP', false, '2026-04-25'),
  ('MAY 1-3', 'Africa Fintech Festival — Kigali', 'SUMMIT', true, '2026-05-01'),
  ('MAY 8', 'BCEAO Q1 Monetary Policy Report', 'DEADLINE', false, '2026-05-08'),
  ('MAY 12-14', 'Google for Africa Developer Conference', 'CONF', true, '2026-05-12'),
  ('MAY 20', 'Strateis Quarterly Review', 'DEADLINE', false, '2026-05-20');

-- Country Index
INSERT INTO country_index (country, flag, score, trend, economy, stability, tech, regulatory) VALUES
  ('Nigeria', '🇳🇬', 72, 'up', 78, 55, 82, 65),
  ('Kenya', '🇰🇪', 74, 'up', 70, 68, 85, 72),
  ('South Africa', '🇿🇦', 71, 'stable', 65, 62, 80, 78),
  ('Egypt', '🇪🇬', 68, 'up', 72, 58, 75, 62),
  ('Rwanda', '🇷🇼', 76, 'up', 68, 82, 78, 80),
  ('Ghana', '🇬🇭', 65, 'stable', 62, 70, 68, 60),
  ('Senegal', '🇸🇳', 67, 'up', 65, 72, 64, 68),
  ('Morocco', '🇲🇦', 70, 'stable', 74, 72, 70, 65),
  ('Tanzania', '🇹🇿', 58, 'up', 60, 65, 52, 55),
  ('Ethiopia', '🇪🇹', 55, 'up', 62, 42, 58, 50);

-- Regulatory Signals
INSERT INTO regulatory_signals (zone, signal_name, level, description) VALUES
  ('UEMOA', 'Mobile Money Licensing Reform', 'HIGH', 'New licensing framework for e-money issuers. Compliance deadline: June 2026.'),
  ('Nigeria', 'Digital Asset Regulation', 'HIGH', 'SEC Nigeria finalizing crypto exchange regulation. Expected Q2 2026.'),
  ('Kenya', 'Data Protection Act Enforcement', 'MEDIUM', 'ODPC increasing enforcement actions. 15 companies fined in Q1.'),
  ('South Africa', 'POPIA Compliance Wave', 'MEDIUM', 'Regulator targeting fintech sector for data protection compliance.'),
  ('EAC', 'Cross-Border Payment Harmonization', 'LOW', 'EAC central banks align on interoperability standards.'),
  ('CEMAC', 'Startup Act Discussion', 'LOW', 'CEMAC exploring unified startup legislation. Early consultation phase.');
