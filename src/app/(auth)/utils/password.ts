/**
 * Password utility functions
 * 
 * This module provides functions for hashing and comparing passwords securely.
 * It uses bcrypt for password hashing with consistent error handling.
 */
import { throwAppError } from '@/utils/error';
import logger from '@/utils/logger';
import { UtilityReturn } from '@/types/return';
import bcrypt from 'bcryptjs';

/**
 * Logger instance scoped to this file for consistent logging context
 */
const log = logger.child({ file: 'src/app/(auth)/utils/password.ts' });

/**
 * Hash a password using bcrypt
 * 
 * @param password - The plain text password to hash
 * @returns A hashed password string or throws an error
 */
export async function hashPassword(
    password: string,
): Promise<UtilityReturn<string>> {
    try {
        // Generate a salt with cost factor 10
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        log.debug('Password hashed successfully');
        return hashedPassword;
    } catch (error) {
        throwAppError('hashPassword', 'Error hashing password', log, error);
    }
}

/**
 * Compare a plain text password with a hashed password
 * 
 * @param password - The plain text password to compare
 * @param hash - The hashed password to compare against
 * @returns Boolean indicating if the password matches the hash
 */
export async function comparePassword(
    password: string,
    hash: string,
): Promise<UtilityReturn<boolean>> {
    try {
        const isMatch = await bcrypt.compare(password, hash);

        // Log result without revealing the actual password
        log.debug({ isMatch }, 'Password comparison completed');
        return isMatch;
    } catch (error) {
        throwAppError(
            'comparePassword',
            'Error comparing password',
            log,
            error,
        );
    }
}
