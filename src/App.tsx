import { Outlet } from "react-router-dom";
import { TopBar } from "@/components/layout/TopBar";
import { TickerBanner } from "@/components/layout/TickerBanner";

export function App() {
  return (
    <div className="min-h-screen bg-bg-deep">
      <TopBar />
      <TickerBanner />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
