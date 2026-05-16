"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaHome, FaBookOpen, FaGamepad, FaPencilAlt, FaChartLine, FaInfoCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/", icon: <FaHome /> },
  { name: "Learn A-Z", href: "/learn", icon: <FaBookOpen /> },
  { name: "Games", href: "/games", icon: <FaGamepad /> },
  { name: "Draw", href: "/draw", icon: <FaPencilAlt /> },
  { name: "Progress", href: "/progress", icon: <FaChartLine /> },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 glass px-6 py-3 rounded-full shadow-2xl border-4 border-white/50">
      <ul className="flex items-center gap-4 md:gap-8">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.name}>
              <Link href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`flex flex-col items-center gap-1 group`}
                >
                  <div className={`text-2xl p-3 rounded-2xl transition-colors ${
                    isActive ? "bg-primary text-white shadow-lg" : "bg-white text-gray-500 group-hover:bg-fun-yellow"
                  }`}>
                    {item.icon}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? "text-primary" : "text-gray-400"}`}>
                    {item.name}
                  </span>
                </motion.div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
