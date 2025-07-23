'use client';
import { useEffect, useState } from 'react';
import { User2, Wallet2 } from 'lucide-react';

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('resellers');
    console.log(data);
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  if (!user) return null;

  return (
    <nav className="h-16 px-2 md:px-6 flex items-center border-b border-blue-100 bg-gradient-to-r from-white/80 via-sky-50 to-white/70 backdrop-blur-xl justify-between select-none shadow-sm">
      {/* Kiri: Avatar dan Email */}
      <div className="flex items-center gap-3 md:gap-4 min-w-0">
        {/* Avatar */}
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-tr from-sky-400/80 via-blue-200/40 to-white flex items-center justify-center shadow-lg border-2 border-white">
          <User2 className="text-blue-600 w-6 h-6 md:w-7 md:h-7" />
        </div>
        {/* Email */}
        <div className="truncate">
          <div className="text-[11px] md:text-[13px] text-gray-400 leading-tight truncate">Reseller Login</div>
          <div className="font-semibold text-sky-700 text-xs md:text-base truncate max-w-[150px] md:max-w-xs">{user.email}</div>
        </div>
      </div>
      {/* Kanan: Balance */}
      <div className="flex items-center gap-1 md:gap-2 px-2 py-1 md:px-3 md:py-2 rounded-lg md:rounded-xl bg-white/80 border border-blue-100 shadow-inner min-w-0">
        <Wallet2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
        <span className="hidden sm:inline text-gray-600 text-xs md:text-sm font-normal">Balance</span>
        <span className="text-base font-semibold text-blue-600">
        {user.balance
          ? `$${parseFloat(user.balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
          : "$0.00"}
      </span>
      </div>
    </nav>
  );
}
