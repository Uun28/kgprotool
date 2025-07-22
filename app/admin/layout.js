'use client';

import Sidebar from './component/Sidebar';
import { Poppins } from "next/font/google";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const showSidebar = !pathname.includes('/admin/login');

  return (
    <div className={`${poppins.variable} antialiased relative min-h-screen flex`}>
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

      {showSidebar && <Sidebar />}
      <main className={`flex-1 relative z-10 p-4 md:p-8 ${showSidebar ? 'md:ml-64' : ''} pb-20`}>
        {children}
      </main>
    </div>
  );
}
