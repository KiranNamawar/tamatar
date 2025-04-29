'use server';

/**
 * Login action handler
 *
 * This module handles user login form submissions, validates credentials,
 * and establishes user sessions upon successful authentication.
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
 * Logger instance scoped to this file for consistent logging context
 */
const log = logger.child({ file: 'src/app/(auth)/login/action.ts' });

/**
 * Process a login form submission
 *
 * @param state - Current form state (if any)
 * @param formData - Form data from the login submission
 * @returns Form action result with success status or error information
 */
/**
 * Handles user login: validates credentials, checks password, and creates session.
 * @param prev - Previous form action return or null.
 * @param formData - FormData containing login fields.
 * @returns Promise resolving to success or error.
 */
export async function loginAction(
    prev: FormActionReturn<void> | null,
    formData: FormData,
): Promise<FormActionReturn<void>> {
    try {
        // Validate form input against schema
        const validationResult = validateForm(formData, loginSchema);
        if (!validationResult.success) {
            log.info(
                { errors: validationResult.errors },
                'Form validation failed',
            );
            return validationResult;
        }

        const { email, password, userAgent } = validationResult.data!;
        log.debug({ email }, 'Attempting login');

        // Retrieve user by email
        const user = await getUserByEmail(email);
        if (!user.success) {
            log.info({ email }, 'Login attempt failed: User not found');
            return {
                success: false,
                formError: {
                    id: 'InvalidCredentials',
                    message: 'Invalid email or password',
                },
            };
        }

        // Check if user has a password (might be a social login only user)
        if (!user.data?.password) {
            log.info(
                { userId: user.data!.id },
                'Login attempt failed: User has no password (social login only)',
            );
            return {
                success: false,
                formError: {
                    id: 'InvalidCredentials',
                    message: 'Try login with google',
                },
            };
        }

        // Verify password
        const isPasswordValid = await comparePassword(
            password,
            user.data.password,
        );
        if (!isPasswordValid) {
            log.info(
                { userId: user.data.id },
                'Login attempt failed: Invalid password',
            );
            return {
                success: false,
                formError: {
                    id: 'InvalidCredentials',
                    message: 'Invalid email or password',
                },
            };
        }

        // Set up user session
        await setupSession(user.data.id, userAgent);

        // Log successful login and session creation
        log.info({ userId: user.data.id, email }, 'User logged in and session created successfully');
        return {
            success: true,
        };
    } catch (error) {
        // Handle and log errors using the custom utility
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
