"use client";
import React from "react";
import { useRouter } from "next/navigation"; // Untuk navigasi jika menggunakan Next.js
import { FaArrowLeft } from "react-icons/fa"; // Import ikon
import { motion } from "framer-motion"; // Import Framer Motion
import Link from "next/link";

export default function Login() {
  const router = useRouter(); // Hook untuk navigasi

  // Fungsi untuk kembali ke halaman utama
  const handleGoBack = () => {
    router.push("/"); // Mengarahkan ke halaman utama ("/")
  };

  // Animasi yang akan diterapkan pada box login
  const boxAnimation = {
    hidden: { opacity: 0, y: -20 }, // Kondisi awal
    visible: { opacity: 1, y: 0 }, // Kondisi akhir
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative px-4">
      {/* Tombol kembali di pojok kiri atas */}
      <button
        onClick={handleGoBack}
        className="absolute top-4 left-4 text-gray-500 hover:text-gray-400 transition duration-300"
      >
        <FaArrowLeft className="text-2xl" />
      </button>

      {/* Menggunakan motion.div untuk animasi */}
      <motion.div
        className="bg-gray-100 rounded-lg shadow-lg p-8 max-w-md w-full space-y-6"
        initial="hidden" // Kondisi awal saat komponen dimuat
        animate="visible" // Kondisi akhir
        variants={boxAnimation} // Variabel animasi
        transition={{ duration: 0.5 }} // Durasi animasi
      >
        {/* Tempat Logo */}
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Logo" className="w-16 h-16" />
        </div>

        <h1 className="text-3xl font-semibold text-center text-gray-800">
          Selamat Datang Kembali
        </h1>
        <p className="text-gray-500 text-center">
          Masukkan detail akun Anda untuk melanjutkan
        </p>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-600 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Masukkan email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-600 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Masukkan password"
            />
          </div>
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 text-gray-600">
                Ingat Saya
              </label>
            </div>
          </div>
          <Link href="/Dashboard">
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
            >
              Masuk
            </button>
          </Link>
        </form>
        <p className="text-center text-gray-600">
          Belum punya akun?{" "}
          <Link
            href="/Register"
            className="text-yellow-500 hover:text-yellow-400"
          >
            Daftar Sekarang
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
