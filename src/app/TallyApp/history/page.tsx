'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import StaffNav from '@/components/staff/StaffNav';
import DateRangePicker from '@/components/staff/DateRangePicker';
import { useStaffAuth } from '@/lib/use-staff-auth';
import { staffFetch } from '@/lib/staff-fetch';

type ServiceDef = { id: string; label: string };

type Record = {
  id: string;
  duration: number;
  price: number;
  commission: number;
  service_date: string;
  created_at: string;
  services: { label: string };
};

export default function HistoryPage() {
  const { user, token, loading: authLoading } = useStaffAuth();
  const searchParams = useSearchParams();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [records, setRecords] = useState<Record[]>([]);
  const [services, setServices] = useState<ServiceDef[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    if (from && to) {
      setStartDate(from);
      setEndDate(to);
    } else {
      const d = new Date();
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      setStartDate(`${y}-${m}-01`);
      setEndDate(d.toISOString().split('T')[0]);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!user || !startDate || !endDate || !token) return;
    let cancelled = false;
    async function load() {
      setLoading(true);
      const [svcRes, recRes] = await Promise.all([
        staffFetch('/api/TallyApp/services', undefined, token),
        staffFetch(`/api/TallyApp/records?from=${startDate}&to=${endDate}`, undefined, token),
      ]);
      if (cancelled) return;
      const svcData = await svcRes.json();
      const recData = await recRes.json();
      if (Array.isArray(svcData)) setServices(svcData);
      setRecords(Array.isArray(recData) ? recData : []);
      setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, [startDate, endDate, user, token]);

  const grouped = records.reduce<{ [date: string]: Record[] }>((acc, r) => {
    (acc[r.service_date] ||= []).push(r);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  const monthTotal = {
    clients: records.length,
    parts: records.length,
    commission: records.reduce((s, r) => s + Number(r.commission), 0),
  };

  const monthServiceBreakdown: { [label: string]: number } = {};
  services.forEach(s => { monthServiceBreakdown[s.label] = 0; });
  records.forEach(r => {
    const label = r.services?.label || '未知';
    monthServiceBreakdown[label] = (monthServiceBreakdown[label] || 0) + 1;
  });

  if (authLoading) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#009688]/30 border-t-[#009688] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="bg-gradient-to-br from-[#009688] to-[#00796B] px-5 pt-12 pb-6">
        <h1 className="text-white text-xl font-serif font-bold">歷史紀錄</h1>
        <div className="mt-3">
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onChange={(s, e) => { setStartDate(s); setEndDate(e); }}
          />
        </div>
      </div>

      <div className="px-4 -mt-4 space-y-4 animate-fade-in">
        {loading ? (
          <div className="text-center py-12">
            <div className="w-6 h-6 border-2 border-[#009688]/30 border-t-[#009688] rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          <>
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
          <p className="text-xs text-[#727876] mb-2">區間匯總</p>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-xl font-bold text-[#009688]">{monthTotal.clients}</p>
              <p className="text-xs text-[#727876]">客數</p>
            </div>
            <div>
              <p className="text-xl font-bold text-[#EF6C00]">{monthTotal.parts}</p>
              <p className="text-xs text-[#727876]">次數</p>
            </div>
            <div>
              <p className="text-xl font-bold text-gray-800">${monthTotal.commission.toFixed(0)}</p>
              <p className="text-xs text-[#727876]">抽成</p>
            </div>
          </div>
          {(() => {
            const entries = Object.entries(monthServiceBreakdown);
            const rows: [string, number][][] = [];
            for (let i = 0; i < entries.length; i += 4) rows.push(entries.slice(i, i + 4) as [string, number][]);
            return entries.length > 0 ? (
              <div className="mt-3 pt-3 border-t border-gray-100 overflow-hidden rounded-xl">
                {rows.map((row, ri) => (
                  <div key={ri} className={`grid grid-cols-4 ${ri > 0 ? 'border-t border-gray-100' : ''}`}>
                    {row.map(([label, count], ci) => (
                      <div key={label} className={`py-3 px-2 text-center ${ci > 0 ? 'border-l border-gray-100' : ''}`}>
                        <p className="text-sm text-[#727876] mb-1 truncate">{label}</p>
                        <p className="text-lg font-bold text-gray-800">{count}<span className="text-sm font-normal text-[#727876] ml-0.5">次</span></p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : null;
          })()}
        </div>

        {sortedDates.length === 0 ? (
          <p className="text-center py-8 text-gray-400 text-sm">此區間暫無紀錄</p>
        ) : (
          sortedDates.map((date) => {
            const dayRecords = grouped[date];
            const dayTotal = dayRecords.reduce((s, r) => s + Number(r.commission), 0);
            const dayParts = dayRecords.length;
            const dayServiceBreakdown = dayRecords.reduce<{ [label: string]: number }>((acc, r) => {
              const label = r.services?.label || '未知';
              acc[label] = (acc[label] || 0) + 1;
              return acc;
            }, {});
            return (
              <div key={date}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-800">{date}</p>
                  <p className="text-xs text-[#727876]">
                    {dayParts} 次 · ${dayTotal.toFixed(0)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {Object.entries(dayServiceBreakdown).map(([label, count]) => (
                    <span key={label} className="text-[11px] bg-[#EF6C00]/10 text-[#EF6C00] px-2 py-0.5 rounded-full">
                      {label} {count}次
                    </span>
                  ))}
                </div>
                <div className="space-y-1.5">
                  {dayRecords.map((r) => (
                    <div key={r.id} className="bg-white rounded-xl p-3 border border-gray-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#EF6C00]/10 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-[#EF6C00]">1次</span>
                        </div>
                        <span className="text-sm font-medium text-gray-800">{r.services?.label}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-800">${r.price}</span>
                        <span className="text-xs text-gray-400 ml-2">抽${Number(r.commission).toFixed(0)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
          </>
        )}
      </div>

      <StaffNav />
    </div>
  );
}
