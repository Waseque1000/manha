"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import NumberGame from "@/components/NumberGame";
import { FaGraduationCap, FaGamepad, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function NumbersPage() {
  const [view, setView] = useState("game"); // 'learn' or 'game'
  const [currentPage, setCurrentPage] = useState(0); // For pagination of 1-100
  const numbersPerPage = 20;

  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);
  const currentNumbers = numbers.slice(currentPage * numbersPerPage, (currentPage + 1) * numbersPerPage);

  const speak = (num) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(num.toString());
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 pb-32">
      <div className="text-center mb-12">
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-6xl md:text-8xl font-black kids-font text-primary mb-8 drop-shadow-lg"
        >
          {view === "game" ? "Number Fun! 🔢" : "Learn 1 to 100! 📚"}
        </motion.h1>

        {/* View Toggle */}
        <div className="flex justify-center gap-6 mb-12">
          <button
            onClick={() => setView("game")}
            className={`flex items-center gap-3 px-8 py-4 rounded-full font-black text-xl transition-all shadow-xl ${
              view === "game" ? "bg-primary text-white scale-110" : "bg-white text-gray-400 hover:bg-gray-50"
            }`}
          >
            <FaGamepad /> Play Game
          </button>
          <button
            onClick={() => setView("learn")}
            className={`flex items-center gap-3 px-8 py-4 rounded-full font-black text-xl transition-all shadow-xl ${
              view === "learn" ? "bg-secondary text-white scale-110" : "bg-white text-gray-400 hover:bg-gray-50"
            }`}
          >
            <FaGraduationCap /> Learn Numbers
          </button>
        </div>
      </div>

      {view === "game" ? (
        <NumberGame />
      ) : (
        <div className="flex flex-col items-center gap-12">
          {/* Numbers Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full max-w-5xl">
            {currentNumbers.map((num) => (
              <motion.div
                key={num}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => speak(num)}
                className="bg-white p-8 rounded-[2.5rem] shadow-xl border-4 border-secondary/10 flex flex-col items-center justify-center gap-2 cursor-pointer group hover:border-secondary transition-all"
              >
                <span className="text-5xl md:text-6xl font-black text-secondary group-hover:animate-bounce kids-font">
                  {num}
                </span>
                <div className="text-gray-300 text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Tap to hear
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center gap-8">
            <button
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(p => p - 1)}
              className={`p-6 rounded-full shadow-lg transition-all ${
                currentPage === 0 ? "bg-gray-100 text-gray-300" : "bg-white text-secondary hover:scale-110 active:scale-95"
              }`}
            >
              <FaChevronLeft size={30} />
            </button>
            
            <span className="text-3xl font-black kids-font text-gray-500">
              Page {currentPage + 1} of {Math.ceil(numbers.length / numbersPerPage)}
            </span>

            <button
              disabled={(currentPage + 1) * numbersPerPage >= numbers.length}
              onClick={() => setCurrentPage(p => p + 1)}
              className={`p-6 rounded-full shadow-lg transition-all ${
                (currentPage + 1) * numbersPerPage >= numbers.length ? "bg-gray-100 text-gray-300" : "bg-white text-secondary hover:scale-110 active:scale-95"
              }`}
            >
              <FaChevronRight size={30} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
