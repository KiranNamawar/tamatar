import { getTamatarGradient } from "@/lib/ui-patterns";
import type React from "react";

/**
 * BrandHeader
 * Displays the Tamatar brand name (animated gradient) and step indicator (optional).
 *
 * Props:
 *   - className?: string (optional extra classes)
 *   - style?: React.CSSProperties (optional extra styles)
 *
 * Usage:
 *   <BrandHeader />
 */
export function BrandHeader({
	className = "",
	style = {},
}: {
	className?: string;
	style?: React.CSSProperties;
}) {
	return (
		<div
			className={`flex items-center justify-center mb-3 w-full ${className}`}
			style={style}
		>
			{" "}
			<span
				className={`font-extrabold text-4xl tracking-tight select-none drop-shadow-lg animate-gradient-x ${getTamatarGradient("primary", "text")}`}
				style={{
					fontFamily: "Quicksand, Inter, Segoe UI, Arial, sans-serif",
					letterSpacing: "-0.01em",
				}}
			>
				Tamatar
			</span>
		</div>
	);
}
