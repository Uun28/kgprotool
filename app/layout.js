import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      <body className={`${poppins.variable} antialiased relative`}>   
        <div className="fixed inset-0 -z-50">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-sky-50 to-white"></div>
          <div className="absolute -top-20 -left-20 w-[350px] h-[350px] bg-sky-200 rounded-full mix-blend-multiply blur-3xl opacity-40 animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-blue-300 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-pulse-slow"></div>
        </div>
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
         <a
          href="https://t.me/KGPRoTool"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram"
          className="
            fixed
            bottom-5 right-5
            z-50
            w-14 h-14
            rounded-full
            bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500
            shadow-lg
            flex items-center justify-center
            hover:scale-110
            transition-all
            group
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28" height="28"
            fill="white"
            viewBox="0 0 24 24"
            className="transition-transform group-hover:rotate-12"
          >
            <path d="M9.965 17.159c-.297 0-.254-.112-.36-.396l-.865-2.863 6.921-4.125c.323-.196.141-.306-.199-.11l-8.557 5.405-2.534-.793c-.55-.168-.561-.55.115-.814l10.107-3.892c.434-.162.819.098.678.774l-1.724 8.164c-.12.541-.447.67-.906.417l-2.529-1.864-1.222 1.177z"/>
          </svg>
        </a>
      </body>
    </html>
  );
}
