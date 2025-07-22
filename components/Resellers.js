import { Globe, MessageCircle, Send, Facebook as FacebookIcon } from "lucide-react";

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
    // Tambah reseller sesuai kebutuhan
  ];

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center w-full max-w-7xl">
        {resellers.map((reseller, idx) => (
          <div
            key={idx}
            className="relative flex flex-col items-center px-4 pt-8 pb-6 rounded-2xl border border-sky-200 shadow hover:shadow-lg hover:border-sky-400/80 transition-all duration-200 bg-transparent w-full max-w-[280px] sm:max-w-[300px]"
          >
            {/* Logo Avatar */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-2 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-sky-400/40 group-hover:border-sky-400/80 transition-all duration-200" />
              <div className="relative rounded-full overflow-hidden w-full h-full flex items-center justify-center shadow-md bg-white">
                <img
                  src={reseller.logo}
                  alt={reseller.name}
                  className="w-full h-full object-cover rounded-full border-2 border-white"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Country Badge */}
            {reseller.country && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 text-white text-xs font-normal rounded-full shadow flex items-center gap-2 z-20">
                {reseller.country}
              </span>
            )}

            <h3 className="mt-2 text-center text-lg md:text-xl font-normal text-gray-700 tracking-wide select-text">
              {reseller.name}
            </h3>

            {/* Social Links */}
            {(reseller.whatsapp || reseller.telegram || reseller.website || reseller.facebook) && (
              <div className="flex gap-3 mt-5 relative z-10">
                {reseller.whatsapp && (
                  <a
                    href={reseller.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full border border-green-200 text-green-600 hover:bg-green-50 hover:scale-110 transition"
                  >
                    <MessageCircle size={18} />
                  </a>
                )}
                {reseller.telegram && (
                  <a
                    href={reseller.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full border border-sky-200 text-sky-600 hover:bg-sky-50 hover:scale-110 transition"
                  >
                    <Send size={18} />
                  </a>
                )}
                {reseller.facebook && (
                  <a
                    href={reseller.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full border border-blue-200 text-blue-600 hover:bg-blue-50 hover:scale-110 transition"
                  >
                    <FacebookIcon size={18} />
                  </a>
                )}
                {reseller.website && (
                  <a
                    href={reseller.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 hover:scale-110 transition"
                  >
                    <Globe size={18} />
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
