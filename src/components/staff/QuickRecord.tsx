'use client';

import { useState } from 'react';

type Service = {
  id: string;
  label: string;
  default_duration: number;
  default_price: number;
  commission_type: 'fixed' | 'percent';
  commission_value: number;
};

type RecordData = {
  service_id: string;
  price: number;
  duration: number;
  note: string;
  service_date: string;
};

export default function QuickRecord({
  services,
  onRecord,
  onClose,
}: {
  services: Service[];
  onRecord: (data: RecordData) => void;
  onClose: () => void;
}) {
  const now = new Date();
  const [date, setDate] = useState(now.toISOString().split('T')[0]);
  const [time, setTime] = useState(now.toTimeString().slice(0, 5));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(60);
  const [customerName, setCustomerName] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const selected = services.find((s) => s.id === selectedId) || null;

  const commission = selected
    ? selected.commission_type === 'percent'
      ? selected.default_price * (selected.commission_value / 100)
      : selected.commission_value
    : 0;

  async function handleSave() {
    if (!selected) return;
    setSaving(true);
    await onRecord({
      service_id: selected.id,
      price: selected.default_price,
      duration,
      note: customerName.trim(),
      service_date: date,
    });
    setSaving(false);
    setSuccess(true);
    setTimeout(() => { setSuccess(false); onClose(); }, 800);
  }

  if (success) {
    return (
      <div className="fixed inset-0 bg-white z-[60] flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-16 h-16 bg-[#009688]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#009688]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-[#009688] font-semibold text-lg">記錄成功</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-50 z-[60] flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-6 pb-4 bg-white border-b border-gray-100">
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-[#009688]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-gray-800 flex-1 text-center pr-8">新增服務紀錄</h1>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 pb-40">
        {/* Date & Time */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div>
            <p className="text-sm text-[#727876] mb-2">日期</p>
            <div className="relative">
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#009688]/30" />
            </div>
          </div>
          <div>
            <p className="text-sm text-[#727876] mb-2">時間</p>
            <div className="relative">
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#009688]/30" />
            </div>
          </div>
        </div>

        {/* Duration selection */}
        <div className="mt-5">
          <p className="text-sm text-[#727876] mb-2">服務時長 (分鐘)</p>
          <div className="flex flex-wrap gap-2">
            {[30, 45, 60, 90, 120].map((d) => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  duration === d
                    ? 'bg-[#009688] text-white'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-[#009688]/50'
                }`}
              >
                {d}分
              </button>
            ))}
          </div>
        </div>

        {/* Service selection */}
        <div className="mt-5">
          <p className="text-sm text-[#727876] mb-2">服務項目</p>
          <div className="flex flex-wrap gap-2">
            {services.map((s) => (
              <button
                key={s.id}
                onClick={() => { setSelectedId(s.id); setDuration(s.default_duration); }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedId === s.id
                    ? 'bg-[#009688] text-white'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-[#009688]/50'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Commission display */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div>
            <p className="text-sm text-[#727876] mb-2">抽成 / 業績 ($)</p>
            <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-2">
              <span className="text-sm text-[#727876]">$</span>
              <span className="text-sm font-semibold text-gray-800">{selected ? commission.toFixed(0) : '—'}</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-[#727876] mb-2">客人稱呼 (選填)</p>
            <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#727876] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="例如: 王先生"
                className="flex-1 text-sm text-gray-800 placeholder-[#727876]/40 bg-transparent focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fixed bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-5 pt-3 pb-8 z-[61]">
        <button
          onClick={handleSave}
          disabled={!selected || saving}
          className="w-full py-3.5 rounded-2xl bg-[#009688] text-white font-semibold text-base flex items-center justify-center gap-2 disabled:opacity-40 hover:bg-[#00796B] transition-colors active:scale-[0.98]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          {saving ? '儲存中...' : '儲存紀錄'}
        </button>
      </div>
    </div>
  );
}
