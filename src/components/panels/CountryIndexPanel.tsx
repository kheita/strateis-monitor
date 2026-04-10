import { useState } from "react";
import { PanelShell } from "@/components/layout/PanelShell";
import { seedCountryIndex } from "@/data/seed";

const trendArrow = { up: "▲", down: "▼", stable: "—" };
const trendColor = { up: "text-green", down: "text-red", stable: "text-text-dim" };

function ScoreBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-1.5 bg-border rounded-full flex-1">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  );
}

export function CountryIndexPanel() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const sorted = [...seedCountryIndex].sort((a, b) => b.score - a.score);

  return (
    <PanelShell title="Country Business Index" icon="🏛️" count={sorted.length}>
      <div className="overflow-y-auto max-h-[320px]">
        {sorted.map((c, i) => (
          <div key={c.id} className="border-b border-border">
            <button
              onClick={() => setExpanded(expanded === c.id ? null : c.id)}
              className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gold/[0.06] transition-colors"
            >
              <span className="font-mono text-[10px] text-text-dim w-4">{i + 1}</span>
              <span className="text-sm">{c.flag}</span>
              <span className="text-sm text-text flex-1 text-left">{c.country}</span>
              <ScoreBar value={c.score} color="#D4A853" />
              <span className="font-mono text-xs font-bold text-text w-8 text-right">{c.score}</span>
              <span className={`font-mono text-[9px] ${trendColor[c.trend]}`}>
                {trendArrow[c.trend]}
              </span>
            </button>

            {expanded === c.id && (
              <div className="px-3 pb-2 grid grid-cols-2 gap-x-4 gap-y-1.5 bg-bg-card/30">
                {(
                  [
                    ["Economy", c.economy, "#3B82F6"],
                    ["Stability", c.stability, "#22C55E"],
                    ["Tech", c.tech, "#A78BFA"],
                    ["Regulatory", c.regulatory, "#F59E0B"],
                  ] as const
                ).map(([label, val, color]) => (
                  <div key={label} className="flex items-center gap-2">
                    <span className="font-mono text-[9px] text-text-dim w-16">{label}</span>
                    <ScoreBar value={val} color={color} />
                    <span className="font-mono text-[9px] text-text w-6 text-right">{val}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </PanelShell>
  );
}
