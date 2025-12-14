import nodemailer from 'nodemailer';

// Email transporter configuration for Gmail
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // Use App Password, not regular password
  },
  // Additional options to help with connection issues
  tls: {
    rejectUnauthorized: false,
  },
});

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
  const fromEmail = process.env.FROM_EMAIL || "contact@boudradev.space";
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

  try {
    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: `${to}, ${fromEmail}`,
      subject: content.subject,
      text: content.text,
      html: content.html,
    });

    console.log('Welcome email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function sendEmailToAdmin({ email, name, message }: SendEmailToAdmin) {

  try {
     await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.FROM_EMAIL,
      subject: "The Message Form Client",
      text: message,
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending email to admin failed', error);
    return { success: false};
  }
}

