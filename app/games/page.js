"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FindObjectGame from "@/components/FindObjectGame";
import BubblePopGame from "@/components/BubblePopGame";
import { FaBullseye, FaSoap } from "react-icons/fa";

export default function GamesPage() {
  const [activeGame, setActiveGame] = useState("find"); // 'find' or 'bubble'

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-black kids-font text-primary mb-6">
          Fun Learning Games! 🎮
        </h1>
        
        <div className="flex gap-4 glass p-2 rounded-full shadow-lg">
          <button
            onClick={() => setActiveGame("find")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
              activeGame === "find" ? "bg-primary text-white shadow-md" : "hover:bg-gray-100 text-gray-500"
            }`}
          >
            <FaBullseye /> Find the Object
          </button>
          <button
            onClick={() => setActiveGame("bubble")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
              activeGame === "bubble" ? "bg-secondary text-white shadow-md" : "hover:bg-gray-100 text-gray-500"
            }`}
          >
            <FaSoap /> Bubble Pop
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeGame === "find" ? (
          <motion.div
            key="find"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="w-full flex justify-center"
          >
            <FindObjectGame />
          </motion.div>
        ) : (
          <motion.div
            key="bubble"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full flex justify-center"
          >
            <BubblePopGame />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
