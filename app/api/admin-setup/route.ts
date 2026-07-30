import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import argon2 from 'argon2';

export async function GET() {
  try {
    const adminEmail = 'kaanatamer@wiascorp.com';
    const rawPassword = 'Sk.258008';

    // Şifreyi argon2 ile hash'le
    const hashedPassword = await argon2.hash(rawPassword);

    // Prisma şemasındaki kullanıcı tablosunu bul
    const userModel = (db as any).user || (db as any).account || (db as any).portalProfile;

    if (!userModel) {
      return NextResponse.json({
        success: false,
        error: 'Prisma üzerinde Kullanıcı tablosu bulunamadı.',
      });
    }

    // Kullanıcı zaten var mı kontrol et
    const existingUser = await userModel.findFirst({
      where: { email: adminEmail },
    });

    if (existingUser) {
      // Varsa Admin yetkisi ve yeni şifresini güncelle
      await userModel.update({
        where: { id: existingUser.id },
        data: {
          role: 'ADMIN',
          password: hashedPassword,
          isEmailVerified: true,
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Mevcut kullanıcı canlı veritabanında ADMIN olarak başarıyla güncellendi!',
        email: adminEmail,
      });
    }

    // Yoksa yeni Admin kullanıcısı oluştur
    const newAdmin = await userModel.create({
      data: {
        email: adminEmail,
        fullName: 'Kaan Atamer (Süper Admin)',
        password: hashedPassword,
        role: 'ADMIN',
        isEmailVerified: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Süper Admin kullanıcısı canlı veritabanında sıfırdan başarıyla oluşturuldu!',
      admin: newAdmin,
    });
  } catch (error: any) {
    console.error('❌ Admin Kurulum Hatası:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Bir hata oluştu.' },
      { status: 500 }
    );
  }
}