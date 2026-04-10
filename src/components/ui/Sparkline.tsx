interface SparklineProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}

export function Sparkline({ data, color = "#D4A853", width = 60, height = 20 }: SparklineProps) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = 2;

  const coords = data.map((v, i) => ({
    x: pad + (i / (data.length - 1)) * (width - pad * 2),
    y: height - pad - ((v - min) / range) * (height - pad * 2),
  }));

  const points = coords.map((c) => `${c.x},${c.y}`).join(" ");
  const last = coords[coords.length - 1];

  // Area fill path
  const areaPath = `M${coords[0].x},${coords[0].y} ${coords.map((c) => `L${c.x},${c.y}`).join(" ")} L${last.x},${height} L${coords[0].x},${height} Z`;

  return (
    <svg width={width} height={height} className="inline-block">
      <defs>
        <linearGradient id={`sg-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.15} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#sg-${color.replace("#", "")})`} />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Glow dot on last point */}
      <circle cx={last.x} cy={last.y} r={2} fill={color} />
      <circle cx={last.x} cy={last.y} r={4} fill={color} opacity={0.25} />
    </svg>
  );
}
