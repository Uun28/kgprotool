'use client';

import { useEffect, useState, useMemo } from 'react';
import { Users, Wallet, UserCheck, Ban, Gem, Timer, BarChart } from "lucide-react";
import { ResponsiveContainer, BarChart as BarChartRe, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSales, setLoadingSales] = useState(true);
  const [error, setError] = useState('');
  const [errorSales, setErrorSales] = useState('');

  useEffect(() => {
    fetch('https://minangkabau-gsm.store/a2dwcm90b29sdXVuZ2FudGVuZzI4MzE=/api-admin.php?mode=getuser', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
                console.log("API getuser response:", data);   // <<--- LIHAT DI CONSOLE
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
    fetch('https://minangkabau-gsm.store/a2dwcm90b29sdXVuZ2FudGVuZzI4MzE=/api-admin.php?mode=getpenjualan', { credentials: 'include' })
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
      result[monthYearKey(d)] = { month: d.toLocaleString('default', { month: 'short', year: '2-digit' }), total: 0, income: 0 };
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

  const topSeller = (() => {
    const bySeller = {};
    sales.forEach(s => {
      if (!bySeller[s.seller]) bySeller[s.seller] = 0;
      bySeller[s.seller]++;
    });
    const arr = Object.entries(bySeller).map(([seller, count]) => ({ seller, count }));
    arr.sort((a, b) => b.count - a.count);
    return arr.slice(0, 3);
  })();

  const latestSales = sales.slice(0, 10);

  return (
    <div className="max-w-7xl mx-auto w-full px-2 md:px-0">
      <h1 className="text-4xl md:text-5xl font-normal mb-8 text-center bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 text-transparent bg-clip-text drop-shadow-xl tracking-tight">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-5 mb-8">
        <StatCard icon={<Users className="w-7 h-7 text-blue-600" />} label="Total Users" value={totalUser} color="from-blue-200 via-blue-100 to-white" />
        <StatCard icon={<UserCheck className="w-7 h-7 text-green-500" />} label="Active Users" value={activeUser} color="from-green-100 via-green-50 to-white" />
        <StatCard icon={<Timer className="w-7 h-7 text-yellow-400" />} label="Expired Users" value={expiredUser} color="from-yellow-100 via-yellow-50 to-white" />
        <StatCard icon={<Gem className="w-7 h-7 text-gray-400" />} label="No License Users" value={nolicenseUser} color="from-slate-100 via-slate-50 to-white" />
        <StatCard icon={<Ban className="w-7 h-7 text-red-500" />} label="Banned Users" value={bannedUser} color="from-rose-100 via-red-50 to-white" />
        <StatCard icon={<Wallet className="w-7 h-7 text-green-700" />} label="Total Income" value={`$${totalIncome.toLocaleString()}`} color="from-emerald-100 via-green-50 to-white" />
      </div>

      <div className="bg-white/70 rounded-3xl p-6 shadow-xl border border-blue-100 mb-8">
        <div className="text-base font-normal text-blue-800 mb-2 flex items-center gap-2">
          <BarChart className="w-5 h-5 text-blue-400" /> Sales per Month (last 12 months)
        </div>
        <ResponsiveContainer width="100%" height={140}>
          <BarChartRe data={salesPerMonth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="income" fill="#38bdf8" />
          </BarChartRe>
        </ResponsiveContainer>
      </div>

      <div className="bg-white/80 rounded-3xl shadow-xl border border-blue-100 p-6 mb-8">
        <div className="text-base font-normal mb-3 text-blue-700 flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-sky-400" /> Top Seller
        </div>
        {topSeller.length === 0 ? (
          <div className="py-4 text-gray-500 font-normal">No data available.</div>
        ) : (
          <div className="flex flex-col gap-2">
            {topSeller.map((r, i) => (
              <div key={r.seller} className="flex items-center gap-3 font-normal">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-white ${i === 0 ? 'bg-gradient-to-r from-amber-400 to-yellow-300' : i === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-300' : 'bg-gradient-to-r from-yellow-800 to-yellow-600'}`}>{i + 1}</span>
                <span className="flex-1">{r.seller || <span className="text-gray-400">(no name)</span>}</span>
                <span className="text-blue-500">{r.count} sales</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white/90 rounded-3xl shadow-xl border border-blue-100 p-7 mb-12">
        <div className="flex items-center mb-2 gap-2">
          <Gem className="w-5 h-5 text-sky-400" />
          <span className="text-base font-normal">Recent Sales</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm rounded-xl overflow-hidden shadow border border-blue-50 font-normal">
            <thead>
              <tr className="bg-gradient-to-r from-sky-50 via-blue-50 to-white">
                <th className="p-2 font-normal text-sky-700 text-left">Seller</th>
                <th className="p-2 font-normal text-sky-700 text-left">Email</th>
                <th className="p-2 font-normal text-sky-700 text-left">License</th>
                <th className="p-2 font-normal text-sky-700 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {latestSales.map((row, i) => (
                <tr key={row.id} className="even:bg-blue-50/40 hover:bg-blue-100/60 transition">
                  <td className="p-2 font-normal">{row.seller}</td>
                  <td className="p-2 font-normal">{row.email}</td>
                  <td className="p-2 font-normal">{row.licensed}</td>
                  <td className="p-2 font-normal">${priceMap[row.licensed] || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-2 text-xs text-gray-400 font-normal">Showing 10 latest data</div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div
      className={`
        relative rounded-3xl p-6 shadow-xl border border-blue-100 bg-white/70 backdrop-blur-lg
        flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.04] hover:shadow-2xl
        bg-gradient-to-tr ${color}
      `}
    >
      <div className="mb-2">{icon}</div>
      <div className="text-base font-normal text-slate-800">{label}</div>
      <div className="text-2xl md:text-3xl font-normal tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-500 mb-1">{value}</div>
    </div>
  );
}
