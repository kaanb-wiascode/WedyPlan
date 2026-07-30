import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'kaanatamer@wiascorp.com';
  const rawPassword = 'Sk.258008';

  console.log('⏳ Admin kullanıcısı kontrol ediliyor ve kuruluyor...');

  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  // User modelini arar, yoksa portalProfile veya ilgili kullanıcı tablosuna yazar
  const userModel = (prisma as any).user || (prisma as any).account || (prisma as any).portalProfile;

  if (!userModel) {
    console.error('❌ Kullanıcı modeli Prisma şemasında bulunamadı.');
    return;
  }

  const existingUser = await userModel.findFirst({
    where: { email: adminEmail },
  });

  if (existingUser) {
    await userModel.update({
      where: { id: existingUser.id },
      data: {
        role: 'ADMIN',
        password: hashedPassword,
        isEmailVerified: true,
      },
    });
    console.log('✅ Mevcut kullanıcı "ADMIN" yetkisiyle güncellendi.');
  } else {
    await userModel.create({
      data: {
        email: adminEmail,
        fullName: 'Kaan Atamer (Süper Admin)',
        password: hashedPassword,
        role: 'ADMIN',
        isEmailVerified: true,
      },
    });
    console.log('🎉 İlk Admin kullanıcısı başarıyla oluşturuldu!');
  }
}

main()
  .catch((e) => {
    console.error('❌ Seed sırasında hata oluştu:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });