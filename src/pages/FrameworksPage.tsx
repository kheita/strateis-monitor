import { useState } from "react";
import { AuthGate } from "@/components/AuthGate";
import { PanelShell } from "@/components/layout/PanelShell";

// ============ Framework Definitions ============

interface Framework {
  id: string;
  name: string;
  trademark: string;
  icon: string;
  color: string;
  description: string;
  axes: string[];
}

const FRAMEWORKS: Framework[] = [
  {
    id: "orbiscore", name: "OrbisCore", trademark: "\u2122", icon: "🌐", color: "#D4A853",
    description: "Competitive intelligence scoring across 5 strategic axes",
    axes: ["Market Position", "Innovation Capacity", "Financial Health", "Talent Density", "Regulatory Readiness"],
  },
  {
    id: "neurospark", name: "NeuroSpark", trademark: "\u2122", icon: "🧠", color: "#A78BFA",
    description: "AI-powered insight generator from business situation analysis",
    axes: ["Opportunity", "Risk", "Action", "Timeline", "Impact"],
  },
  {
    id: "helixops", name: "HelixOps", trademark: "\u2122", icon: "🔄", color: "#06B6D4",
    description: "Transformation readiness checklist with 12 operational dimensions",
    axes: ["Leadership Buy-in", "Tech Stack", "Data Maturity", "Process Documentation", "Change Management",
           "Talent Pipeline", "Budget Allocation", "Timeline Realism", "KPI Framework", "Communication Plan",
           "Risk Mitigation", "Governance Structure"],
  },
  {
    id: "kpro", name: "K-Pro", trademark: "\u2122", icon: "⚡", color: "#22C55E",
    description: "Process optimization scoring across 8 efficiency criteria",
    axes: ["Automation Level", "Error Rate", "Cycle Time", "Cost Efficiency",
           "Scalability", "Documentation", "Team Adoption", "ROI Potential"],
  },
];

// ============ Radar Chart (reusable) ============

function RadarChart({ axes, scores, color, size = 140 }: { axes: string[]; scores: number[]; color: string; size?: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 18;
  const n = axes.length;

  function point(i: number, val: number) {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const d = (val / 10) * r;
    return { x: cx + d * Math.cos(angle), y: cy + d * Math.sin(angle) };
  }

  const gridLevels = [0.25, 0.5, 0.75, 1];
  const dataPoints = scores.map((s, i) => point(i, s));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";

  return (
    <svg width={size} height={size}>
      {gridLevels.map((level) => {
        const pts = Array.from({ length: n }, (_, i) => point(i, level * 10));
        const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";
        return <path key={level} d={path} fill="none" stroke="#1E293B" strokeWidth={0.5} />;
      })}
      {Array.from({ length: n }, (_, i) => {
        const p = point(i, 10);
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#1E293B" strokeWidth={0.5} />;
      })}
      <path d={dataPath} fill={`${color}25`} stroke={color} strokeWidth={1.5} />
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={2} fill={color} />
      ))}
    </svg>
  );
}

// ============ Framework Detail Views ============

function OrbisCore({ fw }: { fw: Framework }) {
  const [scores, setScores] = useState([7, 8, 6, 9, 5]);
  const total = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length * 10);

  return (
    <div className="flex gap-4">
      <div className="shrink-0 flex flex-col items-center">
        <RadarChart axes={fw.axes} scores={scores} color={fw.color} />
        <div className="mt-1 text-center">
          <span className="font-mono text-[18px] font-extrabold" style={{ color: fw.color }}>{total}</span>
          <span className="font-mono text-[9px] text-text-dim">/100</span>
        </div>
      </div>
      <div className="flex-1 space-y-2">
        {fw.axes.map((axis, i) => (
          <div key={axis}>
            <div className="flex items-center justify-between mb-0.5">
              <span className="font-mono text-[8px] text-text-dim uppercase tracking-wider">{axis}</span>
              <span className="font-mono text-[9px] text-text">{scores[i]}/10</span>
            </div>
            <input
              type="range" min={1} max={10} value={scores[i]}
              onChange={(e) => { const s = [...scores]; s[i] = Number(e.target.value); setScores(s); }}
              className="w-full accent-gold h-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function HelixOpsChecklist({ fw }: { fw: Framework }) {
  const [checked, setChecked] = useState<boolean[]>(fw.axes.map(() => false));
  const pct = Math.round(checked.filter(Boolean).length / checked.length * 100);

  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1 h-2 bg-border rounded-full">
          <div className="h-full rounded-full transition-all duration-300" style={{ width: `${pct}%`, background: fw.color }} />
        </div>
        <span className="font-mono text-[13px] font-bold" style={{ color: fw.color }}>{pct}%</span>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {fw.axes.map((item, i) => (
          <label key={item} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-bg-hover cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={checked[i]}
              onChange={() => { const c = [...checked]; c[i] = !c[i]; setChecked(c); }}
              className="accent-cyan"
            />
            <span className={`font-mono text-[9px] ${checked[i] ? "text-text" : "text-text-dim"}`}>{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function KProScoring({ fw }: { fw: Framework }) {
  const [scores, setScores] = useState(fw.axes.map(() => 5));
  const total = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length * 10);

  return (
    <div>
      <div className="text-center mb-3">
        <span className="font-mono text-[22px] font-extrabold" style={{ color: fw.color }}>{total}</span>
        <span className="font-mono text-[10px] text-text-dim">/100</span>
      </div>
      <div className="space-y-2">
        {fw.axes.map((axis, i) => (
          <div key={axis}>
            <div className="flex items-center justify-between mb-0.5">
              <span className="font-mono text-[8px] text-text-dim uppercase tracking-wider">{axis}</span>
              <span className="font-mono text-[9px] text-text">{scores[i]}/10</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-border rounded-full">
                <div className="h-full rounded-full transition-all duration-300" style={{ width: `${scores[i] * 10}%`, background: fw.color }} />
              </div>
              <input
                type="range" min={1} max={10} value={scores[i]}
                onChange={(e) => { const s = [...scores]; s[i] = Number(e.target.value); setScores(s); }}
                className="w-16 accent-green h-1"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ Main Page ============

function FrameworksContent() {
  const [active, setActive] = useState<string | null>(null);
  const activeFw = FRAMEWORKS.find((f) => f.id === active);

  return (
    <div style={{ padding: "6px 8px" }}>
      {/* Framework cards grid */}
      <div className="grid grid-cols-2 gap-1.5 mb-1.5">
        {FRAMEWORKS.map((fw) => (
          <button
            key={fw.id}
            onClick={() => setActive(active === fw.id ? null : fw.id)}
            className={`text-left p-3 rounded-[5px] border transition-all ${
              active === fw.id
                ? "bg-bg-hover border-gold/30"
                : "bg-bg-panel border-border hover:border-border-active hover:bg-bg-hover"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{fw.icon}</span>
              <div>
                <span className="font-mono text-[11px] font-bold text-text">
                  {fw.name}<sup className="text-[7px] text-text-dim">{fw.trademark}</sup>
                </span>
              </div>
              <span
                className="ml-auto w-2 h-2 rounded-full"
                style={{ background: active === fw.id ? fw.color : "#1E293B" }}
              />
            </div>
            <p className="font-sans text-[10px] text-text-dim mt-1.5 leading-relaxed">{fw.description}</p>
          </button>
        ))}
      </div>

      {/* Active framework detail */}
      {activeFw && (
        <PanelShell title={`${activeFw.name}${activeFw.trademark}`} icon={activeFw.icon}>
          <div className="p-3">
            {activeFw.id === "orbiscore" && <OrbisCore fw={activeFw} />}
            {activeFw.id === "neurospark" && <OrbisCore fw={activeFw} />}
            {activeFw.id === "helixops" && <HelixOpsChecklist fw={activeFw} />}
            {activeFw.id === "kpro" && <KProScoring fw={activeFw} />}
          </div>
        </PanelShell>
      )}
    </div>
  );
}

export function FrameworksPage() {
  return (
    <AuthGate>
      <FrameworksContent />
    </AuthGate>
  );
}
