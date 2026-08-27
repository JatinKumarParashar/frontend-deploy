import { Headphones } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { Panel, Recommendation } from "../components/ui";
import { Page } from "./HomePage";

export default function RecommendationsPage() {
  const { memory } = useOutletContext();
  const artist = memory.preference_artist || "Hits";
  const activity = memory.episode_activity || "Workout";
  return (
    <Page title="Recommendations">
      <div className="grid gap-5 md:grid-cols-3">
        {[
          ["Recommended Songs", `${artist} ${activity}`],
          ["Curated Playlists", `${activity} Daily Mix`],
          ["Podcast Shows", `${memory.podcast_topic || "Technology"} podcast`],
        ].map(([title, query]) => (
          <Panel key={title} title={title} icon={Headphones}>
            <div className="space-y-3">
              <Recommendation query={query} />
              <Recommendation query={`Best of ${artist}`} />
            </div>
          </Panel>
        ))}
      </div>
    </Page>
  );
}
