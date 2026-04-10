import { useState } from "react";
import { PanelShell } from "@/components/layout/PanelShell";
import { Sparkline } from "@/components/ui/Sparkline";
import { DonutChart } from "@/components/ui/DonutChart";
import { FundingChartPanel } from "@/components/panels/FundingChartPanel";
import { CountryIndexPanel } from "@/components/panels/CountryIndexPanel";

// IdeeLab KPI data
const IDEELAB_KPIS = [
  { label: "Total Ideas", value: "12,847", change: "+18%", color: "#D4A853", sparkline: [8200, 8900, 9400, 9800, 10200, 10800, 11300, 11700, 12100, 12400, 12600, 12847] },
  { label: "Countries", value: "24", change: "+3", color: "#3B82F6", sparkline: [14, 15, 16, 17, 18, 19, 20, 21, 22, 22, 23, 24] },
  { label: "Revenue MTD", value: "4.2M", change: "+12%", color: "#22C55E", sparkline: [2.1, 2.4, 2.8, 3.0, 3.2, 3.5, 3.6, 3.8, 3.9, 4.0, 4.1, 4.2] },
  { label: "Conversion", value: "3.8%", change: "+0.4", color: "#A78BFA", sparkline: [2.1, 2.3, 2.5, 2.8, 3.0, 3.1, 3.2, 3.4, 3.5, 3.6, 3.7, 3.8] },
];

// SEO Tracker data
const SEO_DATA = [
  { month: "Jan", urls: 120 }, { month: "Feb", urls: 145 }, { month: "Mar", urls: 180 },
  { month: "Apr", urls: 210 }, { month: "May", urls: 250 }, { month: "Jun", urls: 280 },
  { month: "Jul", urls: 320 }, { month: "Aug", urls: 355 }, { month: "Sep", urls: 390 },
  { month: "Oct", urls: 420 }, { month: "Nov", urls: 460 }, { month: "Dec", urls: 510 },
];

// Revenue simulator
const PLANS = [
  { name: "Free", price: 0 },
  { name: "Starter", price: 4900 },
  { name: "Pro", price: 14900 },
  { name: "Enterprise", price: 49900 },
];

export function AnalyticsPage() {
  const [simClients, setSimClients] = useState([500, 80, 25, 5]);

  const projectedRevenue = PLANS.reduce((sum, p, i) => sum + p.price * simClients[i], 0);

  return (
    <div className="flex flex-col gap-1.5" style={{ padding: "6px 8px" }}>
      {/* IdeeLab KPIs row */}
      <div className="grid grid-cols-4 gap-1.5">
        {IDEELAB_KPIS.map((kpi) => (
          <PanelShell key={kpi.label} title={kpi.label} icon="">
            <div className="p-3 flex flex-col items-center gap-1">
              <span className="font-mono text-[22px] font-extrabold" style={{ color: kpi.color }}>{kpi.value}</span>
              <span className="font-mono text-[9px] text-green">{kpi.change}</span>
              <Sparkline data={kpi.sparkline} color={kpi.color} width={80} height={20} />
            </div>
          </PanelShell>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-2 gap-1.5">
        <FundingChartPanel />

        {/* Revenue Simulator */}
        <PanelShell title="Revenue Simulator" icon="💰">
          <div className="p-3 space-y-2">
            {PLANS.map((plan, i) => (
              <div key={plan.name} className="flex items-center gap-3">
                <span className="font-mono text-[9px] text-text-dim w-16 uppercase">{plan.name}</span>
                <input
                  type="range" min={0} max={plan.name === "Free" ? 2000 : plan.name === "Starter" ? 500 : plan.name === "Pro" ? 100 : 20}
                  value={simClients[i]}
                  onChange={(e) => { const c = [...simClients]; c[i] = Number(e.target.value); setSimClients(c); }}
                  className="flex-1 accent-gold h-1"
                />
                <span className="font-mono text-[10px] text-text w-10 text-right">{simClients[i]}</span>
                <span className="font-mono text-[8px] text-text-muted w-16 text-right">
                  {plan.price > 0 ? `${((plan.price * simClients[i]) / 1000000).toFixed(1)}M` : "—"}
                </span>
              </div>
            ))}
            <div className="pt-2 border-t border-border text-center">
              <span className="font-mono text-[8px] text-text-dim uppercase tracking-wider block">Projected MRR</span>
              <span className="font-mono text-[22px] font-extrabold text-gold">
                {(projectedRevenue / 1000000).toFixed(1)}M
              </span>
              <span className="font-mono text-[10px] text-text-dim block">FCFA/month</span>
            </div>
          </div>
        </PanelShell>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-3 gap-1.5">
        <CountryIndexPanel />

        {/* SEO Tracker */}
        <PanelShell title="SEO Tracker" icon="🔍">
          <div className="p-3">
            <div className="flex items-end gap-0.5 h-[120px]">
              {SEO_DATA.map((d) => {
                const maxUrls = Math.max(...SEO_DATA.map((s) => s.urls));
                const h = (d.urls / maxUrls) * 100;
                return (
                  <div key={d.month} className="flex-1 flex flex-col items-center justify-end gap-0.5">
                    <div className="w-full rounded-t" style={{ height: `${h}%`, background: "#06B6D4", minHeight: 2 }} />
                    <span className="font-mono text-[7px] text-text-muted">{d.month.slice(0, 1)}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-border-subtle">
              <span className="font-mono text-[8px] text-text-dim uppercase">Indexed URLs</span>
              <span className="font-mono text-[13px] font-bold text-cyan">510</span>
            </div>
          </div>
        </PanelShell>

        {/* Platform Health Donuts */}
        <PanelShell title="Platform Health" icon="🔧">
          <div className="p-3 grid grid-cols-2 gap-3 place-items-center">
            <DonutChart value={99.2} max={100} color="#22C55E" label="Uptime" size={60} />
            <DonutChart value={87} max={100} color="#D4A853" label="API Speed" size={60} />
            <DonutChart value={72} max={100} color="#3B82F6" label="SEO Score" size={60} />
            <DonutChart value={94} max={100} color="#A78BFA" label="Security" size={60} />
          </div>
        </PanelShell>
      </div>
    </div>
  );
}
