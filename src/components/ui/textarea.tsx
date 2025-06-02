import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const textareaVariants = cva(
	"flex field-sizing-content min-h-16 w-full rounded-md px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
	{
		variants: {
			variant: {
				default: [
					"border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50",
					"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
					"dark:bg-input/30 border bg-transparent focus-visible:ring-[3px]",
				],
				glass: [
					"backdrop-blur-md bg-white/25 dark:bg-black/25 border border-white/30 dark:border-white/15",
					"text-slate-700 dark:text-slate-200 placeholder:text-slate-600/60 dark:placeholder:text-slate-300/60",
					"focus-visible:border-white/50 focus-visible:ring-white/20 focus-visible:ring-[3px]",
					"aria-invalid:ring-destructive/20 aria-invalid:border-destructive/50",
				],
				aurora: [
					"border border-purple-500/40 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10",
					"text-foreground dark:text-white placeholder:text-purple-600/60 dark:placeholder:text-purple-300/60",
					"focus-visible:from-purple-500/20 focus-visible:via-pink-500/20 focus-visible:to-cyan-500/20",
					"focus-visible:ring-purple-500/30 focus-visible:ring-[3px] focus-visible:border-purple-500/60",
				],
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface TextareaProps
	extends React.ComponentProps<"textarea">,
		VariantProps<typeof textareaVariants> {}

function Textarea({ className, variant, ...props }: TextareaProps) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(textareaVariants({ variant, className }))}
			{...props}
		/>
	);
}

export { Textarea };
