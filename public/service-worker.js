// service-worker.js

// Event install (opsional, jika Anda ingin menyiapkan cache)
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
});

// Event activate
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");
});

// Mendapatkan izin untuk menampilkan notifikasi
self.addEventListener("push", (event) => {
  const data = event.data.json(); // Mengambil data yang dikirim dari server

  const title = data.title || "Afirmasi Harian"; // Judul notifikasi
  const options = {
    body: data.body || "Tidak ada isi",
    vibrate: [200, 100, 200], // Pola getaran
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Mendaftarkan event untuk ketika notifikasi di klik
self.addEventListener("notificationclick", (event) => {
  event.notification.close(); // Menutup notifikasi saat diklik
  event.waitUntil(
    clients.openWindow("http://localhost:3000/") // Ganti dengan URL yang sesuai
  );
});
