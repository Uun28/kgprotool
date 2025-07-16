export default function Plan() {
  const plans = [
    {
      title: "3 Month",
      price: "$25",
      features: ["Free Update", "Change PC Every 12 Hours", "All Feature Access"],
    },
    {
      title: "12 Month",
      price: "$40",
      popular: true, 
      features: ["Free Update", "Change PC Every 12 Hours", "All Feature Access"],
    },
    {
      title: "6 Month",
      price: "$35",
      features: ["Free Update", "Change PC Every 12 Hours", "All Feature Access"],
    },
  ];

  return (
    <section
      id="plan"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-10 py-16"
    >
      {/* Title */}
      <div className="text-center mb-14 max-w-xl">
        <h2 className="text-3xl md:text-4xl text-gray-700 tracking-tight">
          <span className="bg-gradient-to-r from-sky-500 to-blue-600 text-transparent bg-clip-text">
            Choose Your Plan
          </span>
        </h2>
        <p className="text-gray-500 mt-3 text-base">
          Lower pricing with full access to all premium features
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-6xl items-end">
        {plans.map((plan, idx) => {
          const isPopular = plan.popular;

          return (
            <div
              key={idx}
              className={`relative flex flex-col rounded-2xl text-center bg-white/80 backdrop-blur-md shadow-sm border border-gray-100 transition-all duration-500 hover:shadow-xl hover:-translate-y-2
                ${
                  isPopular
                    ? "scale-105 border-sky-300 z-10 px-8 py-10"
                    : "scale-100 px-7 py-9"
                }
                max-w-md mx-auto
              `}
            >
              {/* Badge khusus card tengah */}
              {isPopular && (
                <span className="absolute -top-4 right-4 text-xs px-4 py-1 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-full shadow-sm">
                  ⭐ Most Popular
                </span>
              )}

              {/* Title & Price */}
              <h3
                className={`${
                  isPopular ? "text-lg md:text-xl" : "text-base md:text-lg"
                } text-gray-700 tracking-wide`}
              >
                {plan.title}
              </h3>
              <p
                className={`${
                  isPopular ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl"
                } text-sky-600 mt-2`}
              >
                {plan.price}
              </p>
              <p className="text-gray-400 mt-1 text-xs md:text-sm italic">
                One-time payment
              </p>

              {/* Divider */}
              <div
                className={`${
                  isPopular ? "w-14" : "w-12"
                } h-[2px] bg-gradient-to-r from-sky-300 to-blue-400 mx-auto my-6 rounded-full`}
              ></div>

              {/* Features */}
              <ul
                className={`mt-3 space-y-2 ${
                  isPopular ? "text-sm md:text-base" : "text-xs md:text-sm"
                } text-left`}
              >
                {plan.features.map((feature, fIdx) => (
                  <li
                    key={fIdx}
                    className="flex items-center gap-2 text-gray-500 leading-relaxed"
                  >
                    <span className="text-green-500 text-base">✔</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                className={`mt-8 w-full rounded-lg transition-all text-white
                  ${isPopular ? "py-3 text-base" : "py-2.5 text-sm"}
                  bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 hover:shadow-md hover:scale-[1.03]`}
              >
                Buy Now
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
