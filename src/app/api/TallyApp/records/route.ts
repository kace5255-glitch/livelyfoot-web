import { NextRequest, NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase-server';
import { getStaffSession } from '@/lib/staff-auth';

export async function GET(req: NextRequest) {
  const profile = await getStaffSession();
  if (!profile) return NextResponse.json({ error: '未登入' }, { status: 401 });

  const supabase = await createServiceSupabase();
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');
  const month = searchParams.get('month');
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const therapistId = searchParams.get('therapist_id');

  let query = supabase
    .from('time_records')
    .select('*, services(label)')
    .order('created_at', { ascending: false });

  if (profile.role !== 'admin') {
    query = query.eq('therapist_id', profile.id);
  } else if (therapistId) {
    query = query.eq('therapist_id', therapistId);
  }

  if (date) {
    query = query.eq('service_date', date);
  } else if (from && to) {
    query = query.gte('service_date', from).lte('service_date', to);
  } else if (month) {
    const start = `${month}-01`;
    const [y, m] = month.split('-').map(Number);
    const end = new Date(y, m, 0).toISOString().split('T')[0];
    query = query.gte('service_date', start).lte('service_date', end);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const profile = await getStaffSession();
  if (!profile) return NextResponse.json({ error: '未登入' }, { status: 401 });

  const body = await req.json();
  const supabase = await createServiceSupabase();

  const { data: service } = await supabase
    .from('services')
    .select('commission_type, commission_value, default_price')
    .eq('id', body.service_id)
    .single();

  if (!service) return NextResponse.json({ error: '服務不存在' }, { status: 400 });

  const price = body.price ?? service.default_price;
  const commission = service.commission_type === 'percent'
    ? price * (service.commission_value / 100)
    : service.commission_value;

  const { data, error } = await supabase
    .from('time_records')
    .insert({
      therapist_id: profile.id,
      service_id: body.service_id,
      duration: body.duration || 1,
      price,
      commission,
      note: body.note || null,
      service_date: body.service_date || new Date().toISOString().split('T')[0],
    })
    .select('*, services(label)')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
