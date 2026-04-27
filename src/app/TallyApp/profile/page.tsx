'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StaffNav from '@/components/staff/StaffNav';
import AdminNav from '@/components/staff/AdminNav';
import { useStaffAuth } from '@/lib/use-staff-auth';
import { staffFetch } from '@/lib/staff-fetch';

type Profile = {
  id: string;
  name: string;
  role: 'admin' | 'therapist';
  commission_rate: number;
  permissions: string[];
  created_at: string;
};

export default function ProfilePage() {
  const { user, token, loading: authLoading } = useStaffAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const [showProfile, setShowProfile] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [nameMsg, setNameMsg] = useState('');

  const [showPwForm, setShowPwForm] = useState(false);
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwMsg, setPwMsg] = useState('');
  const [pwLoading, setPwLoading] = useState(false);

  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    if (!user || !token) return;
    staffFetch('/api/TallyApp/profile', undefined, token)
      .then((r) => r.json())
      .then((data) => {
        setProfile(data);
        setNewName(data.name);
        setLoading(false);
      });
  }, [user, token]);
  async function handleNameSave() {
    if (!newName.trim()) return;
    setNameMsg('');
    const res = await staffFetch('/api/TallyApp/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName.trim() }),
    }, token);
    if (res.ok) {
      setProfile((p) => p ? { ...p, name: newName.trim() } : p);
      setEditingName(false);
      setNameMsg('已更新');
      setTimeout(() => setNameMsg(''), 2000);
    } else {
      const data = await res.json();
      setNameMsg(data.error || '更新失敗');
    }
  }

  async function handlePasswordChange() {
    setPwMsg('');
    if (!currentPw || !newPw) { setPwMsg('請填寫所有欄位'); return; }
    if (newPw.length < 6) { setPwMsg('新密碼至少需要 6 個字元'); return; }
    if (newPw !== confirmPw) { setPwMsg('兩次密碼不一致'); return; }
    setPwLoading(true);
    const res = await staffFetch('/api/TallyApp/auth/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
    }, token);
    const data = await res.json();
    setPwLoading(false);
    if (res.ok) {
      setPwMsg('密碼已更新');
      setCurrentPw(''); setNewPw(''); setConfirmPw('');
      setTimeout(() => { setPwMsg(''); setShowPwForm(false); }, 2000);
    } else {
      setPwMsg(data.error || '更新失敗');
    }
  }

  async function handleLogout() {
    setLogoutLoading(true);
    await staffFetch('/api/TallyApp/auth/logout', { method: 'POST' }, token);
    router.replace('/TallyApp');
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#009688]/30 border-t-[#009688] rounded-full animate-spin" />
      </div>
    );
  }

  const roleLabel = profile?.role === 'admin' ? '管理員' : '師傅';
  return (
    <div className="pb-20 bg-gray-50 min-h-dvh">
      <div className="px-5 pt-12 pb-4">
        <h1 className="text-[#009688] text-xl font-bold">個人中心</h1>
      </div>

      <div className="px-4 space-y-4 animate-fade-in">
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#009688]/10 flex items-center justify-center shrink-0">
            <svg className="w-7 h-7 text-[#009688]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{profile?.name || '使用者'}</p>
            <p className="text-sm text-[#727876] mt-0.5">{roleLabel}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <button onClick={() => setShowProfile(!showProfile)}
            className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5 text-[#009688] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="flex-1 text-base text-gray-800">個人資料</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {showProfile && (
            <div className="px-5 pb-4 space-y-3 border-t border-gray-100 pt-3">
              <div>
                <p className="text-xs text-[#727876] mb-1.5">顯示名稱</p>
                {editingName ? (
                  <div className="flex gap-2">
                    <input value={newName} onChange={(e) => setNewName(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#009688]/30" />
                    <button onClick={handleNameSave} className="px-3 py-2 rounded-xl bg-[#009688] text-white text-sm">儲存</button>
                    <button onClick={() => { setEditingName(false); setNewName(profile?.name || ''); }} className="px-3 py-2 rounded-xl bg-gray-200 text-gray-800 text-sm">取消</button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-800 font-medium">{profile?.name}</span>
                    <button onClick={() => setEditingName(true)} className="text-xs text-[#009688]">編輯</button>
                  </div>
                )}
                {nameMsg && <p className="text-xs mt-1 text-[#009688]">{nameMsg}</p>}
              </div>
              <div className="border-t border-gray-100 pt-3">
                <p className="text-xs text-[#727876] mb-1.5">帳號</p>
                <p className="text-sm text-gray-800">{user?.email?.replace(/@staff\.local$/, '') || '—'}</p>
              </div>
              <div className="border-t border-gray-100 pt-3">
                <p className="text-xs text-[#727876] mb-1.5">身份</p>
                <p className="text-sm text-gray-800">{roleLabel}</p>
              </div>
              <div className="border-t border-gray-100 pt-3">
                <p className="text-xs text-[#727876] mb-1.5">加入日期</p>
                <p className="text-sm text-gray-800">{profile?.created_at ? new Date(profile.created_at).toLocaleDateString('zh-TW') : '—'}</p>
              </div>
            </div>
          )}
          <div className="border-t border-gray-100" />
          <button onClick={() => setShowPwForm(!showPwForm)}
            className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5 text-[#009688] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="flex-1 text-base text-gray-800">修改密碼</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {showPwForm && (
            <div className="px-5 pb-4 space-y-3 border-t border-gray-100 pt-3">
              <input type="password" placeholder="目前密碼" value={currentPw} onChange={(e) => setCurrentPw(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#009688]/30" />
              <input type="password" placeholder="新密碼（至少 6 字元）" value={newPw} onChange={(e) => setNewPw(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#009688]/30" />
              <input type="password" placeholder="確認新密碼" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#009688]/30" />
              <div className="flex gap-2">
                <button onClick={handlePasswordChange} disabled={pwLoading}
                  className="flex-1 py-2 rounded-xl bg-[#009688] text-white text-sm disabled:opacity-50">
                  {pwLoading ? '更新中...' : '確認修改'}
                </button>
                <button onClick={() => { setShowPwForm(false); setCurrentPw(''); setNewPw(''); setConfirmPw(''); setPwMsg(''); }}
                  className="px-4 py-2 rounded-xl bg-gray-200 text-gray-800 text-sm">取消</button>
              </div>
              {pwMsg && <p className="text-xs text-[#009688]">{pwMsg}</p>}
            </div>
          )}
        </div>

        <button onClick={handleLogout} disabled={logoutLoading}
          className="w-full py-3.5 rounded-2xl bg-red-400/15 text-red-500 text-base font-semibold hover:bg-red-400/25 transition-colors disabled:opacity-50">
          {logoutLoading ? '登出中...' : '登出'}
        </button>
      </div>

      {profile?.role === 'admin' ? <AdminNav /> : <StaffNav />}
    </div>
  );
}
