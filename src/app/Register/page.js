"use client";
import React, { useState } from "react"; // Menambahkan useState untuk state management
import { useRouter } from "next/navigation"; // Untuk navigasi jika menggunakan Next.js
import { FaArrowLeft } from "react-icons/fa"; // Import ikon
import { motion } from "framer-motion"; // Import Framer Motion
import Link from "next/link";

export default function Register() {
  const router = useRouter(); // Hook untuk navigasi
  const [password, setPassword] = useState(""); // State untuk password
  const [confirmPassword, setConfirmPassword] = useState(""); // State untuk konfirmasi password
  const [errorMessage, setErrorMessage] = useState(""); // State untuk pesan kesalahan
  const [passwordStrength, setPasswordStrength] = useState(""); // State untuk kekuatan password
  const [isPasswordMatch, setIsPasswordMatch] = useState(false); // State untuk kesesuaian password

  // Fungsi untuk mengecek kekuatan password
  const checkPasswordStrength = (password) => {
    let strength = "lemah";
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*]/.test(password);
    const length = password.length;

    if (
      length >= 8 &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChars
    ) {
      strength = "kuat";
    } else if (
      length >= 6 &&
      ((hasUpperCase && hasLowerCase) ||
        (hasUpperCase && hasNumbers) ||
        (hasLowerCase && hasNumbers))
    ) {
      strength = "sedang";
    }

    setPasswordStrength(strength);
  };

  // Fungsi untuk memeriksa kesesuaian password
  const checkPasswordMatch = (confirmPassword) => {
    setIsPasswordMatch(password === confirmPassword);
  };

  // Fungsi untuk kembali ke halaman utama
  const handleGoBack = () => {
    router.push("/"); // Mengarahkan ke halaman utama ("/")
  };

  // Animasi yang akan diterapkan pada box register
  const boxAnimation = {
    hidden: { opacity: 0, y: -20 }, // Kondisi awal
    visible: { opacity: 1, y: 0 }, // Kondisi akhir
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah perilaku default form

    if (password !== confirmPassword) {
      setErrorMessage("Password tidak cocok."); // Set pesan kesalahan
      setPasswordStrength(""); // Kosongkan kekuatan password jika tidak cocok
      setIsPasswordMatch(false); // Set kesesuaian password ke false
    } else {
      setErrorMessage(""); // Kosongkan pesan kesalahan jika password cocok
      // Logika untuk mengirim data registrasi dapat ditambahkan di sini
      console.log("Mendaftar dengan:", { password }); // Contoh output
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative px-4">
      {/* Tombol kembali di pojok kiri atas */}
      <button
        onClick={handleGoBack}
        className="absolute top-4 left-4 text-gray-400 hover:text-gray-300 transition duration-300"
      >
        <FaArrowLeft className="text-2xl" />
      </button>

      {/* Menggunakan motion.div untuk animasi */}
      <motion.div
        className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full space-y-6"
        initial="hidden" // Kondisi awal saat komponen dimuat
        animate="visible" // Kondisi akhir
        variants={boxAnimation} // Variabel animasi
        transition={{ duration: 0.5 }} // Durasi animasi
      >
        <h1 className="text-3xl font-semibold text-center text-pink-400">
          Daftar Akun Baru
        </h1>
        <p className="text-gray-400 text-center">
          Isi detail di bawah ini untuk membuat akun baru
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-gray-400 mb-2">
              Nama Lengkap
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Masukkan nama lengkap"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-400 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Masukkan email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-400 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value); // Set password
                checkPasswordStrength(e.target.value); // Cek kekuatan password
              }}
              required
            />
            {/* Tampilkan kekuatan password */}
            <p
              className={`text-sm mt-1 ${
                passwordStrength === "kuat"
                  ? "text-green-500"
                  : passwordStrength === "sedang"
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              Kekuatan Password: {passwordStrength}
            </p>
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-gray-400 mb-2"
            >
              Konfirmasi Password
            </label>
            <input
              id="confirm-password"
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Konfirmasi password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value); // Set konfirmasi password
                checkPasswordMatch(e.target.value); // Cek kesesuaian password
              }}
              required
            />
            {/* Tampilkan pesan kesalahan jika password tidak cocok */}
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
            {/* Tampilkan indikasi kesesuaian password */}
            {confirmPassword && (
              <p
                className={`text-sm mt-1 ${
                  isPasswordMatch ? "text-green-500" : "text-red-500"
                }`}
              >
                {isPasswordMatch
                  ? "Password sudah sesuai."
                  : "Password tidak sesuai."}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Daftar
          </button>
        </form>
        <p className="text-center text-gray-400">
          Sudah punya akun?{" "}
          <Link href="/Login" className="text-purple-500 hover:text-purple-400">
            Masuk Sekarang
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
