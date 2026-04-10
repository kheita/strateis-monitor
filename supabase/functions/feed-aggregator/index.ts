import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RSS_SOURCES = [
  { url: "https://disruptafrica.com/feed/", category: "startup", source: "DISRUPT AFRICA" },
  { url: "https://techpoint.africa/feed/", category: "startup", source: "TECHPOINT AFRICA" },
  { url: "https://techcrunch.com/tag/africa/feed/", category: "startup", source: "TECHCRUNCH AFRICA" },
  { url: "https://www.jeuneafrique.com/feed/", category: "startup", source: "JEUNE AFRIQUE" },
  { url: "https://african.business/feed/", category: "startup", source: "AFRICAN BUSINESS" },
  { url: "https://ventureburn.com/feed/", category: "startup", source: "VENTUREBURN" },
  { url: "https://www.anthropic.com/feed.xml", category: "ai_tech", source: "ANTHROPIC" },
  { url: "https://openai.com/blog/rss.xml", category: "ai_tech", source: "OPENAI" },
  { url: "https://blog.google/technology/ai/rss/", category: "ai_tech", source: "GOOGLE AI" },
  { url: "https://huggingface.co/blog/feed.xml", category: "ai_tech", source: "HUGGINGFACE" },
  { url: "https://github.blog/feed/", category: "ai_tech", source: "GITHUB" },
  { url: "https://techcrunch.com/category/artificial-intelligence/feed/", category: "ai_tech", source: "TECHCRUNCH AI" },
];

function parseRSS(xml: string) {
  const items: Array<{
    title: string;
    link: string;
    pubDate: string;
    description: string;
  }> = [];

  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const content = match[1];
    const title =
      content.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] ||
      content.match(/<title>(.*?)<\/title>/)?.[1] ||
      "";
    const link = content.match(/<link>(.*?)<\/link>/)?.[1] || "";
    const pubDate = content.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || "";
    const description =
      content.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)?.[1] ||
      content.match(/<description>([\s\S]*?)<\/description>/)?.[1] ||
      "";
    if (title && link) {
      items.push({
        title: title.replace(/<[^>]*>/g, "").trim(),
        link: link.trim(),
        pubDate,
        description: description.replace(/<[^>]*>/g, "").trim(),
      });
    }
  }
  return items;
}

serve(async (_req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  let totalInserted = 0;
  let totalErrors = 0;

  for (const source of RSS_SOURCES) {
    try {
      const res = await fetch(source.url, {
        headers: { "User-Agent": "Strateis-Monitor/1.0" },
        signal: AbortSignal.timeout(10000),
      });
      if (!res.ok) {
        console.error(`HTTP ${res.status} for ${source.source}`);
        totalErrors++;
        continue;
      }

      const xml = await res.text();
      const items = parseRSS(xml);

      for (const item of items.slice(0, 10)) {
        const { error } = await supabase.from("feeds").upsert(
          {
            source: source.source,
            category: source.category,
            title: item.title,
            url: item.link,
            published_at: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
            summary: item.description.slice(0, 300) || null,
            tags: [],
          },
          { onConflict: "url" },
        );
        if (error) {
          console.error(`Upsert error for ${source.source}:`, error.message);
        } else {
          totalInserted++;
        }
      }
    } catch (e) {
      console.error(`Failed to fetch ${source.source}:`, e);
      totalErrors++;
    }
  }

  return new Response(
    JSON.stringify({
      ok: true,
      inserted: totalInserted,
      errors: totalErrors,
      timestamp: new Date().toISOString(),
    }),
    { headers: { "Content-Type": "application/json" } },
  );
});
