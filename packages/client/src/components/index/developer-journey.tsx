import FloatingBackground from "@/components/ui/FloatingBackground";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import {
	useScrollAnimation,
	useStaggeredAnimation,
} from "@/hooks/useAnimations";
import type { FloatingItem } from "@/lib/ui-patterns";
import {
	ArrowRight,
	CheckCircle,
	Clock,
	Coffee,
	FileText,
	Heart,
	PenTool,
	Rocket,
	Target,
	Users,
	Zap,
} from "lucide-react";
import { motion } from "motion/react";

const floatingItems: FloatingItem[] = [
	{
		className: "top-16 left-12 rotate-12",
		icon: <Target className="w-6 h-6 text-green-500" />,
		delay: "0s",
		key: "float-target-journey",
	},
	{
		className: "top-24 right-16 -rotate-12",
		icon: <Coffee className="w-6 h-6 text-amber-500" />,
		delay: "1s",
		key: "float-coffee-journey",
	},
	{
		className: "bottom-16 left-20 rotate-6",
		icon: <Heart className="w-6 h-6 text-red-500" />,
		delay: "2s",
		key: "float-heart-journey",
	},
	{
		className: "bottom-24 right-12 -rotate-6",
		icon: <Rocket className="w-6 h-6 text-blue-500" />,
		delay: "1.5s",
		key: "float-rocket-journey",
	},
];

const journeySteps = [
	{
		step: "01",
		title: "Start Your Journey",
		description:
			"Create your developer profile and set your learning goals. Tell us what you want to achieve.",
		icon: <PenTool className="w-8 h-8 text-blue-500" />,
		color: "blue",
		features: ["Profile setup", "Goal setting", "Tech stack selection"],
	},
	{
		step: "02",
		title: "Log Your Progress",
		description:
			"Document your daily coding activities, breakthroughs, and challenges. Share what you learned.",
		icon: <FileText className="w-8 h-8 text-green-500" />,
		color: "green",
		features: ["Daily logging", "Code snippets", "Learning notes"],
	},
	{
		step: "03",
		title: "Connect & Collaborate",
		description:
			"Join a community of developers, get feedback on your work, and discover new opportunities.",
		icon: <Users className="w-8 h-8 text-purple-500" />,
		color: "purple",
		features: ["Developer network", "Feedback system", "Collaboration"],
	},
	{
		step: "04",
		title: "Build Your Portfolio",
		description:
			"Your journey automatically becomes a stunning portfolio that showcases your growth to the world.",
		icon: <Rocket className="w-8 h-8 text-orange-500" />,
		color: "orange",
		features: ["Auto portfolio", "Skills showcase", "Career growth"],
	},
];

const getColorClasses = (color: string) => {
	const colors = {
		blue: {
			bg: "bg-blue-500/10",
			border: "border-blue-500/20",
			text: "text-blue-400",
			gradient: "from-blue-500/20 to-blue-600/20",
		},
		green: {
			bg: "bg-green-500/10",
			border: "border-green-500/20",
			text: "text-green-400",
			gradient: "from-green-500/20 to-green-600/20",
		},
		purple: {
			bg: "bg-purple-500/10",
			border: "border-purple-500/20",
			text: "text-purple-400",
			gradient: "from-purple-500/20 to-purple-600/20",
		},
		orange: {
			bg: "bg-orange-500/10",
			border: "border-orange-500/20",
			text: "text-orange-400",
			gradient: "from-orange-500/20 to-orange-600/20",
		},
	};
	return colors[color as keyof typeof colors] || colors.blue;
};

export default function DeveloperJourneySection() {
	const titleAnimation = useScrollAnimation("fadeInUp");
	const stepsAnimation = useStaggeredAnimation("fadeInUp", "medium", 0.2);

	return (
		<div className="relative py-20 px-4 overflow-hidden">
			<FloatingBackground items={floatingItems} />

			<div className="relative z-10 max-w-6xl mx-auto">
				{" "}
				<motion.div
					{...titleAnimation.animationProps}
					className="text-center mb-16"
				>
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 border border-green-500/20 mb-6">
						<Target className="w-4 h-4 text-green-400" />
						<span className="text-sm font-medium text-green-400">
							Your Path to Success
						</span>
					</div>
					<h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
						Your Developer Journey
					</h2>
					<p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
						From first commit to dream job - discover how Tamatar transforms
						your daily coding into a powerful career narrative.
					</p>
				</motion.div>
				<motion.div {...stepsAnimation.containerProps} className="space-y-12">
					{journeySteps.map((step, index) => {
						const colors = getColorClasses(step.color);
						const isEven = index % 2 === 0;

						return (
							<motion.div
								key={step.step}
								{...stepsAnimation.itemProps}
								className={`flex flex-col lg:flex-row items-center gap-8 ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}
							>
								{/* Content */}
								<div className="flex-1 max-w-2xl">
									<GlassCard
										variant="subtle"
										className="p-8 h-full border border-gray-200/30 dark:border-gray-700/30"
									>
										<div className="flex items-center gap-4 mb-6">
											<div
												className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center border ${colors.border}`}
											>
												{step.icon}
											</div>
											<div>
												<Badge
													className={`${colors.bg} ${colors.text} border ${colors.border} mb-2`}
												>
													Step {step.step}
												</Badge>
												<h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
													{step.title}
												</h3>
											</div>
										</div>

										<p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
											{step.description}
										</p>

										<div className="space-y-3">
											{step.features.map((feature) => (
												<div key={feature} className="flex items-center gap-3">
													<CheckCircle className={`w-5 h-5 ${colors.text}`} />
													<span className="text-gray-600 dark:text-gray-400">
														{feature}
													</span>
												</div>
											))}
										</div>
									</GlassCard>
								</div>

								{/* Visual Element */}
								<div className="flex-1 max-w-md">
									<div className="relative">
										<div
											className={`w-64 h-64 mx-auto rounded-3xl bg-gradient-to-br ${colors.gradient} border-2 ${colors.border} flex items-center justify-center backdrop-blur-sm`}
										>
											<div className="text-6xl font-bold text-gray-300 dark:text-gray-600">
												{step.step}
											</div>
										</div>
										{index < journeySteps.length - 1 && (
											<div className="hidden lg:block absolute -bottom-12 left-1/2 transform -translate-x-1/2">
												<ArrowRight className="w-8 h-8 text-gray-400 rotate-90" />
											</div>
										)}
									</div>
								</div>
							</motion.div>
						);
					})}
				</motion.div>{" "}
				<motion.div
					{...titleAnimation.animationProps}
					className="text-center mt-20"
				>
					<div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-600 mb-6">
						<Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
						<span className="text-gray-600 dark:text-gray-400 font-medium">
							Ready to start building your developer story?
						</span>
					</div>
					<Button
						size="lg"
						className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
					>
						<span className="flex items-center gap-2">
							<Zap className="w-5 h-5" />
							Begin Your Journey
						</span>
					</Button>
				</motion.div>
			</div>
		</div>
	);
}
