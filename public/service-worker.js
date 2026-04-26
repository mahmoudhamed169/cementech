importScripts("https://js.pusher.com/beams/service-worker.js");

self.addEventListener("push", (event) => {
  const data = event.data?.json();

  const title = data?.notification?.title ?? data?.data?.title ?? "إشعار جديد";
  const body = data?.notification?.body ?? data?.data?.body ?? "";

  // أظهر الـ browser notification
  event.waitUntil(self.registration.showNotification(title, { body }));

  // ابعت للـ React
  event.waitUntil(
    self.clients
      .matchAll({ includeUncontrolled: true, type: "window" })
      .then((clients) => {
        clients.forEach((client) => {
          client.postMessage({ notification: { title, body } });
        });
      }),
  );
});
