import { seedTickerAlerts } from "@/data/seed";

const DOT_COLORS = ["#EF4444", "#22C55E", "#F59E0B", "#3B82F6", "#D4A853", "#06B6D4", "#A78BFA", "#EC4899"];

export function TickerBanner() {
  const items = seedTickerAlerts;
  const doubled = [...items, ...items];

  return (
    <div className="h-6 bg-bg-card border-b border-border overflow-hidden flex items-center">
      <div className="flex animate-ticker whitespace-nowrap">
        {doubled.map((text, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-6">
            <span
              className="inline-block w-1 h-1 rounded-full shrink-0"
              style={{ backgroundColor: DOT_COLORS[i % DOT_COLORS.length] }}
            />
            <span className="font-mono text-[10px] text-text-dim">{text}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
