/* Service Worker — Mebel Ilham Jati Solo
   Offline-first for the static app shell. */

const CACHE = "ijs-shell-v3";

/* Core static files that never get hashed (served from public/). */
const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./sw.js",
  "./assets/cropped_circle_image_(2).png",
  "./assets/cropped_circle_image_(2) copy.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  /* Don't intercept cross-origin (Google Fonts, Pexels photos, wa.me). */
  if (url.origin !== self.location.origin) return;

  /* Stale-while-revalidate for same-origin GETs (covers hashed CSS/JS too). */
  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.status === 200 && res.type === "basic") {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
