"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function BubblePopGame() {
  const [bubbles, setBubbles] = useState([]);
  const [targetLetter, setTargetLetter] = useState("A");
  const [score, setScore] = useState(0);

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const spawnBubble = () => {
    const id = Math.random();
    const letter = letters[Math.floor(Math.random() * letters.length)];
    const x = Math.random() * 80 + 10; // 10% to 90%
    setBubbles(prev => [...prev, { id, letter, x, y: 100 }]);
    
    // Remove bubble after 5 seconds if not popped
    setTimeout(() => {
      setBubbles(prev => prev.filter(b => b.id !== id));
    }, 5000);
  };

  useEffect(() => {
    const interval = setInterval(spawnBubble, 1500);
    setTargetLetter(letters[Math.floor(Math.random() * letters.length)]);
    return () => clearInterval(interval);
  }, []);

  const popBubble = (bubble) => {
    if (bubble.letter === targetLetter) {
      setScore(s => s + 1);
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { x: bubble.x / 100, y: 0.5 },
        colors: ["#74b9ff", "#55efc4"]
      });
      // New target letter every 5 correct pops
      if ((score + 1) % 5 === 0) {
        setTargetLetter(letters[Math.floor(Math.random() * letters.length)]);
      }
    }
    setBubbles(prev => prev.filter(b => b.id !== bubble.id));
  };

  return (
    <div className="relative w-full max-w-4xl h-[600px] bg-sky-gradient rounded-[3rem] shadow-2xl overflow-hidden border-8 border-white cursor-crosshair">
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 text-center">
        <h2 className="text-3xl font-black kids-font text-white drop-shadow-md">
          Pop the letter: <span className="text-5xl text-yellow-300 ml-2">{targetLetter}</span>
        </h2>
        <p className="text-white/80 font-bold mt-2">Score: {score}</p>
      </div>

      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            initial={{ y: 600, x: `${bubble.x}%`, opacity: 0 }}
            animate={{ y: -100, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{ duration: 6, ease: "linear" }}
            onClick={() => popBubble(bubble)}
            className="absolute w-20 h-20 rounded-full glass border-4 border-white/50 flex items-center justify-center text-3xl font-black text-gray-700 shadow-lg cursor-pointer hover:scale-110 active:scale-90"
            style={{ left: `${bubble.x}%` }}
          >
            <div className="absolute inset-0 bg-blue-400/20 rounded-full" />
            {bubble.letter}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
