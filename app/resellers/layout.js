// app/resellers/layout.js
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function ResellersLayout({ children }) {
  return (
    <div className={`${poppins.variable} antialiased relative min-h-screen w-full`}>
      {/* Pattern Background, bisa dipertahankan */}
      <div
        className="fixed inset-0 -z-50 pointer-events-none"
        aria-hidden="true"
      >
        <svg
          width="100%"
          height="100%"
          className="absolute inset-0 w-full h-full"
          style={{ minHeight: "100vh" }}
        >
          <defs>
            <pattern
              id="grid"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="150" height="100" fill="white" />
              <path
                d="M 100 0 L 0 0 0 100"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1.2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      {children}
    </div>
  );
}
