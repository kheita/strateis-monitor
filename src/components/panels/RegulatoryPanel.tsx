import { PanelShell } from "@/components/layout/PanelShell";
import { seedRegulatory } from "@/data/seed";
import { LEVEL_COLORS } from "@/lib/constants";

export function RegulatoryPanel() {
  return (
    <PanelShell title="Regulatory Signals" icon="⚖️" count={seedRegulatory.length}>
      <div className="overflow-y-auto max-h-[320px]">
        {seedRegulatory.map((sig) => (
          <div
            key={sig.id}
            className="px-3 py-2.5 border-b border-border hover:bg-gold/[0.06] transition-colors"
          >
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: LEVEL_COLORS[sig.level] }}
              />
              <span className="font-mono text-[10px] text-text-dim">{sig.zone}</span>
              <span
                className="ml-auto font-mono text-[9px] font-bold px-1.5 py-0.5 rounded"
                style={{
                  color: LEVEL_COLORS[sig.level],
                  backgroundColor: `${LEVEL_COLORS[sig.level]}15`,
                  border: `1px solid ${LEVEL_COLORS[sig.level]}40`,
                }}
              >
                {sig.level}
              </span>
            </div>
            <p className="text-sm text-text mt-1">{sig.signal_name}</p>
            <p className="font-mono text-[10px] text-text-dim mt-0.5 leading-relaxed">{sig.description}</p>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}
