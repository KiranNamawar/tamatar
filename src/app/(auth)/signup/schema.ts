/**
 * signupSchema
 *
 * Zod schema for validating signup form fields.
 * - Ensures first name, email, password, and confirm password are present and valid.
 * - Password must meet complexity requirements (length, uppercase, lowercase, number, special character).
 * - Validates that password and confirmPassword match.
 * - Optionally includes last name and userAgent for analytics/security context.
 */
import { z } from 'zod';

export const signupSchema = z
    .object({
        /**
         * User's first name.
         * - Required field
         * - Max 100 characters
         */
        firstName: z
            .string()
            .min(1, { message: 'First name is required' })
            .max(100, {
                message: 'First name must be less than 100 characters',
            }),
        /**
         * User's last name (optional).
         */
        lastName: z.string().optional(),
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
         * - Minimum 8 characters, must include uppercase, lowercase, number, and special character
         */
        password: z
            .string()
            .min(1, { message: 'Password is required' })
            .min(8, { message: 'Password must be at least 8 characters' })
            .regex(/[A-Z]/, {
                message: 'Password must contain at least one uppercase letter',
            })
            .regex(/[a-z]/, {
                message: 'Password must contain at least one lowercase letter',
            })
            .regex(/[0-9]/, {
                message: 'Password must contain at least one number',
            })
            .regex(/[^A-Za-z0-9]/, {
                message: 'Password must contain at least one special character',
            }),
        /**
         * Confirm password field.
         * - Required field
         * - Must match password
         */
        confirmPassword: z
            .string()
            .min(1, { message: 'Confirm password is required' }),
        /**
         * User agent string (optional, for analytics/security)
         */
        userAgent: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

/**
 * Type representing the shape of signup form data after validation.
 */
export type SignupFormData = z.infer<typeof signupSchema>;
