"use client";
import { useState } from "react";

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

const productImages = [
  "/1.png",
  "/2.png",
  "/3.png",
];

export default function Hero() {
  const [imgIdx, setImgIdx] = useState(0);
  const [imgError, setImgError] = useState(false);

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
      {/* Badge Version */}
      <div
        className="inline-block mb-4 px-6 py-1.5 text-sm rounded-full bg-white/30 backdrop-blur-md text-sky-700 font-medium shadow-sm border border-white/20"
        data-aos="fade-up"
      >
        Version 2.0
      </div>

      {/* Title */}
      <h1
        className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight max-w-4xl mx-auto"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 text-transparent bg-clip-text animate-gradient-x">
          KGPROTOOL 2.0
        </span>
        <br />
        <span className="block mt-3 text-xl md:text-xl lg:text-2xl font-normal text-gray-600">
          Powerful KG Unlocking Tool
        </span>
      </h1>

      {/* Sub description */}
      <p
        className="mt-6 text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        KG Unlock, MDM Remove, NVDATA & NVRAM Editor, Unlock Network, etc
      </p>

      {/* CTA Button */}
      <div className="mt-8" data-aos="fade-up" data-aos-delay="300">
        <a href="/KGProTool.rar">
          <button className="relative px-8 py-3 rounded-xl font-normal text-white bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden group">
            <span className="relative z-10">Download Now</span>
            <span className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
          </button>
        </a>
      </div>

      {/* Carousel Gambar Premium */}
      <div
        className="relative mt-14 flex flex-col items-center w-full max-w-5xl mx-auto"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <div className="relative flex items-center justify-center w-full">
          {/* Panah kiri */}
          <button
            onClick={prevImage}
            className="group absolute left-1 sm:left-2 md:-left-8 top-1/2 -translate-y-1/2 z-20 p-1.5 md:p-2 rounded-full backdrop-blur-xl bg-white/60 border border-blue-200 shadow-2xl hover:scale-110 transition-all duration-200 focus:outline-none"
            aria-label="Previous"
            type="button"
          >
            <ArrowLeft />
          </button>
          {/* Gambar */}
          <div className="relative flex justify-center items-center w-full max-w-xs sm:max-w-lg md:max-w-3xl h-[170px] sm:h-[250px] md:h-[370px] lg:h-[420px] overflow-hidden rounded-3xl shadow-2xl bg-white/80 border border-blue-100">
            {!imgError ? (
              <img
                src={productImages[imgIdx]}
                alt={`KGPROTOOL Preview ${imgIdx + 1}`}
                className="object-contain w-full h-full transition-all duration-500 hover:scale-105"
                onError={handleImgError}
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-400">
                Gambar tidak ditemukan
              </div>
            )}
          </div>
          {/* Panah kanan */}
          <button
            onClick={nextImage}
            className="group absolute right-1 sm:right-2 md:-right-8 top-1/2 -translate-y-1/2 z-20 p-1.5 md:p-2 rounded-full backdrop-blur-xl bg-white/60 border border-blue-200 shadow-2xl hover:scale-110 transition-all duration-200 focus:outline-none"
            aria-label="Next"
            type="button"
          >
            <ArrowRight />
          </button>
        </div>
        {/* Dot indicator */}
        <div className="flex gap-2 md:gap-3 mt-6 justify-center">
          {productImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => { setImgIdx(idx); setImgError(false); }}
              aria-label={`Pilih gambar ${idx + 1}`}
              type="button"
              className={`
                w-3.5 h-3.5 md:w-4 md:h-4 rounded-full flex items-center justify-center
                transition-all duration-300
                ${imgIdx === idx
                  ? "scale-75 ring-2 ring-sky-400 ring-offset-1 shadow-[0_0_0_2px_rgba(56,189,248,0.18)] bg-gradient-to-br from-sky-400 via-blue-400 to-cyan-300"
                  : "bg-white/60 border border-blue-100 opacity-60 hover:opacity-90"}
              `}
              style={{ outline: "none" }}
            >
              {imgIdx === idx && (
                <span className="block w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-white/90" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
