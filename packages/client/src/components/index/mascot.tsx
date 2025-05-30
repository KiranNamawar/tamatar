import { useEffect, useState } from "react";

export default function PixelLaptopModernMascot() {
	// Animation state for glowing power button
	const [glow, setGlow] = useState(true);

	useEffect(() => {
		const interval = setInterval(() => {
			setGlow((g) => !g);
		}, 700);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="flex flex-col items-center">
			<svg
				width="96"
				height="96"
				viewBox="0 0 32 32"
				style={{ imageRendering: "pixelated" }}
				aria-label="Pixel art animated laptop mascot"
				role="img"
			>
				{/* Laptop base */}
				<rect x="8" y="23" width="16" height="3" rx="1" fill="#374151" />
				{/* Laptop body */}
				<rect
					x="7"
					y="10"
					width="18"
					height="13"
					rx="2"
					fill="#d1d5db"
					stroke="#374151"
					strokeWidth="0.5"
				/>
				{/* Laptop screen frame */}
				<rect x="9" y="12" width="14" height="8" rx="1" fill="#111827" />
				{/* Laptop screen (blue) */}
				<rect x="10" y="13" width="12" height="6" rx="1" fill="#2563eb" />
				{/* Laptop reflection */}
				<rect x="11" y="14" width="4" height="1" fill="#60a5fa" opacity="0.4" />
				{/* Power button (animated glow) */}
				<rect
					x="16"
					y="25"
					width="2"
					height="2"
					rx="0.7"
					fill={glow ? "#22c55e" : "#14532d"}
				/>
			</svg>
			<span className="mt-2 text-xs font-mono text-blue-700 dark:text-blue-300">
				Modern Laptop
			</span>
		</div>
	);
}
