'use client';
import { useState, useEffect } from 'react';
import Sidebar from '../component/Sidebar';
import Navbar from '../component/Navbar';
import Activation from '../component/Activation';
import Selling from '../component/Selling';
import Option from '../component/Option';
import { useRouter } from 'next/navigation';
import { API2 } from '@/lib/config';


export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [menuActive, setMenuActive] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem('resellers');
    if (data) setUser(JSON.parse(data));
    else router.replace('/resellers/auth');
  }, [router]);

  // Logout logic FE
async function handleLogout() {
  setLoading(true);
  localStorage.removeItem('resellers');
  await fetch(`${API2}?mode=logout`, {
    method: 'POST',
    credentials: 'include'
  });
  setLoading(false);
  window.location.href = '/resellers/auth';
}

  if (!user) return null;

  let Content;
  if (menuActive === 'activation') Content = <Activation />;
  else if (menuActive === 'selling') Content = <Selling />;
  else if (menuActive === 'option') Content = <Option />;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white/30">
      <Sidebar
        menuActive={menuActive}
        setMenuActive={setMenuActive}
        onLogout={handleLogout}
        loading={loading}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar user={user} />
        <main className="flex-1 p-2 sm:p-4 md:p-8 overflow-x-auto">
          {Content}
        </main>
      </div>
    </div>
  );
}
