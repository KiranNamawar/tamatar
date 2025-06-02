import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const inputVariants = cva(
	"file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md px-3 py-1 text-base shadow-xs transition-all duration-300 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
	{
		variants: {
			variant: {
				default: [
					"bg-background border-border border-2 dark:bg-input/30 dark:border-input",
					"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
					"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
					"hover:border-ring/60 dark:hover:border-input/80",
				],
				glass: [
					"glass border-white/30 dark:border-white/20 border-2 text-foreground dark:text-white",
					"focus-visible:border-white/50 focus-visible:ring-white/20 focus-visible:ring-[3px]",
					"aria-invalid:ring-destructive/20 aria-invalid:border-destructive/50",
					"hover:border-white/40 dark:hover:border-white/30",
					"placeholder:text-foreground/60 dark:placeholder:text-white/60",
				],
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface InputProps
	extends React.ComponentProps<"input">,
		VariantProps<typeof inputVariants> {}

function Input({ className, variant, type, ...props }: InputProps) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(inputVariants({ variant, className }))}
			{...props}
		/>
	);
}

export { Input };
