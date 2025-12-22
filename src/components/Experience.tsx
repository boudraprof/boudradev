import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { useMessages, useTranslations } from "next-intl";
import messagesp from "@/messages/en.d.json";



export default  function Experience({locale}: {locale: "ar" |"en"}) {

  const t = useTranslations();
  const isArabic = locale === 'ar' || locale?.startsWith("ar");
  const messages = useMessages() as typeof messagesp ;
  const experiences = messages.experiences.cards; 

  return (
    <section id="experience" className="py-20 md:py-32 px-6 relative bg-slate-900">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl  md:text-5xl font-bold p-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {t("experiences.title")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-6" />
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {t("experiences.description")}
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-cyan-500" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full transform -translate-x-1/2 z-10 ring-4 ring-slate-900" />

                {/* Content */}
                <div
                 className={`w-full md:w-1/2 ${isArabic ? index % 2 === 0 ? 'md:pl-12' : 'md:pr-12' : index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} pl-16 md:pl-0`}
                 >
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`size-12 rounded-lg flex items-center justify-center ${
                        exp.type === 'work' 
                          ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
                          : 'bg-gradient-to-br from-purple-500 to-pink-500'
                      }`}>
                        {exp.type === 'work' ? (
                          <Briefcase className="size-6 text-white" />
                        ) : (
                          <GraduationCap className="size-6 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">
                          {exp.title}
                        </h3>
                        <p className="text-blue-400 font-medium mb-1">
                          {exp.company}
                        </p>
                        <p className="text-slate-500 text-sm">
                          {exp.period}
                        </p>
                      </div>
                    </div>
                    <p className="text-slate-300 mb-4">
                      {exp.description}
                    </p>
                    <ul className="space-y-2">
                      {exp.highlights?.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                          <span className="text-cyan-400 mt-1">▹</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}