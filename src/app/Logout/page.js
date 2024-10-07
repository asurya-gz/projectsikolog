"use client"; // Jika menggunakan client-side routing
import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter untuk navigasi
import Cookies from "js-cookie"; // Import js-cookie untuk manajemen cookie

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    // Fungsi untuk logout
    const handleLogout = () => {
      // Menghapus token dari cookie
      Cookies.remove("token");

      // Arahkan ke halaman utama setelah logout
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
