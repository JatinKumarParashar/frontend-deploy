import { useEffect, useState } from "react";
import {
  Activity,
  Bot,
  Database,
  Headphones,
  LogOut,
  Radio,
  Settings,
} from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { Badge, Logo } from "../components/ui";

const links = [
  ["/", "Home", Radio],
  ["/chat", "AI Assistant", Bot],
  ["/memories", "My Memories", Database],
  ["/recommendations", "Recommendations", Headphones],
  ["/controls", "Memory Controls", Settings],
];

export default function AppLayout({ user, onLogout }) {
  const [memory, setMemory] = useState({});
  const [context, setContext] = useState(null);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Welcome back, ${user.full_name}! Tell me what vibe, music, or podcast you're looking for today.`,
    },
  ]);
  const navigate = useNavigate();
  async function refresh() {
    try {
      setMemory(await api(`/memory/${user.user_id}`));
    } catch {
      setMemory({});
    }
  }
  useEffect(() => {
    refresh();
  }, []);
  const allLinks =
    user.role === "Developer"
      ? [...links, ["/developer", "Developer Dashboard", Activity]]
      : links;
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="mx-auto max-w-[1440px] px-5 pb-10 lg:px-8">
        <header className="flex flex-wrap items-center justify-between gap-4 py-3">
          <Logo />
          <div className="flex items-center gap-3">
            <Badge>
              {user.role === "Developer" ? "Admin" : "User"} · {user.full_name}
            </Badge>
            <button
              onClick={() => {
                onLogout();
                navigate("/login");
              }}
              className="secondary-button"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </header>
        <div className="border-b border-[#282828]" />
        <nav className="my-5 flex gap-1 overflow-x-auto rounded-xl border border-[#282828] bg-[#181818] p-1">
          {allLinks.map(([to, label, Icon]) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) => `tab ${isActive ? "active" : ""}`}
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>
        <Outlet
          context={{
            user,
            memory,
            refresh,
            messages,
            setMessages,
            context,
            setContext,
          }}
        />
      </div>
    </div>
  );
}
