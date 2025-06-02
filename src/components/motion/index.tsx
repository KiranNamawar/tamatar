import {
	fadeIn,
	fadeInUp,
	hoverLift,
	hoverScale,
	pageTransition,
	scaleIn,
	slideInLeft,
	slideInRight,
	staggerContainer,
	staggerItem,
} from "@/lib/animations";
import { cn } from "@/lib/utils";
import { type HTMLMotionProps, motion } from "motion/react";
import { forwardRef } from "react";

// Base motion div with common animations
interface MotionDivProps extends HTMLMotionProps<"div"> {
	animation?:
		| "fadeIn"
		| "fadeInUp"
		| "scaleIn"
		| "slideInLeft"
		| "slideInRight"
		| "none";
	delay?: number;
	duration?: number;
	children?: React.ReactNode;
}

export const MotionDiv = forwardRef<HTMLDivElement, MotionDivProps>(
	(
		{
			className,
			animation = "fadeIn",
			delay = 0,
			duration = 0.5,
			children,
			...props
		},
		ref,
	) => {
		const getAnimation = () => {
			switch (animation) {
				case "fadeIn":
					return fadeIn;
				case "fadeInUp":
					return fadeInUp;
				case "scaleIn":
					return scaleIn;
				case "slideInLeft":
					return slideInLeft;
				case "slideInRight":
					return slideInRight;
				case "none":
					return {};
				default:
					return fadeIn;
			}
		};

		return (
			<motion.div
				ref={ref}
				className={cn(className)}
				variants={getAnimation()}
				initial="initial"
				animate="animate"
				transition={{ delay, duration }}
				{...props}
			>
				{children}
			</motion.div>
		);
	},
);
MotionDiv.displayName = "MotionDiv";

// Motion container for staggered children
interface MotionListProps extends HTMLMotionProps<"div"> {
	staggerDelay?: number;
	children?: React.ReactNode;
}

export const MotionList = forwardRef<HTMLDivElement, MotionListProps>(
	({ className, staggerDelay = 0.1, children, ...props }, ref) => {
		return (
			<motion.div
				ref={ref}
				className={cn(className)}
				variants={staggerContainer}
				initial="initial"
				animate="animate"
				custom={staggerDelay}
				{...props}
			>
				{children}
			</motion.div>
		);
	},
);
MotionList.displayName = "MotionList";

// Motion item for use within MotionList
interface MotionItemProps extends HTMLMotionProps<"div"> {
	children?: React.ReactNode;
}

export const MotionItem = forwardRef<HTMLDivElement, MotionItemProps>(
	({ className, children, ...props }, ref) => {
		return (
			<motion.div
				ref={ref}
				className={cn(className)}
				variants={staggerItem}
				{...props}
			>
				{children}
			</motion.div>
		);
	},
);
MotionItem.displayName = "MotionItem";

// Motion button with hover effects
interface MotionButtonProps extends HTMLMotionProps<"button"> {
	variant?: "scale" | "lift" | "none";
	children?: React.ReactNode;
}

export const MotionButton = forwardRef<HTMLButtonElement, MotionButtonProps>(
	({ className, variant = "scale", children, ...props }, ref) => {
		const getHoverEffect = () => {
			switch (variant) {
				case "scale":
					return hoverScale;
				case "lift":
					return hoverLift;
				case "none":
					return {};
				default:
					return hoverScale;
			}
		};

		return (
			<motion.button
				ref={ref}
				className={cn("smooth-transition", className)}
				variants={getHoverEffect()}
				whileHover="hover"
				whileTap="tap"
				{...props}
			>
				{children}
			</motion.button>
		);
	},
);
MotionButton.displayName = "MotionButton";

// Motion page wrapper for route transitions
interface MotionPageProps extends HTMLMotionProps<"div"> {
	children?: React.ReactNode;
}

export const MotionPage = forwardRef<HTMLDivElement, MotionPageProps>(
	({ className, children, ...props }, ref) => {
		return (
			<motion.div
				ref={ref}
				className={cn("min-h-screen", className)}
				variants={pageTransition}
				initial="initial"
				animate="animate"
				exit="exit"
				{...props}
			>
				{children}
			</motion.div>
		);
	},
);
MotionPage.displayName = "MotionPage";

// Motion modal/dialog wrapper
interface MotionModalProps extends HTMLMotionProps<"div"> {
	isOpen?: boolean;
	onClose?: () => void;
	children?: React.ReactNode;
}

export const MotionModal = forwardRef<HTMLDivElement, MotionModalProps>(
	({ className, isOpen = false, onClose, children, ...props }, ref) => {
		if (!isOpen) return null;

		return (
			<motion.div
				ref={ref}
				className={cn(
					"fixed inset-0 z-50 flex items-center justify-center",
					"bg-black/50 backdrop-blur-sm",
					className,
				)}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				onClick={onClose}
				{...props}
			>
				<motion.div
					className="glass-card rounded-xl p-6 max-w-lg w-full mx-4"
					initial={{ scale: 0.9, y: 20 }}
					animate={{ scale: 1, y: 0 }}
					exit={{ scale: 0.9, y: 20 }}
					onClick={(e) => e.stopPropagation()}
				>
					{children}
				</motion.div>
			</motion.div>
		);
	},
);
MotionModal.displayName = "MotionModal";

// Motion card with hover effects
interface MotionCardProps extends HTMLMotionProps<"div"> {
	hoverEffect?: boolean;
	children?: React.ReactNode;
}

export const MotionCard = forwardRef<HTMLDivElement, MotionCardProps>(
	({ className, hoverEffect = true, children, ...props }, ref) => {
		return (
			<motion.div
				ref={ref}
				className={cn(
					"glass-card rounded-lg p-6",
					hoverEffect && "hover-lift cursor-pointer",
					className,
				)}
				variants={hoverEffect ? hoverLift : {}}
				whileHover={hoverEffect ? "hover" : undefined}
				{...props}
			>
				{children}
			</motion.div>
		);
	},
);
MotionCard.displayName = "MotionCard";

// Motion text with gradient animation
interface MotionTextProps extends HTMLMotionProps<"div"> {
	gradient?: boolean;
	children?: React.ReactNode;
}

export const MotionText = forwardRef<HTMLDivElement, MotionTextProps>(
	({ className, gradient = false, children, ...props }, ref) => {
		return (
			<motion.div
				ref={ref}
				className={cn(gradient && "gradient-text", className)}
				variants={fadeIn}
				initial="initial"
				animate="animate"
				{...props}
			>
				{children}
			</motion.div>
		);
	},
);
MotionText.displayName = "MotionText";

// Export all components
export type {
	MotionDivProps,
	MotionListProps,
	MotionItemProps,
	MotionButtonProps,
	MotionPageProps,
	MotionModalProps,
	MotionCardProps,
	MotionTextProps,
};
