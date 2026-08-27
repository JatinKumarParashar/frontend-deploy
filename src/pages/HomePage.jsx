import { Activity, ArrowRight, Headphones, Play } from "lucide-react";
import { NavLink, useOutletContext } from "react-router-dom";
import { Badge, Panel, Recommendation } from "../components/ui";

export default function HomePage() {
  const { memory } = useOutletContext();
  const rows = [
    ["Mood", memory.episode_mood || "Upbeat / Relaxed"],
    ["Activity", memory.episode_activity || "Listening"],
    ["Favorite Artist", memory.preference_artist || "Not set"],
    ["Podcast Interest", memory.podcast_topic || "None"],
    ["Excluded Genres", memory.exclusion || "None"],
  ];
  return (
    <Page title="Home">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <Panel title="Today's Active Context" icon={Activity}>
          <div className="space-y-3">
            {rows.map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between border-b border-[#282828] pb-2 text-sm"
              >
                <span className="text-[#b3b3b3]">{label}</span>
                <strong
                  className={
                    label === "Excluded Genres"
                      ? "text-[#ff5555]"
                      : "text-[#1db954]"
                  }
                >
                  {value}
                </strong>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge tone="dark">
              <Play size={13} fill="currentColor" />{" "}
              {memory.episode_activity || "Workout"} Mix
            </Badge>
            <Badge tone="dark">
              <Play size={13} fill="currentColor" />{" "}
              {memory.preference_artist || "Hits"} Radio
            </Badge>
            <Badge tone="dark">
              <Play size={13} fill="currentColor" /> Focus Flow
            </Badge>
          </div>
        </Panel>
        <Panel title="Quick Recommendations" icon={Headphones}>
          <Recommendation
            query={
              memory.preference_artist ||
              memory.podcast_topic ||
              "Trending Hits"
            }
          />
          <NavLink
            to="/recommendations"
            className="mt-3 text-sm font-semibold text-[#1db954]"
          >
            View all recommendations <ArrowRight className="inline" size={15} />
          </NavLink>
        </Panel>
      </div>
    </Page>
  );
}
export function Page({ title, children }) {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mt-1 text-sm text-[#b3b3b3]">
          Your personalized music and continuous memory overview.
        </p>
      </div>
      {children}
    </>
  );
}
