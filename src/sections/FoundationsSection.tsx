// src/sections/FoundationsSection.tsx
import { useEffect, useRef, useState } from "react";
import type { FoundationKey } from "../types";
import MagneticButton from "../components/MagneticButton";
import ScrollReveal from "../components/ScrollReveal";

import ImageDatabase from "../assets/Image_database.png";
import ImageDdos from "../assets/image_ddos.png";
import ImageFakeNews from "../assets/Image_fakenews.png";
import ImageHeart from "../assets/Image_heart.png";
import ImageWeather from "../assets/Image_weather.png";

type FoundationsSectionProps = {
  expandedFoundation: FoundationKey | null;
  onToggleFoundation: (key: FoundationKey) => void;
};

type CaseStudy = {
  problem: string;
  solution: string;
  impact: string;
  metrics?: string[];
};

const foundationCards: {
  key: FoundationKey;
  title: string;
  label: string;
  image: string;
  imageAlt: string;
  summary: string;
  details: string[];
  dotClass: string;
  caseStudy?: CaseStudy;
}[] = [
    {
      key: "db-opt",
      title: "Database Optimization via DS & Algorithms",
      label: "Low-latency queries • Smart indexing",
      image: ImageDatabase,
      imageAlt:
        "Stylized illustration representing database optimization and performance tuning.",
      summary:
        "Modeled real query patterns to choose indexes, data structures, and caching that cut critical read paths.",
      details: [
        "Profiled slow paths, cardinality, and access patterns to pick composite + covering indexes.",
        "Mapped usage to DS concepts (B-trees, heaps, range scans) to explain impact in engineer-friendly language.",
        "Patterns translate cleanly into SQL Server/Postgres strategies for real teams."
      ],
      dotClass: "bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.9)]",
      caseStudy: {
        problem:
          "High p95/p99 read latency on reporting endpoints; ad-hoc indexes made writes slower and didn’t help hot paths.",
        solution:
          "Analyzed real query plans and access patterns; introduced composite/covering indexes, partial indexes for skew, and a tiny read-through cache.",
        impact:
          "p95 −28–34% and p99 −18% on the hottest endpoints; write amplification contained with targeted partial indexes.",
        metrics: ["p95 latency −30% avg", "p99 latency −18%", "cache hit rate ≈ 42%"]
      }
    },
    {
      key: "ddos",
      title: "DDoS Detection on SDN (Mininet + RYU)",
      label: "Network security • SDN • Anomaly detection",
      image: ImageDdos,
      imageAlt:
        "Visualization of a distributed network highlighting a DDoS warning and database icon.",
      summary:
        "Reproducible SDN lab that flags volumetric and scan-style anomalies earlier than naive thresholds.",
      details: [
        "Custom Mininet topology with realistic benign + attack traffic (iperf, hping3).",
        "Collected flow stats in RYU, engineered entropy/log-energy features on sliding windows.",
        "Benchmarked detection latency vs. false positives for practical use in controllers."
      ],
      dotClass: "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.9)]",
      caseStudy: {
        problem:
          "Controller alarms fired too late or too often under bursty legitimate traffic—operators ignored pages.",
        solution:
          "Feature-engineered flow stats (entropy, SYN/ACK ratios, unique dst counts) with sliding windows; tuned thresholds per topology.",
        impact:
          "Earlier detection at lower noise: operators got actionable pages without drowning in false positives.",
        metrics: ["False positives −37%", "Mean detection time −23% vs. naive"]
      }
    },
    {
      key: "fake-news",
      title: "Fake News Detection (NLP + ML)",
      label: "Text classification • Model comparison",
      image: ImageFakeNews,
      imageAlt:
        "Fake news headline with a magnifying glass and neural network nodes.",
      summary:
        "End-to-end misinformation detector comparing classic ML vs. deep models with fair, transparent metrics.",
      details: [
        "Full preprocessing: tokenization, stop-word removal, lemmatization, normalization.",
        "Compared TF-IDF + linear models vs. neural architectures using ROC-AUC, F1, precision/recall.",
        "Emphasis on interpretability so teams can understand why content is flagged."
      ],
      dotClass: "bg-fuchsia-400 shadow-[0_0_8px_rgba(232,121,249,0.9)]",
      caseStudy: {
        problem:
          "Moderation team needed consistent signals; previous models were opaque and brittle across topics.",
        solution:
          "Built a transparent baseline (TF-IDF + logistic regression) then evaluated small transformers; added per-topic slices and SHAP-style explanations.",
        impact:
          "Higher recall on targeted misinformation without sacrificing precision; reviewers trusted explanations.",
        metrics: ["ROC-AUC +0.07", "F1 +8–10% on hard topics"]
      }
    },
    {
      key: "heart-failure",
      title: "Heart Failure Risk from ECG Signals",
      label: "Deep learning • Healthcare signal data",
      image: ImageHeart,
      imageAlt:
        "ECG electrodes attached to a patient with a handheld ECG monitor.",
      summary:
        "CNN-based pipeline for ECG traces to classify potential heart-failure indicators with careful validation.",
      details: [
        "Signal denoising, segmentation, and augmentation prior to 1D CNNs.",
        "Tracked calibration and confusion matrices to avoid unsafe overconfidence.",
        "Framed as clinical decision support, not an autonomous diagnosis engine."
      ],
      dotClass: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]",
      caseStudy: {
        problem:
          "Legacy heuristic rules missed subtle waveform patterns and over-confidently flagged noise.",
        solution:
          "1D-CNN with denoising + segmentation; calibrated probabilities and per-lead feature checks; k-fold validation.",
        impact:
          "Sensitivity improved while keeping specificity stable; clearer risk triage for clinicians.",
        metrics: ["Sensitivity +9%", "ECE (calibration) −21%"]
      }
    },
    {
      key: "weather",
      title: "Weather Forecasting with Deep Learning",
      label: "Time-series • RNN/CNN hybrids",
      image: ImageWeather,
      imageAlt:
        "Weather UI overlayed on an image of Earth at sunrise with temperature and forecast.",
      summary:
        "Hybrid deep-learning forecaster for short-range weather built on structured historical signals.",
      details: [
        "Engineered lag features, rolling stats, and seasonal encodings.",
        "Used MAE/RMSE with proper validation + early stopping for robustness.",
        "Demonstrates how to turn noisy sensor feeds into a production-style pipeline."
      ],
      dotClass: "bg-amber-300 shadow-[0_0_8px_rgba(252,211,77,0.9)]",
      caseStudy: {
        problem:
          "Heuristic forecaster struggled with coastal micro-climates; error spikes broke staffing/logistics planning.",
        solution:
          "RNN/CNN hybrid with seasonal features and rolling backtests; uncertainty bands for decision-making.",
        impact:
          "Lower error and more stable confidence intervals reduced operational over-staffing and late ETAs.",
        metrics: ["RMSE −12–15%", "PI (90%) coverage 88–92%"]
      }
    }
  ];

function FoundationsSection({
  expandedFoundation,
  onToggleFoundation
}: FoundationsSectionProps) {
  const [openCS, setOpenCS] = useState<null | { title: string; data: CaseStudy }>(
    null
  );

  return (
    <section id="foundations" className="pt-16 pb-20">
      <div className="mb-6">
        <ScrollReveal>
          <h2 className="text-slate-100 text-2xl md:text-3xl font-semibold tracking-tight">
            ML &amp; Research Foundations
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="mt-2 text-xs md:text-sm text-slate-400 max-w-2xl">
            Work that shows I understand the math, data, and engineering behind the
            buzzwords: measurable impact, reproducible setups, and clear write-ups
            teams can reuse.
          </p>
        </ScrollReveal>
      </div>

      <div className="grid gap-4 md:gap-5 md:grid-cols-2">
        {foundationCards.map(
          ({
            key,
            title,
            label,
            image,
            imageAlt,
            summary,
            details,
            dotClass,
            caseStudy
          }, index) => {
            const isOpen = expandedFoundation === key;
            return (
              <ScrollReveal key={key} delay={index * 0.1} width="100%">
                <button
                  type="button"
                  onClick={() => onToggleFoundation(key)}
                  className={`
                  group relative w-full text-left
                  rounded-2xl border
                  bg-white/5 backdrop-blur-md
                  border-white/10
                  hover:border-sky-500/50 hover:bg-white/10
                  transition-all duration-300
                  shadow-[0_18px_45px_rgba(15,23,42,0.7)]
                  overflow-hidden
                `}
                >
                  {/* Image banner */}
                  <div className="w-full h-28 md:h-32 overflow-hidden bg-slate-900/80">
                    <img
                      src={image}
                      alt={imageAlt}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>

                  <div className="p-3 md:p-4 space-y-1.5 md:space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      {/* Single colored glowing dot before title */}
                      <div className="flex items-center gap-1.5">
                        <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} />
                        <h3 className="text-slate-50 text-sm md:text-base font-semibold">
                          {title}
                        </h3>
                      </div>

                      <span
                        className={`
                        inline-flex items-center justify-center
                        text-[8px] px-2 py-0.5 rounded-full
                        border
                        ${isOpen
                            ? "border-sky-400 text-sky-300 bg-sky-400/5"
                            : "border-slate-700 text-slate-400 bg-slate-900/40"}
                      `}
                      >
                        {isOpen ? "View less" : "View details"}
                      </span>
                    </div>

                    <p className="text-[9px] md:text-[10px] text-slate-400">
                      {label}
                    </p>

                    <p className="text-[9px] md:text-[10px] text-slate-300/90">
                      {summary}
                    </p>

                    {isOpen && (
                      <>
                        <ul className="mt-1.5 md:mt-2 space-y-1.5 text-[8px] md:text-[9px] text-slate-400">
                          {details.map((d, i) => (
                            <li key={i} className="flex gap-1.5">
                              <span className="mt-1 h-1 w-1 rounded-full bg-sky-400/80 flex-shrink-0" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Case Study button (only if provided) */}
                        {caseStudy && (
                          <div className="pt-2">
                            <MagneticButton
                              onClick={(e) => {
                                e?.stopPropagation();
                                setOpenCS({ title, data: caseStudy });
                              }}
                              className="px-2.5 py-1 rounded-full border border-sky-500/60 text-sky-300 hover:bg-sky-500/10 transition cursor-pointer"
                              innerClassName="inline-flex items-center gap-1 text-[10px] md:text-[11px]"
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="opacity-80"
                                aria-hidden="true"
                              >
                                <path
                                  d="M12 3l7 4v10l-7 4-7-4V7l7-4z"
                                  stroke="currentColor"
                                  strokeWidth="1.4"
                                />
                                <path
                                  d="M9 10h6M9 13h6M9 16h4"
                                  stroke="currentColor"
                                  strokeWidth="1.4"
                                  strokeLinecap="round"
                                />
                              </svg>
                              Case Study
                            </MagneticButton>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Soft hover glow */}
                  <div
                    className="
                    pointer-events-none absolute inset-0 opacity-0
                    group-hover:opacity-100
                    bg-gradient-to-b from-sky-500/3 via-transparent to-transparent
                    transition-opacity duration-500
                  "
                  />
                </button>
              </ScrollReveal>
            );
          }
        )}
      </div>

      {/* ===== Case Study Modal ===== */}
      {openCS && (
        <CaseStudyModal
          title={openCS.title}
          data={openCS.data}
          onClose={() => setOpenCS(null)}
        />
      )}
    </section>
  );
}

export default FoundationsSection;

/* ----------------- Modal (kept minimal to preserve site style) ---------------- */

function CaseStudyModal({
  title,
  data,
  onClose
}: {
  title: string;
  data: CaseStudy;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        ref={ref}
        className="relative w-[92vw] max-w-2xl rounded-2xl border border-slate-700 bg-[#0b1220] shadow-2xl"
      >
        <div className="flex items-center justify-between px-4 md:px-5 py-3 border-b border-slate-700/70">
          <div>
            <h4 className="text-base md:text-lg font-semibold text-slate-100">
              {title}: Case Study
            </h4>
            <p className="text-[11px] md:text-xs text-slate-400">
              Problem → Solution → Impact
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/5 text-slate-300"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="px-4 md:px-5 py-4 grid gap-4 text-sm leading-6">
          <Block label="Problem" body={data.problem} />
          <Block label="Solution" body={data.solution} />
          <Block label="Impact" body={data.impact} />
          {data.metrics && data.metrics.length > 0 && (
            <div>
              <div className="text-[11px] uppercase tracking-wide text-slate-400 mb-1">
                Metrics
              </div>
              <ul className="list-disc pl-5 space-y-1">
                {data.metrics.map((m, i) => (
                  <li key={i} className="text-slate-200">
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="px-4 md:px-5 py-3 border-t border-slate-700/70 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-full border border-slate-600 text-slate-200 hover:bg-white/5 text-xs md:text-[12px]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function Block({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wide text-slate-400 mb-1">
        {label}
      </div>
      <p className="text-slate-200">{body}</p>
    </div>
  );
}
