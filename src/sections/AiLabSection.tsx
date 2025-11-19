// src/sections/AiLabSection.tsx

import { useState } from "react";
import type { AiProjectKey } from "../types";

import guardAi from "../assets/guard_ai.png";
import privateAi from "../assets/private_ai.png";
import vanessaAi from "../assets/vanessa_ai.png";
import maxAi from "../assets/max_ai.png";

import demoGuard from "../assets/demo_guard.gif";
import demoPrivate from "../assets/demo_private.gif";
import demoVanessa from "../assets/demo_vanessa.gif";

type AiLabSectionProps = {
  expandedAi: AiProjectKey | null;
  onToggleAi: (key: AiProjectKey) => void;
  onOpenMax: () => void; // from App to pop MAX
};

// Update these URLs to your actual repos if needed.
const GITHUB_LINKS: Record<AiProjectKey, string> = {
  "hallucination-guard":
    "https://github.com/pranjalmax/hallucination-guard",
  "private-doc-chat":
    "https://github.com/pranjalmax/private-doc-chat",
  vanessa:
    "https://github.com/pranjalmax/vanessa-voice-ai",
  max:
    "https://github.com/pranjalmax/pranjal-chat-api",
};

const DEMO_GIFS: Partial<Record<AiProjectKey, string>> = {
  "hallucination-guard": demoGuard,
  "private-doc-chat": demoPrivate,
  vanessa: demoVanessa,
};

const AiLabSection = ({
  expandedAi,
  onToggleAi,
  onOpenMax,
}: AiLabSectionProps) => {
  const [visibleGif, setVisibleGif] = useState<AiProjectKey | null>(null);

  const handleGifToggle = (key: AiProjectKey) => {
    setVisibleGif((prev) => (prev === key ? null : key));
  };

  const openGithub = (key: AiProjectKey) => {
    const url = GITHUB_LINKS[key];
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  const renderActions = (key: AiProjectKey, showMaxCTA = false) => (
    <div className="mt-2 flex flex-wrap items-center gap-2 text-[9px]">
      <button
        className="px-2.5 py-1 rounded-full bg-sky-500/15 border border-sky-500/60 text-sky-300 hover:bg-sky-500/25 hover:border-sky-400 transition text-[9px]"
        onClick={(e) => {
          e.stopPropagation();
          openGithub(key);
        }}
      >
        View GitHub Repo
      </button>

      {DEMO_GIFS[key] && (
        <button
          className="px-2.5 py-1 rounded-full bg-slate-800/70 border border-slate-600/70 text-slate-200 hover:bg-slate-700 transition text-[9px]"
          onClick={(e) => {
            e.stopPropagation();
            handleGifToggle(key);
          }}
        >
          {visibleGif === key ? "Hide Demo GIF" : "View Demo GIF"}
        </button>
      )}

      {!showMaxCTA && (
        <span className="text-slate-400/90 text-[8.5px]">
          Live demo details in the GitHub README.
        </span>
      )}

      {showMaxCTA && (
        <button
          className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/70 text-emerald-300 hover:bg-emerald-500/25 hover:border-emerald-300 transition text-[9px]"
          onClick={(e) => {
            e.stopPropagation();
            onOpenMax();
          }}
        >
          Talk to MAX now
        </button>
      )}
    </div>
  );

  const renderGif = (key: AiProjectKey) => {
    if (visibleGif !== key || !DEMO_GIFS[key]) return null;
    return (
      <div className="mt-2 rounded-xl bg-black/50 border border-slate-800/90 overflow-hidden">
        <img
          src={DEMO_GIFS[key]}
          alt="Demo preview"
          className="w-full h-40 object-cover"
        />
      </div>
    );
  };

  return (
    <section
      id="ai-lab"
      className="pt-20 pb-14 space-y-6 scroll-mt-24"
    >
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-50">
            AI Lab — Flagship Builds
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Production-minded AI systems: evals, guardrails, client-only RAG, and voice agents.
            Click a card to see how it&apos;s wired.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Hallucination Guard */}
        <article
          className={`
            group relative rounded-2xl border bg-black/35
            border-sky-800/60 hover:border-sky-400/80
            shadow-[0_10px_32px_rgba(15,23,42,0.9)]
            px-3 py-3 flex flex-col gap-1.5 cursor-pointer
            transition-all duration-200
            ${expandedAi === "hallucination-guard" ? "ring-1 ring-sky-400/80 bg-black/55" : ""}
          `}
          onClick={() => onToggleAi("hallucination-guard")}
        >
          <div className="flex items-center gap-2 text-[9px] text-sky-400 uppercase tracking-[0.16em]">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
            Live evals & guardrails
          </div>

          <h3 className="text-sm font-semibold text-slate-50">
            Hallucination Guard
          </h3>

          <img
            src={guardAi}
            alt="Hallucination Guard UI illustration"
            className="w-full mt-1 mb-1 rounded-lg object-contain pointer-events-none select-none max-h-28"
          />

          <p className="text-[10px] text-slate-300 leading-relaxed">
            Guard your answers with structured checks on claims vs. citations.
            Designed to sit in front of any LLM and give PMs, eng, and legal a
            visible signal on whether responses are grounded.
          </p>

          {expandedAi === "hallucination-guard" && (
            <>
              <ul className="mt-1 space-y-1 text-[9px] text-slate-300">
                <li>
                  • Extracts atomic claims and maps them to cited sources; flags unsupported,
                  low-confidence, or conflicting statements.
                </li>
                <li>
                  • Ships with scoring, exportable reports, and hooks to plug into CI so bad
                  prompt/model changes never silently ship.
                </li>
                <li>
                  • Frontend-only variant for sensitive data; backend-ready variant for
                  production eval pipelines.
                </li>
              </ul>
              {renderActions("hallucination-guard")}
              {renderGif("hallucination-guard")}
            </>
          )}
        </article>

        {/* Private Doc Chat */}
        <article
          className={`
            group relative rounded-2xl border bg-black/35
            border-cyan-800/60 hover:border-cyan-400/80
            shadow-[0_10px_32px_rgba(15,23,42,0.9)]
            px-3 py-3 flex flex-col gap-1.5 cursor-pointer
            transition-all duration-200
            ${expandedAi === "private-doc-chat" ? "ring-1 ring-cyan-400/80 bg-black/55" : ""}
          `}
          onClick={() => onToggleAi("private-doc-chat")}
        >
          <div className="flex items-center gap-2 text-[9px] text-cyan-400 uppercase tracking-[0.16em]">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
            On-device RAG
          </div>

          <h3 className="text-sm font-semibold text-slate-50">
            Private Doc Chat — On-Device RAG
          </h3>

          <img
            src={privateAi}
            alt="Private document chat interface illustration"
            className="w-full mt-1 mb-1 rounded-lg object-contain pointer-events-none select-none max-h-28"
          />

          <p className="text-[10px] text-slate-300 leading-relaxed">
            Secure Q&amp;A over your PDFs with zero server. Chunking, embeddings,
            vector search, and answer synthesis all inside the browser.
          </p>

          {expandedAi === "private-doc-chat" && (
            <>
              <ul className="mt-1 space-y-1 text-[9px] text-slate-300">
                <li>
                  • Supports multi-page, multi-document corpora with semantic retrieval and
                  citation-linked answers.
                </li>
                <li>
                  • Ideal for compliance / legal / internal docs where SaaS LLMs are not allowed.
                </li>
                <li>
                  • Built so the same architecture can back a production RAG API.
                </li>
              </ul>
              {renderActions("private-doc-chat")}
              {renderGif("private-doc-chat")}
            </>
          )}
        </article>

        {/* Vanessa */}
        <article
          className={`
            group relative rounded-2xl border bg-black/35
            border-fuchsia-800/60 hover:border-fuchsia-400/80
            shadow-[0_10px_32px_rgba(15,23,42,0.9)]
            px-3 py-3 flex flex-col gap-1.5 cursor-pointer
            transition-all duration-200
            ${expandedAi === "vanessa" ? "ring-1 ring-fuchsia-400/80 bg-black/55" : ""}
          `}
          onClick={() => onToggleAi("vanessa")}
        >
          <div className="flex items-center gap-2 text-[9px] text-fuchsia-400 uppercase tracking-[0.16em]">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_10px_rgba(217,70,239,0.9)]" />
            Voice Agent
          </div>

          <h3 className="text-sm font-semibold text-slate-50">
            Vanessa — Voice Agent
          </h3>

          <img
            src={vanessaAi}
            alt="Vanessa voice agent illustration"
            className="w-full mt-1 mb-1 rounded-lg object-contain pointer-events-none select-none max-h-28"
          />

          <p className="text-[10px] text-slate-300 leading-relaxed">
            Human-feel voice assistant wired into real APIs: bookings, FAQs,
            account info, status checks — with latency + fallback logic.
          </p>

          {expandedAi === "vanessa" && (
            <>
              <ul className="mt-1 space-y-1 text-[9px] text-slate-300">
                <li>
                  • Streaming ASR/TTS + LLM orchestration with barge-in support and interruption handling.
                </li>
                <li>
                  • Configurable dialogue policies and escalation to humans when signals drop.
                </li>
                <li>
                  • Observability hooks for transcripts, errors, and conversion metrics.
                </li>
              </ul>
              {renderActions("vanessa")}
              {renderGif("vanessa")}
            </>
          )}
        </article>

        {/* MAX */}
        <article
          className={`
            group relative rounded-2xl border bg-black/35
            border-emerald-800/60 hover:border-emerald-400/80
            shadow-[0_10px_32px_rgba(15,23,42,0.9)]
            px-3 py-3 flex flex-col gap-1.5 cursor-pointer
            transition-all duration-200
            ${expandedAi === "max" ? "ring-1 ring-emerald-400/80 bg-black/55" : ""}
          `}
          onClick={() => onToggleAi("max")}
        >
          <div className="flex items-center gap-2 text-[9px] text-emerald-400 uppercase tracking-[0.16em]">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.9)]" />
            Portfolio Copilot
          </div>

          <h3 className="text-sm font-semibold text-slate-50">
            MAX — Portfolio Copilot
          </h3>

          <img
            src={maxAi}
            alt="MAX portfolio copilot illustration"
            className="w-full mt-1 mb-1 rounded-lg object-contain pointer-events-none select-none max-h-28"
          />

          <p className="text-[10px] text-slate-300 leading-relaxed">
            An embedded assistant that knows my stack, projects, and story. MAX
            responds like I would in a recruiter call — but instantly, 24/7.
          </p>

          {expandedAi === "max" && (
            <>
              <ul className="mt-1 space-y-1 text-[9px] text-slate-300">
                <li>
                  • Backed by a constrained knowledge base: portfolio content, project notes,
                  tech stack — no random web noise.
                </li>
                <li>
                  • Built as a reusable pattern for &quot;copilot for X&quot; experiences.
                </li>
                <li>
                  • Uses guardrails to avoid answering outside scope or making things up.
                </li>
              </ul>
              {renderActions("max", true)}
            </>
          )}
        </article>
      </div>

      {/* "More coming" animated hint */}
      <div className="mt-3 flex items-center gap-2 text-[9px] text-slate-400">
        <span className="relative inline-flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-40 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky-300" />
        </span>
        <span className="relative">
          More AI-native experiments are in the lab queue — this grid will keep
          growing.
        </span>
      </div>
    </section>
  );
};

export default AiLabSection;
