"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { alphabetData } from "@/data/alphabet";
import LetterCard from "@/components/LetterCard";
import LetterModal from "@/components/LetterModal";

export default function LearnPage() {
  const [selectedLetter, setSelectedLetter] = useState(null);

  const handleNext = () => {
    if (!selectedLetter) return;
    const currentIndex = alphabetData.findIndex(a => a.letter === selectedLetter.letter);
    const nextIndex = (currentIndex + 1) % alphabetData.length;
    setSelectedLetter(alphabetData[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedLetter) return;
    const currentIndex = alphabetData.findIndex(a => a.letter === selectedLetter.letter);
    const prevIndex = (currentIndex - 1 + alphabetData.length) % alphabetData.length;
    setSelectedLetter(alphabetData[prevIndex]);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-5xl md:text-7xl font-black kids-font text-secondary mb-4"
        >
          Explore the Alphabet! 🎨
        </motion.h1>
        <p className="text-xl md:text-2xl text-gray-500 font-medium">
          Click on a card to hear the sound and see it bigger!
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
        {alphabetData.map((item, index) => (
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
