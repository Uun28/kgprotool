'use client';

import { LayoutDashboard, Zap, PackageSearch, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';

const menu = [
  { name: "Activation", icon: Zap, key: 'activation' },
  { name: "Selling", icon: PackageSearch, key: 'selling' },
  { name: "Option", icon: Settings, key: 'option' },
];

export default function Sidebar({ menuActive, setMenuActive, onLogout, loading }) {
  return (
    <>
      {/* DESKTOP SIDEBAR */}
    <aside className="hidden md:flex h-screen w-64 z-50 bg-white/70 backdrop-blur-2xl border-r border-blue-100 flex-col shadow-2xl select-none">
        {/* Brand / Logo */}
        <div className="px-8 py-7 flex items-center gap-3 border-b border-blue-100 mb-2">
          <div className="p-1.5 rounded-2xl shadow-md bg-gradient-to-tr from-sky-200 via-blue-100 to-white/60">
            <img src="/KGPro.ico" className="w-8 h-8 rounded-xl bg-white" alt="Logo" />
          </div>
          <span className="text-xl font-normal tracking-tight bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 text-transparent bg-clip-text drop-shadow">
            KGPROTOOL
          </span>
        </div>

        <div className="text-[11px] font-normal text-blue-400 mb-1 pl-8 pt-2 tracking-widest select-none">
          MAIN MENU
        </div>
        <nav className="flex-1 px-3 pt-2 space-y-1">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = menuActive === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setMenuActive(item.key)}
                className={`
                  group relative flex items-center gap-3 px-5 py-2.5 rounded-xl cursor-pointer
                  text-base font-normal transition-all w-full text-left
                  ${active
                    ? "bg-gradient-to-r from-sky-400/30 via-blue-400/10 to-blue-500/10 text-sky-700 shadow"
                    : "hover:bg-gradient-to-r hover:from-sky-100/80 hover:via-blue-50 hover:to-white text-gray-700"}
                `}
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                <span
                  className={`
                    absolute left-0 top-1/2 -translate-y-1/2 h-7 w-1 rounded-r-full
                    ${active ? "bg-gradient-to-b from-sky-400 via-blue-400 to-indigo-400 shadow-md" : "bg-transparent"}
                    transition-all
                  `}
                ></span>
                <Icon className={`w-5 h-5 flex-shrink-0 ${active ? "text-sky-600" : "text-gray-400 group-hover:text-sky-500"}`} />
                <span className={`${active ? "font-normal text-sky-700 drop-shadow" : ""}`}>{item.name}</span>
              </button>
            );
          })}
        </nav>
        {/* Logout Button */}
        <div className="px-4 pb-7 mt-auto">
          <button
            onClick={onLogout}
            disabled={loading}
            className={`
              flex items-center gap-3 px-5 py-2.5 rounded-xl w-full
              text-base font-normal text-red-600 bg-red-50/70
              hover:bg-gradient-to-r hover:from-red-200 hover:to-white
              transition-all shadow-sm border border-transparent hover:border-red-200
              ${loading && "opacity-50 pointer-events-none"}
            `}
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
          >
            <LogOut className="w-5 h-5" />
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-2xl bg-gradient-to-br from-white/30 via-blue-50/10 to-transparent blur-[1px] opacity-50 -z-10"></div>
      </aside>

      {/* MOBILE NAVBAR */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-blue-100 flex justify-around items-center h-16 shadow-[0_2px_18px_2px_rgba(56,189,248,0.09)]">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = menuActive === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setMenuActive(item.key)}
              className={`
                flex flex-col items-center justify-center gap-0.5 px-2 py-1.5
                text-xs font-medium transition-all duration-150
                relative
                ${active
                  ? "text-sky-600"
                  : "text-gray-400 hover:text-sky-500"}
              `}
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              <Icon className="w-6 h-6" />
              <span>{item.name}</span>
              {active && (
                <span className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-8 h-1 rounded-full bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 shadow-md"></span>
              )}
            </button>
          );
        })}
        {/* Logout Button */}
        <button
          onClick={onLogout}
          disabled={loading}
          className={`
            flex flex-col items-center justify-center gap-0.5 px-2 py-1.5
            text-xs font-normal text-red-600
            relative
            ${loading && "opacity-50 pointer-events-none"}
          `}
          style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
        >
          <LogOut className="w-6 h-6" />
          <span>{loading ? "..." : "Logout"}</span>
        </button>
      </nav>
    </>
  );
}
