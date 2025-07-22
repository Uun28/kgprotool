'use client';

import { useEffect, useState } from 'react';
import {
  Users, Pencil,
  ArrowLeft, ArrowRight, Search
} from 'lucide-react';

const API = 'https://minangkabau-gsm.store/admin.php';
const statusColor = {
  active: "bg-green-50 text-green-700 border border-green-200",
  expired: "bg-yellow-50 text-yellow-800 border border-yellow-200",
  banned: "bg-red-50 text-red-600 border border-red-200",
  nolicense: "bg-gray-50 text-gray-700 border border-gray-200",
};
const roles = ["admin", "resellers", "user"];
const statuses = ["active", "expired", "nolicense", "banned"];
const licenseOptions = [
  { value: '3month', label: '3 Month', month: '3' },
  { value: '6month', label: '6 Month', month: '6' },
  { value: '12month', label: '12 Month', month: '12' },
];

export default function AdminUser() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;
  const [modal, setModal] = useState({ open: false, user: null });
  const [alert, setAlert] = useState({ show: false, msg: '', color: '' });
  const [loading, setLoading] = useState(false);

  // Modal confirm custom
  const [confirmModal, setConfirmModal] = useState({ open: false, msg: '', onConfirm: null });

  function getUserList() {
    setLoading(true);
    fetch(`${API}?mode=getuser`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setUsers(data.data || []);
        setLoading(false);
      });
  }
  useEffect(getUserList, []);

  const filtered = users.filter(
    u =>
      !search ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.status?.toLowerCase().includes(search.toLowerCase())
  );
  const totalPage = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  function askConfirm(msg, actionFunc) {
    setConfirmModal({
      open: true,
      msg,
      onConfirm: () => {
        setConfirmModal({ open: false, msg: '', onConfirm: null });
        actionFunc();
      }
    });
  }

 async function handleAction({ action, user, value, fields, licensed, seller }) {
  let mode, body;
  if (action === 'delete') {
    askConfirm('Delete this user?', () => handleAction({ action: 'delete-confirm', user }));
    return;
  } else if (action === 'delete-confirm') {
    mode = 'deleteuser'; body = `id=${user.id}`;
  } else if (action === 'resethwid') {
    askConfirm('Reset HWID for this user?', () => handleAction({ action: 'resethwid-confirm', user }));
    return;
  } else if (action === 'resethwid-confirm') {
    mode = 'resethwid'; body = `id=${user.id}`;
  } else if (action === 'changepass') {
    if (!value) return setAlert({ show: true, msg: 'Password required', color: 'red' });
    mode = 'changepassword'; body = `id=${user.id}&password=${encodeURIComponent(value)}`;
  } else if (action === 'edit') {
    mode = 'updateuser';
    body = `id=${user.id}` +
      `&email=${encodeURIComponent(fields.email)}` +
      `&role=${encodeURIComponent(fields.role)}` +
      `&status=${encodeURIComponent(fields.status)}` +
      `&expired=${encodeURIComponent(fields.expired)}` +
      `&balance=${encodeURIComponent(fields.balance)}`;
  } else if (action === 'addlicense') {
    mode = 'addlicense';
    const option = licenseOptions.find(opt => opt.value === licensed);
    const month = option ? option.month : 3;
    body = `id=${user.id}&month=${month}&licensed=${licensed}&seller=${seller}`;
  } else return;

  setLoading(true);
  try {
    const res = await fetch(`${API}?mode=${mode}`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body
    });
    const data = await res.json();
    setModal({ open: false, user: null });
    setAlert({ show: true, msg: data.message || 'Action success', color: data.status === 'success' ? 'green' : 'red' });
    if (data.status === 'success') getUserList();
  } catch (error) {
    setAlert({ show: true, msg: 'Network error', color: 'red' });
  }
  setLoading(false);
}


  return (
    <div className="max-w-6xl mx-auto w-full py-10 px-2 md:px-0">
      <div className="flex items-center mb-8 gap-3">
        <div className="rounded-xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 p-2 shadow-md">
          <Users className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-normal bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 text-transparent bg-clip-text tracking-tight">
          User Management
        </h2>
      </div>

      {/* Search */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 bg-white border border-blue-100 px-3 rounded-full shadow max-w-xs">
          <Search className="w-4 h-4 text-blue-300" />
          <input
            className="bg-transparent focus:outline-none p-2 w-full font-normal"
            placeholder="Search user (email/status)..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <span className="ml-2 text-xs text-gray-400 font-normal">
          Showing {filtered.length} users
        </span>
      </div>

      {alert.show && (
        <div className={`mb-4 rounded-xl bg-${alert.color}-50 border border-${alert.color}-200 text-${alert.color}-700 px-4 py-2 shadow animate-in fade-in`}>
          {alert.msg}
        </div>
      )}

      {/* Desktop Table */}
      <div className="hidden sm:block w-full overflow-x-auto rounded-3xl bg-white/80 shadow-[0_8px_40px_8px_rgba(47,62,120,0.11)] border border-blue-100 backdrop-blur-xl">
        <table className="w-full min-w-[900px] font-normal border-separate border-spacing-0">
          <thead>
            <tr>
              {["Email", "Status", "Role", "Expired", "Last Login", "Balance", "Action"].map((col, idx) => (
                <th
                  key={col}
                  className={
                    `px-5 py-4 font-normal text-gray-800 text-[15px] text-left bg-white/70 border-b border-blue-100
                    ${idx === 0 ? "rounded-tl-3xl" : ""}
                    ${idx === 6 ? "rounded-tr-3xl" : ""}
                    whitespace-nowrap`
                  }
                  style={{
                    backdropFilter: 'blur(4px)'
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-14 bg-white/70 rounded-2xl">
                  <div className="flex flex-col items-center justify-center gap-2 animate-pulse">
                    <div className="w-7 h-7 rounded-full border-4 border-sky-300 border-t-transparent animate-spin"></div>
                    <span className="text-base text-sky-400 font-normal tracking-wide">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : paginated.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-16 bg-white/90 rounded-2xl">
                  <span className="text-xl font-normal text-sky-300/70 opacity-70">No users found.</span>
                </td>
              </tr>
            ) : (
              paginated.map((u) => (
                <tr
                  key={u.id}
                  className={`
                    group transition-all duration-200
                    hover:shadow-[0_4px_16px_2px_rgba(56,189,248,0.10)]
                    hover:scale-[1.01]
                    hover:bg-white/95
                    border-b border-blue-50
                    rounded-2xl
                    cursor-pointer
                  `}
                  style={{
                    boxShadow: "0 1.5px 8px 0 rgba(56,189,248,0.05)"
                  }}
                >
                  {/* Email with avatar circle */}
                  <td className="px-5 py-5 flex items-center gap-3 font-normal text-gray-800">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 via-sky-200 to-indigo-100 text-sky-600 text-sm font-normal border border-blue-100 shadow-inner mr-2 select-none">
                      {u.email?.[0]?.toUpperCase() || "U"}
                    </span>
                    <span className="break-all">{u.email || '-'}</span>
                  </td>
                  {/* Status chip glossy */}
                  <td className="px-5 py-5 text-center">
                    <span className={`
                      px-4 py-1.5 rounded-full text-xs font-normal shadow border border-blue-200
                      bg-gradient-to-tr from-sky-50 via-white to-blue-100
                      ${statusColor[u.status] || statusColor['nolicense']}
                      ring-1 ring-blue-100
                      transition-all
                      select-none
                    `}
                    style={{
                      boxShadow: "0 1.5px 8px 0 rgba(56,189,248,0.08)",
                      fontWeight: 500,
                    }}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-5 py-5 text-center text-gray-700">{u.role || '-'}</td>
                  <td className="px-5 py-5 text-center text-gray-600">{u.expired || '-'}</td>
                  <td className="px-5 py-5 text-center text-gray-500">{u.lastlogin || '-'}</td>
                  <td className="px-5 py-5 text-center font-normal text-sky-600">${u.balance || 0}</td>
                  <td className="px-5 py-5 text-center">
                    <button
                      title="Actions"
                      className="p-2 rounded-full bg-gradient-to-br from-white via-blue-50 to-sky-100 border border-blue-100 text-sky-600 shadow-md hover:shadow-lg hover:scale-110 transition-all"
                      style={{ minWidth: 36, minHeight: 36 }}
                      onClick={() => setModal({ open: true, user: u })}
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Version */}
      <div className="sm:hidden flex flex-col gap-4 mt-2">
        {loading ? (
          <div className="py-10 flex flex-col items-center gap-2 animate-pulse">
            <div className="w-8 h-8 rounded-full border-4 border-sky-300 border-t-transparent animate-spin"></div>
            <span className="text-base text-sky-400 font-normal">Loading...</span>
          </div>
        ) : paginated.length === 0 ? (
          <div className="py-10 bg-white/90 rounded-2xl text-center shadow">
            <span className="text-lg font-normal text-sky-300/70 opacity-70">No users found.</span>
          </div>
        ) : (
          paginated.map(u => (
            <div
              key={u.id}
              className="rounded-2xl border border-blue-100 bg-white/95 shadow px-4 py-4 flex flex-col gap-2"
            >
              <div>
                <span className="text-xs text-blue-400 block mb-1">Email</span>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 via-sky-200 to-indigo-100 text-sky-600 text-sm font-normal border border-blue-100 shadow-inner mr-1 select-none">
                    {u.email?.[0]?.toUpperCase() || "U"}
                  </span>
                  <span className="break-all font-normal">{u.email || '-'}</span>
                </div>
              </div>
              <div>
                <span className="text-xs text-blue-400 block mb-1">Status</span>
                <span className={`
                  px-4 py-1.5 rounded-full text-xs font-normal shadow border border-blue-200
                  bg-gradient-to-tr from-sky-50 via-white to-blue-100
                  ${statusColor[u.status] || statusColor['nolicense']}
                  ring-1 ring-blue-100
                  transition-all
                  select-none
                `}
                  style={{ boxShadow: "0 1.5px 8px 0 rgba(56,189,248,0.08)" }}>
                  {u.status}
                </span>
              </div>
              <div>
                <span className="text-xs text-blue-400 block mb-1">Role</span>
                <span className="font-normal text-gray-700">{u.role || '-'}</span>
              </div>
              <div>
                <span className="text-xs text-blue-400 block mb-1">Expired</span>
                <span className="text-gray-600">{u.expired || '-'}</span>
              </div>
              <div>
                <span className="text-xs text-blue-400 block mb-1">Last Login</span>
                <span className="text-gray-500">{u.lastlogin || '-'}</span>
              </div>
              <div>
                <span className="text-xs text-blue-400 block mb-1">Balance</span>
                <span className="font-normal text-sky-600">${u.balance || 0}</span>
              </div>
              <div>
                <span className="text-xs text-blue-400 block mb-1">Action</span>
                <button
                  title="Actions"
                  className="mt-1 p-2 rounded-full bg-gradient-to-br from-white via-blue-50 to-sky-100 border border-blue-100 text-sky-600 shadow-md hover:shadow-lg hover:scale-105 transition"
                  style={{ minWidth: 36, minHeight: 36 }}
                  onClick={() => setModal({ open: true, user: u })}
                >
                  <Pencil className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
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

      {/* Modal */}
      {modal.open && (
        <UserActionModal
          user={modal.user}
          onClose={() => setModal({ open: false, user: null })}
          onAction={handleAction}
        />
      )}

      {/* Confirm Modal */}
      <ConfirmModal
        open={confirmModal.open}
        msg={confirmModal.msg}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal({ open: false, msg: '', onConfirm: null })}
      />
    </div>
  );
}



function UserActionModal({ user, onClose, onAction }) {
  const [tab, setTab] = useState('detail');
  const [editForm, setEditForm] = useState({
    email: user.email,
    role: user.role,
    status: user.status,
    expired: user.expired,
    balance: user.balance,
  });
  const [newPass, setNewPass] = useState('');
  const [licenseType, setLicenseType] = useState('3month');

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 backdrop-blur-[3px] animate-in fade-in">
      <div className="relative bg-white/90 border border-blue-100 shadow-2xl rounded-3xl max-w-lg w-full p-0 overflow-hidden animate-in scale-in">
        {/* Header Bar */}
        <div className="flex items-center gap-3 px-8 pt-8 pb-4 border-b border-blue-50 bg-gradient-to-r from-white/80 via-sky-50 to-blue-50/70 rounded-t-3xl">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-sky-100 via-blue-200 to-white text-sky-600 shadow-lg border border-blue-100">
            <Users className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="text-lg font-normal text-gray-800">User Details</div>
            <div className="text-xs text-sky-400 font-medium">{user.email}</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-red-400 text-2xl px-2 font-normal"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        {/* Tabs */}
        <div className="flex gap-2 px-8 pt-4 pb-2 border-b border-blue-50">
          {['detail', 'edit', 'license', 'action'].map(t => (
            <button
              key={t}
              className={`flex-1 py-2 rounded-xl font-normal capitalize transition-all text-base 
                ${tab === t
                  ? 'bg-gradient-to-r from-sky-100 via-blue-100 to-white text-blue-600 shadow font-normal'
                  : 'hover:bg-gray-100 text-gray-400 font-normal'}
              `}
              onClick={() => setTab(t)}
            >
              {t === 'detail' && 'Detail'}
              {t === 'edit' && 'Edit'}
              {t === 'license' && 'Add License'}
              {t === 'action' && 'Options'}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="px-8 py-8">
          {/* Detail */}
          {tab === 'detail' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              <Field label="ID" value={user.id} />
              <Field label="Email" value={user.email} />
              <Field label="Role" value={user.role} />
              <Field label="Status" value={user.status} />
              <Field label="Expired" value={user.expired} />
              <Field label="Balance" value={user.balance} />
              <Field label="HWID" value={user.hwid} />
              <Field label="Last Login" value={user.lastlogin} />
              <Field label="HWID Change" value={user.hwidchange} />
            </div>
          )}

          {/* Edit */}
          {tab === 'edit' && (
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2"
              onSubmit={e => {
                e.preventDefault();
                onAction({ action: 'edit', user, fields: editForm });
              }}
            >
              <Field label="Email" value={editForm.email} editable name="email" onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))} />
              <Field label="Role" value={editForm.role} editable name="role" select options={roles} onChange={e => setEditForm(f => ({ ...f, role: e.target.value }))} />
              <Field label="Status" value={editForm.status} editable name="status" select options={statuses} onChange={e => setEditForm(f => ({ ...f, status: e.target.value }))} />
              <Field label="Expired" value={editForm.expired} /> {/* Not editable */}
              <Field label="Balance" value={editForm.balance} editable name="balance" onChange={e => setEditForm(f => ({ ...f, balance: e.target.value }))} />
              <div className="col-span-2 flex gap-2 mt-4">
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 text-white font-normal shadow-lg hover:from-sky-500 hover:to-blue-700 border-0 transition"
                >Save</button>
                <button
                  type="button"
                  className="flex-1 py-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 font-normal border border-gray-200 transition"
                  onClick={onClose}
                >Cancel</button>
              </div>
            </form>
          )}

          {/* Add License */}
          {tab === 'license' && (
            <form className="flex flex-col gap-4"
              onSubmit={e => {
                e.preventDefault();
                onAction({
                  action: 'addlicense',
                  user,
                  licensed: licenseType,
                  seller: loginadmin?.email || '-',
                });
              }}>
              <label className="flex flex-col gap-1 font-normal text-gray-700">
                License Type
                <select
                  value={licenseType}
                  onChange={e => setLicenseType(e.target.value)}
                  className="rounded-xl border border-blue-100 px-3 py-2 bg-white/90 focus:outline-none focus:border-sky-300"
                >
                  {licenseOptions.map(opt => (
                    <option value={opt.value} key={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </label>
              <div className="text-sm text-gray-600">
                Seller: <span className="font-normal">{loginadmin?.email || '-'}</span>
              </div>
              <button
                className="py-2 rounded-xl bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 text-white font-normal shadow-lg hover:from-sky-500 hover:to-blue-700 border-0 transition"
                type="submit"
              >
                Add License
              </button>
            </form>
          )}

          {/* Actions */}
          {tab === 'action' && (
            <div className="flex flex-col gap-4">
              <button className="py-2 rounded-xl bg-green-50 hover:bg-green-100 text-green-700 font-normal border border-green-200 shadow transition"
                onClick={() => onAction({ action: 'resethwid', user })}>Reset HWID</button>
              <form
                className="flex gap-2"
                onSubmit={e => { e.preventDefault(); onAction({ action: 'changepass', user, value: newPass }); setNewPass(''); }}
              >
                <input
                  className="rounded-xl border border-blue-100 px-3 py-2 bg-white/80 focus:outline-none focus:border-sky-300 flex-1"
                  type="password"
                  placeholder="New Password"
                  value={newPass}
                  onChange={e => setNewPass(e.target.value)}
                />
                <button className="py-2 px-4 rounded-xl bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-normal border border-yellow-200 shadow transition" type="submit">Change Password</button>
              </form>
              <button className="py-2 rounded-xl bg-red-50 hover:bg-red-200 text-red-700 font-normal border border-red-200 shadow transition"
                onClick={() => onAction({ action: 'delete', user })}>Delete User</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// --- Confirm Modal ---
function ConfirmModal({ open, msg, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md transition-all">
      <div className="relative bg-white rounded-2xl shadow-2xl border border-blue-100 max-w-md w-full p-8 flex flex-col items-center animate-in fade-in scale-in">
        <div className="absolute top-4 right-4">
          <button
            className="text-gray-400 hover:text-red-400 text-2xl px-2 font-normal"
            aria-label="Close"
            onClick={onCancel}
          >
            ×
          </button>
        </div>
        {/* Icon Question */}
        <div className="w-16 h-16 flex items-center justify-center rounded-full shadow-lg bg-gradient-to-br from-sky-100 via-blue-100 to-white mb-4 border-2 border-blue-200">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-blue-500">
            <circle cx="12" cy="12" r="10" fill="none" stroke="#38bdf8" strokeWidth="2"/>
            <path d="M12 8a2 2 0 0 1 2 2c0 1-2 2-2 4" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" fill="none"/>
            <circle cx="12" cy="17" r="1" fill="#2563eb"/>
          </svg>
        </div>
        {/* Message */}
        <div className="mb-6 text-center text-gray-700 text-lg font-normal">{msg}</div>
        <div className="flex gap-4 w-full justify-center">
          <button
            className="flex-1 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 font-normal border border-gray-200 shadow transition"
            onClick={onCancel}
          >Cancel</button>
          <button
            className="flex-1 py-2 rounded-xl bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 text-white font-normal shadow-lg hover:scale-105 hover:from-blue-500 hover:to-indigo-600 border-0 transition-all"
            onClick={onConfirm}
            autoFocus
          >Yes, Confirm</button>
        </div>
      </div>
    </div>
  );
}


// --- Field (View/Edit) ---
function Field({ label, value, editable, name, onChange, select, options }) {
  if (editable) {
    if (select) {
      return (
        <label className="flex flex-col gap-1 font-normal text-gray-700">
          {label}
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="rounded-lg border border-blue-100 px-3 py-2 mt-1 bg-white/80 focus:outline-none focus:border-sky-300"
          >
            {options.map(opt => (
              <option value={opt} key={opt}>{opt}</option>
            ))}
          </select>
        </label>
      );
    }
    return (
      <label className="flex flex-col gap-1 font-normal text-gray-700">
        {label}
        <input
          name={name}
          value={value || ''}
          onChange={onChange}
          className="rounded-lg border border-blue-100 px-3 py-2 mt-1 bg-white/80 focus:outline-none focus:border-sky-300"
        />
      </label>
    );
  }
  return (
    <div className="flex flex-col gap-1 font-normal text-gray-700">
      {label}
      <div className="rounded-lg border border-blue-50 px-3 py-2 bg-blue-50/30 text-gray-600 break-all">
        {value ?? '-'}
      </div>
    </div>
  );
}
