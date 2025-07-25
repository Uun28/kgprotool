import { useState } from 'react';
import { KeyRound, Loader2, XCircle, CheckCircle, KeySquare } from 'lucide-react';
import { API2 } from '@/lib/config';

export default function Option() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [apiKey, setApiKey] = useState(null);
  const [apiLoading, setApiLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalStatus, setModalStatus] = useState('success'); 
  const [modalMsg, setModalMsg] = useState('');

  const user = typeof window !== "undefined" && JSON.parse(localStorage.getItem('resellers') || '{}');
  const id = user?.id;

  // Fungsi modal helper
  function showModalMsg(msg, status = 'success') {
    setModalMsg(msg);
    setModalStatus(status);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 4000);
  }

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

  // ✅ Generate API key
  async function handleGenerateApiKey() {
    setApiLoading(true);
    try {
      const res = await fetch(API2, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          mode: 'generate_apikey',
          id,
        }),
      });
      const data = await res.json();
      if (data.status === 'success') {
        setApiKey(data.apikey);
        showModalMsg(`New API Key: ${data.apikey}`, 'success');
      } else {
        showModalMsg(data.message || 'Failed to generate API key', 'error');
      }
    } catch {
      showModalMsg('Server error!', 'error');
    }
    setApiLoading(false);
  }

  return (
    <div className="max-w-md mx-auto bg-white/80 rounded-3xl p-4 md:p-7 shadow-xl border border-blue-100 mt-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-5">
        <div className="rounded-2xl bg-gradient-to-br from-indigo-400 via-sky-500 to-blue-600 p-3 shadow">
          <KeyRound className="w-7 h-7 text-white drop-shadow" />
        </div>
        <h2 className="text-2xl md:text-3xl font-normal bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 text-transparent bg-clip-text tracking-tight">
          Account Options
        </h2>
      </div>

      {/* ✅ API Key Section */}
      <div className="mb-6 bg-white/60 p-4 rounded-2xl shadow-inner border border-blue-100">
        <div className="flex items-center gap-3 mb-3">
          <KeySquare className="w-6 h-6 text-blue-500" />
          <h3 className="text-lg font-normal text-gray-800">API Key</h3>
        </div>

        {apiKey ? (
          <p className="break-all text-sm text-gray-700 mb-3">{apiKey}</p>
        ) : (
          <p className="text-sm text-gray-500 mb-3">
            You don’t have an API Key yet. Click the button below to generate one.
          </p>
        )}

        <button
          onClick={handleGenerateApiKey}
          disabled={apiLoading}
          className={`w-full py-2.5 rounded-xl font-normal shadow-md transition-all bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600 text-white hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 ${
            apiLoading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {apiLoading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 text-white" />
              Generating...
            </>
          ) : (
            "Generate API Key"
          )}
        </button>
      </div>

      {/* ✅ Change Password Section */}
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
          className={`w-full py-3 rounded-xl font-normal shadow-xl transition-all bg-gradient-to-r from-indigo-400 via-blue-500 to-sky-600 text-white hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2 ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
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
  <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm animate-fadein">
    
    {/* Icon Status Besar + Animasi */}
    <div className={`w-24 h-24 rounded-full flex items-center justify-center shadow-lg mb-6 ${
      modalStatus === 'success' 
        ? 'bg-gradient-to-br from-green-400 to-emerald-600' 
        : 'bg-gradient-to-br from-red-400 to-rose-600'
    } animate-iconpop`}>
      {modalStatus === 'success' ? (
        <CheckCircle className="w-14 h-14 text-white drop-shadow-lg" />
      ) : (
        <XCircle className="w-14 h-14 text-white drop-shadow-lg" />
      )}
    </div>

    {/* Pesan */}
    <div className="text-center max-w-md px-6">
      <h3 className={`text-3xl font-normal mb-2 ${
        modalStatus === 'success' ? 'text-green-100' : 'text-red-100'
      }`}>
        {modalStatus === 'success' ? 'Success!' : 'Oops!'}
      </h3>
      <p className="text-white/90 text-base leading-relaxed break-words">{modalMsg}</p>
    </div>

    {/* Tombol Close */}
    <button
      onClick={() => setShowModal(false)}
      className="mt-6 px-6 py-2 rounded-full text-white bg-white/10 border border-white/30 hover:bg-white/20 transition-all duration-200"
    >
      Close
    </button>

    {/* Animasi */}
    <style jsx>{`
      @keyframes fadein {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }
      .animate-fadein {
        animation: fadein 0.3s ease-out forwards;
      }
      @keyframes iconpop {
        0% { transform: scale(0.6); opacity: 0; }
        70% { transform: scale(1.1); opacity: 1; }
        100% { transform: scale(1); }
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
