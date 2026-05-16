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
          className={`relative w-full max-w-2xl bg-white rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-12 shadow-2xl border-4 md:border-8 border-white overflow-hidden`}
        >
          {/* Decorative Background */}
          <div className={`absolute inset-0 opacity-10 ${item.color}`} />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 md:p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-20"
          >
            <FaTimes size={20} className="md:w-6 md:h-6" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-4 bg-white/80 hover:bg-white text-gray-700 rounded-full shadow-lg z-20 transition-all hover:scale-110 active:scale-95"
          >
            <FaChevronLeft size={24} className="md:w-8 md:h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-4 bg-white/80 hover:bg-white text-gray-700 rounded-full shadow-lg z-20 transition-all hover:scale-110 active:scale-95"
          >
            <FaChevronRight size={24} className="md:w-8 md:h-8" />
          </button>

          <div className="relative z-10 flex flex-col items-center text-center gap-4 md:gap-6 px-4 md:px-12">
            <motion.span
              key={item.letter}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className={`text-6xl md:text-8xl font-black kids-font ${item.color.replace('bg-', 'text-')} drop-shadow-lg opacity-80`}
            >
              {item.letter}
            </motion.span>
            
            <div className="flex flex-col items-center gap-6">
              <motion.span 
                key={`${item.letter}-emoji`}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  scale: { type: "spring", stiffness: 260, damping: 20 },
                  y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                  rotate: { repeat: Infinity, duration: 5, ease: "easeInOut" }
                }}
                className="text-[10rem] md:text-[15rem] drop-shadow-2xl leading-none"
              >
                {item.emoji}
              </motion.span>
              <h2 className="text-5xl md:text-8xl font-black kids-font text-gray-800 tracking-tight drop-shadow-sm">
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
