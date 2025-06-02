"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { type VariantProps, cva } from "class-variance-authority";
import { CheckIcon } from "lucide-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

const checkboxVariants = cva(
	"peer size-4 shrink-0 rounded-[4px] shadow-xs transition-shadow outline-none disabled:cursor-not-allowed disabled:opacity-50",
	{
		variants: {
			variant: {
				default: [
					"border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
					"dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary border",
					"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
					"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
				],
				glass: [
					"backdrop-blur-md bg-white/25 dark:bg-black/25 border border-white/30 dark:border-white/15",
					"data-[state=checked]:bg-white/40 dark:data-[state=checked]:bg-black/40",
					"data-[state=checked]:border-white/50 dark:data-[state=checked]:border-white/30",
					"focus-visible:border-white/50 focus-visible:ring-white/20 focus-visible:ring-[3px]",
					"text-slate-700 dark:text-slate-200",
				],
				aurora: [
					"border border-purple-500/40 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10",
					"data-[state=checked]:from-purple-500/30 data-[state=checked]:via-pink-500/30 data-[state=checked]:to-cyan-500/30",
					"data-[state=checked]:border-purple-500/60 text-foreground dark:text-white",
					"focus-visible:ring-purple-500/30 focus-visible:ring-[3px] focus-visible:border-purple-500/60",
				],
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface CheckboxProps
	extends React.ComponentProps<typeof CheckboxPrimitive.Root>,
		VariantProps<typeof checkboxVariants> {}

function Checkbox({ className, variant, ...props }: CheckboxProps) {
	return (
		<CheckboxPrimitive.Root
			data-slot="checkbox"
			className={cn(checkboxVariants({ variant, className }))}
			{...props}
		>
			<CheckboxPrimitive.Indicator
				data-slot="checkbox-indicator"
				className="flex items-center justify-center text-current transition-none"
			>
				<CheckIcon className="size-3.5" />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	);
}

export { Checkbox };
