import { motion } from "framer-motion";
import { useMessages, useTranslations } from "next-intl";
import Image from "next/image";

type Category = {
  category: string;
  skills: string[];
};
export default function Skills() {
  const t = useTranslations();
  const messages = useMessages();
  const categories = messages.skills.categories as Category[];

  return (
    <section id="skills" className="py-20 md:py-32 px-6 relative bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold p-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {t("skills.title")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-6" />
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {t("skills.description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((category: Category, categoryIndex: number) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-blue-500/30 transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold mb-6 text-blue-400">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: categoryIndex * 0.1 + skillIndex * 0.05,
                    }}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-gradient-to-r from-slate-700 to-slate-800 rounded-lg text-sm font-medium text-slate-200 border border-slate-600 hover:border-blue-500/50 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div
        className=" text-slate-200   pt-12 flex flex-col  items-center"
      >
        <h1 className="text-slate-400  text-lg z-100">mastering  Golang this time  </h1>
        <div className="absolute z-99">
        <Image src="/go-logo.png" width={500} height={500} alt="golang logo" />
        </div>
      </div>
    </section>
  );
}
