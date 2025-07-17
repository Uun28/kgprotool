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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 justify-items-center w-full max-w-7xl">
        {resellers.map((reseller, idx) => (
          <div
            key={idx}
            className="relative flex flex-col items-center px-5 pt-8 pb-6 rounded-3xl border border-sky-200 shadow-lg shadow-sky-100/40
              transition-all duration-500 hover:shadow-xl hover:border-sky-400/60
              bg-transparent backdrop-blur-none w-full max-w-[280px] sm:max-w-[300px] group"
          >
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-3 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-sky-400/40 group-hover:border-sky-400/90 transition-all duration-500" />
              <div className="absolute inset-1 rounded-full bg-white/40 blur-md opacity-30 group-hover:opacity-60 group-hover:blur-lg transition-all duration-500 pointer-events-none" />
              <div className="relative rounded-full overflow-hidden shadow-md w-full h-full flex items-center justify-center">
                <img
                  src={reseller.logo}
                  alt={reseller.name}
                  className="w-full h-full object-cover rounded-full border-2 border-white"
                />
              </div>
            </div>

            <h3 className="mt-2 text-center text-lg md:text-xl font-normal bg-gray-600 text-transparent bg-clip-text drop-shadow-md tracking-wide select-text">
              {reseller.name}
            </h3>

            {/* Social Links */}
            {(reseller.whatsapp || reseller.telegram || reseller.website) && (
              <div className="flex gap-4 mt-6 relative z-10">
                {reseller.whatsapp && (
                  <a
                    href={reseller.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full border border-green-200 text-green-600 hover:scale-110 transition-all shadow-sm hover:shadow-md"
                  >
                    <MessageCircle size={18} />
                  </a>
                )}
                {reseller.telegram && (
                  <a
                    href={reseller.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full border border-sky-200 text-sky-600 hover:scale-110 transition-all shadow-sm hover:shadow-md"
                  >
                    <Send size={18} />
                  </a>
                )}
                {reseller.website && (
                  <a
                    href={reseller.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full border border-gray-200 text-gray-600 hover:scale-110 transition-all shadow-sm hover:shadow-md"
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