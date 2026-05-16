"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaHome, FaBookOpen, FaGamepad, FaPencilAlt, FaChartLine, FaInfoCircle, FaCat, FaHashtag } from "react-icons/fa";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/", icon: <FaHome /> },
  { name: "Learn A-Z", href: "/learn", icon: <FaBookOpen /> },
  { name: "1-100", href: "/numbers", icon: <FaHashtag /> },
  { name: "Talk Tom", href: "/tom", icon: <FaCat /> },
  { name: "Games", href: "/games", icon: <FaGamepad /> },
  { name: "Draw", href: "/draw", icon: <FaPencilAlt /> },
  { name: "Progress", href: "/progress", icon: <FaChartLine /> },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-50 glass px-4 md:px-6 py-2 md:py-3 rounded-full shadow-2xl border-4 border-white/50 w-[95%] md:w-auto overflow-x-auto no-scrollbar">
      <ul className="flex items-center justify-between md:justify-center gap-2 md:gap-8 min-w-max md:min-w-0 mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.name} className="flex-1 md:flex-initial">
              <Link href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`flex flex-col items-center gap-1 group`}
                >
                  <div className={`text-xl md:text-2xl p-2 md:p-3 rounded-xl md:rounded-2xl transition-colors ${
                    isActive ? "bg-primary text-white shadow-lg" : "bg-white text-gray-500 group-hover:bg-fun-yellow"
                  }`}>
                    {item.icon}
                  </div>
                  <span className={`text-[8px] md:text-[10px] font-bold uppercase tracking-wider ${isActive ? "text-primary" : "text-gray-400"}`}>
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
