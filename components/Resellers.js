import { Globe, MessageCircle, Send, Facebook as FacebookIcon } from "lucide-react";
import Image from 'next/image';
import { useEffect, useRef } from "react";


export default function Resellers() {
  const resellers = [
    {
      name: "HIUNLOCK",
      logo: "/HiUnlock.jpg",
      whatsapp: "https://wa.me/+447916641385",
      telegram: "https://t.me/hiunlock",
      website: "https://www.hiunlock.com",
      country: "WorldWide",
    },
    {
      name: "GSM RAJA",
      logo: "/gsmraja.jpg",
      whatsapp: "http://wa.me/+918178370731",
      telegram: "https://t.me/gsmraja",
      website: "https://servergsmraja.com/",
      country: "INDIA",
    },
     {
      name: "AZE UNLOCK",
      logo: "/Azeunlock.jpg",
      whatsapp: "http://wa.me/+918178370731",
      telegram: "https://t.me/gsm_teammm",
      facebook : "https://www.facebook.com/azeunlock",
      website: "https://azeunlock.com/",
      country: "WorldWide",
    },
    {
      name: "GSM SULTENG",
      logo: "/gsmsulteng.jpg",
      whatsapp: "https://wa.me/+6281244091571",
      telegram: "https://t.me/GS_hary12",
      facebook: "https://www.facebook.com/hary.sulteng.2025",
      website: "",
      country: "INDONESIA",
    }, 
    {
      name: "KGPROTOOL",
      logo: "/reseller.png",
      whatsapp: "",
      telegram: "",
      website: "",
      country: "",
    },
    {
      name: "KGPROTOOL",
      logo: "/reseller.png",
      whatsapp: "",
      telegram: "",
      website: "",
      country: "",
    },
    {
      name: "KGPROTOOL",
      logo: "/reseller.png",
      whatsapp: "",
      telegram: "",
      website: "",
      country: "",
    },
    {
      name: "KGPROTOOL",
      logo: "/reseller.png",
      whatsapp: "",
      telegram: "",
      website: "",
      country: "",
    },
  ];
  const cardRefs = useRef([]);
  useEffect(() => {
    cardRefs.current.forEach((ref, idx) => {
      setTimeout(() => {
        if (ref) ref.classList.remove('opacity-0', 'translate-y-8');
      }, 80 + idx * 80);
    });
  }, []);

 return (
    <section
      id="resellers"
      className="py-16 px-4 sm:px-8 lg:px-20 flex flex-col items-center bg-transparent"
    >
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl text-gray-800 tracking-tight font-normal">
          Official{" "}
          <span className="bg-gradient-to-r from-sky-500 to-blue-600 text-transparent bg-clip-text">
            KGPROTOOL Resellers & Distributor
          </span>
        </h2>
        <p className="text-gray-500 mt-3 text-sm md:text-base max-w-xl mx-auto">
          Trusted partners around the world
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center w-full max-w-7xl bg-white">
        {resellers.map((reseller, idx) => (
          <div
            key={idx}
            ref={el => cardRefs.current[idx] = el}
            className="relative flex flex-col items-center px-4 pt-8 pb-6 rounded-2xl border border-gray-200 shadow hover:shadow-lg hover:scale-105 hover:border-blue-600/80 transition-all duration-300 bg-transparent w-full max-w-[280px] sm:max-w-[300px] opacity-0 translate-y-8"
            style={{ willChange: "transform, opacity" }}
          >
            {/* Logo Avatar */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-2 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-400/40 group-hover:border-sky-400/80 transition-all duration-200" />
              <div className="relative rounded-full overflow-hidden w-full h-full flex items-center justify-center shadow-md bg-white">
                <Image
                  src={reseller.logo}
                  alt={reseller.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover rounded-full border-2 border-white"
                  loading="lazy"
                  unoptimized={false}
                />
              </div>
            </div>

            {/* Country Badge */}
            {reseller.country && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                <div className="px-4 py-1.5 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 text-white text-xs font-medium rounded-full shadow-lg flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                  {reseller.country}
                </div>
              </div>
            )}

            <h3 className="mt-2 text-center text-lg md:text-xl font-normal text-gray-700 tracking-wide select-text">
              {reseller.name}
            </h3>

            {/* Social Links */}
            {(reseller.whatsapp || reseller.telegram || reseller.website || reseller.facebook) ? (
              <div className="flex gap-3 relative z-10">
                {reseller.whatsapp && (
                  <a
                    href={reseller.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn p-3 rounded-2xl bg-green-50 border border-green-100 text-green-600 hover:bg-green-500 hover:text-white hover:scale-110 hover:shadow-lg transition-all duration-300"
                  >
                    <MessageCircle size={18} />
                  </a>
                )}
                {reseller.telegram && (
                  <a
                    href={reseller.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn p-3 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white hover:scale-110 hover:shadow-lg transition-all duration-300"
                  >
                    <Send size={18} />
                  </a>
                )}
                {reseller.facebook && (
                  <a
                    href={reseller.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn p-3 rounded-2xl bg-blue-50 border border-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white hover:scale-110 hover:shadow-lg transition-all duration-300"
                  >
                    <FacebookIcon size={18} />
                  </a>
                )}
                {reseller.website && (
                  <a
                    href={reseller.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn p-3 rounded-2xl bg-gray-50 border border-gray-100 text-gray-600 hover:bg-gray-700 hover:text-white hover:scale-110 hover:shadow-lg transition-all duration-300"
                  >
                    <Globe size={18} />
                  </a>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-gray-500 text-sm">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                Coming Soon
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}