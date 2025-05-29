/**
 * Tamatar Brand Logo - Glassmorphic Geometric T Mark (Rounded Font)
 * Modern italic 'T' using a rounded font, red-orange gradient, and glassmorphic effects.
 */
export default function BrandLogo({
	size = 180,
	className = "",
}: { size?: number; className?: string }) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 120 120"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}			aria-label="Tamatar Logo"
		>
			<title>Tamatar Brand Logo</title>
			<defs>				{/* Vertical red-orange gradient */}
				<linearGradient
					id="t-gradient-vert"
					x1="60"
					y1="15"
					x2="60"
					y2="105"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#f97316" />
					<stop offset="1" stopColor="#dc2626" />
				</linearGradient>
				{/* Glass shine gradient */}
				<linearGradient
					id="shine"
					x1="40"
					y1="30"
					x2="100"
					y2="80"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0%" stopColor="#fff" stopOpacity="0.7" />
					<stop offset="80%" stopColor="#fff" stopOpacity="0" />
				</linearGradient>
				{/* Frosted glass blur filter */}
				<filter id="frosted" x="-20%" y="-20%" width="140%" height="140%">
					<feGaussianBlur stdDeviation="5" />
				</filter>
				{/* Neon glow filter */}
				<filter id="neon-outline" x="-20%" y="-20%" width="140%" height="140%">
					<feDropShadow
						dx="0"
						dy="0"
						stdDeviation="4"
						floodColor="#38bdf8"
						floodOpacity="0.5"
					/>
				</filter>
			</defs>
			{/* Neon outline for T (rounded font) */}
			<text
				x="60"
				y="86"
				textAnchor="middle"
				fontFamily="'Quicksand', 'Montserrat', 'Inter', 'Segoe UI', Arial, sans-serif"
				fontWeight="700"
				fontSize="90"
				stroke="url(#t-gradient-vert)"
				strokeWidth="3"
				fill="none"
				style={{ fontStyle: "italic", fontVariationSettings: '"wght" 700' }}
				filter="url(#neon-outline)"
			>
				T
			</text>
			{/* Main T with vertical gradient fill (rounded font) */}
			<text
				x="60"
				y="86"
				textAnchor="middle"
				fontFamily="'Quicksand', 'Montserrat', 'Inter', 'Segoe UI', Arial, sans-serif"
				fontWeight="700"
				fontSize="90"
				fill="url(#t-gradient-vert)"
				style={{ fontStyle: "italic", fontVariationSettings: '"wght" 700' }}
			>
				T
			</text>
			{/* Glassy frosted ellipse overlay */}
			<ellipse
				cx="60"
				cy="60"
				rx="32"
				ry="12"
				fill="#fff"
				opacity="0.18"
				filter="url(#frosted)"
				transform="rotate(-18 60 60)"
			/>
			{/* Shine accent */}
			<rect
				x="38"
				y="32"
				width="44"
				height="16"
				rx="8"
				fill="url(#shine)"
				opacity="0.35"
				transform="rotate(-13 60 40)"
			/>
		</svg>
	);
}
