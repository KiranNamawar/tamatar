import { cn } from "@/lib/utils";

/**
 * UI Pattern Library
 *
 * This file contains common UI patterns, effects, and utilities that are used
 * throughout the application. It helps maintain consistency in design and reduces
 * duplication of styling code.
 *
 * The patterns include:
 * - Glassmorphic effects
 * - Gradient utilities
 * - Animation variants
 * - Component variants
 * - Floating UI elements
 */

/**
 * Glassmorphic effect variants
 * These provide a consistent backdrop-blur glass effect across components
 */
export const glassVariants = {
	light:
		"bg-white/90 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg",
	medium:
		"bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-xl",
	dark: "bg-gray-900/90 backdrop-blur-md border border-gray-700/20 rounded-2xl shadow-lg",
	subtle:
		"bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-lg",
	card: "bg-white/90 dark:bg-gray-900/90 border border-gray-200/30 dark:border-gray-700/30 shadow-xl backdrop-blur-lg rounded-2xl",
} as const;

export type GlassVariant = keyof typeof glassVariants;

/**
 * Returns the CSS classes for a glassmorphic effect based on the variant
 *
 * @param variant - The glass effect variant to use
 * @param className - Additional CSS classes to merge
 * @returns Combined CSS classes for the glass effect
 *
 * @example
 * ```tsx
 * <div className={getGlassEffect("medium")}>
 *   This has a medium glass effect
 * </div>
 * ```
 */
export function getGlassEffect(
	variant: GlassVariant = "medium",
	className?: string,
) {
	return cn(glassVariants[variant], className);
}

/**
 * Common gradient patterns used throughout the application
 */
export const gradientPatterns = {
	primary: "bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600",
	secondary: "bg-gradient-to-r from-orange-500 to-yellow-500",
	accent: "bg-gradient-to-r from-pink-500 to-indigo-500",
	background:
		"bg-gradient-to-br from-orange-200 via-yellow-100 to-pink-100 dark:bg-gradient-to-br dark:from-[#23243a] dark:via-[#181c24] dark:to-[#1a2a33]",
	conic: "bg-gradient-conic from-cyan-500 via-transparent to-transparent",
	// Tamatar Brand Gradients
	tamatar: "bg-gradient-to-r from-red-500 via-orange-500 to-orange-600",
	tamatarAuth: "bg-gradient-to-r from-red-500 via-orange-500 to-green-600",
	tamatarSelection: "bg-gradient-to-r from-red-500 to-orange-500",
	tamatarAccent: "bg-gradient-to-r from-red-500 to-pink-500",
} as const;

export type GradientPattern = keyof typeof gradientPatterns;

/**
 * Returns CSS classes for a specific gradient pattern
 *
 * @param pattern - The gradient pattern to use
 * @param className - Additional CSS classes to merge
 * @returns Combined CSS classes for the gradient effect
 *
 * @example
 * ```tsx
 * <div className={getGradient("primary")}>
 *   This has a primary gradient background
 * </div>
 * ```
 */
export function getGradient(pattern: GradientPattern, className?: string) {
	return cn(gradientPatterns[pattern], className);
}

/**
 * Tamatar brand gradient utilities with hover states
 * These are specialized for the Tamatar brand colors and include
 * default, hover, and text variants for each gradient type
 */
export const tamatarGradients = {
	// Main brand gradient with hover effect for buttons
	primary: {
		default: "bg-gradient-to-r from-red-500 via-orange-500 to-orange-600",
		hover: "hover:from-orange-600 hover:to-red-500",
		text: "bg-gradient-to-r from-red-500 via-orange-500 to-orange-600 bg-clip-text text-transparent",
	},
	// Auth form variant with green accent
	auth: {
		default: "bg-gradient-to-r from-red-500 via-orange-500 to-green-600",
		hover: "hover:from-green-600 hover:to-red-500",
		text: "bg-gradient-to-r from-red-500 via-orange-500 to-green-600 bg-clip-text text-transparent",
	},
	// Selection/active state variant
	selection: {
		default: "bg-gradient-to-r from-red-500 to-orange-500",
		hover: "hover:from-orange-500 hover:to-red-500",
		text: "bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent",
	},
	// Accent variant with pink
	accent: {
		default: "bg-gradient-to-r from-red-500 to-pink-500",
		hover: "hover:from-pink-500 hover:to-red-500",
		text: "bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent",
	},
} as const;

export type TamatarGradientType = keyof typeof tamatarGradients;
export type TamatarGradientStyle = keyof typeof tamatarGradients.primary;

/**
 * Returns CSS classes for Tamatar brand gradients
 *
 * @param type - The gradient type (primary, auth, selection, accent)
 * @param style - The style variant (default, hover, text)
 * @param className - Additional CSS classes to merge
 * @returns Combined CSS classes for the Tamatar gradient
 *
 * @example
 * ```tsx
 * <div className={getTamatarGradient("primary", "text")}>
 *   This text has a primary Tamatar gradient
 * </div>
 * ```
 */
export function getTamatarGradient(
	type: TamatarGradientType = "primary",
	style: TamatarGradientStyle = "default",
	className?: string,
) {
	return cn(tamatarGradients[type][style], className);
}

/**
 * Creates button classes with Tamatar brand gradients
 * This includes hover effects and appropriate text styling
 *
 * @param type - The gradient type to use
 * @param className - Additional CSS classes to merge
 * @returns Combined CSS classes for a Tamatar gradient button
 *
 * @example
 * ```tsx
 * <button className={createTamatarButtonClass("accent")}>
 *   Click Me
 * </button>
 * ```
 */
export function createTamatarButtonClass(
	type: TamatarGradientType = "primary",
	className?: string,
) {
	const gradient = tamatarGradients[type];
	return cn(
		gradient.default,
		gradient.hover,
		"text-white font-bold transition-all duration-300",
		className,
	);
}

/**
 * Floating animation utilities
 * Used with the FloatingBackground component
 */
/**
 * Interface for floating items used in the FloatingBackground component
 */
export interface FloatingItem {
	/** CSS class for positioning the item (should include 'absolute', 'top-X', etc.) */
	className: string;
	/** React element to render (usually an icon) */
	icon: React.ReactNode;
	delay: string;
	key: string;
}

export function createFloatingItem(
	position: string,
	icon: React.ReactNode,
	delay: string,
	key: string,
): FloatingItem {
	return {
		className: position,
		icon,
		delay,
		key,
	};
}

// Common card styles
export const cardStyles = {
	default:
		"rounded-2xl border bg-card text-card-foreground shadow-lg backdrop-blur-sm",
	glass:
		"rounded-2xl backdrop-blur-lg bg-white/60 dark:bg-gray-800/60 border border-white/20 dark:border-gray-700/30 p-6 shadow-xl hover:scale-105 transition-all duration-300",
	floating:
		"rounded-2xl backdrop-blur-md bg-white/40 dark:bg-gray-800/40 border border-white/20 dark:border-gray-700/30 shadow-lg hidden md:block p-3 hover:scale-110 transition-transform duration-300 opacity-30",
} as const;

export type CardStyle = keyof typeof cardStyles;

export function getCardStyle(style: CardStyle = "default", className?: string) {
	return cn(cardStyles[style], className);
}
