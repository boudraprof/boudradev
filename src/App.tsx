import React, { Suspense, useEffect } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import { ToastContainer } from "react-toastify";

export default function App() {
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollY = window.pageYOffset;

      sections.forEach(section => {
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
    <Suspense fallback={<div className="z-10">Loading...</div>}>
    <div
    // style={{direction: "rtl"}}
    className="bg-slate-950 text-white min-h-screen min-w-full">
      <ToastContainer />
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
