import { Navigation } from "@/components/Navigation";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { getGradient } from "@/lib/ui-patterns";
import { createFileRoute } from "@tanstack/react-router";

import CallToAction from "@/components/index/call-to-action";
import CodeSnippetGallerySection from "@/components/index/code-snippet-gallery";
import DeveloperChallengesSection from "@/components/index/developer-challenges";
import DeveloperJourneySection from "@/components/index/developer-journey";
import FeatureHighlightsSection from "@/components/index/feature-highlights";
import FeaturePreviewSection from "@/components/index/feature-preview";
import FeatureRoadmapSection from "@/components/index/feature-roadmap";
// Import all components directly without lazy loading
import Hero from "@/components/index/hero";
import HowItWorksSection from "@/components/index/how-it-works";
import IntegrationHubSection from "@/components/index/integration-hub";
import InteractiveDemoSection from "@/components/index/interactive-demo";
import LearningPathsSection from "@/components/index/learning-paths";
import ResourcesShowcase from "@/components/index/resources-showcase";
import SuccessStoriesSection from "@/components/index/success-stories";
import WhyTamatarSection from "@/components/index/why-tamatar";

// --- New: Dynamic, animated, and creative homepage ---

function Footer() {
	return (
		<footer className="w-full py-8 flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mt-8 mb-4 relative z-10">
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
		<div
			className={getGradient(
				"background",
				"relative min-h-screen flex flex-col items-center justify-center transition-colors duration-700 overflow-x-hidden pb-24",
			)}
		>
			{/* Floating Dock Navigation */}
			<div className="fixed bottom-4 left-0 w-full z-50 pointer-events-none">
				<div className="pointer-events-auto flex justify-center">
					<Navigation />
				</div>
			</div>
			{/* Hero Section */}
			<SectionWrapper>
				<Hero />
			</SectionWrapper>
			{/* Why Tamatar? Section */}
			<SectionWrapper>
				<WhyTamatarSection />
			</SectionWrapper>
			{/* Feature Highlights Section */}
			<SectionWrapper>
				<FeatureHighlightsSection />
			</SectionWrapper>
			{/* Resources Showcase Section */}
			<SectionWrapper>
				<ResourcesShowcase />
			</SectionWrapper>
			{/* Feature Preview Section */}
			<SectionWrapper>
				<FeaturePreviewSection />
			</SectionWrapper>
			{/* How It Works Section */}
			<SectionWrapper>
				<HowItWorksSection />
			</SectionWrapper>
			{/* Developer Journey Section */}
			<SectionWrapper>
				<DeveloperJourneySection />
			</SectionWrapper>
			{/* Developer Challenges Section */}
			<SectionWrapper>
				<DeveloperChallengesSection />
			</SectionWrapper>
			{/* Learning Paths Section */}
			<SectionWrapper>
				<LearningPathsSection />
			</SectionWrapper>
			{/* Code Snippet Gallery Section */}
			<SectionWrapper>
				<CodeSnippetGallerySection />
			</SectionWrapper>
			{/* Interactive Demo Section */}
			<SectionWrapper>
				<InteractiveDemoSection />
			</SectionWrapper>
			{/* Integration Hub Section */}
			<SectionWrapper>
				<IntegrationHubSection />
			</SectionWrapper>
			{/* Success Stories Section */}
			<SectionWrapper>
				<SuccessStoriesSection />
			</SectionWrapper>
			{/* Feature Roadmap Section */}
			<SectionWrapper>
				<FeatureRoadmapSection />
			</SectionWrapper>
			{/* Call To Action Section */}
			<SectionWrapper
				animated={true}
				animationProps={{
					initial: { opacity: 0, y: 60 },
					whileInView: { opacity: 1, y: 0 },
					viewport: { once: true },
					transition: { duration: 1.1 },
				}}
			>
				<div className="w-full max-w-6xl mx-auto px-2 sm:px-4 md:px-8">
					<CallToAction />
				</div>
			</SectionWrapper>
			<Footer />
		</div>
	);
}
