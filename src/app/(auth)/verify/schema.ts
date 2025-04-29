/**
 * otpSchema
 *
 * Zod schema for validating OTP verification form fields.
 * - Ensures code, token, and optionally userAgent are present and valid.
 * - Code must be exactly 6 digits and numeric.
 * - Token is required for verifying the OTP.
 */
import { z } from 'zod';

/**
 * OTP verification schema
 *
 * @typedef {Object} otpSchema
 * @property {string} code - 6-digit OTP code
 * @property {string} token - Verification token
 * @property {string} [userAgent] - User agent string (optional)
 */
export const otpSchema = z.object({
    /**
     * 6-digit OTP code entered by the user.
     * - Required
     * - Must be numeric and exactly 6 digits
     */
    code: z
        .string()
        .length(6, 'Code must be 6 digits long')
        .regex(/^\d+$/, 'Code must be numeric'),
    /**
     * Verification token (usually JWT or similar) for OTP verification.
     * - Required
     */
    token: z.string().min(1, 'Token is required'),
    /**
     * User agent string (optional, for device tracking or analytics).
     */
    userAgent: z.string().optional(),
});
