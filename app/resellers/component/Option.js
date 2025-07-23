'use client';
import { useState } from 'react';
import { KeyRound, Loader2, XCircle, CheckCircle } from 'lucide-react';
import { API2 } from '@/lib/config';

export default function Option() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalStatus, setModalStatus] = useState('success'); // 'success' | 'error'
  const [modalMsg, setModalMsg] = useState('');

  // Get id user dari localStorage
  const user = typeof window !== "undefined" && JSON.parse(localStorage.getItem('resellers') || '{}');
  const id = user?.id;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      showModalMsg('All fields are required', 'error');
      return;
    }
    if (newPassword.length < 6) {
      showModalMsg('New password must be at least 6 characters', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      showModalMsg('Passwords do not match', 'error');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API2}?mode=changepass`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          id,
          old_password: oldPassword,
          new_password: newPassword,
        }),
      });
      const data = await res.json();
      if (data.status === 'success') {
        showModalMsg('Password changed successfully!', 'success');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        showModalMsg(data.message || 'Failed to change password', 'error');
      }
    } catch {
      showModalMsg('Server error!', 'error');
    }
    setLoading(false);
  }

  function showModalMsg(msg, status = 'success') {
    setModalMsg(msg);
    setModalStatus(status);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 4000);
  }

  return (
    <div className="max-w-md mx-auto bg-white/80 rounded-3xl p-4 md:p-7 shadow-xl border border-blue-100 mt-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-5">
        <div className="rounded-2xl bg-gradient-to-br from-indigo-400 via-sky-500 to-blue-600 p-3 shadow">
          <KeyRound className="w-7 h-7 text-white drop-shadow" />
        </div>
        <h2 className="text-2xl md:text-3xl font-normal bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 text-transparent bg-clip-text tracking-tight">
          Change Password
        </h2>
      </div>

      <form className="space-y-5 mt-4" onSubmit={handleSubmit} autoComplete="off">
        <div>
          <label className="block text-sm mb-1 text-gray-600">Current Password</label>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-white/60 placeholder-gray-400 text-gray-800 shadow-inner focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400 font-normal transition-all"
            placeholder="Enter current password..."
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-sm mb-1 text-gray-600">New Password</label>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-white/60 placeholder-gray-400 text-gray-800 shadow-inner focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400 font-normal transition-all"
            placeholder="Enter new password..."
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-sm mb-1 text-gray-600">Confirm New Password</label>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-white/60 placeholder-gray-400 text-gray-800 shadow-inner focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400 font-normal transition-all"
            placeholder="Repeat new password..."
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className={`w-full py-3 rounded-xl font-semibold shadow-xl transition-all bg-gradient-to-r from-indigo-400 via-blue-500 to-sky-600 text-white hover:scale-105 hover:shadow-2xl border-none outline-none ring-0 flex items-center justify-center gap-2 ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 text-white" />
              Processing...
            </>
          ) : (
            "Change Password"
          )}
        </button>
      </form>

{showModal && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/25 backdrop-blur-sm">
    <div
  className={`
    relative flex flex-col items-center px-6 pt-16 pb-8 min-w-[320px] max-w-sm w-[90vw]
    rounded-xl bg-white/60 shadow-lg
    border border-gray-200
    animate-fadeinpop
  `}
>
      {/* Floating Icon */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-md p-2 flex items-center justify-center w-16 h-16">
        {modalStatus === 'success' ? (
          <CheckCircle className="w-10 h-10 text-green-600" />
        ) : (
          <XCircle className="w-10 h-10 text-red-500" />
        )}
      </div>

      {/* Close Button */}
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-red-600 transition rounded-full p-1"
        aria-label="Close"
      >
        <XCircle className="w-6 h-6" />
      </button>

      {/* Content */}
      <div className="flex flex-col items-center gap-2 mt-6">
        <h3 className={`text-2xl font-semibold ${modalStatus === 'success' ? 'text-green-700' : 'text-red-600'}`}>
          {modalStatus === 'success' ? 'Success!' : 'Failed'}
        </h3>
        <p className="text-gray-700 text-center text-base font-normal">{modalMsg}</p>
      </div>
    </div>

    <style jsx>{`
      @keyframes fadeinpop {
        0% { opacity: 0; transform: scale(0.95) translateY(30px); }
        100% { opacity: 1; transform: scale(1) translateY(0); }
      }
      .animate-fadeinpop {
        animation: fadeinpop 0.3s ease forwards;
      }
    `}</style>
  </div>
)}





    </div>
  );
}
