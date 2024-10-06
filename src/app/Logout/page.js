"use client"; // Jika menggunakan client-side routing
import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter untuk navigasi

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    // Fungsi untuk logout
    const handleLogout = () => {
      // Di sini bisa ditambahkan logika untuk menghapus token atau sesi pengguna
      // Contoh: localStorage.removeItem("token");

      // Arahkan ke halaman utama
      router.push("/"); // Mengarahkan ke halaman utama
    };

    handleLogout(); // Panggil fungsi logout
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800">Sedang Logout...</h1>
    </div>
  );
}
