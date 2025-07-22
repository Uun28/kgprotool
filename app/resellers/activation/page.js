'use client';

import { useContext, useEffect, useState } from 'react';
import { API2 } from '@/lib/config';
import { CheckCircle, XCircle } from 'lucide-react';

const LICENSE_OPTIONS = [
  { value: '3month', label: '3 Months' },
  { value: '6month', label: '6 Months' },
  { value: '12month', label: '12 Months' }
];

export default function ActivationPage() {
  const { loginresellers } = useContext(LoginresellersContext);
  const [targetEmail, setTargetEmail] = useState('');
  const [license, setLicense] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [expired, setExpired] = useState(null);

  // Protect route (redirect to login if not logged in)
  useEffect(() => {
    if (typeof window !== "undefined" && !loginresellers) {
      window.location.href = "/resellers/login";
    }
  }, [loginresellers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    setExpired(null);
    setLoading(true);

    try {
      const res = await fetch(API2, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          mode: 'addlicense',
          seller: loginresellers?.email,
          licensed: license,
          month: license === "3month" ? 3 : license === "6month" ? 6 : 12,
          id: "", // adjust if your backend requires user ID instead of email
          email: targetEmail
        }).toString(),
      });
      const data = await res.json();
      if (data.status === 'success') {
        setSuccess('License activated successfully!');
        setExpired(data.expired);
      } else {
        setError(data.message || 'Activation failed!');
      }
    } catch (e) {
      setError('Server error');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-14 px-6 py-10 rounded-3xl bg-white/70 shadow-xl border border-blue-100">
      <h1 className="text-2xl md:text-3xl font-normal text-center mb-7 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 text-transparent bg-clip-text">
        User License Activation
      </h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm font-normal text-gray-600 mb-1 block">User Email</label>
          <input
            className="w-full px-4 py-3 rounded-xl border border-white/25 bg-white/40 placeholder-gray-400 text-gray-800 shadow-inner focus:outline-none focus:ring-1 focus:ring-sky-400 font-normal transition-all"
            type="email"
            value={targetEmail}
            onChange={e => setTargetEmail(e.target.value)}
            placeholder="Enter user email to activate"
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="text-sm font-normal text-gray-600 mb-1 block">Select License Package</label>
          <select
            className="w-full px-4 py-3 rounded-xl border border-white/25 bg-white/40 text-gray-800 shadow-inner focus:outline-none focus:ring-1 focus:ring-sky-400 font-normal transition-all"
            value={license}
            onChange={e => setLicense(e.target.value)}
            required
            disabled={loading}
          >
            <option value="" disabled>Select license...</option>
            {LICENSE_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {success && (
          <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded py-2 px-4 text-sm font-normal shadow-sm">
            <CheckCircle className="w-5 h-5" /> {success}
            {expired && <span className="ml-2">Expired on: <b>{expired}</b></span>}
          </div>
        )}
        {error && (
          <div className="flex items-center gap-2 text-red-700 bg-white/90 border border-red-200 rounded py-2 px-4 text-sm font-normal shadow-sm">
            <XCircle className="w-5 h-5" /> {error}
          </div>
        )}

        <button
          type="submit"
          className={`w-full py-3 rounded-xl font-normal shadow-xl transition-all duration-150 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 text-white hover:scale-105 hover:shadow-2xl border-none outline-none ring-0 flex items-center justify-center gap-2 ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? "Processing..." : "Activate License"}
        </button>
      </form>
    </div>
  );
}
