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
  const { ringClass, bubble } = getVariant(section, isMaxOpen);

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
      {/* Interaction Hint */}
      {/* Interaction Hint */}
      {!isMaxOpen && (
        <div className="absolute bottom-full mb-3 px-4 py-2 rounded-2xl bg-slate-900/90 border border-sky-500/50 text-sky-100 text-[11px] font-medium shadow-[0_0_20px_rgba(56,189,248,0.4)] animate-bounce whitespace-nowrap backdrop-blur-md">
          I&apos;m live! Ask me anything. ⚡
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-sky-500/50" />
        </div>
      )}
      <div className="relative w-12 h-12 md:w-14 md:h-14 group-hover:scale-110 transition-transform duration-300">
        {/* Radiating Light (Outer Pulse) */}
        <div
          className={`absolute -inset-4 rounded-full bg-gradient-to-tr ${ringClass} opacity-40 animate-ping blur-xl`}
        />

        {/* Pulsing Glow Layer (Outer Aura) */}
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-tr ${ringClass} opacity-60 animate-orb-pulse blur-lg`}
        />

        {/* Core Sphere (Solid Energy) */}
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-br ${ringClass} shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.6),inset_4px_4px_10px_rgba(255,255,255,0.4)]`}
        />

        {/* Internal Plasma/Turbulence Effect (Simulated with gradient) */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8),transparent_70%)] opacity-30 mix-blend-overlay animate-pulse" />

        {/* Specular Highlight (Glassy Shine) */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.9)_0%,transparent_25%)]" />

        {/* Rim Light (Backlight) */}
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_8px_rgba(255,255,255,0.2)]" />
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
