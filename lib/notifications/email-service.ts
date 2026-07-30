import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // 587 portu için TLS
  auth: {
    user: process.env.SMTP_USER || 'kaanatamer@wiascorp.com',
    pass: process.env.SMTP_PASS || 'emylsrnfluevxuzg', // Güncel doğru şifre
  },
});

export async function sendVerificationEmail(toEmail: string, token: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://wedyplan.com';
  const verifyUrl = `${baseUrl}/eposta-dogrulama?token=${token}`;

  const mailOptions = {
    from: process.env.MAIL_FROM || '"WedyPlan Wedding Studio" <kaanatamer@wiascorp.com>',
    to: toEmail,
    subject: 'WedyPlan • E-Posta Adresinizi Doğrulayın',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { background-color: #E5E5E5; font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif; margin: 0; padding: 40px 20px; }
          .container { max-width: 500px; margin: 0 auto; background-color: #EFEFEF; border: 1px solid #D5D5D5; border-radius: 24px; padding: 36px; text-align: center; }
          .title { color: #111111; font-size: 22px; font-weight: 700; margin-bottom: 12px; }
          .text { color: #666666; font-size: 13px; line-height: 1.6; margin-bottom: 28px; }
          .btn { background-color: #111111; color: #E5E5E5 !important; text-decoration: none; padding: 14px 32px; border-radius: 99px; font-size: 13px; font-weight: 600; display: inline-block; }
          .footer { color: #999999; font-size: 11px; margin-top: 32px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 class="title">WedyPlan Studio'ya Hoş Geldiniz</h1>
          <p class="text">Hesabınızı aktif etmek ve düğün planlamanıza başlamak için lütfen aşağıdaki doğrulama butonuna tıklayın.</p>
          <div>
            <a href="${verifyUrl}" class="btn">E-Postamı Doğrula</a>
          </div>
          <p class="footer">Bu isteği siz yapmadıysanız lütfen bu e-postayı dikkate almayın.</p>
        </div>
      </body>
      </html>
    `,
  };

  return await transporter.sendMail(mailOptions);
}