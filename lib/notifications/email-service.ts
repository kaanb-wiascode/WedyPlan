import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // 587 portu için TLS varsayılan
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendVerificationEmail(toEmail: string, token: string) {
  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/eposta-dogrulama?token=${token}`;

  const mailOptions = {
    from: process.env.MAIL_FROM,
    to: toEmail,
    subject: 'WedyPlan • E-posta Adresinizi Doğrulayın',
    html: `
      <div style="background-color: #E5E5E5; padding: 40px; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
        <div style="max-width: 500px; margin: 0 auto; background-color: #EFEFEF; border: 1px solid #D5D5D5; border-radius: 24px; padding: 32px; text-align: center;">
          <h1 style="color: #111111; font-size: 22px; margin-bottom: 8px;">WedyPlan Studio'ya Hoş Geldiniz</h1>
          <p style="color: #666666; font-size: 13px; line-height: 1.6;">Hesabınızı aktif etmek ve düğün planlamanıza başlamak için lütfen aşağıdaki e-posta doğrulama butonuna tıklayın.</p>
          <div style="margin: 32px 0;">
            <a href="${verifyUrl}" style="background-color: #111111; color: #E5E5E5; text-decoration: none; padding: 12px 28px; border-radius: 99px; font-size: 13px; font-weight: bold; display: inline-block;">E-Postamı Doğrula</a>
          </div>
          <p style="color: #999999; font-size: 11px;">Bu isteği siz yapmadıysanız lütfen bu e-postayı dikkate almayın.</p>
        </div>
      </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
}