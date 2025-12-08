
import { useState, type FormEvent, type FormEventHandler, useActionState } from "react";
import { motion } from "framer-motion";
import z from "zod"
import messagesp from '@/messages/en.d.json'
import { ContactForm } from "@/lib/actions";
import { useMessages } from "next-intl";
import { CheckCircle, Send } from "lucide-react";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Button } from "react-scroll";
import type {State} from "@/lib/actions"




const CreateForm = () => {
  const messages = useMessages() as typeof messagesp[];
  const formLabels = messages.contact.form;
  const initialState: State = { message: null, errors: {} }
  const [state, formAction] = useActionState(ContactForm, initialState);

  console.log(state)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formError, setFormError] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const Contact = z.object({ name: z.string().min(12).max(50), email: z.email().max(30), message: z.string().min(10).max(2000) })

  const result = Contact.safeParse({
    name: formData.name,
    email: formData.email,
    message: formData.message
  })
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    if (!result.success) {
      const err = result.error.format()
      console.log(err._errors)
      //  console.log(result.error.message)
      setFormError({
        ...formError,
        name: err.name?._errors[0] || "",
        email: err.email?._errors[0] || "",
        message: err.message?._errors[0] || ""
      })
    } else {
      // console.log(result.data)
      try {
        // await base44.integrations.Core.SendEmail({
        //   to: "your.email@example.com",
        //   subject: `Portfolio Contact: ${formData.name}`,
        //   body: `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        // });

        setSent(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSent(false), 5000);
      } catch (error) {
        console.error("Error sending message:", error);
      }

    };
    setSending(false);
  }


  return (
    
      sent?(
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }
      }
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-white" />
      </div>
      <h3 className="text-2xl font-bold mb-3">
        {formLabels.successMessage.title}
      </h3>
      <p className="text-slate-400">
        {formLabels.successMessage.message}
      </p>
    </motion.div>) : (
    <form onSubmit={handleSubmit} action={formAction} className="space-y-7">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            {formLabels.name.label}
          </label>
          <Input
            type="text"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className=" bg-slate-900/50 border-slate-600 focus:border-blue-500 text-white"
            placeholder={formLabels.name.placeholder}
          />
          <div className="text-sm pt-1 text-red-500 pl-1">{formError.name}</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            {formLabels.email.label}
          </label>
          <Input
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="bg-slate-900/50 border-slate-600 focus:border-blue-500 text-white"
            placeholder={formLabels.email.placeholder}
          />
          <div className="text-sm pt-1 text-red-500 pl-1">{formError.email}</div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          {formLabels.content.label}
        </label>
        <Textarea
          required
          rows={6}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          placeholder={formLabels.content.placeholder}
        />
        <div className="text-sm pt-1 text-red-500 pl-1">{formError.message}</div>
      </div>
      <Button
        type="submit"
        size="lalg"
        disabled={sending}
        className="w-full bg-gradient-to-r  from-blue-600  to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-6"
      >
        {sending ? (
          <>
            <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
            {formLabels.submitButton.loading}
          </>
        ) : (
          <>
            <Send className="size-5 mr-2" />
            {formLabels.submitButton.title}
          </>
        )}
      </Button>
    </form>)
  )
}

export default CreateForm