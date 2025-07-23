'use client'
import { Star } from "lucide-react";
import { useEffect, useRef } from "react";

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

  // Optional: simple fade-in effect for cards on mount (no intersection, just delay)
  const refs = [useRef(), useRef(), useRef()];
  useEffect(() => {
    refs.forEach((ref, idx) => {
      setTimeout(() => {
        ref.current?.classList.remove('opacity-0', 'translate-y-8');
      }, 140 + idx * 150);
    });
  }, []);

  return (
    <section
      id="plan"
      className="min-h-screen flex flex-col items-center justify-center px-4 md:px-10 py-16"
    >
      {/* Title */}
      <div className="text-center mb-8 max-w-xl">
        <h2 className="text-3xl md:text-4xl text-gray-800 font-normal tracking-tight">
          <span className="bg-gradient-to-r from-sky-500 to-blue-600 text-transparent bg-clip-text">
            Choose Your Plan
          </span>
        </h2>
        <p className="text-gray-500 mt-3 text-base">
          Lower pricing with full access to all premium features
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full max-w-6xl">
        {plans.map((plan, idx) => {
          const isPopular = plan.popular;
          return (
            <div
              key={idx}
              ref={refs[idx]}
              className={`
                group relative overflow-hidden rounded-xl
                bg-white/70 backdrop-blur
                border ${isPopular ? "border-blue-400" : "border-gray-300"}
                shadow
                transition-all duration-300
                hover:scale-105 hover:shadow-2xl
                flex flex-col items-center px-5 py-6
                opacity-0 translate-y-8
              `}
              style={{
                willChange: "transform, opacity",
              }}
            >
              {/* Decorative bubble */}
              <div className={`absolute -top-10 -right-10 w-28 h-28 rounded-full opacity-10
                transition-transform duration-500 transform group-hover:scale-200 pointer-events-none
                ${isPopular ? "bg-gradient-to-br from-blue-400 to-indigo-500" : "bg-gradient-to-br from-slate-300 to-blue-300"}
              `} />

              {/* Popular Badge */}
              {isPopular && (
                <div className="flex justify-center mb-1">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 text-white text-xs font-medium rounded-full shadow-sm">
                    <Star className="w-4 h-4 text-yellow-300" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Title & Price */}
              <h3 className="mt-2 text-base md:text-lg text-gray-700 font-normal">
                {plan.title}
              </h3>
              <div className="flex items-baseline justify-center mt-1 gap-2">
                {plan.originalPrice && (
                  <span className="text-base md:text-lg text-gray-400 line-through font-normal">
                    {plan.originalPrice}
                  </span>
                )}
                <span
                  className={`
                    text-2xl md:text-3xl font-semibold
                    bg-gradient-to-r from-sky-500 to-blue-600 text-transparent bg-clip-text
                  `}
                >
                  {plan.price}
                </span>
              </div>
              {isPopular && (
                <div className="flex justify-center mt-1">
                  <span className="inline-block text-xs md:text-sm text-blue-600 bg-blue-100 rounded-full px-3 py-0.5 font-medium">
                    Save 33%
                  </span>
                </div>
              )}
              <p className="text-gray-400 mt-1 text-xs md:text-sm italic">
                One-time payment
              </p>

              {/* Divider */}
              <div className={`w-4/5 h-px my-4 mx-auto ${isPopular
                ? "bg-gradient-to-r from-transparent via-sky-300 to-transparent"
                : "bg-gradient-to-r from-transparent via-blue-100 to-transparent group-hover:via-blue-200"
              }`} />

              {/* Features */}
              <ul className={`mt-1 space-y-2 ${isPopular ? "text-sm md:text-base" : "text-xs md:text-sm"} text-left w-full`}>
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2 text-gray-700">
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
                  relative mt-5 w-full rounded-md font-medium flex items-center justify-center gap-2
                  py-2 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500
                  hover:from-sky-500 hover:to-blue-700 hover:shadow
                  text-white shadow transition-all duration-150 text-base
                  outline-none
                `}
                onClick={() => {
                  document.getElementById('resellers')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Buy Now
                <span className="absolute top-0 left-0 w-full h-full rounded-md bg-gradient-to-r from-white/30 to-white/5 opacity-40 pointer-events-none blur-sm" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
