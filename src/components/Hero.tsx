import { motion } from "framer-motion";
import { Github, Mail, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import TextType from "@/components/TextType";
import { useMessages, useTranslations } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";
import Image from "next/image";

export default function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const t = useTranslations();
  const messages = useMessages();
  const textType = messages.hero.textType;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <nav className="absolute  h-15 inset-0 z-20">
        <div className="flex justify-around items-center mx-[30%] h-10  max-sm:mx-[15%] mt-3 rounded-full bg-gradient-to-br from-blue-600 via-white to-blue-500 opacity-60">
          <Image width={100} height={100} src={'/logo.png'} alt="logo"/>
          <LocaleSwitcher />
        </div>
      </nav>
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
        <div className="absolute inset-0 bg-[url('/bg.jpg')] opacity-5 bg-cover bg-center" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="size-32 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-1">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-4xl font-bold">
                👨‍💻
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className=" max-md:text-2xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-300 bg-clip-text text-transparent"
          >
            <TextType
              text={textType as string[] | string}
              className="text-6xl max-md:text-[20px] my-3 "
              typingSpeed={75}
              pauseDuration={2000}
              showCursor={true}
              cursorClassName="text-white"
              cursorCharacter="_"
            />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto mb-12"
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4 justify-center mb-12"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("projects")}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-6 text-lg"
            >
              {t("hero.viewMyWorkTitle")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("contact")}
              className="bg-gradient-to-r from-gray-600 to-black-600 hover:border-blue-500 hover:text-blue-400 hover:bg-blue-500/10 px-8 py-6 text-lg"
            >
              {t("hero.getInTouchTitle")}
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex gap-6 justify-center"
          >
            <a
              href="https://github.com/boudraprof"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Github className="size-6" />
            </a>
            {/* <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Linkedin className="size-6" />
            </a> */}
            <a
              href="mailto:contact@boudradev.space"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Mail className="size-6" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="size-6 text-blue-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
