import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

const breadcrumbListVariants = cva(
	"flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
	{
		variants: {
			variant: {
				default: "text-muted-foreground",
				glass: "text-slate-600 dark:text-slate-300",
				aurora: "text-purple-700 dark:text-purple-300",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

const breadcrumbLinkVariants = cva("transition-colors", {
	variants: {
		variant: {
			default: "hover:text-foreground",
			glass:
				"text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white",
			aurora:
				"text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-100",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
	return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

export interface BreadcrumbListProps
	extends React.ComponentProps<"ol">,
		VariantProps<typeof breadcrumbListVariants> {}

function BreadcrumbList({ className, variant, ...props }: BreadcrumbListProps) {
	return (
		<ol
			data-slot="breadcrumb-list"
			className={cn(breadcrumbListVariants({ variant, className }))}
			{...props}
		/>
	);
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
	return (
		<li
			data-slot="breadcrumb-item"
			className={cn("inline-flex items-center gap-1.5", className)}
			{...props}
		/>
	);
}

export interface BreadcrumbLinkProps
	extends React.ComponentProps<"a">,
		VariantProps<typeof breadcrumbLinkVariants> {
	asChild?: boolean;
}

function BreadcrumbLink({
	asChild,
	className,
	variant,
	...props
}: BreadcrumbLinkProps) {
	const Comp = asChild ? Slot : "a";

	return (
		<Comp
			data-slot="breadcrumb-link"
			className={cn(breadcrumbLinkVariants({ variant, className }))}
			{...props}
		/>
	);
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="breadcrumb-page"
			role="link"
			tabIndex={0}
			aria-disabled="true"
			aria-current="page"
			className={cn("text-foreground font-normal", className)}
			{...props}
		/>
	);
}

function BreadcrumbSeparator({
	children,
	className,
	...props
}: React.ComponentProps<"li">) {
	return (
		<li
			data-slot="breadcrumb-separator"
			role="presentation"
			aria-hidden="true"
			className={cn("[&>svg]:size-3.5", className)}
			{...props}
		>
			{children ?? <ChevronRight />}
		</li>
	);
}

function BreadcrumbEllipsis({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="breadcrumb-ellipsis"
			role="presentation"
			aria-hidden="true"
			className={cn("flex size-9 items-center justify-center", className)}
			{...props}
		>
			<MoreHorizontal className="size-4" />
			<span className="sr-only">More</span>
		</span>
	);
}

export {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
	BreadcrumbEllipsis,
};
