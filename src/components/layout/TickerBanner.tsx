import { seedTickerAlerts } from "@/data/seed";

const DOT_COLORS = ["#EF4444", "#22C55E", "#F59E0B", "#3B82F6", "#D4A853", "#06B6D4", "#A78BFA", "#EC4899"];

export function TickerBanner() {
  const doubled = [...seedTickerAlerts, ...seedTickerAlerts];

  return (
    <div
      className="h-6 overflow-hidden flex items-center"
      style={{
        background: "rgba(212,168,83,0.04)",
        borderTop: "1px solid rgba(212,168,83,0.08)",
        borderBottom: "1px solid rgba(212,168,83,0.08)",
      }}
    >
      <div className="flex animate-ticker whitespace-nowrap">
        {doubled.map((text, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-5">
            <span
              className="inline-block w-1 h-1 rounded-full shrink-0"
              style={{ backgroundColor: DOT_COLORS[i % DOT_COLORS.length] }}
            />
            <span className="font-mono text-[9px] text-gold">{text}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
