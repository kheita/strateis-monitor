import type {
  Feed, MacroIndicator, KPI, MonitorEvent,
  CountryIndex, RegulatorySignal, Note, FundingData, HealthMetric,
} from "@/lib/types";

export const seedKpis: KPI[] = [
  { id: "1", label: "GDP Growth (Africa Avg)", value: "3.8%", change: 0.4, icon: "📈", sparkline: [3.1, 3.2, 3.0, 3.3, 3.5, 3.4, 3.6, 3.5, 3.7, 3.6, 3.8, 3.8], updated_at: "2026-04-10" },
  { id: "2", label: "FDI Inflows (B$)", value: "$48.2B", change: 2.1, icon: "💰", sparkline: [38, 40, 42, 41, 44, 43, 45, 44, 46, 47, 48, 48.2], updated_at: "2026-04-10" },
  { id: "3", label: "Active Startups", value: "5,847", change: 12.3, icon: "🚀", sparkline: [4200, 4400, 4500, 4700, 4900, 5000, 5100, 5300, 5400, 5600, 5700, 5847], updated_at: "2026-04-10" },
  { id: "4", label: "Tech Talent Pool", value: "714K", change: 8.6, icon: "👩‍💻", sparkline: [520, 540, 570, 590, 610, 630, 650, 670, 680, 695, 705, 714], updated_at: "2026-04-10" },
  { id: "5", label: "Funding Rounds (Q1)", value: "287", change: -3.2, icon: "🎯", sparkline: [320, 310, 295, 305, 290, 285, 300, 295, 288, 290, 285, 287], updated_at: "2026-04-10" },
  { id: "6", label: "Digital Adoption", value: "38.4%", change: 5.1, icon: "📱", sparkline: [28, 29.5, 30.2, 31.8, 32.5, 33.4, 34.6, 35.2, 36.1, 37.0, 37.8, 38.4], updated_at: "2026-04-10" },
];

export const seedMacro: MacroIndicator[] = [
  { id: "1", label: "Taux BCEAO", value: "3.50%", change: "+0.00", status: "stable", category: "rate", sparkline: [3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5], updated_at: "2026-04-10" },
  { id: "2", label: "Inflation UEMOA", value: "3.2%", change: "-0.3", status: "down", category: "rate", sparkline: [4.1, 3.9, 3.8, 3.7, 3.6, 3.5, 3.5, 3.4, 3.3, 3.3, 3.2, 3.2], updated_at: "2026-04-10" },
  { id: "3", label: "Cacao CIF", value: "$8,942", change: "+2.4%", status: "up", category: "commodity", sparkline: [7200, 7400, 7600, 7800, 8000, 8200, 8400, 8500, 8600, 8700, 8800, 8942], updated_at: "2026-04-10" },
  { id: "4", label: "Or XAU", value: "$3,089", change: "+1.1%", status: "up", category: "commodity", sparkline: [2800, 2850, 2900, 2920, 2960, 2980, 3000, 3020, 3040, 3060, 3075, 3089], updated_at: "2026-04-10" },
  { id: "5", label: "Brent", value: "$96.85", change: "-0.8%", status: "down", category: "commodity", sparkline: [92, 93, 94, 95, 96, 97, 98, 97.5, 97, 96.5, 97, 96.85], updated_at: "2026-04-10" },
  { id: "6", label: "EUR/XOF", value: "655.96", change: "+0.00", status: "stable", category: "forex", sparkline: [655.96, 655.96, 655.96, 655.96, 655.96, 655.96, 655.96, 655.96, 655.96, 655.96, 655.96, 655.96], updated_at: "2026-04-10" },
  { id: "7", label: "USD/XOF", value: "602.14", change: "-0.3%", status: "down", category: "forex", sparkline: [610, 608, 607, 606, 605, 604, 604, 603, 603, 602.5, 602.3, 602.14], updated_at: "2026-04-10" },
  { id: "8", label: "BTC", value: "$72,731", change: "+3.2%", status: "up", category: "crypto", sparkline: [62000, 63500, 65000, 64000, 66000, 67500, 68000, 69000, 70000, 71000, 72000, 72731], updated_at: "2026-04-10" },
];

export const seedStartupFeeds: Feed[] = [
  { id: "s1", source: "DISRUPT AFRICA", category: "startup", title: "Nigerian fintech Moniepoint raises $110M Series C at $1B+ valuation", url: "#", published_at: "2026-04-10T08:00:00Z", tags: ["fintech", "nigeria", "series-c"], summary: "Moniepoint secures major funding round." },
  { id: "s2", source: "TECHPOINT AFRICA", category: "startup", title: "Kenya's M-KOPA expands solar-powered internet across East Africa", url: "#", published_at: "2026-04-10T06:30:00Z", tags: ["cleantech", "kenya", "expansion"], summary: "M-KOPA brings connectivity to rural areas." },
  { id: "s3", source: "TECHCRUNCH", category: "startup", title: "African healthtech startups raised $180M in Q1 2026", url: "#", published_at: "2026-04-09T18:00:00Z", tags: ["healthtech", "funding", "report"], summary: "Healthtech sector sees record investment." },
  { id: "s4", source: "JEUNE AFRIQUE", category: "startup", title: "La BRVM lance un compartiment dédié aux startups tech", url: "#", published_at: "2026-04-09T14:00:00Z", tags: ["BRVM", "stock-exchange", "UEMOA"], summary: "Nouveau compartiment tech sur la BRVM." },
  { id: "s5", source: "THE BIG DEAL", category: "startup", title: "Africa Startup Ecosystem Report: 312 deals in March 2026", url: "#", published_at: "2026-04-09T10:00:00Z", tags: ["report", "funding", "ecosystem"], summary: "Monthly roundup of African startup deals." },
  { id: "s6", source: "AFRICAN BUSINESS", category: "startup", title: "Ethiopia opens telecom market: 3 new licenses to be issued", url: "#", published_at: "2026-04-08T16:00:00Z", tags: ["telecom", "ethiopia", "regulation"], summary: "Ethiopia continues telecom liberalization." },
  { id: "s7", source: "VENTUREBURN", category: "startup", title: "South Africa's Yoco processes $2B in annual payments", url: "#", published_at: "2026-04-08T12:00:00Z", tags: ["fintech", "south-africa", "payments"], summary: "Yoco reaches payments milestone." },
  { id: "s8", source: "DISRUPT AFRICA", category: "startup", title: "Senegal-based Wave becomes most used mobile money in WAEMU", url: "#", published_at: "2026-04-08T09:00:00Z", tags: ["mobile-money", "senegal", "WAEMU"], summary: "Wave surpasses Orange Money in WAEMU." },
];

export const seedAiFeeds: Feed[] = [
  { id: "a1", source: "ANTHROPIC", category: "ai_tech", title: "Claude 4.5 Opus: New capabilities for enterprise reasoning", url: "#", published_at: "2026-04-10T09:00:00Z", tags: ["LLM", "enterprise", "reasoning"], summary: "Anthropic releases Claude 4.5 Opus." },
  { id: "a2", source: "OPENAI", category: "ai_tech", title: "GPT-5 turbo enters public beta with 2M context window", url: "#", published_at: "2026-04-09T20:00:00Z", tags: ["LLM", "context-window", "beta"], summary: "OpenAI launches GPT-5 turbo beta." },
  { id: "a3", source: "GOOGLE AI", category: "ai_tech", title: "DeepMind's AlphaFold 4 maps all known protein interactions", url: "#", published_at: "2026-04-09T15:00:00Z", tags: ["biology", "protein", "research"], summary: "AlphaFold 4 breakthrough in biology." },
  { id: "a4", source: "HUGGINGFACE", category: "ai_tech", title: "Open-source African language models: 24 new languages supported", url: "#", published_at: "2026-04-09T11:00:00Z", tags: ["open-source", "africa", "NLP"], summary: "New models for African languages." },
  { id: "a5", source: "GITHUB", category: "ai_tech", title: "Copilot Workspace now handles multi-repo refactoring", url: "#", published_at: "2026-04-08T17:00:00Z", tags: ["copilot", "developer-tools", "AI"], summary: "GitHub Copilot gets major upgrade." },
  { id: "a6", source: "TECHCRUNCH", category: "ai_tech", title: "AI chip startup Cerebras files for $8B IPO", url: "#", published_at: "2026-04-08T13:00:00Z", tags: ["hardware", "IPO", "chips"], summary: "Cerebras plans major public offering." },
  { id: "a7", source: "ANTHROPIC", category: "ai_tech", title: "Constitutional AI v3: Improved safety benchmarks across all models", url: "#", published_at: "2026-04-07T19:00:00Z", tags: ["safety", "research", "alignment"], summary: "New safety framework from Anthropic." },
  { id: "a8", source: "GOOGLE AI", category: "ai_tech", title: "Gemini Ultra powers new generation of AI agents", url: "#", published_at: "2026-04-07T14:00:00Z", tags: ["agents", "gemini", "automation"], summary: "Google launches AI agent platform." },
];

export const seedEvents: MonitorEvent[] = [
  { id: "e1", date_label: "APR 14-16", title: "AfricArena Summit — Cape Town", type: "SUMMIT", is_hot: true, event_date: "2026-04-14", url: "#" },
  { id: "e2", date_label: "APR 18", title: "UEMOA Fintech Regulatory Review", type: "DEADLINE", is_hot: true, event_date: "2026-04-18", url: "#" },
  { id: "e3", date_label: "APR 22-23", title: "Lagos Tech Week Satellite Event", type: "CONF", is_hot: false, event_date: "2026-04-22", url: "#" },
  { id: "e4", date_label: "APR 25", title: "Nairobi AI/ML Meetup #42", type: "MEETUP", is_hot: false, event_date: "2026-04-25", url: "#" },
  { id: "e5", date_label: "MAY 1-3", title: "Africa Fintech Festival — Kigali", type: "SUMMIT", is_hot: true, event_date: "2026-05-01", url: "#" },
  { id: "e6", date_label: "MAY 8", title: "BCEAO Q1 Monetary Policy Report", type: "DEADLINE", is_hot: false, event_date: "2026-05-08", url: "#" },
  { id: "e7", date_label: "MAY 12-14", title: "Google for Africa Developer Conference", type: "CONF", is_hot: true, event_date: "2026-05-12", url: "#" },
  { id: "e8", date_label: "MAY 20", title: "Strateis Quarterly Review", type: "DEADLINE", is_hot: false, event_date: "2026-05-20", url: "#" },
];

export const seedCountryIndex: CountryIndex[] = [
  { id: "c1", country: "Nigeria", flag: "🇳🇬", score: 72, trend: "up", economy: 78, stability: 55, tech: 82, regulatory: 65 },
  { id: "c2", country: "Kenya", flag: "🇰🇪", score: 74, trend: "up", economy: 70, stability: 68, tech: 85, regulatory: 72 },
  { id: "c3", country: "South Africa", flag: "🇿🇦", score: 71, trend: "stable", economy: 65, stability: 62, tech: 80, regulatory: 78 },
  { id: "c4", country: "Egypt", flag: "🇪🇬", score: 68, trend: "up", economy: 72, stability: 58, tech: 75, regulatory: 62 },
  { id: "c5", country: "Rwanda", flag: "🇷🇼", score: 76, trend: "up", economy: 68, stability: 82, tech: 78, regulatory: 80 },
  { id: "c6", country: "Ghana", flag: "🇬🇭", score: 65, trend: "stable", economy: 62, stability: 70, tech: 68, regulatory: 60 },
  { id: "c7", country: "Senegal", flag: "🇸🇳", score: 67, trend: "up", economy: 65, stability: 72, tech: 64, regulatory: 68 },
  { id: "c8", country: "Morocco", flag: "🇲🇦", score: 70, trend: "stable", economy: 74, stability: 72, tech: 70, regulatory: 65 },
  { id: "c9", country: "Tanzania", flag: "🇹🇿", score: 58, trend: "up", economy: 60, stability: 65, tech: 52, regulatory: 55 },
  { id: "c10", country: "Ethiopia", flag: "🇪🇹", score: 55, trend: "up", economy: 62, stability: 42, tech: 58, regulatory: 50 },
];

export const seedRegulatory: RegulatorySignal[] = [
  { id: "r1", zone: "UEMOA", signal_name: "Mobile Money Licensing Reform", level: "HIGH", description: "New licensing framework for e-money issuers. Compliance deadline: June 2026.", updated_at: "2026-04-10" },
  { id: "r2", zone: "Nigeria", signal_name: "Digital Asset Regulation", level: "HIGH", description: "SEC Nigeria finalizing crypto exchange regulation. Expected Q2 2026.", updated_at: "2026-04-09" },
  { id: "r3", zone: "Kenya", signal_name: "Data Protection Act Enforcement", level: "MEDIUM", description: "ODPC increasing enforcement actions. 15 companies fined in Q1.", updated_at: "2026-04-08" },
  { id: "r4", zone: "South Africa", signal_name: "POPIA Compliance Wave", level: "MEDIUM", description: "Regulator targeting fintech sector for data protection compliance.", updated_at: "2026-04-07" },
  { id: "r5", zone: "EAC", signal_name: "Cross-Border Payment Harmonization", level: "LOW", description: "EAC central banks align on interoperability standards.", updated_at: "2026-04-06" },
  { id: "r6", zone: "CEMAC", signal_name: "Startup Act Discussion", level: "LOW", description: "CEMAC exploring unified startup legislation. Early consultation phase.", updated_at: "2026-04-05" },
];

export const seedNotes: Note[] = [
  { id: "n1", text: "Follow up on Moniepoint Series C — potential LP opportunity for Strateis Fund II", created_at: "2026-04-10T08:30:00Z" },
  { id: "n2", text: "BCEAO rate decision next week — prepare macro impact analysis for UEMOA portfolio", created_at: "2026-04-09T14:00:00Z" },
  { id: "n3", text: "Schedule call with Wave Senegal team re: partnership for IdeeLab fintech cohort", created_at: "2026-04-08T10:00:00Z" },
];

export const seedFunding: FundingData[] = [
  { month: "May", amount: 420 },
  { month: "Jun", amount: 380 },
  { month: "Jul", amount: 510 },
  { month: "Aug", amount: 340 },
  { month: "Sep", amount: 460 },
  { month: "Oct", amount: 520 },
  { month: "Nov", amount: 390 },
  { month: "Dec", amount: 280 },
  { month: "Jan", amount: 450 },
  { month: "Feb", amount: 480 },
  { month: "Mar", amount: 550 },
  { month: "Apr", amount: 410 },
];

export const seedHealth: HealthMetric[] = [
  { label: "API Uptime", value: 98, max: 100, color: "#22C55E" },
  { label: "Feed Freshness", value: 85, max: 100, color: "#D4A853" },
  { label: "Data Coverage", value: 72, max: 100, color: "#3B82F6" },
  { label: "System Load", value: 45, max: 100, color: "#22C55E" },
];

export const seedTickerAlerts: string[] = [
  "🔴 BREAKING: Nigerian fintech Moniepoint raises $110M Series C at $1B+ valuation",
  "📊 Cacao CIF hits $8,942 — 12-month high",
  "🇷🇼 Rwanda tops Africa Business Index for 3rd consecutive quarter",
  "⚠️ UEMOA Mobile Money licensing deadline: June 2026",
  "🤖 Anthropic releases Claude 4.5 Opus for enterprise",
  "📈 African startup funding: 312 deals closed in March 2026",
  "🇰🇪 Kenya Data Protection Office fines 15 companies in Q1",
  "💡 AfricArena Summit Cape Town starts April 14",
];
