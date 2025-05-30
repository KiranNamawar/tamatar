import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form, FormFieldWrapper } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { graphql, graphqlRequest } from "@/graphql";
import { createTamatarButtonClass } from "@/lib/ui-patterns";
import { BrandHeader } from "@auth/components/brand-header";
import { zodResolver } from "@hookform/resolvers/zod";
import { OtpPurpose } from "@shared/constant";
import { resetPasswordForm as resetPasswordSchema } from "@shared/schema";
import {
	type LinkProps,
	createFileRoute,
	useNavigate,
} from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { AtSign, KeyRound } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { OtpDialog, sendOtpQuery } from "./-lib/components/otp";
import { PasswordInput } from "./-lib/components/password-input";

const resetPasswordQuery = graphql(`
  mutation ResetPassword($password: String!, $confirmPassword: String!) {
    resetPassword(password: $password, confirmPassword: $confirmPassword)
  }  
`);

const searchSchema = z.object({
	rdt: z.string().default("/dashboard"),
});

export const Route = createFileRoute("/auth/forgot-password")({
	validateSearch: zodValidator(searchSchema),
	component: RouteComponent,
});

// --- Types ---
const forgotPasswordSchema = z.object({
	email: z.string().email("Invalid Email Format"),
});
type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

// --- Route Component ---
/**
 * Forgot Password page wrapper.
 * Simply renders the forgot/reset password forms since AuthLayout is now handled at the route level.
 */
function RouteComponent() {
	const { rdt } = Route.useSearch();
	const [step, setStep] = useState<"forgot" | "reset">("forgot");
	const [token, setToken] = useState<string | null>(null);
	return (
		<>
			<BrandHeader />
			{step === "reset" ? (
				<ResetPasswordForm token={token} rdt={rdt as LinkProps["to"]} />
			) : (
				<ForgotPasswordForm
					onSuccess={(token) => {
						setToken(token);
						setStep("reset");
					}}
				/>
			)}
		</>
	);
}

// --- Forgot Password Form ---
/**
 * ForgotPasswordForm
 * Handles email input, sends OTP, and shows OTP dialog for verification.
 *
 * Props:
 *   - onSuccess: (token: string | null) => void (called after OTP verified)
 */
function ForgotPasswordForm({
	onSuccess,
}: { onSuccess: (data: string | null) => void }) {
	const [showOtpDialog, setShowOtpDialog] = useState(false);
	const [formError, setFormError] = useState<null | string>(null);
	const form = useForm<ForgotPasswordSchema>({
		defaultValues: { email: "" },
		resolver: zodResolver(forgotPasswordSchema),
		mode: "onBlur",
	});

	async function onSubmit(data: ForgotPasswordSchema) {
		const response = await graphqlRequest({
			query: sendOtpQuery,
			variables: { email: data.email, purpose: OtpPurpose.FORGOT_PASSWORD },
			clientOptions: { isAuthenticated: false },
		});
		if (!response.success) {
			setFormError("Invalid Credentials");
			return;
		}
		toast.info(
			"Verification code sent to your email. Please check your inbox.",
		);
		setShowOtpDialog(true);
	}

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-6 w-full animate-fade-in"
					autoComplete="off"
				>
					<FormFieldWrapper form={form} name="email" label="Email">
						{(field) => (
							<Input
								{...field}
								type="email"
								icon={<AtSign className="w-5 h-5" />}
								placeholder="Enter your Email"
								className="w-full"
							/>
						)}
					</FormFieldWrapper>{" "}
					<Button
						type="submit"
						pending={form.formState.isSubmitting}
						className={createTamatarButtonClass(
							"primary",
							"w-full shadow-xl border-2 border-white/80 dark:border-gray-800/80",
						)}
					>
						Send OTP
					</Button>
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
				purpose={OtpPurpose.FORGOT_PASSWORD}
				onSuccess={onSuccess}
			/>
		</>
	);
}

// --- Reset Password Form ---
/**
 * ResetPasswordForm
 * Handles new password input and confirmation after OTP verification.
 *
 * Props:
 *   - token: string | null (reset token from OTP)
 *   - rdt: LinkProps["to"] (redirect target after reset)
 */
function ResetPasswordForm({
	token,
	rdt,
}: { token: string | null; rdt: LinkProps["to"] }) {
	const navigate = useNavigate();
	const [formError, setFormError] = useState<null | string>(null);
	const form = useForm<ResetPasswordSchema>({
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
		resolver: zodResolver(resetPasswordSchema),
		mode: "onBlur",
	});

	async function onSubmit(data: ResetPasswordSchema) {
		const response = await graphqlRequest({
			query: resetPasswordQuery,
			variables: data,
			clientOptions: { token },
		});

		if (response.success) {
			toast.success("Password Reset successfully!");
			return navigate({
				to: "/auth/login",
				replace: true,
				search: { rdt },
			});
		}
		setFormError(response.error.message);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-6 w-full animate-fade-in"
				autoComplete="off"
			>
				<FormFieldWrapper form={form} name="password" label="Password">
					{(field) => (
						<PasswordInput
							{...field}
							icon={<KeyRound className="w-5 h-5" />}
							showStrength={true}
							className="w-full"
							placeholder="Enter your new password"
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
							icon={<KeyRound className="w-5 h-5" />}
							className="w-full"
							placeholder="Confirm your new password"
						/>
					)}
				</FormFieldWrapper>{" "}
				<Button
					type="submit"
					pending={form.formState.isSubmitting}
					className={createTamatarButtonClass(
						"primary",
						"w-full shadow-xl border-2 border-white/80 dark:border-gray-800/80",
					)}
				>
					Confirm
				</Button>
				{formError && (
					<Alert variant="destructive">
						<AlertDescription>{formError}</AlertDescription>
					</Alert>
				)}
			</form>
		</Form>
	);
}
