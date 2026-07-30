import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  // Prisma Client örneğini oluştur
  const client = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = client;
  }

  return client;
}

// Lazy Proxy: Dosya import edildiğinde PrismaClient BAŞLATILMAZ.
// Yalnızca db.user.findFirst() gibi bir işlem çağrıldığında çalışır.
export const db = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = createPrismaClient();
    const value = (client as any)[prop];
    if (typeof value === 'function') {
      return value.bind(client);
    }
    return value;
  },
});

export default db;