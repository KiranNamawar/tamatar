import * as LabelPrimitive from "@radix-ui/react-label";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const labelVariants = cva(
	"flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "text-foreground",
				glass: "text-slate-700 dark:text-slate-200",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface LabelProps
	extends React.ComponentProps<typeof LabelPrimitive.Root>,
		VariantProps<typeof labelVariants> {}

function Label({ className, variant, ...props }: LabelProps) {
	return (
		<LabelPrimitive.Root
			data-slot="label"
			className={cn(labelVariants({ variant, className }))}
			{...props}
		/>
	);
}

export { Label };
