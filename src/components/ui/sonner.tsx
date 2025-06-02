"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import {
	type ExternalToast,
	Toaster as Sonner,
	type ToasterProps,
	toast as sonnerToast,
} from "sonner";

interface ToasterExtendedProps extends ToasterProps {}

const Toaster = ({ className, ...props }: ToasterExtendedProps) => {
	const { theme = "system" } = useTheme();

	return (
		<Sonner
			theme={theme as ToasterProps["theme"]}
			className={cn("toaster group", className)}
			position="bottom-right"
			toastOptions={{
				classNames: {
					toast:
						"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:rounded-lg default-toast",
					description: "group-[.toast]:text-muted-foreground",
					actionButton:
						"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
					cancelButton:
						"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
				},
			}}
			{...props}
		/>
	);
};

// Enhanced toast functions with variants using CSS classes
const createVariantToast = (variant: "glass" | "aurora") => {
	const variantClasses = {
		glass: "toast-glass",
		aurora: "toast-aurora",
	};

	return (message: string, data?: ExternalToast) => {
		return sonnerToast(message, {
			...data,
			className: cn(variantClasses[variant], data?.className),
		});
	};
};

// Create base variant functions
const glassToast = createVariantToast("glass");
const auroraToast = createVariantToast("aurora");

// Create type-specific variant functions
const createTypedVariantToast = (
	variant: "glass" | "aurora",
	type: "success" | "error" | "warning" | "info",
) => {
	const variantClasses = {
		glass: {
			success: "toast-glass-success",
			error: "toast-glass-error",
			warning: "toast-glass-warning",
			info: "toast-glass-info",
		},
		aurora: {
			success: "toast-aurora-success",
			error: "toast-aurora-error",
			warning: "toast-aurora-warning",
			info: "toast-aurora-info",
		},
	};

	return (message: string, data?: ExternalToast) => {
		const toastFn =
			type === "success"
				? sonnerToast.success
				: type === "error"
					? sonnerToast.error
					: type === "warning"
						? sonnerToast.warning
						: sonnerToast.info;

		return toastFn(message, {
			...data,
			className: cn(variantClasses[variant][type], data?.className),
		});
	};
};

// Enhanced toast object with variants
const toast = Object.assign(
	// Override the base toast functions to ensure default styling
	(message: string, data?: ExternalToast) => {
		return sonnerToast(message, {
			...data,
			style: {
				background: "hsl(var(--background))",
				color: "hsl(var(--foreground))",
				border: "1px solid hsl(var(--border))",
				...data?.style,
			},
		});
	},
	{
		...sonnerToast,
		success: (message: string, data?: ExternalToast) => {
			return sonnerToast.success(message, {
				...data,
				style: {
					background: "hsl(var(--background))",
					color: "hsl(var(--foreground))",
					border: "1px solid hsl(var(--border))",
					...data?.style,
				},
			});
		},
		error: (message: string, data?: ExternalToast) => {
			return sonnerToast.error(message, {
				...data,
				style: {
					background: "hsl(var(--background))",
					color: "hsl(var(--foreground))",
					border: "1px solid hsl(var(--border))",
					...data?.style,
				},
			});
		},
		warning: (message: string, data?: ExternalToast) => {
			return sonnerToast.warning(message, {
				...data,
				style: {
					background: "hsl(var(--background))",
					color: "hsl(var(--foreground))",
					border: "1px solid hsl(var(--border))",
					...data?.style,
				},
			});
		},
		info: (message: string, data?: ExternalToast) => {
			return sonnerToast.info(message, {
				...data,
				style: {
					background: "hsl(var(--background))",
					color: "hsl(var(--foreground))",
					border: "1px solid hsl(var(--border))",
					...data?.style,
				},
			});
		},
		glass: Object.assign(glassToast, {
			success: createTypedVariantToast("glass", "success"),
			error: createTypedVariantToast("glass", "error"),
			warning: createTypedVariantToast("glass", "warning"),
			info: createTypedVariantToast("glass", "info"),
		}),
		aurora: Object.assign(auroraToast, {
			success: createTypedVariantToast("aurora", "success"),
			error: createTypedVariantToast("aurora", "error"),
			warning: createTypedVariantToast("aurora", "warning"),
			info: createTypedVariantToast("aurora", "info"),
		}),
	},
) as typeof sonnerToast & {
	glass: typeof glassToast & {
		success: (message: string, data?: ExternalToast) => string | number;
		error: (message: string, data?: ExternalToast) => string | number;
		warning: (message: string, data?: ExternalToast) => string | number;
		info: (message: string, data?: ExternalToast) => string | number;
	};
	aurora: typeof auroraToast & {
		success: (message: string, data?: ExternalToast) => string | number;
		error: (message: string, data?: ExternalToast) => string | number;
		warning: (message: string, data?: ExternalToast) => string | number;
		info: (message: string, data?: ExternalToast) => string | number;
	};
};

export { Toaster, toast };
