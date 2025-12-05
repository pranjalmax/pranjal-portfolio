// src/App.tsx

import { useState, useEffect } from "react";
import type {
  AiProjectKey,
  BuildProjectKey,
  FoundationKey,
  SectionId,
} from "./types";

import MaxChat from "./components/MaxChat";
import FloatingMaxButton from "./components/FloatingMaxButton";

import HeroSection from "./sections/HeroSection";
import AiLabSection from "./sections/AiLabSection";
import BuildStackSection from "./sections/BuildStackSection";
import FoundationsSection from "./sections/FoundationsSection";
import ExperienceSection from "./sections/ExperienceSection";
import AboutSection from "./sections/AboutSection";
import PlaygroundSection from "./sections/PlaygroundSection";
import ContactSection from "./sections/ContactSection";

function App() {
  const [expandedAi, setExpandedAi] = useState<AiProjectKey | null>(null);
  const [expandedBuild, setExpandedBuild] =
    useState<BuildProjectKey | null>(null);
  const [expandedFoundation, setExpandedFoundation] =
    useState<FoundationKey | null>(null);

  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [pingedMAX, setPingedMAX] = useState(false);
  const [isMaxOpen, setIsMaxOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const toggleAi = (key: AiProjectKey) =>
    setExpandedAi((prev) => (prev === key ? null : key));

  const toggleBuild = (key: BuildProjectKey) =>
    setExpandedBuild((prev) => (prev === key ? null : key));

  const toggleFoundation = (key: FoundationKey) =>
    setExpandedFoundation((prev) => (prev === key ? null : key));

  // Track active section + scroll progress
  useEffect(() => {
    const sectionIds: SectionId[] = [
      "hero",
      "ai-lab",
      "build-stack",
      "foundations",
      "experience",
      "about",
      "playground",
      "contact",
    ];

    const handleScroll = () => {
      // Active section detection
      let closest: SectionId = "hero";
      let minDiff = Infinity;

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const diff = Math.abs(rect.top - 80);
        if (diff < minDiff) {
          minDiff = diff;
          closest = id;
        }
      });

      setActiveSection(closest);

      // Scroll progress
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop || 0;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const raw = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      const clamped = Math.max(0, Math.min(100, raw));
      setScrollProgress(clamped);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getAvatarLabel = (): string => {
    switch (activeSection) {
      case "hero":
        return "Home";
      case "ai-lab":
        return "AI Lab";
      case "build-stack":
        return "Apps";
      case "foundations":
        return "ML / Research";
      case "experience":
        return "Experience";
      case "about":
        return "About";
      case "playground":
        return "Playground";
      case "contact":
        return "Contact";
      default:
        return "";
    }
  };

  const avatarLabel = getAvatarLabel();

  return (
    <div className="min-h-screen bg-[#020817] text-slate-100 relative overflow-x-hidden">
      {/* Top scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-40 h-[2px] bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-sky-500 via-cyan-400 to-fuchsia-500 shadow-[0_0_18px_rgba(56,189,248,0.65)] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ===== Animated background stack ===== */}

      {/* Base */}
      <div className="pointer-events-none fixed inset-0 -z-40 bg-[#020817]" />

      {/* Breathing main gradient */}
      <div
        className="
          pointer-events-none fixed inset-0 -z-35
          bg-breath
          bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),transparent_60%),radial-gradient(circle_at_bottom,_rgba(15,23,42,0.9),transparent_78%)]
        "
      />

      {/* Subtle grid for depth */}
      <div
        className="
          pointer-events-none fixed inset-0 -z-30
          opacity-[0.06] mix-blend-screen
          bg-[linear-gradient(rgba(148,163,253,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.09)_1px,transparent_1px)]
          bg-[size:100%_60px,60px_100%]
        "
      />

      {/* Breathing orbs */}
      <div
        className="
          pointer-events-none fixed -left-24 top-40 -z-20
          h-72 w-72 rounded-full
          bg-sky-500/18 blur-3xl
          orb-breathe-left
        "
      />
      <div
        className="
          pointer-events-none fixed right-[-40px] top-72 -z-20
          h-64 w-64 rounded-full
          bg-cyan-400/14 blur-3xl
          orb-breathe-right
        "
      />
      <div
        className="
          pointer-events-none fixed left-1/2 -translate-x-1/2 bottom-[-80px] -z-20
          h-72 w-72 rounded-full
          bg-purple-600/16 blur-3xl
          orb-breathe-center
        "
      />

      {/* ===== Top nav ===== */}
      <header className="sticky top-0 z-30 backdrop-blur bg-[#020817]/90 border-b border-slate-800/70">
        <nav className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="font-semibold tracking-tight text-lg md:text-xl flex items-baseline gap-1">
            <span>Pranjal</span>
            <span className="text-sky-400">Srivastava</span>
          </div>

          {/* Nav links + GitHub */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex gap-3 md:gap-4 text-[9px] md:text-xs text-slate-300">
              <a href="#ai-lab" className="hover:text-sky-400">
                AI Lab
              </a>
              <a href="#build-stack" className="hover:text-sky-400">
                Build Stack
              </a>
              <a href="#foundations" className="hover:text-sky-400">
                ML &amp; Research
              </a>
              <a href="#experience" className="hover:text-sky-400">
                Experience
              </a>
              <a href="#about" className="hover:text-sky-400">
                About
              </a>
              <a href="#contact" className="hover:text-sky-400">
                Contact
              </a>
            </div>

            {/* GitHub icon */}
            <a
              href="https://github.com/pranjalmax"
              target="_blank"
              rel="noreferrer"
              className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full border border-slate-700/80 bg-black/40 hover:border-sky-400 hover:text-sky-400 hover:bg-black/80 transition"
              aria-label="View GitHub profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-4 h-4 md:w-5 md:h-5 fill-current"
              >
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.74 1.26 3.41.96.11-.75.41-1.26.75-1.55-2.56-.29-5.26-1.28-5.26-5.68 0-1.25.45-2.27 1.19-3.07-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.17a11 11 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.48 3.17-1.17 3.17-1.17.63 1.59.23 2.76.11 3.05.74.8 1.18 1.82 1.18 3.07 0 4.41-2.7 5.39-5.28 5.67.42.36.8 1.08.8 2.18 0 1.58-.02 2.86-.02 3.25 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>
            </a>
          </div>
        </nav>
      </header>

      {/* ===== Main content ===== */}
      <main className="max-w-5xl mx-auto px-4">
        <HeroSection />

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-sky-500/30 to-transparent mb-10" />

        <AiLabSection
          expandedAi={expandedAi}
          onToggleAi={toggleAi}
          onOpenMax={() => {
            setPingedMAX(true);
            setIsMaxOpen(true);
          }}
        />


        {/* Micro interaction strip */}
        <div className="mt-2 mb-10">
          <div className="flex items-center gap-3 px-3 py-2 rounded-2xl bg-black/40 border border-slate-800/80 text-[9px] text-slate-400">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-sky-400 animate-ping" />
            <span className="text-slate-400">
              This portfolio is wired like an AI product page: systems first,
              story later.
            </span>
            <button
              onClick={() => {
                setPingedMAX(true);
                setIsMaxOpen(true);
              }}
              className="ml-auto px-2 py-1 rounded-full border border-sky-500/60 text-sky-300 hover:bg-sky-500/10 transition text-[9px]"
            >
              Ping MAX
            </button>
            {pingedMAX && (
              <span className="text-[9px] text-sky-400">
                MAX: &quot;Hi. I&apos;m live in the corner — ask me anything
                about Pranjal.&quot;
              </span>
            )}
          </div>
        </div>

        <BuildStackSection
          expandedBuild={expandedBuild}
          onToggleBuild={toggleBuild}
        />

        <FoundationsSection
          expandedFoundation={expandedFoundation}
          onToggleFoundation={toggleFoundation}
        />

        <ExperienceSection />
        <AboutSection />
        <PlaygroundSection />
        <ContactSection />
      </main>

      {/* ===== MAX chat + floating mini-figure ===== */}
      <MaxChat isOpen={isMaxOpen} onClose={() => setIsMaxOpen(false)} />
      <FloatingMaxButton
        label={avatarLabel}
        isMaxOpen={isMaxOpen}
        section={activeSection}
        onToggle={() => setIsMaxOpen((v) => !v)}
      />
    </div>
  );
}

export default App;
