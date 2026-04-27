'use client';

import { useState, useEffect } from 'react';
import AdminNav from '@/components/staff/AdminNav';
import { useStaffAuth } from '@/lib/use-staff-auth';
import { staffFetch } from '@/lib/staff-fetch';

type TherapistSummary = {
  id: string;
  name: string;
  clients: number;
  parts: number;
  commission: number;
  serviceBreakdown: { [label: string]: number };
};

export default function AdminOverviewPage() {
  const { user, token, loading: authLoading } = useStaffAuth('admin');
  const [therapists, setTherapists] = useState<TherapistSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [today, setToday] = useState('');

  useEffect(() => {
    setToday(new Date().toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    if (!user || !today) return;
    async function load() {
      const [thRes, recRes] = await Promise.all([
        staffFetch('/api/TallyApp/therapists', undefined, token),
        staffFetch(`/api/TallyApp/records?date=${today}`, undefined, token),
      ]);
      const allTherapists = thRes.ok ? await thRes.json() : [];
      const todayRecords = recRes.ok ? await recRes.json() : [];

      const summaries = (Array.isArray(allTherapists) ? allTherapists : [])
        .filter((t: { role: string; active: boolean }) => t.role === 'therapist' && t.active !== false)
        .map((t: { id: string; name: string }) => {
          const recs = (Array.isArray(todayRecords) ? todayRecords : [])
            .filter((r: { therapist_id: string }) => r.therapist_id === t.id);
          const serviceBreakdown = recs.reduce<{ [label: string]: number }>((acc, r: { duration: number; services?: { label: string } }) => {
            const label = r.services?.label || '未知';
            acc[label] = (acc[label] || 0) + r.duration;
            return acc;
          }, {});
          return {
            id: t.id,
            name: t.name,
            clients: recs.length,
            parts: recs.reduce((s: number, r: { duration: number }) => s + r.duration, 0),
            commission: recs.reduce((s: number, r: { commission: number }) => s + Number(r.commission), 0),
            serviceBreakdown,
          };
        });

      setTherapists(summaries);
      setLoading(false);
    }
    load();
  }, [user, token, today]);

  if (authLoading || loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#009688]/30 border-t-[#009688] rounded-full animate-spin" />
      </div>
    );
  }

  const totals = {
    clients: therapists.reduce((s, t) => s + t.clients, 0),
    parts: therapists.reduce((s, t) => s + t.parts, 0),
    commission: therapists.reduce((s, t) => s + t.commission, 0),
  };

  const totalServiceBreakdown = therapists.reduce<{ [label: string]: number }>((acc, t) => {
    Object.entries(t.serviceBreakdown).forEach(([label, count]) => {
      acc[label] = (acc[label] || 0) + count;
    });
    return acc;
  }, {});

  return (
    <div className="pb-20">
      <div className="bg-gradient-to-br from-[#009688] to-[#00796B] px-5 pt-12 pb-6">
        <p className="text-white/50 text-sm">{today}</p>
        <h1 className="text-white text-xl font-serif font-bold mt-1">今日總覽</h1>
      </div>

      <div className="px-4 -mt-4 space-y-4 animate-fade-in">
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-gradient-to-br from-[#009688]/15 to-[#009688]/5 rounded-xl p-3">
              <p className="text-2xl font-bold text-[#009688]">{totals.clients}</p>
              <p className="text-[11px] text-[#727876]">總客數</p>
            </div>
            <div className="bg-gradient-to-br from-[#1976D2]/15 to-[#1976D2]/5 rounded-xl p-3">
              <p className="text-2xl font-bold text-[#EF6C00]">{totals.parts}</p>
              <p className="text-[11px] text-[#727876]">總次數</p>
            </div>
            <div className="bg-gradient-to-br from-[#EF6C00]/15 to-[#EF6C00]/5 rounded-xl p-3">
              <p className="text-2xl font-bold text-gray-800">${totals.commission.toFixed(0)}</p>
              <p className="text-[11px] text-[#727876]">總抽成</p>
            </div>
          </div>
        </div>

        {Object.keys(totalServiceBreakdown).length > 0 && (
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
            <p className="text-xs text-[#727876] mb-2">今日各項目次數</p>
            <div className="space-y-1.5">
              {Object.entries(totalServiceBreakdown).sort((a, b) => b[1] - a[1]).map(([label, count]) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-sm text-gray-800">{label}</span>
                  <span className="text-sm font-semibold text-[#EF6C00]">{count} 次</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {therapists.length === 0 ? (
          <p className="text-center py-8 text-gray-400 text-sm">暫無師傅</p>
        ) : (
          <div className="space-y-2">
            {therapists.map((t, i) => (
              <div
                key={t.id}
                className="bg-white rounded-xl p-4 border border-gray-200 animate-fade-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <p className="font-semibold text-gray-800">{t.name}</p>
                <div className="flex gap-4 mt-1.5 text-xs text-[#727876]">
                  <span>{t.clients} 位客人</span>
                  <span>{t.parts} 次</span>
                  <span>抽成 ${t.commission.toFixed(0)}</span>
                </div>
                {Object.keys(t.serviceBreakdown).length > 0 && (
                  <div className="mt-2 pt-2 border-t border-gray-100 space-y-1">
                    {Object.entries(t.serviceBreakdown).sort((a, b) => b[1] - a[1]).map(([label, count]) => (
                      <div key={label} className="flex items-center justify-between text-xs">
                        <span className="text-[#727876]">{label}</span>
                        <span className="text-[#EF6C00] font-medium">{count} 次</span>
                      </div>
                    ))}
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
