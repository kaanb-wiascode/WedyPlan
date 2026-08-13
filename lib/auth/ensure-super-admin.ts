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

  const existing = await (prisma as any).identityUser.findUnique({
    where: { email },
  });

  const user = existing
    ? await (prisma as any).identityUser.update({
        where: { id: existing.id },
        data: {
          passwordHash,
          fullName,
          status: 'ACTIVE',
          isEmailVerified: true,
        },
      })
    : await (prisma as any).identityUser.create({
        data: {
          email,
          passwordHash,
          fullName,
          status: 'ACTIVE',
          isEmailVerified: true,
          securityProfile: { create: {} },
        },
      });

  for (const portal of SUPER_ADMIN_PORTALS) {
    await (prisma as any).portalProfile.upsert({
      where: {
        userId_portal: { userId: user.id, portal },
      },
      create: {
        userId: user.id,
        portal,
        isPrimary: portal === 'ADMIN',
      },
      update: {
        isPrimary: portal === 'ADMIN',
      },
    });
  }

  await (prisma as any).couple.upsert({
    where: { userId: user.id },
    create: {
      userId: user.id,
      partnerOneName: fullName,
      partnerTwoName: 'WedyPlan',
    },
    update: {},
  });

  await (prisma as any).vendor.upsert({
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
