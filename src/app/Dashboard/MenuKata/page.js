"use client";
import React, { useState, useEffect } from "react";
import { FaLightbulb, FaBullhorn, FaHeart, FaSmile } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";

const icons = {
  "Self-Confidence": <FaLightbulb size={32} className="text-yellow-500" />,
  "Motivation and Productivity": (
    <FaBullhorn size={32} className="text-green-500" />
  ),
  "Self-Compassion": <FaHeart size={32} className="text-pink-500" />,
  "Self-Love": <FaSmile size={32} className="text-blue-500" />,
};

export default function MenuKata() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [notificationInterval, setNotificationInterval] = useState(1);
  const [affirmations, setAffirmations] = useState({});
  const [activeAffirmation, setActiveAffirmation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedInterval, setSelectedInterval] = useState(24); // default 1 hari

  const handleIntervalSelect = (hours) => {
    setNotificationInterval(hours); // Mengupdate interval notifikasi
    setSelectedInterval(hours); // Mengupdate state yang menandakan interval yang dipilih
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Mulai loading
      try {
        // Ambil affirmations
        const responseAffirmations = await axios.get(
          "https://be-psi.up.railway.app/api/affirmations"
        );

        const formattedData = {};
        responseAffirmations.data.forEach((item) => {
          const quotesArray = Array.isArray(item.quotes) ? item.quotes : [];
          formattedData[item.id] = {
            title: item.title,
            description: item.description,
            quotes: quotesArray,
            message: item.message,
          };
        });

        setAffirmations(formattedData);

        // Ambil activeAffirmation berdasarkan user ID
        const userID = Cookies.get("userID");
        const token = Cookies.get("token");

        const responseActiveAffirmation = await axios.get(
          `https://be-psi.up.railway.app/api/user-affirmations?user_id=${userID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (responseActiveAffirmation.data.length > 0) {
          setActiveAffirmation(responseActiveAffirmation.data[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Hentikan loading setelah semua data berhasil dimuat
      }
    };

    fetchData();
  }, []);

  const openModal = (topic) => {
    setSelectedTopic(topic);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleIntervalChange = (e) => {
    setNotificationInterval(e.target.value);
  };

  const sendMessage = async () => {
    if (!selectedTopic || !affirmations[selectedTopic]) {
      alert("Pilih afirmasi yang valid.");
      return;
    }

    try {
      const affirmationID = selectedTopic; // Ambil ID afirmasi dari selectedTopic
      const userID = Cookies.get("userID");
      const token = Cookies.get("token");

      const response = await axios.post(
        "https://be-psi.up.railway.app/api/user-affirmations",
        {
          user_id: userID,
          affirmation_id: affirmationID,
          notification_interval: notificationInterval * 60 - 1,
          created_at: new Date().toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`Pesan: ${affirmations[selectedTopic].message}`);
      console.log("Response dari server:", response.data);
      setActiveAffirmation(response.data);
      closeModal();

      // Reload halaman setelah menyimpan
      window.location.reload(); // Tambahkan ini untuk refresh halaman
    } catch (error) {
      console.error("Error mengisi tabel user_affirmations:", error);
      alert("Terjadi kesalahan saat mengirim data. Silakan coba lagi.");
    }
  };

  const cancelAffirmation = async () => {
    try {
      const userID = Cookies.get("userID");
      const response = await axios.delete(
        `https://be-psi.up.railway.app/api/user-affirmations/${activeAffirmation.id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      alert("Afirmasi dibatalkan.");
      setActiveAffirmation(null); // Reset active affirmation
      closeModal(); // Tutup modal setelah pembatalan
    } catch (error) {
      console.error("Error cancelling affirmation:", error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {activeAffirmation && (
        <div className="mb-6 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
          <h3 className="text-lg font-semibold">Afirmasi Aktif:</h3>
          {affirmations[activeAffirmation.affirmation_id] ? (
            <div>
              <h4 className="font-bold">
                {affirmations[activeAffirmation.affirmation_id].title}
              </h4>
              <p>
                {affirmations[activeAffirmation.affirmation_id].description}
              </p>
            </div>
          ) : (
            <p>Afirmasi tidak ditemukan.</p>
          )}
          <button
            onClick={cancelAffirmation}
            className="mt-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
          >
            Batalkan Afirmasi
          </button>
        </div>
      )}
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Pilih Jenis Afirmasi Yang Akan Diterapkan
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.keys(affirmations).map((id) => (
          <div
            key={id}
            className={`p-6 bg-white border border-gray-200 rounded-lg shadow-lg transition-transform transform ${
              activeAffirmation && activeAffirmation.affirmation_id === id
                ? "cursor-default opacity-50"
                : "cursor-pointer hover:bg-yellow-100"
            }`}
            onClick={() => (activeAffirmation ? null : openModal(id))}
          >
            <div className="mb-3">{icons[affirmations[id].title]}</div>
            <h3 className="text-lg font-semibold text-gray-800 text-center">
              {affirmations[id].title}
            </h3>
            <p className="text-gray-600 text-center mt-2">
              {`Afirmasi untuk ${affirmations[
                id
              ].title.toLowerCase()}. Temukan inspirasi dan semangat!`}
            </p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/2 max-h-[65vh] overflow-y-auto">
            <div className="flex items-center mb-4">
              {icons[selectedTopic]}
              <h3 className="text-xl font-bold ml-2 text-gray-800">
                {selectedTopic}
              </h3>
            </div>
            <p className="mb-4 text-gray-600">
              {affirmations[selectedTopic].description}
            </p>

            <div className="mb-4">
              <label className="block mb-2 text-gray-700">
                Pilih interval notifikasi:
              </label>
              <div className="flex space-x-4 mb-2">
                <button
                  onClick={() => handleIntervalSelect(24)}
                  className={`py-2 px-4 rounded-md ${
                    selectedInterval === 24
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } hover:bg-yellow-400 transition duration-200`}
                >
                  1 Hari
                </button>
                <button
                  onClick={() => handleIntervalSelect(72)}
                  className={`py-2 px-4 rounded-md ${
                    selectedInterval === 72
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } hover:bg-yellow-400 transition duration-200`}
                >
                  3 Hari
                </button>
                <button
                  onClick={() => handleIntervalSelect(168)}
                  className={`py-2 px-4 rounded-md ${
                    selectedInterval === 168
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } hover:bg-yellow-400 transition duration-200`}
                >
                  1 Minggu
                </button>
              </div>
              <label className="block mb-2 text-gray-700">
                Atur notifikasi setiap (jam):
              </label>
              <input
                type="number"
                min="1"
                value={notificationInterval}
                onChange={handleIntervalChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <p className="text-gray-700 mb-4">
              {affirmations[selectedTopic].message}
            </p>
            <div className="flex justify-between">
              <button
                onClick={sendMessage}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
              >
                Kirim Afirmasi
              </button>
              <button
                onClick={closeModal}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
