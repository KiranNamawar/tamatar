import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:scale-105 smooth-transition",
				destructive:
					"bg-destructive text-white shadow-lg hover:bg-destructive/90 hover:scale-105 smooth-transition focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
				outline:
					"border-2 border-border bg-background shadow-lg hover:bg-accent hover:text-accent-foreground hover:scale-105 smooth-transition dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
				secondary:
					"bg-secondary text-secondary-foreground shadow-lg hover:bg-secondary/80 hover:scale-105 smooth-transition",
				ghost:
					"hover:bg-accent hover:text-accent-foreground hover:scale-105 smooth-transition dark:hover:bg-accent/50 text-foreground",
				link: "text-primary underline-offset-4 hover:underline",
				glass:
					"backdrop-blur-md bg-white/25 dark:bg-black/25 border border-white/30 dark:border-white/15 shadow-lg hover:bg-white/35 dark:hover:bg-black/35 hover:scale-105 smooth-transition text-slate-700 dark:text-slate-200",
			},
			size: {
				default: "h-9 px-4 py-2 has-[>svg]:px-3",
				sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
				lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
				icon: "size-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
