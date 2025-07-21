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
      <body className={`${poppins.variable} antialiased relative`}>
        {/* Background effect (boleh tetap di sini kalau memang global) */}
        <div className="fixed inset-0 -z-50">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-sky-50 to-white"></div>
          <div className="absolute -top-20 -left-20 w-[350px] h-[350px] bg-sky-200 rounded-full mix-blend-multiply blur-3xl opacity-40 animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-blue-300 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-pulse-slow"></div>
        </div>
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
