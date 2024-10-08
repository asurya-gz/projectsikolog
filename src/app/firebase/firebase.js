"use client";
import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import Cookies from "js-cookie"; // Import Cookies
import axios from "axios"; // Import axios

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOszXkupfcN0O3zArsqEf7WCr_ihr6abM",
  authDomain: "psss-59f8c.firebaseapp.com",
  projectId: "psss-59f8c",
  storageBucket: "psss-59f8c.appspot.com",
  messagingSenderId: "876825832451",
  appId: "1:876825832451:web:855765f97ab21c24c4b236",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Create a hook for Firebase Messaging
export const useFirebaseMessaging = () => {
  useEffect(() => {
    const messaging = getMessaging(firebaseApp);

    const requestNotificationPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          console.log("Permission granted for notifications");

          const token = await getToken(messaging, {
            vapidKey:
              "BKlh8tgX0Fa4FcxwBcxLLF8J3K2c_s75mTnlf5_9w-dMEQTj1EiReqzAS8qXAkKDfFeGIttG5XK9P2lPhEyBV4Q",
          });

          if (token) {
            // Simpan token ke dalam database menggunakan user ID dari cookies
            const userID = Cookies.get("userID"); // Ambil userID dari cookies

            // Kirim token ke server
            await axios.post("https://be-psi.up.railway.app/api/save-token", {
              user_id: userID,
              token: token,
            });
            console.log("Token saved to the database:", token);
          } else {
            console.log("No registration token available.");
          }
        } else {
          console.log("Permission denied for notifications");
        }
      } catch (err) {
        console.error("Error getting token: ", err);
      }
    };

    requestNotificationPermission();
  }, []);
};
