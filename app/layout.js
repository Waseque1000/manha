import { Outfit, Bubblegum_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FloatingBackground from "@/components/FloatingBackground";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const bubblegum = Bubblegum_Sans({
  weight: "400",
  variable: "--font-bubblegum",
  subsets: ["latin"],
});

export const metadata = {
  title: "Kids A-Z Learning | Fun & Interactive",
  description: "Learn the English alphabet in a fun, colorful, and interactive way for kids!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${bubblegum.variable} antialiased`}>
        <FloatingBackground />
        <main className="relative pb-32 min-h-screen z-10">
          {children}
        </main>
        <Navbar />
      </body>
    </html>
  );
}
