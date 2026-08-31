
import { useState, useActionState, useEffect, useRef, useTransition } from "react";
import { motion } from "framer-motion";
import messagesp from '@/messages/en.d.json'
import { ContactForm } from "@/lib/actions";
import { useMessages, useLocale } from "next-intl";
import { CheckCircle, Send } from "lucide-react";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Button } from "./button";
import type {State} from "@/lib/actions"
import Turnstile, { TurnstileRef } from "@/components/Turnstile";




const CreateForm = () => {
  const messages = useMessages() as typeof messagesp;
  const locale = useLocale();
  const formLabels = messages.contact.form;
  const initialState: State  = { message: null, errors: {} };
  const [state, formAction] = useActionState(ContactForm, initialState);
  const [isPending, startTransition] = useTransition();

  const [sent, setSent] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileRef>(null);

  const showSuccess = sent || Boolean(state.success);

  useEffect(() => {
    if (!state.success) return;

    let hideSuccessTimer: ReturnType<typeof setTimeout> | undefined;

    const showSuccessTimer = setTimeout(() => {
      setSent(true);
      setTurnstileToken(null);
      if (turnstileRef.current) {
        turnstileRef.current.reset();
      }

      hideSuccessTimer = setTimeout(() => {
        setSent(false);
      }, 5000);
    }, 0);

    return () => {
      clearTimeout(showSuccessTimer);
      if (hideSuccessTimer) {
        clearTimeout(hideSuccessTimer);
      }
    };
  }, [state.success]);

  // Handle form submission with transition
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      formAction(formData);
    });
  };



  return (
    
      showSuccess ? (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }
      }
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      <div className="w-20 h-20 bg-linear-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-white" />
      </div>
      <h3 className="text-2xl font-bold mb-3">
        {formLabels.successMessage.title}
      </h3>
      <p className="text-slate-400">
        {formLabels.successMessage.message}
      </p>
    </motion.div>) : (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            {formLabels.name.label}
          </label>
          <Input
            type="text"
            name="name"
            required
            className=" bg-slate-900/50 border-slate-600 focus:border-blue-500 text-white"
            placeholder={formLabels.name.placeholder}
          />
          {state.errors?.name && (
            <div className="text-sm pt-1 text-red-500 pl-1">{state.errors.name[0]}</div>
          )}
          {/* <div className="text-sm pt-1 text-red-500 pl-1">{formError.name}</div> */}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            {formLabels.email.label}
          </label>
          <Input
            type="email"
            name="email"
            required
            className="bg-slate-900/50 border-slate-600 focus:border-blue-500 text-white"
            placeholder={formLabels.email.placeholder}
          />
          {state.errors?.email && (
            <div className="text-sm pt-1 text-red-500 pl-1">{state.errors.email[0]}</div>
          )}
          {/* <div className="text-sm pt-1 text-red-500 pl-1">{formError.email}</div> */}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          {formLabels.content.label}
        </label>
        <Textarea
          name="message"
          required
          rows={6}
          maxLength={2000}
          placeholder={formLabels.content.placeholder}
        />
        {state.errors?.message && (
          <div className="text-sm pt-1 text-red-500 pl-1">{state.errors.message[0]}</div>
        )}
      </div>
      
      {/* Cloudflare Turnstile */}
      <div className="flex justify-center h-16">
        <Turnstile
          ref={turnstileRef}
          siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY || ''}
          onVerify={(token) => {
            setTurnstileToken(token);
          }}
          onError={() => {
            setTurnstileToken(null);
          }}
          theme="auto"
          language={locale}
        />
      </div>
      
      {/* Hidden input for Turnstile token */}
      {turnstileToken && (
        <input type="hidden" name="cf-turnstile-response" value={turnstileToken} />
      )}
      
      {state.message && !state.success && (
        <div className="text-sm text-red-500 text-center">{state.message}</div>
      )}
      
      <Button
        type="submit"
        size="lg"
        // disabled={isPending || !turnstileToken}
        className="w-full bg-linear-to-r  from-blue-600  to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-6 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? (
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