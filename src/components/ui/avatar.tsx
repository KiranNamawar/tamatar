"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const avatarVariants = cva(
	"relative flex size-8 shrink-0 overflow-hidden rounded-full",
	{
		variants: {
			variant: {
				default: "",
				glass: "ring-2 ring-white/30 dark:ring-white/15",
				aurora: "ring-2 ring-purple-500/30 dark:ring-purple-400/30",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

const avatarFallbackVariants = cva(
	"flex size-full items-center justify-center rounded-full",
	{
		variants: {
			variant: {
				default: "bg-muted",
				glass:
					"backdrop-blur-md bg-white/25 dark:bg-black/25 text-slate-700 dark:text-slate-200",
				aurora:
					"bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-cyan-500/20 text-foreground dark:text-white",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface AvatarProps
	extends React.ComponentProps<typeof AvatarPrimitive.Root>,
		VariantProps<typeof avatarVariants> {}

function Avatar({ className, variant, ...props }: AvatarProps) {
	return (
		<AvatarPrimitive.Root
			data-slot="avatar"
			className={cn(avatarVariants({ variant, className }))}
			{...props}
		/>
	);
}

function AvatarImage({
	className,
	...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
	return (
		<AvatarPrimitive.Image
			data-slot="avatar-image"
			className={cn("aspect-square size-full", className)}
			{...props}
		/>
	);
}

export interface AvatarFallbackProps
	extends React.ComponentProps<typeof AvatarPrimitive.Fallback>,
		VariantProps<typeof avatarFallbackVariants> {}

function AvatarFallback({ className, variant, ...props }: AvatarFallbackProps) {
	return (
		<AvatarPrimitive.Fallback
			data-slot="avatar-fallback"
			className={cn(avatarFallbackVariants({ variant, className }))}
			{...props}
		/>
	);
}

export { Avatar, AvatarImage, AvatarFallback };
