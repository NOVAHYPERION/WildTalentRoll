navigator.serviceWorker && navigator.serviceWorker.register('./PWAstuff/sw.js').then(function(registration) {
  console.log('REGISTER. SCOPE:', registration.scope);
});