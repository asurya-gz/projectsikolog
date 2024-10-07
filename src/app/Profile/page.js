"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import axios from "axios"; // Import Axios

export default function Profile() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState(""); // Password yang diambil dari database
  const [newPassword, setNewPassword] = useState(""); // Password baru yang ingin diubah
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/Login");
    } else {
      // Fetch data pengguna dari API
      const fetchUserData = async () => {
        try {
          const response = await fetch("http://localhost:4000/users", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Sertakan token untuk otorisasi
            },
          });
          const data = await response.json();

          // Pastikan data adalah array dan ambil elemen pertama
          if (Array.isArray(data) && data.length > 0) {
            setName(data[0].username); // Atur nama pengguna
            setEmail(data[0].email); // Atur email
          } else {
            throw new Error("Data tidak ditemukan.");
          }
          setIsLoading(false); // Set loading ke false setelah data diambil
        } catch (error) {
          console.error("Error fetching user data:", error);
          router.push("/Login"); // Jika ada kesalahan, arahkan ke login
        }
      };

      fetchUserData();
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="spinner"></div>
      </div>
    );
  }

  const handleGoBack = () => {
    router.back();
  };

  const boxAnimation = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      await axios.put(
        "http://localhost:4000/users/change-password",
        { password: newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Password berhasil diubah");
      setNewPassword("");
      toggleModal();
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Gagal mengubah password");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative px-4">
      <button
        onClick={handleGoBack}
        className="absolute top-4 left-4 text-gray-500 hover:text-gray-400 transition duration-300"
      >
        <FaArrowLeft className="text-2xl" />
      </button>

      <motion.div
        className="bg-gray-100 rounded-lg shadow-lg p-8 max-w-md w-full space-y-6"
        initial="hidden"
        animate="visible"
        variants={boxAnimation}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-semibold text-center text-yellow-500">
          Profil Pengguna
        </h1>

        <div className="text-gray-700 space-y-6">
          <div className="flex flex-col">
            <label className="font-semibold mb-1" htmlFor="name">
              Nama:
            </label>
            <span>{name}</span>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1" htmlFor="email">
              Email:
            </label>
            <span>{email}</span>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={toggleModal}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
          >
            Ubah Password
          </button>
        </div>
      </motion.div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 w-96"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-center mb-4">
              Ubah Password
            </h2>
            <form onSubmit={handleChangePassword}>
              <div className="flex flex-col mb-4">
                <label className="font-semibold mb-1" htmlFor="newPassword">
                  Password Baru:
                </label>
                <input
                  id="newPassword"
                  type="password"
                  required
                  value={newPassword} // Simpan nilai password baru di state
                  onChange={(e) => setNewPassword(e.target.value)} // Update nilai state
                  className="border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-yellow-300"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                >
                  Simpan
                </button>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Batal
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
