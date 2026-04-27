'use client';

import { useState, useEffect } from 'react';
import AdminNav from '@/components/staff/AdminNav';
import { useStaffAuth } from '@/lib/use-staff-auth';
import { staffFetch } from '@/lib/staff-fetch';

type Therapist = {
  id: string;
  name: string;
  role: string;
  active: boolean;
};

export default function TherapistsPage() {
  const { user, token, loading: authLoading } = useStaffAuth('admin');
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ username: '', password: '', name: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    setListLoading(true);
    setListError('');
    staffFetch('/api/TallyApp/therapists', undefined, token).then(async (r) => {
      if (r.ok) {
        const data = await r.json();
        setTherapists(Array.isArray(data) ? data : []);
      } else {
        const msg = await r.text().catch(() => '');
        setListError(`載入失敗 (${r.status})${msg ? ': ' + msg : ''}`);
      }
      setListLoading(false);
    }).catch(() => {
      setListError('網路錯誤，無法載入師傅列表');
      setListLoading(false);
    });
  }, [user, token]);

  async function addTherapist(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    const res = await staffFetch('/api/TallyApp/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, role: 'therapist' }),
    }, token);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || '新增失敗');
      setSaving(false);
      return;
    }
    setSaving(false);
    setShowAdd(false);
    setForm({ username: '', password: '', name: '' });
    setTimeout(async () => {
      const listRes = await staffFetch('/api/TallyApp/therapists', undefined, token);
      if (listRes.ok) setTherapists(await listRes.json());
    }, 500);
  }

  async function toggleActive(t: Therapist) {
    await staffFetch('/api/TallyApp/therapists', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: t.id, active: !t.active }),
    }, token);
    setTherapists((prev) => prev.map((x) => x.id === t.id ? { ...x, active: !x.active } : x));
  }

  return (
    <div className="pb-20">
      <div className="bg-gradient-to-br from-[#009688] to-[#00796B] px-5 pt-12 pb-6 flex items-end justify-between">
        <h1 className="text-white text-xl font-serif font-bold">師傅管理</h1>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="bg-white/15 text-white px-4 py-2 rounded-xl text-sm font-medium border border-white/20 hover:bg-white/25 transition-colors"
        >
          {showAdd ? '取消' : '+ 新增'}
        </button>
      </div>

      <div className="px-4 -mt-4 space-y-4 animate-fade-in">
        {showAdd && (
          <form onSubmit={addTherapist} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-3">
            <input
              placeholder="帳號"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#009688]/30"
              required
            />
            <input
              placeholder="密碼"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#009688]/30"
              required
            />
            <input
              placeholder="師傅名稱"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#009688]/30"
              required
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-[#009688] text-white py-3 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all disabled:opacity-50"
            >
              {saving ? '新增中...' : '確認新增'}
            </button>
          </form>
        )}

        <div className="space-y-2">
          {listLoading && (
            <div className="text-center py-8 text-[#727876] text-sm">載入中...</div>
          )}
          {listError && (
            <div className="bg-red-50 text-red-600 rounded-xl p-4 text-sm">{listError}</div>
          )}
          {!listLoading && !listError && therapists.length === 0 && (
            <div className="text-center py-8 text-gray-400 text-sm">尚無師傅帳號</div>
          )}
          {therapists.map((t, i) => (
            <div
              key={t.id}
              className="bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-between animate-fade-in"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div>
                <p className={`font-semibold ${t.active ? 'text-gray-800' : 'text-gray-400'}`}>{t.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {t.role === 'admin' ? '管理員' : '師傅'} · {t.active ? '啟用中' : '已停用'}
                </p>
              </div>
              {t.role !== 'admin' && (
                <button
                  onClick={() => toggleActive(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    t.active
                      ? 'bg-red-50 text-red-500 hover:bg-red-100'
                      : 'bg-[#009688]/10 text-[#009688] hover:bg-[#009688]/20'
                  }`}
                >
                  {t.active ? '停用' : '啟用'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <AdminNav />
    </div>
  );
}
