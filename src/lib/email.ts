import nodemailer from 'nodemailer';
import dns from 'dns';

/**
 * Creates a fresh SMTP transporter for each call.
 * A shared/module-level transporter causes the second email to fail in
 * serverless environments (Vercel) because Gmail closes the connection
 * after the first send and the stale socket is reused.
 */
function createTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465;
  
  // Nodemailer: secure should be true for port 465, false for other ports (like 587, 2525)
  // If SMTP_SECURE is explicitly set, we respect it. Otherwise, we default based on the port.
  let secure = port === 465;
  if (process.env.SMTP_SECURE !== undefined) {
    const secureVal = String(process.env.SMTP_SECURE).toLowerCase().trim();
    secure = secureVal === 'true';
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    // Force DNS lookup to use IPv4 only to avoid timeouts on platforms with broken/unconfigured IPv6 routing
    lookup: (
      hostname: string,
      options: dns.LookupOptions,
      callback: (err: NodeJS.ErrnoException | null, address: string | dns.LookupAddress[], family: number) => void,
    ) => {
      return dns.lookup(hostname, Object.assign({}, options, { family: 4 }), callback);
    },
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS, // App Password — not your regular Gmail password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

export interface WelcomeEmailOptions {
  to: string;
  name: string;
  locale?: 'en' | 'ar';
}


export interface SendEmailToAdmin {
  email: string;
  name: string;
  message: string
}
export async function sendWelcomeEmail({ to, name, locale = 'en' }: WelcomeEmailOptions) {
  const fromEmail = process.env.FROM_EMAIL;
  const fromName = process.env.FROM_NAME || "BoudraDev";

  // Email content based on locale
  const emailContent = {
    en: {
      subject: "Thank you for contacting BoudraDev!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to BoudraDev!</h1>
            </div>
            <div class="content">
              <h2>Hello ${name},</h2>
              <p>Thank you for reaching out! I've received your message and will get back to you as soon as possible.</p>
              <p>I appreciate your interest in my work and look forward to connecting with you.</p>
              <p>Best regards,<br><strong>BoudraDev Team</strong></p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `Hello ${name},\n\nThank you for reaching out! I've received your message and will get back to you as soon as possible.\n\nI appreciate your interest in my work and look forward to connecting with you.\n\nBest regards,\nBoudraDev Team`
    },
    ar: {
      subject: "شكراً لتواصلك مع BoudraDev!",
      html: `
        <!DOCTYPE html>
        <html dir="rtl">
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>مرحباً بك في BoudraDev!</h1>
            </div>
            <div class="content">
              <h2>مرحباً ${name}،</h2>
              <p>شكراً لتواصلك معنا! لقد تلقيت رسالتك وسأعود إليك في أقرب وقت ممكن.</p>
              <p>أقدر اهتمامك بعملي وأتطلع للتواصل معك.</p>
              <p>مع أطيب التحيات،<br><strong>فريق BoudraDev</strong></p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `مرحباً ${name}،\n\nشكراً لتواصلك معنا! لقد تلقيت رسالتك وسأعود إليك في أقرب وقت ممكن.\n\nأقدر اهتمامك بعملي وأتطلع للتواصل معك.\n\nمع أطيب التحيات،\nفريق BoudraDev`
    }
  };

  const content = emailContent[locale];

  const transporter = createTransporter();
  try {
    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: to,
      subject: content.subject,
      text: content.text,
      html: content.html,
    });

    console.log('Welcome email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  } finally {
    transporter.close();
  }
}

export async function sendEmailToAdmin({ email, name, message }: SendEmailToAdmin) {
  const adminEmail = process.env.FROM_EMAIL;
  const transporter = createTransporter();
  try {
    await transporter.sendMail({
      from: `boudradev <${adminEmail}>`,
      to: process.env.FROM_EMAIL,
      subject: `New Contact Message — ${name} <${email}>`,
      text: message,
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending email to admin:', error);
    return { success: false };
  } finally {
    transporter.close();
  }
}

