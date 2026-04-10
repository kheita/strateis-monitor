import { NavLink } from "react-router-dom";
import { useClock } from "@/hooks/useClock";
import { LiveDot } from "@/components/ui/LiveDot";

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/feeds", label: "Feeds" },
  { to: "/analytics", label: "Analytics" },
  { to: "/consulting", label: "Consulting" },
  { to: "/ops", label: "Ops" },
  { to: "/content", label: "Content" },
  { to: "/frameworks", label: "Frameworks" },
];

export function TopBar() {
  const time = useClock();

  return (
    <header className="sticky top-0 z-50 flex items-center h-10 px-3.5 border-b border-border bg-bg-deep/95 backdrop-blur-md">
      {/* Logo "S" badge */}
      <div className="flex items-center gap-2 mr-4">
        <div
          className="w-6 h-6 rounded-[5px] flex items-center justify-center font-mono text-[12px] font-black text-bg-deep"
          style={{
            background: "linear-gradient(135deg, #D4A853, #C5952A)",
            boxShadow: "0 0 8px rgba(212,168,83,0.3)",
          }}
        >
          S
        </div>
        <span className="font-sans text-[13px] font-bold text-text tracking-wide hidden sm:block">
          MONITOR
        </span>
      </div>

      {/* Nav tabs */}
      <nav className="flex items-center gap-0.5 overflow-x-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.08em] rounded transition-colors whitespace-nowrap ${
                isActive
                  ? "text-gold bg-gold/[0.07] border border-gold/25"
                  : "text-text-dim hover:text-text border border-transparent"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Right section */}
      <div className="ml-auto flex items-center gap-2.5 shrink-0">
        <div className="flex items-center gap-1">
          <LiveDot />
          <span className="font-mono text-[8px] font-medium text-red uppercase">Live</span>
        </div>
        <span className="font-mono text-[8px] text-green px-1.5 py-0.5 bg-green/[0.07] rounded border border-green/25 hidden sm:inline">
          FEEDS OK
        </span>
        <span className="font-mono text-[10px] text-text-dim tabular-nums">{time}</span>
      </div>
    </header>
  );
}
