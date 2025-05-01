/**
 * resetPasswordSchema
 *
 * Zod schema for validating reset password form fields.
 * - Ensures password, confirmPassword, and token are present and valid.
 * - Password must meet complexity requirements (length, uppercase, lowercase, number, special character).
 * - Validates that password and confirmPassword match.
 */
import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    /**
     * User's new password.
     * - Required field
     * - Minimum 8 characters, must include uppercase, lowercase, number, and special character
     */
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
    /**
     * Confirm password field.
     * - Required field
     * - Must match password
     */
    confirmPassword: z.string().min(1, { message: "Confirm password is required" }),
    /**
     * Reset token for verifying the password reset request.
     * - Required field
     */
    token: z.string().min(1, { message: "Reset token is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/**
 * Type representing the shape of reset password form data after validation.
 */
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;



