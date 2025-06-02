import { cn } from "@/lib/utils";
import { type HTMLMotionProps, motion } from "motion/react";
import type * as React from "react";

interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	variant?: "default" | "intense" | "subtle";
	animated?: boolean;
}

export function AuroraBackground({
	children,
	variant = "default",
	animated = true,
	className,
	...props
}: AuroraBackgroundProps) {
	const variants = {
		default: "aurora-bg",
		intense: "aurora-bg-intense",
		subtle: "aurora-bg",
	};

	return (
		<div
			className={cn(
				"relative min-h-screen overflow-hidden",
				animated ? variants[variant] : "bg-background",
				className,
			)}
			{...props}
		>
			{/* Aurora gradient overlay */}
			<div className="absolute inset-0 opacity-60" />

			{/* Content wrapper */}
			<div className="relative z-10">{children}</div>
		</div>
	);
}

interface AuroraHeroProps {
	children: React.ReactNode;
	title?: string;
	subtitle?: string;
	className?: string;
}

export function AuroraHero({
	children,
	title,
	subtitle,
	className,
}: AuroraHeroProps) {
	return (
		<AuroraBackground
			className={cn("flex items-center justify-center", className)}
		>
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
				className="text-center space-y-6 max-w-4xl mx-auto px-6"
			>
				{title && (
					<motion.h1
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="text-5xl md:text-7xl font-black gradient-text"
					>
						{title}
					</motion.h1>
				)}

				{subtitle && (
					<motion.p
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="text-xl md:text-2xl text-foreground/80 font-light"
					>
						{subtitle}
					</motion.p>
				)}

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.6 }}
				>
					{children}
				</motion.div>
			</motion.div>
		</AuroraBackground>
	);
}

interface AuroraSectionProps extends HTMLMotionProps<"section"> {
	children: React.ReactNode;
	glassOverlay?: boolean;
}

export function AuroraSection({
	children,
	glassOverlay = false,
	className,
	...props
}: AuroraSectionProps) {
	return (
		<motion.section
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 0.8 }}
			viewport={{ once: true }}
			className={cn(
				"relative aurora-bg-light dark:aurora-bg py-20 overflow-hidden",
				className,
			)}
			{...props}
		>
			{glassOverlay && <div className="absolute inset-0 glass" />}

			<div className="relative z-10 container mx-auto px-6">{children}</div>
		</motion.section>
	);
}

interface GradientTextProps extends HTMLMotionProps<"span"> {
	children: React.ReactNode;
	animated?: boolean;
}

export function GradientText({
	children,
	animated = true,
	className,
	...props
}: GradientTextProps) {
	return (
		<motion.span
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.6 }}
			className={cn(
				animated ? "gradient-text" : "text-primary",
				"font-bold",
				className,
			)}
			{...props}
		>
			{children}
		</motion.span>
	);
}

interface FloatingElementProps extends HTMLMotionProps<"div"> {
	children: React.ReactNode;
	direction?: "up" | "down" | "left" | "right";
	duration?: number;
}

export function FloatingElement({
	children,
	direction = "up",
	duration = 3,
	className,
	...props
}: FloatingElementProps) {
	const getAnimationValues = () => {
		switch (direction) {
			case "up":
				return { y: [-10, 10, -10] };
			case "down":
				return { y: [10, -10, 10] };
			case "left":
				return { x: [-10, 10, -10] };
			case "right":
				return { x: [10, -10, 10] };
			default:
				return { y: [-10, 10, -10] };
		}
	};

	return (
		<motion.div
			animate={getAnimationValues()}
			transition={{
				duration,
				repeat: Number.POSITIVE_INFINITY,
				ease: "easeInOut",
			}}
			className={cn("absolute", className)}
			{...props}
		>
			{children}
		</motion.div>
	);
}

interface AuroraOrbProps {
	size?: "sm" | "md" | "lg" | "xl";
	color?: "primary" | "secondary" | "accent";
	position?: {
		top?: string;
		bottom?: string;
		left?: string;
		right?: string;
	};
	animated?: boolean;
}

export function AuroraOrb({
	size = "md",
	color = "primary",
	position = { top: "20%", left: "10%" },
	animated = true,
}: AuroraOrbProps) {
	const sizes = {
		sm: "w-32 h-32",
		md: "w-48 h-48",
		lg: "w-64 h-64",
		xl: "w-80 h-80",
	};

	const colors = {
		primary: "bg-gradient-to-br from-primary/30 to-primary/10",
		secondary: "bg-gradient-to-br from-secondary/30 to-secondary/10",
		accent: "bg-gradient-to-br from-accent/30 to-accent/10",
	};

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0 }}
			animate={{
				opacity: [0.3, 0.6, 0.3],
				scale: animated ? [1, 1.1, 1] : 1,
			}}
			transition={{
				duration: 4,
				repeat: Number.POSITIVE_INFINITY,
				ease: "easeInOut",
			}}
			className={cn(
				"absolute rounded-full blur-3xl pointer-events-none",
				sizes[size],
				colors[color],
			)}
			style={position}
		/>
	);
}
