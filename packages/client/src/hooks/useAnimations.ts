// Animation hooks with force-enabled animations
import { useRef } from "react";

/**
 * Predefined animation variants for various scroll and interaction effects.
 * These can be used with Framer Motion's variants system for consistent animations.
 */
export const scrollAnimationVariants = {
	fadeInUp: {
		initial: { opacity: 0, y: 60 },
		animate: { opacity: 1, y: 0 },
	},
	fadeInDown: {
		initial: { opacity: 0, y: -60 },
		animate: { opacity: 1, y: 0 },
	},
	fadeInLeft: {
		initial: { opacity: 0, x: -60 },
		animate: { opacity: 1, x: 0 },
	},
	fadeInRight: {
		initial: { opacity: 0, x: 60 },
		animate: { opacity: 1, x: 0 },
	},
	scaleIn: {
		initial: { opacity: 0, scale: 0.8 },
		animate: { opacity: 1, scale: 1 },
	},
	slideUp: {
		initial: { opacity: 0, y: 100 },
		animate: { opacity: 1, y: 0 },
	},
} as const;

export type AnimationVariant = keyof typeof scrollAnimationVariants;

/**
 * Predefined timing presets for animations.
 * These provide consistent timing and easing across the application.
 */
export const animationTimings = {
	fast: { duration: 0.01, ease: "easeOut" }, // Almost instant
	medium: { duration: 0.01, ease: "easeOut" }, // Almost instant
	slow: { duration: 0.01, ease: "easeOut" }, // Almost instant
	spring: { type: "spring", stiffness: 500, damping: 50 }, // Very fast spring
	bounce: { type: "spring", stiffness: 500, damping: 50 }, // Very fast spring
	smooth: { duration: 0.01, ease: [0, 0, 1, 1] }, // Almost instant
} as const;

export type AnimationTiming = keyof typeof animationTimings;

/**
 * Hook for creating scroll-triggered animations.
 *
 * @param variant - The animation variant to use from predefined options
 * @param timing - The timing preset to use
 * @param threshold - The amount of the element that needs to be visible (0-1)
 * @returns Animation properties that can be spread into a motion component
 *
 * @example
 * ```tsx
 * const titleAnimation = useScrollAnimation("fadeInUp", "medium");
 * return <motion.h2 {...titleAnimation}>Hello World</motion.h2>;
 * ```
 */
export function useScrollAnimation(
	variant: AnimationVariant = "fadeInUp",
	timing: AnimationTiming = "medium",
) {
	const ref = useRef(null);
	// Force isInView to always be true so animations complete immediately
	const isInView = true;

	const animationVariant = scrollAnimationVariants[variant];
	const animationTiming = animationTimings[timing];

	const animationProps = {
		ref,
		initial: animationVariant.initial,
		animate: isInView ? animationVariant.animate : animationVariant.initial,
		transition: {
			...animationTiming,
		},
	};

	return {
		ref,
		isInView,
		animationProps,
	};
}

/**
 * Hook for creating staggered animations where children animate sequentially.
 * Perfect for lists, grids, and other collections of elements.
 *
 * @param variant - The animation variant to use for child elements
 * @param timing - The timing preset to use for individual animations
 * @param staggerDelay - The delay between each child animation (in seconds)
 * @param threshold - The amount of the container that needs to be visible (0-1)
 * @returns Container and item animation props to be used with motion components
 *
 * @example
 * ```tsx
 * const { containerProps, itemProps } = useStaggeredAnimation();
 * return (
 *   <motion.ul {...containerProps}>
 *     {items.map(item => (
 *       <motion.li key={item.id} {...itemProps}>
 *         {item.content}
 *       </motion.li>
 *     ))}
 *   </motion.ul>
 * );
 * ```
 */
export function useStaggeredAnimation(
	variant: AnimationVariant = "fadeInUp",
	timing: AnimationTiming = "medium",
	staggerDelay = 0.1,
) {
	const containerRef = useRef(null);
	// Force isInView to always be true so animations complete immediately
	const isInView = true;

	const animationVariant = scrollAnimationVariants[variant];
	const animationTiming = animationTimings[timing];

	const containerProps = {
		ref: containerRef,
		initial: "initial",
		animate: isInView ? "animate" : "initial",
		variants: {
			initial: {},
			animate: {
				transition: {
					staggerChildren: staggerDelay,
				},
			},
		},
	};

	const itemProps = {
		variants: {
			initial: animationVariant.initial,
			animate: {
				...animationVariant.animate,
				transition: animationTiming,
			},
		},
	};

	return {
		containerRef,
		isInView,
		containerProps,
		itemProps,
	};
}

/**
 * Hook for creating hover and tap animations for interactive elements.
 *
 * @param scale - The scale factor on hover (1.05 = 5% larger)
 * @param duration - The duration of the hover animation
 * @param options - Additional options for customizing the animations
 * @returns Animation props for hover and tap states
 *
 * @example
 * ```tsx
 * const hoverAnimation = useHoverAnimation();
 * return <motion.button {...hoverAnimation}>Click me</motion.button>;
 * ```
 */
export function useHoverAnimation(
	scale = 1.05,
	duration = 0.2,
	options?: {
		hoverY?: number;
		shadow?: boolean;
		rotate?: number;
	},
) {
	return {
		whileHover: {
			scale,
			y: options?.hoverY ?? 0,
			rotate: options?.rotate ?? 0,
			boxShadow: options?.shadow ? "0px 10px 20px rgba(0,0,0,0.15)" : undefined,
			transition: { duration, ease: "easeOut" },
		},
		whileTap: {
			scale: scale * 0.95,
			transition: { duration: 0.1 },
		},
	};
}

/**
 * Creates a sequence of animations where each element animates one after another.
 * Useful for creating complex animation sequences that unfold in order.
 *
 * @param baseDelay - Initial delay before the sequence starts
 * @param stepDelay - Delay between each step in the sequence
 * @param defaultVariant - Default animation variant for steps
 * @param defaultTiming - Default animation timing for steps
 * @returns A utility for creating sequenced animations
 *
 * @example
 * ```tsx
 * const sequence = createAnimationSequence();
 *
 * return (
 *   <div>
 *     <motion.h1 {...sequence.next()}>Title</motion.h1>
 *     <motion.p {...sequence.next("fadeInLeft")}>First paragraph</motion.p>
 *     <motion.button {...sequence.next("scaleIn", "bounce")}>Click me</motion.button>
 *   </div>
 * );
 * ```
 */
export function createAnimationSequence(
	baseDelay = 0.1,
	stepDelay = 0.2,
	defaultVariant: AnimationVariant = "fadeInUp",
	defaultTiming: AnimationTiming = "medium",
) {
	let currentDelay = baseDelay;

	return {
		/**
		 * Returns animation props for the next element in the sequence
		 */
		next: (variant?: AnimationVariant, timing?: AnimationTiming) => {
			const animationVariant =
				scrollAnimationVariants[variant || defaultVariant];
			const animationTiming = animationTimings[timing || defaultTiming];

			const props = {
				initial: animationVariant.initial,
				animate: animationVariant.animate,
				transition: {
					...animationTiming,
					delay: currentDelay,
				},
			};

			currentDelay += stepDelay;
			return props;
		},

		/**
		 * Resets the sequence to the base delay
		 */
		reset: () => {
			currentDelay = baseDelay;
		},
	};
}
