'use client'
import { Star } from "lucide-react";

export default function Plan() {
  const plans = [
    {
      title: "3 Month",
      price: "$25",
      features: [
        "Free Update",
        "Change PC Every 12 Hours",
        "All Feature Access",
      ],
    },
    {
      title: "12 Month",
      price: "$40",
      popular: true,
      originalPrice: "$60",
      features: [
        "Free Update",
        "Change PC Every 12 Hours",
        "All Feature Access",
      ],
    },
    {
      title: "6 Month",
      price: "$35",
      features: [
        "Free Update",
        "Change PC Every 12 Hours",
        "All Feature Access",
      ],
    },
  ];

  return (
    <section
      id="plan"
      className="min-h-screen flex flex-col items-center justify-center px-4 md:px-10 py-20"
      // Tidak ada background apa pun di sini!
    >
      {/* Title */}
      <div className="text-center mb-14 max-w-xl">
        <h2 className="text-3xl md:text-4xl text-gray-800 tracking-tight font-normal">
          <span className="bg-gradient-to-r from-sky-500 to-blue-600 text-transparent bg-clip-text">
            Choose Your Plan
          </span>
        </h2>
        <p className="text-gray-500 mt-3 text-base">
          Lower pricing with full access to all premium features
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl items-end">
        {plans.map((plan, idx) => {
          const isPopular = plan.popular;
          return (
            <div
              key={idx}
              className={`
                relative flex flex-col rounded-2xl text-center
                ${isPopular 
                  ? "ring-2 ring-sky-200 px-8 py-11 z-10 shadow-xl" 
                  : "px-7 py-9"}
                border border-sky-200
                transition-all duration-300 hover:shadow-2xl hover:-translate-y-2
                max-w-full mx-auto
                bg-transparent
              `}
              style={{
                background: "transparent",
              }}
            >
              {/* Popular Badge */}
              {isPopular && (
                <div className="flex justify-center mb-2">
                  <span className="inline-flex items-center gap-2 px-5 py-1.5 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 text-white text-xs font-normal rounded-full shadow-lg">
                    <Star className="w-4 h-4 text-yellow-300 drop-shadow" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Title & Price */}
              <h3 className="mt-2 text-base md:text-lg text-gray-700 font-normal tracking-wide">
                {plan.title}
              </h3>
              <div className="flex items-baseline justify-center mt-1 gap-3">
                {plan.originalPrice && (
                  <span className="text-lg md:text-xl text-gray-400 line-through font-normal">
                    {plan.originalPrice}
                  </span>
                )}
                <span className={`text-3xl md:text-4xl font-normal drop-shadow 
                  ${isPopular ? "text-sky-600" : "text-sky-600/90"}`}>
                  {plan.price}
                </span>
              </div>
              {isPopular && (
                <div className="flex justify-center mt-1">
                  <span className="inline-block text-xs md:text-sm text-blue-600 bg-blue-100 rounded-full px-3 py-0.5 font-normal shadow">
                    Save 33%
                  </span>
                </div>
              )}

              <p className="text-gray-400 mt-1 text-xs md:text-sm italic">
                One-time payment
              </p>

              {/* Divider */}
              <div className={`${isPopular ? "w-14" : "w-12"} h-[2px] bg-gradient-to-r from-sky-300 to-blue-400 mx-auto my-6 rounded-full`}></div>

              {/* Features */}
              <ul className={`mt-1 space-y-2 ${isPopular ? "text-sm md:text-base" : "text-xs md:text-sm"} text-left`}>
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2 text-gray-600 leading-relaxed">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                className={`
                  mt-8 w-full rounded-lg font-normal flex items-center justify-center gap-2
                  py-2.5 md:py-3
                  bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500
                  hover:from-sky-500 hover:to-blue-700 hover:shadow-lg
                  hover:scale-[1.02]
                  text-white shadow transition-all duration-200 text-base
                `}
                onClick={() => {
                  document.getElementById('resellers')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="relative z-10">Buy Now</span>
                <span className="absolute top-0 left-0 w-full h-full rounded-lg bg-gradient-to-r from-white/30 to-white/10 opacity-40 pointer-events-none blur-sm" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
