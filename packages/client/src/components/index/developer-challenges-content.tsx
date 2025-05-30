// filepath: c:\Users\kiran\Dev\TamatarStore\tamatar\packages\client\src\components\index\developer-challenges-content.tsx
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import {
	Award,
	Calendar,
	Code2,
	Crown,
	Flame,
	GitCommit,
	Medal,
	Sparkles,
	Star,
	Target,
	Trophy,
	Zap,
} from "lucide-react";

const challenges = [
	{
		title: "30-Day Streak Master",
		description: "Log your progress for 30 consecutive days",
		icon: <Calendar className="w-8 h-8 text-blue-500" />,
		progress: 87,
		participants: "2.3K",
		reward: "Streak Master Badge",
		difficulty: "Medium",
		timeLeft: "3 days",
		color: "blue",
	},
	{
		title: "Code Quality Champion",
		description: "Maintain high code quality in 5 different projects",
		icon: <Star className="w-8 h-8 text-yellow-500" />,
		progress: 60,
		participants: "1.8K",
		reward: "Quality Badge + Portfolio Boost",
		difficulty: "Hard",
		timeLeft: "2 weeks",
		color: "yellow",
	},
	{
		title: "Open Source Hero",
		description: "Contribute to 10 open source projects",
		icon: <GitCommit className="w-8 h-8 text-green-500" />,
		progress: 30,
		participants: "945",
		reward: "Open Source Hero Badge",
		difficulty: "Expert",
		timeLeft: "1 month",
		color: "green",
	},
	{
		title: "Learning Lightning",
		description: "Complete 5 learning modules this week",
		icon: <Zap className="w-8 h-8 text-purple-500" />,
		progress: 100,
		participants: "5.1K",
		reward: "Lightning Badge + XP Boost",
		difficulty: "Easy",
		timeLeft: "Completed!",
		color: "purple",
	},
];

const getDifficultyColor = (difficulty: string) => {
	switch (difficulty.toLowerCase()) {
		case "easy":
			return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
		case "medium":
			return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
		case "hard":
			return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
		case "expert":
			return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
		default:
			return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
	}
};

const getProgressColor = (progress: number) => {
	if (progress === 100) return "bg-green-500";
	if (progress >= 75) return "bg-blue-500";
	if (progress >= 50) return "bg-yellow-500";
	return "bg-orange-500";
};

export default function DeveloperChallengesContent() {
	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
				{challenges.map((challenge) => (
					<div key={challenge.title}>
						<GlassCard
							variant="subtle"
							className="p-6 h-full hover:scale-[1.02] transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 group focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500"
						>
							{/* Header */}
							<div className="flex items-start justify-between mb-4">
								<div className="flex items-center gap-3">
									<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform">
										{challenge.icon}
									</div>
									<div>
										<Badge className={getDifficultyColor(challenge.difficulty)}>
											{challenge.difficulty}
										</Badge>
									</div>
								</div>
								<div className="text-right">
									<div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
										{challenge.participants} joined
									</div>
								</div>
							</div>

							{/* Title & Description */}
							<h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
								{challenge.title}
							</h3>
							<p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
								{challenge.description}
							</p>

							{/* Progress Bar */}
							<div className="mb-4">
								<div className="flex justify-between items-center mb-2">
									<span className="text-sm font-medium text-gray-800 dark:text-gray-200">
										Progress
									</span>
									<span className="text-sm font-bold text-gray-900 dark:text-gray-100">
										{challenge.progress}%
									</span>
								</div>
								<div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2.5">
									{/* biome-ignore lint/a11y/useFocusableInteractive: <explanation> */}
									<div
										className={`h-2.5 rounded-full transition-all duration-500 ${getProgressColor(challenge.progress)}`}
										style={{ width: `${challenge.progress}%` }}
										role="progressbar"
										aria-valuenow={challenge.progress}
										aria-valuemin={0}
										aria-valuemax={100}
										aria-label={`Challenge progress: ${challenge.progress}%`}
									/>
								</div>
							</div>

							{/* Reward */}
							<div className="flex items-center gap-2 mb-4 p-3 bg-gradient-to-r from-purple-50/80 to-blue-50/80 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg border border-purple-200/50 dark:border-purple-700/50">
								<Award className="w-4 h-4 text-purple-600 dark:text-purple-400" />
								<span className="text-sm font-medium text-purple-800 dark:text-purple-200">
									{challenge.reward}
								</span>
							</div>

							{/* Footer */}
							<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
								<div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
									<Sparkles className="w-4 h-4" />
									<span>{challenge.timeLeft}</span>
								</div>
								{challenge.progress === 100 ? (
									<Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 w-fit">
										<Trophy className="w-3 h-3 mr-1" />
										Completed
									</Badge>
								) : (
									<button
										type="button"
										className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:outline-none w-fit"
										aria-label={`Join ${challenge.title} challenge`}
									>
										Join Challenge
									</button>
								)}
							</div>
						</GlassCard>
					</div>
				))}
			</div>

			{/* Call to Action */}
			<div className="text-center mt-16">
				<GlassCard className="p-6 md:p-8 max-w-4xl mx-auto border border-gray-200/50 dark:border-gray-700/50">
					<div className="mb-6">
						<h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
							Ready to Level Up?
						</h3>
						<p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
							Join thousands of developers who are turning their coding journey
							into an exciting adventure.
						</p>
					</div>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<button
							type="button"
							className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-orange-500 focus:outline-none"
							aria-label="Explore all developer challenges"
						>
							<span className="flex items-center gap-2 justify-center">
								<Code2 className="w-5 h-5" />
								Explore All Challenges
							</span>
						</button>
						<button
							type="button"
							className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-xl hover:border-orange-500 dark:hover:border-orange-400 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:outline-none"
							aria-label="View challenge leaderboard"
						>
							<span className="flex items-center gap-2 justify-center">
								<Medal className="w-5 h-5" />
								View Leaderboard
							</span>
						</button>
					</div>
				</GlassCard>
			</div>
		</>
	);
}
