import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "KGPROTOOL",
  description: "Powerful MDM Tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/KGPro.ico" type="image/x-icon" />
        <title>KGPROTOOL</title>
        <meta name="description" content="Powerful MDM Tool" />
      </head>
      <body className={`${poppins.variable}`}>
        {/* Pattern Kotak Besar */}
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
                width="100"    // <-- Besar kotak di sini
                height="100"   // <-- Besar kotak di sini
                patternUnits="userSpaceOnUse"
              >
                <rect x="0" y="0" width="150" height="100" fill="white" />
                <path
                  d="M 100 0 L 0 0 0 100"
                  fill="none"
                  stroke="#e5e7eb"   // Abu muda, modern soft
                  strokeWidth="1.2"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
