'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const email = username.includes('@') ? username : `${username}@staff.local`;
      const supabase = createClient();

      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) {
        setError('帳號或密碼錯誤');
        setLoading(false);
        return;
      }

      const role = data.user.user_metadata?.role || 'therapist';
      if (role === 'admin') {
        window.location.href = '/TallyApp/admin';
      } else {
        window.location.href = '/TallyApp/dashboard';
      }
    } catch {
      setError('網絡錯誤，請重試');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-dvh flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#009688] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#009688]">記鐘小幫手</h1>
          <p className="text-[#727876] text-sm mt-1">活力足內部系統</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">帳號 / Email</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#009688]/30 focus:border-[#009688] text-lg"
                placeholder="輸入帳號或 Email"
                required
                autoComplete="username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">密碼</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#009688]/30 focus:border-[#009688] text-lg"
                placeholder="輸入密碼"
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && (
            <p className="mt-3 text-red-600 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-[#009688] text-white py-3.5 rounded-xl font-semibold text-lg hover:bg-[#00796B] transition-colors disabled:opacity-50"
          >
            {loading ? '登入中...' : '登入'}
          </button>
        </form>
      </div>
    </div>
  );
}