import { PanelShell } from "@/components/layout/PanelShell";
import { AfricaMap } from "@/components/ui/AfricaMap";
import { LiveDot } from "@/components/ui/LiveDot";

export function AfricaMapPanel() {
  return (
    <PanelShell title="Africa Ecosystem" icon="🌍" badge={<LiveDot color="#22C55E" />} className="h-full">
      <div className="h-full min-h-[350px]">
        <AfricaMap />
      </div>
    </PanelShell>
  );
}
