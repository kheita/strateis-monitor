import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { MacroIndicator } from "@/lib/types";

export function useMacro() {
  return useQuery<MacroIndicator[]>({
    queryKey: ["macro"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("macro_indicators")
        .select("*")
        .order("label");
      if (error) throw error;
      return (data ?? []).map((row) => ({
        ...row,
        sparkline: row.sparkline_data ?? [],
      })) as MacroIndicator[];
    },
    staleTime: 60_000,
  });
}
