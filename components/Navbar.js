"use client";
import { useState, useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [lenisInstance, setLenisInstance] = useState(null);

  const menus = [
    { name: "Home", href: "#home", id: "home" },
    { name: "Feature", href: "#feature", id: "feature" },
    { name: "Plan", href: "#plan", id: "plan" },
    { name: "Resellers", href: "#resellers", id: "resellers" },
  ];

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
    setLenisInstance(lenis);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleScroll = () => {
      setScrolling(window.scrollY > 20);
      const scrollY = window.scrollY + 150;
      menus.forEach((menu) => {
        const section = document.querySelector(menu.href);
        if (!section) return;
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
          setActiveSection(menu.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      lenis.destroy();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMenuClick = (e, href) => {
    e.preventDefault();
    if (!lenisInstance) return;
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const targetPosition = target.offsetTop - offset;
      lenisInstance.scrollTo(targetPosition, { offset: 0, duration: 1.2 });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-4 w-full z-50">
      {/* === DESKTOP NAVBAR === */}
      <div className="hidden md:flex justify-center transition-all duration-300">
        <div
          className={`flex items-center gap-8 px-8 py-2.5 rounded-xl border
            ${scrolling
              ? "bg-white/40 backdrop-blur-md border-white/20 shadow-sm"
              : "bg-white/20 backdrop-blur-sm border-white/10 shadow-none"}
          `}
        >
          {menus.map((menu) => {
            const isActive = activeSection === menu.id;
            return (
              <a
                key={menu.id}
                href={menu.href}
                onClick={(e) => handleMenuClick(e, menu.href)}
                className={`relative text-base font-normal tracking-wide transition-all duration-300 ${
                  isActive ? "text-sky-600" : "text-gray-700 hover:text-sky-500"
                }`}
              >
                {menu.name}
                <span
                  className={`absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] w-0 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 transition-all duration-300 ${
                    isActive ? "w-5 opacity-100" : "opacity-0"
                  }`}
                />
              </a>
            );
          })}
        </div>
      </div>

      {/* === MOBILE: Hamburger Only === */}
      <div className="md:hidden flex justify-end px-4">
        <button
          onClick={() => setIsOpen((open) => !open)}
          className="p-2 rounded-lg hover:bg-sky-50/30 transition-all focus:outline-none z-50"
          aria-label="Open menu"
        >
          {isOpen ? (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* === MOBILE PANEL (Dropdown) === */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex justify-center items-start pt-20 bg-black/20 backdrop-blur-sm">
          <div className="w-full max-w-xs mx-auto rounded-2xl bg-white/90 border border-white/30 shadow-xl flex flex-col px-6 py-6 space-y-2 animate-fadein">
            {menus.map((menu) => (
              <a
                key={menu.id}
                href={menu.href}
                onClick={(e) => handleMenuClick(e, menu.href)}
                className="text-base font-medium py-3 px-2 rounded-lg text-center hover:text-sky-600 hover:bg-sky-50/50 transition-all duration-300"
              >
                {menu.name}
              </a>
            ))}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadein {
          0% { opacity: 0; transform: translateY(-20px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fadein {
          animation: fadein 0.22s cubic-bezier(.52,1.61,.36,1) both;
        }
      `}</style>
    </nav>
  );
}
