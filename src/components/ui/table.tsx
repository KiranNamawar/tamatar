import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const tableVariants = cva("w-full caption-bottom text-sm", {
	variants: {
		variant: {
			default: "",
			glass:
				"backdrop-blur-md bg-white/25 dark:bg-black/25 rounded-lg overflow-hidden",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

const tableRowVariants = cva("border-b transition-colors", {
	variants: {
		variant: {
			default: "hover:bg-muted/50 data-[state=selected]:bg-muted",
			glass:
				"hover:bg-white/20 dark:hover:bg-black/20 data-[state=selected]:bg-white/30 dark:data-[state=selected]:bg-black/30 border-white/20 dark:border-white/10",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

const tableFooterVariants = cva("border-t font-medium [&>tr]:last:border-b-0", {
	variants: {
		variant: {
			default: "bg-muted/50",
			glass: "backdrop-blur-md bg-white/30 dark:bg-black/30",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

export interface TableProps
	extends React.ComponentProps<"table">,
		VariantProps<typeof tableVariants> {}

function Table({ className, variant, ...props }: TableProps) {
	return (
		<div
			data-slot="table-container"
			className="relative w-full overflow-x-auto"
		>
			<table
				data-slot="table"
				className={cn(tableVariants({ variant, className }))}
				{...props}
			/>
		</div>
	);
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
	return (
		<thead
			data-slot="table-header"
			className={cn("[&_tr]:border-b", className)}
			{...props}
		/>
	);
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
	return (
		<tbody
			data-slot="table-body"
			className={cn("[&_tr:last-child]:border-0", className)}
			{...props}
		/>
	);
}

export interface TableFooterProps
	extends React.ComponentProps<"tfoot">,
		VariantProps<typeof tableFooterVariants> {}

function TableFooter({ className, variant, ...props }: TableFooterProps) {
	return (
		<tfoot
			data-slot="table-footer"
			className={cn(tableFooterVariants({ variant, className }))}
			{...props}
		/>
	);
}

export interface TableRowProps
	extends React.ComponentProps<"tr">,
		VariantProps<typeof tableRowVariants> {}

function TableRow({ className, variant, ...props }: TableRowProps) {
	return (
		<tr
			data-slot="table-row"
			className={cn(tableRowVariants({ variant, className }))}
			{...props}
		/>
	);
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
	return (
		<th
			data-slot="table-head"
			className={cn(
				"text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
				className,
			)}
			{...props}
		/>
	);
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
	return (
		<td
			data-slot="table-cell"
			className={cn(
				"p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
				className,
			)}
			{...props}
		/>
	);
}

function TableCaption({
	className,
	...props
}: React.ComponentProps<"caption">) {
	return (
		<caption
			data-slot="table-caption"
			className={cn("text-muted-foreground mt-4 text-sm", className)}
			{...props}
		/>
	);
}

export {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
};
