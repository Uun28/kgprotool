'use client'
import { Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import PlanSection from "@/components/Plan";
import Features from "@/components/Features";
import Resellers from "@/components/Resellers";
import SmoothScroll from "@/components/Smoothscroll";

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main className="relative text-gray-800">
        <Hero />
        <Features />
        <PlanSection />
        <Resellers />
      </main>
      <Footer />

      {/* Floating Telegram Button */}
      <div className="fixed bottom-5 right-5 z-50">
        <a
          href="https://t.me/KGPRoTool"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram"
          className="
            block w-14 h-14 rounded-full
            bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500
            shadow-lg hover:shadow-xl flex items-center justify-center
            hover:scale-110 active:scale-95 transition-all duration-200 group
            ring-2 ring-white/20 hover:ring-white/40
          "
        >
          <Send size={28} className="text-white transition-transform duration-200 group-hover:rotate-12 group-active:rotate-6" />
        </a>
      </div>
    </SmoothScroll>
  );
}
