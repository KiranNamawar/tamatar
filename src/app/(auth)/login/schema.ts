/**
 * loginSchema
 *
 * Zod schema for validating login form fields.
 * - Ensures email is present and valid.
 * - Ensures password is present and at least 8 characters.
 * - Optionally includes userAgent for analytics/security context.
 */
import { z } from 'zod';

export const loginSchema = z.object({
    /**
     * User's email address.
     * - Required field
     * - Must be a valid email format
     */
    email: z
        .string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Invalid email address' }),
    /**
     * User's password.
     * - Required field
     * - Minimum 8 characters for security
     */
    password: z
        .string()
        .min(1, { message: 'Password is required' })
        .min(8, { message: 'Password must be at least 8 characters' }),
    /**
     * User agent string (optional, for analytics/security)
     */
    userAgent: z.string().optional(),
});

/**
 * Type representing the shape of login form data after validation.
 */
export type LoginFormData = z.infer<typeof loginSchema>;
