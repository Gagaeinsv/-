import { PrismaClient } from '@prisma/client';
import path from 'path';

const globalForPrisma = globalThis;

// Resolve the absolute path of the SQLite database file dynamically.
// This ensures Vercel serverless functions can locate the bundled prisma/dev.db file at runtime.
const getDatabaseUrl = () => {
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith('file:')) {
    return process.env.DATABASE_URL;
  }
  const dbPath = path.join(process.cwd(), 'prisma', 'dev.db');
  return `file:${dbPath}`;
};

export const prisma = globalForPrisma.prisma || new PrismaClient({
  datasources: {
    db: {
      url: getDatabaseUrl(),
    },
  },
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
export default prisma;
