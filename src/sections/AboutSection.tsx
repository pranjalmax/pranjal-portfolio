// src/sections/AboutSection.tsx

import React, { useState, useEffect } from "react";
import imageSRM from "../assets/image_srm.jpeg";
import imageTAMUCC from "../assets/image_tamucc.jpeg";

import personal1 from "../assets/personal_photo_1.jpeg";
import personal2 from "../assets/personal_photo_2.jpeg";
import personal3 from "../assets/personal_photo_3.jpeg";
import personal4 from "../assets/personal_photo_4.jpeg";
import personal5 from "../assets/personal_photo_5.jpeg";
import personal6 from "../assets/personal_photo_6.jpeg";
import personal7 from "../assets/personal_photo_7.jpeg";
import personal8 from "../assets/personal_photo_8.jpeg";
import personal9 from "../assets/personal_photo_9.jpeg";
import personal10 from "../assets/personal_photo_10.jpeg";

const photoSources: string[] = [
  personal1,
  personal2,
  personal3,
  personal4,
  personal5,
  personal6,
  personal7,
  personal8,
  personal9,
  personal10,
];

const AboutSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasPhotos = photoSources.length > 0;

  const nextPhoto = () => {
    if (!hasPhotos) return;
    setActiveIndex((prev) => (prev + 1) % photoSources.length);
  };

  const prevPhoto = () => {
    if (!hasPhotos) return;
    setActiveIndex((prev) => (prev === 0 ? photoSources.length - 1 : prev - 1));
  };

  // Auto-advance every 3s
  useEffect(() => {
    if (!hasPhotos) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % photoSources.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [hasPhotos]);

  return (
    <section id="about" className="pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section header */}
        <div className="flex items-baseline justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-50">About</h2>
            <p className="mt-2 text-xs md:text-sm text-sky-400/80 tracking-[0.14em] uppercase">
              AI-native engineer · Systems, guardrails &amp; shipping fast
            </p>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-[minmax(0,2fr)_minmax(260px,1.2fr)] gap-10 md:gap-12 items-start">
          {/* LEFT: About text + (moved here) Education & Credentials */}
          <div className="space-y-4 text-sm md:text-[15px] leading-relaxed text-slate-300">
            <p>
              I’m a 26-year-old AI-first engineer who enjoys operating close to the product, not just
              the model. I like taking vague ideas (&quot;could we have an AI assistant for this?&quot;)
              and turning them into reliable systems with clear ownership, telemetry, and guardrails.
            </p>

            <p>
              My recent work includes wiring LLM agents into real workflows, building retrieval over
              internal knowledge, hardening prompts with evals, and tightening the data &amp; infra
              around them so they’re safe to run in front of customers. I care about readable code,
              small cohesive services, and making it easy for others to debug what I ship.
            </p>

            <p>
              I’m comfortable across the stack: TypeScript/React on the front, Node/Python on the back,
              Postgres/SQL tuning underneath, and observability (logs/metrics/traces) around the edges.
              I like pairing, documenting decisions, and leaving teams with systems they can actually own.
            </p>

            {/* Personal slice */}
            <div className="mt-4 space-y-2 text-slate-400 text-[13px]">
              <p className="font-semibold text-slate-200">Outside of work</p>
              <p>
                When I’m not debugging a pipeline, I’m probably watching football{" "}
                <span className="text-slate-500">(or soccer, as we call it here in the US)</span>. I’ve
                followed{" "}
                <span className="text-sky-400 font-semibold">Real&nbsp;Madrid</span> obsessively since
                I was nine — jerseys, flags, late-night Champions League games, the whole thing.
              </p>
              <p>
                I recharge at the movies (actual theater seats &gt; laptop), jump into games like
                Counter-Strike and FIFA, and keep a constant soundtrack of Bollywood, indie Indian and
                Pakistani artists in Hindi/Urdu, plus English — with{" "}
                <span className="text-sky-400">The Weeknd</span> on heavy rotation. Travel, good music,
                and good conversations with curious people are bonus fuel.
              </p>
            </div>

            {/* --- Moved under the About text: Education & Credentials --- */}
            <div className="mt-6 space-y-5">
              {/* Education */}
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 px-4 py-3 shadow-[0_18px_65px_rgba(15,23,42,0.65)]">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-[0.14em] mb-2">
                  Education
                </h3>

                <div className="space-y-3 text-[11px] md:text-[12px] text-slate-300">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-900/80 flex items-center justify-center overflow-hidden border border-slate-800/80">
                      <img
                        src={imageTAMUCC}
                        alt="Texas A&M University–Corpus Christi"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-100">M.S. Computer Science</div>
                      <div className="text-sky-400 text-[10px]">
                        Texas A&amp;M University–Corpus Christi
                      </div>
                      <div className="text-slate-500 text-[9px]">AI, systems, and production-focused work.</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-900/80 flex items-center justify-center overflow-hidden border border-slate-800/80">
                      <img
                        src={imageSRM}
                        alt="SRM Institute of Science and Technology"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-100">B.Tech Computer Science</div>
                      <div className="text-sky-400 text-[10px]">SRM Institute of Science &amp; Technology</div>
                      <div className="text-slate-500 text-[9px]">Strong CS fundamentals &amp; engineering base.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Credentials & Certifications */}
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 px-4 py-3 shadow-[0_18px_65px_rgba(15,23,42,0.55)]">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-[0.14em] mb-2">
                  Credentials &amp; Certifications
                </h3>
                <ul className="text-[11px] md:text-[12px] text-slate-300 space-y-1.5 list-disc pl-4">
                  <li>Programming in Python for Everyone (Coursera)</li>
                  <li>Learn C++ Programming – Beginner to Advance – Deep Dive in C++</li>
                  <li>Complete ServiceNow Developer Course (Udemy)</li>
                  <li>micro1 – Certified Software Engineer (AI Interview), Sep 2025</li>
                  <li>ChatGPT Prompt Engineering for Developers</li>
                  <li>Building Real-Time Video AI Applications (Nvidia)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT: Photo slider (on top) + Snapshot below */}
          <div className="space-y-5">
            {/* Photo slider – large, no cropping */}
            {hasPhotos && (
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/40 px-3 py-3 space-y-2 shadow-[0_18px_65px_rgba(15,23,42,0.45)]">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.16em]">
                    A bit more human
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={prevPhoto}
                      className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-900/80 text-slate-300 hover:text-sky-400 hover:bg-slate-900 transition"
                      aria-label="Previous photo"
                    >
                      ‹
                    </button>
                    <button
                      onClick={nextPhoto}
                      className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-900/80 text-slate-300 hover:text-sky-400 hover:bg-slate-900 transition"
                      aria-label="Next photo"
                    >
                      ›
                    </button>
                  </div>
                </div>

                {/* Bigger slider; object-contain prevents cropping */}
                <div className="relative rounded-xl overflow-hidden h-72 md:h-[28rem] bg-slate-900/70 flex items-center justify-center">
                  <img
                    src={photoSources[activeIndex]}
                    alt="Personal"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="flex justify-center gap-1 mt-1">
                  {photoSources.map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-1.5 w-1.5 rounded-full ${
                        idx === activeIndex ? "bg-sky-400" : "bg-slate-600/60"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Snapshot (kept on right, below slider) */}
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/40 px-4 py-3 text-[10px] md:text-[11px] text-slate-300 space-y-1.5">
              <div className="text-xs font-semibold text-sky-400/90">Snapshot</div>
              <p>• AI/LLM &amp; full-stack engineer who likes owning end-to-end: UX → API → infra → metrics.</p>
              <p>• Enjoys designing guardrails, evals, and observability so AI features don’t become black boxes.</p>
              <p>• Optimizes for clarity, fast iteration, and keeping systems calm on bad days.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
