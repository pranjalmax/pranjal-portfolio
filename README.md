# MAX — Portfolio Copilot

**Live site:** https://pranjalmax.github.io/pranjal-portfolio/  
**Client:** React + TypeScript + Tailwind (GitHub Pages)  
**API:** Vercel Serverless Function calling Groq (separate repo: `pranjal-chat-api`)

A production-style portfolio that answers recruiter questions in real time. The site showcases work in an **AI Lab** with expandable details and embeds **MAX**, a scoped on-page assistant that only answers about the public skills, projects, and experience in this portfolio. The backend includes rate limiting, CORS allowlist, input filtering, and model fallbacks.

---

## Why this project matters

- **Fast hiring signal:** Clear, skimmable project tiles with images and one-line value statements.
- **Scoped AI, not a generic chatbot:** MAX answers strictly about portfolio content and redirects non-scope queries.
- **Production hygiene:** Serverless backend with guardrails and graceful degradation; accessible, responsive front-end.

---

## Highlights

- **AI Lab:** Project cards with imagery, labels, summaries, and “view details” expanders.  
- **MAX (Portfolio Copilot):** Floating button opens an assistant bound to a curated BIO/persona; responses come from a serverless API.  
- **Resilient backend:** Token-bucket rate limiting, CORS allowlist to the Pages origin, message length caps, URL/spam filters, and model fallback order.  
- **Polished UI/UX:** Animated “breathing” background, section-aware floating avatar, progress bar, responsive layout.  
- **Contact that converts:** Formspree form (name, email, message) plus copy-to-clipboard controls for handles.  
- **Foundations & Experience:** Case-study friendly structure with bullets plus narrative. Education and credentials are included.  
- **About section:** Professional bio plus a photo slider (auto-advance, manual controls).

---

## Architecture (high level)

Client (React + TS + Tailwind) on GitHub Pages
├─ Sections: Hero, AI Lab, Build Stack, Foundations, Experience, About, Playground, Contact
└─ MAX UI: Floating button + chat drawer
└─ POST /api/chat → Vercel Serverless (Node 18+)
├─ CORS allowlist (GitHub Pages origin)
├─ Rate limit (token bucket)
├─ Input guard (length, spam/URL filter, character whitelist)
└─ Model fallback (Groq chat completions)

- **Client:** Static SPA built with Vite, deployed to GitHub Pages.  
- **API:** Vercel function (`api/chat.js` in the API repo) calls Groq Chat Completions and enforces guardrails.

---

## Tech stack

- **Frontend:** React, TypeScript, Tailwind CSS, Vite  
- **Backend:** Vercel Serverless Functions (Node 18+), Groq API  
- **Deploy:** GitHub Pages (client), Vercel (API)  
- **Forms:** Formspree (contact submissions)

---

## MAX API (contract)

**Endpoint (production):** `https://pranjal-chat-api.vercel.app/api/chat`  
**Method:** `POST`

**Request body:**
```json
{
  "message": "Which two projects best fit an AI Engineer role?",
  "history": [
    { "role": "user", "content": "Hi MAX" },
    { "role": "assistant", "content": "Hello! Ask me about projects or skills." }
  ]
}
Response (success):

json
Copy code
{
  "assistant": "Max-AI Assistant",
  "answer": "For AI Engineer fit, consider Hallucination Guard and Private Doc Chat..."
}
```

**Notes**

CORS allowlist is set to the portfolio’s origin.
Rate limit: burst 16, refill 8/min per IP.
Input guard: length cap, URL/spam patterns, character filter.
Model fallbacks maintain availability when a preferred model is unavailable.

## Configuration

**Serverless API (Vercel)**

GROQ_API_KEY (required)
GROQ_MODEL (optional; overrides default fallback order)
ALLOWED_ORIGIN in code set to the GitHub Pages origin

**Client (this repo)**

Optional: create .env with VITE_MAX_API_URL to point at a custom API base (for local dev or staging).

## Local development

**Client**
npm install
npm run dev
# open http://localhost:5173

API (separate repo)
# set env vars in Vercel dashboard or .env.local
vercel dev
# exposes /api/chat locally


To point the UI at a local API, add .env in the client:

VITE_MAX_API_URL=http://localhost:3000/api/chat

## Accessibility and performance

Keyboard-navigable controls; visible focus rings.
Reduced-motion friendly animations.
Meaningful alt text for images; color contrast tuned for dark theme.
Lean markup and lazy images for faster load.

## Project structure (simplified)

src/
  assets/                      # images, gifs, icons
  components/
    FloatingMaxButton.tsx      # floating avatar; section-aware label
    MaxChat.tsx                # chat drawer UI
  sections/
    HeroSection.tsx
    AiLabSection.tsx
    BuildStackSection.tsx
    FoundationsSection.tsx
    ExperienceSection.tsx
    AboutSection.tsx
    PlaygroundSection.tsx
    ContactSection.tsx
  index.css                    # Tailwind plus "breathing" keyframes

## Security and safety controls
CORS allowlist to the public site origin (prevents random third-party calls).
Token-bucket rate limiting (mitigates abuse).
Input guards (spam/URL filters, length caps, safe charset).
Model fallback strategy (handles upstream deprecations or outages).
Graceful degradation (human-friendly messages when the model is unreachable).

## License

This repository is provided for showcasing engineering approach and portfolio content. All rights reserved unless a license file is added.