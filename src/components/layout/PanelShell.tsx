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
      className={`bg-bg-panel border border-border rounded-[5px] flex flex-col overflow-hidden h-full ${className}`}
      style={style}
    >
      <div
        className="flex items-center gap-2 px-3 py-1.5 border-b border-border bg-bg-card/50 backdrop-blur-sm shrink-0"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.3)" }}
      >
        {icon && <span className="text-xs">{icon}</span>}
        <h3 className="font-mono text-[10px] font-semibold uppercase tracking-wider text-text-dim">
          {title}
        </h3>
        {count !== undefined && (
          <span className="ml-0.5 font-mono text-[9px] text-text-dim">({count})</span>
        )}
        <div className="ml-auto flex items-center gap-2">{badge}</div>
      </div>
      <div className="flex-1 overflow-hidden min-h-0">{children}</div>
    </div>
  );
}
