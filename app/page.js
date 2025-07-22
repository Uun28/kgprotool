import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import PlanSection from "@/components/Plan";
import Features from "@/components/Features";
import Resellers from "@/components/Resellers";
import SmoothScroll from "@/components/Smoothscroll";
import SectionMotion from "@/components/SectionMotion"; // <--- Tambah ini

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main className="relative text-gray-800">
        <SectionMotion id="home" delay={0.04} className="scroll-mt-24">
          <Hero />
        </SectionMotion>
        <SectionMotion id="feature" delay={0.09} className="scroll-mt-24">
          <Features />
        </SectionMotion>
        <SectionMotion id="plan" delay={0.15} className="scroll-mt-24">
          <PlanSection />
        </SectionMotion>
        <SectionMotion id="resellers" delay={0.2} className="scroll-mt-24">
          <Resellers />
        </SectionMotion>
      </main>
      <Footer />
      {/* Floating Telegram button */}
      <a
        href="https://t.me/KGPRoTool"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Telegram"
        className="
          fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full
          bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500
          shadow-lg flex items-center justify-center
          hover:scale-110 transition-all group
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28" height="28"
          fill="white"
          viewBox="0 0 24 24"
          className="transition-transform group-hover:rotate-12"
        >
          <path d="M9.965 17.159c-.297 0-.254-.112-.36-.396l-.865-2.863 6.921-4.125c.323-.196.141-.306-.199-.11l-8.557 5.405-2.534-.793c-.55-.168-.561-.55.115-.814l10.107-3.892c.434-.162.819.098.678.774l-1.724 8.164c-.12.541-.447.67-.906.417l-2.529-1.864-1.222 1.177z"/>
        </svg>
      </a>
    </SmoothScroll>
  );
}
