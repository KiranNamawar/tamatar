import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "motion/react";
import { Sparkles, Rocket, ArrowUp, Play } from "lucide-react";

const floatingItems = [
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
	return (
		<section className="relative py-24 px-6 gradient-tomato dark:gradient-tomato-dark overflow-hidden text-gray-800 dark:text-white">
			{/* Floating Elements */}
			<div className="absolute inset-0 w-full h-full pointer-events-none z-0">
				{floatingItems.map((item, i) => (
					<motion.div
						key={item.key}
						className={`absolute ${item.className} animate-float`}
						style={{ animationDelay: item.delay }}
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 * i, duration: 0.8, type: "spring" }}
					>
						<Card className="glass-effect hidden md:block dark:glass-effect-dark p-3 hover:scale-110 transition-transform duration-300 opacity-20">
							{item.icon}
						</Card>
					</motion.div>
				))}
			</div>

			{/* Background Pattern */}
			<div
				className="absolute inset-0 opacity-10 pointer-events-none select-none"
				aria-hidden="true"
			>
				<div className="absolute top-10 left-10 w-32 h-32 bg-gray-200 dark:bg-white/20 rounded-full" />
				<div className="absolute top-40 right-20 w-24 h-24 bg-gray-200 dark:bg-white/20 rounded-full" />
				<div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gray-200 dark:bg-white/20 rounded-full" />
				<div className="absolute bottom-40 right-1/3 w-20 h-20 bg-gray-200 dark:bg-white/20 rounded-full" />
			</div>

			<div className="max-w-4xl mx-auto text-center relative z-10">
				<h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
					Start Your Tamatar Journey Today
				</h2>
				<p className="text-xl md:text-2xl text-gray-800 dark:text-white/90 mb-12 max-w-2xl mx-auto">
					Join thousands of developers documenting their progress, building in public, and growing their careers one commit at a time.
				</p>

				<div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
					<Button
						size="lg"
						className="bg-white text-blue-600 hover:bg-gray-100 border border-blue-200 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700 font-bold px-12 py-6 text-xl animate-pulse-glow"
					>
						Start Coding with Tamatar
					</Button>
					<Button
						variant="outline"
						size="lg"
						className="border-2 border-gray-700 text-gray-700 hover:bg-gray-100 dark:border-gray-300 dark:text-gray-300 dark:hover:bg-white/5 px-12 py-6 text-xl"
					>
						Explore Community
					</Button>
				</div>

				<Card className="glass-effect dark:glass-effect-dark p-8 max-w-2xl mx-auto">
					<div className="text-blue-700 dark:text-blue-300 text-lg mb-4">
						🚀 <strong>Early Access:</strong> Be among the first to shape the future of developer progress tracking
					</div>
					<div className="text-gray-700 dark:text-white/80">
						No credit card required • GitHub integration included • Export your data anytime
					</div>
				</Card>
			</div>
		</section>
	);
};

export default CallToAction;
