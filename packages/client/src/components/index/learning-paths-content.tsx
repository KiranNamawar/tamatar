import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import {
	BookOpen,
	Code,
	Database,
	Globe,
	PlayCircle,
	Rocket,
	Star,
	Target,
} from "lucide-react";

const learningPaths = [
	{
		title: "Frontend Mastery",
		description: "Complete guide from HTML basics to React advanced patterns",
		icon: <Globe className="w-8 h-8 text-blue-500" />,
		duration: "3-4 months",
		difficulty: "Beginner to Advanced",
		modules: 12,
		students: "15.2K",
		progress: 0,
		topics: ["HTML/CSS", "JavaScript", "React", "TypeScript", "Next.js"],
		color: "blue",
		featured: true,
	},
	{
		title: "Backend Engineering",
		description: "Master server-side development with modern technologies",
		icon: <Database className="w-8 h-8 text-green-500" />,
		duration: "4-5 months",
		difficulty: "Intermediate",
		modules: 15,
		students: "12.8K",
		progress: 25,
		topics: ["Node.js", "PostgreSQL", "APIs", "Docker", "AWS"],
		color: "green",
		featured: false,
	},
	{
		title: "Full-Stack Journey",
		description: "End-to-end development from database to deployment",
		icon: <Code className="w-8 h-8 text-purple-500" />,
		duration: "6-8 months",
		difficulty: "Intermediate to Advanced",
		modules: 20,
		students: "9.5K",
		progress: 60,
		topics: ["React", "Node.js", "MongoDB", "GraphQL", "DevOps"],
		color: "purple",
		featured: false,
	},
];

const getDifficultyColor = (difficulty: string) => {
	if (difficulty.includes("Beginner"))
		return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
	if (difficulty.includes("Intermediate"))
		return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
	if (difficulty.includes("Advanced"))
		return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
	return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
};

export default function LearningPathsContent() {
	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
				{learningPaths.map((path) => (
					<div key={path.title}>
						<GlassCard
							variant="subtle"
							className={`p-6 h-full hover:scale-[1.02] transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 group relative overflow-hidden focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500 ${
								path.featured ? "ring-2 ring-purple-500/50" : ""
							}`}
						>
							{path.featured && (
								<div className="absolute top-4 right-4 z-20">
									<Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
										<Star className="w-3 h-3 mr-1" />
										Featured
									</Badge>
								</div>
							)}

							{/* Header */}
							<div className="flex items-center gap-3 mb-4">
								<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform">
									{path.icon}
								</div>
								<div className="flex-1">
									<Badge
										className={getDifficultyColor(path.difficulty)}
										variant="secondary"
									>
										{path.difficulty}
									</Badge>
								</div>
							</div>

							{/* Title & Description */}
							<h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
								{path.title}
							</h3>
							<p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
								{path.description}
							</p>

							{/* Stats */}
							<div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200/50 dark:border-gray-700/50">
								<div className="text-center">
									<div className="text-lg font-bold text-gray-900 dark:text-gray-100">
										{path.modules}
									</div>
									<div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
										Modules
									</div>
								</div>
								<div className="text-center">
									<div className="text-lg font-bold text-gray-900 dark:text-gray-100">
										{path.students}
									</div>
									<div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
										Students
									</div>
								</div>
							</div>

							{/* Progress (if enrolled) */}
							{path.progress > 0 && (
								<div className="mb-4">
									<div className="flex justify-between items-center mb-2">
										<span className="text-sm font-medium text-gray-800 dark:text-gray-200">
											Your Progress
										</span>
										<span className="text-sm font-bold text-gray-900 dark:text-gray-100">
											{path.progress}%
										</span>
									</div>
									<div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2.5">
										{/* biome-ignore lint/a11y/useFocusableInteractive: <explanation> */}
										<div
											className="h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
											style={{ width: `${path.progress}%` }}
											role="progressbar"
											aria-valuenow={path.progress}
											aria-valuemin={0}
											aria-valuemax={100}
											aria-label={`Learning path progress: ${path.progress}%`}
										/>
									</div>
								</div>
							)}

							{/* Duration */}
							<div className="flex items-center gap-2 mb-4 text-gray-600 dark:text-gray-400 text-sm">
								<BookOpen className="w-4 h-4" />
								<span>{path.duration}</span>
							</div>

							{/* Topics */}
							<div className="mb-6">
								<h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
									What you'll learn:
								</h4>
								<div className="flex flex-wrap gap-2">
									{path.topics.slice(0, 3).map((topic) => (
										<Badge
											key={topic}
											variant="secondary"
											className="text-xs px-2 py-1 bg-gray-200/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300"
										>
											{topic}
										</Badge>
									))}
									{path.topics.length > 3 && (
										<Badge
											variant="secondary"
											className="text-xs px-2 py-1 bg-gray-200/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300"
										>
											+{path.topics.length - 3} more
										</Badge>
									)}
								</div>
							</div>

							{/* CTA Button */}
							<div className="mt-auto">
								<button
									type="button"
									className={`w-full px-4 py-3 bg-gradient-to-r ${
										path.progress > 0
											? "from-green-500 to-blue-500"
											: "from-purple-500 to-blue-500"
									} text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:outline-none`}
									aria-label={
										path.progress > 0
											? `Continue ${path.title} learning path`
											: `Start ${path.title} learning path`
									}
								>
									<span className="flex items-center gap-2 justify-center">
										{path.progress > 0 ? (
											<>
												<PlayCircle className="w-4 h-4" />
												Continue Learning
											</>
										) : (
											<>
												<Rocket className="w-4 h-4" />
												Start Learning
											</>
										)}
									</span>
								</button>
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
							Create Your Learning Journey
						</h3>
						<p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
							Choose your path and start building the skills that matter.
							Expert-crafted curriculum with real-world projects.
						</p>
					</div>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<button
							type="button"
							className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:outline-none"
							aria-label="Browse all learning paths"
						>
							<span className="flex items-center gap-2 justify-center">
								<BookOpen className="w-5 h-5" />
								Browse All Paths
							</span>
						</button>
						<button
							type="button"
							className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-xl hover:border-purple-500 dark:hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
							aria-label="Get personalized path recommendations"
						>
							<span className="flex items-center gap-2 justify-center">
								<Target className="w-5 h-5" />
								Get Recommendations
							</span>
						</button>
					</div>
				</GlassCard>
			</div>
		</>
	);
}
