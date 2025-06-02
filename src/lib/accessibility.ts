/**
 * Accessibility testing utilities for Tamatar UI
 */

export interface AccessibilityTestResult {
	passed: boolean;
	message: string;
	severity: "error" | "warning" | "info";
	element?: Element;
}

export interface ColorContrastResult {
	ratio: number;
	passed: boolean;
	level: "AA" | "AAA" | "fail";
}

/**
 * Test color contrast ratio between foreground and background colors
 */
export function testColorContrast(
	foreground: string,
	background: string,
	fontSize = 16,
): ColorContrastResult {
	const luminance1 = getRelativeLuminance(foreground);
	const luminance2 = getRelativeLuminance(background);

	const lighter = Math.max(luminance1, luminance2);
	const darker = Math.min(luminance1, luminance2);

	const ratio = (lighter + 0.05) / (darker + 0.05);

	// WCAG 2.1 requirements
	const isLargeText = fontSize >= 18 || fontSize >= 14;
	const aaThreshold = isLargeText ? 3 : 4.5;
	const aaaThreshold = isLargeText ? 4.5 : 7;

	let level: "AA" | "AAA" | "fail";
	if (ratio >= aaaThreshold) {
		level = "AAA";
	} else if (ratio >= aaThreshold) {
		level = "AA";
	} else {
		level = "fail";
	}

	return {
		ratio: Math.round(ratio * 100) / 100,
		passed: ratio >= aaThreshold,
		level,
	};
}

/**
 * Calculate relative luminance of a color
 */
function getRelativeLuminance(color: string): number {
	const rgb = hexToRgb(color);
	if (!rgb) return 0;

	const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((c) => {
		c = c / 255;
		return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
	});

	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				r: Number.parseInt(result[1], 16),
				g: Number.parseInt(result[2], 16),
				b: Number.parseInt(result[3], 16),
			}
		: null;
}

/**
 * Test keyboard navigation functionality
 */
export function testKeyboardNavigation(
	container: Element,
): AccessibilityTestResult[] {
	const results: AccessibilityTestResult[] = [];

	const focusableElements = container.querySelectorAll(
		'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
	);

	if (focusableElements.length === 0) {
		return [
			{
				passed: true,
				message: "No focusable elements found",
				severity: "info",
			},
		];
	}

	focusableElements.forEach((element) => {
		const tabIndex = element.getAttribute("tabindex");
		if (tabIndex && Number.parseInt(tabIndex) > 0) {
			results.push({
				passed: false,
				message:
					"Avoid positive tabindex values for better keyboard navigation",
				severity: "warning",
				element,
			});
		}
	});

	return results;
}

/**
 * Test ARIA attributes
 */
export function testAriaAttributes(
	element: Element,
): AccessibilityTestResult[] {
	const results: AccessibilityTestResult[] = [];

	const interactiveElements = ["button", "input", "select", "textarea", "a"];
	if (interactiveElements.includes(element.tagName.toLowerCase())) {
		const hasLabel =
			element.hasAttribute("aria-label") ||
			element.hasAttribute("aria-labelledby") ||
			element.textContent?.trim();

		if (!hasLabel) {
			results.push({
				passed: false,
				message: "Interactive element missing accessible label",
				severity: "error",
				element,
			});
		}
	}

	return results;
}

/**
 * Generate accessibility report
 */
export function generateAccessibilityReport(element: Element): {
	summary: {
		total: number;
		passed: number;
		failed: number;
		warnings: number;
	};
	results: AccessibilityTestResult[];
} {
	const results = [
		...testAriaAttributes(element),
		...testKeyboardNavigation(element),
	];

	const summary = {
		total: results.length,
		passed: results.filter((r) => r.passed).length,
		failed: results.filter((r) => !r.passed && r.severity === "error").length,
		warnings: results.filter((r) => !r.passed && r.severity === "warning")
			.length,
	};

	return { summary, results };
}

/**
 * Live announcement for screen readers
 */
export function announceToScreenReader(
	message: string,
	priority: "polite" | "assertive" = "polite",
): void {
	const announcement = document.createElement("div");
	announcement.setAttribute("aria-live", priority);
	announcement.setAttribute("aria-atomic", "true");
	announcement.className = "sr-only";
	announcement.textContent = message;

	document.body.appendChild(announcement);

	setTimeout(() => {
		if (document.body.contains(announcement)) {
			document.body.removeChild(announcement);
		}
	}, 1000);
}

/**
 * Check for reduced motion preference
 */
export function prefersReducedMotion(): boolean {
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Focus management utilities
 */
export const focusUtils = {
	getFocusableElements(container: Element): Element[] {
		return Array.from(
			container.querySelectorAll(
				'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
			),
		);
	},

	focusFirst(container: Element): boolean {
		const elements = this.getFocusableElements(container);
		if (elements.length > 0) {
			(elements[0] as HTMLElement).focus();
			return true;
		}
		return false;
	},

	focusLast(container: Element): boolean {
		const elements = this.getFocusableElements(container);
		if (elements.length > 0) {
			(elements[elements.length - 1] as HTMLElement).focus();
			return true;
		}
		return false;
	},
};
