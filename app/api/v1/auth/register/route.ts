import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name, role } = body;

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Lütfen tüm zorunlu alanları doldurun.' }, { status: 400 });
    }

    // 1. Kullanıcı zaten var mı kontrol et
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Bu e-posta adresi zaten kullanımda.' }, { status: 400 });
    }

    // 2. Şifreyi hash'le
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Kullanıcıyı ve Role özel profili oluştur
    const user = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: role || 'COUPLE', // Varsayılan Çift
        coupleProfile: role === 'COUPLE' ? { create: {} } : undefined,
        vendorProfile: role === 'VENDOR' ? { create: { companyName: name } } : undefined,
      },
    });

    return NextResponse.json(
      { message: 'Kullanıcı başarıyla oluşturuldu.', userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Kayıt Hatası:', error);
    return NextResponse.json({ error: 'Kayıt sırasında bir sunucu hatası oluştu.' }, { status: 500 });
  }
}