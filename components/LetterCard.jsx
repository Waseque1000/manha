"use client";
import { motion } from "framer-motion";

export default function LetterCard({ item, onClick }) {
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: [0, -1, 1, 0] }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        speak(`${item.letter} for ${item.word}`);
        onClick(item);
      }}
      className={`relative cursor-pointer p-6 rounded-[2.5rem] ${item.color} ${item.shadow} shadow-xl border-4 border-white/40 flex flex-col items-center justify-center gap-2 group transition-all duration-300 h-48 w-full md:h-64`}
    >
      <span className="text-6xl md:text-8xl font-black text-white drop-shadow-lg kids-font group-hover:animate-bounce">
        {item.letter}
      </span>
      <div className="absolute top-2 right-4 text-4xl">
        {item.emoji}
      </div>
      <span className="text-xl md:text-2xl font-bold text-white/90 kids-font">
        {item.word}
      </span>
      
      <div className="absolute -bottom-2 right-2 bg-white p-2 rounded-full shadow-md text-primary opacity-0 group-hover:opacity-100 transition-opacity">
        🔊
      </div>
    </motion.div>
  );
}
