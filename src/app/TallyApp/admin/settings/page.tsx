'use client';

import { useState, useEffect } from 'react';
import AdminNav from '@/components/staff/AdminNav';
import { useStaffAuth } from '@/lib/use-staff-auth';
import { staffFetch } from '@/lib/staff-fetch';

type Profile = { id: string; name: string; role: string; permissions: string[]; active: boolean };
type Service = { id: string; label: string; default_duration: number; default_price: number; commission_type: 'fixed' | 'percent'; commission_value: number; active: boolean };

const ALL_PERMISSIONS = [
  { key: 'view_all_today', label: '查看所有師傅今日紀錄' },
  { key: 'view_reports', label: '查看每月報表' },
  { key: 'manage_therapists', label: '管理師傅帳號' },
  { key: 'manage_services', label: '管理服務項目' },
  { key: 'manage_permissions', label: '分配權限' },
];

export default function SettingsPage() {
  const { user, token, loading: authLoading } = useStaffAuth('admin');
  const [tab, setTab] = useState<'permissions' | 'services'>('permissions');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    async function load() {
      const [permRes, svcRes] = await Promise.all([
        staffFetch('/api/TallyApp/permissions', undefined, token),
        staffFetch('/api/TallyApp/services', undefined, token),
      ]);
      if (permRes.ok) setProfiles(await permRes.json());
      if (svcRes.ok) setServices(await svcRes.json());
      setLoading(false);
    }
    load();
  }, [user, token]);

  async function togglePermission(profileId: string, perm: string) {
    const profile = profiles.find((p) => p.id === profileId);
    if (!profile) return;
    const current = profile.permissions || [];
    const updated = current.includes(perm)
      ? current.filter((p) => p !== perm)
      : [...current, perm];

    await staffFetch('/api/TallyApp/permissions', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: profileId, permissions: updated }),
    }, token);
    setProfiles((prev) =>
      prev.map((p) => p.id === profileId ? { ...p, permissions: updated } : p)
    );
  }

  const [showAddService, setShowAddService] = useState(false);
  const [svcForm, setSvcForm] = useState({ label: '', default_duration: 60, default_price: 0, commission_type: 'fixed' as 'fixed' | 'percent', commission_value: 0 });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ label: '', default_duration: 60, default_price: 0, commission_type: 'fixed' as 'fixed' | 'percent', commission_value: 0 });

  async function addService(e: React.FormEvent) {
    e.preventDefault();
    const res = await staffFetch('/api/TallyApp/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(svcForm),
    }, token);
    if (res.ok) {
      const newSvc = await res.json();
      setServices((prev) => [...prev, newSvc]);
      setShowAddService(false);
      setSvcForm({ label: '', default_duration: 60, default_price: 0, commission_type: 'fixed', commission_value: 0 });
    }
  }

  function startEdit(s: Service) {
    setEditingId(s.id);
    setEditForm({ label: s.label, default_duration: s.default_duration, default_price: s.default_price, commission_type: s.commission_type || 'fixed', commission_value: s.commission_value || 0 });
  }

  async function saveEdit(id: string) {
    const res = await staffFetch(`/api/TallyApp/services/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    }, token);
    if (res.ok) {
      const updated = await res.json();
      setServices((prev) => prev.map((s) => s.id === id ? updated : s));
      setEditingId(null);
    }
  }

  async function deleteService(id: string) {
    await staffFetch(`/api/TallyApp/services/${id}`, { method: 'DELETE' }, token);
    setServices((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div className="pb-20">
      <div className="bg-gradient-to-br from-[#009688] to-[#00796B] px-5 pt-12 pb-4">
        <h1 className="text-white text-xl font-serif font-bold mb-4">設定</h1>
        <div className="flex gap-2">
          {(['permissions', 'services'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                tab === t ? 'bg-white text-gray-800 shadow-sm' : 'bg-white/15 text-white border border-white/20'
              }`}
            >
              {t === 'permissions' ? '權限管理' : '服務項目'}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 mt-4 space-y-4 animate-fade-in">
        {loading ? (
          <div className="text-center py-8">
            <div className="w-6 h-6 border-2 border-[#009688]/30 border-t-[#009688] rounded-full animate-spin mx-auto" />
          </div>
        ) : tab === 'permissions' ? (
          <div className="space-y-3">
            {profiles.filter((p) => p.role !== 'admin').map((p) => (
              <div key={p.id} className="bg-white rounded-2xl p-4 border border-gray-200">
                <p className="font-semibold text-gray-800 mb-3">{p.name}</p>
                <div className="space-y-2">
                  {ALL_PERMISSIONS.map((perm) => (
                    <label key={perm.key} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(p.permissions || []).includes(perm.key)}
                        onChange={() => togglePermission(p.id, perm.key)}
                        className="w-5 h-5 rounded border-gray-200 text-[#009688] focus:ring-[#009688]/30"
                      />
                      <span className="text-sm text-gray-600">{perm.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Services tab */
          <div className="space-y-3">
            <button
              onClick={() => setShowAddService(!showAddService)}
              className="w-full bg-[#009688] text-white py-3 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
            >
              {showAddService ? '取消' : '+ 新增服務項目'}
            </button>

            {showAddService && (
              <form onSubmit={addService} className="bg-white rounded-2xl p-4 border border-gray-200 space-y-3">
                <input
                  placeholder="服務名稱"
                  value={svcForm.label}
                  onChange={(e) => setSvcForm({ ...svcForm, label: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#009688]/30"
                  required
                />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-[#727876]">時長（分鐘）</label>
                    <input
                      type="number"
                      value={svcForm.default_duration}
                      onChange={(e) => setSvcForm({ ...svcForm, default_duration: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#009688]/30"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#727876]">價格 (HKD)</label>
                    <input
                      type="number"
                      value={svcForm.default_price}
                      onChange={(e) => setSvcForm({ ...svcForm, default_price: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#009688]/30"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-[#727876]">抽成類型</label>
                    <select
                      value={svcForm.commission_type}
                      onChange={(e) => setSvcForm({ ...svcForm, commission_type: e.target.value as 'fixed' | 'percent' })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#009688]/30"
                    >
                      <option value="fixed">固定金額 ($)</option>
                      <option value="percent">百分比 (%)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-[#727876]">
                      {svcForm.commission_type === 'fixed' ? '抽成金額 ($)' : '抽成比例 (%)'}
                    </label>
                    <input
                      type="number"
                      value={svcForm.commission_value}
                      onChange={(e) => setSvcForm({ ...svcForm, commission_value: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#009688]/30"
                    />
                  </div>
                </div>
                <button type="submit" className="w-full bg-[#009688] text-white py-3 rounded-xl font-semibold hover:bg-[#00796B] transition-colors">
                  確認新增
                </button>
              </form>
            )}

            {services.map((s) => (
              <div key={s.id} className="bg-white rounded-xl p-4 border border-gray-200">
                {editingId === s.id ? (
                  <div className="space-y-2">
                    <input
                      value={editForm.label}
                      onChange={(e) => setEditForm({ ...editForm, label: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#009688]/30"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        value={editForm.default_duration}
                        onChange={(e) => setEditForm({ ...editForm, default_duration: Number(e.target.value) })}
                        className="px-3 py-2 rounded-lg border border-gray-200 text-sm"
                        placeholder="時長"
                      />
                      <input
                        type="number"
                        value={editForm.default_price}
                        onChange={(e) => setEditForm({ ...editForm, default_price: Number(e.target.value) })}
                        className="px-3 py-2 rounded-lg border border-gray-200 text-sm"
                        placeholder="價格"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={editForm.commission_type}
                        onChange={(e) => setEditForm({ ...editForm, commission_type: e.target.value as 'fixed' | 'percent' })}
                        className="px-3 py-2 rounded-lg border border-gray-200 text-sm"
                      >
                        <option value="fixed">固定 ($)</option>
                        <option value="percent">百分比 (%)</option>
                      </select>
                      <input
                        type="number"
                        value={editForm.commission_value}
                        onChange={(e) => setEditForm({ ...editForm, commission_value: Number(e.target.value) })}
                        className="px-3 py-2 rounded-lg border border-gray-200 text-sm"
                        placeholder="抽成數值"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => saveEdit(s.id)} className="flex-1 bg-[#009688] text-white py-2 rounded-lg text-sm font-medium">儲存</button>
                      <button onClick={() => setEditingId(null)} className="flex-1 bg-gray-200 text-gray-600 py-2 rounded-lg text-sm">取消</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{s.label}</p>
                      <p className="text-xs text-[#727876] mt-0.5">
                        {s.default_duration}分鐘 · ${s.default_price} · 抽成 {s.commission_type === 'percent' ? `${s.commission_value}%` : `$${s.commission_value}`}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(s)} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#EF6C00]/15 text-[#EF6C00] hover:bg-[#EF6C00]/25 transition-colors">編輯</button>
                      <button onClick={() => deleteService(s.id)} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-500 hover:bg-red-100 transition-colors">刪除</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <AdminNav />
    </div>
  );
}
