import { PrismaClient } from '@/lib/generated/prisma'

// Extend the NodeJS.Global interface to include the prisma property
declare global {
  namespace NodeJS {
    interface Global {
      prisma?: PrismaClient;
    }
  }
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!(global as NodeJS.Global).prisma) {
    (global as typeof globalThis & { prisma?: PrismaClient }).prisma = new PrismaClient();
  }
  prisma = (global as typeof globalThis & { prisma?: PrismaClient }).prisma || new PrismaClient();
}

export default prisma;