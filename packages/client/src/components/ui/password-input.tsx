import type * as React from "react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<"input"> & {
	icon?: React.ReactNode;
	label?: string;
	rightLabel?: React.ReactNode;
};

function PasswordInput({ label, className, icon, rightLabel, ...props }: InputProps) {
	const [show, setShow] = useState(false);


	return (
		<>
			<div className="relative flex items-center">
				{icon && (
					<span className="absolute left-3 flex items-center pointer-events-none text-muted-foreground mr-2">
						{icon}
					</span>
				)}
				<input
					type={show ? "text" : "password"}
					data-slot="input"
					className={cn(
						icon ? "pl-10" : "px-3",
						"pr-9", // space for the eye icon
						"file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
						"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
						"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
						className,
					)}
					{...props}
				/>
				<button
					type="button"
					tabIndex={-1}
					className="absolute right-3 flex items-center text-muted-foreground hover:text-foreground focus:outline-none"
					onClick={() => setShow((v) => !v)}
					aria-label={show ? "Hide password" : "Show password"}
				>
					{show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
				</button>
			</div>
			
		</>
	);
}

export { PasswordInput };
