import FloatingBackground from "@/components/ui/FloatingBackground";
import type { FloatingItem } from "@/lib/ui-patterns";
import { Brain, Lightbulb, Rocket, Target } from "lucide-react";
import LearningPathsContent from "./learning-paths-content";

const floatingItems: FloatingItem[] = [
	{
		className: "top-16 left-12 rotate-12",
		icon: <Brain className="w-6 h-6 text-purple-500" />,
		delay: "0s",
		key: "float-brain-learning",
	},
	{
		className: "top-24 right-16 -rotate-12",
		icon: <Lightbulb className="w-6 h-6 text-yellow-500" />,
		delay: "1s",
		key: "float-lightbulb-learning",
	},
	{
		className: "bottom-16 left-20 rotate-6",
		icon: <Target className="w-6 h-6 text-green-500" />,
		delay: "2s",
		key: "float-target-learning",
	},
	{
		className: "bottom-24 right-12 -rotate-6",
		icon: <Rocket className="w-6 h-6 text-blue-500" />,
		delay: "1.5s",
		key: "float-rocket-learning",
	},
];

export default function LearningPathsSection() {
	return (
		<div className="relative py-20 px-4 overflow-hidden">
			<FloatingBackground items={floatingItems} />

			<div className="relative z-10 max-w-6xl mx-auto">
				{/* Header loads immediately */}
				<div className="text-center mb-16">
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-green-500/20 border border-purple-500/30 mb-6">
						<Brain className="w-4 h-4 text-purple-500 dark:text-purple-400" />
						<span className="text-sm font-medium text-purple-600 dark:text-purple-400">
							Structured Learning
						</span>
					</div>

					<h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-blue-500 to-green-400 bg-clip-text text-transparent">
						Learning Paths
					</h2>
					<p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
						Follow curated learning paths designed by industry experts. Track
						your progress, complete projects, and build real-world skills step
						by step.
					</p>
				</div>
				{/* Content loads immediately */}
				<LearningPathsContent />
			</div>
		</div>
	);
}
