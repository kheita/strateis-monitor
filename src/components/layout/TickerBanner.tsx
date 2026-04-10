import { seedTickerAlerts } from "@/data/seed";

export function TickerBanner() {
  const items = seedTickerAlerts;
  const doubled = [...items, ...items];

  return (
    <div className="h-7 bg-bg-card border-b border-border overflow-hidden flex items-center">
      <div className="flex animate-ticker whitespace-nowrap">
        {doubled.map((text, i) => (
          <span
            key={i}
            className="inline-block px-8 font-mono text-[11px] text-text-dim"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
