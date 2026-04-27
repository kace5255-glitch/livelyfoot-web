import { NextRequest, NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase-server';
import { getStaffSession } from '@/lib/staff-auth';

export async function GET() {
  const profile = await getStaffSession();
  if (!profile) return NextResponse.json({ error: '未登入' }, { status: 401 });

  const supabase = await createServiceSupabase();
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('active', true)
    .order('sort_order');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const profile = await getStaffSession();
  if (!profile || profile.role !== 'admin') {
    return NextResponse.json({ error: '無權限' }, { status: 403 });
  }

  const body = await req.json();
  const supabase = await createServiceSupabase();

  const { data, error } = await supabase
    .from('services')
    .insert({
      label: body.label,
      default_duration: body.default_duration,
      default_price: body.default_price,
      commission_type: body.commission_type || 'fixed',
      commission_value: body.commission_value || 0,
      sort_order: body.sort_order || 0,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
