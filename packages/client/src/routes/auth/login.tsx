// Login Page Route and Form Components
// Handles user login, error handling, and OTP dialog for unverified emails.

import { zodResolver } from "@hookform/resolvers/zod";
import {
	Link,
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
import { PasswordInput } from "@auth/components/password-input";
import { Separator } from "@/components/ui/separator";
import { graphql, graphqlRequest } from "@/graphql";
import { useStore } from "@/hooks/useStore";
import { ErrorCode, OtpPurpose, type Return } from "@shared/constant";
import { loginForm as loginSchema } from "@shared/schema";
import { useState } from "react";
import { toast } from "sonner";
import GoogleButton from "@auth/components/google";
import { OtpDialog, sendOtpQuery } from "@auth/components/otp";
import { setAuthCookie } from "@auth/utils/cookies";
import { AtSign, KeyRound } from "lucide-react";

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
			isAuthenticated: false,
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
		<div className="min-h-screen flex flex-col items-center justify-center bg-background">
			<div className="w-full max-w-sm px-4 sm:px-6 md:px-8 py-8 bg-card rounded-lg shadow-md flex flex-col gap-6">
				<LoginForm rdt={rdt as LinkProps["to"]} />
			</div>
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
		try {
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
					isAuthenticated: false,
				});
				if (!res.success) {
					setFormError(
						"Failed to send verification code. Please try again later.",
					);
					return;
				}
				toast.info(
					"Verification code sent to your email. Please check your inbox.",
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
		} catch (error: any) {
			setFormError(error.issues[0]?.message || "An unexpected error occurred.");
		}
	}

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-4 w-full"
					autoComplete="off"
				>
					{/* Email Field */}
					<FormFieldWrapper form={form} name="email" label="Email">
						{(field) => (
							<Input
								{...field}
								type="email"
								icon={<AtSign className="w-5 h-5" />}
								placeholder="Enter your email"
								className="w-full"
							/>
						)}
					</FormFieldWrapper>
					{/* Password Field */}
					<FormFieldWrapper
						form={form}
						name="password"
						label="Password"
						rightLabel={
							<Link
								to="/auth/forgot-password"
								className="text-sm text-blue-500 hover:underline"
								search={{
									rdt: rdt,
								}}
							>
								Forgot Password?
							</Link>
						}
					>
						{(field) => (
							<PasswordInput
								{...field}
								icon={<KeyRound className="w-5 h-5" />}
								placeholder="Enter your password"
								className="w-full"
							/>
						)}
					</FormFieldWrapper>
					<Button
						type="submit"
						className="w-full"
						pending={form.formState.isSubmitting}
					>
						Log In
					</Button>
					<Separator />
					<GoogleButton
						setAccessToken={setAccessToken}
						rdt={rdt}
						route="login"
					/>
					{/* Error Alert */}
					{formError && (
						<Alert variant="destructive">
							<AlertDescription>{formError}</AlertDescription>
						</Alert>
					)}
					{/* Signup Link */}
					<p className="text-sm text-center text-muted-foreground">
						Don't have an account?{" "}
						<Link
							to="/auth/signup"
							className="text-blue-500 hover:underline"
							search={{
								rdt: rdt,
							}}
						>
							Sign Up
						</Link>
					</p>
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
