// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAOszXkupfcN0O3zArsqEf7WCr_ihr6abM",
  authDomain: "psss-59f8c.firebaseapp.com",
  projectId: "psss-59f8c",
  storageBucket: "psss-59f8c.appspot.com",
  messagingSenderId: "876825832451",
  appId: "1:876825832451:web:855765f97ab21c24c4b236",
  measurementId: "G-FHW8LTLBM8",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging };
