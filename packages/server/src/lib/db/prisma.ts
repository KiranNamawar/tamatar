// Prisma Client Utility
// Exports a singleton instance of PrismaClient for database operations.

import { PrismaClient } from "@/generated/prisma";

/**
 * The Prisma client instance is used for all database queries and mutations.
 *
 * Usage:
 *   import prisma from './prisma';
 *   const users = await prisma.user.findMany();
 */
const prisma = new PrismaClient();

export default prisma;
