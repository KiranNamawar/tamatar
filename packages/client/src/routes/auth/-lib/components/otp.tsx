// OTP Verification Form and Dialog Components
// Handles OTP input, verification, and resend logic for authentication flows.

import {
	AlertDialog,
	AlertDialogCancel,
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
import type { OtpPurpose } from "@shared/constant";
import { otpForm as otpSchema } from "@shared/schema";
import { type LinkProps, useNavigate } from "@tanstack/react-router";
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
		});
		if (response.success) {
			setAuthCookie(response.data.verify?.refreshToken ?? "");
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
	rdt,
}: { email: string; purpose: OtpPurpose; rdt: LinkProps["to"] }) {
	const navigate = useNavigate();
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
			setAccessToken(response.data);
			return navigate({
				to: rdt,
				replace: true,
			});
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
				className="flex flex-col justify-center items-center gap-4"
			>
				{/* OTP Input Field */}
				<FormFieldWrapper form={form} name="code" label="">
					{(field) => (
						<InputOTP
							maxLength={6}
							{...field}
							pattern={REGEXP_ONLY_DIGITS}
							autoFocus
						>
							<InputOTPGroup>
								<InputOTPSlot index={0} />
								<InputOTPSlot index={1} />
								<InputOTPSlot index={2} />
								<InputOTPSlot index={3} />
								<InputOTPSlot index={4} />
								<InputOTPSlot index={5} />
							</InputOTPGroup>
						</InputOTP>
					)}
				</FormFieldWrapper>
				<div className="flex justify-between mt-4 w-full">
					<Button
						type="button"
						variant="secondary"
						onClick={resendOtp}
						disabled={resendDisabled}
					>
						{resendDisabled ? `Resend in ${resendTimer}s` : "Resend"}
					</Button>
					<Button type="submit" pending={form.formState.isSubmitting}>
						Verify
					</Button>
				</div>
			</form>
		</Form>
	);
}

/**
 * OtpDialog Props
 *   - open: boolean (dialog open state)
 *   - onOpenChange: (open: boolean) => void (dialog state handler)
 *   - email: string (user's email)
 *   - purpose: OtpPurpose (reason for OTP)
 *   - rdt: LinkProps["to"] (redirect target after verification)
 */
interface OtpDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	email: string;
	purpose: OtpPurpose;
	rdt: LinkProps["to"];
}

/**
 * OTP Dialog Component
 * Renders a modal dialog for OTP verification.
 */
function OtpDialog({
	open,
	onOpenChange,
	email,
	purpose,
	rdt,
}: OtpDialogProps) {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogCancel className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center">
					❌
				</AlertDialogCancel>
				<AlertDialogHeader>
					<AlertDialogTitle className="text-center">
						Verify OTP
					</AlertDialogTitle>
					<AlertDialogDescription className="text-center">
						Please enter the OTP sent to your email to verify your account.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<OtpForm email={email} purpose={purpose} rdt={rdt} />
			</AlertDialogContent>
		</AlertDialog>
	);
}

export { OtpDialog, sendOtpQuery };
