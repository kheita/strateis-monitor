import { useState } from "react";
import { PanelShell } from "@/components/layout/PanelShell";
import { LiveDot } from "@/components/ui/LiveDot";
import { CHANNELS } from "@/lib/constants";

export function LiveTvPanel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = CHANNELS[activeIdx];

  return (
    <PanelShell title="Live Channels" icon="📺" badge={<LiveDot />}>
      <div className="flex flex-col h-full">
        {/* Channel tabs */}
        <div className="flex overflow-x-auto border-b border-border bg-bg-card/30">
          {CHANNELS.map((ch, i) => (
            <button
              key={ch.name}
              onClick={() => setActiveIdx(i)}
              className={`px-2.5 py-1.5 font-mono text-[9px] font-bold whitespace-nowrap transition-colors border-b-2 ${
                i === activeIdx
                  ? "border-current text-text"
                  : "border-transparent text-text-dim hover:text-text"
              }`}
              style={i === activeIdx ? { color: ch.color, borderColor: ch.color } : undefined}
            >
              {ch.name}
            </button>
          ))}
        </div>

        {/* Embed area */}
        <div className="flex-1 min-h-[200px] bg-bg-deep relative">
          <iframe
            key={active.name}
            src={active.embedUrl}
            title={active.name}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </PanelShell>
  );
}
