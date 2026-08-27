import { useEffect, useState } from "react";
import { Check, ChevronRight, Database, Trash2 } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { api } from "../services/api";
import { Panel } from "../components/ui";
import { Page } from "./HomePage";

const fields = {
  preference_artist: "Favorite Artist",
  episode_mood: "Preferred Mood",
  episode_activity: "Preferred Activity",
  podcast_topic: "Podcast Interest",
  exclusion: "Excluded Genre (Ban)",
};
export default function MemoriesPage() {
  const { user, memory, refresh } = useOutletContext();
  const [graph, setGraph] = useState([]);
  const [editing, setEditing] = useState({});
  useEffect(() => {
    api(`/memory/graph/${user.user_id}`)
      .then((data) => setGraph(data.active_triples || []))
      .catch(() => {});
  }, [user.user_id, memory]);
  async function save(field, value) {
    await api("/memory/update-field", {
      method: "POST",
      body: JSON.stringify({
        user_id: user.user_id,
        field,
        value: value || null,
      }),
    });
    refresh();
  }
  return (
    <Page title="My Memories">
      <div className="mb-6 grid gap-3 md:grid-cols-2">
        {Object.entries(fields).map(([field, label]) => (
          <div key={field} className="memory-row">
            <div>
              <span className="label">{label}</span>
              <strong>{memory[field] || "Not set"}</strong>
            </div>
            <div className="flex gap-2">
              <input
                className="input min-w-0"
                value={editing[field] ?? memory[field] ?? ""}
                onChange={(event) =>
                  setEditing({ ...editing, [field]: event.target.value })
                }
              />
              <button
                onClick={() => save(field, editing[field] ?? memory[field])}
                className="primary-icon"
              >
                <Check size={17} />
              </button>
              <button onClick={() => save(field, "")} className="danger-icon">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Panel title="Active Temporal Graph Triples" icon={Database}>
        {graph.length ? (
          graph.map((triple) => (
            <div
              key={triple.id}
              className="mb-2 flex flex-wrap items-center gap-2 rounded-lg border-l-4 border-[#1db954] bg-[#1e1e1e] p-3 text-sm"
            >
              <span className="text-[#1db954]">{triple.subject}</span>
              <ChevronRight size={14} className="text-[#00d2ff]" />
              <span className="text-[#00d2ff]">{triple.predicate}</span>
              <ChevronRight size={14} className="text-[#00d2ff]" />
              <strong>{triple.object}</strong>
              <span className="ml-auto text-xs text-[#888]">
                {Math.round(triple.confidence * 100)}% · {triple.provenance}
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-[#888]">
            No active graph triples recorded yet.
          </p>
        )}
      </Panel>
    </Page>
  );
}
