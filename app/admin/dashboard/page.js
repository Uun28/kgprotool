'use client';

import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://minangkabau-gsm.store/a2dwcm90b29sdXVuZ2FudGVuZzI4MzE=/api-admin.php?mode=totalsales', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setStats(data);
        } else {
          setError(data.message || 'Gagal mengambil data');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Server error');
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto w-full">
      <h1 className="text-2xl md:text-3xl font-semibold mb-7 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 text-transparent bg-clip-text">
        Admin Dashboard
      </h1>
      {loading ? (
        <div className="text-center py-20">Loading...</div>
      ) : error ? (
        <div className="text-red-600 bg-white/80 border border-red-200 rounded p-4 mb-4">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-8">
          <div className="rounded-2xl p-6 bg-white/80 shadow-md flex flex-col items-center text-center">
            <div className="text-xl font-semibold text-sky-700">Total Transaksi</div>
            <div className="text-3xl font-bold mt-1">{stats.total_transaction}</div>
          </div>
          <div className="rounded-2xl p-6 bg-white/80 shadow-md flex flex-col items-center text-center">
            <div className="text-xl font-semibold text-sky-700">Sales 3 Bulan</div>
            <div className="text-3xl font-bold mt-1">{stats.sales['3month']}</div>
          </div>
          <div className="rounded-2xl p-6 bg-white/80 shadow-md flex flex-col items-center text-center">
            <div className="text-xl font-semibold text-sky-700">Sales 6/12 Bulan</div>
            <div className="text-xl font-bold mt-1">6 Bulan: {stats.sales['6month']}</div>
            <div className="text-xl font-bold mt-1">12 Bulan: {stats.sales['12month']}</div>
          </div>
        </div>
      )}

      {/* Tabel penjualan terakhir (dummy) */}
      {/* Nanti tinggal fetch API penjualan, tampilkan di sini */}
      {/* <div className="bg-white/80 rounded-2xl shadow p-6 mt-8">
        <div className="text-lg font-semibold mb-2 text-sky-700">Penjualan Terakhir</div>
        ...table penjualan...
      </div> */}
    </div>
  );
}
