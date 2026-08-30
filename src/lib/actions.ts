"use server";

import { z } from "zod";
import { getLocale, getMessages } from "next-intl/server";

import { sendEmailToAdmin, sendWelcomeEmail } from "@/lib/email";
import axios from "axios";

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  message?: string | null;
  success?: boolean;
};

export async function ContactForm(
  pervState: State,
  formData: FormData
): Promise<State> {
  // Verify reCAPTCHA token
  const recaptchaToken = formData.get("cf-turnstile-response");
  const localMessages = await getMessages();
  
  const ContactFormSchema = z.object({
    name: z.string().trim().min(1, localMessages.contact.form.errors.nameMin).max(50, localMessages.contact.form.errors.nameMax),
    email: z.string().email(localMessages.contact.form.errors.emailInvalid).max(30, localMessages.contact.form.errors.emailMax),
    message: z.string().min(10, localMessages.contact.form.errors.messageMin).max(2000, localMessages.contact.form.errors.messageMax),
    date: z.date().optional(),
  });
  
  if (!recaptchaToken) {
    return {
      errors: {},
      message: localMessages.contact.form.errors.recaptchaRequired,
    };
  }

  const contact = ContactFormSchema.omit({ date: true });

  const validateFields = contact.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validateFields.success)
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: localMessages.contact.form.errors.missingFields,
    };

  // Verify token with Cloudflare Turnstile
  const secretKey = process.env.CLOUDFLARE_RECAPTCHA_SECRET_KEY;
  try {
    if (secretKey) {
      const response = await axios.post(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        new URLSearchParams({
          secret: secretKey,
          response: recaptchaToken.toString(),
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (!response.data.success) {
        return {
          errors: {},
          message: localMessages.contact.form.errors.recaptchaFailed,
        };
      }
    }
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return {
      errors: {},
      message: localMessages.contact.form.errors.recaptchaError,
    };
  }

  const { name, email, message } = validateFields.data;
  const locale = (await getLocale()) as "en" | "ar";

  // Send admin notification email
  const adminResult = await sendEmailToAdmin({ email, name, message });
  if (!adminResult.success) {
    console.error("Failed to send admin notification email");
    return {
      success: false,
      message: localMessages.contact.form.messages.successWithEmailFail,
    };
  }

  // Send welcome email to the user
  const welcomeResult = await sendWelcomeEmail({
    to: email,
    name: name,
    locale: locale,
  });

  if (!welcomeResult.success) {
    console.error("Failed to send welcome email to user");
    return {
      success: false,
      message: localMessages.contact.form.messages.successWithEmailFail,
    };
  }

  return {
    success: true,
    message: localMessages.contact.form.messages.success,
  };
}
