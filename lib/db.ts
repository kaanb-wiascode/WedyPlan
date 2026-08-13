// lib/db.ts
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pgPool: Pool | undefined;
};

function getConnectionString(): string {
  const url =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL ||
    process.env.DIRECT_URL;

  if (!url) {
    throw new Error('DATABASE_URL is not configured');
  }

  return url;
}

function createPrismaClient(): PrismaClient {
  const connectionString = getConnectionString();
  const isLocal = connectionString.includes('localhost') || connectionString.includes('127.0.0.1');

  const pool =
    globalForPrisma.pgPool ??
    new Pool({
      connectionString,
      max: 1,
      ssl: isLocal ? undefined : { rejectUnauthorized: false },
    });

  pool.on('error', (err) => {
    console.error('Postgres pool error:', err);
  });

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.pgPool = pool;
  }

  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export const db = prisma;
export default prisma;
