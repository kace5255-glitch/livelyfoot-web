import { NextRequest, NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase-server';
import { getStaffSession } from '@/lib/staff-auth';

export async function GET(req: NextRequest) {
  const profile = await getStaffSession();
  if (!profile || profile.role !== 'admin') {
    return NextResponse.json({ error: '無權限' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const month = searchParams.get('month');
  if (!month) return NextResponse.json({ error: '需要 month 參數' }, { status: 400 });

  const [y, m] = month.split('-').map(Number);
  const start = `${month}-01`;
  const end = new Date(y, m, 0).toISOString().split('T')[0];

  const supabase = await createServiceSupabase();

  const { data: records, error } = await supabase
    .from('time_records')
    .select('*, services(label), profiles!therapist_id(name)')
    .gte('service_date', start)
    .lte('service_date', end)
    .order('service_date');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: therapists } = await supabase
    .from('profiles')
    .select('id, name, commission_rate')
    .eq('role', 'therapist')
    .eq('active', true);

  const summary = (therapists || []).map((t) => {
    const tRecords = (records || []).filter((r) => r.therapist_id === t.id);
    return {
      therapist_id: t.id,
      name: t.name,
      total_clients: tRecords.length,
      total_parts: tRecords.reduce((sum, r) => sum + r.duration, 0),
      total_commission: tRecords.reduce((sum, r) => sum + Number(r.commission), 0),
      total_revenue: tRecords.reduce((sum, r) => sum + Number(r.price), 0),
    };
  });

  return NextResponse.json({ summary, records });
}
