import { FeedPanel } from "@/components/panels/FeedPanel";
import { seedStartupFeeds, seedAiFeeds } from "@/data/seed";

export function FeedsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <FeedPanel title="Startup & Business Africa" icon="🌍" feeds={seedStartupFeeds} />
      <FeedPanel title="AI & Tech" icon="🤖" feeds={seedAiFeeds} />
    </div>
  );
}
