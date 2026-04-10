import { PanelShell } from "@/components/layout/PanelShell";
import { DonutChart } from "@/components/ui/DonutChart";
import { seedHealth } from "@/data/seed";

export function SystemHealthPanel() {
  return (
    <PanelShell title="System Health" icon="🔧">
      <div className="flex items-center justify-around p-4">
        {seedHealth.map((h) => (
          <DonutChart
            key={h.label}
            value={h.value}
            max={h.max}
            color={h.color}
            label={h.label}
          />
        ))}
      </div>
    </PanelShell>
  );
}
