import {notFound} from 'next/navigation';
import {Locale, hasLocale, NextIntlClientProvider} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {clsx} from 'clsx';
// import {Inter} from 'next/font/google';
import {routing} from '@/i18n/routing';
import Navigation from '@/components/Navigation';
import {roboto, satisfy} from '@/lib/fonts'
import './styles.css';

// const inter = Inter({subsets: ['latin']});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}



export async function generateMetadata(
  props: Omit<LayoutProps<'/[locale]'>, 'children'>
) {
  const {locale} = await props.params;

  const t = await getTranslations({
    locale: locale as Locale,
    namespace: 'Layout'
  });

  return {
    title: t('title')
  };
}



export default async function Layout({
  children,
  params
}: LayoutProps<'/[locale]'>) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body
      style={{direction: locale === 'ar' ? 'rtl' : 'ltr'}} //TODO: use clssName ienstead style Object 
      className={clsx(
        roboto.className, 
        'flex h-full flex-col  justify-center')}>
        <NextIntlClientProvider>
          {/* <Navigation /> */}
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}