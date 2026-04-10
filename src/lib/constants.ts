import type { Channel } from "./types";

export const COLORS = {
  bgDeep: "#060B14",
  bgPanel: "#0B1121",
  bgCard: "#0F172A",
  border: "#1E293B",
  text: "#E2E8F0",
  textDim: "#94A3B8",
  gold: "#D4A853",
  goldDim: "#C5952A",
  red: "#EF4444",
  green: "#22C55E",
  orange: "#F59E0B",
  blue: "#3B82F6",
  cyan: "#06B6D4",
  purple: "#A78BFA",
  pink: "#EC4899",
} as const;

export const CHANNELS: Channel[] = [
  { name: "AFRICA 24", embedUrl: "https://www.youtube.com/embed/live_stream?channel=UChjrJe5MRpFJP3QwVJLDKqQ", color: "#F59E0B" },
  { name: "FRANCE 24", embedUrl: "https://www.youtube.com/embed/live_stream?channel=UCCCPCZNChQdGa9EkATeye4g", color: "#3B82F6" },
  { name: "BLOOMBERG", embedUrl: "https://www.youtube.com/embed/live_stream?channel=UCIALMKvObZNtJ68-rmLjb5A", color: "#EF4444" },
  { name: "CNBC", embedUrl: "https://www.youtube.com/embed/live_stream?channel=UCvJJ_dzjViJCoLf5uKUTwoA", color: "#22C55E" },
  { name: "ALJAZEERA", embedUrl: "https://www.youtube.com/embed/live_stream?channel=UCNye-wNBqNL5ZzHSJj3l8Bg", color: "#D4A853" },
  { name: "BBC AFRICA", embedUrl: "https://www.youtube.com/embed/live_stream?channel=UCfwJiDW9WrbqSBMPLq2pLMg", color: "#EC4899" },
  { name: "RFI", embedUrl: "https://www.youtube.com/embed/live_stream?channel=UCt1CUn9bRLBMGeS-PfUmjPA", color: "#A78BFA" },
  { name: "TV5MONDE", embedUrl: "https://www.youtube.com/embed/live_stream?channel=UCx-xzbnsp4DxsQFFkHJVs5Q", color: "#06B6D4" },
];

export const EVENT_TYPE_COLORS: Record<string, string> = {
  CONF: COLORS.blue,
  SUMMIT: COLORS.gold,
  DEADLINE: COLORS.red,
  MEETUP: COLORS.green,
};

export const LEVEL_COLORS: Record<string, string> = {
  HIGH: COLORS.red,
  MEDIUM: COLORS.orange,
  LOW: COLORS.green,
};
