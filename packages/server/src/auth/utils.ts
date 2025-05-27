// Auth Utility Functions
// Provides password hashing/verification, username generation, and OTP code generation utilities.

import { customAlphabet } from "nanoid";

/**
 * Hashes a password using Bun's bcrypt implementation.
 */
export function hashPassword(password: string) {
	return Bun.password.hash(password, "bcrypt");
}

/**
 * Compares a plain password with a hashed password using Bun's bcrypt implementation.
 */
export function comparePassword(password: string, hash: string) {
	return Bun.password.verify(password, hash, "bcrypt");
}

/**
 * Generates a username from an email address (before the @, lowercased, non-alphanumeric replaced with _).
 * TODO: Check if username already exists in the database.
 */
export function generateUsername(email: string) {
	const username = (email.split("@")[0] ?? "")
		.toLowerCase()
		.replace(/[^a-z0-9]/g, "_"); // Replace non-alphanumeric characters with underscores
	// TODO: Check if username already exists in the database
	return username;
}

/**
 * Generates a 6-digit numeric OTP code.
 */
export const generateOtpCode = customAlphabet("0123456789", 6);
