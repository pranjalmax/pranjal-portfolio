// src/components/MaxChat.tsx

import { useState } from "react";
import type { KeyboardEvent } from "react";
import type { MaxMessage } from "../types";

interface MaxChatProps {
  isOpen: boolean;
  onClose: () => void;
}

// Configure MAX API endpoint
const API_URL =
  import.meta.env.VITE_MAX_API_URL ||
  "https://pranjal-chat-api.vercel.app/api/chat";

type ApiResponse = {
  answer?: string;
  assistant?: string;
  error?: string;
};

// ⬇️ NEW: helper to render long replies as short paragraphs.
// Splits on blank lines for paragraphs; single newlines become soft breaks.
function BubbleText({ text }: { text: string }) {
  const parts = text.trim().split(/\n{2,}/); // paragraphs on double+ newline
  return (
    <div className="space-y-1.5 whitespace-pre-line">
      {parts.map((p, i) => (
        <p key={i}>{p.trim()}</p>
      ))}
    </div>
  );
}

export default function MaxChat({ isOpen, onClose }: MaxChatProps) {
  const [messages, setMessages] = useState<MaxMessage[]>([
    {
      from: "max",
      text:
        "Hey, I'm MAX — tuned only on Pranjal's projects, skills, and experience. Ask me what to look at for your role.",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || sending) return;

    const userMessage: MaxMessage = { from: "user", text: trimmed };

    // optimistic
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setApiError(null);
    setSending(true);

    try {
      const history = messages.map((m) => ({
        role: m.from === "user" ? "user" : "assistant",
        content: m.text,
      }));

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmed,
          history,
        }),
      });

      const data: ApiResponse = await res.json().catch(
        () => ({}) as ApiResponse
      );

      if (!res.ok || data.error) {
        const msg =
          data.error ||
          "MAX had trouble reaching the model. Try again or check the API config.";
        setApiError(msg);
        setMessages((prev) => [
          ...prev,
          {
            from: "max",
            text:
              "I’m having some trouble talking to my backend right now, but the portfolio is fully browsable above. Check AI Lab, foundations, and contact details directly.",
          },
        ]);
      } else {
        const answer =
          data.answer ||
          "I couldn't parse a response, but you can explore the AI Lab and sections above while this is checked.";
        setMessages((prev) => [...prev, { from: "max", text: answer }]);
      }
    } catch (err) {
      setApiError(
        "Network / CORS issue hitting pranjal-chat-api. Once deployed correctly, MAX will answer from your live backend."
      );
      setMessages((prev) => [
        ...prev,
        {
          from: "max",
          text:
            "Looks like the API isn't reachable from here. On the deployed site, I'll answer based only on Pranjal's real data.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="
        fixed bottom-20 right-5 z-[60]
        w-[360px] sm:w-[400px] lg:w-[430px]   /* bigger width */
        max-h-[72vh]                          /* taller panel */
        rounded-2xl border border-sky-500/40
        bg-[#020817]/98 backdrop-blur
        shadow-[0_26px_70px_rgba(15,23,42,0.98)]
        flex flex-col
      "
    >
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between gap-2 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-400/60 flex items-center justify-center text-[14px]">
            🤖
          </div>
          <div className="leading-tight">
            <div className="text-[12px] font-semibold text-slate-100">
              MAX — Portfolio Copilot
            </div>
            <div className="text-[10px] text-slate-500">
              Answers only about Pranjal.
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-slate-500 hover:text-sky-400 text-[14px] leading-none"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div
        className="
          px-4 py-3 space-y-1.5
          overflow-y-auto
          flex-1
          custom-scroll
        "
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`text-[11px] leading-snug ${
              m.from === "user"
                ? "text-right"
                : "text-left text-sky-100"
            }`}
          >
            <div
              className={`
                inline-block px-3 py-1.5 rounded-xl
                ${
                  m.from === "user"
                    ? "bg-sky-500/15 text-sky-100 border border-sky-500/40"
                    : "bg-slate-900/80 text-slate-100 border border-slate-700/70"
                }
                max-w-[85%]
              `}
            >
              {/* ⬇️ NEW: paragraph-aware rendering */}
              <BubbleText text={m.text} />
            </div>
          </div>
        ))}

        {sending && (
          <div className="text-[9px] text-sky-400 mt-1">
            MAX is thinking…
          </div>
        )}

        {apiError && (
          <div className="text-[9px] text-amber-400/90 mt-2">
            {apiError}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-3 py-3 border-t border-slate-800/80 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask which projects match your role…"
          className="
            flex-1 bg-slate-950/20 rounded-lg px-3 py-2
            outline-none
            text-[11px] text-slate-100
            placeholder:text-slate-600
            border border-slate-800/60 focus:border-sky-500/70
          "
        />
        <button
          onClick={handleSend}
          disabled={sending || !input.trim()}
          className={`
            px-3 py-1.5 rounded-lg
            text-[10px] font-medium
            ${
              sending || !input.trim()
                ? "bg-slate-700/70 text-slate-500 cursor-not-allowed"
                : "bg-sky-500/90 text-slate-950 hover:bg-sky-400 transition"
            }
          `}
        >
          Send
        </button>
      </div>
    </div>
  );
}
