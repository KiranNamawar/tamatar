// Enhanced Authentication Hook
// Provides standardized auth state management, error handling, and navigation

import { useStore } from "@/hooks/useStore";
import {
	authToast,
	getRedirectUrl,
	handleFormSubmission,
} from "@/lib/auth-utils";
import type { Return } from "@shared/constant";
import { useNavigate } from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";
import { useCallback, useState } from "react";

// --- Types ---

export interface AuthFormState {
	isSubmitting: boolean;
	error: string | null;
	showOtpDialog: boolean;
	setError: (error: string | null) => void;
	setShowOtpDialog: (show: boolean) => void;
}

export interface AuthSubmissionOptions {
	onSuccess?: () => void | Promise<void>;
	onError?: (error: string) => void;
	showToastOnError?: boolean;
}

// --- Enhanced Auth Hook ---

/**
 * Enhanced authentication hook with standardized error handling and state management
 *
 * @param options - Configuration options
 * @returns Auth utilities and state management functions
 */
export function useAuthForm(
	options: {
		redirectPath?: string;
		onAuthSuccess?: () => void;
	} = {},
) {
	const navigate = useNavigate();
	const setAccessToken = useStore((state) => state.auth.setAccessToken);
	const accessToken = useStore((state) => state.auth.accessToken);

	// Form state management
	const [formError, setFormError] = useState<string | null>(null);
	const [showOtpDialog, setShowOtpDialog] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	/**
	 * Standardized form submission handler
	 */
	const submitForm = useCallback(
		async <T>(
			submitFn: () => Promise<Return<T>>,
			submissionOptions: AuthSubmissionOptions = {},
		): Promise<boolean> => {
			setIsSubmitting(true);

			const success = await handleFormSubmission(submitFn, setFormError, {
				onSuccess: async (data) => {
					// Handle access token if present
					if (typeof data === "string") {
						setAccessToken(data);
					}

					// Call custom success handler
					await submissionOptions.onSuccess?.();
					await options.onAuthSuccess?.();
				},
				onError: submissionOptions.onError,
				showToastOnError: submissionOptions.showToastOnError,
			});

			setIsSubmitting(false);
			return success;
		},
		[setAccessToken, options.onAuthSuccess],
	);

	/**
	 * Navigate to dashboard or specified redirect path
	 */
	const navigateAfterAuth = useCallback(
		(searchParams?: any) => {
			const redirectPath = options.redirectPath || getRedirectUrl(searchParams);
			navigate({ to: redirectPath });
		},
		[navigate, options.redirectPath],
	);

	/**
	 * Handle OTP verification success
	 */
	const handleOtpSuccess = useCallback(
		(token?: string | null) => {
			if (token) {
				setAccessToken(token);
			}
			authToast.otpVerified();
			setShowOtpDialog(false);
			// Navigate after a short delay to allow toast to show
			setTimeout(() => navigateAfterAuth(), 500);
		},
		[setAccessToken, navigateAfterAuth],
	);

	/**
	 * Check if user is authenticated
	 */
	const isAuthenticated = useCallback(() => {
		return !!accessToken;
	}, [accessToken]);

	/**
	 * Redirect to login if not authenticated
	 */
	const requireAuth = useCallback(
		(from?: LinkProps["from"]) => {
			if (!isAuthenticated()) {
				navigate({
					to: "/auth/login",
					search: { rdt: from || window.location.pathname },
				});
				return false;
			}
			return true;
		},
		[isAuthenticated, navigate],
	);

	return {
		// State
		formError,
		isSubmitting,
		showOtpDialog,
		isAuthenticated: isAuthenticated(),

		// State setters
		setFormError,
		setShowOtpDialog,

		// Actions
		submitForm,
		navigateAfterAuth,
		handleOtpSuccess,
		requireAuth,

		// Utilities
		authToast,
	};
}

// --- Specialized Auth Hooks ---

/**
 * Hook specifically for login form
 */
export function useLoginForm(redirectPath?: string) {
	return useAuthForm({ redirectPath });
}

/**
 * Hook specifically for signup form
 */
export function useSignupForm(redirectPath?: string) {
	return useAuthForm({ redirectPath });
}

/**
 * Hook specifically for password reset
 */
export function usePasswordResetForm() {
	return useAuthForm();
}

/**
 * Legacy auth hook - redirects to login if not authenticated
 * @deprecated Use useAuthForm or requireAuth instead
 */
export function useAuth({ from }: { from: LinkProps["from"] }) {
	const { requireAuth } = useAuthForm();
	return { requireAuth: () => requireAuth(from) };
}
