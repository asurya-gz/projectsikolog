"use client";
import React, { useState } from "react"; // Impor useState
import { useRouter } from "next/navigation"; // Untuk navigasi jika menggunakan Next.js
import { FaArrowLeft } from "react-icons/fa"; // Import ikon
import { motion } from "framer-motion"; // Import Framer Motion
import Link from "next/link";
import axios from "axios"; // Import Axios
import Cookies from "js-cookie"; // Import js-cookie untuk manajemen cookie

export default function Login() {
  const router = useRouter(); // Hook untuk navigasi
  const [email, setEmail] = useState(""); // State untuk email
  const [password, setPassword] = useState(""); // State untuk password
  const [errorMessage, setErrorMessage] = useState(""); // State untuk pesan error

  // Fungsi untuk kembali ke halaman utama
  const handleGoBack = () => {
    router.push("/"); // Mengarahkan ke halaman utama ("/")
  };

  // Animasi yang akan diterapkan pada box login
  const boxAnimation = {
    hidden: { opacity: 0, y: -20 }, // Kondisi awal
    visible: { opacity: 1, y: 0 }, // Kondisi akhir
  };

  // Fungsi untuk meng-handle pengiriman formulir
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman

    try {
      const response = await axios.post(
        "https://be-psi.up.railway.app:4000/users/login",
        {
          email,
          password,
        }
      );

      // Log seluruh response.data untuk melihat strukturnya
      console.log("Response Data:", response.data);

      // Simpan token dan userID di cookie jika ada
      if (response.data.token) {
        Cookies.set("token", response.data.token, { expires: 7 }); // Set cookie dengan durasi 7 hari
        // Menyimpan user ID dari respons
        const userID = response.data.user.id; // Mengambil user ID
        Cookies.set("userID", userID, { expires: 7 }); // Set cookie dengan durasi 7 hari
      } else {
        console.error("Token tidak tersedia dalam respons.");
      }

      // Jika login berhasil, arahkan ke halaman dashboard
      router.push("/Dashboard");
    } catch (error) {
      // Menangani kesalahan respons dan menampilkan pesan kesalahan
      if (error.response) {
        setErrorMessage(
          error.response.data.message || "Email atau password salah."
        ); // Jika ada respons dari server
      } else {
        setErrorMessage("Terjadi kesalahan. Silakan coba lagi."); // Jika tidak ada respons
      }
    }
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

        {/* Menampilkan pesan kesalahan jika ada */}
        {errorMessage && (
          <div className="text-red-500 text-center">{errorMessage}</div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Meng-handle submit */}
          <div>
            <label htmlFor="email" className="block text-gray-600 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email} // Menggunakan state email
              onChange={(e) => setEmail(e.target.value)} // Update state saat input berubah
              className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Masukkan email"
              required // Tambahkan required untuk validasi input
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-600 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password} // Menggunakan state password
              onChange={(e) => setPassword(e.target.value)} // Update state saat input berubah
              className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Masukkan password"
              required // Tambahkan required untuk validasi input
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
          <button
            type="submit" // Hapus Link dan ubah ke button
            className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
          >
            Masuk
          </button>
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
