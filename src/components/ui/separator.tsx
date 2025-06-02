import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const separatorVariants = cva(
	"shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
	{
		variants: {
			variant: {
				default: "bg-border",
				glass: "bg-white/30 dark:bg-white/15",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface SeparatorProps
	extends React.ComponentProps<typeof SeparatorPrimitive.Root>,
		VariantProps<typeof separatorVariants> {}

function Separator({
	className,
	orientation = "horizontal",
	decorative = true,
	variant,
	...props
}: SeparatorProps) {
	return (
		<SeparatorPrimitive.Root
			data-slot="separator"
			decorative={decorative}
			orientation={orientation}
			className={cn(separatorVariants({ variant, className }))}
			{...props}
		/>
	);
}

export { Separator };
