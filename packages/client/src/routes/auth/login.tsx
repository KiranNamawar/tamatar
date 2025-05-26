// Login Page Route and Form Components
// Handles user login, error handling, and OTP dialog for unverified emails.

import { zodResolver } from "@hookform/resolvers/zod";
import {
	type LinkProps,
	createFileRoute,
	useNavigate,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form, FormFieldWrapper } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { graphql, graphqlRequest } from "@/graphql";
import { useStore } from "@/hooks/useStore";
import { ErrorCode, OtpPurpose, type Return } from "@shared/constant";
import { loginForm as loginSchema } from "@shared/schema";
import { useState } from "react";
import { setAuthCookie } from "./-lib/utils/cookies";
import { OtpDialog, sendOtpQuery } from "./-lib/components/otp";
import { toast } from "sonner";

// --- Types ---

/**
 * Login form schema type (email, password)
 */
type LoginSchema = z.infer<typeof loginSchema>;

// --- GraphQL Queries ---

/**
 * Mutation for logging in a user.
 * Returns access and refresh tokens on success.
 */
const LoginQuery = graphql(`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			accessToken
			refreshToken
		}
	}
`);

// --- Server Functions ---

/**
 * Server function to handle login logic.
 * Sets auth cookie on success.
 */
const login = createServerFn({
	method: "POST",
})
	.validator((input) => loginSchema.parse(input))
	.handler(async ({ data }): Promise<Return<string | null>> => {
		const { email, password } = data;
		const response = await graphqlRequest({
			query: LoginQuery,
			variables: { email, password },
		});
		if (response.success) {
			setAuthCookie(response.data.login?.refreshToken ?? "");
			return {
				success: true,
				data: response.data.login?.accessToken ?? null,
			};
		}
		return response;
	});

// --- Route Definition ---

const searchSchema = z.object({
	rdt: z.string().default("/dashboard"),
});

/**
 * Route definition for the login page.
 */
export const Route = createFileRoute("/auth/login")({
	validateSearch: zodValidator(searchSchema),
	component: RouteComponent,
});

// --- Page Component ---

/**
 * Login page wrapper component.
 * Renders the login form centered on the page.
 */
function RouteComponent() {
	const { rdt } = Route.useSearch();
	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4">
			<LoginForm rdt={rdt as LinkProps["to"]} />
		</div>
	);
}

// --- Login Form Component ---

/**
 * Login form component.
 * Handles login, error display, and OTP dialog for unverified emails.
 *
 * Props:
 *   - rdt: LinkProps["to"] (redirect target after login)
 */
function LoginForm({ rdt }: { rdt: LinkProps["to"] }) {
	const [showOtpDialog, setShowOtpDialog] = useState(false);
	const [formError, setFormError] = useState<string | null>(null);
	const setAccessToken = useStore((state) => state.auth.setAccessToken);
	const navigate = useNavigate();
	const form = useForm<LoginSchema>({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: zodResolver(loginSchema),
		mode: "onBlur",
	});

	/**
	 * Handles login form submission and error logic.
	 * Shows OTP dialog if email is unverified.
	 */
	async function onSubmit(data: LoginSchema) {
		const response = await login({ data });
		if (response.success) {
			setAccessToken(response.data);
			return navigate({
				to: rdt,
			});
		}
		const errorCode = response.error.code;
		if (errorCode === ErrorCode.UNVERIFIED_EMAIL) {
			const res = await graphqlRequest({
				query: sendOtpQuery,
				variables: { email: data.email, purpose: OtpPurpose.LOGIN },
			});
			if (!res.success) {
				setFormError(
					"Failed to send verification code. Please try again later.",
				);
				return;
			}
			toast.info(
				"Verification code sent to your email. Please check your inbox."
			);
			setShowOtpDialog(true);
		} else if (
			errorCode === ErrorCode.NOT_FOUND ||
			errorCode === ErrorCode.UNAUTHORIZED
		) {
			setFormError("Invalid email or password. Please try again.");
		} else {
			setFormError("An unexpected error occurred. Please try again later.");
		}
	}

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-4 max-w-sm w-full mt-4"
				>
					{/* Email Field */}
					<FormFieldWrapper form={form} name="email" label="Email">
						{(field) => (
							<Input {...field} type="email" placeholder="Enter your email" />
						)}
					</FormFieldWrapper>
					{/* Password Field */}
					<FormFieldWrapper form={form} name="password" label="Password">
						{(field) => (
							<PasswordInput {...field} placeholder="Enter your password" />
						)}
					</FormFieldWrapper>
					<Button
						type="submit"
						className="w-full"
						pending={form.formState.isSubmitting}
					>
						Log In
					</Button>
					{/* Error Alert */}
					{formError && (
						<Alert variant="destructive">
							<AlertDescription>{formError}</AlertDescription>
						</Alert>
					)}
				</form>
			</Form>
			{/* OTP Dialog for unverified email */}
			<OtpDialog
				open={showOtpDialog}
				onOpenChange={setShowOtpDialog}
				email={form.getValues("email")}
				purpose={OtpPurpose.LOGIN}
				rdt={rdt}
			/>
		</>
	);
}
