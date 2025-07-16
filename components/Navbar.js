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
      duration: 2.3,
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
      const offset = 100; // kasih jarak 100px dari atas
      const targetPosition = target.offsetTop - offset;
      lenisInstance.scrollTo(targetPosition, {
        offset: 0,
        duration: 2.3,
      });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-4 w-full z-50">
      {/*  DESKTOP NAVBAR */}
      <div className="hidden md:flex justify-center transition-all duration-300">
        <div
          className={`flex items-center gap-6 px-8 py-3 rounded-2xl 
            ${
              scrolling
                ? "bg-white/80 backdrop-blur-md shadow-md"
                : "bg-white/40 backdrop-blur-sm"
            }`}
        >
          {menus.map((menu) => {
            const isActive = activeSection === menu.id;
            return (
              <a
                key={menu.id}
                href={menu.href}
                onClick={(e) => handleMenuClick(e, menu.href)}
                className={`relative px-2 py-1 transition-all duration-300 hover:text-sky-600 ${
                  isActive ? "text-sky-600" : "text-gray-700"
                }`}
              >
                {menu.name}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] w-full transition-all duration-300 rounded-full ${
                    isActive
                      ? "bg-gradient-to-r from-sky-400 to-blue-500 opacity-100"
                      : "opacity-0"
                  }`}
                ></span>
              </a>
            );
          })}
        </div>
      </div>

      {/*  MOBILE NAVBAR */}
      <div
        className={`md:hidden flex ${
          scrolling ? "justify-end pr-4" : "justify-center"
        }`}
      >
        <div
          className={`flex items-center justify-between px-5 py-2.5 rounded-2xl transition-all duration-300 
            ${
              scrolling
                ? "bg-white/80 backdrop-blur-md shadow-md"
                : "bg-white/40 backdrop-blur-sm"
            }`}
        >
          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-sky-50 transition-all"
          >
            {isOpen ? (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/*  MOBILE DROPDOWN */}
      {isOpen && (
        <div className="absolute top-20 right-4 w-[80%] bg-white/95 backdrop-blur-md shadow-lg rounded-2xl md:hidden flex flex-col space-y-3 px-6 py-6 text-gray-700">
          {menus.map((menu) => (
            <a
              key={menu.id}
              href={menu.href}
              onClick={(e) => handleMenuClick(e, menu.href)}
              className="text-lg py-3 rounded-md hover:text-sky-600 hover:bg-sky-50 transition-all duration-300"
            >
              {menu.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
