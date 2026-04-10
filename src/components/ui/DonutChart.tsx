interface DonutChartProps {
  value: number;
  max: number;
  color: string;
  label: string;
  size?: number;
}

export function DonutChart({ value, max, color, label, size = 72 }: DonutChartProps) {
  const pct = Math.min(value / max, 1);
  const r = (size - 8) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - pct);
  const center = size / 2;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size}>
        <circle
          cx={center}
          cy={center}
          r={r}
          fill="none"
          stroke="#1E293B"
          strokeWidth={4}
        />
        <circle
          cx={center}
          cy={center}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={4}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
          className="transition-all duration-700"
        />
        <text
          x={center}
          y={center}
          textAnchor="middle"
          dominantBaseline="central"
          className="font-mono text-xs"
          fill="#E2E8F0"
          fontSize={12}
          fontWeight={600}
        >
          {Math.round(pct * 100)}%
        </text>
      </svg>
      <span className="font-mono text-[10px] text-text-dim text-center leading-tight">{label}</span>
    </div>
  );
}
