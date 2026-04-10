import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { KPI } from "@/lib/types";

export function useKpis() {
  return useQuery<KPI[]>({
    queryKey: ["kpis"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("monitor_kpis")
        .select("*")
        .order("label");
      if (error) throw error;
      return (data ?? []).map((row) => ({
        ...row,
        sparkline: row.sparkline_data ?? [],
      })) as KPI[];
    },
    staleTime: 60_000,
  });
}
