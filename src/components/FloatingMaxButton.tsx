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
        fixed right-5 bottom-5 z-50
        flex flex-col items-center gap-1.5
        group
      "
      aria-label="Chat with MAX"
    >
      <div
        className={`
          w-14 h-14 md:w-16 md:h-16   /* ⬅ bigger button */
          rounded-full
          bg-gradient-to-tr ${ringClass}
          border
          flex items-center justify-center
          shadow-[0_0_34px_rgba(56,189,248,0.55)]  /* ⬅ stronger glow */
          group-hover:scale-105
          transition-transform
        `}
        style={{
          backgroundImage: "url(/me-minifig.png)", // keep your minifig if present
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Fallback / overlay — emoji reflects current section */}
        <span
          className="
            text-[20px] md:text-[22px]   /* ⬅ bigger emoji */
            drop-shadow
            mix-blend-screen
          "
        >
          {emoji}
        </span>
      </div>

      {/* Bottom label — slightly larger for readability */}
      <div
        className="
          px-3 py-1.5 rounded-full             /* ⬅ larger pill */
          bg-black/90 border border-slate-800/80
          text-[10px] md:text-xs text-slate-300 /* ⬅ larger text */
          flex items-center gap-1.5
        "
      >
        <span className="text-sky-400/80">
          {label || "MAX"}
        </span>
        <span className="text-slate-500 hidden sm:inline">
          · {bubble}
        </span>
      </div>
    </button>
  );
}
