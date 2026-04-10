import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { MonitorEvent } from "@/lib/types";

export function useEvents() {
  return useQuery<MonitorEvent[]>({
    queryKey: ["events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("monitor_events")
        .select("*")
        .order("event_date", { ascending: true });
      if (error) throw error;
      return (data ?? []) as MonitorEvent[];
    },
    staleTime: 5 * 60_000,
  });
}
