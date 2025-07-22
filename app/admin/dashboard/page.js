'use client';

import { useEffect, useState, useMemo } from 'react';
import {
  Users, Wallet, UserCheck, Ban, Gem, Timer, BarChart
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart as BarChartRe,
  Bar, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';
import { API } from '@/lib/config';

function Shimmer({ className = '' }) {
  return (
    <div className={`bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse ${className}`} />
  );
}

function StatCard({ icon, label, value, color, iconBg }) {
  return (
    <div className={`
      group relative rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center shadow-xl border
      bg-white/70 border-slate-200 backdrop-blur-lg
      hover:scale-105 hover:shadow-2xl transition-all duration-300
      ${color}
    `}>
      <div className={`flex items-center justify-center rounded-full p-2 mb-2 shadow-md ${iconBg}`}>
        {icon}
      </div>
      <div className="text-xs sm:text-sm font-normal text-slate-600">{label}</div>
      <div className="text-2xl font-normal text-slate-800 mt-1 tracking-tight drop-shadow bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-500 bg-clip-text text-transparent">
        {value}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSales, setLoadingSales] = useState(true);
  const [error, setError] = useState('');
  const [errorSales, setErrorSales] = useState('');

  useEffect(() => {
    fetch(`${API}?mode=getuser`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') setUsers(data.data);
        else setError(data.message || 'Failed to fetch users');
        setLoading(false);
      })
      .catch(() => {
        setError('Server error');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(`${API}?mode=getpenjualan`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') setSales(data.data);
        else setErrorSales(data.message || 'Failed to fetch sales');
        setLoadingSales(false);
      })
      .catch(() => {
        setErrorSales('Server error');
        setLoadingSales(false);
      });
  }, []);


  const today = new Date();
  function monthYearKey(dt) {
    const d = new Date(dt);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  }

  const totalUser = users.length;
  const adminUser = users.filter(u => u.role === 'admin').length;
  const resellerUser = users.filter(u => u.role === 'resellers').length;
  const activeUser = users.filter(u => u.status === 'active').length;
  const expiredUser = users.filter(u => u.status === 'expired').length;
  const bannedUser = users.filter(u => u.status === 'banned').length;
  const nolicenseUser = users.filter(u => u.status === 'nolicense').length;

  const priceMap = { '3month': 25, '6month': 35, '12month': 40 };
  const totalIncome = sales.reduce((sum, row) => sum + (priceMap[row.licensed] || 0), 0);

  const salesPerMonth = useMemo(() => {
    const result = {};
    for (let i = 11; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      result[monthYearKey(d)] = {
        month: d.toLocaleString('default', { month: 'short', year: '2-digit' }),
        total: 0, income: 0
      };
    }
    sales.forEach(s => {
      if (!s.tanggal) return;
      const key = monthYearKey(s.tanggal);
      if (result[key]) {
        result[key].total++;
        result[key].income += priceMap[s.licensed] || 0;
      }
    });
    return Object.values(result);
  }, [sales]);

  const topSeller = useMemo(() => {
    const bySeller = {};
    sales.forEach(s => {
      if (!bySeller[s.seller]) bySeller[s.seller] = 0;
      bySeller[s.seller]++;
    });
    const arr = Object.entries(bySeller).map(([seller, count]) => ({ seller, count }));
    arr.sort((a, b) => b.count - a.count);
    return arr.slice(0, 3);
  }, [sales]);

  const latestSales = sales.slice(0, 10);

  return (
    <div className="max-w-7xl mx-auto w-full px-2 sm:px-6 md:px-8 py-8">
      <h1 className="
        text-4xl md:text-5xl font-normal text-center mb-8 tracking-tight
        bg-gradient-to-br from-blue-700 via-sky-500 to-indigo-600 text-transparent bg-clip-text drop-shadow-xl
      ">
        Dashboard
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 gap-3 md:gap-5 mb-12">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) =>
            <div key={i} className="rounded-2xl h-24 sm:h-28 bg-white/70 shadow-lg border border-slate-100">
              <Shimmer className="w-full h-full rounded-2xl" />
            </div>
          )
        ) : (
          <>
            <StatCard icon={<Users className="w-6 h-6" />} label="Total Users" value={totalUser} color="bg-gradient-to-tr from-blue-50 to-white" iconBg="bg-blue-200/50" />
            <StatCard icon={<UserCheck className="w-6 h-6" />} label="Admin" value={adminUser} color="bg-gradient-to-tr from-indigo-50 to-white" iconBg="bg-indigo-200/50" />
            <StatCard icon={<Gem className="w-6 h-6" />} label="Resellers" value={resellerUser} color="bg-gradient-to-tr from-pink-50 to-white" iconBg="bg-pink-200/50" />
            <StatCard icon={<UserCheck className="w-6 h-6" />} label="Active" value={activeUser} color="bg-gradient-to-tr from-green-50 to-white" iconBg="bg-green-200/50" />
            <StatCard icon={<Timer className="w-6 h-6" />} label="Expired" value={expiredUser} color="bg-gradient-to-tr from-yellow-50 to-white" iconBg="bg-yellow-200/50" />
            <StatCard icon={<Gem className="w-6 h-6" />} label="No License" value={nolicenseUser} color="bg-gradient-to-tr from-slate-50 to-white" iconBg="bg-slate-200/50" />
            <StatCard icon={<Ban className="w-6 h-6" />} label="Banned" value={bannedUser} color="bg-gradient-to-tr from-red-50 to-white" iconBg="bg-red-200/50" />
            <StatCard icon={<Wallet className="w-6 h-6" />} label="Income" value={`$${totalIncome.toLocaleString()}`} color="bg-gradient-to-tr from-emerald-50 to-white" iconBg="bg-emerald-200/50" />
          </>
        )}
      </div>

      <div className="
        bg-white/70 rounded-3xl p-7 shadow-xl border border-blue-100 mb-10
        backdrop-blur-[2px] flex flex-col
      ">
        <div className="text-base font-normal text-blue-800 mb-2 flex items-center gap-2">
          <BarChart className="w-5 h-5 text-sky-500" /> Sales per Month <span className="font-normal text-slate-500 text-xs">(12mo)</span>
        </div>
        {loadingSales ? (
          <div className="flex h-32 items-center justify-center">
            <Shimmer className="w-full h-24 rounded-lg" />
          </div>
        ) : errorSales ? (
          <div className="text-red-500 text-sm">{errorSales}</div>
        ) : (
          <ResponsiveContainer width="100%" height={170}>
            <BarChartRe data={salesPerMonth}>
              <CartesianGrid strokeDasharray="2 2" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 13, fill: "#64748b" }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 13, fill: "#64748b" }} />
              <Tooltip contentStyle={{ borderRadius: 12, fontSize: 14 }} />
              <Bar dataKey="income" fill="#38bdf8" radius={[8, 8, 0, 0]} />
            </BarChartRe>
          </ResponsiveContainer>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-8">
        <div className="bg-white/90 rounded-3xl shadow-xl border border-blue-100 p-7 flex flex-col">
          <div className="text-base font-normal mb-3 text-blue-700 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-sky-400" /> Top Seller
          </div>
          {loadingSales ? (
            <div className="py-5"><Shimmer className="h-8 w-full rounded" /></div>
          ) : topSeller.length === 0 ? (
            <div className="py-5 text-gray-400 font-normal">No data available.</div>
          ) : (
            <div className="flex flex-col gap-2">
              {topSeller.map((r, i) => (
                <div key={r.seller} className="flex items-center gap-4 font-normal">
                  <span className={`
                    w-8 h-8 rounded-full flex items-center justify-center font-normal text-white
                    text-base shadow ${i === 0 ? 'bg-gradient-to-br from-amber-400 to-yellow-300'
                    : i === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-200'
                    : 'bg-gradient-to-br from-yellow-800 to-yellow-500'}
                  `}>
                    {i + 1}
                  </span>
                  <span className="flex-1 truncate">{r.seller || <span className="text-gray-400">(no name)</span>}</span>
                  <span className="text-blue-500">{r.count} sales</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-white/90 rounded-3xl shadow-xl border border-blue-100 p-7 flex flex-col">
          <div className="flex items-center mb-3 gap-2">
            <Gem className="w-5 h-5 text-pink-400" />
            <span className="text-base font-normal text-blue-700">Recent Sales</span>
          </div>
          <div className="overflow-x-auto rounded-xl border border-blue-50">
            <table className="w-full text-sm font-normal">
              <thead className="sticky top-0 z-10">
                <tr className="bg-gradient-to-r from-sky-50 via-blue-50 to-white">
                  <th className="p-2 text-sky-700 text-left">Seller</th>
                  <th className="p-2 text-sky-700 text-left">Email</th>
                  <th className="p-2 text-sky-700 text-left">License</th>
                  <th className="p-2 text-sky-700 text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                {loadingSales ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <tr key={i}>
                      <td colSpan={4} className="py-5"><Shimmer className="h-5 w-full rounded" /></td>
                    </tr>
                  ))
                ) : latestSales.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-5 text-center text-gray-400">No data found.</td>
                  </tr>
                ) : (
                  latestSales.map((row, i) => (
                    <tr key={row.id} className="even:bg-blue-50/40 hover:bg-blue-100/60 transition-colors">
                      <td className="p-2">{row.seller}</td>
                      <td className="p-2">{row.email}</td>
                      <td className="p-2">{row.licensed}</td>
                      <td className="p-2">${priceMap[row.licensed] || 0}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className="mt-2 text-xs text-gray-400 font-normal">Showing 10 latest data</div>
          </div>
        </div>
      </div>
    </div>
  );
}
