'use client';
import { useState, useEffect, useRef } from 'react';
import { BadgeCheck, Loader2, XCircle, ChevronDown, Check } from 'lucide-react';
import { API2 } from '@/lib/config';

export default function Activation() {
  const [email, setEmail] = useState('');
  const [packageMonth, setPackageMonth] = useState('');
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hargaLoading, setHargaLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalStatus, setModalStatus] = useState('success'); // success | error
  const [modalMsg, setModalMsg] = useState('');
  const [openSelect, setOpenSelect] = useState(false);
  const modalBgRef = useRef(null);

  useEffect(() => {
    async function fetchHarga() {
      setHargaLoading(true);
      const user = JSON.parse(localStorage.getItem('resellers') || '{}');
      if (!user || !user.role) {
        showModalMessage('Failed to get user role', 'error');
        setHargaLoading(false);
        return;
      }
      try {
        const res = await fetch(`${API2}?mode=getharga&role=${user.role}`);
        const data = await res.json();
        if (data.status === 'success') {
          const mapped = data.data.map(p => ({
            label: `${p.month} Month${p.month > 1 ? 's' : ''} - $${p.price}`,
            value: String(p.month),
            price: p.price,
            licensed: p.licensed
          }));
          setPackages(mapped);
          setPackageMonth(mapped[0]?.value || ''); 
        } else {
          showModalMessage('Failed to fetch license prices', 'error');
        }
      } catch (e) {
        showModalMessage('Server error fetching license prices!', 'error');
      }
      setHargaLoading(false);
    }
    fetchHarga();
  }, []);

 async function handleActivation(e) {
  e.preventDefault();
  setLoading(true);

  const user = JSON.parse(localStorage.getItem('resellers') || '{}');
  const selected = packages.find(p => p.value === packageMonth);

  const body = new URLSearchParams({
    email,
    month: packageMonth,         
    licensed: selected?.licensed, 
    seller: user.email
  }).toString();

  try {
    const res = await fetch(`${API2}?mode=addlicense`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body
    });

    const data = await res.json();

    if (data.status === 'success') {
      showModalMessage(
        `Activation successful for <b>${email}</b>`,
        'success'
      );
      setEmail('');
    } else {
      showModalMessage(data.message || 'Activation failed', 'error');
    }
  } catch {
    showModalMessage('Server error!', 'error');
  }

  setLoading(false);
}


  function handleSelectBlur() {
    setTimeout(() => setOpenSelect(false), 120);
  }

  function showModalMessage(message, status = 'success') {
    setModalMsg(message);
    setModalStatus(status);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 4000);
  }

  function closeModal() {
    setShowModal(false);
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

      {/* Form */}
      <form className="space-y-5 mt-4" onSubmit={handleActivation} autoComplete="off">
        <div>
          <label className="block text-sm mb-1 text-gray-600">User Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-white/60 placeholder-gray-400 text-gray-800 shadow-inner focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400 font-normal transition-all"
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
              shadow-inner focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400 font-normal transition-all
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
            <ChevronDown
              className={`w-5 h-5 ml-2 text-sky-500 transition-transform ${openSelect ? 'rotate-180' : ''}`}
            />
          </button>
          {openSelect && (
            <ul className="absolute left-0 right-0 mt-1 rounded-xl border border-blue-100 bg-white shadow-xl z-10 animate-fade-in max-h-48 overflow-auto">
              {packages.map(p => (
                <li key={p.value}>
                  <button
                    type="button"
                    className={`
                      w-full px-4 py-2.5 text-left rounded-xl flex items-center gap-2
                      ${
                        packageMonth === p.value
                          ? 'bg-sky-50 text-sky-700 font-semibold'
                          : 'hover:bg-sky-50 text-gray-700'
                      }
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

        {/* Submit */}
        <button
          type="submit"
          className={`
            w-full py-3 rounded-xl font-semibold shadow-xl transition-all
            bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 text-white
            hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2
            ${loading || hargaLoading ? 'opacity-60 cursor-not-allowed' : ''}
          `}
          disabled={loading || hargaLoading || !packages.length}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 text-white" />
              Processing...
            </>
          ) : (
            'Activate Now'
          )}
        </button>
      </form>

      {/* ✅ Universal Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm animate-fadein">
          {/* Icon Status */}
          <div
            className={`w-24 h-24 rounded-full flex items-center justify-center shadow-xl animate-iconpop mb-6 ${
              modalStatus === 'success'
                ? 'bg-gradient-to-br from-green-400 to-emerald-600'
                : 'bg-gradient-to-br from-red-400 to-rose-600'
            }`}
          >
            {modalStatus === 'success' ? (
              <BadgeCheck className="w-14 h-14 text-white drop-shadow-lg" />
            ) : (
              <XCircle className="w-14 h-14 text-white drop-shadow-lg" />
            )}
          </div>

          {/* Message */}
          <div
            className="text-center max-w-md px-6 text-white/90 text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: modalMsg }}
          />

          {/* Close Manual */}
          <button
            onClick={closeModal}
            className="mt-6 px-6 py-2 rounded-full text-white bg-white/10 border border-white/30 hover:bg-white/20 transition-all duration-200"
          >
            Close
          </button>

          {/* Glow */}
          <div
            className={`absolute bottom-20 w-60 h-60 rounded-full blur-3xl ${
              modalStatus === 'success' ? 'bg-green-500/30' : 'bg-rose-500/30'
            }`}
          />

          {/* Animasi */}
          <style jsx>{`
            @keyframes fadein {
              0% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
            }
            .animate-fadein {
              animation: fadein 0.3s ease-out forwards;
            }
            @keyframes iconpop {
              0% {
                transform: scale(0.6);
                opacity: 0;
              }
              70% {
                transform: scale(1.1);
                opacity: 1;
              }
              100% {
                transform: scale(1);
              }
            }
            .animate-iconpop {
              animation: iconpop 0.4s ease-out forwards;
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
