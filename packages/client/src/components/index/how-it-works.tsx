import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { UserPlus, PenTool, Network, Trophy } from "lucide-react";

const floatingItems = [
	{
		className: "top-16 left-12 rotate-12",
		icon: <UserPlus className="w-6 h-6 text-blue-500" />,
		delay: "0s",
		key: "float-user-how",
	},
	{
		className: "top-24 right-16 -rotate-12",
		icon: <PenTool className="w-6 h-6 text-green-500" />,
		delay: "1s",
		key: "float-pen-how",
	},
	{
		className: "bottom-16 left-16 rotate-6",
		icon: <Network className="w-6 h-6 text-purple-500" />,
		delay: "2s",
		key: "float-network-how",
	},
	{
		className: "bottom-24 right-12 -rotate-6",
		icon: <Trophy className="w-6 h-6 text-yellow-500" />,
		delay: "1.5s",
		key: "float-trophy-how",
	},
];

const steps = [
	{
		title: "Create Your Profile",
		desc: "Sign up and set up your developer profile with your tech stack and goals.",
		icon: "👤",
	},
	{
		title: "Log Daily Progress",
		desc: "Share what you built, learned, or achieved today. Add code snippets, screenshots, and resources.",
		icon: "📝",
	},
	{
		title: "Connect & Grow",
		desc: "Follow other developers, get feedback on your work, and build your professional network.",
		icon: "🌱",
	},
	{
		title: "Build Your Portfolio",
		desc: "Your daily logs automatically create a stunning portfolio showcasing your journey and skills.",
		icon: "🏆",
	},
];

export default function HowItWorksSection() {
	return (
		<section className="relative w-full flex flex-col items-center justify-center py-20 px-4 overflow-hidden">
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
						<Card className="glass-effect hidden md:block dark:glass-effect-dark p-3 hover:scale-110 transition-transform duration-300 opacity-50">
							{item.icon}
						</Card>
					</motion.div>
				))}
			</div>

			<div className="relative z-10 max-w-3xl mx-auto text-center mb-12">				<h2 className="text-3xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient-x">
					How Tamatar Works
				</h2>
				<p className="text-lg text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
					Start your developer journey in four simple steps and watch your progress come to life.
				</p>
			</div>
			<div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl mx-auto">
				{steps.map((step, i) => (
					<motion.div
						key={step.title}
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 * i, duration: 0.8 }}
						className="flex-1 bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl backdrop-blur-md p-8 flex flex-col items-center"
					>
						<div className="text-4xl mb-4">{step.icon}</div>
						<div className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-100">
							{step.title}
						</div>
						<div className="text-gray-600 dark:text-gray-300 text-base">
							{step.desc}
						</div>
					</motion.div>
				))}
			</div>
		</section>
	);
}
