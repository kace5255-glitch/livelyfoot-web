'use client';

import { useState, useEffect } from 'react';
import AdminNav from '@/components/staff/AdminNav';
import { useStaffAuth } from '@/lib/use-staff-auth';
import { staffFetch } from '@/lib/staff-fetch';

type Summary = {
  therapist_id: string;
  name: string;
  total_clients: number;
  total_parts: number;
  total_commission: number;
  total_revenue: number;
};

export default function ReportsPage() {
  const { user, token, loading: authLoading } = useStaffAuth('admin');
  const [month, setMonth] = useState('');
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const d = new Date();
    setMonth(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
  }, []);

  useEffect(() => {
    if (!user || !month) return;
    async function load() {
      setLoading(true);
      const res = await staffFetch(`/api/TallyApp/reports?month=${month}`, undefined, token);
      if (!res.ok) return;
      const data = await res.json();
      setSummaries(data.summary || []);
      setLoading(false);
    }
    load();
  }, [month, user, token]);

  const totals = {
    clients: summaries.reduce((s, t) => s + t.total_clients, 0),
    parts: summaries.reduce((s, t) => s + t.total_parts, 0),
    commission: summaries.reduce((s, t) => s + t.total_commission, 0),
    revenue: summaries.reduce((s, t) => s + t.total_revenue, 0),
  };

  return (
    <div className="pb-20">
      <div className="bg-gradient-to-br from-[#009688] to-[#00796B] px-5 pt-12 pb-6">
        <h1 className="text-white text-xl font-serif font-bold">月度報表</h1>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="mt-3 bg-white/15 text-white border border-white/20 rounded-xl px-4 py-2 text-sm focus:outline-none"
        />
      </div>

      <div className="px-4 -mt-4 space-y-4 animate-fade-in">
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
          <p className="text-xs text-[#727876] mb-3">全店匯總</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-[#009688]/15 to-[#009688]/5 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-[#009688]">{totals.clients}</p>
              <p className="text-[11px] text-[#009688]/60">總客數</p>
            </div>
            <div className="bg-gradient-to-br from-[#1976D2]/15 to-[#1976D2]/5 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-[#EF6C00]">{totals.parts}</p>
              <p className="text-[11px] text-[#1976D2]/60">總次數</p>
            </div>
            <div className="bg-gradient-to-br from-[#EF6C00]/15 to-[#EF6C00]/5 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-gray-800">${totals.revenue.toFixed(0)}</p>
              <p className="text-[11px] text-[#EF6C00]/60">總營收</p>
            </div>
            <div className="bg-gradient-to-br from-gray-200/60 to-gray-200/20 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-gray-800">${totals.commission.toFixed(0)}</p>
              <p className="text-[11px] text-[#727876]">總抽成</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="w-6 h-6 border-2 border-[#009688]/30 border-t-[#009688] rounded-full animate-spin mx-auto" />
          </div>
        ) : summaries.length === 0 ? (
          <p className="text-center py-8 text-gray-400 text-sm">暫無數據</p>
        ) : (
          <div className="space-y-2">
            {summaries.map((t, i) => (
              <div
                key={t.therapist_id}
                className="bg-white rounded-xl p-4 border border-gray-200 animate-fade-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <p className="font-semibold text-gray-800 mb-2">{t.name}</p>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div>
                    <p className="font-bold text-gray-800">{t.total_clients}</p>
                    <p className="text-gray-400">客數</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{t.total_parts}</p>
                    <p className="text-gray-400">次數</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">${t.total_revenue.toFixed(0)}</p>
                    <p className="text-gray-400">營收</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">${t.total_commission.toFixed(0)}</p>
                    <p className="text-gray-400">抽成</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AdminNav />
    </div>
  );
}
