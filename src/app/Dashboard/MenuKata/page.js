"use client";
import React, { useState } from "react";
import { FaLightbulb, FaBullhorn, FaHeart, FaSmile } from "react-icons/fa";

const affirmations = {
  "Self-Confidence": {
    quotes: [
      "Kamu lebih hebat dari yang kamu pikirkan!",
      "Nggak perlu jadi orang lain, kamu udah keren kok! 😎",
      "Berhentilah meragukan diri sendiri. Mulailah dan wujudkan mimpimu!",
      "You were born to shine🌟",
      "Jangan bandingin diri sama orang lain, kamu unik dan spesial! 💖",
    ],
    description:
      "Afirmasi untuk membangkitkan rasa percaya diri dan keberanian.",
    message: "Ingat, kamu layak untuk meraih semua impianmu.",
  },
  "Motivation and Productivity": {
    quotes: [
      "Selalu ada peluang untuk jadi lebih baik, let’s make it happen! 🌟",
      "Hasil besar datang dari kebiasaan kecil yang baik. Just do it!",
      "Kerja kerasmu hari ini adalah kesuksesanmu esok.",
      "Setiap langkah kecil membawa perubahan. Kamu hanya perlu memulainya!",
      "Nggak ada yang instan, tapi kamu pasti bisa kalau berusaha! 💪✨️",
      "Setiap rintangan itu kesempatan buat jadi lebih kuat. Tetap semangat‼ 💥",
    ],
    description: "Afirmasi untuk meningkatkan motivasi dan produktivitas.",
    message: "Kamu punya potensi yang luar biasa!",
  },
  "Self-Compassion": {
    quotes: [
      "Setiap orang punya struggle, termasuk kamu. Treat yourself kindly. 🤗💛",
      "It’s okay to feel down sometimes, jangan lupa beri dirimu ruang buat istirahat. 💖😌",
      "Jangan terlalu keras sama diri sendiri, you did very well! 🌸✨️",
      "Nggak masalah kalau nggak sempurna, yang penting kamu udah mencoba. 🌻💛",
      "Mulai dengan memaafkan diri sendiri, kamu layak untuk damai dan bahagia. 🌿💕",
    ],
    description:
      "Afirmasi untuk meningkatkan rasa kasih sayang terhadap diri sendiri.",
    message: "Berikan dirimu cinta dan pengertian.",
  },
  "Self-Love": {
    quotes: [
      "Your value doesn’t depend on others, kamu cukup apa adanya.",
      "Kamu layak dapet semua cinta dan kebahagiaan di dunia ini, termasuk dari dirimu sendiri.",
      "Kamu berhak bahagia, dan itu bisa dimulai dari cinta ke diri sendiri.",
      "Kamu berharga, nggak semua perlu validasi dari orang lain.",
      "Luangkan waktu buat diri sendiri untuk recharge energimu. You deserve it!",
      "Saat kamu mencintai dirimu sendiri, kamu mengajarkan dunia bagaimana cara mencintaimu.",
      "Aku adalah sumber kekuatan dan cahaya dalam hidupku sendiri.",
    ],
    description: "Afirmasi untuk mencintai diri sendiri dan menghargai diri.",
    message: "Kamu adalah yang terpenting dalam hidupmu!",
  },
};

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
  const [notificationInterval, setNotificationInterval] = useState(1); // Default interval 1 jam

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

  const sendMessage = () => {
    alert(`Pesan: ${affirmations[selectedTopic].message}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Pilih Jenis Afirmasi Yang Akan Diterapkan
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.keys(affirmations).map((topic) => (
          <div
            key={topic}
            className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg cursor-pointer hover:bg-yellow-100 transition-transform transform hover:scale-105 flex flex-col items-center"
            onClick={() => openModal(topic)}
          >
            <div className="mb-3">{icons[topic]}</div>
            <h3 className="text-lg font-semibold text-gray-800 text-center">
              {topic}
            </h3>
            <p className="text-gray-600 text-center mt-2">
              {`Afirmasi untuk ${topic.toLowerCase()}. Temukan inspirasi dan semangat!`}
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/2">
            <div className="flex items-center mb-4">
              {icons[selectedTopic]}
              <h3 className="text-xl font-bold ml-2 text-gray-800">
                {selectedTopic}
              </h3>
            </div>
            <p className="mb-4 text-gray-600">
              {affirmations[selectedTopic].description}
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              {affirmations[selectedTopic].quotes.map((quote, index) => (
                <li key={index} className="text-gray-700">
                  {quote}
                </li>
              ))}
            </ul>
            <div className="mb-4">
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
            <button
              onClick={closeModal}
              className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-200 mr-2"
            >
              Tutup
            </button>
            <button
              onClick={sendMessage}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
            >
              Pilih Afirmasi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
