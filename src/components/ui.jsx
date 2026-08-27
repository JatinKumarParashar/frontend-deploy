import { Play, Radio } from "lucide-react";

export function Logo({ compact = false }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid size-8 place-items-center rounded-full bg-[#1db954] text-[#101010]">
        <Radio size={19} strokeWidth={2.8} />
      </div>
      {!compact && (
        <span className="text-[19px] font-bold tracking-[-.02em]">
          AI Memory Studio
        </span>
      )}
    </div>
  );
}

export function Field({ label, ...props }) {
  return (
    <label className="block text-sm font-medium">
      <span className="mb-2 block">{label}</span>
      <input className="input" {...props} />
    </label>
  );
}
export function PrimaryButton({ icon: Icon, children, ...props }) {
  return (
    <button className="primary-button" {...props}>
      <Icon size={17} />
      {children}
    </button>
  );
}
export function Badge({ children, tone = "green" }) {
  return (
    <span
      className={`badge ${tone === "green" ? "border-[#1db954] bg-[#1db954]/10 text-[#1db954]" : "border-[#383838] bg-[#222] text-white"}`}
    >
      {children}
    </span>
  );
}
export function Panel({ title, icon: Icon, children, className = "" }) {
  return (
    <section className={`panel ${className}`}>
      <div className="mb-5 flex items-center gap-2 border-b border-[#282828] pb-4">
        <Icon size={18} className="text-[#1db954]" />
        <h2 className="font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  );
}
export function Recommendation({ query }) {
  return (
    <div className="rounded-xl border border-[#282828] bg-[#121212] p-4">
      <Badge>Vibe: {query}</Badge>
      <h3 className="mt-3 font-semibold">{query} Selection</h3>
      <p className="mt-1 text-sm text-[#b3b3b3]">
        Spotify AI Curated · Session Selection
      </p>
      <a
        className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#1db954]"
        href={`https://open.spotify.com/search/${encodeURIComponent(query)}`}
        target="_blank"
        rel="noreferrer"
      >
        <Play size={14} fill="currentColor" /> Play on Spotify
      </a>
    </div>
  );
}
