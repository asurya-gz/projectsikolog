"use client"; // Untuk mendukung client-side routing
import React, { useState } from "react"; // Import useState untuk state management
import { useRouter } from "next/navigation"; // Untuk navigasi jika menggunakan Next.js
import { FaArrowLeft, FaEdit } from "react-icons/fa"; // Import ikon panah dan pensil
import { motion } from "framer-motion"; // Import Framer Motion

export default function Profile() {
  const router = useRouter();

  // State untuk menyimpan informasi profil dan status edit
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@email.com");
  const [birthDate, setBirthDate] = useState("01 Januari 1990");
  const [phone, setPhone] = useState("+62 123 456 789");

  // Fungsi untuk kembali ke halaman sebelumnya
  const handleGoBack = () => {
    router.back(); // Mengarahkan ke halaman sebelumnya
  };

  // Animasi yang akan diterapkan pada box profile
  const boxAnimation = {
    hidden: { opacity: 0, y: -20 }, // Kondisi awal
    visible: { opacity: 1, y: 0 }, // Kondisi akhir
  };

  // Fungsi untuk menangani toggle edit
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
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
        <h1 className="text-3xl font-semibold text-center text-yellow-500">
          Profil Pengguna
        </h1>

        {/* Info Profile */}
        <div className="text-gray-700 space-y-6">
          <div className="flex flex-col">
            <label className="font-semibold mb-1" htmlFor="name">
              Nama:
            </label>
            {isEditing ? (
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama"
                className="border border-gray-300 rounded p-2 w-full bg-white focus:outline-none focus:ring focus:ring-yellow-300 transition duration-200"
              />
            ) : (
              <span>{name}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1" htmlFor="email">
              Email:
            </label>
            {isEditing ? (
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email"
                className="border border-gray-300 rounded p-2 w-full bg-white focus:outline-none focus:ring focus:ring-yellow-300 transition duration-200"
              />
            ) : (
              <span>{email}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1" htmlFor="birthDate">
              Tanggal Lahir:
            </label>
            {isEditing ? (
              <input
                id="birthDate"
                type="text"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                placeholder="DD Bulan YYYY"
                className="border border-gray-300 rounded p-2 w-full bg-white focus:outline-none focus:ring focus:ring-yellow-300 transition duration-200"
              />
            ) : (
              <span>{birthDate}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1" htmlFor="phone">
              Telepon:
            </label>
            {isEditing ? (
              <input
                id="phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Masukkan nomor telepon"
                className="border border-gray-300 rounded p-2 w-full bg-white focus:outline-none focus:ring focus:ring-yellow-300 transition duration-200"
              />
            ) : (
              <span>{phone}</span>
            )}
          </div>
        </div>

        {/* Tombol Edit */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleEditToggle}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
          >
            {isEditing ? "Simpan" : "Edit Profil"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
