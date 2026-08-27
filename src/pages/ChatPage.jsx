import { useState } from "react";
import { ArrowRight, Bot, Sparkles } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { api } from "../services/api";
import { Page } from "./HomePage";
import { Panel } from "../components/ui";

export default function ChatPage() {
  const { user, messages, setMessages, setContext } = useOutletContext();
  const [query, setQuery] = useState("");
  const prompts = [
    "Recommend songs for my workout.",
    "I want relaxing music for sleeping.",
    "Suggest top AI and tech podcasts.",
    "Create a focus playlist for studying.",
  ];
  async function send(value) {
    if (!value.trim()) return;
    setQuery("");
    setMessages((items) => [...items, { role: "user", content: value }]);
    try {
      const data = await api("/ai/personalized-chat", {
        method: "POST",
        body: JSON.stringify({ user_id: user.user_id, message: value }),
      });
      setContext(data.context_package);
      setMessages((items) => [
        ...items,
        { role: "assistant", content: data.ai_dj_response },
      ]);
    } catch (error) {
      setMessages((items) => [
        ...items,
        { role: "assistant", content: error.message },
      ]);
    }
  }
  return (
    <Page title="AI Assistant">
      <div className="mx-auto max-w-4xl">
        <div className="mb-5 flex flex-wrap gap-2">
          {prompts.map((prompt) => (
            <button key={prompt} onClick={() => send(prompt)} className="chip">
              <Sparkles size={14} />
              {prompt}
            </button>
          ))}
        </div>
        <Panel title="AI Conversation & Memory DJ" icon={Bot}>
          <div className="min-h-[340px] space-y-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${message.role === "user" ? "rounded-br-sm bg-[#1db954] text-black" : "rounded-bl-sm bg-[#282828]"}`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              send(query);
            }}
            className="mt-5 flex gap-2"
          >
            <input
              className="input"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Type your message here..."
            />
            <button className="primary-icon" aria-label="Send">
              <ArrowRight size={19} />
            </button>
          </form>
        </Panel>
      </div>
    </Page>
  );
}
