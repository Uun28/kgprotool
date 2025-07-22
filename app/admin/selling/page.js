'use client';

import { useEffect, useState } from 'react';
import { FileText, Search, ArrowLeft, ArrowRight } from 'lucide-react';
import { API } from '@/lib/config';

export default function AdminSelling() {
  const [sales, setSales] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;
  const [loading, setLoading] = useState(false);

  function getSales() {
    setLoading(true);
    fetch(`${API}?mode=getpenjualan`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setSales(data.data || []);
        setLoading(false);
      });
  }
  useEffect(getSales, []);

  const filtered = sales.filter(
    s =>
      !search ||
      s.email?.toLowerCase().includes(search.toLowerCase()) ||
      s.seller?.toLowerCase().includes(search.toLowerCase()) ||
      s.licensed?.toLowerCase().includes(search.toLowerCase())
  );
  const totalPage = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="max-w-5xl mx-auto w-full py-10 px-2 md:px-0">
      <div className="flex items-center mb-8 gap-3">
        <div className="rounded-xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 p-2 shadow-md">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-normal bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 text-transparent bg-clip-text tracking-tight">
          Sales / License History
        </h2>
      </div>

      {/* Search */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 bg-white border border-blue-100 px-3 rounded-full shadow max-w-xs">
          <Search className="w-4 h-4 text-blue-300" />
          <input
            className="bg-transparent focus:outline-none p-2 w-full font-normal"
            placeholder="Search by email, seller, or license..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <span className="ml-2 text-xs text-gray-400 font-normal">
          Showing {filtered.length} sales
        </span>
      </div>

      <div className="w-full overflow-x-auto rounded-3xl shadow-2xl bg-gradient-to-br from-white via-blue-50 to-white border border-blue-100">
        <table className="w-full min-w-[700px] text-base font-normal border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="px-6 py-5 font-normal text-sky-700 bg-gradient-to-r from-sky-50 via-blue-50 to-white text-left border-b-2 border-blue-100 rounded-tl-3xl">ID</th>
              <th className="px-6 py-5 font-normal text-sky-700 bg-gradient-to-r from-sky-50 via-blue-50 to-white text-center border-b-2 border-blue-100">Seller</th>
              <th className="px-6 py-5 font-normal text-sky-700 bg-gradient-to-r from-sky-50 via-blue-50 to-white text-center border-b-2 border-blue-100">User (Email)</th>
              <th className="px-6 py-5 font-normal text-sky-700 bg-gradient-to-r from-sky-50 via-blue-50 to-white text-center border-b-2 border-blue-100">License</th>
              <th className="px-6 py-5 font-normal text-sky-700 bg-gradient-to-r from-sky-50 via-blue-50 to-white text-center border-b-2 border-blue-100 rounded-tr-3xl">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center text-gray-400 py-10">Loading...</td>
              </tr>
            ) : paginated.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-gray-400 py-14 bg-white/80 rounded-2xl">
                  No sales found.
                </td>
              </tr>
            ) : (
              paginated.map(s => (
                <tr key={s.id}
                  className="even:bg-blue-50/10 hover:bg-gradient-to-r hover:from-sky-50/80 hover:via-blue-50/70 hover:to-white/90 transition-all border-b border-blue-50 rounded-xl shadow-sm"
                  style={{ height: '56px' }}>
                  <td className="px-6 py-5 text-left">{s.id}</td>
                  <td className="px-6 py-5 text-center">{s.seller}</td>
                  <td className="px-6 py-5 text-center">{s.email}</td>
                  <td className="px-6 py-5 text-center capitalize">{s.licensed}</td>
                  <td className="px-6 py-5 text-center">{s.date || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPage > 1 && (
        <div className="flex gap-2 mt-6 justify-end items-center">
          <button
            disabled={page === 1}
            className="p-2 rounded-lg bg-blue-50 hover:bg-blue-200 disabled:bg-gray-100 transition text-blue-700"
            onClick={() => setPage(p => p - 1)}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="mx-2 font-normal text-gray-500">Page {page} of {totalPage}</span>
          <button
            disabled={page === totalPage}
            className="p-2 rounded-lg bg-blue-50 hover:bg-blue-200 disabled:bg-gray-100 transition text-blue-700"
            onClick={() => setPage(p => p + 1)}
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
