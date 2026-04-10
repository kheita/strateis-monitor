import { AfricaMapPanel } from "@/components/panels/AfricaMapPanel";
import { KpiPanel } from "@/components/panels/KpiPanel";
import { MacroPanel } from "@/components/panels/MacroPanel";
import { FeedPanel } from "@/components/panels/FeedPanel";
import { LiveTvPanel } from "@/components/panels/LiveTvPanel";
import { AgendaPanel } from "@/components/panels/AgendaPanel";
import { CountryIndexPanel } from "@/components/panels/CountryIndexPanel";
import { RegulatoryPanel } from "@/components/panels/RegulatoryPanel";
import { FundingChartPanel } from "@/components/panels/FundingChartPanel";
import { SystemHealthPanel } from "@/components/panels/SystemHealthPanel";
import { NotesPanel } from "@/components/panels/NotesPanel";
import { seedStartupFeeds, seedAiFeeds } from "@/data/seed";

export function DashboardPage() {
  return (
    <div
      className="grid min-h-0"
      style={{
        gap: 6,
        padding: "6px 8px",
        gridTemplateColumns: "1.3fr 1fr 0.7fr",
        gridTemplateRows: "auto auto auto auto",
        gridTemplateAreas: `
          "map      kpi       health"
          "map      macro     notes"
          "startup  aitech    live"
          "country  agenda    reg"
          "funding  funding   funding"
        `,
      }}
    >
      <div style={{ gridArea: "map" }} className="min-h-0">
        <AfricaMapPanel />
      </div>
      <div style={{ gridArea: "kpi" }} className="min-h-0">
        <KpiPanel />
      </div>
      <div style={{ gridArea: "health" }} className="min-h-0">
        <SystemHealthPanel />
      </div>
      <div style={{ gridArea: "macro" }} className="min-h-0">
        <MacroPanel />
      </div>
      <div style={{ gridArea: "notes" }} className="min-h-0">
        <NotesPanel />
      </div>
      <div style={{ gridArea: "startup" }} className="min-h-0">
        <FeedPanel title="Startup & Business Africa" icon="🌍" feeds={seedStartupFeeds} />
      </div>
      <div style={{ gridArea: "aitech" }} className="min-h-0">
        <FeedPanel title="AI & Tech" icon="🤖" feeds={seedAiFeeds} />
      </div>
      <div style={{ gridArea: "live" }} className="min-h-0">
        <LiveTvPanel />
      </div>
      <div style={{ gridArea: "country" }} className="min-h-0">
        <CountryIndexPanel />
      </div>
      <div style={{ gridArea: "agenda" }} className="min-h-0">
        <AgendaPanel />
      </div>
      <div style={{ gridArea: "reg" }} className="min-h-0">
        <RegulatoryPanel />
      </div>
      <div style={{ gridArea: "funding" }} className="min-h-0">
        <FundingChartPanel />
      </div>
    </div>
  );
}
