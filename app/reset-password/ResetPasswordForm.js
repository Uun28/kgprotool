'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get('token');

  useEffect(() => {
    if (!token) {
      router.replace('/');
    }
  }, [token, router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg('Processing...');
    const res = await fetch('/api/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json();
    setMsg(data.message);
    setLoading(false);
  }

  if (!token) return null;

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md px-8 py-10 flex flex-col gap-7 rounded-3xl border border-white/30 shadow-[0_8px_40px_4px_rgba(47,62,120,0.14)] bg-white/20 backdrop-blur-xl before:content-[''] before:absolute before:inset-0 before:rounded-3xl before:pointer-events-none before:border-[3px] before:border-transparent before:transition-[border] before:duration-500 before:hover:border-sky-400/70 before:hover:border-[3px] overflow-hidden"
        style={{
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.13), 0 1.5px 20px 0 rgba(56,189,248,0.13)",
        }}
      >
        <div className="flex justify-center mb-2">
          <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl border-4 border-white/40">
            <img src="/KGPro.ico" alt="KGPROTOOL Logo" className="w-10 h-10" />
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-normal text-center tracking-tight bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 text-transparent bg-clip-text" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
          Reset Password
        </h1>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-normal text-gray-600 pl-1">New Password</label>
          <input
            className="w-full px-4 py-3 rounded-xl border border-white/25 bg-white/40 placeholder-gray-400 text-gray-800 shadow-inner focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400 font-normal transition-all"
            type="password"
            placeholder="Enter your new password"
            minLength={6}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            disabled={loading}
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
          />
        </div>

        {msg && (
          <div className={`text-center ${msg.toLowerCase().includes('success') ? 'text-green-700 border-green-200 bg-green-50' : 'text-red-700 border-red-200 bg-white/90'} border rounded py-2 px-4 text-sm font-normal shadow-sm mt-1 transition-all duration-300 animate-fade-in`}>
            {msg}
          </div>
        )}

        <button
          type="submit"
          className={`w-full py-3 rounded-xl font-normal shadow-xl transition-all duration-150 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 text-white hover:scale-105 hover:shadow-2xl border-none outline-none ring-0 flex items-center justify-center gap-2 ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
          disabled={loading}
          style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Save New Password
            </>
          )}
        </button>
      </form>
    </div>
  );
}
