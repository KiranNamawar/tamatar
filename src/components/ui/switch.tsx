import * as SwitchPrimitive from "@radix-ui/react-switch";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const switchVariants = cva(
	"peer focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-5 w-9 shrink-0 items-center rounded-full border border-transparent shadow-sm transition-all duration-200 outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
	{
		variants: {
			variant: {
				default: [
					"data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted",
					"dark:data-[state=checked]:bg-primary dark:data-[state=unchecked]:bg-muted",
				],
				glass: [
					"backdrop-blur-md border-white/30 dark:border-white/15 shadow-lg",
					"data-[state=checked]:bg-white/40 dark:data-[state=checked]:bg-black/40",
					"data-[state=checked]:border-white/50 dark:data-[state=checked]:border-white/35",
					"data-[state=unchecked]:bg-white/20 dark:data-[state=unchecked]:bg-black/20",
					"data-[state=unchecked]:border-white/30 dark:data-[state=unchecked]:border-white/15",
				],
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

const switchThumbVariants = cva(
	"pointer-events-none block size-4 rounded-full ring-0 transition-transform duration-200 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
	{
		variants: {
			variant: {
				default:
					"bg-background shadow-sm data-[state=checked]:bg-primary-foreground",
				glass: [
					"bg-white dark:bg-slate-200 shadow-md",
					"data-[state=checked]:bg-white dark:data-[state=checked]:bg-slate-100",
					"data-[state=checked]:shadow-lg",
				],
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function Switch({
	className,
	variant,
	...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> &
	VariantProps<typeof switchVariants>) {
	return (
		<SwitchPrimitive.Root
			data-slot="switch"
			className={cn(switchVariants({ variant }), className)}
			{...props}
		>
			<SwitchPrimitive.Thumb
				data-slot="switch-thumb"
				className={cn(switchThumbVariants({ variant }))}
			/>
		</SwitchPrimitive.Root>
	);
}

export { Switch };
