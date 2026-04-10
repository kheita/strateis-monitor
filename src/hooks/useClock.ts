import { useState, useEffect } from "react";

export function useClock() {
  const [time, setTime] = useState(() => formatUTC(new Date()));

  useEffect(() => {
    const id = setInterval(() => setTime(formatUTC(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

function formatUTC(d: Date): string {
  return d.toLocaleTimeString("en-GB", {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }) + " UTC";
}
