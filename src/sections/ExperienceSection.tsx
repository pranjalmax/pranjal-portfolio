// src/sections/ExperienceSection.tsx

function ExperienceSection() {
  const roles = [
    {
      company: "Tinker Tech Logix",
      title: "Software Developer",
      period: "Apr 2024 – Nov 2025",
      focus:
        "Full-stack engineer on internal & client-facing apps: React/TypeScript, Node APIs, SQL, and CI/CD.",
      highlights: [
        "Owned end-to-end delivery for web apps and APIs used daily by operations and client teams — from UX and data models to deployment and monitoring.",
        "Built assistants and smart search flows over internal docs and SOPs, cutting repetitive back-and-forth and lifting first-touch resolution accuracy by ~20%.",
        "Hardened REST APIs with clear contracts, auth, logging, and basic tracing; incident triage time on those surfaces dropped by roughly 30%.",
        "Optimized SQL queries, indexing, and caching paths on key views, reducing p95 latency by ~30–35% without inflating infra costs.",
        "Standardized releases with Docker + CI/CD pipelines and practical runbooks / rollback steps, lowering change failure rate and MTTR by an estimated 15–20%."
      ]
    },
    {
      company: "ECS",
      title: "Cloud Server & Data Management Intern",
      period: "May 2019 – Aug 2019",
      focus:
        "Supported cloud infrastructure, backup/restore workflows, and monitoring for hosted systems.",
      highlights: [
        "Helped maintain and document backup, recovery, and access-control procedures for production databases and file stores.",
        "Assisted with migrations and health checks for cloud-hosted workloads, reducing manual maintenance effort on recurring tasks.",
        "Improved visibility by contributing to basic dashboards and alerts so issues surfaced earlier instead of being found by end users."
      ]
    }
  ];

  return (
    <section id="experience" className="pt-16 pb-16">
      <div className="mb-6">
        <h2 className="text-slate-100 text-2xl md:text-3xl font-semibold tracking-tight">
          Experience
        </h2>
        <p className="mt-2 text-xs md:text-sm text-slate-400 max-w-2xl">
          Roles where I’ve been accountable for real systems: production apps,
          APIs, data, reliability, and the workflows around them.
        </p>
      </div>

      <div className="relative">
        {/* Vertical timeline spine */}
        <div className="absolute left-2 md:left-3 top-2 bottom-4 w-px bg-slate-800/70 pointer-events-none" />

        <div className="space-y-4 md:space-y-5">
          {roles.map((role, idx) => (
            <div
              key={role.company}
              className="relative pl-7 md:pl-9"
            >
              {/* Timeline node */}
              <div
                className={`
                  absolute left-1 md:left-2 top-4
                  h-2.5 w-2.5 rounded-full
                  ${idx === 0 ? "bg-sky-400" : "bg-slate-500"}
                  shadow-[0_0_10px_rgba(56,189,248,0.9)]
                `}
              />

              {/* Role card */}
              <div
                className="
                  rounded-2xl border
                  bg-slate-900/40
                  border-slate-800/80
                  hover:border-sky-500/70 hover:bg-slate-900/80
                  transition-all duration-300
                  shadow-[0_18px_48px_rgba(15,23,42,0.7)]
                  px-4 py-3 md:px-5 md:py-4
                "
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex flex-wrap items-baseline gap-1.5">
                    <h3 className="text-slate-100 text-sm md:text-base font-semibold">
                      {role.title}
                    </h3>
                    <span className="text-sky-400 text-xs md:text-sm font-semibold">
                      — {role.company}
                    </span>
                  </div>
                  <div className="text-[9px] md:text-[10px] text-slate-400">
                    {role.period}
                  </div>
                </div>

                <div className="mt-1.5 text-[9px] md:text-[10px] text-slate-400">
                  {role.focus}
                </div>

                {/* Impact-style paragraphs */}
                <div className="mt-2 space-y-1.5 text-[8px] md:text-[9px] text-slate-300/95 leading-relaxed">
                  {role.highlights.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;
