// 'use client';

// import {useTranslations} from 'next-intl';
// import {useEffect} from 'react';
// import PageLayout from '@/components/PageLayout';

// type Props = {
//   error: Error;
//   reset(): void;
// };

// export default function Error({error, reset}: Props) {
//   const t = useTranslations('Error');

//   useEffect(() => {
//     console.error(error);
//   }, [error]);

//   return (
//     // <PageLayout title={t('title')}>
//       <div>
//         {t.rich('description', {
//           p: (chunks) => <p className="mt-4">{chunks}</p>,
//           retry: (chunks) => (
//             <button
//               className="text-white underline underline-offset-2"
//               onClick={reset}
//               type="button"
//             >
//               {chunks}
//             </button>
//           )
//         })}
//       </div>
//     // </PageLayout>
//   );
// }


"use client"
import React, { Suspense, useEffect } from "react";
// import { ToastContainer } from "react-toastify";
import { useTranslations } from "next-intl";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function App() {
  // const {locale} = await params;
  // const { i18n } = useTranslations();
  // const isArabic = i18n.language === "ar" || i18n.language.startsWith("ar");
  // const isArabic = locale === "ar";

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollY = window.pageYOffset;
      sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          section.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Suspense
      fallback={
        <div className="z-10 h-screen w-full flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <div
        // style={{ direction: isArabic ? "rtl" : "ltr" }}
        className="bg-slate-950 text-white min-h-screen min-w-full"
      >
        {/* <ToastContainer /> */}
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </div>
    </Suspense>
  );
}