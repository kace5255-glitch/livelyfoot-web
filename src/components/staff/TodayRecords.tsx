'use client';

type ServiceRecord = {
  id: string;
  duration: number;
  price: number;
  commission: number;
  note: string | null;
  created_at: string;
  services: { label: string };
};

const serviceColors: Record<string, { bg: string; text: string }> = {};
const colorPool = [
  { bg: 'bg-[#009688]/10', text: 'text-[#009688]', hex: '#009688' },
  { bg: 'bg-[#1976D2]/10', text: 'text-[#1976D2]', hex: '#1976D2' },
  { bg: 'bg-[#EF6C00]/10', text: 'text-[#EF6C00]', hex: '#EF6C00' },
  { bg: 'bg-[#727876]/10', text: 'text-[#727876]', hex: '#727876' },
  { bg: 'bg-[#00796B]/10', text: 'text-[#00796B]', hex: '#00796B' },
];

function getServiceColor(label: string) {
  if (!serviceColors[label]) {
    const idx = Object.keys(serviceColors).length % colorPool.length;
    serviceColors[label] = colorPool[idx];
  }
  return serviceColors[label];
}

export default function TodayRecords({
  records,
  onDelete,
}: {
  records: ServiceRecord[];
  onDelete: (id: string) => void;
}) {
  if (records.length === 0) {
    return (
      <div className="text-center py-8 text-[#727876] text-sm">
        今日暫無紀錄
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {records.map((r, i) => {
        const color = getServiceColor(r.services?.label || '未知');
        const time = new Date(r.created_at).toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' });
        return (
          <div
            key={r.id}
            className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-3 animate-fade-in hover:shadow-md transition-all"
            style={{ animationDelay: `${i * 50}ms`, borderLeftWidth: '3px', borderLeftColor: color.hex }}
          >
            <div className={`w-10 h-10 rounded-full ${color.bg} flex items-center justify-center shrink-0`}>
              <svg className={`w-5 h-5 ${color.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800 text-sm">{r.services?.label}</p>
              <p className="text-xs text-[#727876] mt-0.5">{time}{r.duration > 1 ? ` · ${r.duration}分` : ''}</p>
            </div>
            <div className="text-right shrink-0 flex items-center gap-2">
              <div>
                <p className="text-sm font-semibold text-gray-800">抽${Number(r.commission).toLocaleString()}</p>
              </div>
              <button
                onClick={() => onDelete(r.id)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                aria-label="刪除"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
