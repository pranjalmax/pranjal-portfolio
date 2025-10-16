// File: service-worker.js
// Simple offline-first cache for static portfolio (GitHub Pages safe)

const CACHE_NAME = "ps-portfolio-v1";
const OFFLINE_URL = "/pranjal-portfolio/offline.html"; // adjust if repo name changes

// Add your core shell files here (include resume + hero + CSS-in-HTML)
const CORE_ASSETS = [
  "/pranjal-portfolio/",
  "/pranjal-portfolio/index.html",
  "/pranjal-portfolio/offline.html",
  "/pranjal-portfolio/assets/Portfolio_Image.png",
  "/pranjal-portfolio/assets/Pranjal_Srivastava_Resume_Portfolio_Full.pdf",
  "/pranjal-portfolio/assets/favicon.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k === CACHE_NAME ? null : caches.delete(k))))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only handle GET
  if (request.method !== "GET") return;

  // Network-first for HTML pages, cache-first for static assets
  const isHTML = request.headers.get("accept")?.includes("text/html");

  if (isHTML) {
    event.respondWith(
      fetch(request)
        .then((resp) => {
          const copy = resp.clone();
          caches.open(CACHE_NAME).then((c) => c.put(request, copy));
          return resp;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          return cached || caches.match(OFFLINE_URL);
        })
    );
    return;
  }

  // Cache-first for others
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((resp) => {
          const copy = resp.clone();
          caches.open(CACHE_NAME).then((c) => c.put(request, copy));
          return resp;
        })
        .catch(() => caches.match(OFFLINE_URL));
    })
  );
});
