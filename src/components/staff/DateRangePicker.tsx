'use client';

import { useState, useRef, useEffect } from 'react';

type Props = {
  startDate: string;
  endDate: string;
  onChange: (start: string, end: string) => void;
};

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

function fmt(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function display(iso: string) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

function getCalendarDays(year: number, month: number) {
  const first = new Date(year, month, 1);
  const startDay = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();

  const cells: { day: number; current: boolean; date: string }[] = [];

  for (let i = startDay - 1; i >= 0; i--) {
    const d = prevDays - i;
    const dt = new Date(year, month - 1, d);
    cells.push({ day: d, current: false, date: fmt(dt) });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dt = new Date(year, month, d);
    cells.push({ day: d, current: true, date: fmt(dt) });
  }

  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    const dt = new Date(year, month + 1, d);
    cells.push({ day: d, current: false, date: fmt(dt) });
  }

  return cells;
}
export default function DateRangePicker({ startDate, endDate, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(() => new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(() => new Date().getMonth());
  const [picking, setPicking] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [open]);

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  }

  function handleDayClick(date: string) {
    if (!picking) {
      setPicking(date);
    } else {
      const [a, b] = [picking, date].sort();
      onChange(a, b);
      setPicking(null);
      setOpen(false);
    }
  }

  function isInRange(date: string) {
    if (picking) {
      return false;
    }
    return date >= startDate && date <= endDate;
  }

  function isStart(date: string) { return date === (picking || startDate); }
  function isEnd(date: string) { return !picking && date === endDate; }
  function quickSelect(start: Date, end: Date) {
    onChange(fmt(start), fmt(end));
    setPicking(null);
    setOpen(false);
  }

  const today = new Date();
  const todayStr = fmt(today);

  const shortcuts = [
    { label: '今天', fn: () => quickSelect(today, today) },
    { label: '昨天', fn: () => { const d = new Date(); d.setDate(d.getDate() - 1); quickSelect(d, d); } },
    { label: '本周', fn: () => { const d = new Date(); const day = d.getDay(); const s = new Date(d); s.setDate(d.getDate() - day); quickSelect(s, d); } },
    { label: '本月', fn: () => { const s = new Date(today.getFullYear(), today.getMonth(), 1); quickSelect(s, today); } },
    { label: '上月', fn: () => { const s = new Date(today.getFullYear(), today.getMonth() - 1, 1); const e = new Date(today.getFullYear(), today.getMonth(), 0); quickSelect(s, e); } },
  ];

  const cells = getCalendarDays(viewYear, viewMonth);
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between bg-white/15 border border-white/20 rounded-xl px-4 py-2.5 text-white text-sm"
      >
        <span>{display(startDate)} ~ {display(endDate)}</span>
        <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 z-50 overflow-hidden animate-fade-in">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <span className="text-sm font-semibold text-gray-800">{viewYear}年 {viewMonth + 1}月</span>
            <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
          <div className="px-3 pt-2 pb-1">
            <div className="grid grid-cols-7 mb-1">
              {WEEKDAYS.map((w) => (
                <div key={w} className="text-center text-[11px] text-[#727876] py-1">{w}</div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {cells.map((cell, i) => {
                const inRange = isInRange(cell.date);
                const start = isStart(cell.date);
                const end = isEnd(cell.date);
                const isToday = cell.date === todayStr;
                const selected = start || end;
                return (
                  <button
                    key={i}
                    onClick={() => handleDayClick(cell.date)}
                    className={`relative h-9 text-sm transition-all ${
                      !cell.current ? 'text-gray-300' : 'text-gray-800'
                    } ${inRange && !selected ? 'bg-[#009688]/10' : ''} ${
                      selected ? 'bg-[#009688] text-white rounded-full font-semibold' : ''
                    } ${start && !end && inRange ? 'rounded-l-full' : ''} ${
                      end && !start && inRange ? 'rounded-r-full' : ''
                    }`}
                  >
                    <span className={isToday && !selected ? 'underline underline-offset-2 decoration-[#009688]' : ''}>
                      {cell.day}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-2 px-3 pb-3 pt-1 border-t border-gray-100 mt-1">
            {shortcuts.map((s) => (
              <button
                key={s.label}
                onClick={s.fn}
                className="flex-1 py-1.5 text-xs font-medium text-[#009688] bg-[#009688]/8 rounded-lg hover:bg-[#009688]/15 transition-colors"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
