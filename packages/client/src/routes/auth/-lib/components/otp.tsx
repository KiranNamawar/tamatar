// OTP Verification Form and Dialog Components
// Handles OTP input, verification, and resend logic for authentication flows.

import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Form, FormFieldWrapper } from "@/components/ui/form";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { graphql, graphqlRequest } from "@/graphql";
import { useStore } from "@/hooks/useStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { OtpPurpose } from "@shared/constant";
import { otpForm as otpSchema } from "@shared/schema";
import { createServerFn } from "@tanstack/react-start";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { setAuthCookie } from "../utils/cookies";

// Type for OTP form schema
// Contains: email, code, purpose
// See: @shared/schema/otp.ts
//
type OtpSchema = z.infer<typeof otpSchema>;

// --- GraphQL Queries ---

/**
 * Mutation to send OTP to user's email for a given purpose.
 */
const sendOtpQuery = graphql(`
    mutation sendOtp($email: String!, $purpose: OtpPurpose!) {
        sendOtp(email: $email, purpose: $purpose) 
    }
`);

/**
 * Mutation to verify OTP for a given email and purpose.
 * Returns access and refresh tokens on success.
 */
const verifyOtpQuery = graphql(`
    mutation verify($email: String!, $code: String!, $purpose: OtpPurpose!) {
        verify(email: $email, code: $code, purpose: $purpose) {
            accessToken
            refreshToken
        }
    }
`);

/**
 * Server function to verify OTP using the verifyOtpQuery.
 * Sets auth cookie on success.
 */
const verify = createServerFn({
	method: "POST",
})
	.validator((input) => otpSchema.parse(input))
	.handler(async ({ data }) => {
		const { email, code, purpose } = data;
		const response = await graphqlRequest({
			query: verifyOtpQuery,
			variables: { email, code, purpose },
			clientOptions: {
				isAuthenticated: false,
			},
		});
		if (response.success) {
			if (purpose === OtpPurpose.LOGIN || purpose === OtpPurpose.SIGNUP) {
				setAuthCookie(response.data.verify?.refreshToken ?? "");
			}
			return {
				success: true,
				data: response.data.verify?.accessToken ?? null,
			};
		}
		return response;
	});

/**
 * OTP Form Component
 * Handles OTP input, verification, and resend logic.
 *
 * Props:
 *   - email: string (user's email)
 *   - purpose: OtpPurpose (reason for OTP)
 *   - rdt: LinkProps["to"] (redirect target after verification)
 */
function OtpForm({
	email,
	purpose,
	onSuccess,
}: {
	email: string;
	purpose: OtpPurpose;
	onSuccess: (data: string | null) => void;
}) {
	const setAccessToken = useStore((state) => state.auth.setAccessToken);
	const form = useForm<OtpSchema>({
		defaultValues: {
			email,
			purpose,
			code: "",
		},
		resolver: zodResolver(otpSchema),
		mode: "onBlur",
	});

	// --- Resend OTP Rate Limit Logic ---
	const RESEND_INTERVAL = 30; // seconds
	const [resendTimer, setResendTimer] = useState(RESEND_INTERVAL);
	const [resendDisabled, setResendDisabled] = useState(true);

	useEffect(() => {
		// Start timer on mount
		setResendDisabled(true);
		setResendTimer(RESEND_INTERVAL);
		const interval = setInterval(() => {
			setResendTimer((prev) => {
				if (prev <= 1) {
					clearInterval(interval);
					setResendDisabled(false);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);
		return () => clearInterval(interval);
	}, []); // Only run on mount

	/**
	 * Handles OTP form submission and verification.
	 */
	async function onSubmit(data: OtpSchema) {
		const response = await verify({ data });
		if (response.success && response.data) {
			toast.success("OTP verified successfully!");
			if (purpose === OtpPurpose.SIGNUP || purpose === OtpPurpose.LOGIN) {
				setAccessToken(response.data);
				return onSuccess(null);
			}
			if (purpose === OtpPurpose.FORGOT_PASSWORD) {
				return onSuccess(response.data);
			}
		}
	}

	/**
	 * Handles resending OTP and restarts the resend timer.
	 */
	async function resendOtp() {
		const response = await graphqlRequest({
			query: sendOtpQuery,
			variables: { email, purpose },
		});
		if (response.success) {
			toast.success(
				"Verification code sent to your email. Please check your inbox.",
			);
			// Restart timer
			setResendDisabled(true);
			setResendTimer(RESEND_INTERVAL);
			const interval = setInterval(() => {
				setResendTimer((prev) => {
					if (prev <= 1) {
						clearInterval(interval);
						setResendDisabled(false);
						return 0;
					}
					return prev - 1;
				});
			}, 1000);
		} else {
			toast.error(
				"Failed to resend verification code. Please try again later.",
			);
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col justify-center items-center gap-6 w-full animate-fade-in"
				autoComplete="off"
			>
				{/* OTP Input Field */}
				<FormFieldWrapper form={form} name="code" label="">
					{(field) => (
						<InputOTP
							maxLength={6}
							{...field}
							pattern={REGEXP_ONLY_DIGITS}
							autoFocus
							aria-label="Enter 6-digit OTP code"
							className="w-full text-2xl tracking-widest bg-white/80 dark:bg-gray-900/80 border border-gray-300 dark:border-gray-700 rounded-xl shadow focus-within:ring-2 focus-within:ring-blue-400 transition-all"
						>
							<InputOTPGroup>
								{[0, 1, 2, 3, 4, 5].map((i) => (
									<InputOTPSlot
										key={i}
										index={i}
										className="mx-1 w-12 h-14 rounded-lg bg-white/70 dark:bg-gray-800/80 border-2 border-gray-300 dark:border-gray-700 text-center text-2xl font-bold text-gray-900 dark:text-white shadow focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition-all duration-150 aria-invalid:border-red-500 aria-invalid:ring-red-400"
										aria-label={`Digit ${i + 1}`}
									/>
								))}
							</InputOTPGroup>
						</InputOTP>
					)}
				</FormFieldWrapper>
				<div className="flex justify-between items-center mt-4 w-full gap-4">
					<Button
						type="button"
						variant="secondary"
						onClick={resendOtp}
						disabled={resendDisabled}
						className="rounded-lg px-4 py-2 font-semibold bg-gradient-to-r from-red-400 to-orange-400 text-white shadow hover:from-orange-500 hover:to-red-500 border-2 border-white/70 dark:border-gray-800/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 transition-all"
						aria-live="polite"
					>
						{resendDisabled ? `Resend in ${resendTimer}s` : "Resend"}
					</Button>
					<Button
						type="submit"
						pending={form.formState.isSubmitting}
						className="rounded-lg px-4 py-2 font-bold bg-gradient-to-r from-green-500 to-blue-500 text-white shadow hover:from-blue-600 hover:to-green-600 border-2 border-white/70 dark:border-gray-800/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-all"
					>
						Verify
					</Button>
				</div>
			</form>
		</Form>
	);
}

/**
 * OtpDialogProps
 * Props for the OTP dialog component.
 */
type OtpDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	email: string;
	purpose: OtpPurpose;
	onSuccess: (data: string | null) => void;
};

/**
 * OtpDialog
 * Shows the OTP form in a glassmorphic, accessible dialog.
 */
function OtpDialog({
	open,
	onOpenChange,
	email,
	purpose,
	onSuccess,
}: OtpDialogProps) {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent
				className="backdrop-blur-lg bg-white/80 dark:bg-gray-900/90 border border-white/60 dark:border-gray-800/80 shadow-2xl rounded-2xl p-0 max-w-md sm:max-w-screen w-full animate-fade-in"
				style={{ minWidth: 320 }}
			>
				<AlertDialogHeader className="px-6 pt-6 pb-2">
					<AlertDialogTitle className="text-center text-lg font-bold text-gray-900 dark:text-white">
						Verify Your Email
					</AlertDialogTitle>
					<AlertDialogDescription className="text-center text-sm text-gray-600 dark:text-gray-400">
						Please enter the 6-digit OTP sent to your email address.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<div className="px-6 pb-6">
					<OtpForm email={email} purpose={purpose} onSuccess={onSuccess} />
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export { OtpDialog, sendOtpQuery };
