import { getTamatarGradient } from "@/lib/ui-patterns";
import { Link } from "@tanstack/react-router";

/**
 * Brand Header Component for Auth Pages
 * Displays the Tamatar brand name with animated gradient
 * Clickable to redirect to homepage
 */
export function BrandHeader({ centered = true }: { centered?: boolean }) {
	return (
		<div className={`mb-3 w-full ${centered ? "text-center" : ""}`}>
			<Link to="/" className="inline-block">
				<span
					className={`font-extrabold text-4xl tracking-tight select-none drop-shadow-lg animate-gradient-x ${getTamatarGradient("primary", "text")} hover:scale-105 transition-transform duration-200 cursor-pointer`}
					style={{
						fontFamily: "Quicksand, Inter, Segoe UI, Arial, sans-serif",
						letterSpacing: "-0.01em",
					}}
				>
					Tamatar
				</span>
			</Link>
		</div>
	);
}
