"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaVolumeUp, FaRedo, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import confetti from "canvas-confetti";

export default function LetterModal({ item, onClose, onNext, onPrev }) {
  if (!item) return null;

  const speak = () => {
    const isBangla = /[\u0980-\u09FF]/.test(item.letter);
    // Standard educational format: "O, Ajogor"
    const text = isBangla ? `${item.letter}, ${item.word}` : `${item.letter}, for ${item.word}`;
    
    // Cancel any existing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.6;
    
    if (isBangla) {
      utterance.lang = "bn-BD";
      const voices = window.speechSynthesis.getVoices();
      const bnVoice = voices.find(v => v.lang.startsWith("bn")) || 
                      voices.find(v => v.name.toLowerCase().includes("bangla"));
      if (bnVoice) utterance.voice = bnVoice;
    } else {
      utterance.lang = "en-US";
    }
    
    window.speechSynthesis.speak(utterance);
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff7675", "#74b9ff", "#55efc4", "#ffeaa7"]
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.5, opacity: 0, rotate: 10 }}
          className={`relative w-full max-w-lg bg-white rounded-[3rem] p-8 shadow-2xl border-8 border-white overflow-hidden`}
        >
          {/* Decorative Background */}
          <div className={`absolute inset-0 opacity-10 ${item.color}`} />
          
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-20"
          >
            <FaTimes size={24} />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white/80 hover:bg-white text-gray-700 rounded-full shadow-lg z-20 transition-all hover:scale-110 active:scale-95"
          >
            <FaChevronLeft size={30} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/80 hover:bg-white text-gray-700 rounded-full shadow-lg z-20 transition-all hover:scale-110 active:scale-95"
          >
            <FaChevronRight size={30} />
          </button>

          <div className="relative z-10 flex flex-col items-center text-center gap-4 md:gap-6 px-4 md:px-12">
            <motion.span
              key={item.letter}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1, scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] }}
              transition={{ 
                opacity: { duration: 0.2 },
                y: { duration: 0.3 },
                scale: { repeat: Infinity, duration: 2 },
                rotate: { repeat: Infinity, duration: 2 }
              }}
              className={`text-8xl md:text-[12rem] font-black kids-font ${item.color.replace('bg-', 'text-')} drop-shadow-xl`}
            >
              {item.letter}
            </motion.span>
            
            <div className="flex flex-col items-center gap-2">
              <span className="text-4xl md:text-7xl mb-2 md:mb-4">{item.emoji}</span>
              <h2 className="text-3xl md:text-6xl font-bold kids-font text-gray-800">
                {item.word}
              </h2>
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={speak}
                className={`flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-xl shadow-lg transition-transform hover:scale-110 active:scale-95 ${item.color}`}
              >
                <FaVolumeUp /> Hear it!
              </button>
              <button
                onClick={speak}
                className="p-4 bg-gray-100 hover:bg-gray-200 rounded-full transition-all"
              >
                <FaRedo className="text-gray-600" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
