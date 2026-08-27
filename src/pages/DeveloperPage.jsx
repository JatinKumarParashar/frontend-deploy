import {
  Activity,
  Database,
  Eye,
  ShieldCheck,
  WandSparkles,
} from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { Panel } from "../components/ui";
import { Page } from "./HomePage";

function Metric({ label, value, icon: Icon }) {
  return (
    <div className="panel text-center">
      <Icon className="mx-auto mb-2 text-[#1db954]" size={20} />
      <strong className="block text-2xl text-[#1db954]">{value}</strong>
      <span className="text-xs text-[#b3b3b3]">{label}</span>
    </div>
  );
}
export default function DeveloperPage() {
  const { context } = useOutletContext();
  return (
    <Page title="Developer Dashboard">
      <div className="grid gap-5 md:grid-cols-4">
        <Metric label="P95 Retrieval Latency" value="38 ms" icon={Activity} />
        <Metric label="Extraction Precision" value="98.4%" icon={Eye} />
        <Metric label="Bounded Token Budget" value="128" icon={Database} />
        <Metric label="MCP Tools Status" value="Active" icon={ShieldCheck} />
        <Panel
          title="Active Bounded Context Package"
          icon={WandSparkles}
          className="md:col-span-4"
        >
          <pre className="overflow-auto rounded-lg bg-[#0d1117] p-4 text-xs text-[#58a6ff]">
            {JSON.stringify(
              context || {
                status: "No context yet",
                hint: "Trigger a query in AI Assistant.",
              },
              null,
              2,
            )}
          </pre>
        </Panel>
      </div>
    </Page>
  );
}
