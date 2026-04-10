import { PanelShell } from "@/components/layout/PanelShell";
import { Sparkline } from "@/components/ui/Sparkline";
import { seedKpis } from "@/data/seed";

export function KpiPanel() {
  return (
    <PanelShell title="Strateis KPIs" icon="📊" count={seedKpis.length}>
      <div className="grid grid-cols-3 gap-px bg-border">
        {seedKpis.map((kpi) => (
          <div key={kpi.id} className="bg-bg-panel p-3 flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <span className="text-sm">{kpi.icon}</span>
              <span className="font-mono text-[10px] text-text-dim truncate">{kpi.label}</span>
            </div>
            <div className="font-mono text-lg font-bold text-text">{kpi.value}</div>
            <div className="flex items-center justify-between">
              <span
                className={`font-mono text-[10px] font-medium ${
                  kpi.change >= 0 ? "text-green" : "text-red"
                }`}
              >
                {kpi.change >= 0 ? "▲" : "▼"} {Math.abs(kpi.change)}%
              </span>
              <Sparkline data={kpi.sparkline} color={kpi.change >= 0 ? "#22C55E" : "#EF4444"} />
            </div>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}
