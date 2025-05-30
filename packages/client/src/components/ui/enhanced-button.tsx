import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { type MotionProps, motion } from "motion/react";
import * as React from "react";

/**
 * Button variant configuration using class-variance-authority
 * Provides styles for different button variants, sizes, and states
 */
const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground shadow hover:bg-primary/90",
				destructive:
					"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
				outline:
					"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
				secondary:
					"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
				gradient:
					"bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white shadow-lg hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700",
				glass:
					"bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg hover:bg-white/30 dark:bg-gray-800/30 dark:border-gray-700/30 dark:hover:bg-gray-800/50",
				glow: "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-400 before:to-purple-500 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
				success: "bg-green-600 text-white shadow-lg hover:bg-green-700",
				warning: "bg-amber-500 text-white shadow-lg hover:bg-amber-600",
				info: "bg-blue-500 text-white shadow-lg hover:bg-blue-600",
				tamatar:
					"bg-gradient-to-r from-red-500 via-orange-500 to-orange-600 text-white shadow-lg hover:from-red-600 hover:to-orange-700 hover:shadow-xl",
				muted:
					"bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
			},
			size: {
				default: "h-9 px-4 py-2",
				sm: "h-8 rounded-md px-3 text-xs",
				lg: "h-10 rounded-md px-8",
				xl: "h-12 rounded-lg px-10 text-base",
				"2xl": "h-14 rounded-xl px-12 text-lg",
				icon: "h-9 w-9",
				"icon-sm": "h-7 w-7 rounded-md [&_svg]:size-3",
				"icon-lg": "h-11 w-11 rounded-lg [&_svg]:size-5",
			},
			rounded: {
				default: "rounded-md",
				full: "rounded-full",
				lg: "rounded-lg",
				xl: "rounded-xl",
				none: "rounded-none",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
			rounded: "default",
		},
	},
);

/**
 * Props for the Button component
 */
export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	/** Render as a child component (using Radix UI Slot) */
	asChild?: boolean;
	/** Enable animation effects */
	animated?: boolean;
	/** Show loading spinner (alias for pending) */
	loading?: boolean;
	/** Show loading spinner */
	pending?: boolean;
	/** Icon to display before button text */
	icon?: React.ReactNode;
	/** Icon to display after button text */
	rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			rounded,
			asChild = false,
			animated = false,
			loading = false,
			pending = false,
			icon,
			rightIcon,
			children,
			disabled,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : "button";
		const isLoading = loading || pending;

		const buttonContent = (
			<>
				{isLoading ? (
					<Loader2 className="h-4 w-4 animate-spin" />
				) : icon ? (
					icon
				) : null}
				{children}
				{rightIcon && rightIcon}
			</>
		);

		const buttonClass = cn(
			buttonVariants({ variant, size, rounded, className }),
			isLoading && "cursor-not-allowed opacity-70",
		);

		if (animated && !asChild) {
			return (
				<motion.button
					ref={ref as React.Ref<HTMLButtonElement>}
					className={buttonClass}
					disabled={disabled || isLoading}
					whileHover={!disabled && !isLoading ? { scale: 1.02 } : undefined}
					whileTap={!disabled && !isLoading ? { scale: 0.98 } : undefined}
					transition={{ type: "spring", stiffness: 400, damping: 17 }}
					// Need to cast props here to avoid TS errors with motion props
					{...(props as any)}
				>
					{buttonContent}
				</motion.button>
			);
		}

		return (
			<Comp
				className={buttonClass}
				ref={ref}
				disabled={disabled || isLoading}
				{...props}
			>
				{buttonContent}
			</Comp>
		);
	},
);

Button.displayName = "Button";

/**
 * Extended version of Button with enhanced animation and interaction features
 */
type EnhancedButtonBaseProps = {
	/** Animation style to apply on hover */
	hoverEffect?: "scale" | "float" | "glow" | "bounce" | "none";
	/** Apply one of the Tamatar gradient styles */
	tamatarGradient?: boolean | "primary" | "accent" | "auth" | "selection";
	/** Add "shimmer" effect to button */
	shimmer?: boolean;
	/** Custom motion properties to override defaults */
	motionProps?: MotionProps;
};

// Combine with Button props but allow extra props for motion
interface EnhancedButtonProps
	extends EnhancedButtonBaseProps,
		Omit<ButtonProps, keyof EnhancedButtonBaseProps> {
	// Allow any additional props
	[key: string]: any;
}

/**
 * Enhanced button component with additional animation and styling options.
 * Extends the base Button component with hover animations, gradients, and effects.
 */
/**
 * Create a MotionButtonComponent to handle the animation properties correctly
 */
const MotionButton = motion(Button);

const EnhancedButton = React.forwardRef<HTMLButtonElement, EnhancedButtonProps>(
	(
		{
			hoverEffect = "scale",
			tamatarGradient = false,
			shimmer = false,
			motionProps = {},
			className,
			variant,
			...props
		},
		ref,
	) => {
		// Get the appropriate hover animation based on the hoverEffect prop
		let hoverProps = {};

		if (hoverEffect === "scale") {
			hoverProps = {
				whileHover: { scale: 1.03 },
				whileTap: { scale: 0.97 },
				transition: { duration: 0.2, ease: "easeOut" },
			};
		} else if (hoverEffect === "float") {
			hoverProps = {
				whileHover: { scale: 1.02, y: -3 },
				whileTap: { scale: 0.98, y: 0 },
				transition: { duration: 0.3, ease: "easeOut" },
			};
		} else if (hoverEffect === "glow") {
			hoverProps = {
				whileHover: {
					scale: 1.02,
					boxShadow: "0 0 15px rgba(255,255,255,0.5)",
				},
				whileTap: { scale: 0.98 },
				transition: { duration: 0.3, ease: "easeOut" },
			};
		} else if (hoverEffect === "bounce") {
			hoverProps = {
				whileHover: { scale: 1.05, rotate: 1 },
				whileTap: { scale: 0.95, rotate: 0 },
				transition: { type: "spring", stiffness: 400, damping: 10 },
			};
		}

		// Apply Tamatar gradient if specified
		let finalClassName = className;
		let finalVariant = variant;

		if (tamatarGradient) {
			// If it's just "true", use the tamatar variant
			if (tamatarGradient === true) {
				finalVariant = "tamatar";
			} else if (tamatarGradient === "primary") {
				finalVariant = "tamatar";
			} else {
				// For other gradient types, apply the appropriate class based on the type
				finalClassName = cn(
					className,
					"bg-gradient-to-r text-white font-bold shadow-lg hover:shadow-xl transition-all",
					tamatarGradient === "accent" &&
						"from-red-500 to-pink-500 hover:from-pink-500 hover:to-red-500",
					tamatarGradient === "auth" &&
						"from-red-500 via-orange-500 to-green-600 hover:from-green-600 hover:to-red-500",
					tamatarGradient === "selection" &&
						"from-red-500 to-orange-500 hover:from-orange-500 hover:to-red-500",
				);
			}
		}

		// Add shimmer effect if enabled
		if (shimmer) {
			finalClassName = cn(
				finalClassName,
				"relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700",
			);
		}
		// Extract props that could conflict between React and Motion
		const {
			// List events that have different signatures between React and Motion
			onDrag,
			onDragStart,
			onDragEnd,
			onAnimationStart,
			onAnimationComplete,
			...safeProps
		} = props;

		// Create element props
		const elementProps = {
			ref,
			className: finalClassName,
			variant: finalVariant,
			animated: false, // We handle animations ourselves here
			...safeProps,
		};

		// Combine hover props with any motion-specific props
		const finalMotionProps = {
			...hoverProps,
			...motionProps,
			// Add motion-specific event handlers if provided
			...(onDrag && { onDrag }),
			...(onDragStart && { onDragStart }),
			...(onDragEnd && { onDragEnd }),
			...(onAnimationStart && { onAnimationStart }),
			...(onAnimationComplete && { onAnimationComplete }),
		};

		return <MotionButton {...elementProps} {...finalMotionProps} />;
	},
);

EnhancedButton.displayName = "EnhancedButton";

export { Button, buttonVariants, EnhancedButton };
