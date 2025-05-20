import { customAlphabet } from "nanoid";

export function hashPassword(password: string) {
	return Bun.password.hash(password, "bcrypt");
}

export function comparePassword(password: string, hash: string) {
	return Bun.password.verify(password, hash, "bcrypt");
}

export function generateUsername(email: string) {
	const username = (email.split("@")[0] ?? "")
		.toLowerCase()
		.replace(/[^a-z0-9]/g, "_"); // Replace non-alphanumeric characters with underscores
	// TODO: Check if username already exists in the database
	return username;
}

export const generateOtpCode = customAlphabet("0123456789", 6);
