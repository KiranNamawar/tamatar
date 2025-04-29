/**
 * forgotPasswordSchema
 *
 * Zod schema for validating forgot password form fields.
 * - Ensures email is present and valid.
 */
import { z } from "zod";

export const forgotPasswordSchema = z.object({
  /**
   * User's email address.
   * - Required field
   * - Must be a valid email format
   */
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
});

/**
 * Type representing the shape of forgot password form data after validation.
 */
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

