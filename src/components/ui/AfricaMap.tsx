import { LiveDot } from "./LiveDot";

interface Hotspot {
  id: string;
  city: string;
  x: number;
  y: number;
  label: string;
  color: string;
}

const hotspots: Hotspot[] = [
  { id: "lagos", city: "Lagos", x: 32, y: 48, label: "82 startups", color: "#22C55E" },
  { id: "nairobi", city: "Nairobi", x: 68, y: 57, label: "65 startups", color: "#3B82F6" },
  { id: "capetown", city: "Cape Town", x: 47, y: 88, label: "48 startups", color: "#A78BFA" },
  { id: "cairo", city: "Cairo", x: 58, y: 18, label: "41 startups", color: "#F59E0B" },
  { id: "kigali", city: "Kigali", x: 60, y: 58, label: "28 startups", color: "#06B6D4" },
  { id: "accra", city: "Accra", x: 28, y: 50, label: "35 startups", color: "#EC4899" },
];

export function AfricaMap() {
  return (
    <div className="relative w-full h-full min-h-[240px]">
      <svg
        viewBox="0 0 400 460"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Simplified Africa continent outline */}
        <path
          d="M175 20 C185 15, 210 12, 230 18 C245 22, 260 20, 275 25 C290 30, 300 28, 310 35 C320 42, 328 50, 330 62 C332 72, 335 78, 340 85 C345 95, 340 105, 335 115 C330 125, 322 130, 318 140 C315 148, 318 155, 320 165 C322 175, 318 185, 310 195 C305 202, 295 208, 290 218 C285 228, 288 238, 292 248 C296 258, 298 270, 295 280 C292 290, 285 298, 280 308 C275 318, 268 325, 260 335 C252 345, 248 355, 245 365 C242 375, 235 382, 228 388 C222 393, 218 400, 215 408 C212 415, 205 420, 198 422 C192 424, 185 420, 180 415 C175 410, 172 402, 168 395 C164 388, 158 382, 150 378 C142 374, 135 368, 130 360 C125 352, 120 342, 118 332 C116 322, 112 312, 108 302 C104 292, 100 282, 98 272 C96 262, 92 252, 88 242 C84 232, 78 225, 72 218 C66 212, 62 205, 60 195 C58 185, 62 175, 68 168 C72 162, 78 158, 82 150 C85 142, 82 135, 78 128 C74 120, 72 112, 75 105 C78 98, 85 95, 90 88 C95 82, 98 75, 102 68 C108 58, 118 52, 128 48 C138 44, 148 40, 155 35 C162 30, 168 24, 175 20Z"
          fill="#0F172A"
          stroke="#1E293B"
          strokeWidth={1.5}
        />
        {/* Madagascar */}
        <path
          d="M320 310 C325 305, 332 308, 335 315 C338 322, 340 332, 338 342 C336 352, 330 358, 325 362 C320 365, 315 360, 314 352 C313 344, 315 335, 316 325 C317 318, 318 313, 320 310Z"
          fill="#0F172A"
          stroke="#1E293B"
          strokeWidth={1.5}
        />
        {/* Country region hints - subtle inner lines */}
        <path d="M130 160 C150 155, 170 158, 185 165" stroke="#1E293B" strokeWidth={0.5} opacity={0.5} />
        <path d="M185 165 C195 175, 200 190, 195 205" stroke="#1E293B" strokeWidth={0.5} opacity={0.5} />
        <path d="M195 205 C210 200, 230 195, 250 200" stroke="#1E293B" strokeWidth={0.5} opacity={0.5} />
        <path d="M250 200 C260 210, 270 225, 275 240" stroke="#1E293B" strokeWidth={0.5} opacity={0.5} />
        <path d="M160 100 C180 95, 200 92, 220 98" stroke="#1E293B" strokeWidth={0.5} opacity={0.5} />
      </svg>

      {/* Hotspot overlays */}
      {hotspots.map((h) => (
        <div
          key={h.id}
          className="absolute group cursor-pointer"
          style={{ left: `${h.x}%`, top: `${h.y}%`, transform: "translate(-50%, -50%)" }}
        >
          <LiveDot color={h.color} />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center">
            <div className="bg-bg-card border border-border rounded px-2 py-1 whitespace-nowrap">
              <div className="font-mono text-[10px] font-bold text-text">{h.city}</div>
              <div className="font-mono text-[9px] text-text-dim">{h.label}</div>
            </div>
            <div className="w-1.5 h-1.5 bg-bg-card border-r border-b border-border rotate-45 -mt-[3px]" />
          </div>
        </div>
      ))}
    </div>
  );
}
