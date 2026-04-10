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
  { name: "FRANCE 24 FR", channelId: "UCCCPCZNChQdGa9EkATeye4g", color: "#3B82F6" },
  { name: "AFRICA 24", channelId: "UChjrJe5MRpFJP3QwVJLDKqQ", color: "#F59E0B" },
  { name: "BLOOMBERG", channelId: "UCIALMKvObZNtJ68-rmLjb5A", color: "#EF4444" },
  { name: "ALJAZEERA EN", channelId: "UCNye-wNBqNL5ZzHSJj3l8Bg", color: "#D4A853" },
  { name: "CNBC", channelId: "UCvJJ_dzjViJCoLf5uKUTwoA", color: "#22C55E" },
  { name: "DW NEWS", channelId: "UCknLrEdhRCp1aegoMqRaCZg", color: "#06B6D4" },
  { name: "EURONEWS", channelId: "UCW2QcKZiU8aUGg4yxCIditg", color: "#A78BFA" },
  { name: "TRT WORLD", channelId: "UC7fWeaHhqgM4Lba7jesYrUg", color: "#EC4899" },
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
