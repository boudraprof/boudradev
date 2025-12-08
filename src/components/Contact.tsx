import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useMessages, useTranslations } from "next-intl";
import messagesp from '@/messages/en.d.json'
// import {ContactFrom} from '@/lib/actions'
// import { base44 } from "@/api/base44Client";
// import {z, ZodError} from "zod"
import CreateForm from "@/components/ui/form";

type ContactFormLabels = {
  name: { label: string; placeholder: string };
  email: { label: string; placeholder: string };
  message: { label: string; placeholder: string };
  submitButton: { title: string; loading: string };
  content: { label: string; placeholder: string };
  successMessage: { title: string; message: string };
};

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
  const messages = useMessages() as typeof messagesp[];
  const footerTitle = messages.footer.title

//   const initialState: State = {message: null, errors: {}}
//   const [state, formAction] = useActionState(ContactFrom, initialState);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });
//   const [formError, setFormError] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });
//   const [sending, setSending] = useState(false);
//   const [sent, setSent] = useState(false);
//   const Contact = z.object({name: z.string().min(12).max(50), email: z.email().max(30), message: z.string().min(10).max(2000)})
  
//   const result = Contact.safeParse({
//    name: formData.name,
//    email: formData.email,
//    message: formData.message
//   })
//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setSending(true);
//     if(!result.success) {
//       const err = result.error.format()
// console.log(err._errors)
//       //  console.log(result.error.message)
//        setFormError({...formError, 
//         name: err.name?._errors[0] || "", 
//         email: err.email?._errors[0] || "",
//         message: err.message?._errors[0] || ""
//       })
//     } else {
//       // console.log(result.data)
//       try {
//         // await base44.integrations.Core.SendEmail({
//           //   to: "your.email@example.com",
//       //   subject: `Portfolio Contact: ${formData.name}`,
//       //   body: `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
//       // });
      
//       setSent(true);
//       setFormData({ name: "", email: "", message: "" });
//       setTimeout(() => setSent(false), 5000);
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
    
//   };
//   setSending(false);
// }
  /**
   * TODO: add cloudflare  reCaptcha
   * TODO: add form validation
   * TODO: add form submission success and failure messages
   * TODO: remove footer from contact section
   * TODO: 
   */
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
            href="mailto:contact@boudradev.space"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-lg"
          >
            <Mail className="size-5" />
            contact@boudradev.space
          </a>
        </motion.div>
        {/* this footer section should be removed from here */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16 pt-8 border-t border-slate-800"
        >
          <p className="text-slate-500">
            © {new Date().getFullYear()} {footerTitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
