// Authentication Utilities
// Standardized error handling, GraphQL error processing, and form utilities for auth flows

import { ErrorCode } from "@shared/constant";
import type { Return } from "@shared/constant";
import { toast } from "sonner";

// --- Error Message Mapping ---

/**
 * Standard error messages for common auth error codes
 */
export const AUTH_ERROR_MESSAGES = {
	[ErrorCode.UNVERIFIED_EMAIL]: "Please verify your email address to continue.",
	[ErrorCode.NOT_FOUND]: "Invalid email or password. Please try again.",
	[ErrorCode.UNAUTHORIZED]: "Invalid email or password. Please try again.",
	[ErrorCode.INTERNAL_SERVER_ERROR]:
		"An unexpected error occurred. Please try again later.",
	[ErrorCode.INVALID_INPUT]: "Please check your input and try again.",
} as const;

/**
 * Default fallback error message
 */
export const DEFAULT_ERROR_MESSAGE =
	"An unexpected error occurred. Please try again later.";

// --- Error Processing Functions ---

/**
 * Processes GraphQL response errors and returns user-friendly error message
 *
 * @param response - The GraphQL response object
 * @returns User-friendly error message string
 */
export function processAuthError(response: Return<any>): string {
	if (response.success) return "";

	const errorCode = response.error?.code;
	if (errorCode && errorCode in AUTH_ERROR_MESSAGES) {
		return AUTH_ERROR_MESSAGES[errorCode as keyof typeof AUTH_ERROR_MESSAGES];
	}

	// Fallback to response error message or default
	return response.error?.message || DEFAULT_ERROR_MESSAGE;
}

/**
 * Processes form validation errors (from zod or other sources)
 *
 * @param error - The error object from form submission
 * @returns User-friendly error message string
 */
export function processFormError(error: any): string {
	// Handle zod validation errors
	if (error?.issues?.[0]?.message) {
		return error.issues[0].message;
	}

	// Handle other error formats
	if (typeof error?.message === "string") {
		return error.message;
	}

	return DEFAULT_ERROR_MESSAGE;
}

// --- Toast Notification Utilities ---

/**
 * Standard success toast for authentication actions
 */
export const authToast = {
	/**
	 * Show success message for OTP sent
	 */
	otpSent: (email?: string) => {
		toast.info(
			email
				? `Verification code sent to ${email}. Please check your inbox and spam folder.`
				: "Verification code sent to your email. Please check your inbox and spam folder.",
		);
	},

	/**
	 * Show success message for OTP verified
	 */
	otpVerified: () => {
		toast.success("Email verified successfully!");
	},

	/**
	 * Show success message for password reset
	 */
	passwordReset: () => {
		toast.success(
			"Password reset successfully! You can now sign in with your new password.",
		);
	},

	/**
	 * Show success message for account created
	 */
	accountCreated: () => {
		toast.success(
			"Account created successfully! Please verify your email to continue.",
		);
	},

	/**
	 * Show success message for login
	 */
	loginSuccess: () => {
		toast.success("Welcome back!");
	},

	/**
	 * Show error message with standardized formatting
	 */
	error: (message: string) => {
		toast.error(message);
	},

	/**
	 * Show error for OTP resend failure
	 */
	otpResendError: () => {
		toast.error("Failed to resend verification code. Please try again later.");
	},

	/**
	 * Show error for OTP verification failure
	 */
	otpVerifyError: () => {
		toast.error("Invalid verification code. Please try again.");
	},
} as const;

// --- Form Handling Utilities ---

/**
 * Standard async form submission wrapper with error handling
 *
 * @param submitFn - The async function to execute
 * @param setFormError - Function to set form error state
 * @param options - Additional options for error handling
 */
export async function handleFormSubmission<T>(
	submitFn: () => Promise<Return<T>>,
	setFormError: (error: string | null) => void,
	options: {
		onSuccess?: (data: T) => void | Promise<void>;
		onError?: (error: string) => void;
		showToastOnError?: boolean;
	} = {},
): Promise<boolean> {
	const { onSuccess, onError, showToastOnError = true } = options;

	try {
		// Clear any existing form errors
		setFormError(null);

		const response = await submitFn();

		if (response.success) {
			await onSuccess?.(response.data);
			return true;
		}
		const errorMessage = processAuthError(response);
		setFormError(errorMessage);

		if (showToastOnError) {
			authToast.error(errorMessage);
		}

		onError?.(errorMessage);
		return false;
	} catch (error: any) {
		const errorMessage = processFormError(error);
		setFormError(errorMessage);

		if (showToastOnError) {
			authToast.error(errorMessage);
		}

		onError?.(errorMessage);
		return false;
	}
}

// --- Validation Utilities ---

/**
 * Email validation helper
 */
export function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

/**
 * Password strength validation helper
 */
export function validatePasswordStrength(password: string): {
	isValid: boolean;
	missing: string[];
} {
	const requirements = [
		{ test: password.length >= 8, message: "8 characters" },
		{ test: /[A-Z]/.test(password), message: "one uppercase letter" },
		{ test: /[a-z]/.test(password), message: "one lowercase letter" },
		{ test: /\d/.test(password), message: "one number" },
		{
			test: /[!@#$%^&*(),.?":{}|<>]/.test(password),
			message: "one special character",
		},
	];

	const missing = requirements
		.filter((req) => !req.test)
		.map((req) => req.message);

	return {
		isValid: missing.length === 0,
		missing,
	};
}

// --- URL/Navigation Utilities ---

/**
 * Extract redirect URL from search params with validation
 */
export function getRedirectUrl(
	searchParams: any,
	defaultPath = "/dashboard",
): string {
	const rdt = searchParams?.rdt;
	if (typeof rdt === "string" && rdt.startsWith("/")) {
		return rdt;
	}
	return defaultPath;
}
