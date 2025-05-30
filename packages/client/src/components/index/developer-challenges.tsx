import FloatingBackground from "@/components/ui/FloatingBackground";
import {
	useScrollAnimation,
	useStaggeredAnimation,
} from "@/hooks/useAnimations";
import type { FloatingItem } from "@/lib/ui-patterns";
import { Crown, Flame, Medal, Target, Trophy } from "lucide-react";
import { motion } from "motion/react";
import DeveloperChallengesContent from "./developer-challenges-content.tsx";

const floatingItems: FloatingItem[] = [
	{
		className: "top-16 left-12 rotate-12",
		icon: <Trophy className="w-6 h-6 text-yellow-500" />,
		delay: "0s",
		key: "float-trophy-challenges",
	},
	{
		className: "top-24 right-16 -rotate-12",
		icon: <Medal className="w-6 h-6 text-orange-500" />,
		delay: "1s",
		key: "float-medal-challenges",
	},
	{
		className: "bottom-16 left-20 rotate-6",
		icon: <Crown className="w-6 h-6 text-purple-500" />,
		delay: "2s",
		key: "float-crown-challenges",
	},
	{
		className: "bottom-24 right-12 -rotate-6",
		icon: <Flame className="w-6 h-6 text-red-500" />,
		delay: "1.5s",
		key: "float-flame-challenges",
	},
];

export default function DeveloperChallengesSection() {
	const titleAnimation = useScrollAnimation("fadeInUp");
	const featuresAnimation = useStaggeredAnimation("fadeInUp", "medium", 0.15);

	return (
		<div className="relative py-20 px-4 overflow-hidden">
			<FloatingBackground items={floatingItems} />

			<div className="relative z-10 max-w-6xl mx-auto">
				{/* Header loads immediately */}
				<motion.div
					{...titleAnimation.animationProps}
					className="text-center mb-16"
				>
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 border border-yellow-500/30 mb-6">
						<Target className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
						<span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
							Level Up Your Skills
						</span>
					</div>

					<h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
						Developer Challenges
					</h2>
					<p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
						Join exciting coding challenges, compete with peers, and earn badges
						while building amazing projects. Turn your daily coding into an
						adventure!
					</p>
				</motion.div>{" "}
				{/* Content loads immediately */}
				<DeveloperChallengesContent />
			</div>
		</div>
	);
}
