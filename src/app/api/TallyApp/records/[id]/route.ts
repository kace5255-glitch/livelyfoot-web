import { NextRequest, NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase-server';
import { getStaffSession } from '@/lib/staff-auth';

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const profile = await getStaffSession();
  if (!profile) return NextResponse.json({ error: '未登入' }, { status: 401 });

  const { id } = await params;
  const supabase = await createServiceSupabase();

  let query = supabase.from('time_records').delete().eq('id', id);
  if (profile.role !== 'admin') {
    query = query.eq('therapist_id', profile.id);
  }

  const { error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
