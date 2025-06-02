import { fadeInUp, hoverLift } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { type HTMLMotionProps, motion } from "motion/react";
import * as React from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
	variant?: "default" | "enhanced" | "subtle";
	children: React.ReactNode;
}

export function GlassCard({
	variant = "default",
	className,
	children,
	...props
}: GlassCardProps) {
	const variants = {
		default: "glass rounded-xl",
		enhanced: "glass-card rounded-xl",
		subtle:
			"backdrop-blur-sm bg-white/5 dark:bg-black/10 border border-white/10 rounded-xl",
	};

	return (
		<motion.div
			variants={fadeInUp}
			className={cn(variants[variant], "relative overflow-hidden", className)}
			{...hoverLift}
			{...props}
		>
			{children}
		</motion.div>
	);
}

interface GlassNavProps extends HTMLMotionProps<"nav"> {
	children: React.ReactNode;
	position?: "top" | "bottom" | "floating";
}

export function GlassNav({
	position = "top",
	className,
	children,
	...props
}: GlassNavProps) {
	const positionClasses = {
		top: "fixed top-0 left-0 right-0 z-50",
		bottom: "fixed bottom-0 left-0 right-0 z-50",
		floating: "relative",
	};

	return (
		<motion.nav
			initial={{
				y: position === "top" ? -100 : position === "bottom" ? 100 : 0,
				opacity: 0,
			}}
			animate={{ y: 0, opacity: 1 }}
			transition={{ type: "spring", stiffness: 300, damping: 30 }}
			className={cn(
				"glass border-b border-white/10",
				positionClasses[position],
				className,
			)}
			{...props}
		>
			{children}
		</motion.nav>
	);
}

interface GlassModalProps extends HTMLMotionProps<"div"> {
	children: React.ReactNode;
	isOpen: boolean;
	onClose?: () => void;
}

export function GlassModal({
	isOpen,
	onClose,
	className,
	children,
	...props
}: GlassModalProps) {
	if (!isOpen) return null;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 z-50 flex items-center justify-center"
			onClick={onClose}
		>
			{/* Backdrop */}
			<div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

			{/* Modal Content */}
			<motion.div
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.8, opacity: 0 }}
				transition={{ type: "spring", stiffness: 300, damping: 30 }}
				className={cn(
					"glass-card relative z-10 max-w-md mx-4 p-6 rounded-2xl",
					className,
				)}
				onClick={(e) => e.stopPropagation()}
				{...props}
			>
				{children}
			</motion.div>
		</motion.div>
	);
}

interface GlassButtonProps extends HTMLMotionProps<"button"> {
	variant?: "primary" | "secondary" | "ghost";
	size?: "sm" | "md" | "lg";
	children: React.ReactNode;
}

export function GlassButton({
	variant = "primary",
	size = "md",
	className,
	children,
	...props
}: GlassButtonProps) {
	const variants = {
		primary:
			"glass bg-primary/20 hover:bg-primary/30 text-slate-700 dark:text-slate-200 border-primary/30",
		secondary:
			"glass bg-secondary/20 hover:bg-secondary/30 text-slate-700 dark:text-slate-200 border-secondary/30",
		ghost:
			"glass hover:bg-accent/20 text-slate-700 dark:text-slate-200 border-border/50",
	};

	const sizes = {
		sm: "px-3 py-1.5 text-sm rounded-lg",
		md: "px-4 py-2 text-base rounded-xl",
		lg: "px-6 py-3 text-lg rounded-xl",
	};

	return (
		<motion.button
			whileHover={{ scale: 1.02, y: -1 }}
			whileTap={{ scale: 0.98 }}
			transition={{ type: "spring", stiffness: 300, damping: 20 }}
			className={cn(
				"inline-flex items-center justify-center font-medium transition-all",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
				"disabled:pointer-events-none disabled:opacity-50",
				variants[variant],
				sizes[size],
				className,
			)}
			{...props}
		>
			{children}
		</motion.button>
	);
}

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
}

export const GlassInput = React.forwardRef<HTMLInputElement, GlassInputProps>(
	({ className, label, error, id, ...props }, ref) => {
		const inputId = id || React.useId();

		return (
			<div className="space-y-2">
				{label && (
					<label
						htmlFor={inputId}
						className="text-sm font-medium text-foreground/80"
					>
						{label}
					</label>
				)}{" "}
				<motion.div
					whileFocus={{ scale: 1.01 }}
					transition={{ type: "spring", stiffness: 300, damping: 30 }}
				>
					<input
						id={inputId}
						className={cn(
							"flex h-10 w-full rounded-xl glass px-4 py-2 text-sm",
							"placeholder:text-muted-foreground",
							"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
							"disabled:cursor-not-allowed disabled:opacity-50",
							error && "border-destructive focus-visible:ring-destructive",
							className,
						)}
						ref={ref}
						{...props}
					/>
				</motion.div>
				{error && (
					<motion.p
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-sm text-destructive"
					>
						{error}
					</motion.p>
				)}
			</div>
		);
	},
);

GlassInput.displayName = "GlassInput";

interface GlassPanelProps extends HTMLMotionProps<"div"> {
	children: React.ReactNode;
	header?: React.ReactNode;
	footer?: React.ReactNode;
}

export function GlassPanel({
	className,
	children,
	header,
	footer,
	...props
}: GlassPanelProps) {
	return (
		<motion.div
			variants={fadeInUp}
			className={cn("glass-card rounded-2xl overflow-hidden", className)}
			{...props}
		>
			{header && (
				<div className="px-6 py-4 border-b border-white/10">{header}</div>
			)}
			<div className="p-6">{children}</div>
			{footer && (
				<div className="px-6 py-4 border-t border-white/10">{footer}</div>
			)}
		</motion.div>
	);
}
