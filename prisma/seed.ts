import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.SUPER_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.SUPER_ADMIN_PASSWORD;
  const fullName =
    process.env.SUPER_ADMIN_NAME?.trim() || 'WedyPlan Super Admin';

  if (!email || !password) {
    console.log(
      'SUPER_ADMIN_EMAIL / SUPER_ADMIN_PASSWORD tanımlı değil; admin seed atlandı.',
    );
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.identityUser.upsert({
    where: { email },
    create: {
      email,
      passwordHash,
      fullName,
      status: 'ACTIVE',
      isEmailVerified: true,
      emailVerifiedAt: new Date(),
      securityProfile: { create: {} },
    },
    update: {
      passwordHash,
      fullName,
      status: 'ACTIVE',
      isEmailVerified: true,
      emailVerifiedAt: new Date(),
    },
  });

  const role = await prisma.role.upsert({
    where: { code: 'SUPER_ADMINISTRATOR' },
    create: {
      code: 'SUPER_ADMINISTRATOR',
      name: 'Super Administrator',
      description: 'Platform-wide administrative role',
      isSystem: true,
    },
    update: {
      isSystem: true,
    },
  });

  await prisma.portalProfile.upsert({
    where: {
      userId_portal: {
        userId: user.id,
        portal: 'ADMIN',
      },
    },
    create: {
      userId: user.id,
      portal: 'ADMIN',
      isPrimary: true,
      roles: {
        connect: { id: role.id },
      },
    },
    update: {
      isPrimary: true,
      roles: {
        connect: { id: role.id },
      },
    },
  });

  console.log(`Super admin hazır: ${user.email}`);
}

main()
  .catch((error: unknown) => {
    console.error('Seed sırasında hata oluştu:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
