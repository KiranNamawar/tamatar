// Performance monitoring utilities for animations and bundle size

export interface PerformanceMetrics {
	animationFrameTime: number;
	memoryUsage?: number;
	bundleSize?: number;
	renderTime: number;
}

export class PerformanceMonitor {
	private metrics: PerformanceMetrics[] = [];
	private isMonitoring = false;

	startMonitoring() {
		if (this.isMonitoring) return;

		this.isMonitoring = true;
		this.measureAnimationPerformance();
		this.measureMemoryUsage();
	}

	stopMonitoring() {
		this.isMonitoring = false;
	}

	private measureAnimationPerformance() {
		let lastTime = performance.now();

		const measure = () => {
			if (!this.isMonitoring) return;

			const currentTime = performance.now();
			const frameTime = currentTime - lastTime;

			this.metrics.push({
				animationFrameTime: frameTime,
				renderTime: currentTime,
				memoryUsage: this.getMemoryUsage(),
			});

			// Keep only last 100 measurements
			if (this.metrics.length > 100) {
				this.metrics.shift();
			}

			lastTime = currentTime;
			requestAnimationFrame(measure);
		};

		requestAnimationFrame(measure);
	}

	private getMemoryUsage(): number | undefined {
		// @ts-ignore - performance.memory is not in all browsers
		if (performance.memory) {
			// @ts-ignore
			return performance.memory.usedJSHeapSize / 1024 / 1024; // MB
		}
		return undefined;
	}

	private measureMemoryUsage() {
		setInterval(() => {
			if (!this.isMonitoring) return;

			const memory = this.getMemoryUsage();
			if (memory && memory > 50) {
				// Warn if over 50MB
				console.warn(`High memory usage detected: ${memory.toFixed(2)}MB`);
			}
		}, 5000); // Check every 5 seconds
	}

	getMetrics(): PerformanceMetrics[] {
		return [...this.metrics];
	}

	getAverageFrameTime(): number {
		if (this.metrics.length === 0) return 0;

		const sum = this.metrics.reduce(
			(acc, metric) => acc + metric.animationFrameTime,
			0,
		);
		return sum / this.metrics.length;
	}

	logReport() {
		const avgFrameTime = this.getAverageFrameTime();
		const currentMemory = this.getMemoryUsage();

		console.group("📊 Performance Report");
		console.log(`Average frame time: ${avgFrameTime.toFixed(2)}ms`);
		console.log(`Target: 16.67ms (60fps)`);
		console.log(
			`Status: ${avgFrameTime < 16.67 ? "✅ Good" : "⚠️ Needs optimization"}`,
		);

		if (currentMemory) {
			console.log(`Current memory usage: ${currentMemory.toFixed(2)}MB`);
		}

		console.groupEnd();
	}
}

// Global instance
export const performanceMonitor = new PerformanceMonitor();

// Bundle size analysis (development only)
export function analyzeBundleSize() {
	if (process.env.NODE_ENV !== "development") {
		console.log("Bundle analysis only available in development");
		return;
	}

	// This would be enhanced with actual webpack bundle analyzer integration
	console.group("📦 Bundle Size Analysis");
	console.log("For detailed bundle analysis, run: npm run build:analyze");
	console.log("Current recommendations:");
	console.log("- framer-motion: Consider code splitting for motion components");
	console.log("- Tailwind CSS: Purging should remove unused styles");
	console.log("- Icons: Use selective imports instead of full icon libraries");
	console.groupEnd();
}

// Preload critical animations to prevent first-paint delays
export const preloadAnimations = () => {
	// Create a temporary element to trigger CSS animations loading
	const tempElement = document.createElement("div");
	tempElement.className = "aurora-bg glass";
	tempElement.style.position = "absolute";
	tempElement.style.top = "-9999px";
	tempElement.style.left = "-9999px";
	tempElement.style.width = "1px";
	tempElement.style.height = "1px";

	document.body.appendChild(tempElement);

	// Force browser to calculate styles
	window.getComputedStyle(tempElement);

	// Clean up
	setTimeout(() => {
		document.body.removeChild(tempElement);
	}, 100);
};

// Debounced resize handler for responsive animations
export const createResizeHandler = (callback: () => void, delay = 250) => {
	let timeoutId: NodeJS.Timeout;

	return () => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(callback, delay);
	};
};

// Intersection Observer with performance optimizations
export const createOptimizedObserver = (
	callback: IntersectionObserverCallback,
	options: IntersectionObserverInit = {},
) => {
	const defaultOptions = {
		rootMargin: "10px",
		threshold: 0.1,
		...options,
	};

	return new IntersectionObserver(callback, defaultOptions);
};

// Initialize performance optimizations
if (typeof window !== "undefined") {
	// Preload animations on page load
	document.addEventListener("DOMContentLoaded", preloadAnimations);

	// Set up performance monitoring
	if ("performance" in window && "PerformanceObserver" in window) {
		try {
			const perfObserver = new PerformanceObserver((list) => {
				const entries = list.getEntries();
				for (const entry of entries) {
					if (entry.entryType === "paint") {
						console.log(`${entry.name}: ${entry.startTime.toFixed(2)}ms`);
					}
				}
			});

			perfObserver.observe({ entryTypes: ["paint"] });
		} catch (e) {
			// PerformanceObserver not supported
		}
	}
}
