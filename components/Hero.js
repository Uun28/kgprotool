export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-12 pt-28 pb-16"
    >
      <div
        className="inline-block mb-4 px-6 py-1.5 text-sm rounded-full bg-white/30 backdrop-blur-md text-sky-700 font-medium shadow-sm border border-white/20"
        data-aos="fade-up"
      >
        Version 2.0 
      </div>

      <h1
        className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight max-w-4xl mx-auto"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <span className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 text-transparent bg-clip-text animate-gradient-x">
          KGPROTOOL 2.0
        </span>
        <br />
        <span className="block mt-3 text-xl md:text-xl lg:text-2xl font-normal text-gray-600">
          Powerful KG Unlocking Tool
        </span>
      </h1>

      <p
        className="mt-6 text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed"  data-aos="fade-up"data-aos-delay="200">    
        KG Unlock,MDM Remove, NVDATA & NVRAM Editor,Unlock Network,etc
      </p>

      <div className="mt-8" data-aos="fade-up" data-aos-delay="300">
        <button className="relative px-8 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-sky-400 to-blue-500 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden group">
          <span className="relative z-10">Download Now</span>
          <span className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
        </button>
      </div>

      <div
        className="relative mt-14 flex justify-center w-full"
        data-aos="fade-up"
        data-aos-delay="400"
      >

        <div className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-gradient-to-r from-sky-200/40 to-blue-300/30 rounded-full blur-3xl opacity-50 animate-pulse-slow" />

        <img
          src="/kgprotool.png"
          alt="KGPROTOOL Preview"
          className="relative w-[90%] md:w-[700px] lg:w-[800px] rounded-xl shadow-2xl animate-float"
        />
      </div>
    </section>
  );
}
