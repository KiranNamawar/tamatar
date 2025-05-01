/**
 * Database operations module
 * 
 * This module exports all database-related functions and the Prisma client.
 * It serves as the main entry point for database operations in the application.
 */

// Export the Prisma client for direct access when needed
export { prisma } from './client';

// Export all user-related database functions
export * from './user';

// Export all session-related database functions
export * from './auth/session';

// Export all OTP-related database functions
export * from './auth/otp';

// Export all link-related database functions
export * from './tmtr/link';