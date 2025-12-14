"use server"

import { z } from 'zod';
import { getLocale } from 'next-intl/server';


import Contact from '../models/Contact';
import { sendWelcomeEmail } from '@/lib/email';
import dbConnect from '@/lib/mongoose';
import axios from 'axios';



export type State = {
    errors?: {
        name?: string[];
        email?: string[];
        message?: string[];
    };
    message?: string | null;
    success?: boolean;
}

const ContactFormZod = z.object({ name: z.string().min(12).max(50), email: z.email().max(30), message: z.string().min(10).max(2000), date: z.date().optional() });


export async function ContactForm(pervState: State, formData: FormData): Promise<State> {

    // Verify reCAPTCHA token
    const recaptchaToken = formData.get('cf-turnstile-response');
    if (!recaptchaToken) {
        return {
            errors: {},
            message: 'Please complete the reCAPTCHA verification'
        };
    }

    // Verify token with Cloudflare Turnstile
    // console.log(typeof recaptchaToken)
    // const secretKey = process.env.CLOUDFLARE_RECAPTCHA_SECRET_KEY;
    // try {
    //     if (secretKey) {
    //           const response = await axios.post(
    //       "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    //       null,
    //       {
    //         params: {
    //           secret: secretKey,
    //           response: recaptchaToken.toString(),
    //         },
    //       },
    //     );
    //         if (!response.data.success) {
    //             return {
    //                 errors: {},
    //                 message: 'reCAPTCHA verification failed. Please try again.'
    //             };
    //         }
    //     }
    // } catch (error) {
    //     console.error('reCAPTCHA verification error:', error);
    //     return {
    //         errors: {},
    //         message: 'reCAPTCHA verification error. Please try again.'
    //     };
    // }

    const contact = ContactFormZod.omit({ date: true });

    const validateFields = contact.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get("message")
    })

    if (!validateFields.success) return ({
        errors: validateFields.error.flatten().fieldErrors,
        message: 'Missing Fields. to Send your message'
    });

    const { name, email, message } = validateFields.data;
    const date = new Date().toISOString().split('T')[0];

    try {

        // await dbConnect();
        // const newMessage = await Contact.create({
        //     name,
        //     email,
        //     message,
        //     date
        // });

        // console.log('message created:', newMessage);
        
        // Send welcome email to the user
        try {
            const locale = (await getLocale()) as 'en' | 'ar';
            await sendWelcomeEmail({
                to: email,
                name: name,
                locale: locale
            });
        } catch (emailError) {
            console.error('Error sending welcome email:', emailError);
            // Don't fail the form submission if email fails
        }
    //  const result = newMessage.email? "Message sent successfully to " + newMessage.email : "Message sent successfully.";
        return { success: true, message: "ok its working" };
    } catch (error) {
        console.log('Database Error:', error);
        return {
            message: 'Failed to send your message, Please try again.',
        };
    }
    // revalidatePath("/", "page"); 
    // redirect(pathName);
}