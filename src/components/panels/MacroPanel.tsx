import { PanelShell } from "@/components/layout/PanelShell";
import { Sparkline } from "@/components/ui/Sparkline";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { seedMacro } from "@/data/seed";

export function MacroPanel() {
  return (
    <PanelShell title="Markets & Macro" icon="💹" count={seedMacro.length}>
      <div className="grid grid-cols-2 gap-px bg-border">
        {seedMacro.map((item) => (
          <div key={item.id} className="bg-bg-panel px-3 py-2 flex items-center gap-2">
            <div className="flex-1 min-w-0">
              <div className="font-mono text-[10px] text-text-dim truncate">{item.label}</div>
              <div className="font-mono text-sm font-bold text-text">{item.value}</div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <StatusBadge status={item.status} value={item.change} />
              <Sparkline
                data={item.sparkline}
                color={item.status === "up" ? "#22C55E" : item.status === "down" ? "#EF4444" : "#94A3B8"}
                width={48}
                height={16}
              />
            </div>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}
