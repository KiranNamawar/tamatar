import * as TogglePrimitive from "@radix-ui/react-toggle";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
	"inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-all duration-200 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
	{
		variants: {
			variant: {
				default:
					"bg-transparent hover:bg-muted hover:text-muted-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
				outline:
					"border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
				glass: [
					"backdrop-blur-md bg-white/30 dark:bg-black/30 border border-white/40 dark:border-white/20",
					"text-slate-800 dark:text-slate-100 shadow-lg",
					"hover:bg-white/40 dark:hover:bg-black/40 hover:border-white/50 dark:hover:border-white/30",
					"data-[state=on]:bg-white/60 dark:data-[state=on]:bg-black/60 data-[state=on]:border-white/70 dark:data-[state=on]:border-white/50",
					"data-[state=on]:text-slate-900 dark:data-[state=on]:text-slate-50 data-[state=on]:shadow-xl",
				],
				aurora: [
					"border border-purple-500/30 dark:border-purple-400/30",
					"bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10",
					"text-foreground dark:text-white shadow-lg",
					"hover:from-purple-500/20 hover:via-pink-500/20 hover:to-cyan-500/20",
					"hover:border-purple-500/40 dark:hover:border-purple-400/40",
					"data-[state=on]:from-purple-500/30 data-[state=on]:via-pink-500/30 data-[state=on]:to-cyan-500/30",
					"data-[state=on]:border-purple-500/50 dark:data-[state=on]:border-purple-400/50",
					"data-[state=on]:text-purple-900 dark:data-[state=on]:text-purple-100 data-[state=on]:shadow-xl",
				],
			},
			size: {
				default: "h-9 px-2 min-w-9",
				sm: "h-8 px-1.5 min-w-8",
				lg: "h-10 px-2.5 min-w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Toggle({
	className,
	variant,
	size,
	...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
	VariantProps<typeof toggleVariants>) {
	return (
		<TogglePrimitive.Root
			data-slot="toggle"
			className={cn(toggleVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Toggle, toggleVariants };
