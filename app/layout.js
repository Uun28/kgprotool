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
        {/* Favicon and Apple touch icon */}
        <link rel="icon" href="/KGPro.ico" type="image/x-icon" />
        <link rel="icon" href="/KGPro.png" type="image/png" />
        <link rel="apple-touch-icon" href="/KGPro.png" />
        {/* Title and description fallback if needed */}
        <title>KGPROTOOL</title>
        <meta name="description" content="Powerful MDM Tool" />
        {/* You can add more meta if you want */}
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
      </body>
    </html>
  );
}
