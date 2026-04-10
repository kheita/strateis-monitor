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
      className="grid gap-3 p-4 min-h-0"
      style={{
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: "auto auto auto auto auto",
        gridTemplateAreas: `
          "map      map      kpi     kpi"
          "map      map      macro   macro"
          "startup  aitech   live    live"
          "agenda   country  reg     reg"
          "funding  funding  health  notes"
        `,
      }}
    >
      <div style={{ gridArea: "map" }}>
        <AfricaMapPanel />
      </div>
      <div style={{ gridArea: "kpi" }}>
        <KpiPanel />
      </div>
      <div style={{ gridArea: "macro" }}>
        <MacroPanel />
      </div>
      <div style={{ gridArea: "startup" }}>
        <FeedPanel title="Startup & Business Africa" icon="🌍" feeds={seedStartupFeeds} />
      </div>
      <div style={{ gridArea: "aitech" }}>
        <FeedPanel title="AI & Tech" icon="🤖" feeds={seedAiFeeds} />
      </div>
      <div style={{ gridArea: "live" }}>
        <LiveTvPanel />
      </div>
      <div style={{ gridArea: "agenda" }}>
        <AgendaPanel />
      </div>
      <div style={{ gridArea: "country" }}>
        <CountryIndexPanel />
      </div>
      <div style={{ gridArea: "reg" }}>
        <RegulatoryPanel />
      </div>
      <div style={{ gridArea: "funding" }}>
        <FundingChartPanel />
      </div>
      <div style={{ gridArea: "health" }}>
        <SystemHealthPanel />
      </div>
      <div style={{ gridArea: "notes" }}>
        <NotesPanel />
      </div>
    </div>
  );
}
