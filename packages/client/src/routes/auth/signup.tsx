// Signup Page Route and Form Components
// Handles user signup, error handling, and OTP dialog for email verification.

import { Form, FormFieldWrapper } from "@/components/ui/form";
import { graphql, graphqlRequest } from "@/graphql";
import { useStore } from "@/hooks/useStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupForm as signupSchema } from "@shared/schema";
import { Link, type LinkProps, createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { OtpDialog, sendOtpQuery } from "@auth/components/otp";
import { OtpPurpose } from "@shared/constant";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@auth/components/password-input";
import { AtSign, KeyRound, User } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import GoogleButton from "@auth/components/google";

// --- Types ---
/**
 * Signup form schema type (name, email, password, confirmPassword)
 */
type SignupSchema = z.infer<typeof signupSchema>;

// --- GraphQL Mutation ---
/**
 * Mutation for signing up a user.
 * Triggers OTP email on success.
 */
const signupQuery = graphql(`
	mutation Signup($name: String! $email: String! $password: String! $confirmPassword: String!) {
		signup( name: $name email: $email password: $password confirmPassword: $confirmPassword )
	}
`);

// --- Server Function ---
/**
 * Server function to handle signup logic.
 * Sends OTP email on success.
 */
const signup = createServerFn({
	method: "POST",
})
	.validator((input) => signupSchema.parse(input))
	.handler(async ({ data }) => {
		console.log("Signup data:", data);
		const response = await graphqlRequest({
			query: signupQuery,
			variables: data,
			isAuthenticated: false,
		});
		if (!response.success) {
			return response;
		}
		const res = await graphqlRequest({
			query: sendOtpQuery,
			variables: {
				email: data.email,
				purpose: OtpPurpose.SIGNUP,
			},
			isAuthenticated: false,
		});
		if (!res.success) {
			return res;
		}
		return {
			success: true,
			data: null,
		};
	});

// --- Route Definition ---
const searchSchema = z.object({
	rdt: z.string().default("/dashboard"),
});

export const Route = createFileRoute("/auth/signup")({
	validateSearch: zodValidator(searchSchema),
	component: RouteComponent,
});

// --- Page Component ---
/**
 * Signup page wrapper component.
 * Renders the signup form centered on the page.
 */
function RouteComponent() {
	const { rdt } = Route.useSearch();
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200/80 via-white/90 to-purple-200/80 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-700">
			<div className="w-full max-w-sm px-4 sm:px-6 md:px-8 py-10 rounded-3xl shadow-2xl flex flex-col gap-8 backdrop-blur-lg bg-white/80 dark:bg-gray-900/90 border border-white/60 dark:border-gray-800/80 animate-fade-in">
				<SignupForm rdt={rdt as LinkProps["to"]} />
			</div>
		</div>
	);
}

// --- Signup Form Component ---
/**
 * Signup form component.
 * Handles signup, error display, and OTP dialog for email verification.
 *
 * Props:
 *   - rdt: LinkProps["to"] (redirect target after signup)
 */
function SignupForm({ rdt }: { rdt: LinkProps["to"] }) {
	const [showOtpDialog, setShowOtpDialog] = useState(false);
	const setAccessToken = useStore((state) => state.auth.setAccessToken);
	const [formError, setFormError] = useState<string | null>(null);
	const form = useForm<SignupSchema>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		resolver: zodResolver(signupSchema),
		mode: "onBlur",
	});

	/**
	 * Handles signup form submission and error logic.
	 * Shows OTP dialog on success.
	 */
	async function onSubmit(data: SignupSchema) {
		try {
			const response = await signup({ data });
			if (response.success) {
				setShowOtpDialog(true);
				return;
			}
			if (!response.success) {
				setFormError(
					"error" in response && response.error?.message
						? response.error.message
						: "An error occurred",
				);
			}
		} catch (error: any) {
			setFormError(
				error.issues?.[0]?.message || "An unexpected error occurred",
			);
		}
	}

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-6 w-full animate-fade-in"
					autoComplete="off"
				>
					{/* Name Field */}
					<FormFieldWrapper form={form} name="name" label="Name">
						{(field) => (
							<Input
								{...field}
								type="text"
								icon={<User className="h-5 w-5" />}
								placeholder="Enter your name"
								className="w-full"
							/>
						)}
					</FormFieldWrapper>
					{/* Email Field */}
					<FormFieldWrapper form={form} name="email" label="Email">
						{(field) => (
							<Input
								{...field}
								type="email"
								icon={<AtSign className="h-5 w-5" />}
								placeholder="Enter your email"
								className="w-full"
							/>
						)}
					</FormFieldWrapper>
					{/* Password Field */}
					<FormFieldWrapper form={form} name="password" label="Password">
						{(field) => (
							<PasswordInput
								{...field}
								icon={<KeyRound className="h-5 w-5" />}
								placeholder="Enter your password"
								showStrength={true}
								className="w-full"
							/>
						)}
					</FormFieldWrapper>
					{/* Confirm Password Field */}
					<FormFieldWrapper
						form={form}
						name="confirmPassword"
						label="Confirm Password"
					>
						{(field) => (
							<PasswordInput
								{...field}
								icon={<KeyRound className="h-5 w-5" />}
								placeholder="Confirm your password"
								className="w-full"
							/>
						)}
					</FormFieldWrapper>
					<Button
						type="submit"
						className="w-full bg-gradient-to-r from-red-500 via-orange-500 to-green-600 hover:from-green-600 hover:to-red-500 text-white font-bold shadow-xl transition-all duration-300 border-2 border-white/80 dark:border-gray-800/80"
						pending={form.formState.isSubmitting}
					>
						Sign Up
					</Button>
					<Separator className="my-2 opacity-80" />
					<GoogleButton
						setAccessToken={setAccessToken}
						rdt={rdt}
						route="signup"
					/>
					{/* Error Alert */}
					{formError && (
						<Alert variant="destructive">
							<AlertDescription>{formError}</AlertDescription>
						</Alert>
					)}
					{/* Login Link */}
					<p className="text-sm text-center text-muted-foreground">
						Already have an account?{" "}
						<Link
							to="/auth/login"
							className="text-blue-500 hover:underline"
							search={{
								rdt: rdt,
							}}
						>
							Login
						</Link>
					</p>
				</form>
			</Form>
			{/* OTP Dialog for email verification */}
			<OtpDialog
				open={showOtpDialog}
				onOpenChange={setShowOtpDialog}
				email={form.getValues("email")}
				purpose={OtpPurpose.SIGNUP}
				rdt={rdt}
			/>
		</>
	);
}
