import { PanelShell } from "@/components/layout/PanelShell";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { seedFunding } from "@/data/seed";

export function FundingChartPanel() {
  return (
    <PanelShell title="Africa Tech Funding (M$)" icon="📈">
      <div className="p-3 h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={seedFunding} margin={{ top: 5, right: 5, bottom: 0, left: -15 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#94A3B8", fontSize: 10, fontFamily: "JetBrains Mono" }}
              axisLine={{ stroke: "#1E293B" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#94A3B8", fontSize: 10, fontFamily: "JetBrains Mono" }}
              axisLine={{ stroke: "#1E293B" }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0F172A",
                border: "1px solid #1E293B",
                borderRadius: 5,
                fontFamily: "JetBrains Mono",
                fontSize: 11,
                color: "#E2E8F0",
              }}
              cursor={{ fill: "rgba(212, 168, 83, 0.06)" }}
              formatter={(value) => [`$${value}M`, "Funding"]}
            />
            <Bar dataKey="amount" fill="#D4A853" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </PanelShell>
  );
}
