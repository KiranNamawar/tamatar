/**
 * Styling Utilities
 *
 * This file contains utility functions for styling components in Tamatar.
 * It supplements the main `utils.ts` file with style-specific functions.
 */

import type { ClassValue } from "clsx";
import { cn } from "./utils";

/**
 * Returns appropriate text color based on background color
 * Useful for creating accessible text on colored backgrounds
 */
export function getTextColorForBackground(bgColorClass: string): string {
	// Map of background colors to appropriate text colors
	const colorMap: Record<string, string> = {
		"bg-primary": "text-primary-foreground",
		"bg-secondary": "text-secondary-foreground",
		"bg-muted": "text-muted-foreground",
		"bg-accent": "text-accent-foreground",
		"bg-destructive": "text-destructive-foreground",
		"bg-success": "text-success-foreground",
		"bg-warning": "text-warning-foreground",
		"bg-info": "text-info-foreground",
	};

	return colorMap[bgColorClass] || "text-foreground";
}

/**
 * Creates responsive class variations
 * @param baseClasses - Base classes to apply at all breakpoints
 * @param responsiveClasses - Classes to apply at specific breakpoints
 */
export function responsive(
	baseClasses: ClassValue,
	responsiveClasses?: {
		sm?: ClassValue;
		md?: ClassValue;
		lg?: ClassValue;
		xl?: ClassValue;
		"2xl"?: ClassValue;
	},
): string {
	if (!responsiveClasses) return cn(baseClasses);

	return cn(
		baseClasses,
		responsiveClasses.sm && `sm:${responsiveClasses.sm}`,
		responsiveClasses.md && `md:${responsiveClasses.md}`,
		responsiveClasses.lg && `lg:${responsiveClasses.lg}`,
		responsiveClasses.xl && `xl:${responsiveClasses.xl}`,
		responsiveClasses["2xl"] && `2xl:${responsiveClasses["2xl"]}`,
	);
}

/**
 * Variant styles for common UI patterns
 */
export const variants = {
	// Card variants
	card: {
		default: "bg-card text-card-foreground shadow-sm",
		outline: "border border-border bg-transparent",
		ghost: "bg-transparent shadow-none",
	},

	// Text size variants
	text: {
		h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
		h2: "scroll-m-20 text-3xl font-semibold tracking-tight",
		h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
		h4: "scroll-m-20 text-xl font-semibold tracking-tight",
		p: "leading-7",
		blockquote: "border-l-2 border-border pl-6 italic",
		subtle: "text-sm text-muted-foreground",
	},
};

/**
 * Status color mappings
 */
export const statusColors = {
	success: "bg-success text-success-foreground",
	error: "bg-destructive text-destructive-foreground",
	warning: "bg-warning text-warning-foreground",
	info: "bg-info text-info-foreground",
	default: "bg-secondary text-secondary-foreground",
};
