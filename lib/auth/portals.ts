import { prisma } from '@/lib/db';
import { dashboardPathForRole } from '@/lib/auth/redirects';
import type { PortalType } from '@/types/auth-core';

export const SWITCHABLE_PORTALS = ['ADMIN', 'COUPLE', 'VENDOR'] as const;
export type SwitchablePortal = (typeof SWITCHABLE_PORTALS)[number];

export function isSwitchablePortal(value: unknown): value is SwitchablePortal {
  return SWITCHABLE_PORTALS.includes(value as SwitchablePortal);
}

export async function listAllowedPortals(
  userId: string,
  sessionRole?: string | null
): Promise<PortalType[]> {
  const profiles = await (prisma as any).portalProfile.findMany({
    where: { userId },
    select: { portal: true },
  });

  const portals = new Set<PortalType>(
    profiles
      .map((profile: { portal: PortalType }) => profile.portal)
      .filter((portal: PortalType) => portal !== 'PUBLIC')
  );

  if (sessionRole === 'ADMIN' || portals.has('ADMIN')) {
    return ['ADMIN', 'COUPLE', 'VENDOR'];
  }

  return SWITCHABLE_PORTALS.filter((portal) => portals.has(portal));
}

export function redirectForPortal(portal: SwitchablePortal): string {
  return dashboardPathForRole(portal);
}
