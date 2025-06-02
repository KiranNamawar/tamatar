import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";

const skeletonVariants = cva("animate-pulse rounded-md", {
	variants: {
		variant: {
			default: "bg-accent",
			glass: "backdrop-blur-md bg-white/25 dark:bg-black/25",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

export interface SkeletonProps
	extends React.ComponentProps<"div">,
		VariantProps<typeof skeletonVariants> {}

function Skeleton({ className, variant, ...props }: SkeletonProps) {
	return (
		<div
			data-slot="skeleton"
			className={cn(skeletonVariants({ variant, className }))}
			{...props}
		/>
	);
}

export { Skeleton };
