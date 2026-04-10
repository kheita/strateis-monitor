import type { ReactNode } from "react";

interface PanelShellProps {
  title: string;
  icon?: string;
  badge?: ReactNode;
  count?: number;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function PanelShell({ title, icon, badge, count, children, className = "", style }: PanelShellProps) {
  return (
    <div
      className={`bg-bg-panel border border-border rounded-[5px] flex flex-col overflow-hidden ${className}`}
      style={style}
    >
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-bg-card/50 backdrop-blur-sm">
        {icon && <span className="text-sm">{icon}</span>}
        <h3 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-text-dim">
          {title}
        </h3>
        {count !== undefined && (
          <span className="ml-1 font-mono text-[10px] text-text-dim">({count})</span>
        )}
        <div className="ml-auto flex items-center gap-2">{badge}</div>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
