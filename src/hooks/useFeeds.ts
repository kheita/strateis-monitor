import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Feed } from "@/lib/types";

export function useFeeds(category: "startup" | "ai_tech") {
  return useQuery<Feed[]>({
    queryKey: ["feeds", category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("feeds")
        .select("*")
        .eq("category", category)
        .order("published_at", { ascending: false })
        .limit(20);
      if (error) throw error;
      return (data ?? []) as Feed[];
    },
    staleTime: 5 * 60_000,
  });
}
