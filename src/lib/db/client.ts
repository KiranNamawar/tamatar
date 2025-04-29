/**
 * Prisma client singleton for database access
 *
 * This module provides a single instance of the Prisma client to be used
 * throughout the application, with proper logging and error handling.
 */
import { PrismaClient } from '@/generated/prisma';
import logger from '@/utils/logger';

/**
 * Logger instance scoped to this file for consistent logging context
 */
const log = logger.child({ file: 'src/lib/db/client.ts' });

/**
 * Create a single instance of PrismaClient to be used throughout the app
 * This prevents connection pool exhaustion in development due to hot reloading
 */
export const prisma = new PrismaClient({
    log: [
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
    ],
});

prisma.$on('error', (e) => {
    log.error(`Prisma Error: ${e.message}`);
});

prisma.$on('info', (e) => {
    log.info(`Prisma Info: ${e.message}`);
});

prisma.$on('warn', (e) => {
    log.warn(`Prisma Warning: ${e.message}`);
});

// Handle a graceful shutdown
if (typeof process !== 'undefined') {
    process.on('beforeExit', async () => {
        await prisma.$disconnect();
        log.info('Disconnected from database');
    });
}
