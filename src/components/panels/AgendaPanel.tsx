import { PanelShell } from "@/components/layout/PanelShell";
import { seedEvents } from "@/data/seed";
import { EVENT_TYPE_COLORS } from "@/lib/constants";

export function AgendaPanel() {
  return (
    <PanelShell title="Agenda & Events" icon="📅" count={seedEvents.length}>
      <div className="overflow-y-auto max-h-[320px]">
        {seedEvents.map((evt) => (
          <div
            key={evt.id}
            className="flex items-start gap-3 px-3 py-2.5 border-b border-border hover:bg-gold/[0.06] transition-colors"
          >
            <div className="font-mono text-[10px] text-text-dim w-16 shrink-0 pt-0.5">
              {evt.date_label}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm text-text leading-snug">{evt.title}</span>
                {evt.is_hot && <span className="text-xs">🔥</span>}
              </div>
              <span
                className="inline-block font-mono text-[9px] font-bold mt-1 px-1.5 py-0.5 rounded"
                style={{
                  color: EVENT_TYPE_COLORS[evt.type],
                  backgroundColor: `${EVENT_TYPE_COLORS[evt.type]}15`,
                  border: `1px solid ${EVENT_TYPE_COLORS[evt.type]}40`,
                }}
              >
                {evt.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}
