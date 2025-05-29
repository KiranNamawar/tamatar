import CallToAction from "@/components/index/call-to-action";
import Hero from "@/components/index/hero";
import HowItWorksSection from "@/components/index/how-it-works";
import InspirationSection from "@/components/index/inspiration";
import StatsSection from "@/components/index/stats";
import TestimonialsSection from "@/components/index/testimonials";

import { Navigation } from "@/components/Navigation";
import DemoGallerySection from "@/components/index/demo-gallery";
import FeatureHighlightsSection from "@/components/index/feature-highlights";
import WhyTamatarSection from "@/components/index/why-tamatar";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";

// --- New: Dynamic, animated, and creative homepage ---

function Footer() {
	return (
		<footer className="w-full py-8 flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mt-8">
			<div className="flex gap-4 items-center">
				<a
					href="https://github.com/tamatar-dev"
					target="_blank"
					rel="noopener noreferrer"
					className="hover:text-blue-500 transition-colors"
				>
					GitHub
				</a>
				<span>·</span>
				<a href="/privacy" className="hover:text-blue-500 transition-colors">
					Privacy
				</a>
				<span>·</span>
				<a href="/terms" className="hover:text-blue-500 transition-colors">
					Terms
				</a>
			</div>
			<div>
				© {new Date().getFullYear()} Tamatar. Built with ❤️ for developers.
			</div>
		</footer>
	);
}

export const Route = createFileRoute("/")({
	component: TamatarHomeUltimate,
});

export default function TamatarHomeUltimate() {
	return (
		<div className="relative min-h-screen flex flex-col items-center justify-center transition-colors duration-700 overflow-x-hidden bg-gradient-to-br from-orange-200 via-yellow-100 to-pink-100 dark:bg-gradient-to-br dark:from-[#23243a] dark:via-[#181c24] dark:to-[#1a2a33]">
			{/* Floating Theme Toggle */}
			<div className="fixed top-4 right-4 z-50">
				<ModeToggle />
			</div>

			{/* Floating Dock Navigation */}
			<div className="fixed bottom-0 left-0 w-full z-50 pointer-events-none">
				<div className="pointer-events-auto flex justify-center">
					<Navigation />
				</div>
			</div>

			{/* Hero Section */}
			<div className="relative w-full">
				<Hero />
			</div>

			{/* Why Tamatar? Section */}
			<div className="relative w-full">
				<WhyTamatarSection />
			</div>

			{/* Feature Highlights Section */}
			<div className="relative w-full">
				<FeatureHighlightsSection />
			</div>

			{/* Demo Gallery Section */}
			<div className="relative w-full">
				<DemoGallerySection />
			</div>

			{/* How It Works Section */}
			<div className="relative w-full">
				<HowItWorksSection />
			</div>

			{/* Stats Section */}
			<div className="relative w-full">
				<StatsSection />
			</div>

			{/* Inspiration Section */}
			<div className="relative w-full">
				<InspirationSection />
			</div>

			{/* Testimonials Section */}
			<div className="relative w-full">
				<TestimonialsSection />
			</div>

			{/* Call To Action Section */}
			<div className="relative w-full">
				<motion.div
					initial={{ opacity: 0, y: 60 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 1.1 }}
					className="w-full max-w-6xl mx-auto px-2 sm:px-4 md:px-8"
				>
					<CallToAction />
				</motion.div>
			</div>

			<Footer />
		</div>
	);
}
