import FloatingBackground from "@/components/ui/FloatingBackground";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import {
	useScrollAnimation,
	useStaggeredAnimation,
} from "@/hooks/useAnimations";
import type { FloatingItem } from "@/lib/ui-patterns";
import {
	ArrowRight,
	Code,
	FileText,
	Globe,
	Heart,
	MessageSquare,
	Rocket,
	Trophy,
	Users,
	Zap,
} from "lucide-react";
import { motion } from "motion/react";

const floatingItems: FloatingItem[] = [
	{
		className: "top-16 left-12 rotate-12",
		icon: <Globe className="w-6 h-6 text-blue-500" />,
		delay: "0s",
		key: "float-globe-demo",
	},
	{
		className: "top-24 right-16 -rotate-12",
		icon: <Code className="w-6 h-6 text-green-500" />,
		delay: "1s",
		key: "float-code-demo",
	},
	{
		className: "bottom-16 left-20 rotate-6",
		icon: <Trophy className="w-6 h-6 text-yellow-500" />,
		delay: "2s",
		key: "float-trophy-demo",
	},
	{
		className: "bottom-24 right-12 -rotate-6",
		icon: <Heart className="w-6 h-6 text-red-500" />,
		delay: "1.5s",
		key: "float-heart-demo",
	},
];

const demoScenarios = [
	{
		title: "Daily Log Entry",
		description:
			"See how a typical daily development log looks with rich formatting, code snippets, and progress tracking.",
		mockup: {
			type: "log",
			author: "You",
			time: "Just now",
			content:
				"🚀 Implemented user authentication today! Learned about JWT tokens and secure password hashing.",
			tags: ["React", "Node.js", "Security"],
			likes: "—",
			comments: "—",
		},
		icon: <FileText className="w-6 h-6 text-blue-500" />,
		color: "blue",
	},
	{
		title: "Portfolio Generation",
		description:
			"Watch your daily logs automatically transform into a beautiful developer portfolio.",
		mockup: {
			type: "portfolio",
			title: "Your Developer Portfolio",
			subtitle: "Automatically generated from your daily progress",
			sections: ["About", "Journey", "Projects", "Skills"],
		},
		icon: <Globe className="w-6 h-6 text-purple-500" />,
		color: "purple",
	},
	{
		title: "Community Interaction",
		description:
			"Discover how developers connect, share feedback, and learn from each other's journeys.",
		mockup: {
			type: "community",
			interactions: [
				{
					type: "comment",
					text: "Great progress on the auth system!",
					id: "comment-1",
				},
				{ type: "like", count: 12, id: "like-1" },
				{ type: "follow", text: "2 new followers", id: "follow-1" },
			],
		},
		icon: <Users className="w-6 h-6 text-green-500" />,
		color: "green",
	},
];

const getColorClasses = (color: string) => {
	const colors = {
		blue: "border-blue-500/30 bg-blue-500/5",
		purple: "border-purple-500/30 bg-purple-500/5",
		green: "border-green-500/30 bg-green-500/5",
	};
	return colors[color as keyof typeof colors] || colors.blue;
};

export default function InteractiveDemoSection() {
	const titleAnimation = useScrollAnimation("fadeInUp");
	const demosAnimation = useStaggeredAnimation("fadeInUp", "medium", 0.2);

	return (
		<div className="relative py-20 px-4 overflow-hidden">
			<FloatingBackground items={floatingItems} />

			<div className="relative z-10 max-w-6xl mx-auto">
				{" "}
				<motion.div
					{...titleAnimation.animationProps}
					className="text-center mb-16"
				>
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/20 mb-6">
						<Rocket className="w-4 h-4 text-cyan-400" />
						<span className="text-sm font-medium text-cyan-400">
							Interactive Demo
						</span>
					</div>
					<h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
						See Tamatar in Action
					</h2>
					<p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
						Experience what it's like to use Tamatar with these interactive
						previews of core features.
					</p>
				</motion.div>
				<motion.div {...demosAnimation.containerProps} className="space-y-12">
					{demoScenarios.map((demo, index) => (
						<motion.div
							key={demo.title}
							{...demosAnimation.itemProps}
							className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
						>
							{/* Content */}
							<div className="flex-1">
								<GlassCard
									variant="subtle"
									className="p-8 border border-gray-200/30 dark:border-gray-700/30"
								>
									<div className="flex items-center gap-3 mb-6">
										<div
											className={`w-12 h-12 rounded-xl ${getColorClasses(demo.color)} flex items-center justify-center`}
										>
											{demo.icon}
										</div>
										<div>
											<h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
												{demo.title}
											</h3>
											<Badge className="mt-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
												Try it now
											</Badge>
										</div>
									</div>

									<p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
										{demo.description}
									</p>

									<button
										type="button"
										className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
									>
										<span>Try Interactive Demo</span>
										<ArrowRight className="w-5 h-5" />
									</button>
								</GlassCard>
							</div>

							{/* Mockup */}
							<div className="flex-1 max-w-lg">
								<GlassCard
									className={`p-6 ${getColorClasses(demo.color)} border`}
								>
									{demo.mockup.type === "log" && (
										<div className="space-y-4">
											<div className="flex items-center gap-3">
												<div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
													You
												</div>
												<div>
													<div className="font-semibold text-gray-900 dark:text-gray-100">
														{demo.mockup.author}
													</div>
													<div className="text-sm text-gray-500 dark:text-gray-400">
														{demo.mockup.time}
													</div>
												</div>
											</div>
											<p className="text-gray-700 dark:text-gray-300">
												{demo.mockup.content}
											</p>
											<div className="flex flex-wrap gap-2">
												{demo.mockup.tags?.map((tag) => (
													<Badge
														key={tag}
														variant="secondary"
														className="text-xs"
													>
														{tag}
													</Badge>
												))}
											</div>{" "}
											<div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
												<span className="flex items-center gap-1">
													<Heart className="w-4 h-4" />
													{demo.mockup.likes}
												</span>
												<span className="flex items-center gap-1">
													<MessageSquare className="w-4 h-4" />
													{demo.mockup.comments}
												</span>
											</div>
										</div>
									)}
									{demo.mockup.type === "portfolio" && (
										<div className="space-y-4">
											<div className="text-center">
												<h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">
													{demo.mockup.title}
												</h4>
												<p className="text-sm text-gray-600 dark:text-gray-400">
													{demo.mockup.subtitle}
												</p>
											</div>
											<div className="grid grid-cols-2 gap-2">
												{demo.mockup.sections?.map((section) => (
													<div
														key={section}
														className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-center text-sm font-medium text-gray-700 dark:text-gray-300"
													>
														{section}
													</div>
												))}
											</div>
											<div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
												<Globe className="w-4 h-4" />
												<span>yourname.tamatar.dev</span>
											</div>
										</div>
									)}{" "}
									{demo.mockup.type === "community" && (
										<div className="space-y-3">
											{demo.mockup.interactions?.map((interaction) => (
												<div
													key={interaction.id}
													className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
												>
													{interaction.type === "comment" && (
														<>
															<MessageSquare className="w-4 h-4 text-blue-500" />
															<span className="text-sm text-gray-700 dark:text-gray-300">
																{interaction.text}
															</span>
														</>
													)}
													{interaction.type === "like" && (
														<>
															<Heart className="w-4 h-4 text-red-500" />
															<span className="text-sm text-gray-700 dark:text-gray-300">
																{interaction.count} developers liked your
																progress
															</span>
														</>
													)}
													{interaction.type === "follow" && (
														<>
															<Users className="w-4 h-4 text-green-500" />
															<span className="text-sm text-gray-700 dark:text-gray-300">
																{interaction.text}
															</span>
														</>
													)}
												</div>
											))}
										</div>
									)}
								</GlassCard>
							</div>
						</motion.div>
					))}
				</motion.div>{" "}
				<motion.div
					{...titleAnimation.animationProps}
					className="text-center mt-16"
				>
					<GlassCard className="p-8 max-w-2xl mx-auto border border-gray-200/30 dark:border-gray-700/30">
						<h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
							Ready to Start Your Journey?
						</h3>
						<p className="text-gray-600 dark:text-gray-400 mb-6">
							Join the developers already building their future with Tamatar.
						</p>
						<button
							type="button"
							className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
						>
							<span className="flex items-center gap-2">
								<Zap className="w-5 h-5" />
								Get Started Today
							</span>
						</button>
					</GlassCard>
				</motion.div>
			</div>
		</div>
	);
}
