import { NextRequest, NextResponse } from 'next/server';
import { getStaffSession } from '@/lib/staff-auth';
import { createServiceSupabase } from '@/lib/supabase-server';

export async function GET() {
  const profile = await getStaffSession();
  if (!profile) {
    return NextResponse.json({ error: '未登入' }, { status: 401 });
  }
  return NextResponse.json(profile);
}

export async function PUT(req: NextRequest) {
  const profile = await getStaffSession();
  if (!profile) {
    return NextResponse.json({ error: '未登入' }, { status: 401 });
  }

  const { name } = await req.json();
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return NextResponse.json({ error: '名稱不可為空' }, { status: 400 });
  }

  const serviceClient = await createServiceSupabase();
  const { error } = await serviceClient
    .from('profiles')
    .update({ name: name.trim() })
    .eq('id', profile.id);

  if (error) {
    return NextResponse.json({ error: '更新失敗' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
