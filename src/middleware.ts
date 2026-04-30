import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default intlMiddleware;

export const config = {
  matcher: ['/', '/(zh-TW|en|ja|ko|es|fr|de|pt|it|ru|ar|th|vi|id|ms|nl|tr|hi)/:path*'],
};
