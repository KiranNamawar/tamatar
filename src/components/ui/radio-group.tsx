import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { type VariantProps, cva } from "class-variance-authority";
import { CircleIcon } from "lucide-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

const radioGroupItemVariants = cva(
	"aspect-square size-4 shrink-0 rounded-full shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50",
	{
		variants: {
			variant: {
				default: [
					"border-input text-primary dark:bg-input/30 border",
					"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
					"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
				],
				glass: [
					"backdrop-blur-md bg-white/25 dark:bg-black/25 border border-white/30 dark:border-white/15",
					"text-slate-700 dark:text-slate-200",
					"focus-visible:border-white/50 focus-visible:ring-white/20 focus-visible:ring-[3px]",
				],
				aurora: [
					"border border-purple-500/40 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10",
					"text-purple-600 dark:text-purple-300",
					"focus-visible:ring-purple-500/30 focus-visible:ring-[3px] focus-visible:border-purple-500/60",
				],
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function RadioGroup({
	className,
	...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
	return (
		<RadioGroupPrimitive.Root
			data-slot="radio-group"
			className={cn("grid gap-3", className)}
			{...props}
		/>
	);
}

export interface RadioGroupItemProps
	extends React.ComponentProps<typeof RadioGroupPrimitive.Item>,
		VariantProps<typeof radioGroupItemVariants> {}

function RadioGroupItem({ className, variant, ...props }: RadioGroupItemProps) {
	return (
		<RadioGroupPrimitive.Item
			data-slot="radio-group-item"
			className={cn(radioGroupItemVariants({ variant, className }))}
			{...props}
		>
			<RadioGroupPrimitive.Indicator
				data-slot="radio-group-indicator"
				className="relative flex items-center justify-center"
			>
				<CircleIcon className="fill-current absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
			</RadioGroupPrimitive.Indicator>
		</RadioGroupPrimitive.Item>
	);
}

export { RadioGroup, RadioGroupItem };
