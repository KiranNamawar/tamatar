import * as TabsPrimitive from "@radix-ui/react-tabs";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";
import { createContext, useContext } from "react";

import { cn } from "@/lib/utils";

type TabsVariant = "default" | "glass" | "aurora";

const TabsContext = createContext<{ variant?: TabsVariant }>({});

const tabsListVariants = cva(
	"inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px] shadow-sm",
	{
		variants: {
			variant: {
				default: "bg-muted text-muted-foreground",
				glass: [
					"backdrop-blur-md bg-white/30 dark:bg-black/30 border border-white/40 dark:border-white/20",
					"text-slate-800 dark:text-slate-100 shadow-lg",
				],
				aurora: [
					"bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20",
					"border border-purple-500/40 dark:border-purple-400/40",
					"text-foreground dark:text-white shadow-lg",
				],
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

const tabsTriggerVariants = cva(
	"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-3 py-1 text-sm font-medium whitespace-nowrap transition-all duration-200 focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				default: [
					"text-muted-foreground hover:text-foreground",
					"data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
					"dark:data-[state=active]:bg-background dark:data-[state=active]:text-foreground",
				],
				glass: [
					"text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50",
					"hover:bg-white/30 dark:hover:bg-black/30",
					"data-[state=active]:bg-white/60 dark:data-[state=active]:bg-black/60",
					"data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-50",
					"data-[state=active]:border-white/60 dark:data-[state=active]:border-white/40",
					"data-[state=active]:shadow-md backdrop-blur-sm",
				],
				aurora: [
					"text-foreground/70 dark:text-white/70 hover:text-purple-900 dark:hover:text-purple-100",
					"hover:bg-purple-500/20 dark:hover:bg-purple-400/20",
					"data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/40 data-[state=active]:via-pink-500/40 data-[state=active]:to-cyan-500/40",
					"data-[state=active]:text-purple-900 dark:data-[state=active]:text-purple-100",
					"data-[state=active]:border-purple-500/50 dark:data-[state=active]:border-purple-400/50",
					"data-[state=active]:shadow-md",
				],
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function Tabs({
	className,
	variant,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Root> & {
	variant?: TabsVariant;
}) {
	return (
		<TabsContext.Provider value={{ variant }}>
			<TabsPrimitive.Root
				data-slot="tabs"
				className={cn("flex flex-col gap-2", className)}
				{...props}
			/>
		</TabsContext.Provider>
	);
}

function TabsList({
	className,
	variant,
	...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
	VariantProps<typeof tabsListVariants>) {
	const context = useContext(TabsContext);
	const effectiveVariant = variant || context.variant || "default";

	return (
		<TabsPrimitive.List
			data-slot="tabs-list"
			className={cn(tabsListVariants({ variant: effectiveVariant }), className)}
			{...props}
		/>
	);
}

function TabsTrigger({
	className,
	variant,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> &
	VariantProps<typeof tabsTriggerVariants>) {
	const context = useContext(TabsContext);
	const effectiveVariant = variant || context.variant || "default";

	return (
		<TabsPrimitive.Trigger
			data-slot="tabs-trigger"
			className={cn(
				tabsTriggerVariants({ variant: effectiveVariant }),
				className,
			)}
			{...props}
		/>
	);
}

function TabsContent({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
	return (
		<TabsPrimitive.Content
			data-slot="tabs-content"
			className={cn("flex-1 outline-none", className)}
			{...props}
		/>
	);
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
