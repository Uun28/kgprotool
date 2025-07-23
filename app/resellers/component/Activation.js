'use client';
import { useState, useEffect, useRef } from 'react';
import { BadgeCheck, Loader2, XCircle, ChevronDown, Check } from 'lucide-react';
import { API2 } from '@/lib/config';

export default function Activation() {
  const [email, setEmail] = useState('');
  const [packageMonth, setPackageMonth] = useState('');
  const [packages, setPackages] = useState([]); // will be array of {label, value, price}
  const [loading, setLoading] = useState(false);
  const [hargaLoading, setHargaLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);
  const modalBgRef = useRef(null);

  // Ambil role dari localStorage user login
  useEffect(() => {
    async function fetchHarga() {
      setHargaLoading(true);
      const user = JSON.parse(localStorage.getItem('resellers') || '{}');
      if (!user || !user.role) {
        setError('Failed to get user role');
        setHargaLoading(false);
        return;
      }
      try {
        const res = await fetch(`${API2}?mode=getharga&role=${user.role}`);
        const data = await res.json();
        if (data.status === 'success') {
          // mapping for UI: label, value, price
          const mapped = data.data.map(p => ({
            label: `${p.month} Month${p.month > 1 ? 's' : ''} - $${p.price}`,
            value: String(p.month),
            price: p.price,
            licensed: p.licensed
          }));
          setPackages(mapped);
          setPackageMonth(mapped[0]?.value || ''); // default pilih paket pertama
        } else {
          setError('Failed to fetch license prices');
        }
      } catch (e) {
        setError('Server error fetching license prices!');
      }
      setHargaLoading(false);
    }
    fetchHarga();
  }, []);

  async function handleActivation(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    setShowModal(false);

    const user = JSON.parse(localStorage.getItem('resellers') || '{}');
    const selected = packages.find(p => p.value === packageMonth);

    try {
      const res = await fetch(`${API2}?mode=addlicense`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          email,
          month: packageMonth,
          licensed: selected?.licensed || '',
          seller: user.email
        }),
      });
      const data = await res.json();
      if (data.status === 'success') {
        setResult(data);
        setShowModal(true);
        setTimeout(() => setShowModal(false), 4000);
        setEmail('');
      } else setError(data.message || 'Activation failed');
    } catch {
      setError('Server error!');
    }
    setLoading(false);
  }

  function closeModal() {
    setShowModal(false);
  }

  function handleClickOutside(e) {
    if (modalBgRef.current && e.target === modalBgRef.current) setShowModal(false);
  }

  function handleSelectBlur(e) {
    setTimeout(() => setOpenSelect(false), 120);
  }

  return (
   <div className="max-w-xl mx-auto bg-white/80 rounded-3xl p-4 md:p-7 shadow-xl border border-blue-100 mt-6">
  {/* Header Premium */}
  <div className="flex items-center gap-4 mb-5">
    <div className="rounded-2xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 p-3 shadow">
      <BadgeCheck className="w-7 h-7 text-white drop-shadow" />
    </div>
    <h2 className="text-2xl md:text-3xl font-normal bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 text-transparent bg-clip-text tracking-tight">
      Activate / Renew License
    </h2>
  </div>
      <form className="space-y-5 mt-4" onSubmit={handleActivation} autoComplete="off">
        <div>
          <label className="block text-sm mb-1 text-gray-600">User Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-white/60 placeholder-gray-400 text-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 font-normal transition-all"
            placeholder="Enter user's email..."
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        {/* Custom Select */}
        <div className="relative" tabIndex={0} onBlur={handleSelectBlur}>
          <label className="block text-sm mb-1 text-gray-600">Select Package</label>
          <button
            type="button"
            disabled={loading || hargaLoading || !packages.length}
            onClick={() => setOpenSelect(!openSelect)}
            className={`
              w-full px-4 py-3 rounded-xl border border-blue-100 bg-white/60 text-gray-800 flex items-center justify-between
              shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 font-normal transition-all
              ${loading ? 'opacity-60 cursor-not-allowed' : ''}
            `}
          >
            {hargaLoading ? (
              <span className="flex items-center gap-2 text-gray-400">
                <Loader2 className="animate-spin h-5 w-5" /> Loading packages...
              </span>
            ) : (
              <span>
                {packages.find(p => p.value === packageMonth)?.label || 'Select package'}
              </span>
            )}
            <ChevronDown className={`w-5 h-5 ml-2 text-sky-500 transition-transform ${openSelect ? "rotate-180" : ""}`} />
          </button>
          {openSelect && (
            <ul
              className="absolute left-0 right-0 mt-1 rounded-xl border border-blue-100 bg-white shadow-xl z-10 animate-fade-in max-h-48 overflow-auto"
              style={{ minWidth: "100%" }}
            >
              {packages.map(p => (
                <li key={p.value}>
                  <button
                    type="button"
                    className={`
                      w-full px-4 py-2.5 text-left rounded-xl flex items-center gap-2
                      ${packageMonth === p.value
                        ? 'bg-sky-50 text-sky-700 font-semibold'
                        : 'hover:bg-sky-50 text-gray-700'}
                      transition-all
                    `}
                    onClick={() => {
                      setPackageMonth(p.value);
                      setOpenSelect(false);
                    }}
                  >
                    {p.label}
                    {packageMonth === p.value && <Check className="w-4 h-4 text-sky-500 ml-auto" />}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {error && (
          <div className="text-center text-red-700 bg-red-50 border border-red-200 rounded py-2 px-4 text-sm font-normal shadow-sm mt-1 transition-all duration-300 animate-fade-in">
            {error}
          </div>
        )}
        <button
          type="submit"
          className={`
            w-full py-3 rounded-xl font-semibold shadow-xl transition-all
            bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 text-white
            hover:scale-105 hover:shadow-2xl border-none outline-none ring-0 flex items-center justify-center gap-2
            ${loading || hargaLoading ? "opacity-60 cursor-not-allowed" : ""}
          `}
          disabled={loading || hargaLoading || !packages.length}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 text-white" />
              Processing...
            </>
          ) : (
            "Activate Now"
          )}
        </button>
      </form>

      {/* Success Modal */}
      {showModal && result && (
        <div
          ref={modalBgRef}
          onClick={handleClickOutside}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-all"
        >
          <div
            className="bg-white rounded-3xl shadow-2xl border border-green-200 px-5 md:px-10 py-8 max-w-sm w-[92vw] relative animate-fade-in animate-slide-up"
            style={{ animation: "fadeIn .25s, slideUp .3s" }}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-4 text-gray-400 hover:text-red-500"
              tabIndex={-1}
            >
              <XCircle className="w-6 h-6" />
            </button>
            <div className="flex flex-col items-center gap-3">
              <BadgeCheck className="w-14 h-14 text-green-500 drop-shadow-xl" />
              <div className="font-bold text-green-700 text-2xl mt-2 text-center">Activation Successful!</div>
              <div className="text-gray-700 text-center">
                <div>User Email: <b>{email}</b></div>
                <div>Package: <b>{packages.find(p => p.value === packageMonth)?.label}</b></div>
              </div>
              <div className="text-green-600 font-medium text-sm mt-2">This window will close automatically.</div>
            </div>
          </div>
          {/* Animations */}
          <style jsx>{`
            @keyframes fadeIn {0%{opacity:0} 100%{opacity:1}}
            @keyframes slideUp {0%{transform:translateY(32px);} 100%{transform:translateY(0);}}
          `}</style>
        </div>
      )}
    </div>
  );
}
