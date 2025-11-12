// src/sections/HeroSection.tsx

import React from "react";
// Import the image via Vite so it resolves correctly on GitHub Pages
import heroImg from "../assets/portfolio_image.png";

const HeroSection = () => {
  return (
    <section id="hero" className="pt-10 pb-10 relative">
      <div className="flex flex-col md:flex-row items-stretch gap-6 md:gap-8">
        {/* LEFT: Text / Pitch */}
        <div className="flex-1 flex flex-col gap-3">
          {/* Status pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-sky-500/40 shadow-[0_0_26px_rgba(56,189,248,0.25)] w-fit text-[9px] md:text-[10px] text-sky-300">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
            OPEN TO AI / LLM / FULL-STACK ROLES — HIRE FAST
          </div>

          {/* Label */}
          <p className="text-[9px] md:text-[10px] uppercase tracking-[0.28em] text-sky-400/85">
            AI-NATIVE ENGINEER • LLM APPS • FULL-STACK
          </p>

          {/* Name + Hero line */}
          <h1 className="text-[32px] md:text-[40px] lg:text-[44px] font-semibold leading-snug">
            <span className="block text-slate-300 text-[13px] md:text-[14px] mb-1">
              Portfolio of
            </span>
            <span className="block">
              <span className="mr-1.5">Pranjal</span>
              <span className="text-sky-400">Srivastava</span>
            </span>
          </h1>

          {/* Bigger, clearer promise line */}
          <p className="mt-1 block text-[18px] md:text-[21px] lg:text-[22px] font-normal text-slate-200 leading-snug max-w-xl">
            I build{" "}
            <span className="text-sky-400">
              practical AI systems, guardrails &amp; apps
            </span>{" "}
            you can ship this week.
          </p>

          {/* Supporting copy */}
          <p className="text-[11px] md:text-[13px] text-slate-300 max-w-xl">
            From client-side RAG and hallucination detection to voice agents and
            internal tools, I own the stack: product thinking, clean code,
            ML foundations, observability, and integrations.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mt-2">
            <a
              href="#ai-lab"
              className="px-4 py-2 rounded-full bg-sky-500 text-[10px] md:text-[12px] font-medium hover:bg-sky-400 hover:shadow-[0_0_26px_rgba(56,189,248,0.55)] transition"
            >
              Explore AI Lab First
            </a>
            <a
              href="#contact"
              className="px-4 py-2 rounded-full border border-slate-600/80 text-[10px] md:text-[12px] font-medium text-slate-200 hover:border-sky-400 hover:text-sky-400 transition"
            >
              Contact
            </a>
          </div>

          {/* Tech strip */}
          <div className="mt-3 flex flex-wrap gap-2 text-[8px] md:text-[9px] text-slate-500">
            <span className="px-2 py-1 rounded-full bg-black/40 border border-slate-800/70">
              LLM Apps &amp; RAG
            </span>
            <span className="px-2 py-1 rounded-full bg-black/40 border border-slate-800/70">
              TypeScript • React • Node
            </span>
            <span className="px-2 py-1 rounded-full bg-black/40 border border-slate-800/70">
              Java / Spring Boot / .NET
            </span>
            <span className="px-2 py-1 rounded-full bg-black/40 border border-slate-800/70">
              ServiceNow • SQL • APIs
            </span>
          </div>

          <p className="mt-2 text-[8px] text-slate-500">
            Scroll — newest AI work first, then apps, foundations &amp;
            experience. MAX in the corner can walk you through.
          </p>
        </div>

        {/* RIGHT: Live Portfolio Node */}
        <div className="w-full md:w-[260px] lg:w-[280px] flex">
          <div
            className="
              relative w-full
              rounded-3xl
              bg-gradient-to-b from-sky-500/14 via-[#020817] to-purple-800/22
              border border-sky-500/45
              shadow-[0_0_40px_rgba(56,189,248,0.45)]
              px-3.5 pt-3 pb-3
              flex flex-col gap-2
              overflow-hidden
            "
          >
            {/* Header row */}
            <div className="flex items-center justify-between gap-2 text-[8px] text-slate-300">
              <span className="inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LIVE PORTFOLIO NODE
              </span>
              <span className="text-sky-300/90">MAX-AI linked</span>
            </div>

            {/* Tall, non-cropped photo */}
            <div
              className="
                mt-1.5
                relative
                w-full
                rounded-2xl
                overflow-hidden
                border border-sky-400/70
                shadow-[0_0_40px_rgba(56,189,248,0.9)]
                bg-slate-900/95
                flex
                items-stretch
                justify-center
              "
            >
              <img
                src={heroImg}
                alt="Pranjal Srivastava"
                className="
                  w-full
                  h-56 md:h-64
                  object-contain
                  bg-slate-900/95
                "
                decoding="async"
                loading="eager"
              />
              {/* Gradient overlay for text legibility */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/98 via-black/40 to-transparent" />
            </div>

            {/* Name & title under photo */}
            <div className="mt-1 -mb-0.5">
              <div className="text-[10px] font-semibold text-sky-50">
                Pranjal Srivastava
              </div>
              <div className="text-[8px] text-sky-300">
                AI / LLM / Full-Stack Engineer
              </div>
              <div className="text-[7px] text-slate-400">
                Corpus Christi, TX • Open to US roles
              </div>
            </div>

            {/* Quick signal bullets */}
            <div className="mt-1 space-y-1 text-[7px] text-slate-200/95">
              <div className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-sky-400" />
                <span>Browser-native RAG &amp; hallucination guardrails.</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-sky-400" />
                <span>Voice AI agents &amp; MAX — portfolio-native copilot.</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-sky-400" />
                <span>Java / .NET / ServiceNow / SQL in production.</span>
              </div>
            </div>

            {/* Bottom mini-CTA */}
            <div className="mt-1.5 flex items-center justify-between gap-2 text-[7px] text-sky-300/95">
              <span>Scroll ↓ or ask MAX for a quick tour.</span>
              <span className="px-2 py-0.5 rounded-full bg-black/80 border border-sky-500/60">
                AI inside
              </span>
            </div>

            {/* Soft accent glow */}
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-16 w-16 rounded-full bg-sky-500/18 blur-2xl"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
