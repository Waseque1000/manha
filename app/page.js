"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaPlay, FaGraduationCap } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-4 text-center">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center gap-6"
      >
        <div className="relative w-64 h-64 md:w-80 md:h-80 mb-4 animate-bounce-slow">
          <Image
            src="/images/mascot.png"
            alt="Mascot"
            fill
            className="object-contain"
            priority
          />
        </div>

        <h1 className="text-6xl md:text-8xl font-black kids-font text-primary drop-shadow-lg leading-tight">
          Welcome to <br />
          <span className="text-secondary">Kids A-Z Learning!</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 font-medium max-w-2xl">
          Join our friendly elephant and start your fun alphabet adventure today. 
          Discover letters, play games, and win stars! ⭐
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
          <Link href="/learn">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-3 px-10 py-6 bg-primary text-white rounded-full text-2xl font-bold shadow-xl cursor-pointer"
            >
              <FaPlay /> Start Learning
            </motion.div>
          </Link>

          <Link href="/games">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-3 px-10 py-6 bg-accent text-white rounded-full text-2xl font-bold shadow-xl cursor-pointer"
            >
              <FaGraduationCap /> Play Games
            </motion.div>
          </Link>
        </div>
      </motion.div>

      {/* Floating decorations */}
      <div className="absolute top-20 left-10 text-6xl animate-float opacity-30">🎈</div>
      <div className="absolute bottom-40 right-10 text-6xl animate-float opacity-30" style={{ animationDelay: "2s" }}>🍭</div>
      <div className="absolute top-1/2 right-20 text-4xl animate-float opacity-30" style={{ animationDelay: "1s" }}>⭐</div>
    </div>
  );
}
