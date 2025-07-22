// /app/admin/login/layout.js
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function LoginLayout({ children }) {
  return (
    <div className={`${poppins.variable} antialiased relative min-h-screen`}>
      {/* Background sama seperti dashboard */}
      <div className="fixed inset-0 -z-50">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-sky-50 to-white"></div>
        <div className="absolute -top-20 -left-20 w-[350px] h-[350px] bg-sky-200 rounded-full mix-blend-multiply blur-3xl opacity-40 animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-blue-300 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-pulse-slow"></div>
      </div>
      <main className="relative z-10 p-4 md:p-8">{children}</main>
    </div>
  );
}
