"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaBars, FaUser, FaSignOutAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";
import MenuKata from "./MenuKata/page";
import Cookies from "js-cookie";
import axios from "axios"; // Import axios
import { useFirebaseMessaging } from "../firebase/firebase";

export default function Dashboard() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useFirebaseMessaging(); // Memanggil hook FCM

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/Login");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-yellow-400">
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
          <h1 className="text-xl font-bold text-white">KataKitaMah!</h1>
        </div>
        <div className="hidden md:flex items-center space-x-6 mx-4">
          <Link href="/Profile">
            <button className="text-gray-700 hover:text-gray-900 text-base">
              <FaUser className="inline" /> <span>Profile</span>
            </button>
          </Link>
          <Link href="/Logout">
            <button className="text-gray-700 hover:text-gray-900 text-base">
              <FaSignOutAlt className="inline" /> <span>Logout</span>
            </button>
          </Link>
        </div>
        <button
          onClick={toggleSidebar}
          className="md:hidden text-gray-700 hover:text-gray-900"
        >
          <FaBars size={24} />
        </button>
      </header>

      {/* Sidebar untuk tampilan seluler */}
      <div
        className={`fixed inset-0 z-40 bg-yellow-400 bg-opacity-75 md:hidden transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between p-4 bg-yellow-400">
            <h2 className="text-lg font-semibold text-white">Menu</h2>
            <button
              onClick={toggleSidebar}
              className="text-white hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>
          <ul className="mt-4 space-y-3 px-4">
            <li>
              <Link href="/Profile">
                <button className="flex items-center space-x-3 w-full text-left text-gray-800 hover:text-gray-900 p-2 rounded-md hover:bg-yellow-100">
                  <FaUser />
                  <span className="flex-grow text-center text-lg">Profile</span>
                </button>
              </Link>
            </li>
            <li>
              <hr className="border-gray-600" />
            </li>
            <li>
              <Link href="/Logout">
                <button className="flex items-center space-x-3 w-full text-left text-gray-800 hover:text-gray-900 p-2 rounded-md hover:bg-yellow-100">
                  <FaSignOutAlt />
                  <span className="flex-grow text-center text-lg">Logout</span>
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Konten Dashboard */}
      <main className="flex-grow p-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Selamat datang di Dashboard
        </h2>
        <p className="text-gray-800 mt-2">
          Ini adalah tempat Anda bisa mengelola afirmasi Anda dengan mudah.
        </p>
        <div className="mt-4">
          <MenuKata />
        </div>
      </main>
    </div>
  );
}
