import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(zh-TW|en|ja|ko|es|fr|de|pt|it|ru|ar|th|vi|id|ms|nl|tr|hi)/:path*'],
};
