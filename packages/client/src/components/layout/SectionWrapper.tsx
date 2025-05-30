import {
	type TamatarGradientType,
	getTamatarGradient,
} from "@/lib/ui-patterns";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { MotionProps } from "motion/react";

/**
 * A section wrapper component that provides consistent styling and animation.
 *
 * Features:
 * - Configurable HTML element type (section, div, article, main, aside)
 * - Optional animation with configurable variants and timing
 * - Standard padding presets
 * - Gradient background options using Tamatar design system
 * - Full-height mode for hero sections
 *
 * @example
 * ```tsx
 * // Simple usage
 * <SectionWrapper>
 *   <h1>My Section</h1>
 * </SectionWrapper>
 *
 * // With animation and styling
 * <SectionWrapper
 *   animated
 *   variant="fadeInUp"
 *   gradient="primary"
 *   standardPadding="lg"
 * >
 *   <h1>Animated Section</h1>
 * </SectionWrapper>
 *
 * // With custom element type
 * <SectionWrapper as="aside" className="my-sidebar">
 *   Sidebar content
 * </SectionWrapper>
 * ```
 */

// Define allowed element types
type SectionElement = "section" | "div" | "article" | "main" | "aside";

// Define animation variants
type AnimationVariantType =
	| "fadeInUp"
	| "fadeInDown"
	| "scaleIn"
	| "slideInLeft"
	| "slideInRight";

// Common properties for all element types
type CommonProps = {
	children: React.ReactNode;
	className?: string;
	/** Enable animation for this section */
	animated?: boolean;
	/** Apply one of the predefined tamatar gradient backgrounds */
	gradient?: TamatarGradientType | "none";
	/** Add standard padding to section (overrides custom padding classes) */
	standardPadding?: boolean | "sm" | "md" | "lg" | "xl";
	/** Animation variant to use when animated=true */
	variant?: AnimationVariantType;
	/** Delay before animation starts (in seconds) */
	delay?: number;
	/** Duration of the animation (in seconds) */
	duration?: number;
	/** Use full viewport height */
	fullHeight?: boolean;
	/** HTML tag to use for the section (defaults to "section") */
	as?: SectionElement;
};

// Type for motion animation props
type MotionAnimationProps = MotionProps;

// Properly handle all possible HTML attributes based on the element type
type SectionWrapperProps = CommonProps & {
	// Custom animation props that override defaults
	animationProps?: MotionAnimationProps;

	// Allow any other props but exclude known conflicts
	[key: string]: any;
};

const animationVariants = {
	fadeInUp: {
		initial: { opacity: 0, y: 40 },
		whileInView: { opacity: 1, y: 0 },
	},
	fadeInDown: {
		initial: { opacity: 0, y: -40 },
		whileInView: { opacity: 1, y: 0 },
	},
	scaleIn: {
		initial: { opacity: 0, scale: 0.8 },
		whileInView: { opacity: 1, scale: 1 },
	},
	slideInLeft: {
		initial: { opacity: 0, x: -40 },
		whileInView: { opacity: 1, x: 0 },
	},
	slideInRight: {
		initial: { opacity: 0, x: 40 },
		whileInView: { opacity: 1, x: 0 },
	},
};

export default function SectionWrapper({
	children,
	className = "",
	animated = false,
	variant = "fadeInUp",
	delay = 0,
	duration = 0.8,
	gradient = "none",
	standardPadding,
	fullHeight = false,
	animationProps = {},
	as = "section",
	...restProps
}: SectionWrapperProps) {
	// Generate padding classes based on standardPadding prop
	let paddingClasses = "";
	if (standardPadding) {
		if (standardPadding === true || standardPadding === "md") {
			paddingClasses = "py-16 px-6 sm:px-8 md:py-24 md:px-10";
		} else if (standardPadding === "sm") {
			paddingClasses = "py-8 px-4 sm:px-6 md:py-12 md:px-8";
		} else if (standardPadding === "lg") {
			paddingClasses = "py-20 px-6 sm:px-8 md:py-32 md:px-12";
		} else if (standardPadding === "xl") {
			paddingClasses = "py-24 px-8 sm:px-10 md:py-40 md:px-16";
		}
	}

	// Generate gradient classes
	const gradientClasses =
		gradient !== "none" ? getTamatarGradient(gradient, "default") : "";

	// Combine all classes
	const wrapperClassName = cn(
		"relative w-full",
		paddingClasses,
		gradientClasses,
		fullHeight && "min-h-screen",
		className,
	);

	// Create animation props based on variant
	const selectedVariant = animated ? animationVariants[variant] : {}; // Disable all animations by forcing initial state to be final state
	const motionProps = animated
		? {
				initial: { opacity: 1, y: 0, scale: 1 },
				animate: { opacity: 1, y: 0, scale: 1 },
				transition: {
					duration: 0.01, // Almost instant animation
					delay: 0, // No delay
				},
				...animationProps,
			}
		: {};

	// Extract props that could conflict between React and Motion
	const {
		// List events that have different signatures between React and Motion
		onDrag,
		onDragStart,
		onDragEnd,
		onAnimationStart,
		onAnimationComplete,
		...safeRestProps
	} = restProps;

	// Shared props for all element types
	const elementProps = {
		className: wrapperClassName,
		...safeRestProps,
		// We'll keep children separate for clarity
	};

	// If we're using motion elements, add motion-specific handlers
	const motionElementProps = animated
		? {
				...elementProps,
				...motionProps,
				// Add motion-specific event handlers if provided
				...(onDrag && { onDrag }),
				...(onDragStart && { onDragStart }),
				...(onDragEnd && { onDragEnd }),
				...(onAnimationStart && { onAnimationStart }),
				...(onAnimationComplete && { onAnimationComplete }),
			}
		: elementProps;
	// Create the appropriate element based on animation state
	if (animated) {
		// Dynamic runtime selection of the motion component based on 'as' prop
		switch (as) {
			case "div":
				return <motion.div {...motionElementProps}>{children}</motion.div>;
			case "article":
				return (
					<motion.article {...motionElementProps}>{children}</motion.article>
				);
			case "main":
				return <motion.main {...motionElementProps}>{children}</motion.main>;
			case "aside":
				return <motion.aside {...motionElementProps}>{children}</motion.aside>;
			default:
				return (
					<motion.section {...motionElementProps}>{children}</motion.section>
				);
		}
	}
	// Static elements (non-animated)
	switch (as) {
		case "div":
			return <div {...elementProps}>{children}</div>;
		case "article":
			return <article {...elementProps}>{children}</article>;
		case "main":
			return <main {...elementProps}>{children}</main>;
		case "aside":
			return <aside {...elementProps}>{children}</aside>;
		default:
			return <section {...elementProps}>{children}</section>;
	}
}
