'use client';

import { useEffect, useState,useContext } from 'react';
import { FileText, Search, ArrowLeft, ArrowRight } from 'lucide-react';
import { API2 } from '@/lib/config';

const licenseColors = {
  "3month": "bg-sky-100 text-sky-600 border-sky-200",
  "6month": "bg-green-100 text-green-700 border-green-200",
  "12month": "bg-purple-100 text-purple-700 border-purple-200",
  "": "bg-gray-100 text-gray-400 border-gray-200",
};

function formatDate(d) {
  if (!d) return "-";
  const date = new Date(d);
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export default function AdminSelling() {
  const [sales, setSales] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;
  const [loading, setLoading] = useState(false);
  const { loginresellers } = useContext(LoginresellersContext);

  useEffect(() => {
    setLoading(true);
    fetch(`${API2}?mode=getpenjualan?email=${loginresellers?.email}`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setSales(data.data || []);
        setLoading(false);
      });
  }, []);

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
    <div className="max-w-5xl mx-auto w-full py-8 px-2 sm:px-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="rounded-2xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 p-3 shadow-lg">
          <FileText className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-2xl md:text-3xl font-normal bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 text-transparent bg-clip-text tracking-tight">
          Sales / License History
        </h2>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-7">
        <div className="flex items-center gap-2 bg-white border border-blue-100 px-4 py-2 rounded-full shadow w-full max-w-xs">
          <Search className="w-5 h-5 text-blue-300" />
          <input
            className="bg-transparent focus:outline-none w-full font-normal text-sm"
            placeholder="Search by email, seller, or license..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <span className="text-xs text-gray-400 ml-0 sm:ml-2">Showing {filtered.length} sales</span>
      </div>

      {/* Table Desktop */}
      <div className="hidden sm:block w-full overflow-x-auto rounded-2xl shadow border border-blue-100 bg-white/80 backdrop-blur-xl">
        <table className="w-full min-w-[700px] font-normal border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="px-4 py-3 text-xs font-normal text-gray-600 text-left bg-white/95 border-b border-blue-100 rounded-tl-2xl w-48">
                Seller
              </th>
              <th className="px-4 py-3 text-xs font-normal text-gray-600 text-left bg-white/95 border-b border-blue-100 w-56">
                User (Email)
              </th>
              <th className="px-4 py-3 text-xs font-normal text-gray-600 text-left bg-white/95 border-b border-blue-100 w-36">
                License
              </th>
              <th className="px-4 py-3 text-xs font-normal text-gray-600 text-right bg-white/95 border-b border-blue-100 rounded-tr-2xl w-36">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="py-14 text-center bg-white/90 rounded-b-2xl">
                  <div className="flex flex-col items-center gap-2 animate-pulse">
                    <div className="w-8 h-8 rounded-full border-4 border-sky-300 border-t-transparent animate-spin"></div>
                    <span className="text-base text-sky-400 font-normal">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : paginated.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-14 text-center bg-white/90 rounded-b-2xl">
                  <span className="text-lg font-normal text-sky-300/70 opacity-70">No sales found.</span>
                </td>
              </tr>
            ) : (
              paginated.map((s, idx) => (
                <tr key={s.id} className="group border-b border-blue-50 last:border-b-0 hover:bg-blue-50/40 transition">
                  {/* Seller */}
                  <td className="px-4 py-4 align-middle font-normal text-gray-700 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 font-normal text-base border border-blue-200">
                        {s.seller?.[0]?.toUpperCase() || "S"}
                      </div>
                      <span className="break-all">{s.seller || '-'}</span>
                    </div>
                  </td>
                  {/* Email */}
                  <td className="px-4 py-4 align-middle font-normal text-gray-700 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-sky-100 text-sky-700 font-normal text-base border border-blue-200">
                        {s.email?.[0]?.toUpperCase() || "U"}
                      </div>
                      <span className="break-all">{s.email || '-'}</span>
                    </div>
                  </td>
                  {/* License */}
                  <td className="px-4 py-4 align-middle text-left">
                    <span className={`
                      px-4 py-1.5 rounded-full text-xs font-normal border shadow-sm
                      ${licenseColors[s.licensed] || licenseColors[""]}
                      ring-1 ring-blue-100 select-none
                    `}>
                      {s.licensed}
                    </span>
                  </td>
                  {/* Date */}
                  <td className="px-4 py-4 align-middle text-right text-gray-500 font-normal whitespace-nowrap">
                    {formatDate(s.date)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Card Mobile */}
      <div className="sm:hidden flex flex-col gap-4">
      {loading ? (
        <div className="py-10 flex flex-col items-center gap-2 animate-pulse">
          <div className="w-8 h-8 rounded-full border-4 border-sky-300 border-t-transparent animate-spin"></div>
          <span className="text-base text-sky-400 font-normal">Loading...</span>
        </div>
      ) : paginated.length === 0 ? (
        <div className="py-10 bg-white/90 rounded-2xl text-center shadow">
          <span className="text-lg font-normal text-sky-300/70 opacity-70">No sales found.</span>
        </div>
      ) : (
        paginated.map(s => (
          <div key={s.id} className="rounded-2xl border border-blue-100 bg-white/90 shadow px-4 py-3 flex flex-col gap-2">
            {/* Seller */}
            <div>
              <span className="text-[12px] font-normal text-blue-400 block mb-1">Seller</span>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 font-normal text-base border border-blue-200">
                  {s.seller?.[0]?.toUpperCase() || "S"}
                </div>
                <span className="break-all font-normal">{s.seller || '-'}</span>
              </div>
            </div>
            {/* Email */}
            <div>
              <span className="text-[12px] font-normal text-blue-400 block mb-1">Email</span>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-sky-100 text-sky-700 font-normal text-base border border-blue-200">
                  {s.email?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="break-all">{s.email || '-'}</span>
              </div>
            </div>
            {/* License */}
            <div className="flex items-center gap-3 mt-1">
              <span className="font-normal text-gray-500 w-20">License</span>
              <span className={`
                px-4 py-1.5 rounded-full text-xs font-normal border shadow-sm
                ${licenseColors[s.licensed] || licenseColors[""]}
                ring-1 ring-blue-100 select-none
              `}>
                {s.licensed}
              </span>
            </div>
            {/* Date */}
            <div className="flex items-center gap-3">
              <span className="font-normal text-gray-500 w-20">Date</span>
              <span className="text-gray-700">{formatDate(s.date)}</span>
            </div>
          </div>
        ))
      )}
    </div>


      {/* Pagination */}
      {totalPage > 1 && (
        <div className="flex gap-2 mt-8 justify-end items-center sticky bottom-0 bg-transparent">
          <button
            disabled={page === 1}
            className="p-2 rounded-lg bg-blue-50 hover:bg-blue-200 disabled:bg-gray-100 transition text-blue-700"
            onClick={() => setPage(p => p - 1)}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="mx-2 text-gray-500 font-normal">Page {page} of {totalPage}</span>
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
