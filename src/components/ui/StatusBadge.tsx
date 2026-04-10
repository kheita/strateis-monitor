interface StatusBadgeProps {
  status: "up" | "down" | "stable";
  value?: string;
}

const statusConfig = {
  up: { arrow: "▲", colorClass: "text-green bg-green/10 border-green/25" },
  down: { arrow: "▼", colorClass: "text-red bg-red/10 border-red/25" },
  stable: { arrow: "—", colorClass: "text-text-dim bg-text-dim/10 border-text-dim/25" },
};

export function StatusBadge({ status, value }: StatusBadgeProps) {
  const cfg = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium border ${cfg.colorClass}`}>
      <span>{cfg.arrow}</span>
      {value && <span>{value}</span>}
    </span>
  );
}
