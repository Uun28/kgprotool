'use client'
import { CheckCircle, Star } from "lucide-react";

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
      className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-10 py-20"
    >
      {/* Title */}
      <div className="text-center mb-14 max-w-xl">
          <h2 className="text-3xl md:text-4xl text-gray-800 tracking-tight">
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
                    ? "bg-white/70 ring-2 ring-sky-200 px-8 py-11 scale-105 z-10 shadow-[0_16px_48px_-8px_rgba(56,189,248,0.20)]" 
                    : "bg-white/50 px-7 py-9 scale-100"}
                  backdrop-blur-md shadow-xl border border-sky-200
                  transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 hover:border-sky-400/70
                  max-w-md mx-auto group
                `}
              >

              {/* Popular Badge */}
              {isPopular && (
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 text-white text-xs font-medium rounded-full shadow-lg flex items-center gap-2 animate-pulse">
                  <Star className="w-4 h-4 text-yellow-300 drop-shadow" />
                  Most Popular
                </span>
              )}

              {/* Title & Price */}
              <h3 className="mt-2 text-base md:text-lg text-gray-700 font-normal tracking-wide">
                {plan.title}
              </h3>
              <div className="flex items-baseline justify-center mt-1">
                <span className="text-3xl md:text-4xl text-sky-600 font-normal drop-shadow">{plan.price}</span>
              </div>
              <p className="text-gray-400 mt-1 text-xs md:text-sm italic">
                One-time payment
              </p>

              {/* Divider */}
              <div className={`${isPopular ? "w-14" : "w-12"} h-[2px] bg-gradient-to-r from-sky-300 to-blue-400 mx-auto my-6 rounded-full`}></div>

              {/* Features */}
              <ul className={`mt-1 space-y-2 ${isPopular ? "text-sm md:text-base" : "text-xs md:text-sm"} text-left`}>
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2 text-gray-600 leading-relaxed">
                    <span className="text-green-500 text-base">✔</span>
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
                  hover:scale-[1.03]
                  text-white shadow relative overflow-hidden transition-all duration-300 text-base
                `}
                onClick={() => alert(`Buy ${plan.title}`)}
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
