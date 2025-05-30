import FloatingBackground from "@/components/ui/FloatingBackground";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { FloatingItem } from "@/lib/ui-patterns";
import {
	createTamatarButtonClass,
	getTamatarGradient,
} from "@/lib/ui-patterns";
import {
	BookOpen,
	Calendar,
	Code,
	GitBranch,
	Link,
	MessageCircle,
	Rocket,
	Star,
	Trophy,
	Users,
	Zap,
} from "lucide-react";
import { motion } from "motion/react";

const floatingItems: FloatingItem[] = [
	{
		className: "top-20 left-10 rotate-12",
		icon: <Code className="w-8 h-8 text-blue-500" />,
		delay: "0s",
		key: "float-code",
	},
	{
		className: "top-40 right-20 -rotate-12",
		icon: <GitBranch className="w-8 h-8 text-green-500" />,
		delay: "1s",
		key: "float-git",
	},
	{
		className: "bottom-32 left-20 rotate-6",
		icon: <Rocket className="w-8 h-8 text-purple-500" />,
		delay: "2s",
		key: "float-rocket",
	},
	{
		className: "bottom-40 right-10 -rotate-6",
		icon: <Trophy className="w-8 h-8 text-yellow-500" />,
		delay: "3s",
		key: "float-trophy",
	},
	{
		className: "top-60 left-1/4 rotate-3",
		icon: <BookOpen className="w-8 h-8 text-indigo-500" />,
		delay: "1.5s",
		key: "float-book",
	},
	{
		className: "top-96 right-16 -rotate-3",
		icon: <Users className="w-8 h-8 text-pink-500" />,
		delay: "2.5s",
		key: "float-users",
	},
];

const Hero = () => {
	return (
		<section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-2 sm:px-4 md:px-8 py-12 sm:py-20 w-full">
			{/* Background Gradient Orbs */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
				<div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
				<div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
			</div>{" "}
			{/* Floating Elements with motion */}
			<FloatingBackground items={floatingItems} />
			{/* Main Content */}
			<div className="relative z-10 text-center w-full max-w-7xl mx-auto flex flex-col items-center">
				{/* Header Badge */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="mb-8"
				>
					<Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 text-sm font-medium">
						<Zap className="w-4 h-4 mr-2" />
						The Future of Developer Progress Tracking
					</Badge>
				</motion.div>

				{/* Main Title */}
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
					className="w-full mb-8"
				>
					<h1
						className={`text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold mb-6 ${getTamatarGradient("primary", "text")} drop-shadow-[0_2px_8px_rgba(0,0,0,0.22)] animate-gradient-x break-words leading-tight`}
					>
						Tamatar
					</h1>
					<div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl text-gray-700 dark:text-white/90 mb-8 font-light">
						Where Developers{" "}
						<span className="font-bold text-blue-600 dark:text-blue-400">
							Build in Public
						</span>
					</div>
				</motion.div>

				{/* Subtitle */}
				<motion.div
					className="mb-12"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 0.8 }}
				>
					<p className="text-lg xs:text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-white/80 max-w-4xl mx-auto leading-relaxed px-2">
						Share your daily coding journey, connect with fellow developers, and
						build an amazing portfolio that showcases your growth—one commit at
						a time.
					</p>
				</motion.div>

				{/* Feature Preview Cards */}
				<motion.div
					className="mb-12 w-full"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5, duration: 0.8 }}
				>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
						<Card className="glass-effect-light dark:glass-effect-dark p-6 hover:scale-105 transition-all duration-300 border-2 border-blue-200 dark:border-blue-800">
							<Calendar className="w-8 h-8 text-blue-500 mb-4 mx-auto" />
							<h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">
								Daily Progress
							</h3>
							<p className="text-gray-600 dark:text-gray-300 text-sm">
								Track what you build, learn, and achieve every day
							</p>
						</Card>

						<Card className="glass-effect-light dark:glass-effect-dark p-6 hover:scale-105 transition-all duration-300 border-2 border-purple-200 dark:border-purple-800">
							<GitBranch className="w-8 h-8 text-purple-500 mb-4 mx-auto" />
							<h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">
								Git Integration
							</h3>
							<p className="text-gray-600 dark:text-gray-300 text-sm">
								Connect your repos and showcase your commits
							</p>
						</Card>

						<Card className="glass-effect-light dark:glass-effect-dark p-6 hover:scale-105 transition-all duration-300 border-2 border-green-200 dark:border-green-800">
							<Users className="w-8 h-8 text-green-500 mb-4 mx-auto" />
							<h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">
								Developer Community
							</h3>
							<p className="text-gray-600 dark:text-gray-300 text-sm">
								Get feedback and collaborate with other devs
							</p>
						</Card>
					</div>
				</motion.div>

				{/* Live Demo Preview */}
				<motion.div
					className="mb-12 w-full"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.7, duration: 0.8 }}
				>
					<Card className="glass-effect-light dark:glass-effect-dark p-6 max-w-4xl mx-auto text-left border-2 border-indigo-200 dark:border-indigo-800">
						<div className="flex items-center gap-3 mb-4">
							<div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
								JD
							</div>
							<div>
								<h4 className="font-bold text-gray-800 dark:text-white">
									@john_dev
								</h4>
								<p className="text-sm text-gray-500 dark:text-gray-400">
									2 hours ago
								</p>
							</div>
							<Badge className="ml-auto bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
								<Star className="w-3 h-3 mr-1" />7 day streak
							</Badge>
						</div>

						<div className="space-y-3">
							<p className="text-gray-700 dark:text-gray-200">
								🚀 Just deployed my React dashboard with real-time analytics!
							</p>

							<div className="flex flex-wrap gap-2">
								<Badge variant="secondary" className="text-xs">
									React
								</Badge>
								<Badge variant="secondary" className="text-xs">
									TypeScript
								</Badge>
								<Badge variant="secondary" className="text-xs">
									D3.js
								</Badge>
								<Badge variant="secondary" className="text-xs">
									Tailwind
								</Badge>
							</div>

							<div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 font-mono text-sm">
								<div className="text-green-600 dark:text-green-400">
									✓ feat: add real-time dashboard
								</div>
								<div className="text-blue-600 dark:text-blue-400">
									✓ fix: improve chart responsiveness
								</div>
								<div className="text-purple-600 dark:text-purple-400">
									✓ docs: update API documentation
								</div>
							</div>

							<div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
								<button
									type="button"
									className="flex items-center gap-1 hover:text-red-500"
								>
									<span>❤️</span> 24
								</button>
								<button
									type="button"
									className="flex items-center gap-1 hover:text-blue-500"
								>
									<MessageCircle className="w-4 h-4" /> 8
								</button>
								<button
									type="button"
									className="flex items-center gap-1 hover:text-gray-700"
								>
									<Link className="w-4 h-4" /> Share
								</button>
							</div>
						</div>
					</Card>
				</motion.div>

				{/* CTA Buttons */}
				<motion.div
					className="flex flex-col sm:flex-row gap-6 justify-center items-center"
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.9, duration: 0.7 }}
				>
					{" "}
					<Button
						size="lg"
						className={createTamatarButtonClass(
							"primary",
							"px-8 py-4 text-lg shadow-2xl hover:shadow-orange-500/25",
						)}
						asChild
					>
						<a href="/auth/signup">
							<Rocket className="w-5 h-5 mr-2" />
							Start Building Today
						</a>
					</Button>
					<Button
						variant="outline"
						size="lg"
						className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-4 text-lg"
						asChild
					>
						<a href="/resources">
							<BookOpen className="w-5 h-5 mr-2" />
							Browse Resources
						</a>
					</Button>
				</motion.div>

				{/* Stats */}
				<motion.div
					className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 1.1, duration: 0.8 }}
				>
					<div className="text-center">
						<div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
							15K+
						</div>
						<div className="text-sm text-gray-500 dark:text-gray-400">
							Developers
						</div>
					</div>
					<div className="text-center">
						<div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
							2.5M+
						</div>
						<div className="text-sm text-gray-500 dark:text-gray-400">
							Daily Logs
						</div>
					</div>
					<div className="text-center">
						<div className="text-3xl font-bold text-green-600 dark:text-green-400">
							50K+
						</div>
						<div className="text-sm text-gray-500 dark:text-gray-400">
							Projects
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default Hero;
