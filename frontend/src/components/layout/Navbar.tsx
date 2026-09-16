'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/api';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller';
};

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } finally {
      setUser(null);
    }
  };

  const handleLogoutAll = async () => {
    try {
      await fetch('http://localhost:5000/api/auth/logout-all', {
        method: 'POST',
        credentials: 'include',
      });
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    getCurrentUser().then((currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <nav className="border-b border-[#6D8196]/20 bg-[#FFFAFA]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-2xl font-black tracking-tight text-[#000080]"
        >
          HAMMR
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm font-semibold text-[#6D8196]">
            Home
          </Link>

          <Link
            href="/auctions"
            className="text-sm font-semibold text-[#6D8196]"
          >
            Auctions
          </Link>

          <Link
            href="/categories"
            className="text-sm font-semibold text-[#6D8196]"
          >
            Categories
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-[#000080]">
                Hi, {user.name}
              </span>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl border border-[#000080] px-4 py-2 text-sm font-semibold text-[#000080] hover:bg-[#000080] hover:text-white"
              >
                Logout
              </button>

              <button
                type="button"
                onClick={handleLogoutAll}
                className="rounded-xl border border-red-500 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-500 hover:text-white"
              >
                Logout All
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-xl px-4 py-2 text-sm font-semibold text-[#000080] hover:bg-[#000080]/5"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-xl bg-[#000080] px-4 py-2 text-sm font-semibold text-white hover:bg-[#000080]/90"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
