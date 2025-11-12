// src/components/PlaygroundRunner.tsx

import { useState } from "react";
import type React from "react";

export default function PlaygroundRunner() {
  const [position, setPosition] = useState(12);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(5, Math.min(95, x));
    setPosition(clamped);
  };

  return (
    <div
      className="
        mt-3 relative w-full h-14
        rounded-2xl bg-slate-900/70 border border-slate-800
        overflow-hidden cursor-pointer group
      "
      onMouseMove={handleMove}
    >
      {/* Track */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center">
        <div className="h-[2px] w-full bg-slate-800/90" />
      </div>

      {/* Milestones / tech tags */}
      <div className="absolute inset-y-3 flex justify-between px-6 text-[7px] text-slate-500 pointer-events-none">
        <div className="px-2 py-1 rounded-xl bg-slate-900/90 border border-slate-800">
          RAG
        </div>
        <div className="px-2 py-1 rounded-xl bg-slate-900/90 border border-slate-800">
          Guardrails
        </div>
        <div className="px-2 py-1 rounded-xl bg-slate-900/90 border border-slate-800">
          Voice AI
        </div>
        <div className="px-2 py-1 rounded-xl bg-slate-900/90 border border-slate-800">
          ServiceNow
        </div>
      </div>

      {/* Mini avatar */}
      <div
        className="
          absolute bottom-2
          -translate-x-1/2
          transition-all duration-100
          pointer-events-none
        "
        style={{ left: `${position}%` }}
      >
        <div
          className="
            w-6 h-6 rounded-2xl
            bg-gradient-to-tr from-sky-500 via-cyan-400/10 to-transparent
            border border-sky-400/80
            flex items-center justify-center
            shadow-[0_0_12px_rgba(56,189,248,0.6)]
          "
        >
          <span className="text-[12px]">🧑‍🚀</span>
        </div>
      </div>

      {/* Copy */}
      <div className="absolute left-3 top-2 text-[7px] text-slate-500 pointer-events-none">
        Move your cursor → guide mini Pranjal through his stack.
      </div>
      <div className="absolute right-3 top-2 text-[7px] text-sky-400/80 pointer-events-none hidden sm:block">
        Quick visual tour. No loading screens.
      </div>
    </div>
  );
}
