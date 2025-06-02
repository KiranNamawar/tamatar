"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const tooltipContentVariants = cva(
	"animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground",
				glass:
					"backdrop-blur-md bg-white/25 dark:bg-black/25 border border-white/30 dark:border-white/15 text-slate-700 dark:text-slate-200",
				aurora: [
					"aurora-bg border border-purple-500/30 dark:border-purple-400/30 text-foreground dark:text-white",
				],
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function TooltipProvider({
	delayDuration = 0,
	...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
	return (
		<TooltipPrimitive.Provider
			data-slot="tooltip-provider"
			delayDuration={delayDuration}
			{...props}
		/>
	);
}

function Tooltip({
	...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
	return (
		<TooltipProvider>
			<TooltipPrimitive.Root data-slot="tooltip" {...props} />
		</TooltipProvider>
	);
}

function TooltipTrigger({
	...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
	return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
	className,
	sideOffset = 0,
	variant = "default",
	children,
	...props
}: React.ComponentProps<typeof TooltipPrimitive.Content> &
	VariantProps<typeof tooltipContentVariants>) {
	return (
		<TooltipPrimitive.Portal>
			<TooltipPrimitive.Content
				data-slot="tooltip-content"
				sideOffset={sideOffset}
				className={cn(tooltipContentVariants({ variant }), className)}
				{...props}
			>
				{children}
				<TooltipPrimitive.Arrow
					className={cn(
						"z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]",
						variant === "default" && "bg-primary fill-primary",
						variant === "glass" &&
							"bg-white/20 fill-white/20 dark:bg-white/10 dark:fill-white/10",
						variant === "aurora" &&
							"bg-gradient-to-br from-purple-500/80 via-pink-500/80 to-cyan-500/80 fill-purple-500/80",
					)}
				/>
			</TooltipPrimitive.Content>
		</TooltipPrimitive.Portal>
	);
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
