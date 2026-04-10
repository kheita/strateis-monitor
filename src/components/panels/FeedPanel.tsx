import { PanelShell } from "@/components/layout/PanelShell";
import { LiveDot } from "@/components/ui/LiveDot";
import type { Feed } from "@/lib/types";

interface FeedPanelProps {
  title: string;
  icon: string;
  feeds: Feed[];
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function FeedPanel({ title, icon, feeds }: FeedPanelProps) {
  return (
    <PanelShell
      title={title}
      icon={icon}
      count={feeds.length}
      badge={<LiveDot color="#22C55E" />}
      className="h-full"
    >
      <div className="overflow-y-auto max-h-[360px]">
        {feeds.map((feed) => (
          <a
            key={feed.id}
            href={feed.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 border-b border-border transition-all duration-150 hover:bg-gold/[0.04] hover:border-l-2 hover:border-l-gold hover:pl-2.5"
          >
            <p className="text-[13px] text-text leading-snug line-clamp-2 hover:text-gold transition-colors">
              {feed.title}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-mono text-[9px] font-bold text-gold-dim bg-gold/10 px-1.5 py-0.5 rounded">
                {feed.source}
              </span>
              <span className="font-mono text-[9px] text-text-dim">{timeAgo(feed.published_at)}</span>
            </div>
            {feed.tags.length > 0 && (
              <div className="flex gap-1 mt-1 flex-wrap">
                {feed.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[8px] text-cyan bg-cyan/10 border border-cyan/25 px-1 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </a>
        ))}
      </div>
    </PanelShell>
  );
}
