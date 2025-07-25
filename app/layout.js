import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  metadataBase: new URL("https://kgprotool.com"),  // ✅ tambahkan ini
  title: "KGPROTOOL",
  description: "Powerful MDM Tool for Samsung KnoxGuard Bypass",
  icons: {
    icon: "/KGPro.ico",
    shortcut: "/KGPro.ico",
    apple: "/logo.png",
  },
  openGraph: {
    title: "KGPROTOOL",
    description: "Powerful MDM Tool for Samsung KnoxGuard Bypass",
    url: "https://kgprotool.com",
    siteName: "KGPROTOOL",
    images: [
      {
        url: "/logo.png",
        width: 180,
        height: 180,
        alt: "KGPROTOOL Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KGPROTOOL",
    description: "Powerful MDM Tool for Samsung KnoxGuard Bypass",
    images: ["/logo.png"],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable}`}>
        {/* ✅ BACKGROUND GRID PATTERN */}
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
                {/* Background putih */}
                <rect x="0" y="0" width="150" height="100" fill="white" />
                {/* Grid line abu soft */}
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

        {/* ✅ MAIN CONTENT */}
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
