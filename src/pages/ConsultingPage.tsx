import { useState } from "react";
import { AuthGate } from "@/components/AuthGate";
import { PanelShell } from "@/components/layout/PanelShell";
import { Sparkline } from "@/components/ui/Sparkline";

// PM V3 Scoring criteria
const CRITERIA = [
  "Strategic Alignment", "Revenue Potential", "Client Maturity",
  "Team Availability", "Delivery Risk", "Margin Potential",
  "Repeat Likelihood", "Brand Impact", "Innovation Factor",
  "Market Timing", "Competition Level", "Scalability",
];

// Strateis 16 Offers Matrix
const ACTIVITIES = ["Strategy", "Transformation", "Tech Advisory", "Operations"];
const LEVELS = ["Diagnostic", "Design", "Implementation", "Optimization"];

interface Project {
  id: string;
  name: string;
  client: string;
  status: "prospect" | "active" | "completed" | "lost";
  scores: number[];
  price: number;
  notes: string;
}

const STATUS_COLORS: Record<string, string> = {
  prospect: "#F59E0B",
  active: "#22C55E",
  completed: "#3B82F6",
  lost: "#EF4444",
};

const SEED_PROJECTS: Project[] = [
  { id: "1", name: "Digital Transformation BICICI", client: "BICICI", status: "active", scores: [8,9,7,6,4,8,7,9,6,8,3,7], price: 45000000, notes: "Phase 2 starting Q2" },
  { id: "2", name: "Fintech Strategy Wave", client: "Wave", status: "prospect", scores: [9,10,8,5,3,9,8,10,9,9,5,8], price: 65000000, notes: "RFP due Apr 20" },
  { id: "3", name: "Ops Audit Orange CI", client: "Orange CI", status: "completed", scores: [7,8,9,8,2,7,9,8,5,7,4,6], price: 28000000, notes: "Delivered Mar 2026" },
];

function ScoreRadar({ scores, size = 160 }: { scores: number[]; size?: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 20;
  const n = scores.length;

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
      <path d={dataPath} fill="rgba(212,168,83,0.15)" stroke="#D4A853" strokeWidth={1.5} />
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={2.5} fill="#D4A853" />
      ))}
    </svg>
  );
}

function ConsultingContent() {
  const [projects] = useState<Project[]>(SEED_PROJECTS);
  const [selected, setSelected] = useState<Project>(SEED_PROJECTS[0]);
  const [priceDuration, setPriceDuration] = useState(3);
  const [priceComplexity, setPriceComplexity] = useState(2);

  const totalScore = Math.round(selected.scores.reduce((a, b) => a + b, 0) / selected.scores.length * 10);
  const calcPrice = priceDuration * priceComplexity * 5000000;

  return (
    <div className="grid gap-1.5" style={{ padding: "6px 8px", gridTemplateColumns: "1fr 1.5fr", gridTemplateRows: "auto auto", gridTemplateAreas: `"projects detail" "matrix pricing"` }}>
      {/* Project List */}
      <div style={{ gridArea: "projects" }}>
        <PanelShell title="Projects" icon="📋" count={projects.length}>
          <div className="overflow-y-auto max-h-[340px]">
            {projects.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelected(p)}
                className={`w-full text-left px-3 py-2.5 border-b transition-all duration-150 ${
                  selected.id === p.id
                    ? "bg-bg-hover border-l-2 border-l-gold border-b-border-subtle pl-2.5"
                    : "border-b-border-subtle hover:bg-bg-hover"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: STATUS_COLORS[p.status] }} />
                  <span className="font-sans text-[11px] text-text truncate">{p.name}</span>
                </div>
                <div className="flex items-center gap-2 mt-1 ml-3.5">
                  <span className="font-mono text-[8px] text-text-dim uppercase">{p.client}</span>
                  <span
                    className="font-mono text-[8px] font-bold uppercase px-1 py-0.5 rounded"
                    style={{ color: STATUS_COLORS[p.status], background: `${STATUS_COLORS[p.status]}12`, border: `1px solid ${STATUS_COLORS[p.status]}30` }}
                  >
                    {p.status}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </PanelShell>
      </div>

      {/* Project Detail + Radar */}
      <div style={{ gridArea: "detail" }}>
        <PanelShell title={`PM V3 Score — ${selected.name}`} icon="🎯">
          <div className="p-3 flex gap-4">
            <div className="shrink-0">
              <ScoreRadar scores={selected.scores} />
              <div className="text-center mt-1">
                <span className="font-mono text-[22px] font-extrabold text-gold">{totalScore}</span>
                <span className="font-mono text-[10px] text-text-dim">/100</span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                {CRITERIA.map((c, i) => (
                  <div key={c} className="flex items-center gap-2">
                    <span className="font-mono text-[8px] text-text-dim w-24 truncate uppercase tracking-wide">{c}</span>
                    <div className="flex-1 h-1.5 bg-border rounded-full">
                      <div className="h-full rounded-full bg-gold transition-all duration-300" style={{ width: `${selected.scores[i] * 10}%` }} />
                    </div>
                    <span className="font-mono text-[9px] text-text w-4 text-right">{selected.scores[i]}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 p-2 bg-bg-card rounded border border-border-subtle">
                <span className="font-mono text-[8px] text-text-dim uppercase tracking-wider">Notes</span>
                <p className="font-sans text-[11px] text-text mt-0.5">{selected.notes}</p>
              </div>
            </div>
          </div>
        </PanelShell>
      </div>

      {/* 16 Offers Matrix */}
      <div style={{ gridArea: "matrix" }}>
        <PanelShell title="Matrice 16 Offres Strateis" icon="🔲">
          <div className="p-2">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="font-mono text-[8px] text-text-dim uppercase tracking-wider text-left p-1" />
                  {LEVELS.map((l) => (
                    <th key={l} className="font-mono text-[8px] text-gold uppercase tracking-wider text-center p-1">{l}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ACTIVITIES.map((a) => (
                  <tr key={a}>
                    <td className="font-mono text-[8px] text-text-dim uppercase tracking-wider p-1 whitespace-nowrap">{a}</td>
                    {LEVELS.map((l, li) => (
                      <td key={l} className="p-0.5">
                        <button className="w-full py-2 rounded text-center bg-bg-card border border-border-subtle hover:border-gold/30 hover:bg-bg-hover transition-all">
                          <span className="font-mono text-[9px] text-text">{`${a.charAt(0)}${li + 1}`}</span>
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PanelShell>
      </div>

      {/* Pricing Calculator */}
      <div style={{ gridArea: "pricing" }}>
        <PanelShell title="Calculateur Pricing" icon="💰">
          <div className="p-3 space-y-3">
            <div>
              <label className="font-mono text-[8px] text-text-dim uppercase tracking-wider block mb-1">
                Duration (months): {priceDuration}
              </label>
              <input
                type="range" min={1} max={12} value={priceDuration}
                onChange={(e) => setPriceDuration(Number(e.target.value))}
                className="w-full accent-gold"
              />
            </div>
            <div>
              <label className="font-mono text-[8px] text-text-dim uppercase tracking-wider block mb-1">
                Complexity (1-5): {priceComplexity}
              </label>
              <input
                type="range" min={1} max={5} value={priceComplexity}
                onChange={(e) => setPriceComplexity(Number(e.target.value))}
                className="w-full accent-gold"
              />
            </div>
            <div className="p-3 bg-bg-card rounded border border-border text-center">
              <span className="font-mono text-[8px] text-text-dim uppercase tracking-wider block">Recommended Price</span>
              <span className="font-mono text-[22px] font-extrabold text-gold">
                {(calcPrice / 1000000).toFixed(0)}M
              </span>
              <span className="font-mono text-[10px] text-text-dim block">FCFA</span>
            </div>
            <div className="flex gap-2">
              <Sparkline data={[15, 22, 28, 35, 42, 45, 48, 52, 55, 60, 65, 70]} color="#22C55E" width={120} height={24} />
              <span className="font-mono text-[8px] text-text-dim self-end">Revenue trend</span>
            </div>
          </div>
        </PanelShell>
      </div>
    </div>
  );
}

export function ConsultingPage() {
  return (
    <AuthGate>
      <ConsultingContent />
    </AuthGate>
  );
}
