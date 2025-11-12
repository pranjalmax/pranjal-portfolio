// src/components/FloatingMaxButton.tsx

import type { SectionId } from "../types";

interface FloatingMaxButtonProps {
  label: string;
  isMaxOpen: boolean;
  onToggle: () => void;
  section: SectionId;
}

function getVariant(section: SectionId, isMaxOpen: boolean) {
  if (isMaxOpen) {
    return {
      emoji: "💬",
      ringClass:
        "from-sky-500/90 via-sky-400/40 to-transparent border-sky-400",
      bubble: "Talking as MAX",
    };
  }

  switch (section) {
    case "ai-lab":
      return {
        emoji: "🤖",
        ringClass:
          "from-sky-500/90 via-cyan-400/20 to-transparent border-sky-400",
        bubble: "AI Lab guide",
      };
    case "build-stack":
      return {
        emoji: "🧑‍💻",
        ringClass:
          "from-sky-500/80 via-slate-800 to-transparent border-sky-300",
        bubble: "Shipping apps",
      };
    case "foundations":
      return {
        emoji: "🧪",
        ringClass:
          "from-fuchsia-500/80 via-sky-500/10 to-transparent border-fuchsia-400/80",
        bubble: "ML / research mode",
      };
    case "experience":
      return {
        emoji: "👔",
        ringClass:
          "from-emerald-500/80 via-sky-500/10 to-transparent border-emerald-400/80",
        bubble: "Experience lane",
      };
    case "about":
      return {
        emoji: "📖",
        ringClass:
          "from-sky-500/70 via-slate-900 to-transparent border-sky-300/80",
        bubble: "About Pranjal",
      };
    case "playground":
      return {
        emoji: "🕹️",
        ringClass:
          "from-cyan-400/90 via-sky-500/20 to-transparent border-cyan-300",
        bubble: "Playground mode",
      };
    case "contact":
      return {
        emoji: "📨",
        ringClass:
          "from-sky-500/90 via-emerald-400/20 to-transparent border-sky-300",
        bubble: "Say hi / hire",
      };
    case "hero":
    default:
      return {
        emoji: "🧑‍🚀",
        ringClass:
          "from-sky-500/80 via-sky-500/10 to-transparent border-sky-400/80",
        bubble: "Scroll the lab",
      };
  }
}

export default function FloatingMaxButton({
  label,
  isMaxOpen,
  onToggle,
  section,
}: FloatingMaxButtonProps) {
  const { emoji, ringClass, bubble } = getVariant(section, isMaxOpen);

  return (
    <button
      onClick={onToggle}
      className="
        fixed right-4 bottom-4 z-40
        flex flex-col items-center gap-1
        group
      "
      aria-label="Chat with MAX"
    >
      <div
        className={`
          w-12 h-12 md:w-14 md:h-14
          rounded-full
          bg-gradient-to-tr ${ringClass}
          border
          flex items-center justify-center
          shadow-[0_0_28px_rgba(56,189,248,0.55)]
          group-hover:scale-105
          transition-transform
        `}
        /* Removed background image that caused 404 (me-minifig.png).
           If you later add an asset, prefer:
           import me from "../assets/me-minifig.png";
           style={{ backgroundImage: \`url(\${me})\` }} */
      >
        <span className="text-[18px] md:text-[20px] drop-shadow mix-blend-screen">
          {emoji}
        </span>
      </div>

      <div
        className="
          px-2 py-1 rounded-full
          bg-black/90 border border-slate-800/80
          text-[9px] md:text-[10px] text-slate-300
          flex items-center gap-1
        "
      >
        <span className="text-sky-400/80">
          {label || "MAX"}
        </span>
        <span className="text-slate-500 hidden sm:inline">· {bubble}</span>
      </div>
    </button>
  );
}
