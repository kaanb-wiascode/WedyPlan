// lib/db.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const connectionString =
  process.env.DATABASE_URL ||
  process.env.DIRECT_URL ||
  'postgresql://postgres:postgres@localhost:5432/wedyplan';

function createPrismaClient(): PrismaClient {
  // 1. Prisma v7 Driver Adapter denemesi (@prisma/adapter-pg)
  try {
    const { PrismaPg } = require('@prisma/adapter-pg');
    const { Pool } = require('pg');
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter } as any);
  } catch {
    // 2. Doğrudan adaptör nesnesi denemesi
    try {
      const { PrismaPg } = require('@prisma/adapter-pg');
      const adapter = new PrismaPg({ connectionString });
      return new PrismaClient({ adapter } as any);
    } catch {
      // 3. Standart PrismaClient fallback
      try {
        return new PrismaClient();
      } catch {
        return new PrismaClient({
          datasourceUrl: connectionString,
        } as any);
      }
    }
  }
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export const db = prisma;
export default prisma;