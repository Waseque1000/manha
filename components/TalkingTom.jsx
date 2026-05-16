"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const TalkingTom = () => {
  const [isTalking, setIsTalking] = useState(false);
  const [message, setMessage] = useState("");
  const [showBubble, setShowBubble] = useState(false);

  const messages = [
    "Hi there! Ready to learn?",
    "Let's play some games!",
    "You're doing great!",
    "Can you find the letter A?",
    "Learning is so much fun!",
    "Tap me for a surprise!",
    "Meow! I love learning with you!",
    "You're a superstar! ⭐",
    "Ready for an adventure?",
    "What's your favorite letter?",
    "You're doing amazing!",
  ];

  const [purring, setPurring] = useState(false);

  const speak = () => {
    if (isTalking) return;
    
    setPurring(true);
    setTimeout(() => setPurring(false), 1000);
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setMessage(randomMessage);
    setShowBubble(true);
    setIsTalking(true);

    // Use Web Speech API if available
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(randomMessage);
      utterance.pitch = 1.5; // High pitch for a cat
      utterance.rate = 1.0;
      utterance.onend = () => {
        setIsTalking(false);
        setTimeout(() => setShowBubble(false), 2000);
      };
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => {
        setIsTalking(false);
        setTimeout(() => setShowBubble(false), 2000);
      }, 3000);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      speak();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex flex-col items-center">
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="absolute -top-32 z-20 bg-white p-6 rounded-[2rem] shadow-2xl border-4 border-primary max-w-[250px] ring-8 ring-white/50"
          >
            <p className="text-xl font-black text-primary leading-tight font-kids">
              {message}
            </p>
            {/* Speech bubble tail */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[15px] border-t-white"></div>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-t-[18px] border-t-primary -z-10"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.1, rotate: [0, -2, 2, 0] }}
        whileTap={{ scale: 0.9 }}
        onClick={speak}
        className="cursor-pointer relative group"
      >
        <motion.div
          animate={isTalking || purring ? {
            y: [0, -5, 0],
            scale: [1, 1.05, 1],
          } : {
            y: [0, -10, 0],
          }}
          transition={isTalking || purring ? {
            repeat: Infinity,
            duration: 0.3
          } : {
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut"
          }}
          className="relative w-64 h-64 md:w-96 md:h-96"
        >
          <Image
            src="/images/talking-tom.png"
            alt="Talking Tom"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </motion.div>
        
        {/* Glow effect when talking */}
        {isTalking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="absolute inset-0 bg-primary/20 rounded-full blur-3xl -z-10"
          />
        )}
      </motion.div>
    </div>
  );
};

export default TalkingTom;
