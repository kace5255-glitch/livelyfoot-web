import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  const email = username.includes('@') ? username : `${username}@staff.local`;

  const res = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return NextResponse.json({ error: '帳號或密碼錯誤' }, { status: 401 });
  }

  // Use service_role to read profile (bypasses RLS since session cookies aren't set yet)
  const serviceClient = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll() { return []; }, setAll() {} } }
  );

  const { data: profile } = await serviceClient
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single();

  if (!profile?.active) {
    await supabase.auth.signOut();
    return NextResponse.json({ error: '帳號已停用' }, { status: 403 });
  }

  const response = NextResponse.json({ profile });
  res.cookies.getAll().forEach((c) => {
    response.cookies.set(c.name, c.value);
  });
  return response;
}
