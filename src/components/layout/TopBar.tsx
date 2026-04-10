import { NavLink } from "react-router-dom";
import { useClock } from "@/hooks/useClock";
import { LiveDot } from "@/components/ui/LiveDot";

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/feeds", label: "Feeds" },
  { to: "/analytics", label: "Analytics" },
];

export function TopBar() {
  const time = useClock();

  return (
    <header className="sticky top-0 z-50 flex items-center h-12 px-4 border-b border-border bg-bg-panel/90 backdrop-blur-md">
      {/* Logo */}
      <div className="flex items-center gap-1.5 mr-6">
        <span className="font-sans text-sm font-bold text-gold tracking-wide">STRATEIS</span>
        <span className="font-sans text-sm font-bold text-text tracking-wide">MONITOR</span>
      </div>

      {/* Nav */}
      <nav className="flex items-center gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-wider rounded transition-colors ${
                isActive
                  ? "text-gold border-b-2 border-gold"
                  : "text-text-dim hover:text-text"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Right section */}
      <div className="ml-auto flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <LiveDot />
          <span className="font-mono text-[10px] font-medium text-red uppercase">Live</span>
        </div>
        <span className="font-mono text-[10px] text-green px-1.5 py-0.5 bg-green/10 rounded border border-green/25">
          FEEDS OK
        </span>
        <span className="font-mono text-xs text-text-dim">{time}</span>
      </div>
    </header>
  );
}
