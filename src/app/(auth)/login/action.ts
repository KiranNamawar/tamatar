'use server';

/**
 * Login action handler for the authentication flow.
 *
 * This module handles user login form submissions, validates credentials using a Zod schema,
 * checks user existence and password correctness, and establishes a user session upon successful authentication.
 * All errors and important events are logged using a scoped logger.
 *
 * Responsibilities:
 * - Validate incoming form data
 * - Retrieve user by email
 * - Check if user exists and has a password (not just social login)
 * - Compare password securely
 * - Set up session on success
 * - Return standardized error objects on failure
 */
import { FormActionReturn } from '@/types/return';
import { handleAppError } from '@/utils/error';
import { validateForm } from '@/utils/form';
import logger from '@/utils/logger';
import { loginSchema } from './schema';
import { getUnverifiedUserByEmail, getUserByEmail } from '@/lib/db';
import { comparePassword } from '../utils/password';
import { setupSession } from '../utils/session';
import { createToken } from '@/utils/jwt';
import { OtpPurpose } from '@/generated/prisma';
import { sendOtp } from '../utils/otp';

/**
 * Logger instance scoped to this file for consistent logging context.
 */
const log = logger.child({ file: 'src/app/(auth)/login/action.ts' });

/**
 * Handles user login: validates credentials, checks password, and creates session.
 *
 * @param prev - Previous form action return or null (used for progressive enhancement)
 * @param formData - FormData containing login fields (email, password, userAgent)
 * @returns Promise resolving to a FormActionReturn indicating success or detailed error
 */
export async function loginAction(
    prev: FormActionReturn<void | { context: string }> | null,
    formData: FormData,
): Promise<FormActionReturn<void | { context: string }>> {
    try {
        // 1. Validate form input against the login schema
        const validationResult = validateForm(formData, loginSchema);
        if (!validationResult.success) {
            log.info(
                { errors: validationResult.errors },
                'Form validation failed',
            );
            return validationResult;
        }

        // 2. Extract validated data
        const { email, password, userAgent } = validationResult.data!;
        log.debug({ email }, 'Attempting login');

        // 3. Retrieve user by email
        let user = await getUserByEmail(email);
        if (!user.success) {
            // User not found in both verified and unverified states
            log.info({ email }, 'Login attempt failed: User not found');
            // Security: Do not reveal whether email or password was wrong
            return {
                success: false,
                formError: {
                    id: 'InvalidCredentials',
                    message: 'Invalid email or password',
                },
            };
        }

        // 4. Check if user has a password (not just a social login)
        if (!user.data?.password) {
            log.info(
                { userId: user.data!.id },
                'Login attempt failed: User has no password (social login only)',
            );
            return {
                success: false,
                formError: {
                    id: 'InvalidCredentials',
                    message: 'Try login with Google',
                },
            };
        }

        // 5. Verify password securely
        const isPasswordValid = await comparePassword(
            password,
            user.data.password,
        );
        if (!isPasswordValid) {
            log.info(
                { userId: user.data.id },
                'Login attempt failed: Invalid password',
            );
            // Security: Do not reveal whether email or password was wrong
            return {
                success: false,
                formError: {
                    id: 'InvalidCredentials',
                    message: 'Invalid email or password',
                },
            };
        }

        // 6. Check if user is unverified
        if (!user.data.verifiedEmail) {
            log.info(
                { userId: user.data.id },
                'User is unverified, sending OTP for verification',
            );
            // If the user is unverified, send an OTP for email verification
            // and return a context token for the verification flow
            await sendOtp({
                userId: user.data.id,
                name: user.data.firstName || user.data.username,
                purpose: OtpPurpose.LOGIN,
                email,
            });
            return {
                success: true,
                metadata: {
                    context: await createToken(
                        {
                            userId: user.data.id,
                            purpose: OtpPurpose.LOGIN,
                        },
                        10,
                    ),
                },
            };
        }

        // 6. Set up user session
        await setupSession(user.data.id, userAgent);

        // 7. Log successful login and session creation
        log.info(
            { userId: user.data.id, email },
            'User logged in and session created successfully',
        );
        return {
            success: true,
        };
    } catch (error) {
        // 8. Handle and log errors using the custom utility
        return {
            success: false,
            formError: handleAppError(
                'loginAction',
                'Failed to login',
                log,
                error,
            ),
        };
    }
}
