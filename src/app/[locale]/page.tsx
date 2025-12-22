"use client"
import { Suspense, useEffect, use } from "react";


import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default  function App({params}:  LayoutProps<'/[locale]'>) {
  
  const {locale}  =   use(params) as {locale: "en" | "ar"} ;

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollY = window.pageYOffset;
      sections.forEach((section) => {
        const sectionHeight = (section as HTMLElement)?.offsetHeight;
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        
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
        className="bg-slate-950 text-white min-h-screen min-w-full"
      >
        {/* <ToastContainer /> */}
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience locale={locale}/>
        <Contact />
      </div>
    </Suspense>
  );
}