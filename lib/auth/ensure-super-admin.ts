import { prisma } from '@/lib/db';
import { hashPassword } from '@/lib/auth/password';

const SUPER_ADMIN_PORTALS = ['ADMIN', 'COUPLE', 'VENDOR'] as const;

export async function ensureSuperAdmin(options: {
  email: string;
  password: string;
  fullName?: string;
}) {
  const email = options.email.trim().toLowerCase();
  const fullName = options.fullName?.trim() || 'WedyPlan Super Admin';
  const passwordHash = await hashPassword(options.password);

  const existing = await prisma.identityUser.findUnique({
    where: { email },
  });

  const user = existing
    ? await prisma.identityUser.update({
        where: { id: existing.id },
        data: {
          passwordHash,
          fullName,
          status: 'ACTIVE',
          isEmailVerified: true,
        },
      })
    : await prisma.identityUser.create({
        data: {
          email,
          passwordHash,
          fullName,
          status: 'ACTIVE',
          isEmailVerified: true,
          securityProfile: { create: {} },
        },
      });

  const superRole = await prisma.role.upsert({
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

  for (const portal of SUPER_ADMIN_PORTALS) {
    await prisma.portalProfile.upsert({
      where: {
        userId_portal: { userId: user.id, portal },
      },
      create: {
        userId: user.id,
        portal,
        isPrimary: portal === 'ADMIN',
        ...(portal === 'ADMIN' ? { roles: { connect: { id: superRole.id } } } : {}),
      },
      update: {
        isPrimary: portal === 'ADMIN',
        ...(portal === 'ADMIN' ? { roles: { connect: { id: superRole.id } } } : {}),
      },
    });
  }

  await prisma.couple.upsert({
    where: { userId: user.id },
    create: {
      userId: user.id,
      partnerOneName: fullName,
      partnerTwoName: 'WedyPlan',
    },
    update: {},
  });

  await prisma.vendor.upsert({
    where: { userId: user.id },
    create: {
      userId: user.id,
      businessName: 'WedyPlan Demo Firma',
      businessCategory: 'OTHER',
    },
    update: {},
  });

  return user;
}
