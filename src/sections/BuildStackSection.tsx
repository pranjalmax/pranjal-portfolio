// src/sections/BuildStackSection.tsx

import type { BuildProjectKey } from "../types";
import ImageDog from "../assets/Image_dog.png";
import ImageHelpdesk from "../assets/Image_helpdesk.png";

interface BuildStackSectionProps {
  expandedBuild: BuildProjectKey | null;
  onToggleBuild: (key: BuildProjectKey) => void;
}

const BuildStackSection = ({
  expandedBuild,
  onToggleBuild,
}: BuildStackSectionProps) => {
  const isDog = expandedBuild === "dog-portal";
  const isHelpdesk = expandedBuild === "helpdesk";

  return (
    <section id="build-stack" className="mt-20 mb-16">
      <div className="mb-6">
        <p className="text-[10px] uppercase tracking-[0.18em] text-sky-400/80">
          Apps • ServiceNow • APIs
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-50">
          Build Stack —{" "}
          <span className="text-sky-400">Real internal tools</span>
        </h2>
        <p className="mt-2 text-xs md:text-sm text-slate-300 max-w-2xl">
          Light, fast, production-style builds that show how Pranjal approaches
          system design, RBAC, and clean implementation on ServiceNow & APIs.
          Click a card to see the implementation notes.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5 md:gap-6">
        {/* Dog Adoption Portal */}
        <button
          type="button"
          onClick={() => onToggleBuild("dog-portal")}
          className={`
            group relative flex flex-col items-start text-left rounded-3xl
            border px-4 pt-4 pb-4 md:px-5 md:pt-5 md:pb-5
            backdrop-blur-sm transition-all duration-300
            ${
              isDog
                ? "border-sky-400/90 bg-sky-900/25 shadow-[0_0_26px_rgba(56,189,248,0.5)] -translate-y-1"
                : "border-slate-800/85 bg-slate-950/60 hover:border-sky-400/70 hover:bg-slate-900/80 hover:shadow-[0_0_18px_rgba(56,189,248,0.32)]"
            }
          `}
        >
          {/* Screenshot */}
          <div className="relative w-full mb-3 md:mb-4 overflow-hidden rounded-2xl bg-slate-900/90">
            <img
              src={ImageDog}
              alt="Dog Adoption Service Portal UI"
              className="w-full h-40 md:h-44 object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/5 via-transparent to-slate-900/40" />
          </div>

          {/* Title + badges */}
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm md:text-base font-semibold text-slate-50">
              Dog Adoption Service Portal
            </h3>
            <span className="px-2 py-[2px] rounded-full bg-sky-500/15 text-[8px] text-sky-300 border border-sky-500/30">
              ServiceNow • Portal
            </span>
          </div>

          <p className="text-[10px] md:text-xs text-slate-300">
            A clean intake & discovery experience for shelters: structured dog
            profiles, adoption centers, and role-based views ready for real
            approvals.
          </p>

          {/* Expanded details */}
          {isDog && (
            <div className="mt-3 md:mt-4 space-y-1.5 text-[9px] md:text-[10px] text-slate-300">
              <p>
                <span className="text-sky-300">What&apos;s built:</span>{" "}
                Custom tables for Dogs &amp; Adoption Centers, Service Portal
                record producer, validations, and clean mapping to backend
                records.
              </p>
              <p>
                <span className="text-sky-300">Why it matters:</span> Shows how
                Pranjal designs human-friendly intake on ServiceNow without
                losing data quality or extensibility for workflows.
              </p>
              <p className="text-sky-400/80">
                Ask MAX: &quot;Walk me through the Dog Adoption Portal
                architecture.&quot;
              </p>
            </div>
          )}
        </button>

        {/* Helpdesk Ticketing */}
        <button
          type="button"
          onClick={() => onToggleBuild("helpdesk")}
          className={`
            group relative flex flex-col items-start text-left rounded-3xl
            border px-4 pt-4 pb-4 md:px-5 md:pt-5 md:pb-5
            backdrop-blur-sm transition-all duration-300
            ${
              isHelpdesk
                ? "border-sky-400/90 bg-slate-950/70 shadow-[0_0_26px_rgba(56,189,248,0.5)] -translate-y-1"
                : "border-slate-800/85 bg-slate-950/60 hover:border-sky-400/70 hover:bg-slate-900/80 hover:shadow-[0_0_18px_rgba(56,189,248,0.32)]"
            }
          `}
        >
          {/* Screenshot */}
          <div className="relative w-full mb-3 md:mb-4 overflow-hidden rounded-2xl bg-slate-900/90">
            <img
              src={ImageHelpdesk}
              alt="Helpdesk Ticketing system UI"
              className="w-full h-40 md:h-44 object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/5 via-transparent to-slate-900/40" />
          </div>

          {/* Title + badges */}
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm md:text-base font-semibold text-slate-50">
              Helpdesk Ticketing System
            </h3>
            <span className="px-2 py-[2px] rounded-full bg-emerald-500/10 text-[8px] text-emerald-300 border border-emerald-500/30">
              ServiceNow • Workflow
            </span>
          </div>

          <p className="text-[10px] md:text-xs text-slate-300">
            Kanban-style ticketing on ServiceNow: intake, routing, SLAs, and
            technician views designed like a real internal product.
          </p>

          {/* Expanded details */}
          {isHelpdesk && (
            <div className="mt-3 md:mt-4 space-y-1.5 text-[9px] md:text-[10px] text-slate-300">
              <p>
                <span className="text-emerald-300">What&apos;s built:</span>{" "}
                Custom Ticket / Department / Technician tables, portal intake,
                auto-assignment, notifications, and simple status dashboards.
              </p>
              <p>
                <span className="text-emerald-300">Why it matters:</span> Shows
                how Pranjal handles scalable workflows, routing logic, and
                maintainable configuration on a platform teams already use.
              </p>
              <p className="text-sky-400/80">
                Ask MAX: &quot;How does the Helpdesk routing logic work?&quot;
              </p>
            </div>
          )}
        </button>
      </div>

      <p className="mt-3 text-[8px] md:text-[9px] text-slate-500">
        These are representative builds — Pranjal can adapt the same patterns to
        your stack, data model, and governance quickly.
      </p>
    </section>
  );
};

export default BuildStackSection;
