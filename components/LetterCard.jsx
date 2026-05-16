"use client";
import { motion } from "framer-motion";

export default function LetterCard({ item, onClick }) {
  const speak = (letter, word) => {
    const isBangla = /[\u0980-\u09FF]/.test(letter);
    // Adding a comma for a slight pause: "অ, অজগর" or "A, Apple"
    const text = isBangla ? `${letter}, ${word}` : `${letter}, for ${word}`;
    const utterance = new SpeechSynthesisUtterance(text);
    
    utterance.rate = 0.6; // Slightly slower for clarity
    
    if (isBangla) {
      utterance.lang = "bn-BD";
      const voices = window.speechSynthesis.getVoices();
      // Look for Google Bangla or local Bangla voices
      const bnVoice = voices.find(v => v.lang.startsWith("bn")) || 
                      voices.find(v => v.name.toLowerCase().includes("bangla"));
      if (bnVoice) utterance.voice = bnVoice;
    } else {
      utterance.lang = "en-US";
    }
    
    // Stop any current speech before starting new
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: [0, -1, 1, 0] }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        speak(item.letter, item.word);
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
