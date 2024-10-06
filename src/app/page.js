"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaRegSmileBeam, FaBell, FaThumbsUp } from "react-icons/fa";

export default function Home() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-between px-6 lg:px-16 py-12">
      <motion.header
        className="text-center max-w-3xl"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <h1 className="text-4xl lg:text-6xl font-bold text-pink-400 mb-4">
          Tingkatkan Moralmu dengan Afirmasi Positif
        </h1>
        <p className="text-lg lg:text-xl text-gray-300 mb-8">
          Dapatkan pesan afirmasi positif harian untuk memulai harimu dengan
          semangat dan energi baru!
        </p>
        <motion.button
          className="bg-purple-600 text-white py-3 px-8 rounded-full hover:bg-purple-700 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Kirim Pesan Sekarang
        </motion.button>
      </motion.header>

      <motion.section
        className="mt-12 text-center"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <h2 className="text-3xl font-semibold text-pink-400 mb-6">
          Manfaat Bergabung Dengan Kami
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div
            className="bg-gray-800 rounded-lg p-6 flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            variants={sectionVariants}
          >
            <FaRegSmileBeam className="text-purple-500 text-5xl mb-4" />
            <h3 className="text-2xl font-bold text-purple-500 mb-2">
              Motivasi Harian
            </h3>
            <p className="text-gray-400 text-center">
              Dapatkan afirmasi harian yang memotivasi dan membuat harimu lebih
              baik.
            </p>
          </motion.div>
          <motion.div
            className="bg-gray-800 rounded-lg p-6 flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            variants={sectionVariants}
          >
            <FaBell className="text-purple-500 text-5xl mb-4" />
            <h3 className="text-2xl font-bold text-purple-500 mb-2">
              Pengingat Positif
            </h3>
            <p className="text-gray-400 text-center">
              Jadwal pengingat otomatis untuk meningkatkan mood kapan saja.
            </p>
          </motion.div>
          <motion.div
            className="bg-gray-800 rounded-lg p-6 flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            variants={sectionVariants}
          >
            <FaThumbsUp className="text-purple-500 text-5xl mb-4" />
            <h3 className="text-2xl font-bold text-purple-500 mb-2">
              Buang Fikiran Buruk
            </h3>
            <p className="text-gray-400 text-center">
              Membuatmu lebih percaya kepada potensi diri sendiri.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <footer className="text-center text-gray-500 py-6">
        © 2024 Afirmasi Positif. Dilindungi Hak Cipta
      </footer>
    </div>
  );
}
