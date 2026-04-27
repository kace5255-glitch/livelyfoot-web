import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

async function updateSupabaseSession(request: NextRequest) {
  const { createServerClient } = await import('@supabase/ssr');
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  await supabase.auth.getUser();
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect /[locale]/TallyApp/... back to /TallyApp/...
  const localePrefix = /^\/(zh-TW|en|ja|ko|es|fr|de|pt|it|ru|ar|th|vi|id|ms|nl|tr|hi)(\/TallyApp.*)/;
  const localeMatch = pathname.match(localePrefix);
  if (localeMatch) {
    return NextResponse.redirect(new URL(localeMatch[2] || '/TallyApp', request.url));
  }

  if (pathname.startsWith('/TallyApp') || pathname.startsWith('/api/TallyApp')) {
    return updateSupabaseSession(request);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(zh-TW|en|ja|ko|es|fr|de|pt|it|ru|ar|th|vi|id|ms|nl|tr|hi)/:path*', '/TallyApp', '/TallyApp/:path*', '/api/TallyApp/:path*'],
};
