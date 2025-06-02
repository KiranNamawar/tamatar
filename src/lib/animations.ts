import { type Variants } from "motion/react";

// Fade animations
export const fadeIn: Variants = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
};

export const fadeInUp: Variants = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -20 },
};

export const fadeInDown: Variants = {
	initial: { opacity: 0, y: -20 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 20 },
};

export const fadeInLeft: Variants = {
	initial: { opacity: 0, x: -20 },
	animate: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: 20 },
};

export const fadeInRight: Variants = {
	initial: { opacity: 0, x: 20 },
	animate: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: -20 },
};

// Scale animations
export const scaleIn: Variants = {
	initial: { opacity: 0, scale: 0.8 },
	animate: { opacity: 1, scale: 1 },
	exit: { opacity: 0, scale: 0.8 },
};

export const scaleUp: Variants = {
	initial: { scale: 1 },
	animate: { scale: 1.05 },
	exit: { scale: 1 },
};

// Slide animations
export const slideInLeft: Variants = {
	initial: { x: "-100%" },
	animate: { x: 0 },
	exit: { x: "-100%" },
};

export const slideInRight: Variants = {
	initial: { x: "100%" },
	animate: { x: 0 },
	exit: { x: "100%" },
};

export const slideInUp: Variants = {
	initial: { y: "100%" },
	animate: { y: 0 },
	exit: { y: "100%" },
};

export const slideInDown: Variants = {
	initial: { y: "-100%" },
	animate: { y: 0 },
	exit: { y: "-100%" },
};

// Stagger animations for lists
export const staggerContainer: Variants = {
	animate: {
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.1,
		},
	},
};

export const staggerItem: Variants = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -20 },
};

// Hover animations
export const hoverLift = {
	whileHover: { y: -2, transition: { type: "spring", stiffness: 300 } },
	whileTap: { scale: 0.98 },
};

export const hoverScale = {
	whileHover: { scale: 1.05, transition: { type: "spring", stiffness: 300 } },
	whileTap: { scale: 0.95 },
};

export const hoverGlow = {
	whileHover: {
		boxShadow: "0 0 20px rgba(112, 66, 248, 0.4)",
		transition: { duration: 0.3 },
	},
};

// Layout animations
export const layoutTransition = {
	type: "spring",
	stiffness: 300,
	damping: 30,
};

// Gesture animations
export const swipeVariants: Variants = {
	enter: (direction: number) => ({
		x: direction > 0 ? 1000 : -1000,
		opacity: 0,
	}),
	center: {
		zIndex: 1,
		x: 0,
		opacity: 1,
	},
	exit: (direction: number) => ({
		zIndex: 0,
		x: direction < 0 ? 1000 : -1000,
		opacity: 0,
	}),
};

// Page transitions
export const pageVariants: Variants = {
	initial: { opacity: 0, x: "-100vw" },
	in: { opacity: 1, x: 0 },
	out: { opacity: 0, x: "100vw" },
};

export const pageTransition: Variants = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -20 },
};

// Modal animations
export const modalVariants: Variants = {
	hidden: { opacity: 0, scale: 0.8 },
	visible: { opacity: 1, scale: 1 },
	exit: { opacity: 0, scale: 0.8 },
};

export const backdropVariants: Variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
	exit: { opacity: 0 },
};

// Card animations
export const cardHover = {
	whileHover: {
		y: -5,
		scale: 1.02,
		transition: { type: "spring", stiffness: 300, damping: 20 },
	},
	whileTap: { scale: 0.98 },
};

// Button animations
export const buttonVariants: Variants = {
	idle: { scale: 1 },
	hover: { scale: 1.05 },
	tap: { scale: 0.95 },
};

// Loading animations
export const spinVariants: Variants = {
	animate: {
		rotate: 360,
		transition: {
			duration: 1,
			repeat: Infinity,
			ease: "linear",
		},
	},
};

export const pulseVariants: Variants = {
	animate: {
		scale: [1, 1.05, 1],
		transition: {
			duration: 2,
			repeat: Infinity,
			ease: "easeInOut",
		},
	},
};

// Text animations
export const typewriterVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.05,
		},
	},
};

export const letterVariants: Variants = {
	hidden: { opacity: 0, y: 50 },
	visible: { opacity: 1, y: 0 },
};

// Common easing functions
export const easing = {
	easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
	easeOut: "cubic-bezier(0, 0, 0.2, 1)",
	easeIn: "cubic-bezier(0.4, 0, 1, 1)",
	spring: { type: "spring", stiffness: 300, damping: 30 },
	gentle: { type: "spring", stiffness: 100, damping: 15 },
	bouncy: { type: "spring", stiffness: 400, damping: 10 },
} as const;

// Common durations
export const duration = {
	fast: 0.15,
	normal: 0.3,
	slow: 0.5,
	slower: 0.8,
} as const;
