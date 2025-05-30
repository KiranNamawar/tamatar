import {
	type AnimationTiming,
	type AnimationVariant,
	scrollAnimationVariants,
} from "@/hooks/useAnimations";
import { type GlassVariant, getGlassEffect } from "@/lib/ui-patterns";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { MotionProps } from "motion/react";
import * as React from "react";

/**
 * Props for the GlassCard component
 */
type BaseGlassCardProps = {
	/** Child elements to render inside the card */
	children: React.ReactNode;
	/** Glass effect variant to apply */
	variant?: GlassVariant;
	/** Enable animation */
	animated?: boolean;
	/** Enable hover effects */
	hover?: boolean;
	/** Animation variant when animated=true */
	animationVariant?: AnimationVariant;
	/** Animation timing preset */
	animationTiming?: AnimationTiming;
	/** Add a subtle border glow effect */
	glow?: boolean;
	/** Custom padding preset */
	padding?: "none" | "sm" | "md" | "lg" | "xl";
	/** Custom animation props to override defaults */
	animationProps?: MotionProps;
	/** Additional CSS class names */
	className?: string;
};

// Combine with HTML attributes but allow any value to avoid conflicts
interface GlassCardProps extends BaseGlassCardProps {
	[key: string]: any;
}

/**
 * Padding presets for different card sizes
 */

/**
 * Padding presets for different card sizes
 */
const paddingPresets = {
	none: "",
	sm: "p-4",
	md: "p-6",
	lg: "p-8",
	xl: "p-10",
};

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
	(
		{
			className,
			variant = "medium",
			children,
			animated = false,
			hover = false,
			animationVariant = "fadeInUp",
			animationTiming = "medium",
			glow = false,
			padding = "none",
			animationProps,
			...props
		},
		ref,
	) => {
		// Build the CSS classes
		const glassClasses = cn(
			getGlassEffect(variant),
			paddingPresets[padding as keyof typeof paddingPresets],
			glow && "shadow-[0_0_15px_rgba(255,255,255,0.15)]",
			className,
		);

		// Build animation properties
		const selectedVariant =
			scrollAnimationVariants[
				animationVariant as keyof typeof scrollAnimationVariants
			];

		const motionProps: MotionProps = animated
			? {
					initial: selectedVariant.initial,
					whileInView: selectedVariant.animate,
					viewport: { once: true, margin: "-50px" },
					transition: {
						duration:
							animationTiming === "fast"
								? 0.3
								: animationTiming === "medium"
									? 0.6
									: animationTiming === "slow"
										? 1
										: 0.6,
						ease: "easeOut",
					},
					...animationProps,
				}
			: {};

		// Add hover effects if enabled
		if (hover) {
			motionProps.whileHover = { y: -5, scale: 1.01 };
			motionProps.transition = { duration: 0.2 };
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
			className: glassClasses,
			...safeProps,
		};

		// Create motion-specific props
		const finalMotionProps = {
			...motionProps,
			// Add motion-specific event handlers if provided
			...(onDrag && { onDrag }),
			...(onDragStart && { onDragStart }),
			...(onDragEnd && { onDragEnd }),
			...(onAnimationStart && { onAnimationStart }),
			...(onAnimationComplete && { onAnimationComplete }),
		};

		return (
			<motion.div {...elementProps} {...finalMotionProps}>
				{children}
			</motion.div>
		);
	},
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
export type { GlassCardProps };
