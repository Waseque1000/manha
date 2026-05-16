"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { alphabetData } from "@/data/alphabet";
import confetti from "canvas-confetti";
import { FaSyncAlt, FaStar, FaVolumeUp } from "react-icons/fa";

export default function FindObjectGame() {
  const [target, setTarget] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [streak, setStreak] = useState(0);

  const startNewRound = () => {
    const randomItems = [...alphabetData].sort(() => 0.5 - Math.random()).slice(0, 3);
    const chosen = randomItems[Math.floor(Math.random() * randomItems.length)];
    setTarget(chosen);
    setOptions(randomItems.sort(() => 0.5 - Math.random()));
    setMessage("");
    
    const utterance = new SpeechSynthesisUtterance(`Find the ${chosen.word}`);
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    startNewRound();
  }, []);

  const handleChoice = (item) => {
    if (item.letter === target.letter) {
      setScore(s => s + 10);
      setStreak(s => s + 1);
      setMessage("Great Job! 🎉");
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
      setTimeout(startNewRound, 2000);
    } else {
      setStreak(0);
      setMessage("Try Again! 😊");
      const utterance = new SpeechSynthesisUtterance(`That is a ${item.word}. Try again!`);
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!target) return null;

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-center justify-center gap-8 mb-8">
        <div className="glass px-6 py-3 rounded-full flex items-center gap-2 shadow-md">
          <FaStar className="text-yellow-400" size={24} />
          <span className="text-2xl font-bold kids-font text-gray-700">{score} Stars</span>
        </div>
        {streak > 1 && (
          <div className="bg-orange-400 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-md animate-bounce">
            <span className="text-2xl font-bold kids-font">{streak} Streak! 🔥</span>
          </div>
        )}
      </div>

      <motion.div
        key={target.letter}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-2xl flex flex-col items-center gap-6 md:gap-8 mb-8 md:mb-12 border-4 md:border-8 border-white w-full max-w-3xl"
      >
        <span className="text-2xl md:text-4xl font-bold text-gray-600 kids-font">
          Can you find the...
        </span>
        <div className="flex flex-col items-center">
          <span className="text-5xl md:text-9xl font-black text-primary kids-font mb-2 md:mb-4">
            {target.word}?
          </span>
          <button 
            onClick={() => {
              const u = new SpeechSynthesisUtterance(target.word);
              window.speechSynthesis.speak(u);
            }}
            className="p-4 bg-gray-100 hover:bg-gray-200 rounded-full text-primary transition-all flex items-center gap-2 font-bold"
          >
            <FaVolumeUp /> Listen
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {options.map((option) => (
            <motion.button
              key={option.letter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleChoice(option)}
              className={`p-8 rounded-[2rem] bg-white shadow-xl border-4 border-gray-100 flex flex-col items-center gap-4 transition-all hover:border-primary group`}
            >
              <span className="text-7xl group-hover:animate-bounce">{option.emoji}</span>
              <span className="text-2xl font-bold kids-font text-gray-700">{option.letter}</span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className={`text-4xl md:text-5xl font-black kids-font mt-8 ${
                message.includes("Great") ? "text-accent" : "text-red-400"
              }`}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <button
        onClick={startNewRound}
        className="flex items-center gap-3 px-8 py-4 bg-secondary text-white rounded-full font-bold text-xl shadow-lg hover:scale-110 transition-transform"
      >
        <FaSyncAlt /> New Word
      </button>
    </div>
  );
}
