// Signup Page Route and Form Components
// Handles user signup, error handling, and OTP dialog for email verification.

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form, FormFieldWrapper } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { graphql, graphqlRequest } from "@/graphql";
import { useStore } from "@/hooks/useStore";
import GoogleButton from "@auth/components/google";
import { OtpDialog, sendOtpQuery } from "@auth/components/otp";
import { PasswordInput } from "@auth/components/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { OtpPurpose } from "@shared/constant";
import { signupForm as signupSchema } from "@shared/schema";
import {
	Link,
	type LinkProps,
	createFileRoute,
	useNavigate,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import {
	AtSign,
	BookOpen,
	Code,
	GitBranch,
	KeyRound,
	Rocket,
	User,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
			clientOptions: {
				isAuthenticated: false,
			},
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
			clientOptions: {
				isAuthenticated: false,
			},
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
	// Redirect target after signup
	rdt: z.string().default("/dashboard"),
});

export const Route = createFileRoute("/auth/signup")({
	head: () => ({
		meta: [
			{
				title: "Create Account | Tamatar - Start Your Developer Journey",
			},
			{
				name: "description",
				content:
					"Create your Tamatar account and start tracking your developer progress. Join thousands of developers building impressive portfolios and showcasing their coding journey.",
			},
			{
				name: "keywords",
				content:
					"create account, developer signup, coding journey, developer portfolio, programming progress, join tamatar",
			},
			{
				name: "robots",
				content: "noindex, nofollow",
			},
			{
				property: "og:title",
				content: "Create Account | Tamatar",
			},
			{
				property: "og:description",
				content:
					"Create your account and start tracking your developer journey with Tamatar.",
			},
			{
				property: "og:url",
				content: "https://tamatar.dev/auth/signup",
			},
		],
	}),
	validateSearch: zodValidator(searchSchema),
	component: RouteComponent,
});

/**
 * RouteComponent
 *
 * Renders the signup form centered in a glassmorphic card.
 */
function RouteComponent() {
	const { rdt } = Route.useSearch();
	return (
		<div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200/80 via-white/90 to-purple-200/80 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-700 overflow-hidden">
			{/* Floating Background Icons */}
			<div className="absolute inset-0 z-0 overflow-hidden">
				<Code
					className="absolute top-20 left-10 w-12 h-12 text-red-400/20 dark:text-red-300/10 animate-float"
					style={{ animationDelay: "0s" }}
				/>
				<GitBranch
					className="absolute top-32 right-20 w-8 h-8 text-orange-400/20 dark:text-orange-300/10 animate-float"
					style={{ animationDelay: "2s" }}
				/>
				<Rocket
					className="absolute bottom-40 left-16 w-10 h-10 text-blue-400/20 dark:text-blue-300/10 animate-float"
					style={{ animationDelay: "4s" }}
				/>
				<BookOpen
					className="absolute bottom-20 right-12 w-14 h-14 text-purple-400/20 dark:text-purple-300/10 animate-float"
					style={{ animationDelay: "1s" }}
				/>
				<User
					className="absolute top-1/2 left-8 w-6 h-6 text-green-400/20 dark:text-green-300/10 animate-float"
					style={{ animationDelay: "3s" }}
				/>
				<AtSign
					className="absolute top-1/3 right-8 w-9 h-9 text-pink-400/20 dark:text-pink-300/10 animate-float"
					style={{ animationDelay: "5s" }}
				/>
			</div>
			<div className="relative z-10 w-full max-w-sm px-4 sm:px-6 md:px-8 py-10 rounded-3xl shadow-2xl flex flex-col gap-8 backdrop-blur-lg bg-white/80 dark:bg-gray-900/90 border border-white/60 dark:border-gray-800/80 animate-fade-in">
				<SignupForm rdt={rdt as LinkProps["to"]} />
			</div>
		</div>
	);
}

/**
 * SignupForm
 *
 * Handles the registration form, error display, and OTP dialog for email verification.
 *
 * Props:
 *   - rdt: LinkProps["to"] (redirect target after signup)
 */
function SignupForm({ rdt }: { rdt: LinkProps["to"] }) {
	const navigate = useNavigate();
	const [showOtpDialog, setShowOtpDialog] = useState(false);
	const setAccessToken = useStore((state) => state.auth.setAccessToken);
	const [formError, setFormError] = useState<string | null>(null);
	const [step, setStep] = useState(1); // Step state: 1 = name/email, 2 = password
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
			{/* Brand header and step indicator in a single row, justify-between */}
			<div className="flex items-center justify-between mb-3 w-full">
				<span
					className="font-extrabold text-4xl tracking-tight select-none drop-shadow-lg animate-gradient-x bg-gradient-to-r from-red-400 via-orange-400 to-orange-600 bg-clip-text text-transparent"
					style={{
						fontFamily: "Quicksand, Inter, Segoe UI, Arial, sans-serif",
						letterSpacing: "-0.01em",
					}}
				>
					Tamatar
				</span>
				<div className="flex items-center gap-1 select-none">
					<span
						className={`h-1 w-4 rounded bg-gradient-to-r from-green-300 via-lime-300 to-emerald-400 transition-all duration-300 ${
							step === 1 ? "opacity-60" : "opacity-20"
						}`}
						title="Account"
					/>
					<span
						className={`h-1 w-4 rounded bg-gradient-to-r from-green-300 via-lime-300 to-emerald-400 transition-all duration-300 ${
							step === 2 ? "opacity-60" : "opacity-20"
						}`}
						title="Security"
					/>
				</div>
			</div>
			<Form {...form}>
				<form
					onSubmit={async (e) => {
						e.preventDefault();
						if (step === 1) {
							const valid = await form.trigger(["name", "email"]);
							if (valid) setStep(2);
						} else {
							form.handleSubmit(onSubmit)(e);
						}
					}}
					className="flex flex-col gap-6 w-full animate-fade-in"
					autoComplete="off"
				>
					{step === 1 && (
						<>
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
							{/* Next button */}
							<Button
								type="submit"
								className="w-full bg-gradient-to-r from-red-500 via-orange-500 to-green-600 hover:from-green-600 hover:to-red-500 text-white font-bold shadow-xl transition-all duration-300 border-2 border-white/80 dark:border-gray-800/80"
							>
								Next
							</Button>
							{/* Google signup button, visually separated */}
							<Separator className="my-2 opacity-80" />
							<GoogleButton
								setAccessToken={setAccessToken}
								rdt={rdt}
								route="signup"
							/>
							{/* Already have an account link, styled like login form */}
							<p className="text-sm text-center text-muted-foreground mt-4">
								Already have an account?{" "}
								<Link
									to="/auth/login"
									className="text-blue-500 hover:underline"
									search={{ rdt: rdt }}
								>
									Login
								</Link>
							</p>
						</>
					)}
					{step === 2 && (
						<>
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
							{/* Submit button */}
							<Button
								type="submit"
								className="w-full bg-gradient-to-r from-red-500 via-orange-500 to-green-600 hover:from-green-600 hover:to-red-500 text-white font-bold shadow-xl transition-all duration-300 border-2 border-white/80 dark:border-gray-800/80"
								pending={form.formState.isSubmitting}
							>
								Sign Up
							</Button>
							{/* Back button */}
							<Button
								type="button"
								variant="outline"
								className="w-full"
								onClick={() => setStep(1)}
							>
								Back
							</Button>
						</>
					)}
					{/* Error Alert */}
					{formError && (
						<Alert variant="destructive">
							<AlertDescription>{formError}</AlertDescription>
						</Alert>
					)}
				</form>
			</Form>
			{/* OTP Dialog for email verification */}
			<OtpDialog
				open={showOtpDialog}
				onOpenChange={setShowOtpDialog}
				email={form.getValues("email")}
				purpose={OtpPurpose.SIGNUP}
				onSuccess={() =>
					navigate({
						to: rdt,
						replace: true,
					})
				}
			/>
		</>
	);
}

/*
  Add this to your global CSS (e.g., styles.css) for the gradient animation:
  @keyframes gradient-x {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  .animate-gradient-x {
    background-size: 200% 200%;
    animation: gradient-x 3s ease-in-out infinite;
  }
*/
