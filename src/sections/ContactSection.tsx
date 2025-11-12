// src/sections/ContactSection.tsx

import React, { useState } from "react";

const ContactSection: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (fieldKey: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(fieldKey);
      setTimeout(() => setCopiedField(null), 1400);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const CopyBadge: React.FC<{ fieldKey: string }> = ({ fieldKey }) => (
    <button
      type="button"
      className={`ml-2 px-2 py-[3px] rounded-full text-[9px] border transition-all ${
        copiedField === fieldKey
          ? "border-emerald-400/80 text-emerald-300 bg-emerald-500/10"
          : "border-slate-600/80 text-slate-300 hover:border-sky-400 hover:text-sky-300 hover:bg-sky-500/5"
      }`}
    >
      {copiedField === fieldKey ? "Copied" : "Copy"}
    </button>
  );

  return (
    <section id="contact" className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-50 mb-2">
          Contact &amp; MAX
        </h2>
        <p className="text-[12px] md:text-[13px] text-slate-400 mb-6 max-w-2xl">
          Best ways to reach me for AI / LLM / full-stack roles, collaborations,
          or interesting problems. MAX (bottom-right) is live if you&apos;d like
          a guided tour of my work before you email.
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          {/* === Contact form (Formspree) === */}
          <div className="rounded-2xl border border-slate-800/85 bg-slate-950/70 p-4 shadow-[0_18px_38px_rgba(15,23,42,0.9)]">
            <h3 className="text-sm font-semibold text-slate-100 mb-3">
              Send a message
            </h3>
            <form
              action="https://formspree.io/f/mnnggnvp"
              method="POST"
              className="space-y-3"
            >
              {/* Name */}
              <div>
                <label className="block text-[9px] font-medium text-slate-400 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full rounded-xl bg-slate-950/90 border border-slate-700/80 px-3 py-2 text-[11px] text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-500/70 transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[9px] font-medium text-slate-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl bg-slate-950/90 border border-slate-700/80 px-3 py-2 text-[11px] text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-500/70 transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-[9px] font-medium text-slate-400 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Hi Pranjal, we'd like to talk about an opportunity…"
                  className="w-full rounded-xl bg-slate-950/90 border border-slate-700/80 px-3 py-2 text-[11px] text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-500/70 transition-all resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-[11px] font-medium bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 shadow-[0_12px_30px_rgba(56,189,248,0.45)] hover:from-sky-400 hover:to-cyan-300 hover:shadow-[0_16px_40px_rgba(56,189,248,0.55)] transition-all"
              >
                Send Message
                <span className="inline-block">
                  {/* paper plane icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-3 h-3 fill-current"
                  >
                    <path d="M3.4 20.6 21 12 3.4 3.4 3 10l9 2-9 2z" />
                  </svg>
                </span>
              </button>

              <p className="mt-2 text-[9px] text-slate-500">
                Or email directly:{" "}
                <a
                  href="mailto:pranjal6004@gmail.com"
                  className="text-sky-400 hover:text-sky-300"
                >
                  pranjal6004@gmail.com
                </a>
              </p>
            </form>
          </div>

          {/* === Contact details === */}
          <div className="rounded-2xl border border-slate-800/85 bg-slate-950/70 p-4 flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-slate-100">
              Contact details
            </h3>

            {/* Name */}
            <div>
              <div className="text-[8px] uppercase tracking-[0.16em] text-slate-500">
                Name
              </div>
              <div className="mt-[2px] flex items-center gap-2 text-[11px] text-slate-100">
                {/* user icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-3.5 h-3.5 text-sky-400 fill-current"
                >
                  <path d="M12 2a5 5 0 0 0-1 9.9V13H7a5 5 0 0 0-5 5v2h2v-2a3 3 0 0 1 3-3h4v5h2v-5h4a3 3 0 0 1 3 3v2h2v-2a5 5 0 0 0-5-5h-4v-1.1A5 5 0 0 0 12 2Z" />
                </svg>
                <span>Pranjal Srivastava</span>
              </div>
            </div>

            {/* Address */}
            <div>
              <div className="text-[8px] uppercase tracking-[0.16em] text-slate-500">
                Address
              </div>
              <div className="mt-[2px] flex items-center text-[11px] text-slate-200">
                {/* location icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-3.5 h-3.5 text-sky-400 fill-current mr-1.5"
                >
                  <path d="M12 2a7 7 0 0 0-7 7c0 4.1 5.2 10.1 6.4 11.4.3.3.9.3 1.2 0C13.8 19.1 19 13.1 19 9a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
                </svg>
                <span className="leading-snug">
                  1802 Ennis Joslin Rd, Apt 633, Corpus Christi, Nueces County,
                  Texas, 78412
                </span>
                <span
                  onClick={() =>
                    handleCopy(
                      "address",
                      "1802 Ennis Joslin Rd, Apt 633, Corpus Christi, Nueces County, Texas, 78412"
                    )
                  }
                >
                  <CopyBadge fieldKey="address" />
                </span>
              </div>
            </div>

            {/* Email */}
            <div>
              <div className="text-[8px] uppercase tracking-[0.16em] text-slate-500">
                Email
              </div>
              <div className="mt-[2px] flex items-center text-[11px] text-slate-200">
                {/* mail icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-3.5 h-3.5 text-sky-400 fill-current mr-1.5"
                >
                  <path d="M3 4h18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2v.2l9 5.3 9-5.3V6H3Zm18 2.9-9 5.3-9-5.3V18h18V8.9Z" />
                </svg>
                <a
                  href="mailto:pranjal6004@gmail.com"
                  className="text-sky-400 hover:text-sky-300"
                >
                  pranjal6004@gmail.com
                </a>
                <span
                  onClick={() =>
                    handleCopy("email", "pranjal6004@gmail.com")
                  }
                >
                  <CopyBadge fieldKey="email" />
                </span>
              </div>
            </div>

            {/* Mobile */}
            <div>
              <div className="text-[8px] uppercase tracking-[0.16em] text-slate-500">
                Mobile
              </div>
              <div className="mt-[2px] flex items-center text-[11px] text-slate-200">
                {/* phone icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-3.5 h-3.5 text-sky-400 fill-current mr-1.5"
                >
                  <path d="M6.6 2h2.3c.5 0 .9.4 1 .9l.5 3.3c.1.5-.1 1-.5 1.3L8.7 8.7a9.8 9.8 0 0 0 6.6 6.6l1.2-1.2c.3-.4.8-.6 1.3-.5l3.3.5c.5.1.9.5.9 1v2.3c0 .6-.5 1.1-1.1 1.1A17.9 17.9 0 0 1 3 3.1C3 2.5 3.5 2 4.1 2Z" />
                </svg>
                <a
                  href="tel:+13463752373"
                  className="text-slate-200 hover:text-sky-300"
                >
                  +1 (346) 375-2373
                </a>
                <span
                  onClick={() =>
                    handleCopy("mobile", "+1 (346) 375-2373")
                  }
                >
                  <CopyBadge fieldKey="mobile" />
                </span>
              </div>
            </div>

            {/* LinkedIn */}
            <div>
              <div className="text-[8px] uppercase tracking-[0.16em] text-slate-500">
                LinkedIn
              </div>
              <div className="mt-[2px] flex items-center gap-2 text-[11px] text-slate-200">
                <a
                  href="https://www.linkedin.com/in/pranjal-srivastava07"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full border border-sky-500/70 text-sky-300 text-[10px] hover:bg-sky-500/10 hover:text-sky-100 transition-all"
                >
                  {/* LinkedIn icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-3.5 h-3.5 fill-current"
                  >
                    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm.02 5.9H2V21h3V9.4ZM9 9.4H6v11.6h3V15c0-1.6.8-2.6 2.1-2.6 1.3 0 1.9.9 1.9 2.6V21h3v-6.8c0-3-1.6-4.6-3.9-4.6-1.8 0-2.6 1-3.1 1.7h-.1V9.4Z" />
                  </svg>
                  <span>linkedin.com/in/pranjal-srivastava07</span>
                </a>
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(
                      "linkedin",
                      "https://www.linkedin.com/in/pranjal-srivastava07"
                    )
                  }
                >
                  <CopyBadge fieldKey="linkedin" />
                </button>
              </div>
            </div>

            {/* Instagram */}
            <div>
              <div className="text-[8px] uppercase tracking-[0.16em] text-slate-500">
                Instagram
              </div>
              <div className="mt-[2px] flex items-center gap-2 text-[11px] text-slate-200">
                <a
                  href="https://www.instagram.com/pranjal.srivastava.7"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full border border-fuchsia-400/80 text-fuchsia-300 text-[10px] hover:bg-fuchsia-500/10 hover:text-fuchsia-100 transition-all"
                >
                  {/* Instagram icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-3.5 h-3.5 fill-current"
                  >
                    <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7Zm0 2h10c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3Zm9.8 2.2a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" />
                  </svg>
                  <span>@pranjal.srivastava.7</span>
                </a>
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(
                      "instagram",
                      "@pranjal.srivastava.7"
                    )
                  }
                >
                  <CopyBadge fieldKey="instagram" />
                </button>
              </div>
            </div>

            <p className="mt-1.5 text-[8.5px] text-slate-500">
              I usually respond quickest to concise emails and LinkedIn notes
              that include context, timeline, and how I can help. MAX can help
              you draft one.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
