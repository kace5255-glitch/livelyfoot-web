import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  const { currentPassword, newPassword } = await req.json();

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: '請填寫所有欄位' }, { status: 400 });
  }
  if (newPassword.length < 6) {
    return NextResponse.json({ error: '新密碼至少需要 6 個字元' }, { status: 400 });
  }

  const res = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return req.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: '未登入' }, { status: 401 });
  }

  // Verify current password by re-authenticating
  const verifyClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { error: verifyError } = await verifyClient.auth.signInWithPassword({
    email: session.user.email!,
    password: currentPassword,
  });
  if (verifyError) {
    return NextResponse.json({ error: '目前密碼不正確' }, { status: 403 });
  }

  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) {
    return NextResponse.json({ error: '密碼更新失敗' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
