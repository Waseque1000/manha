"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FloatingElement = ({ children, delay = 0, duration = 10, x = 0, y = 0 }) => (
  <motion.div
    initial={{ x, y, opacity: 0 }}
    animate={{
      y: [0, -40, 0],
      x: [0, 20, 0],
      opacity: [0.1, 0.3, 0.1],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "linear",
    }}
    className="absolute pointer-events-none select-none text-4xl"
  >
    {children}
  </motion.div>
);

export default function FloatingBackground() {
  const [elements, setElements] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const icons = ["⭐", "☁️", "🎈", "🫧", "🦄", "🌈", "🍭", "🎨"];
    const newElements = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      icon: icons[Math.floor(Math.random() * icons.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
    }));
    setElements(newElements);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden z-[-1] opacity-40">
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute"
          style={{ left: `${el.x}%`, top: `${el.y}%` }}
        >
          <FloatingElement delay={el.delay} duration={el.duration}>
            {el.icon}
          </FloatingElement>
        </div>
      ))}
    </div>
  );
}
