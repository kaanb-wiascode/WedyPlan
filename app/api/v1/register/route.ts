import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { sendVerificationEmail } from '@/lib/notifications/email-service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'E-posta ve şifre alanları zorunludur.' },
        { status: 400 }
      );
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Google SMTP üzerinden mail gönderimi
    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json({
      success: true,
      message: 'Kayıt başarılı! Doğrulama bağlantısı e-posta adresinize gönderildi.',
    });
  } catch (error: any) {
    console.error('Kayıt/E-posta Hatası:', error);
    
    // Gerçek hatayı ekranda görüp teşhis etmek için hatayı yanıt mesajına ekliyoruz:
    return NextResponse.json(
      { error: `Mail Gönderim Hatası: ${error?.message || 'Bilinmeyen hata'}` },
      { status: 500 }
    );
  }
}