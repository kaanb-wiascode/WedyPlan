'use server';

import nodemailer from 'nodemailer';

export interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmailAction(input: SendEmailInput) {
  try {
    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = Number(process.env.SMTP_PORT) || 587;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.MAIL_FROM || `WedyPlan <${user}>`;

    if (!user || !pass) {
      throw new Error('SMTP kullanıcı bilgileri (.env.local) eksik.');
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const mailOptions = {
      from,
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text || input.html.replace(/<[^>]*>?/gm, ''),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('📧 E-Posta başarıyla gönderildi:', info.messageId);

    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error('❌ sendEmailAction hatası:', error);
    return { success: false, error: error.message || 'E-posta gönderimi başarısız oldu.' };
  }
}

/**
 * E-Posta Doğrulama Gönderimi
 */
export async function sendVerificationEmail(email: string, token: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://wedyplan.com';
  const verifyUrl = `${appUrl}/eposta-dogrulama?token=${token}`;

  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2>WedyPlan'a Hoş Geldiniz! 🎉</h2>
      <p>Hesabınızı doğrulamak ve düğün planlamanıza başlamak için lütfen aşağıdaki butona tıklayın:</p>
      <a href="${verifyUrl}" style="background-color: #e11d48; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin-top: 10px;">Hesabımı Doğrula</a>
    </div>
  `;

  return await sendEmailAction({
    to: email,
    subject: "WedyPlan - E-Posta Adresinizi Doğrulayın",
    html,
  });
}