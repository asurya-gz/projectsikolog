importScripts(
  "https://www.gstatic.com/firebasejs/9.17.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.17.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyAOszXkupfcN0O3zArsqEf7WCr_ihr6abM",
  authDomain: "psss-59f8c.firebaseapp.com",
  projectId: "psss-59f8c",
  storageBucket: "psss-59f8c.appspot.com",
  messagingSenderId: "876825832451",
  appId: "1:876825832451:web:855765f97ab21c24c4b236",
  measurementId: "G-FHW8LTLBM8",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
