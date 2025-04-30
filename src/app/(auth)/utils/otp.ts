import { OtpPurpose, User } from '@/generated/prisma';
import { createOtp, getUnverifiedUserByEmail, getUserById } from '@/lib/db';
import { sendVerificationEmail } from '@/lib/email';
import { Return } from '@/types/return';
import { throwAppError } from '@/utils/error';
import logger from '@/utils/logger';
import { customAlphabet } from 'nanoid';

const log = logger.child({ file: 'src/app/(auth)/utils/otp.ts' });

const generateOtp = customAlphabet('0123456789', 6);

/**
 * Sends an OTP to the user's email for verification.
 *
 * @param userId - The ID of the user to whom the OTP will be sent.
 * @param name - The name of the user (for personalization in the email).
 * @param purpose - The purpose of the OTP (e.g., signup, password reset).
 * @param email - The email address to which the OTP will be sent.
 * @returns A promise that resolves to a Return object indicating success or failure.
 */
export async function sendOtp({
    userId,
    name,
    purpose,
    email,
}: {
    userId: string;
    email: string;
    name: string;
    purpose: OtpPurpose;
}): Promise<Return<void>> {
    try {
        // Generate new OTP
        const code = generateOtp();
        
        // Send verification email
        const emailResponse = await sendVerificationEmail(name, email, code);
        log.info({ mailId: emailResponse.data?.id }, 'Resent OTP email');

        // Store OTP in the database
        const otp = await createOtp({
            code,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000),
            mailId: emailResponse.data?.id, // 10 min
            user: {
                connect: {
                    id: userId,
                },
            },
            purpose,
        });
        if (!otp.success) {
            log.error({ userId }, 'Failed to create OTP for resend');
            return {
                success: false,
                error: 'Failed to create OTP',
            };
        }
        log.info(
            { userId, mailId: emailResponse.data?.id },
            'OTP created successfully',
        );
        return {
            success: true,
        }
    } catch (error) {
        throwAppError('sendOtp', 'Failed to send OTP', log, error);
    }
}
