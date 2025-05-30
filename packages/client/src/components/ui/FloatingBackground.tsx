import type { FloatingItem } from "@/lib/ui-patterns";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import * as React from "react";

/**
 * Configuration options for the FloatingBackground component
 */
interface FloatingBackgroundProps {
	/** Array of floating items to display */
	items: FloatingItem[];
	/** Optional CSS class name for the container */
	className?: string;
	/** Control the animation speed (1 is normal, 0.5 is half speed, 2 is double speed) */
	animationSpeed?: number;
	/** Control the opacity of floating elements */
	opacity?: number;
	/** Whether to show floating elements on mobile devices */
	showOnMobile?: boolean;
}

/**
 * A component that creates floating background elements with animations
 * Perfect for creating visual interest in sections with icons, shapes, or images
 */
export default function FloatingBackground({
	items,
	className,
	animationSpeed = 1,
	opacity = 0.3,
	showOnMobile = false,
}: FloatingBackgroundProps) {
	return (
		<div
			className={cn(
				"absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden",
				className,
			)}
		>
			{items.map((item, i) => (
				<motion.div
					key={item.key}
					className={`absolute ${item.className}`}
					initial={{ opacity: 0, y: 20 }}
					animate={{
						opacity: opacity,
						y: 0,
						rotate: [0, 5, -5, 0],
					}}
					transition={{
						opacity: {
							duration: 0.8 / animationSpeed,
							delay: (0.2 * i) / animationSpeed,
						},
						y: {
							duration: 0.8 / animationSpeed,
							delay: (0.2 * i) / animationSpeed,
						},
						rotate: {
							duration: 6 / animationSpeed,
							repeat: Number.POSITIVE_INFINITY,
							delay:
								typeof item.delay === "string"
									? Number.parseFloat(item.delay) / animationSpeed
									: (item.delay || 0) / animationSpeed,
						},
					}}
				>
					<div
						className={cn(
							showOnMobile ? "block" : "hidden md:block",
							"p-3 hover:scale-110 transition-transform duration-300",
						)}
					>
						{item.icon}
					</div>
				</motion.div>
			))}
		</div>
	);
}
