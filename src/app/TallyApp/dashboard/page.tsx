'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import StaffNav from '@/components/staff/StaffNav';
import TodayStats from '@/components/staff/TodayStats';
import QuickRecord from '@/components/staff/QuickRecord';
import TodayRecords from '@/components/staff/TodayRecords';
import { useStaffAuth } from '@/lib/use-staff-auth';
import { staffFetch } from '@/lib/staff-fetch';

type Service = { id: string; label: string; default_duration: number; default_price: number; commission_type: 'fixed' | 'percent'; commission_value: number };
type Record = { id: string; duration: number; price: number; commission: number; note: string | null; created_at: string; service_id: string; services: { label: string } };

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return '早安';
  if (h < 18) return '午安';
  return '晚安';
}

export default function DashboardPage() {
  const { user, token, loading: authLoading } = useStaffAuth('therapist');
  const [services, setServices] = useState<Service[]>([]);
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const [today, setToday] = useState('');
  const [showQuickRecord, setShowQuickRecord] = useState(false);

  useEffect(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    setToday(`${y}-${m}-${day}`);
  }, []);

  const loadData = useCallback(async () => {
    if (!today) return;
    const [svcRes, recRes] = await Promise.all([
      staffFetch('/api/TallyApp/services', undefined, token),
      staffFetch(`/api/TallyApp/records?date=${today}`, undefined, token),
    ]);
    const svcData = await svcRes.json();
    const recData = await recRes.json();
    setServices(Array.isArray(svcData) ? svcData : []);
    setRecords(Array.isArray(recData) ? recData : []);
    setLoading(false);
  }, [today, token]);

  useEffect(() => {
    if (user) loadData();
  }, [user, loadData]);

  async function handleRecord(data: { service_id: string; price: number; duration: number; note: string; service_date: string }) {
    const res = await staffFetch('/api/TallyApp/records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }, token);
    if (res.ok) {
      const newRec = await res.json();
      setRecords((prev) => [newRec, ...prev]);
    }
  }

  async function handleDelete(id: string) {
    const res = await staffFetch(`/api/TallyApp/records/${id}`, { method: 'DELETE' }, token);
    if (res.ok) setRecords((prev) => prev.filter((r) => r.id !== id));
  }

  const stats = {
    clients: records.length,
    parts: records.length,
    commission: records.reduce((s, r) => s + Number(r.commission), 0),
  };

  const serviceBreakdown: { [label: string]: number } = {};
  for (const s of services) {
    serviceBreakdown[s.label] = 0;
  }
  for (const r of records) {
    const label = r.services?.label || '未知';
    serviceBreakdown[label] = (serviceBreakdown[label] || 0) + 1;
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-3 border-[#009688]/30 border-t-[#009688] rounded-full animate-spin" />
      </div>
    );
  }

  const recentRecords = records.slice(0, 5);

  return (
    <div className="h-dvh flex flex-col bg-gray-50">
      {/* Fixed top */}
      <div className="shrink-0">
        <div className="bg-gradient-to-br from-[#009688] to-[#00796B] px-5 pt-8 pb-6 rounded-b-3xl flex items-center justify-between overflow-hidden relative">
          <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/5" />
          <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/5" />
          <div className="relative z-10">
            <h1 className="text-white text-2xl font-bold">
              {getGreeting()}，{user?.name || '師傅'}
            </h1>
            <p className="text-white/60 text-base mt-1">{today} · 今日服務概況</p>
          </div>
          <button
            onClick={() => setShowQuickRecord(true)}
            className="relative z-10 w-12 h-12 rounded-full bg-white/20 border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors active:scale-95 shrink-0"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        <div className="px-4 -mt-5 pb-2 animate-fade-in">
          <TodayStats stats={stats} breakdown={serviceBreakdown} />
        </div>
      </div>

      {/* Sticky recent services header */}
      <div className="shrink-0 px-4 pt-2 pb-1 bg-gray-50 flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-800">今日服務</h2>
        <Link href={`/TallyApp/history?from=${today}&to=${today}`} className="text-xs text-[#009688] hover:text-[#00796B] flex items-center gap-0.5">
          查看全部
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Scrollable recent services */}
      <div className="flex-1 overflow-y-auto px-4 pb-20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <TodayRecords records={recentRecords} onDelete={handleDelete} />
      </div>

      <StaffNav />

      {showQuickRecord && (
        <QuickRecord services={services} onRecord={handleRecord} onClose={() => setShowQuickRecord(false)} />
      )}
    </div>
  );
}
