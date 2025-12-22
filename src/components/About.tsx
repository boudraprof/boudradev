import { motion } from "framer-motion";
import {useTranslations, useMessages} from 'next-intl';
import { DynamicIcon, dynamicIconImports } from "lucide-react/dynamic";
import Image from "next/image";

type CardProps = {
  title: string;
  description: string;
  icon: string;
};

type IconName = keyof typeof dynamicIconImports

export default function About() {
  const t = useTranslations('about');
    const messages = useMessages();
    const description = messages.about.descriptions as string[];
    const cards = messages.about.cards as CardProps[];
 
  return (
    <section id="about" className="py-20 md:py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold p-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {/* About Me */}
            {t("title")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl blur-3xl" />
              <Image
                src="/disktop.jpg"
                width={500}
                height={500}
                alt="Developer workspace"
                className="relative rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {description.map((desc: string) => (
              <p key={desc} className="text-lg text-slate-300 leading-relaxed">{desc}</p>
            ))}
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((item: CardProps, index: number) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                <DynamicIcon
                  name={item.icon as IconName}
                  className="size-6 text-white"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-slate-400">{item.description}</p>
            </motion.div>
          )) }
        </div>
      </div>
    </section>
  );
}
