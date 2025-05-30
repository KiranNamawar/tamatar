import SectionWrapper from "@/components/layout/SectionWrapper";
import FloatingBackground from "@/components/ui/FloatingBackground";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import {
	useScrollAnimation,
	useStaggeredAnimation,
} from "@/hooks/useAnimations";
import type { FloatingItem } from "@/lib/ui-patterns";
import { ArrowUp, Play, Rocket, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const floatingItems: FloatingItem[] = [
	{
		className: "top-16 left-16 rotate-12",
		icon: <Sparkles className="w-6 h-6 text-yellow-500" />,
		delay: "0s",
		key: "float-sparkles-cta",
	},
	{
		className: "top-24 right-20 -rotate-12",
		icon: <Rocket className="w-6 h-6 text-blue-500" />,
		delay: "1s",
		key: "float-rocket-cta",
	},
	{
		className: "bottom-20 left-20 rotate-6",
		icon: <ArrowUp className="w-6 h-6 text-green-500" />,
		delay: "2s",
		key: "float-arrow-cta",
	},
	{
		className: "bottom-28 right-16 -rotate-6",
		icon: <Play className="w-6 h-6 text-purple-500" />,
		delay: "1.5s",
		key: "float-play-cta",
	},
];

const CallToAction = () => {
	const titleAnimation = useScrollAnimation();
	const buttonAnimation = useStaggeredAnimation("fadeInUp", "medium");

	return (
		<SectionWrapper
			variant="slideInLeft"
			className="py-24 px-6 gradient-tomato dark:gradient-tomato-dark overflow-hidden text-gray-800 dark:text-white"
		>
			<FloatingBackground items={floatingItems} />{" "}
			<div className="max-w-4xl mx-auto text-center relative z-10">
				<motion.h2
					{...titleAnimation.animationProps}
					className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8"
				>
					Start Your Tamatar Journey Today
				</motion.h2>{" "}
				<motion.p
					{...titleAnimation.animationProps}
					className="text-xl md:text-2xl text-gray-800 dark:text-white/90 mb-12 max-w-2xl mx-auto"
				>
					Join thousands of developers documenting their progress, building in
					public, and discovering amazing resources shared by the community.
				</motion.p>{" "}
				<motion.div
					{...buttonAnimation.itemProps}
					className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
				>
					<Button
						size="lg"
						variant="default"
						className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
						asChild
					>
						<a href="/auth/signup">Start Coding with Tamatar</a>
					</Button>
					<Button
						variant="outline"
						size="lg"
						className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-500 dark:hover:text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
						asChild
					>
						<a href="/resources">Browse Resources</a>
					</Button>
				</motion.div>{" "}
				<motion.div {...buttonAnimation.itemProps}>
					<GlassCard variant="subtle" className="p-8 max-w-2xl mx-auto">
						<div className="text-blue-700 dark:text-blue-300 text-lg mb-4">
							🚀 <strong>Early Access:</strong> Be among the first to shape the
							future of developer progress tracking
						</div>
						<div className="text-gray-700 dark:text-white/80">
							No credit card required • GitHub integration included • Export
							your data anytime
						</div>
					</GlassCard>
				</motion.div>
			</div>
		</SectionWrapper>
	);
};

export default CallToAction;
