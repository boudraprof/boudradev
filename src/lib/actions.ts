"use server";

import { z } from "zod";
import { getLocale, getMessages } from "next-intl/server";

import Contact from "../models/Contact";
import { sendWelcomeEmail } from "@/lib/email";
import dbConnect from "@/lib/mongoose";
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

const ContactFormZod = z.object({
  name: z.string().min(12).max(50),
  email: z.email().max(30),
  message: z.string().min(10).max(2000),
  date: z.date().optional(),
});

export async function ContactForm(
  pervState: State,
  formData: FormData
): Promise<State> {
  // Verify reCAPTCHA token
  const recaptchaToken = formData.get("cf-turnstile-response");
  const localMessages = await getMessages();
  if (!recaptchaToken) {
    return {
      errors: {},
      message: localMessages.contact.form.errors.recaptchaRequired,
    };
  }

  // Verify token with Cloudflare Turnstile
  console.log(typeof recaptchaToken);
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

  const contact = ContactFormZod.omit({ date: true });

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

  const { name, email, message } = validateFields.data;
  const date = new Date().toISOString().split("T")[0];

  let mailMessage;
  try {
    const locale = (await getLocale()) as "en" | "ar";
    mailMessage = await sendWelcomeEmail({
      to: email,
      name: name,
      locale: locale,
    });

    await dbConnect();
    await Contact.create({
      name,
      email,
      message,
      date,
    });
  } catch (emailError) {
    console.error("Error sending welcome email:", emailError);
    // Don't fail the form submission if email fails
    return {
      success: true,
      message: localMessages.contact.form.messages.successWithEmailFail,
    };
  }
  //  const result = newMessage.email? "Message sent successfully to " + newMessage.email : "Message sent successfully.";
  return {
    success: true,
    message: mailMessage?.success
      ? localMessages.contact.form.messages.success
      : localMessages.contact.form.messages.successWithEmailFail,
  };
}
