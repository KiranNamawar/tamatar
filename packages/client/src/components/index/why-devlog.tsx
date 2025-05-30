import FloatingBackground from "@/components/ui/FloatingBackground";
import { GlassCard } from "@/components/ui/glass-card";
import {
	useScrollAnimation,
	useStaggeredAnimation,
} from "@/hooks/useAnimations";
import type { FloatingItem } from "@/lib/ui-patterns";
import {
	Coffee,
	Flame,
	Gem,
	Lightbulb,
	Rocket,
	Target,
	Users,
	Zap,
} from "lucide-react";
import { motion } from "motion/react";

const floatingItems: FloatingItem[] = [
	{
		className: "top-16 left-12 rotate-12",
		icon: <Target className="w-6 h-6 text-emerald-500" />,
		delay: "0s",
		key: "float-target-why",
	},
	{
		className: "top-24 right-20 -rotate-12",
		icon: <Coffee className="w-6 h-6 text-amber-600" />,
		delay: "1s",
		key: "float-coffee-why",
	},
	{
		className: "bottom-16 left-20 rotate-6",
		icon: <Gem className="w-6 h-6 text-cyan-500" />,
		delay: "2s",
		key: "float-gem-why",
	},
	{
		className: "bottom-24 right-12 -rotate-6",
		icon: <Flame className="w-6 h-6 text-orange-500" />,
		delay: "1.5s",
		key: "float-flame-why",
	},
];

const features = [
	{
		icon: <Lightbulb className="w-8 h-8 text-orange-400" />,
		title: "Build in Public",
		desc: "Share your journey, inspire others, and get noticed for your work.",
	},
	{
		icon: <Zap className="w-8 h-8 text-pink-500" />,
		title: "Celebrate Every Win",
		desc: "Log daily progress, celebrate small wins, and keep your motivation high.",
	},
	{
		icon: <Users className="w-8 h-8 text-blue-500" />,
		title: "Grow Your Network",
		desc: "Connect with fellow devs, find collaborators, and get feedback.",
	},
	{
		icon: <Rocket className="w-8 h-8 text-green-500" />,
		title: "AI-powered Insights",
		desc: "Let AI summarize your progress and suggest what to learn next.",
	},
];

export default function WhyDevLogSection() {
	const titleAnimation = useScrollAnimation("fadeInUp");
	const featuresAnimation = useStaggeredAnimation("fadeInUp", "medium", 0.15);

	return (
		<div className="relative">
			<FloatingBackground items={floatingItems} />{" "}
			<div className="relative z-10 max-w-5xl mx-auto text-center mb-12">
				<motion.h2
					{...titleAnimation.animationProps}
					className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent animate-gradient-x"
				>
					Why DevLog?
				</motion.h2>
				<motion.p
					{...titleAnimation.animationProps}
					className="text-lg text-gray-700 dark:text-gray-200 max-w-2xl mx-auto"
				>
					The developer playground for building, sharing, and growing—together.
				</motion.p>
			</div>
			<motion.div
				{...featuresAnimation.containerProps}
				className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full max-w-6xl mx-auto"
			>
				{features.map((feature) => (
					<motion.div key={feature.title} {...featuresAnimation.itemProps}>
						<GlassCard
							variant="subtle"
							className="p-6 md:p-8 flex flex-col items-center hover:scale-[1.02] transition-transform h-full"
						>
							<div className="mb-4">{feature.icon}</div>
							<div className="font-bold text-xl mb-2 text-gray-800 dark:text-gray-100 text-center">
								{feature.title}
							</div>
							<div className="text-gray-600 dark:text-gray-300 text-base text-center leading-relaxed">
								{feature.desc}
							</div>
						</GlassCard>
					</motion.div>
				))}
			</motion.div>
		</div>
	);
}
