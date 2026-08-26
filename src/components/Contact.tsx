import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import CreateForm from "@/components/ui/form";
import Footer from "./Footer";


export type State = {
    errors?: {
        name?: string[];
        email?: string[];
        message?: string[];
    };
    message?: string | null;
}

export default function Contact() {
  
  const  t  = useTranslations('contact');

  return (
    <section id="contact" className="py-20 md:py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold p-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {/* Get In Touch */}
            {t("title")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-6" />
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {/* Have a project in mind or want to collaborate? Feel free to reach out! */}
            {t("description")}        
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 md:p-12"
        >
        <CreateForm />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-slate-500 mb-4">{t("directlyEmail")}</p>
          <a
            href="mailto:boudradev@gmail.com"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-lg"
          >
            <Mail className="size-5" />
            boudradev@gmail.com
          </a>
        </motion.div>
        <Footer />
      </div>
    </section>
  );
}
