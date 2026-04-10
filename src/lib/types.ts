export interface Feed {
  id: string;
  source: string;
  category: "startup" | "ai_tech";
  title: string;
  url: string;
  published_at: string;
  tags: string[];
  summary: string;
}

export interface MacroIndicator {
  id: string;
  label: string;
  value: string;
  change: string;
  status: "up" | "down" | "stable";
  category: string;
  sparkline: number[];
  updated_at: string;
}

export interface KPI {
  id: string;
  label: string;
  value: string;
  change: number;
  icon: string;
  sparkline: number[];
  updated_at: string;
}

export interface MonitorEvent {
  id: string;
  date_label: string;
  title: string;
  type: "CONF" | "SUMMIT" | "DEADLINE" | "MEETUP";
  is_hot: boolean;
  event_date: string;
  url: string;
}

export interface CountryIndex {
  id: string;
  country: string;
  flag: string;
  score: number;
  trend: "up" | "down" | "stable";
  economy: number;
  stability: number;
  tech: number;
  regulatory: number;
}

export interface RegulatorySignal {
  id: string;
  zone: string;
  signal_name: string;
  level: "HIGH" | "MEDIUM" | "LOW";
  description: string;
  updated_at: string;
}

export interface Note {
  id: string;
  text: string;
  created_at: string;
}

export interface Channel {
  name: string;
  channelId: string;
  color: string;
}

export interface FundingData {
  month: string;
  amount: number;
}

export interface HealthMetric {
  label: string;
  value: number;
  max: number;
  color: string;
}
