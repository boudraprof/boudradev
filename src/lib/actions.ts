"use server"

import { z } from 'zod';


import dbConnect from '@/lib/mongoose';
import Contact from '../models/Contact';
import { revalidatePath } from 'next/cache';
import { sendWelcomeEmail } from '@/lib/email';
import { getLocale } from 'next-intl/server';




export type State = {
    errors?: {
        name?: string[];
        email?: string[];
        message?: string[];
    };
    message?: string | null;
}

const ContactFormZod = z.object({ name: z.string().min(12).max(50), email: z.email().max(30), message: z.string().min(10).max(2000), date: z.date().optional() });


export async function ContactForm(pervState: State, formData: FormData) {

    // Verify reCAPTCHA token
    const recaptchaToken = formData.get('cf-turnstile-response');
    if (!recaptchaToken) {
        return {
            errors: {},
            message: 'Please complete the reCAPTCHA verification'
        };
    }

    // Verify token with Cloudflare Turnstile
    try {
        const secretKey = process.env.CLOUDFLARE_RECAPTCHA_SECRET_KEY;
        if (secretKey) {
            const verifyResponse = await fetch(
                'https://challenges.cloudflare.com/turnstile/v0/siteverify',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        secret: secretKey,
                        response: recaptchaToken.toString(),
                    }),
                }
            );
            const verifyData = await verifyResponse.json();
            if (!verifyData.success) {
                return {
                    errors: {},
                    message: 'reCAPTCHA verification failed. Please try again.'
                };
            }
        }
    } catch (error) {
        console.error('reCAPTCHA verification error:', error);
        return {
            errors: {},
            message: 'reCAPTCHA verification error. Please try again.'
        };
    }

    const contact = ContactFormZod.omit({ date: true });

    const validateFields = contact.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get("message")
    })
    // const validateFields = CreateInvoice.safeParse({
    //     customerId: formData?.get('customerId'),
    //     amount: formData?.get('amount'),
    //     status: formData?.get('status'),
    // });

    if (!validateFields.success) return ({
        errors: validateFields.error.flatten().fieldErrors,
        message: 'Missing Fields. to Send your message'
    });

    const { name, email, message } = validateFields.data;
    const date = new Date().toISOString().split('T')[0];

    try {

        await dbConnect();
        const newMessage = await Contact.create({
            name,
            email,
            message,
            date
        });

        console.log('message created:', newMessage);
        
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

        return { success: true, message: newMessage };
    } catch (error) {
        console.log('Database Error:', error);
        return {
            message: 'Database Error: Failed to Create Message.',
        };
    }
    // revalidatePath("/", "page"); w
    // redirect(pathName);
}