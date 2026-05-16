"use client";
import { motion } from "framer-motion";
import { FaCheckCircle, FaStar, FaClock, FaHeart, FaTrophy } from "react-icons/fa";
import { alphabetData } from "@/data/alphabet";

export default function ProgressPage() {
  // Mock data for progress
  const learnedLetters = ["A", "B", "C", "D", "E", "S", "M"];
  const favorites = ["A", "S", "M"];
  const timeSpent = "45 Minutes";
  const totalStars = 1250;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-black kids-font text-fun-purple mb-4">
          Parent Dashboard 👨‍👩‍👧
        </h1>
        <p className="text-xl text-gray-500 font-medium">Track your little learner's progress!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {[
          { label: "Letters Mastered", value: learnedLetters.length, icon: <FaCheckCircle />, color: "bg-accent" },
          { label: "Total Stars", value: totalStars, icon: <FaStar />, color: "bg-yellow-400" },
          { label: "Time Learning", value: timeSpent, icon: <FaClock />, color: "bg-secondary" },
          { label: "Badges Won", value: 5, icon: <FaTrophy />, color: "bg-primary" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-8 rounded-[2.5rem] flex flex-col items-center gap-4 shadow-xl border-4 border-white"
          >
            <div className={`${stat.color} p-5 rounded-3xl text-white text-3xl shadow-lg`}>
              {stat.icon}
            </div>
            <span className="text-4xl font-black kids-font text-gray-800">{stat.value}</span>
            <span className="text-gray-500 font-bold uppercase tracking-wider text-sm">{stat.label}</span>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Alphabet Tracker */}
        <div className="glass p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl border-4 md:border-8 border-white">
          <h2 className="text-2xl md:text-3xl font-black kids-font text-gray-800 mb-6 md:mb-8 flex items-center gap-3">
            <FaCheckCircle className="text-accent" /> Alphabet Mastery
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-2 md:gap-3">
            {alphabetData.map((item) => {
              const isLearned = learnedLetters.includes(item.letter);
              return (
                <div
                  key={item.letter}
                  className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center font-black text-lg md:text-xl transition-all ${
                    isLearned 
                    ? "bg-accent text-white shadow-lg scale-110" 
                    : "bg-gray-100 text-gray-300"
                  }`}
                >
                  {item.letter}
                </div>
              );
            })}
          </div>
        </div>

        {/* Favorite Letters */}
        <div className="glass p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl border-4 md:border-8 border-white">
          <h2 className="text-2xl md:text-3xl font-black kids-font text-gray-800 mb-6 md:mb-8 flex items-center gap-3">
            <FaHeart className="text-primary" /> Favorite Words
          </h2>
          <div className="space-y-4 md:space-y-6">
            {favorites.map((l) => {
              const item = alphabetData.find(a => a.letter === l);
              return (
                <motion.div
                  key={l}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 md:gap-6 p-4 bg-white rounded-2xl md:rounded-3xl shadow-sm border-2 border-gray-50"
                >
                  <span className="text-4xl md:text-5xl">{item.emoji}</span>
                  <div className="flex flex-col">
                    <span className="text-xl md:text-2xl font-black kids-font text-gray-800">{item.word}</span>
                    <span className="text-xs md:text-sm text-gray-400 font-bold">Mastered on May 15</span>
                  </div>
                  <div className="ml-auto flex text-yellow-400">
                    <FaStar /><FaStar /><FaStar />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
