import type * as React from "react";

import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<"input"> & {
	icon?: React.ReactNode;
};

function Input({ className, type, icon, ...props }: InputProps) {
	return (
		<div className="relative flex items-center">
			{/* Backdrop blur layer */}
			<div className="absolute inset-0 bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm border border-white/40 dark:border-gray-700/30 rounded-xl shadow-lg" />

			<input
				type={type}
				data-slot="input"
				className={cn(
					icon ? "pl-10" : "px-3",
					"relative z-10 file:text-foreground placeholder:text-muted-foreground/70 selection:bg-primary selection:text-primary-foreground bg-transparent flex h-9 w-full min-w-0 border-0 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
					"text-gray-900 dark:text-gray-100", // Enhanced contrast for text
					"focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-0 focus-visible:rounded-xl",
					"aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:rounded-xl",
					className,
				)}
				{...props}
			/>
			{icon && (
				<span className="absolute left-3 flex items-center pointer-events-none text-gray-600 dark:text-gray-400 mr-2 z-20">
					{icon}
				</span>
			)}
		</div>
	);
}

export { Input };
