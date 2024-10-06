"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaRegSmileBeam, FaBell, FaThumbsUp } from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  // Fungsi untuk meminta izin notifikasi
  const requestNotificationPermission = () => {
    if (Notification.permission === "granted") {
      // Izin sudah diberikan, kita bisa langsung mengirim notifikasi
      console.log("Notifikasi sudah diizinkan.");
    } else if (Notification.permission !== "denied") {
      // Minta izin
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Izin notifikasi diberikan.");
          // Anda bisa memanggil fungsi untuk mengirim notifikasi di sini
        } else {
          console.log("Izin notifikasi ditolak.");
        }
      });
    } else {
      console.log("Notifikasi tidak diizinkan.");
    }
  };

  // Panggil fungsi saat komponen di-mount
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between px-6 lg:px-16 py-12">
      {/* Header */}
      <motion.header
        className="text-center max-w-3xl"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        {/* Tempat untuk Logo */}
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Logo" className="w-20 h-20" />
        </div>

        <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-4">
          Tingkatkan Moralmu dengan Afirmasi Positif Dari{" "}
          <span id="judulutama" className="text-yellow-500">
            KataKitaMah!
          </span>
        </h1>
        <p className="text-lg lg:text-xl text-gray-700 mb-8">
          Dapatkan pesan afirmasi positif harian untuk memulai harimu dengan
          semangat dan energi baru!
        </p>
        <Link href="/Login">
          <motion.button
            className="bg-yellow-500 text-white py-3 px-8 rounded-full hover:bg-yellow-600 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Bergabung Dengan Kami
          </motion.button>
        </Link>
      </motion.header>

      {/* Manfaat */}
      <motion.section
        className="mt-12 text-center"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Manfaat Bergabung Dengan Kami
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div
            className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center shadow-md"
            whileHover={{ scale: 1.05 }}
            variants={sectionVariants}
          >
            <FaRegSmileBeam className="text-yellow-500 text-5xl mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Motivasi Harian
            </h3>
            <p className="text-gray-600 text-center">
              Dapatkan afirmasi harian yang memotivasi dan membuat harimu lebih
              baik.
            </p>
          </motion.div>
          <motion.div
            className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center shadow-md"
            whileHover={{ scale: 1.05 }}
            variants={sectionVariants}
          >
            <FaBell className="text-yellow-500 text-5xl mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Pengingat Positif
            </h3>
            <p className="text-gray-600 text-center">
              Jadwal pengingat otomatis untuk meningkatkan mood kapan saja.
            </p>
          </motion.div>
          <motion.div
            className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center shadow-md"
            whileHover={{ scale: 1.05 }}
            variants={sectionVariants}
          >
            <FaThumbsUp className="text-yellow-500 text-5xl mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Buang Fikiran Buruk
            </h3>
            <p className="text-gray-600 text-center">
              Membuatmu lebih percaya kepada potensi diri sendiri.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-6">
        © 2024 Afirmasi Positif. Dilindungi Hak Cipta
      </footer>
    </div>
  );
}
