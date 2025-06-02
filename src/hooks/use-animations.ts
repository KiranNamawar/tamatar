import { useAnimation, useInView } from "motion/react";
import type { AnimationControls } from "motion/react";
import { useEffect, useRef } from "react";

// Hook for basic motion animations
export function useMotion(animation: string = "fadeIn", delay: number = 0) {
	const controls = useAnimation();
	const ref = useRef(null);
	const inView = useInView(ref, { once: true, margin: "-50px" });

	useEffect(() => {
		if (inView) {
			controls.start("animate");
		}
	}, [controls, inView]);

	return {
		ref,
		controls,
		variants: getAnimationVariants(animation),
		initial: "initial",
		animate: controls,
		transition: { delay, duration: 0.6 },
	};
}

// Hook for staggered list animations
export function useStagger(staggerDelay: number = 0.1) {
	const controls = useAnimation();
	const ref = useRef(null);
	const inView = useInView(ref, { once: true, margin: "-50px" });

	useEffect(() => {
		if (inView) {
			controls.start("animate");
		}
	}, [controls, inView]);

	return {
		ref,
		controls,
		containerVariants: {
			initial: {},
			animate: {
				transition: {
					staggerChildren: staggerDelay,
				},
			},
		},
		itemVariants: {
			initial: {
				opacity: 0,
				y: 20,
				scale: 0.9,
			},
			animate: {
				opacity: 1,
				y: 0,
				scale: 1,
				transition: {
					duration: 0.5,
					ease: [0.4, 0, 0.2, 1],
				},
			},
		},
		initial: "initial",
		animate: controls,
	};
}

// Hook for scroll-triggered animations
export function useScrollAnimation(threshold: number = 0.1) {
	const controls = useAnimation();
	const ref = useRef(null);
	const inView = useInView(ref, {
		once: true,
		amount: threshold,
		margin: "-100px",
	});

	useEffect(() => {
		if (inView) {
			controls.start("animate");
		}
	}, [controls, inView]);

	return {
		ref,
		controls,
		inView,
	};
}

// Hook for gesture-based animations
export function useGesture() {
	const controls = useAnimation();

	const gestureHandlers = {
		onTap: () =>
			controls.start({ scale: 0.95 }).then(() => controls.start({ scale: 1 })),
		onHoverStart: () => controls.start({ scale: 1.05, y: -2 }),
		onHoverEnd: () => controls.start({ scale: 1, y: 0 }),
		onDragStart: () => controls.start({ scale: 1.1 }),
		onDragEnd: () => controls.start({ scale: 1 }),
	};

	return {
		controls,
		gestureHandlers,
	};
}

// Hook for theme-aware animations
export function useThemeAnimation() {
	const controls = useAnimation();

	const animateThemeChange = (isDark: boolean) => {
		controls.start({
			backgroundColor: isDark ? "oklch(0.08 0.02 260)" : "oklch(0.99 0.01 280)",
			color: isDark ? "oklch(0.95 0.01 280)" : "oklch(0.15 0.02 260)",
			transition: { duration: 0.3, ease: "easeInOut" },
		});
	};

	return {
		controls,
		animateThemeChange,
	};
}

// Helper function to get animation variants
function getAnimationVariants(animation: string) {
	const variants: Record<string, any> = {
		fadeIn: {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
		},
		fadeInUp: {
			initial: { opacity: 0, y: 20 },
			animate: { opacity: 1, y: 0 },
		},
		fadeInDown: {
			initial: { opacity: 0, y: -20 },
			animate: { opacity: 1, y: 0 },
		},
		fadeInLeft: {
			initial: { opacity: 0, x: -20 },
			animate: { opacity: 1, x: 0 },
		},
		fadeInRight: {
			initial: { opacity: 0, x: 20 },
			animate: { opacity: 1, x: 0 },
		},
		scaleIn: {
			initial: { opacity: 0, scale: 0.9 },
			animate: { opacity: 1, scale: 1 },
		},
		slideInLeft: {
			initial: { x: -100, opacity: 0 },
			animate: { x: 0, opacity: 1 },
		},
		slideInRight: {
			initial: { x: 100, opacity: 0 },
			animate: { x: 0, opacity: 1 },
		},
	};

	return variants[animation] || variants.fadeIn;
}

// Hook for performance monitoring
export function useAnimationPerformance() {
	const performanceRef = useRef<number[]>([]);

	const startPerformanceMonitoring = () => {
		const startTime = performance.now();
		return () => {
			const endTime = performance.now();
			const duration = endTime - startTime;
			performanceRef.current.push(duration);

			// Keep only last 10 measurements
			if (performanceRef.current.length > 10) {
				performanceRef.current.shift();
			}
		};
	};

	const getAveragePerformance = () => {
		if (performanceRef.current.length === 0) return 0;
		const sum = performanceRef.current.reduce((acc, val) => acc + val, 0);
		return sum / performanceRef.current.length;
	};

	const isPerformanceGood = () => getAveragePerformance() < 16.67; // 60fps

	return {
		startPerformanceMonitoring,
		getAveragePerformance,
		isPerformanceGood,
		measurements: performanceRef.current,
	};
}
