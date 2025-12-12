"use client";
import LetterGlitch from "@/components/LetterGlitch";
import { roboto } from "@/lib/fonts";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";


/**
 *
 * TODO: add a messages for this page to locals
 */
const NotFoundPage = () => {
  const t = useTranslations("notFound");

  return (
    <div
      className={`${roboto.className} relative  bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 h-screen w-full`}
    >
      <div className="flex justify-center items-center flex-col h-screen text-white z-100">
        <h1 className="text-5xl mb-1 z-101">{t('title')} 404</h1>
        <p className="py-5">{t('description')}</p>
        <Button
          size="lg"
          className="bg-gradient-to-r z-101 from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-6 text-lg"
        >
          <Link href={"/"}>{t('goHomeButton')}</Link>
        </Button>
      </div>
      <div className="absolute inset-0 opacity-20  text-white z-99">
        <LetterGlitch
        glitchSpeed={50}
        centerVignette={true}
        outerVignette={false}
        smooth={true}

      />
      </div>
    </div>
  );
};

export default NotFoundPage;
