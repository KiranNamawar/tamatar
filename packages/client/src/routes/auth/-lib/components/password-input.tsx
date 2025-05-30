import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Info } from "lucide-react";
// PasswordInput component: A password input field with visibility toggle, strength meter, and accessible requirements popover.
import type * as React from "react";
import { useState } from "react";

/**
 * InputProps extends the native input props with optional icon, label, and showStrength.
 */
type InputProps = React.ComponentProps<"input"> & {
	icon?: React.ReactNode;
	label?: string;
	showStrength?: boolean;
};

/**
 * PasswordInput
 * Renders a password input with an optional icon, visibility toggle, password strength meter,
 * and an accessible popover for password requirements.
 *
 * @param {InputProps} props - Props for the input, including icon, label, and showStrength.
 */
function PasswordInput({
	label,
	className,
	icon,
	showStrength,
	...props
}: InputProps) {
	// State for password visibility
	const [show, setShow] = useState(false);
	// State for the password value
	const [password, setPassword] = useState("");
	// State for input focus
	const [focused, setFocused] = useState(false);
	// State for popover open/close
	const [popoverOpen, setPopoverOpen] = useState(false);

	// Calculate password strength (0-5)
	const strength = showStrength ? calculatePasswordStrength(password) : 0;
	// Show strength bar if enabled and input is focused or popover is open
	const showStrengthBar = showStrength && (focused || popoverOpen);

	return (
		<>
			{" "}
			{/* Password input with optional icon and visibility toggle */}{" "}
			<div className="relative flex items-center">
				{/* Backdrop blur layer */}
				<div className="absolute inset-0 bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm border border-white/40 dark:border-gray-700/30 rounded-xl shadow-lg" />
				<input
					type={show ? "text" : "password"}
					data-slot="input"
					className={cn(
						icon ? "pl-10" : "px-3",
						"pr-9", // space for the eye icon
						"relative z-10 file:text-foreground placeholder:text-muted-foreground/70 selection:bg-primary selection:text-primary-foreground bg-transparent flex h-9 w-full min-w-0 border-0 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
						"text-gray-900 dark:text-gray-100", // Enhanced contrast for text
						"focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-0 focus-visible:rounded-xl",
						"aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:rounded-xl",
						className,
					)}
					{...props}
					onChange={(e) => {
						setPassword(e.target.value);
						props.onChange?.(e);
					}}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
				/>{" "}
				{icon && (
					<span className="absolute left-3 flex items-center pointer-events-none text-gray-600 dark:text-gray-400 mr-2 z-20">
						{icon}
					</span>
				)}{" "}
				<button
					type="button"
					tabIndex={-1}
					className="absolute right-3 flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none z-20"
					onClick={() => setShow((v) => !v)}
					aria-label={show ? "Hide password" : "Show password"}
				>
					{show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
				</button>
			</div>
			{/* Password strength meter and requirements popover */}
			{showStrengthBar && (
				<div
					className="mt-2 w-full flex items-center gap-2"
					aria-live="polite"
					aria-atomic="true"
				>
					<Progress
						value={(strength / 5) * 100}
						aria-label="Password strength meter"
						aria-valuenow={(strength / 5) * 100}
						aria-valuemin={0}
						aria-valuemax={100}
						role="progressbar"
						className={`h-2 w-full rounded-full border transition-colors ${
							strength === 0
								? "bg-red-100 border-red-200 [&>div]:bg-red-400"
								: strength === 1
									? "bg-red-200 border-red-300 [&>div]:bg-red-500"
									: strength === 2
										? "bg-orange-100 border-orange-200 [&>div]:bg-orange-400"
										: strength === 3
											? "bg-yellow-100 border-yellow-200 [&>div]:bg-yellow-400"
											: strength === 4
												? "bg-green-100 border-green-200 [&>div]:bg-green-400"
												: "bg-green-200 border-green-300 [&>div]:bg-green-600"
						}`}
					/>
					<span
						className="text-xs font-semibold select-none whitespace-nowrap"
						id="password-strength-text"
						style={{
							color:
								strength === 0
									? "#dc2626" // red-600
									: strength === 1
										? "#b91c1c" // red-700
										: strength === 2
											? "#ea580c" // orange-600
											: strength === 3
												? "#ca8a04" // yellow-600
												: strength === 4
													? "#16a34a" // green-600
													: "#166534", // green-800
						}}
					>
						{strength === 0 && "Too short"}
						{strength === 1 && "Very weak"}
						{strength === 2 && "Weak"}
						{strength === 3 && "Moderate"}
						{strength === 4 && "Strong"}
						{strength === 5 && "Very strong"}
					</span>
					<Details popoverOpen={popoverOpen} setPopoverOpen={setPopoverOpen} />
				</div>
			)}
		</>
	);
}

/**
 * calculatePasswordStrength
 * Returns a score from 0 (weakest) to 5 (strongest) based on password length and character variety.
 * @param password - The password string to evaluate.
 */
function calculatePasswordStrength(password: string): number {
	if (!password) return 0;

	let strength = 0;

	// Length check
	if (password.length >= 8) strength += 1;
	if (password.length >= 12) strength += 1;

	// Character variety checks
	if (/[A-Z]/.test(password)) strength += 1;
	if (/[a-z]/.test(password)) strength += 1;
	if (/[0-9]/.test(password)) strength += 1;
	if (/[^A-Za-z0-9]/.test(password)) strength += 1;

	return Math.min(strength, 5); // Max strength is 5
}

/**
 * Details
 * Renders an accessible popover with password requirements.
 *
 * @param popoverOpen - Whether the popover is open
 * @param setPopoverOpen - Function to set popover open state
 */
function Details({
	popoverOpen,
	setPopoverOpen,
}: { popoverOpen: boolean; setPopoverOpen: (open: boolean) => void }) {
	return (
		<Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
			<PopoverTrigger asChild>
				<button
					type="button"
					className="inline-flex items-center cursor-pointer focus:outline-none"
					aria-label="Password requirements"
					aria-describedby="password-strength-text"
					onMouseDown={(e) => e.preventDefault()}
				>
					<Info className="h-4 w-4" aria-hidden="true" />
				</button>
			</PopoverTrigger>
			<PopoverContent aria-label="Password requirements">
				<p className="mb-1 text-sm font-semibold">
					Password must contain at least:
				</p>
				<ul className="list-disc space-y-1 pl-4 text-sm dark:text-gray-300">
					<li>8 characters</li>
					<li>one uppercase letter</li>
					<li>one lowercase letter</li>
					<li>one number</li>
					<li>one special character</li>
				</ul>
			</PopoverContent>
		</Popover>
	);
}

export { PasswordInput };
