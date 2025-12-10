import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import {NextRequest} from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Get Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  
  // If no locale in URL and we have Accept-Language header, detect preferred language
  const pathname = request.nextUrl.pathname;
  const hasLocale = routing.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Only detect language if no locale is present in the URL
  if (!hasLocale && acceptLanguage && (pathname === '/' || !pathname.startsWith('/'))) {
    // Parse Accept-Language header
    const languages = acceptLanguage
      .split(',')
      .map((lang) => {
        const [code, q = 'q=1'] = lang.trim().split(';');
        const quality = parseFloat(q.replace('q=', ''));
        return { code: code.split('-')[0].toLowerCase(), quality };
      })
      .sort((a, b) => b.quality - a.quality);

    // Find first matching locale
    const preferredLocale = languages.find((lang) =>
      routing.locales.includes(lang.code as 'en' | 'ar')
    );

    if (preferredLocale) {
      const url = request.nextUrl.clone();
      url.pathname = `/${preferredLocale.code}${pathname === '/' ? '' : pathname}`;
      return Response.redirect(url);
    }
  }

  // Use next-intl middleware for locale handling
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};

