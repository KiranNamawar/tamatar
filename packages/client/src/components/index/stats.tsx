import SectionWrapper from "@/components/layout/SectionWrapper";
import FloatingBackground from "@/components/ui/FloatingBackground";
import { GlassCard } from "@/components/ui/glass-card";
import {
	useScrollAnimation,
	useStaggeredAnimation,
} from "@/hooks/useAnimations";
import type { FloatingItem } from "@/lib/ui-patterns";
import { Award, BarChart3, Database, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

const floatingItems: FloatingItem[] = [
	{
		className: "top-12 left-8 rotate-12",
		icon: <TrendingUp className="w-6 h-6 text-green-500" />,
		delay: "0s",
		key: "float-trending-stats",
	},
	{
		className: "top-20 right-12 -rotate-12",
		icon: <BarChart3 className="w-6 h-6 text-blue-500" />,
		delay: "1s",
		key: "float-chart-stats",
	},
	{
		className: "bottom-12 left-12 rotate-6",
		icon: <Database className="w-6 h-6 text-purple-500" />,
		delay: "2s",
		key: "float-database-stats",
	},
	{
		className: "bottom-20 right-8 -rotate-6",
		icon: <Award className="w-6 h-6 text-yellow-500" />,
		delay: "1.5s",
		key: "float-award-stats",
	},
];

const stats = [
	{ label: "Developers", value: "15K+", color: "text-blue-500" },
	{ label: "Daily Logs", value: "2.5M+", color: "text-purple-500" },
	{ label: "GitHub Repos", value: "50K+", color: "text-green-500" },
	{ label: "Learning Streaks", value: "180K+", color: "text-orange-500" },
];

export default function StatsSection() {
	const titleAnimation = useScrollAnimation();
	const statsAnimation = useStaggeredAnimation("scaleIn", "medium", 0.1);

	return (
		<SectionWrapper
			variant="fadeInUp"
			className="flex flex-col items-center justify-center py-16 px-4 overflow-hidden"
		>
			<FloatingBackground items={floatingItems} />

			<div className="relative z-10 max-w-4xl mx-auto text-center mb-10">
				{" "}
				<motion.h2
					{...titleAnimation.animationProps}
					className="text-2xl md:text-3xl font-extrabold mb-2 text-gray-900 dark:text-white"
				>
					Tamatar by the Numbers
				</motion.h2>
				<motion.p
					{...titleAnimation.animationProps}
					className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
				>
					Join a thriving community of developers documenting their journey and
					growing together.
				</motion.p>
			</div>

			<motion.div
				{...statsAnimation.containerProps}
				className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-3xl mx-auto"
			>
				{stats.map((stat) => (
					<motion.div key={stat.label} {...statsAnimation.itemProps}>
						<GlassCard
							variant="subtle"
							className="p-6 flex flex-col items-center justify-center h-full"
						>
							<div className={`text-3xl font-extrabold mb-2 ${stat.color}`}>
								{stat.value}
							</div>
							<div className="text-gray-700 dark:text-gray-200 text-base font-semibold">
								{stat.label}
							</div>
						</GlassCard>
					</motion.div>
				))}
			</motion.div>
		</SectionWrapper>
	);
}
