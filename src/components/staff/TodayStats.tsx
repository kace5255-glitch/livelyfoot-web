'use client';

type Stats = { clients: number; parts: number; commission: number };
type Breakdown = { [label: string]: number };

export default function TodayStats({ stats, breakdown }: { stats: Stats; breakdown: Breakdown }) {
  const entries = Object.entries(breakdown);
  const rows: [string, number][][] = [];
  for (let i = 0; i < entries.length; i += 4) {
    rows.push(entries.slice(i, i + 4) as [string, number][]);
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-8 h-8 rounded-full bg-[#009688]/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-[#009688]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-xs text-[#727876]">客數</span>
          </div>
          <p className="text-2xl font-bold text-[#009688]">{stats.clients}<span className="text-sm font-normal text-[#727876] ml-0.5">人</span></p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-8 h-8 rounded-full bg-[#1976D2]/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-[#1976D2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xs text-[#727876]">次數</span>
          </div>
          <p className="text-2xl font-bold text-[#1976D2]">{stats.parts}<span className="text-sm font-normal text-[#727876] ml-0.5">次</span></p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-8 h-8 rounded-full bg-[#EF6C00]/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-[#EF6C00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xs text-[#727876]">抽成</span>
          </div>
          <p className="text-2xl font-bold text-[#EF6C00]">${stats.commission.toLocaleString()}</p>
        </div>
      </div>

      {/* Service breakdown */}
      {entries.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {rows.map((row, ri) => (
            <div key={ri} className={`grid grid-cols-4 ${ri > 0 ? 'border-t border-gray-100' : ''}`}>
              {row.map(([label, count], ci) => (
                <div key={label} className={`py-3.5 px-2 text-center ${ci > 0 ? 'border-l border-gray-100' : ''}`}>
                  <p className="text-sm text-[#727876] mb-1.5 truncate">{label}</p>
                  <p className="text-lg font-bold text-gray-800">{count}<span className="text-sm font-normal text-[#727876] ml-0.5">次</span></p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
