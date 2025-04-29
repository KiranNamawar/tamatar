/**
 * OTP (One-Time Password) database operations
 *
 * This module provides functions for interacting with the Otp model in the database.
 * It uses the shared Prisma client instance and implements consistent error handling.
 */
import { prisma } from './client';
import { Otp, Prisma, OtpPurpose } from '@/generated/prisma';
import { throwAppError } from '@/utils/error';
import logger from '@/utils/logger';
import { Return } from '@/types/return';

/**
 * Logger instance scoped to this file for consistent logging context
 */
const log = logger.child({ file: 'src/lib/db/otp.ts' });

/**
 * Get an OTP by its ID
 *
 * @param id - The OTP ID to search for
 * @returns A Return object with the OTP data or error information
 */
export async function getOtpById(id: string): Promise<Return<Otp>> {
    try {
        const otp = await prisma.otp.findUnique({
            where: {
                id,
                expiresAt: {
                    gt: new Date(), // Ensure the OTP is not expired
                }
             },
        });

        // Handle expected error: OTP not found
        if (!otp) {
            log.warn({ id }, 'OTP not found by ID');
            return { success: false, error: 'OTP not found' };
        }

        return { success: true, data: otp };
    } catch (error) {
        throwAppError(
            'getOtpById',
            `Failed to get OTP by ID: ${id}`,
            log,
            error,
        );
    }
}

/**
 * Get an OTP by its code
 *
 * @param code - The OTP code to search for
 * @returns A Return object with the OTP data or error information
 */
export async function getOtpByCode(code: string): Promise<Return<Otp>> {
    try {
        const otp = await prisma.otp.findUnique({
            where: { code },
        });

        // Handle expected error: OTP not found
        if (!otp) {
            log.warn({ code }, 'OTP not found by code');
            return { success: false, error: 'OTP not found' };
        }

        return { success: true, data: otp };
    } catch (error) {
        throwAppError(
            'getOtpByCode',
            `Failed to get OTP by code: ${code}`,
            log,
            error,
        );
    }
}


/**
 * Get all OTPs for a user
 *
 * @param userId - The user ID to get OTPs for
 * @param purpose - Optional filter by OTP purpose
 * @returns A Return object with the OTPs data or error information
 */
export async function getOtpsByUserId(
    userId: string,
    purpose?: OtpPurpose
): Promise<Return<Otp[]>> {
    try {
        const otps = await prisma.otp.findMany({
            where: { 
                userId,
                ...(purpose && { purpose })
            },
        });

        return { success: true, data: otps };
    } catch (error) {
        throwAppError(
            'getOtpsByUserId',
            `Failed to get OTPs for user ID: ${userId}`,
            log,
            error,
        );
    }
}

/**
 * Create a new OTP
 *
 * @param otpData - The OTP data to create
 * @returns A Return object with the created OTP data or error information
 */
export async function createOtp(
    otpData: Prisma.OtpCreateInput,
): Promise<Return<Otp>> {
    try {
        const otp = await prisma.otp.create({
            data: otpData,
        });

        log.info({ otpId: otp.id }, 'OTP created successfully');
        return { success: true, data: otp };
    } catch (error) {
        // Handle unique constraint violations
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                const field = error.meta?.target as string[];
                const message = `OTP with this ${field.join(', ')} already exists`;
                log.warn({ error, otpData }, message);
                return { success: false, error: message };
            }
            // Handle foreign key constraint violations
            if (error.code === 'P2003') {
                const message = 'User not found for OTP creation';
                log.warn({ error, otpData }, message);
                return { success: false, error: message };
            }
        }

        // Handle unexpected errors
        throwAppError('createOtp', 'Failed to create OTP', log, error);
    }
}

/**
 * Update an existing OTP
 *
 * @param id - The ID of the OTP to update
 * @param otpData - The OTP data to update
 * @returns A Return object with the updated OTP data or error information
 */
export async function updateOtp(
    id: string,
    otpData: Prisma.OtpUpdateInput,
): Promise<Return<Otp>> {
    try {
        const otp = await prisma.otp.update({
            where: { id },
            data: otpData,
        });

        log.info({ otpId: id }, 'OTP updated successfully');
        return { success: true, data: otp };
    } catch (error) {
        // Handle record not found
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                log.warn({ error, id }, 'OTP not found for update');
                return { success: false, error: 'OTP not found' };
            }
        }

        // Handle unexpected errors
        throwAppError('updateOtp', 'Failed to update OTP', log, error);
    }
}

/**
 * Delete an OTP by its ID
 *
 * @param id - The ID of the OTP to delete
 * @returns A Return object with success status or error information
 */
export async function deleteOtp(id: string): Promise<Return<{ id: string }>> {
    try {
        await prisma.otp.delete({
            where: { id },
        });

        log.info({ otpId: id }, 'OTP deleted successfully');
        return { success: true, data: { id } };
    } catch (error) {
        // Handle record not found
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                log.warn({ error, id }, 'OTP not found for deletion');
                return { success: false, error: 'OTP not found' };
            }
        }

        // Handle unexpected errors
        throwAppError('deleteOtp', 'Failed to delete OTP', log, error);
    }
}

/**
 * Get an OTP by its code and userId, only if it's not expired
 *
 * @param code - The OTP code to search for
 * @param userId - The user ID associated with the OTP
 * @returns A Return object with the OTP data or error information
 */
export async function getOtpByCodeAndUserId(
    code: string,
    userId: string
): Promise<Return<Otp>> {
    try {
        const now = new Date();

        const otp = await prisma.otp.findFirst({
            where: {
                code,
                userId,
                expiresAt: {
                    gt: now
                }
            },
        });

        // Handle expected error: OTP not found or expired
        if (!otp) {
            log.warn({ code, userId }, 'Valid OTP not found for code and userId');
            return { success: false, error: 'Valid OTP not found' };
        }

        return { success: true, data: otp };
    } catch (error) {
        throwAppError(
            'getOtpByCodeAndUserId',
            `Failed to get valid OTP by code and userId: ${code}, ${userId}`,
            log,
            error,
        );
    }
}
