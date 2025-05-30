import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form, FormFieldWrapper } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { graphql, graphqlRequest } from "@/graphql";
import { useStore } from "@/hooks/useStore";
import { createTamatarButtonClass } from "@/lib/ui-patterns";
import { BrandHeader } from "@auth/components/brand-header";
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
import { AtSign, KeyRound, User } from "lucide-react";
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
 * Simply renders the SignupForm since AuthLayout is now handled at the route level.
 */
function RouteComponent() {
	const { rdt } = Route.useSearch();
	return <SignupForm rdt={rdt as LinkProps["to"]} />;
}

/**
 * Custom hook for signup form logic
 */
function useSignupForm(rdt: LinkProps["to"]) {
	const navigate = useNavigate();
	const [showOtpDialog, setShowOtpDialog] = useState(false);
	const setAccessToken = useStore((state) => state.auth.setAccessToken);
	const [formError, setFormError] = useState<string | null>(null);
	const [step, setStep] = useState(1);

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

	const onSubmit = async (data: SignupSchema) => {
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
	};

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (step === 1) {
			const valid = await form.trigger(["name", "email"]);
			if (valid) setStep(2);
		} else {
			form.handleSubmit(onSubmit)(e);
		}
	};

	const handleOtpSuccess = () => {
		navigate({
			to: rdt,
			replace: true,
		});
	};

	return {
		form,
		step,
		setStep,
		formError,
		setFormError,
		showOtpDialog,
		setShowOtpDialog,
		setAccessToken,
		onSubmit,
		handleFormSubmit,
		handleOtpSuccess,
	};
}

/**
 * Step indicator component for signup form
 */
function SignupStepIndicator({
	currentStep,
	totalSteps,
}: { currentStep: number; totalSteps: number }) {
	const steps = ["Account", "Security"];

	return (
		<div className="flex items-center gap-1 select-none">
			{steps.slice(0, totalSteps).map((stepName, i) => (
				<span
					key={stepName}
					className={`h-1 w-4 rounded bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700 dark:from-green-300 dark:via-lime-300 dark:to-emerald-400 transition-all duration-300 ${
						i + 1 === currentStep ? "opacity-80" : "opacity-30"
					}`}
					title={stepName}
				/>
			))}
		</div>
	);
}

/**
 * SignupForm UI Component
 * Pure UI component that receives all props from the custom hook
 */
function SignupForm({ rdt }: { rdt: LinkProps["to"] }) {
	const {
		form,
		step,
		setStep,
		formError,
		showOtpDialog,
		setShowOtpDialog,
		setAccessToken,
		handleFormSubmit,
		handleOtpSuccess,
	} = useSignupForm(rdt);

	return (
		<>
			<div className="flex items-center justify-between mb-3 w-full">
				<div>
					<BrandHeader centered={false} />
				</div>
				<SignupStepIndicator currentStep={step} totalSteps={2} />
			</div>
			<Form {...form}>
				<form
					onSubmit={handleFormSubmit}
					className="flex flex-col gap-6 w-full animate-fade-in"
					autoComplete="off"
				>
					{step === 1 && (
						<SignupStep1
							form={form}
							rdt={rdt}
							setAccessToken={setAccessToken}
						/>
					)}
					{step === 2 && <SignupStep2 form={form} setStep={setStep} />}
					{formError && (
						<Alert variant="destructive">
							<AlertDescription>{formError}</AlertDescription>
						</Alert>
					)}
				</form>
			</Form>
			<OtpDialog
				open={showOtpDialog}
				onOpenChange={setShowOtpDialog}
				email={form.getValues("email")}
				purpose={OtpPurpose.SIGNUP}
				onSuccess={handleOtpSuccess}
			/>
		</>
	);
}

/**
 * Step 1: Name and Email
 */
function SignupStep1({
	form,
	rdt,
	setAccessToken,
}: {
	form: any;
	rdt: LinkProps["to"];
	setAccessToken: (token: string | null) => void;
}) {
	return (
		<>
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

			<Button
				type="submit"
				className={createTamatarButtonClass(
					"auth",
					"w-full shadow-xl border-2 border-white/80 dark:border-gray-800/80",
				)}
			>
				Next
			</Button>

			<Separator className="my-2 opacity-80" />

			<GoogleButton setAccessToken={setAccessToken} rdt={rdt} route="signup" />

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
	);
}

/**
 * Step 2: Password and Confirm Password
 */
function SignupStep2({
	form,
	setStep,
}: {
	form: any;
	setStep: (step: number) => void;
}) {
	return (
		<>
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
				className={createTamatarButtonClass(
					"auth",
					"w-full shadow-xl border-2 border-white/80 dark:border-gray-800/80",
				)}
				pending={form.formState.isSubmitting}
			>
				Sign Up
			</Button>

			<Button
				type="button"
				variant="outline"
				className="w-full"
				onClick={() => setStep(1)}
			>
				Back
			</Button>
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
