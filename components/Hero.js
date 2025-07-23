"use client";
import { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";

function ArrowLeft() {
  return (
    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

const productImages = [
  "/1.png",
  "/2.png",
  "/3.png",
];

export default function Hero() {
  // Carousel logic
  const [imgIdx, setImgIdx] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  function nextImage() {
    setImgIdx((prev) => (prev + 1) % productImages.length);
    setImgError(false);
  }

  function prevImage() {
    setImgIdx((prev) => (prev - 1 + productImages.length) % productImages.length);
    setImgError(false);
  }

  function handleImgError() {
    setImgError(true);
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 md:px-12 pt-28 pb-16"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-sky-300/10 to-blue-300/10 rounded-full blur-3xl" />
      </div>

      {/* Badge Version */}
      <div className="inline-block mb-4 px-6 py-1.5 text-sm rounded-full bg-white/30 backdrop-blur-md text-sky-700 font-normal shadow-sm border border-white/20">
        Version 2.0
      </div>

      {/* TITLE with typewriter-effect */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight max-w-4xl mx-auto mb-14">
       <span className="typewriter-gradient">
          <Typewriter
            options={{
              strings: [
                "KGPROTOOL 2.0",
                "Powerful KG Unlocking Tool"
              ],
              autoStart: true,
              loop: true,
              delay: 54,         // kecepatan ngetik (ms)
              deleteSpeed: 28,   // kecepatan hapus
              pauseFor: 1250,    // jeda tiap selesai text
              cursor: "<span class='inline-block w-2 h-7 align-middle bg-sky-500 ml-1 animate-pulse'>&nbsp;</span>",
              wrapperClassName: "inline", // supaya bisa style
            }}
          />
        </span>
      </h1>

      {/* CTA Button */}
      <div className={`mb-12 transition-all duration-1000 delay-600 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <a href="/KGProTool.rar">
          <button className="group relative px-8 py-4 rounded-2xl font-medium text-white 
            bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500
            shadow-xl hover:shadow-2xl hover:scale-105 
            transition-all duration-300 overflow-hidden
            focus:outline-none focus:ring-4 focus:ring-blue-500/20">
            <span className="relative z-10 flex items-center gap-3">
              <DownloadIcon />
              Download Now
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 
              translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
          </button>
        </a>
      </div>

      {/* Carousel */}
      <div className={`relative flex flex-col items-center w-full max-w-6xl mx-auto transition-all duration-1000 delay-800 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}>
        <div className="relative flex items-center justify-center w-full group">
          {/* Arrow left */}
          <button
            onClick={prevImage}
            disabled={productImages.length <= 1}
            className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 z-20 
              p-3 md:p-3 rounded-full backdrop-blur-xl bg-white/80 border border-white/60 
              shadow-lg hover:scale-110 hover:bg-white/90 
              transition-all duration-300 
              focus:outline-none focus:ring-4 focus:ring-blue-500/20
              opacity-100 md:opacity-0 md:group-hover:opacity-100"
            aria-label="Previous image"
          >
            <ArrowLeft />
          </button>
          {/* Gambar */}
          <div className="relative w-full max-w-4xl h-[200px] sm:h-[300px] md:h-[400px] lg:h-[480px] 
            rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-white/90 to-white/70 
            backdrop-blur-sm border border-white/50 hover:shadow-3xl transition-all duration-500">
            {!imgError ? (
              <img
                src={productImages[imgIdx]}
                alt={`KGPROTOOL Screenshot ${imgIdx + 1}`}
                className="object-contain w-full h-full transition-all duration-700 hover:scale-105"
                onError={handleImgError}
                draggable={false}
              />
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full text-gray-400">
                <div className="w-16 h-16 mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                  </svg>
                </div>
                <p className="font-medium">Image not available</p>
              </div>
            )}
          </div>
          {/* Arrow right */}
          <button
            onClick={nextImage}
            disabled={productImages.length <= 1}
            className="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 z-20 
              p-3 md:p-3 rounded-full backdrop-blur-xl bg-white/80 border border-white/60 
              shadow-lg hover:scale-110 hover:bg-white/90 
              transition-all duration-300 
              focus:outline-none focus:ring-4 focus:ring-blue-500/20
              opacity-100 md:opacity-0 md:group-hover:opacity-100"
            aria-label="Next image"
          >
            <ArrowRight />
          </button>
        </div>
        {/* Dot indicator */}
        <div className="flex gap-3 mt-8 justify-center">
          {productImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setImgIdx(idx); setImgError(false); }}
              aria-label={`View image ${idx + 1}`}
              className={`relative w-3 h-3 rounded-full transition-all duration-300 
                focus:outline-none 
                ${imgIdx === idx
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 scale-125 shadow-lg"
                  : "bg-white/60 border border-gray-300 hover:bg-white/80 hover:scale-110"
                }`}
            >
              {imgIdx === idx && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-sky-500 rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
