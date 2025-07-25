'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { API2 } from '@/lib/config';

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [role, setRole] = useState('resellers');
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const dropdownRef = useRef(null);

  const handleInput = (setter) => (e) => {
    setter(e.target.value);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (mode === 'register' && password !== verifyPassword) {
      setError('Passwords do not match!');
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('mode', mode === 'login' ? 'login' : 'register');
      params.append('email', email);
      params.append('password', password);
      if (mode === 'register') params.append('role', role);

      const res = await fetch(API2, {
        method: 'POST',
        credentials: mode === 'login' ? 'include' : 'omit',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      const data = await res.json();
      if (data.status === 'success') {
        if (mode === 'login') {
          localStorage.setItem('resellers', JSON.stringify(data.user));
          router.replace('/resellers/dashboard');
        } else {
          setSuccess('Registration Successfully');
          setTimeout(() => setMode('login'), 2000);
        }
      } else {
        setError(data.message || (mode === 'login' ? 'Login failed!' : 'Registration failed!'));
      }
    } catch {
      setError('Server error!');
    }
    setLoading(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowRoleMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-gradient-to-br from-blue-100 via-white to-sky-200">
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md p-8 flex flex-col gap-6 rounded-3xl border border-white/40 shadow-2xl bg-white/30 backdrop-blur-xl animate-fade-in font-normal"
      >
        {/* Toggle Tabs */}
        <div className="flex justify-center mb-6">
          <div className="flex w-full max-w-sm rounded-2xl bg-white/50 backdrop-blur-md shadow-inner p-1">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-2.5 rounded-xl text-center text-sm transition-all duration-300 ${
                mode === 'login'
                  ? 'bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 text-white shadow-md scale-[1.02]'
                  : 'text-blue-700 hover:bg-blue-50'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`flex-1 py-2.5 rounded-xl text-center text-sm transition-all duration-300 ${
                mode === 'register'
                  ? 'bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 text-white shadow-md scale-[1.02]'
                  : 'text-blue-700 hover:bg-blue-50'
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-1">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl bg-gradient-to-br from-white/60 to-white/20 backdrop-blur-sm border border-white/50">
            <img src="/KGPro.ico" alt="KGPROTOOL Logo" className="w-10 h-10 drop-shadow" />
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl text-center tracking-tight bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 text-transparent bg-clip-text font-normal">
          {mode === 'login' ? 'Resellers Panel' : 'Create Account'}
        </h1>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-700 pl-1 font-normal">Email</label>
          <input
            className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/60 placeholder-gray-400 text-gray-900 shadow-inner focus:outline-none focus:ring-1 focus:ring-sky-400 transition-all backdrop-blur-sm font-normal"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={handleInput(setEmail)}
            autoFocus
            required
            disabled={loading}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-700 pl-1 font-normal">Password</label>
          <input
            className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/60 placeholder-gray-400 text-gray-900 shadow-inner focus:outline-none focus:ring-1 focus:ring-sky-400 transition-all backdrop-blur-sm font-normal"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={handleInput(setPassword)}
            required
            disabled={loading}
          />
        </div>

        {/* Extra fields for Register */}
        {mode === 'register' && (
          <>
            {/* Verify Password */}
            <div className="flex flex-col gap-1 animate-fade-in">
              <label className="text-xs text-gray-700 pl-1 font-normal">Verify Password</label>
              <input
                className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/60 placeholder-gray-400 text-gray-900 shadow-inner focus:outline-none focus:ring-1 focus:ring-sky-400 transition-all backdrop-blur-sm font-normal"
                type="password"
                placeholder="Re-enter Password"
                value={verifyPassword}
                onChange={handleInput(setVerifyPassword)}
                required
                disabled={loading}
              />
            </div>

            {/* Custom Dropdown Role */}
            <div className="flex flex-col gap-1 relative animate-fade-in" ref={dropdownRef}>
              <label className="text-xs text-gray-700 pl-1 font-normal">Role</label>
              <div
                className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/60 text-gray-900 shadow-inner flex justify-between items-center cursor-pointer hover:bg-white/80 transition-all font-normal"
                onClick={() => setShowRoleMenu(!showRoleMenu)}
              >
                <span>{role === 'resellers' ? 'Resellers' : 'Distributors'}</span>
                <svg
                  className={`w-5 h-5 text-blue-500 transition-transform ${
                    showRoleMenu ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>

              {showRoleMenu && (
                <div className="absolute mt-2 w-full bg-white rounded-xl shadow-xl border border-blue-100 z-50 overflow-hidden transition-all duration-200 ease-out">
                  <div
                    className={`px-4 py-2 hover:bg-blue-50 cursor-pointer ${
                      role === 'resellers' ? 'bg-blue-100' : ''
                    } font-normal`}
                    onClick={() => {
                      setRole('resellers');
                      setShowRoleMenu(false);
                    }}
                  >
                    Resellers
                  </div>
                  <div
                    className={`px-4 py-2 hover:bg-blue-50 cursor-pointer ${
                      role === 'distributors' ? 'bg-blue-100' : ''
                    } font-normal`}
                    onClick={() => {
                      setRole('distributors');
                      setShowRoleMenu(false);
                    }}
                  >
                    Distributors
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Error / Success */}
        {error && (
          <div className="text-center text-red-700 bg-white/90 border border-red-200 rounded-lg py-2 px-4 text-sm shadow-sm animate-fade-in font-normal">
            {error}
          </div>
        )}
        {success && (
          <div className="text-center text-green-700 bg-white/90 border border-green-200 rounded-lg py-2 px-4 text-sm shadow-sm animate-fade-in font-normal">
            {success}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 rounded-xl shadow-lg transition-all duration-200 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 text-white hover:scale-[1.02] hover:shadow-blue-200/50 font-normal ${
            loading ? 'opacity-60 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Processing...
            </div>
          ) : mode === 'login' ? 'Login' : 'Register'}
        </button>
      </form>

      {/* Fade Animation */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
