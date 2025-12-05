// src/sections/PlaygroundSection.tsx

import React, { useState } from "react";
import MagneticButton from "../components/MagneticButton";
import ScrollReveal from "../components/ScrollReveal";

type SignalMode = "ai-lab" | "build-stack" | "ml-research";

const PlaygroundSection: React.FC = () => {
  const [mode, setMode] = useState<SignalMode>("ai-lab");
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState("RAG & Retrieval");

  const modeLabel: Record<SignalMode, string> = {
    "ai-lab":
      "New builds I care about: eval-heavy RAG, on-device/private agents, safety rails baked into the UX — not bolted on.",
    "build-stack":
      "Day-to-day stack: TypeScript, React, Node/Express/FastAPI, SQL-first data, clean APIs, observability, CI that enforces quality.",
    "ml-research":
      "I read and tinker: retrieval tricks, ranking, calibration, safety layers, and practical evaluation — just enough theory to ship better systems.",
  };

  const prompts = [
    `What did Pranjal build for hallucination and guardrails?`,
    `How does Pranjal design RAG systems for real clients?`,
    `Walk me through Pranjal's production stack choices.`,
    `Summarize Pranjal's most relevant work for an AI engineer role.`,
  ];

  const tags = [
    "RAG & Retrieval",
    "Guardrails & Evals",
    "Voice & Agents",
    "ServiceNow & Workflows",
    "APIs & Infra",
    "SQL & Data",
  ];

  const handlePromptClick = async (p: string) => {
    setCopiedPrompt(p);
    try {
      await navigator.clipboard.writeText(p);
    } catch {
      // clipboard may fail silently in some environments; UX still updates
    }
    setTimeout(() => setCopiedPrompt(null), 1600);
  };

  return (
    <section id="playground" className="pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4">
        {/* Heading */}
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-50 mb-3">
            Playground
          </h2>
          <p className="text-[12px] md:text-[13px] text-slate-400 mb-6 max-w-2xl">
            A small, practical lab inside this portfolio. No gimmicks — just
            lightweight interactions that show how I think about signals, prompts,
            and stack choices.
          </p>
        </ScrollReveal>

        <div className="grid gap-4 md:grid-cols-3">
          {/* 1. Signal Modes */}
          <ScrollReveal delay={0.1} width="100%">
            <div className="h-full rounded-2xl border border-slate-800/80 bg-slate-950/60 p-3 flex flex-col gap-2 shadow-[0_16px_40px_rgba(15,23,42,0.82)]">
              <div className="text-[10px] uppercase tracking-[0.16em] text-sky-400">
                Signal Switcher
              </div>
              <p className="text-[10px] text-slate-400 mb-1">
                Tap a mode to see what &quot;high-signal&quot; work means for me.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setMode("ai-lab")}
                  className={`px-2 py-1 rounded-full text-[9px] border transition-all ${mode === "ai-lab"
                    ? "bg-sky-500/20 border-sky-400 text-sky-300 shadow-[0_0_14px_rgba(56,189,248,0.7)]"
                    : "bg-slate-900/80 border-slate-700 text-slate-300 hover:border-sky-500/40"
                    }`}
                >
                  AI Lab
                </button>
                <button
                  onClick={() => setMode("build-stack")}
                  className={`px-2 py-1 rounded-full text-[9px] border transition-all ${mode === "build-stack"
                    ? "bg-cyan-500/16 border-cyan-400 text-cyan-200 shadow-[0_0_14px_rgba(34,211,238,0.65)]"
                    : "bg-slate-900/80 border-slate-700 text-slate-300 hover:border-cyan-400/40"
                    }`}
                >
                  Build Stack
                </button>
                <button
                  onClick={() => setMode("ml-research")}
                  className={`px-2 py-1 rounded-full text-[9px] border transition-all ${mode === "ml-research"
                    ? "bg-fuchsia-500/18 border-fuchsia-400 text-fuchsia-200 shadow-[0_0_14px_rgba(217,70,239,0.6)]"
                    : "bg-slate-900/80 border-slate-700 text-slate-300 hover:border-fuchsia-400/40"
                    }`}
                >
                  ML &amp; Research
                </button>
              </div>
              <p className="mt-1 text-[10px] text-slate-300 leading-relaxed">
                {modeLabel[mode]}
              </p>
            </div>
          </ScrollReveal>

          {/* 2. MAX Prompt Kit */}
          <ScrollReveal delay={0.2} width="100%">
            <div className="h-full rounded-2xl border border-slate-800/80 bg-slate-950/60 p-3 flex flex-col gap-2">
              <div className="text-[10px] uppercase tracking-[0.16em] text-emerald-400">
                Ask MAX faster
              </div>
              <p className="text-[10px] text-slate-400">
                One-click prompts to drop into the MAX chat (bottom-right). Great
                if you&apos;re skimming as a hiring manager.
              </p>
              <div className="mt-1 flex flex-col gap-1.5">
                {prompts.map((p) => (
                  <MagneticButton
                    key={p}
                    onClick={() => handlePromptClick(p)}
                    className="text-left text-[9px] px-2 py-1 rounded-lg bg-slate-900/85 border border-slate-700/80 hover:border-sky-400/70 hover:bg-slate-900/100 transition-all"
                    innerClassName="group flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 group-hover:shadow-[0_0_10px_rgba(56,189,248,0.9)]" />
                    <span className="text-slate-300 group-hover:text-sky-100">
                      {p}
                    </span>
                  </MagneticButton>
                ))}
              </div>
              {copiedPrompt && (
                <div className="mt-1 text-[8px] text-sky-400">
                  Copied to clipboard — paste into MAX to see how I&apos;d brief
                  you.
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* 3. Stack Signals */}
          <ScrollReveal delay={0.3} width="100%">
            <div className="h-full rounded-2xl border border-slate-800/80 bg-slate-950/60 p-3 flex flex-col gap-2">
              <div className="text-[10px] uppercase tracking-[0.16em] text-orange-300">
                Stack signals
              </div>
              <p className="text-[10px] text-slate-400 mb-1">
                Hover a tag to see where I&apos;m strongest right now.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-1.5">
                {tags.map((tag, idx) => {
                  const colors = [
                    "bg-sky-500",
                    "bg-emerald-400",
                    "bg-fuchsia-400",
                    "bg-cyan-400",
                    "bg-amber-400",
                    "bg-indigo-400",
                  ];
                  const dotColor = colors[idx % colors.length];

                  return (
                    <MagneticButton
                      key={tag}
                      onMouseEnter={() => setActiveTag(tag)}
                      className="px-2 py-1 rounded-full bg-slate-900/85 border border-slate-700/85 text-[9px] text-slate-300 hover:text-sky-50 hover:border-sky-500/60 transition-all"
                      innerClassName="flex items-center gap-1.5"
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${dotColor} shadow-[0_0_8px_rgba(148,163,253,0.9)]`}
                      />
                      {tag}
                    </MagneticButton>
                  );
                })}
              </div>
              <p className="text-[10px] text-slate-300 leading-relaxed">
                {activeTag === "RAG & Retrieval" &&
                  "Designing retrieval-first systems with strong grounding and observability is my default starting point."}
                {activeTag === "Guardrails & Evals" &&
                  "I care about evals, red-teaming, and shipped guardrails more than clever single prompts."}
                {activeTag === "Voice & Agents" &&
                  "I like fast, low-latency agents with clear tools and rails — voice included."}
                {activeTag === "ServiceNow & Workflows" &&
                  "I’ve worked close to business workflows, approvals, and automation; AI should plug into that, not fight it."}
                {activeTag === "APIs & Infra" &&
                  "Clean contracts, logging, dashboards, and safe deploys — boring infra that lets AI features be bold."}
                {activeTag === "SQL & Data" &&
                  "I’m comfortable tuning queries, shaping schemas, and treating data as a first-class product surface."}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default PlaygroundSection;
