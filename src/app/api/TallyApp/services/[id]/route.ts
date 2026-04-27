import { NextRequest, NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase-server';
import { getStaffSession } from '@/lib/staff-auth';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const profile = await getStaffSession();
  if (!profile || profile.role !== 'admin') {
    return NextResponse.json({ error: '無權限' }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();
  const supabase = await createServiceSupabase();

  const { data, error } = await supabase
    .from('services')
    .update(body)
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const profile = await getStaffSession();
  if (!profile || profile.role !== 'admin') {
    return NextResponse.json({ error: '無權限' }, { status: 403 });
  }

  const { id } = await params;
  const supabase = await createServiceSupabase();

  const { error } = await supabase
    .from('services')
    .update({ active: false })
    .eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
