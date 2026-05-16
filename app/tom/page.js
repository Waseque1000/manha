"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrophone, FaStop } from 'react-icons/fa';

export default function TomPage() {
  const [isListening, setIsListening] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [tomMessage, setTomMessage] = useState("Hi! I'm Tom. Say something and I'll repeat it!");
  const [showBubble, setShowBubble] = useState(true);
  const [isSupported, setIsSupported] = useState(true);
  
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setIsListening(false);
        repeatAsTom(text);
      };

      recognitionRef.current.onend = () => setIsListening(false);
      recognitionRef.current.onerror = () => setIsListening(false);
    } else {
      setIsSupported(false);
    }
  }, []);

  const startListening = () => {
    if (isTalking) return;
    setTomMessage("Listening...");
    setIsListening(true);
    recognitionRef.current?.start();
  };

  const repeatAsTom = (text) => {
    setTomMessage(text);
    setIsTalking(true);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 2.2; // High pitched Tom voice
      utterance.rate = 1.1;
      
      utterance.onend = () => {
        setIsTalking(false);
        setTimeout(() => {
          if (!isTalking && !isListening) {
             setTomMessage("Say something else!");
          }
        }, 3000);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsTalking(false), 2000);
    }
  };

  return (
    <div className="h-screen bg-white flex flex-col items-center justify-center p-4 pb-32 overflow-hidden">
      <div className="relative w-full max-w-2xl flex flex-col items-center">
        
        <AnimatePresence>
          {showBubble && (
            <motion.div
              key={tomMessage}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              className="absolute -top-36 md:-top-44 z-20 bg-white p-6 md:p-8 rounded-[2.5rem] shadow-2xl border-4 border-gray-200 max-w-[300px] md:max-w-[450px] text-center"
            >
              <p className="text-2xl md:text-3xl font-black text-gray-800 leading-tight kids-font">
                {tomMessage}
              </p>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[15px] border-t-white"></div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={isTalking ? {
            y: [0, -15, 0],
            scale: [1, 1.1, 1],
          } : isListening ? {
            rotate: [0, -2, 2, 0],
          } : {
            y: [0, -8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: isTalking ? 0.15 : 2,
            ease: "easeInOut"
          }}
          className="relative w-72 h-72 md:w-[600px] md:h-[600px] cursor-pointer mb-20 md:mb-0"
          onClick={isListening ? () => recognitionRef.current?.stop() : startListening}
        >
          {/* Action Button: Absolute on Desktop, Relative on Mobile */}
          <div className="absolute md:-left-40 top-[110%] md:top-1/2 left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2 z-30">
            {!isListening ? (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); startListening(); }}
                className="flex items-center gap-4 px-10 py-5 md:py-6 bg-gray-900/90 backdrop-blur-md text-white rounded-full text-xl md:text-2xl font-black shadow-2xl hover:bg-black transition-all border-2 border-white/20 whitespace-nowrap"
              >
                <FaMicrophone size={24} className="md:w-[30px] md:h-[30px]" /> Talk to Tom
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); recognitionRef.current?.stop(); }}
                className="flex items-center gap-4 px-10 py-5 md:py-6 bg-red-500 text-white rounded-full text-xl md:text-2xl font-black shadow-2xl animate-pulse whitespace-nowrap"
              >
                <FaStop size={24} className="md:w-[30px] md:h-[30px]" /> Stop
              </motion.button>
            )}
          </div>

          <Image
            src="/images/talking-tom.png"
            alt="Talking Tom"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
          {isListening && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.4, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="absolute inset-0 border-8 border-gray-300 rounded-full -z-10"
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}
