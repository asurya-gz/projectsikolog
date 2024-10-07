"use client";
import React, { useState } from "react"; // Menambahkan useState untuk state management
import { useRouter } from "next/navigation"; // Untuk navigasi jika menggunakan Next.js
import { FaArrowLeft } from "react-icons/fa"; // Import ikon
import { motion } from "framer-motion"; // Import Framer Motion
import Link from "next/link";
import axios from "axios"; // Impor Axios

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Password tidak cocok.");
      setPasswordStrength("");
      setIsPasswordMatch(false);
    } else {
      setErrorMessage("");

      const userData = {
        username: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password,
      };

      try {
        // Menggunakan Axios untuk mengirimkan permintaan POST
        const response = await axios.post(
          "http://localhost:4000/users",
          userData
        );

        console.log("Pengguna berhasil didaftarkan:", response.data);
        router.push("/Login");
      } catch (error) {
        setErrorMessage(error.response?.data?.error || "Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative px-4">
      {/* Tombol kembali di pojok kiri atas */}
      <button
        onClick={handleGoBack}
        className="absolute top-4 left-4 text-gray-500 hover:text-gray-400 transition duration-300 pb-3"
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
          Daftar Akun Baru
        </h1>
        <p className="text-gray-500 text-center">
          Isi detail di bawah ini untuk membuat akun baru
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-gray-600 mb-2">
              Nama Lengkap
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Masukkan nama lengkap"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-600 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Masukkan email"
              required
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
              className="block text-gray-600 mb-2"
            >
              Konfirmasi Password
            </label>
            <input
              id="confirm-password"
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
            className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
          >
            Daftar
          </button>
        </form>
        <p className="text-center text-gray-600">
          Sudah punya akun?{" "}
          <Link href="/Login" className="text-yellow-500 hover:text-yellow-400">
            Masuk Sekarang
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
