import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { CountryIndex } from "@/lib/types";

export function useCountryIndex() {
  return useQuery<CountryIndex[]>({
    queryKey: ["countryIndex"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("country_index")
        .select("*")
        .order("score", { ascending: false });
      if (error) throw error;
      return (data ?? []) as CountryIndex[];
    },
    staleTime: 5 * 60_000,
  });
}
