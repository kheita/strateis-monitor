import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { RegulatorySignal } from "@/lib/types";

export function useRegulatory() {
  return useQuery<RegulatorySignal[]>({
    queryKey: ["regulatory"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("regulatory_signals")
        .select("*")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as RegulatorySignal[];
    },
    staleTime: 5 * 60_000,
  });
}
