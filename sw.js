let cacheName    = "DvM";
let filesToCache = [
  "./",
  "./libraries/pico/pico.classless.min.css",
  "./libraries/tailwind/tailwind-mod.min.css",
  "./manifest.json",
  "./imgs/logo.png",
  "./index.html",
  "./css/style.css",
  "./js/bundle.js",
  "./libraries/font-awesome/css/all.css",
  "./libraries/font-awesome/css/all.min.css",
  "./libraries/font-awesome/css/brands.css",
  "./libraries/font-awesome/css/brands.min.css",
  "./libraries/font-awesome/css/fontawesome.css",
  "./libraries/font-awesome/css/fontawesome.min.css",
  "./libraries/font-awesome/css/regular.css",
  "./libraries/font-awesome/css/regular.min.css",
  "./libraries/font-awesome/css/solid.css",
  "./libraries/font-awesome/css/solid.min.css",
  "./libraries/font-awesome/css/svg-with-js.css",
  "./libraries/font-awesome/css/svg-with-js.min.css",
  "./libraries/font-awesome/css/v4-font-face.css",
  "./libraries/font-awesome/css/v4-font-face.min.css",
  "./libraries/font-awesome/css/v4-shims.css",
  "./libraries/font-awesome/css/v4-shims.min.css",
  "./libraries/font-awesome/css/v5-font-face.css",
  "./libraries/font-awesome/css/v5-font-face.min.css",
  "./libraries/font-awesome/js/all.js",
  "./libraries/font-awesome/js/all.min.js",
  "./libraries/font-awesome/js/brands.js",
  "./libraries/font-awesome/js/brands.min.js",
  "./libraries/font-awesome/js/conflict-detection.js",
  "./libraries/font-awesome/js/conflict-detection.min.js",
  "./libraries/font-awesome/js/fontawesome.js",
  "./libraries/font-awesome/js/fontawesome.min.js",
  "./libraries/font-awesome/js/regular.js",
  "./libraries/font-awesome/js/regular.min.js",
  "./libraries/font-awesome/js/solid.js",
  "./libraries/font-awesome/js/solid.min.js",
  "./libraries/font-awesome/js/v4-shims.js",
  "./libraries/font-awesome/js/v4-shims.min.js",
  "./libraries/font-awesome/LICENSE.txt",
  "./libraries/font-awesome/webfonts/fa-brands-400.ttf",
  "./libraries/font-awesome/webfonts/fa-brands-400.woff2",
  "./libraries/font-awesome/webfonts/fa-regular-400.ttf",
  "./libraries/font-awesome/webfonts/fa-regular-400.woff2",
  "./libraries/font-awesome/webfonts/fa-solid-900.ttf",
  "./libraries/font-awesome/webfonts/fa-solid-900.woff2",
  "./libraries/font-awesome/webfonts/fa-v4compatibility.ttf",
  "./libraries/font-awesome/webfonts/fa-v4compatibility.woff2"
];

/* Start the service worker and cache all of the app's content */
self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
  self.skipWaiting();
});

/* Serve cached content when offline */
self.addEventListener("fetch", function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});