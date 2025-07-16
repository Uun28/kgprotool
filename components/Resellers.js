import { Globe, MessageCircle, Send } from "lucide-react";

export default function Resellers() {
  const resellers = [
    {
      name: "GSM RAJA",
      logo: "/gsmraja.jpg",
      whatsapp: "http://wa.me/+918178370731",
      telegram: "https://t.me/gsmraja",
      website: "https://servergsmraja.com/",
    },
    {
      name: "KGPROTOOL",
      logo: "/reseller.png",
      whatsapp: "",
      telegram: "",
      website: "",
    },
    {
      name: "KGPROTOOL",
      logo: "/reseller.png",
      whatsapp: "",
      telegram: "",
      website: "",
    },
    {
      name: "KGPROTOOL",
      logo: "/reseller.png",
      whatsapp: "",
      telegram: "",
      website: "",
    },
    {
       name: "KGPROTOOL",
      logo: "/reseller.png",
      whatsapp: "",
      telegram: "",
      website: "",
    },
    {
      name: "KGPROTOOL",
      logo: "/reseller.png",
      whatsapp: "",
      telegram: "",
      website: "",
    },
    {
      name: "KGPROTOOL",
      logo: "/reseller.png",
      whatsapp: "",
      telegram: "",
      website: "",
    },
    {
       name: "KGPROTOOL",
      logo: "/reseller.png",
      whatsapp: "",
      telegram: "",
      website: "",
    },
    
  ];

  return (
    <section
      id="resellers"
      className="relative py-16 px-4 sm:px-8 lg:px-20 flex flex-col items-center"
    >
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl text-gray-800 tracking-tight">
          Official{" "}
          <span className="bg-gradient-to-r from-sky-500 to-blue-600 text-transparent bg-clip-text">
            KGPROTOOL Resellers & Distributor
          </span>
        </h2>
        <p className="text-gray-500 mt-3 text-sm md:text-base max-w-xl mx-auto">
          Trusted partners around the world
        </p>
      </div>

      {/* Grid Resellers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center w-full max-w-7xl">
        {resellers.map((reseller, idx) => (
          <div
            key={idx}
            className="relative flex flex-col items-center p-6 rounded-2xl 
              bg-white/80 backdrop-blur-md border border-gray-100 shadow-sm 
              hover:shadow-xl hover:-translate-y-2 hover:border-sky-200 
              transition-all duration-500 w-full max-w-[280px] sm:max-w-[300px]"
          >
            {/* Hover glow background */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-200/10 to-blue-200/10 opacity-0 hover:opacity-100 transition-all duration-500"></div>

            {/* Logo dengan frame premium */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[2px] bg-gradient-to-br from-sky-400 to-blue-500 shadow-md">
              <div className="w-full h-full rounded-full overflow-hidden bg-white">
                <img
                  src={reseller.logo}
                  alt={reseller.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Name */}
            <h3 className="mt-4 text-center text-base md:text-lg text-gray-800 font-medium">
              {reseller.name}
            </h3>

            {/* Social Links */}
            {(reseller.whatsapp || reseller.telegram || reseller.website) && (
              <div className="flex gap-4 mt-4">
                {reseller.whatsapp && (
                  <a
                    href={reseller.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gradient-to-br from-green-100 to-green-50 text-green-600 hover:scale-110 transition-all shadow-sm hover:shadow-md"
                  >
                    <MessageCircle size={18} />
                  </a>
                )}
                {reseller.telegram && (
                  <a
                    href={reseller.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gradient-to-br from-sky-100 to-blue-50 text-sky-600 hover:scale-110 transition-all shadow-sm hover:shadow-md"
                  >
                    <Send size={18} />
                  </a>
                )}
                {reseller.website && (
                  <a
                    href={reseller.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 text-gray-600 hover:scale-110 transition-all shadow-sm hover:shadow-md"
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
