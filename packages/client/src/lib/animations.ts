import type { Variants } from "motion/react";

// Animation presets for common use cases
export const fadeInUpVariants: Variants = {
	initial: { opacity: 0, y: 40 },
	animate: { opacity: 1, y: 0 },
};

export const fadeInDownVariants: Variants = {
	initial: { opacity: 0, y: -40 },
	animate: { opacity: 1, y: 0 },
};

export const scaleInVariants: Variants = {
	initial: { opacity: 0, scale: 0.8 },
	animate: { opacity: 1, scale: 1 },
};

export const slideInLeftVariants: Variants = {
	initial: { opacity: 0, x: -40 },
	animate: { opacity: 1, x: 0 },
};

export const slideInRightVariants: Variants = {
	initial: { opacity: 0, x: 40 },
	animate: { opacity: 1, x: 0 },
};

// Common animation configurations
export const commonViewportProps = {
	once: true,
	margin: "-100px",
};

export const commonTransitions = {
	fast: { duration: 0.3, ease: "easeOut" },
	medium: { duration: 0.6, ease: "easeOut" },
	slow: { duration: 1.0, ease: "easeOut" },
	spring: { type: "spring", stiffness: 100, damping: 15 },
};

// Stagger animation configs
export const staggerConfig = {
	container: {
		initial: {},
		animate: {
			transition: {
				staggerChildren: 0.1,
			},
		},
	},
	item: fadeInUpVariants,
};

// Animation hook for consistent usage
export function useStandardAnimation(
	variant: keyof typeof commonTransitions = "medium",
) {
	return {
		initial: "initial",
		whileInView: "animate",
		viewport: commonViewportProps,
		transition: commonTransitions[variant],
	};
}
