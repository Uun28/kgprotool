'use client';

import { useEffect, useState, useContext } from 'react';
import {
  Users, Pencil,
  ArrowLeft, ArrowRight, Search
} from 'lucide-react';
import { LoginadminContext } from "../LoginadminContext";

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

  async function handleAction({ action, user, value, fields, licensed, seller }) {
    let mode, body;
    if (action === 'delete') {
      if (!confirm('Delete this user?')) return;
      mode = 'deleteuser'; body = `id=${user.id}`;
    } else if (action === 'resethwid') {
      if (!confirm('Reset HWID for this user?')) return;
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

      console.log(body);
    } else return;
    setLoading(true);
    const res = await fetch(`${API}?mode=${mode}`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body
    });
    const data = await res.json();
    console.log(data);
    setModal({ open: false, user: null });
    setLoading(false);
    setAlert({ show: true, msg: data.message || 'Action success', color: data.status === 'success' ? 'green' : 'red' });
    if (data.status === 'success') getUserList();
    setTimeout(() => setAlert({ show: false, msg: '', color: '' }), 2000);
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

      {/* Table Responsive */}
      <div className="w-full overflow-x-auto rounded-3xl shadow-2xl bg-gradient-to-br from-white via-blue-50 to-white border border-blue-100">
        <table className="w-full min-w-[900px] text-base font-normal border-separate border-spacing-0">
          <thead className="sticky top-0 z-10">
            <tr>
              <th className="px-6 py-5 font-normal text-sky-700 bg-gradient-to-r from-sky-50 via-blue-50 to-white text-left border-b-2 border-blue-100 rounded-tl-3xl">Email</th>
              <th className="px-6 py-5 font-normal text-sky-700 bg-gradient-to-r from-sky-50 via-blue-50 to-white text-center border-b-2 border-blue-100">Status</th>
              <th className="px-6 py-5 font-normal text-sky-700 bg-gradient-to-r from-sky-50 via-blue-50 to-white text-center border-b-2 border-blue-100">Role</th>
              <th className="px-6 py-5 font-normal text-sky-700 bg-gradient-to-r from-sky-50 via-blue-50 to-white text-center border-b-2 border-blue-100">Expired</th>
              <th className="px-6 py-5 font-normal text-sky-700 bg-gradient-to-r from-sky-50 via-blue-50 to-white text-center border-b-2 border-blue-100">Last Login</th>
              <th className="px-6 py-5 font-normal text-sky-700 bg-gradient-to-r from-sky-50 via-blue-50 to-white text-center border-b-2 border-blue-100">Balance</th>
              <th className="px-6 py-5 font-normal text-sky-700 bg-gradient-to-r from-sky-50 via-blue-50 to-white text-center border-b-2 border-blue-100 rounded-tr-3xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center text-gray-400 py-10">Loading...</td>
              </tr>
            ) : paginated.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-gray-400 py-14 bg-white/80 rounded-2xl">
                  No users found.
                </td>
              </tr>
            ) : (
              paginated.map((u) => (
                <tr
                  key={u.id}
                  className="
                    group 
                    even:bg-blue-50/10
                    hover:bg-gradient-to-r hover:from-sky-50/80 hover:via-blue-50/70 hover:to-white/90
                    transition-all duration-200
                    border-b border-blue-50
                    rounded-xl
                    shadow-sm
                  "
                  style={{ height: '60px' }}
                >
                  <td className="px-6 py-5 font-normal text-left break-all">{u.email || '-'}</td>
                  <td className="px-6 py-5 font-normal text-center">
                    <span className={`px-5 py-1.5 rounded-full text-xs font-normal capitalize shadow border ${statusColor[u.status] || statusColor['nolicense']}`} style={{ backdropFilter: 'blur(4px)' }}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 font-normal text-center">{u.role || '-'}</td>
                  <td className="px-6 py-5 font-normal text-center">{u.expired || '-'}</td>
                  <td className="px-6 py-5 font-normal text-center">{u.lastlogin || '-'}</td>
                  <td className="px-6 py-5 font-normal text-center">${u.balance || 0}</td>
                  <td className="px-6 py-5 font-normal text-center">
                    <button
                      title="Actions"
                      className="p-2 rounded-full transition hover:bg-sky-100 text-sky-600 bg-white shadow-md hover:shadow-lg hover:-translate-y-1 hover:scale-110"
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
    </div>
  );
}

// --- Modal for User Actions ---
function UserActionModal({ user, onClose, onAction }) {
  const { loginUser } = useContext(LoginadminContext);
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
    <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black/30 backdrop-blur-[2px] transition-all">
      <div className="bg-white/95 rounded-2xl shadow-2xl border border-blue-100 max-w-lg w-full p-8 animate-in fade-in relative">
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-red-400 text-2xl px-2 font-normal absolute top-3 right-3"
          aria-label="Close"
        >
          ×
        </button>
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {['detail', 'edit', 'license', 'action'].map(t => (
            <button
              key={t}
              className={`flex-1 py-2 rounded-lg font-normal capitalize transition-all
                ${tab === t
                  ? 'bg-blue-100 text-blue-600 shadow'
                  : 'hover:bg-gray-100 text-gray-400'}
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

        {/* Detail */}
        {tab === 'detail' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
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
            <div className="col-span-2 flex gap-2 mt-2">
              <button
                type="submit"
                className="flex-1 py-2 rounded-lg bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 text-white font-normal hover:from-sky-500 hover:to-blue-700 border border-blue-200 transition"
              >Save</button>
              <button
                type="button"
                className="flex-1 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 font-normal border border-gray-200 transition"
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
                seller: loginUser?.email || '-',
              });
            }}>
            <label className="flex flex-col gap-1 font-normal text-gray-700">
              License Type
              <select
                value={licenseType}
                onChange={e => setLicenseType(e.target.value)}
                className="rounded-lg border border-blue-100 px-3 py-2 bg-white/80 focus:outline-none focus:border-sky-300"
              >
                {licenseOptions.map(opt => (
                  <option value={opt.value} key={opt.value}>{opt.label}</option>
                ))}
              </select>
            </label>
            <div className="text-sm text-gray-600">
              Seller: <span className="font-normal">{loginUser?.email || '-'}</span>
            </div>
            <button
              className="py-2 rounded-lg bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 text-white font-normal hover:from-sky-500 hover:to-blue-700 border border-blue-200 transition"
              type="submit"
            >
              Add License
            </button>
          </form>
        )}

        {/* Actions */}
        {tab === 'action' && (
          <div className="flex flex-col gap-4">
            <button className="py-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 font-normal border border-green-200 transition"
              onClick={() => onAction({ action: 'resethwid', user })}>Reset HWID</button>
            <form
              className="flex gap-2"
              onSubmit={e => { e.preventDefault(); onAction({ action: 'changepass', user, value: newPass }); setNewPass(''); }}
            >
              <input
                className="rounded-lg border border-blue-100 px-3 py-2 bg-white/80 focus:outline-none focus:border-sky-300 flex-1"
                type="password"
                placeholder="New Password"
                value={newPass}
                onChange={e => setNewPass(e.target.value)}
              />
              <button className="py-2 px-4 rounded-lg bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-normal border border-yellow-200 transition" type="submit">Change Password</button>
            </form>
            <button className="py-2 rounded-lg bg-red-50 hover:bg-red-200 text-red-700 font-normal border border-red-200 transition"
              onClick={() => onAction({ action: 'delete', user })}>Delete User</button>
          </div>
        )}
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
