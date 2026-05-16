"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { alphabetData } from "@/data/alphabet";
import { banglaAlphabetData } from "@/data/bangla";
import LetterCard from "@/components/LetterCard";
import LetterModal from "@/components/LetterModal";

export default function LearnPage() {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [activeLanguage, setActiveLanguage] = useState("english"); // "english" or "bangla"

  const currentData = activeLanguage === "english" ? alphabetData : banglaAlphabetData;

  const handleNext = () => {
    if (!selectedLetter) return;
    const currentIndex = currentData.findIndex(a => a.letter === selectedLetter.letter);
    const nextIndex = (currentIndex + 1) % currentData.length;
    setSelectedLetter(currentData[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedLetter) return;
    const currentIndex = currentData.findIndex(a => a.letter === selectedLetter.letter);
    const prevIndex = (currentIndex - 1 + currentData.length) % currentData.length;
    setSelectedLetter(currentData[prevIndex]);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-5xl md:text-7xl font-black kids-font text-secondary mb-8"
        >
          {activeLanguage === "english" ? "Explore the Alphabet! 🎨" : "বর্ণমালা শিখি! 🎨"}
        </motion.h1>
        
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveLanguage("english")}
            className={`px-8 py-4 rounded-full font-bold transition-all shadow-md ${
              activeLanguage === "english" ? "bg-primary text-white scale-110" : "bg-white text-gray-400 hover:bg-gray-100"
            }`}
          >
            English (A-Z)
          </button>
          <button
            onClick={() => setActiveLanguage("bangla")}
            className={`px-8 py-4 rounded-full font-bold transition-all shadow-md ${
              activeLanguage === "bangla" ? "bg-accent text-white scale-110" : "bg-white text-gray-400 hover:bg-gray-100"
            }`}
          >
            বাংলা (অ-ক)
          </button>
        </div>

        <p className="text-xl md:text-2xl text-gray-500 font-medium">
          {activeLanguage === "english" 
            ? "Click on a card to hear the sound and see it bigger!" 
            : "কার্ডে ক্লিক করে উচ্চারণ শোনো এবং বড় করে দেখো!"}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
        {currentData.map((item, index) => (
          <motion.div
            key={item.letter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <LetterCard item={item} onClick={setSelectedLetter} />
          </motion.div>
        ))}
      </div>

      <LetterModal
        item={selectedLetter}
        onClose={() => setSelectedLetter(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
}
