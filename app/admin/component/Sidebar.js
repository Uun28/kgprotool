'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Users, FileText, LogOut
} from 'lucide-react';

const menu = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { name: "User", icon: Users, path: "/admin/user" },
  { name: "Selling", icon: FileText, path: "/admin/selling" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 z-40 bg-white/75 backdrop-blur-xl border-r border-blue-100 flex flex-col shadow-xl">
      {/* Logo / Brand */}
      <div className="px-8 py-6 flex items-center gap-3 border-b border-blue-100 mb-2">
        <div className="bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 p-1 rounded-full shadow">
          <img src="/KGPro.ico" className="w-8 h-8 rounded-full bg-white" alt="Logo" />
        </div>
        <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 text-transparent bg-clip-text">
          KGPROTOOL
        </span>
      </div>
      {/* Main Menu */}
      <div className="text-xs font-semibold text-gray-400 mb-1 pl-8 pt-2">MAIN MENU</div>
      <nav className="flex-1 px-3 py-2 space-y-1">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.path;
          return (
            <Link
              href={item.path}
              key={item.name}
              className={`
                flex items-center gap-3 px-5 py-2.5 rounded-xl
                text-base font-normal transition-all
                ${active
                  ? "bg-gradient-to-r from-sky-400/20 via-blue-400/10 to-blue-500/10 text-sky-700 shadow"
                  : "hover:bg-gradient-to-r hover:from-sky-100/90 hover:via-blue-50 hover:to-white text-gray-700"}
              `}
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              <Icon className={`w-5 h-5 ${active ? "text-sky-600" : "text-gray-400 group-hover:text-sky-500"}`} />
              <span className={`${active ? "font-medium" : ""}`}>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      {/* Logout Button */}
      <form action="/admin/logout" method="POST" className="px-4 pb-6 mt-auto">
        <button
          type="submit"
          className="
            flex items-center gap-3 px-5 py-2.5 rounded-xl w-full
            text-base font-normal text-red-600 hover:bg-red-100/70
            transition-all shadow-sm
          "
          style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </form>
    </aside>
  );
}
