const CACHE_NAME = "footytimer-v1.07";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./instructions.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./fonts/Orbitron-Bold.woff2",
  "./fonts/Roboto-Bold.woff2"
  "./sirens/siren.mp3",
  "./sirens/twomin.mp3",
  "./sirens/onemin.mp3",
];

// Install → cache core files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate → clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch → serve from cache first
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
