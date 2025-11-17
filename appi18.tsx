import  { Suspense } from 'react';
import logo from '../public/vite.svg';
import './App.css';
import { useTranslation, Trans } from 'react-i18next';
import { useState } from 'react';

const lngs = {
  en: { nativeName: 'English' },
  de: { nativeName: 'Deutsch' },
  ar: { nativeName: 'arabic' }
};

const Footer = ({ t }) => (
  <div className="Footer">
    <div>{t('footer.date', { date: new Date() })}</div>
  </div>
);
function App() {
  const { t, i18n } = useTranslation();
  const [count, setCounter] = useState(0);

  return (
    
    <div>
        <img src={logo} className="App-logo" alt="logo" />
      <header className="flex flex-col items-center justify-between min-h-screen p-24 bg-gray-300" >
        <div>
          {Object.keys(lngs).map((lng) => (
            <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} className='text-white ' type="submit" onClick={() => {
              i18n.changeLanguage(lng);
              setCounter(count + 1);
            }}>
              {lngs[lng].nativeName}
            </button>
          ))}
        </div>
        <p>
          <i>{t('counter', { count })}</i>
        </p>
        <p>
          <Trans i18nKey="description.part1">
            Edit <code>src/App.js</code> and save to reload.
          </Trans>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('description.part2')}
        </a>
      </header>
{/* <Footer t={t}/> */}
    </div>
  );
}

   

export default function WrappedApp() {
  return (
    <Suspense fallback="...is loading">
      <App />
    </Suspense>
  );
}