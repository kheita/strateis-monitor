import { FundingChartPanel } from "@/components/panels/FundingChartPanel";
import { CountryIndexPanel } from "@/components/panels/CountryIndexPanel";
import { SystemHealthPanel } from "@/components/panels/SystemHealthPanel";

export function AnalyticsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="md:col-span-2">
        <FundingChartPanel />
      </div>
      <CountryIndexPanel />
      <SystemHealthPanel />
    </div>
  );
}
