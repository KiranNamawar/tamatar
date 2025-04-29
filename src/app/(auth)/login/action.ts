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
import { getUserByEmail } from '@/lib/db';
import { comparePassword } from '../utils/password';
import { setupSession } from '../utils/session';

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
    prev: FormActionReturn<void> | null,
    formData: FormData,
): Promise<FormActionReturn<void>> {
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
        const user = await getUserByEmail(email);
        if (!user.success) {
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

        // 6. Set up user session
        await setupSession(user.data.id, userAgent);

        // 7. Log successful login and session creation
        log.info({ userId: user.data.id, email }, 'User logged in and session created successfully');
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
