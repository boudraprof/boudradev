import {useLocale, useTranslations} from 'next-intl';
import {routing} from '@/i18n/routing';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';
// import {Select} from '@/components/ui/Select'
export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t('label')}>
      {routing.locales.map((cur) => (
        <option key={cur} value={cur} className="rounded-[12px] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
          {t('locale', {locale: cur})}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
/***
 *  <option key={cur} value={cur}>
          {t('locale', {locale: cur})}
        </option>
 */