import { useState } from "react";
import { Download, Eraser, Settings, ShieldCheck } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { api } from "../services/api";
import { Panel } from "../components/ui";
import { Page } from "./HomePage";

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center justify-between border-b border-[#282828] py-4 text-sm">
      <span>{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full ${checked ? "bg-[#1db954]" : "bg-[#383838]"}`}
      >
        <span
          className={`absolute top-1 size-4 rounded-full bg-white ${checked ? "left-6" : "left-1"}`}
        />
      </button>
    </label>
  );
}
export default function ControlsPage() {
  const { user, memory, refresh } = useOutletContext();
  const [busy, setBusy] = useState(false);
  async function toggle(setting, state) {
    await api("/memory/toggle-control", {
      method: "POST",
      body: JSON.stringify({ user_id: user.user_id, setting, state }),
    });
    refresh();
  }
  async function purge() {
    setBusy(true);
    await api(`/memory/purge/${user.user_id}`, { method: "POST" });
    setBusy(false);
    refresh();
  }
  async function exportData() {
    const data = await api(`/memory/export/${user.user_id}`);
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `spotify_memory_${user.user_id}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
  }
  return (
    <Page title="Memory Controls">
      <div className="grid gap-5 md:grid-cols-2">
        <Panel title="Memory State & Personalization" icon={ShieldCheck}>
          <Toggle
            label="Pause Memory (Incognito Session)"
            checked={memory.memory_paused}
            onChange={(value) => toggle("pause", value)}
          />
          <Toggle
            label="Turn On Governed Personalization"
            checked={memory.personalization_enabled}
            onChange={(value) => toggle("personalization", value)}
          />
        </Panel>
        <Panel title="GDPR Export & Permanent Erasure" icon={Settings}>
          <button onClick={exportData} className="secondary-button w-full">
            <Download size={16} /> Download My Stored Data (JSON)
          </button>
          <button
            disabled={busy}
            onClick={purge}
            className="danger-button mt-3 w-full"
          >
            <Eraser size={16} />{" "}
            {busy ? "Purging..." : "Delete All My Memories"}
          </button>
        </Panel>
      </div>
    </Page>
  );
}
