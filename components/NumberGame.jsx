"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { FaSyncAlt, FaStar, FaVolumeUp, FaHashtag } from "react-icons/fa";

export default function NumberGame() {
  const [targetNumber, setTargetNumber] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [streak, setStreak] = useState(0);

  const startNewRound = () => {
    // Generate a random number between 1 and 100
    const target = Math.floor(Math.random() * 100) + 1;
    setTargetNumber(target);

    // Generate 2 other random numbers for options
    let wrongOptions = [];
    while (wrongOptions.length < 2) {
      const r = Math.floor(Math.random() * 100) + 1;
      if (r !== target && !wrongOptions.includes(r)) {
        wrongOptions.push(r);
      }
    }

    // Shuffle options
    const allOptions = [target, ...wrongOptions].sort(() => 0.5 - Math.random());
    setOptions(allOptions);
    setMessage("");
    
    // Voice prompt
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`Find the number ${target}`);
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    startNewRound();
  }, []);

  const handleChoice = (num) => {
    if (num === targetNumber) {
      setScore(s => s + 10);
      setStreak(s => s + 1);
      setMessage("Perfect! 🌟");
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      const utterance = new SpeechSynthesisUtterance(`Yes! That is number ${num}`);
      window.speechSynthesis.speak(utterance);

      setTimeout(startNewRound, 2000);
    } else {
      setStreak(0);
      setMessage("Try again! 😊");
      const utterance = new SpeechSynthesisUtterance(`That is ${num}. Look for ${targetNumber}!`);
      window.speechSynthesis.speak(utterance);
    }
  };

  if (targetNumber === null) return null;

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4">
      {/* Header Info */}
      <div className="flex items-center justify-center gap-6 mb-10">
        <div className="glass px-8 py-4 rounded-full flex items-center gap-3 shadow-xl">
          <FaStar className="text-yellow-400 animate-pulse" size={28} />
          <span className="text-3xl font-black kids-font text-gray-700">{score}</span>
        </div>
        {streak > 1 && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-orange-500 text-white px-8 py-4 rounded-full shadow-xl font-black text-2xl kids-font"
          >
             {streak} Streak! 🔥
          </motion.div>
        )}
      </div>

      {/* Game Card */}
      <motion.div
        key={targetNumber}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl border-4 md:border-8 border-secondary/20 flex flex-col items-center gap-6 md:gap-10 w-full relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-secondary/10" />
        
        <div className="text-center">
          <p className="text-xl md:text-3xl font-bold text-gray-400 kids-font mb-2 md:mb-4 uppercase tracking-widest">Can you find...</p>
          <h2 className="text-6xl md:text-[12rem] font-black text-secondary drop-shadow-xl kids-font leading-none">
            {targetNumber}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 w-full mt-4">
          {options.map((option) => (
            <motion.button
              key={option}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleChoice(option)}
              className="group relative h-28 md:h-40 bg-gray-50 hover:bg-secondary rounded-2xl md:rounded-[3rem] shadow-lg border-2 md:border-4 border-gray-100 hover:border-white transition-all flex items-center justify-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-4xl md:text-6xl font-black text-gray-700 group-hover:text-white transition-colors kids-font">
                {option}
              </span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className={`text-4xl md:text-6xl font-black kids-font mt-4 ${
                message.includes("Perfect") ? "text-accent" : "text-red-400"
              }`}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Footer Controls */}
      <div className="mt-12 flex gap-4">
        <button
          onClick={startNewRound}
          className="flex items-center gap-3 px-10 py-5 bg-gray-800 text-white rounded-full font-black text-xl shadow-xl hover:scale-110 transition-transform active:scale-95"
        >
          <FaSyncAlt /> New Number
        </button>
      </div>
    </div>
  );
}
