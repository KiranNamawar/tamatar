import * as SliderPrimitive from "@radix-ui/react-slider";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const sliderTrackVariants = cva(
	"relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
	{
		variants: {
			variant: {
				default: "bg-muted",
				glass:
					"backdrop-blur-md bg-white/25 dark:bg-black/25 border border-white/30 dark:border-white/15",
				aurora:
					"aurora-bg border border-purple-500/30 dark:border-purple-400/30",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

const sliderRangeVariants = cva(
	"absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
	{
		variants: {
			variant: {
				default: "bg-primary",
				glass: "bg-slate-600 dark:bg-slate-300",
				aurora:
					"bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function Slider({
	className,
	variant,
	defaultValue,
	value,
	min = 0,
	max = 100,
	...props
}: React.ComponentProps<typeof SliderPrimitive.Root> &
	VariantProps<typeof sliderTrackVariants>) {
	const _values = React.useMemo(
		() =>
			Array.isArray(value)
				? value
				: Array.isArray(defaultValue)
					? defaultValue
					: [min, max],
		[value, defaultValue, min, max],
	);

	return (
		<SliderPrimitive.Root
			data-slot="slider"
			defaultValue={defaultValue}
			value={value}
			min={min}
			max={max}
			className={cn(
				"relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
				className,
			)}
			{...props}
		>
			<SliderPrimitive.Track
				data-slot="slider-track"
				className={cn(sliderTrackVariants({ variant }))}
			>
				<SliderPrimitive.Range
					data-slot="slider-range"
					className={cn(sliderRangeVariants({ variant }))}
				/>
			</SliderPrimitive.Track>
			{Array.from({ length: _values.length }, (_, index) => (
				<SliderPrimitive.Thumb
					data-slot="slider-thumb"
					key={_values[index]}
					className="border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
				/>
			))}
		</SliderPrimitive.Root>
	);
}

export { Slider };
