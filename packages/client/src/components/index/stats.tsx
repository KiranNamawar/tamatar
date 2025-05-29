import { motion } from "motion/react";
import { TrendingUp, BarChart3, Database, Award } from "lucide-react";
import { Card } from "@/components/ui/card";

const floatingItems = [
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
	return (
		<section className="relative w-full flex flex-col items-center justify-center py-16 px-4 overflow-hidden">
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
						<Card className="glass-effect hidden md:block dark:glass-effect-dark p-3 hover:scale-110 transition-transform duration-300 opacity-30">
							{item.icon}
						</Card>
					</motion.div>
				))}
			</div>

			<div className="relative z-10 max-w-4xl mx-auto text-center mb-10">
				<h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-gray-900 dark:text-white">
					Tamatar by the Numbers
				</h2>
				<p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
					Join a thriving community of developers documenting their journey and
					growing together.
				</p>
			</div>
			<div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-3xl mx-auto">
				{stats.map((stat, i) => (
					<motion.div
						key={stat.label}
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 * i, duration: 0.7 }}
						className="flex flex-col items-center justify-center bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl backdrop-blur-md p-6"
					>
						<div className={`text-3xl font-extrabold mb-2 ${stat.color}`}>
							{stat.value}
						</div>
						<div className="text-gray-700 dark:text-gray-200 text-base font-semibold">
							{stat.label}
						</div>
					</motion.div>
				))}
			</div>
		</section>
	);
}
