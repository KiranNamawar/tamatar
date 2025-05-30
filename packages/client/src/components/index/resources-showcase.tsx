// filepath: c:\Users\kiran\Dev\TamatarStore\tamatar\packages\client\src\components\index\resources-showcase.tsx
import SectionWrapper from "@/components/layout/SectionWrapper";
import FloatingBackground from "@/components/ui/FloatingBackground";
import { GlassCard } from "@/components/ui/glass-card";
import type { FloatingItem } from "@/lib/ui-patterns";
import {
	BookOpen,
	ExternalLink,
	FileCode,
	Github,
	Lightbulb,
	Sparkles,
	Users,
	Video,
	Zap,
} from "lucide-react";

const floatingItems: FloatingItem[] = [
	{
		className: "top-16 left-8 rotate-12",
		icon: <BookOpen className="w-5 h-5 text-teal-500" />,
		delay: "0s",
		key: "float-book",
	},
	{
		className: "top-32 right-12 -rotate-6",
		icon: <FileCode className="w-6 h-6 text-emerald-500" />,
		delay: "0.5s",
		key: "float-code",
	},
	{
		className: "bottom-20 left-16 rotate-45",
		icon: <Users className="w-5 h-5 text-cyan-500" />,
		delay: "1s",
		key: "float-users",
	},
	{
		className: "bottom-32 right-8 -rotate-12",
		icon: <Github className="w-6 h-6 text-sky-500" />,
		delay: "1.5s",
		key: "float-github",
	},
	{
		className: "top-1/2 left-1/4 rotate-90",
		icon: <Lightbulb className="w-4 h-4 text-amber-500" />,
		delay: "2s",
		key: "float-bulb",
	},
	{
		className: "top-1/3 right-1/4 -rotate-45",
		icon: <Sparkles className="w-5 h-5 text-pink-500" />,
		delay: "2.5s",
		key: "float-sparkles",
	},
];

const resources = [
	{
		category: "Documentation",
		title: "Essential Docs",
		description:
			"Documentation that developers actually reference in their journals. Real-world usage patterns and gotchas included.",
		icon: <BookOpen className="w-6 h-6" />,
		link: "/resources?category=documentation",
		badge: "Trusted",
		badgeColor: "bg-green-500/20 text-green-400",
	},
	{
		category: "Tools",
		title: "Developer Tools",
		description:
			"Tools that make developers' lives easier, shared from their daily workflow experiences and breakthrough moments.",
		icon: <Zap className="w-6 h-6" />,
		link: "/resources?category=tools",
		badge: "Battle-tested",
		badgeColor: "bg-orange-500/20 text-orange-400",
	},
	{
		category: "Learning",
		title: "Learning Resources",
		description:
			"Tutorials and courses that developers credit in their learning journeys. The resources that actually clicked.",
		icon: <Video className="w-6 h-6" />,
		link: "/resources?category=learning",
		badge: "Proven",
		badgeColor: "bg-blue-500/20 text-blue-400",
	},
	{
		category: "Community",
		title: "Developer Communities",
		description:
			"Forums and platforms where developers found their breakthroughs. Places that actually provide helpful answers.",
		icon: <Users className="w-6 h-6" />,
		link: "/resources?category=community",
		badge: "Active",
		badgeColor: "bg-purple-500/20 text-purple-400",
	},
	{
		category: "Templates",
		title: "Code Templates",
		description:
			"Starter templates and boilerplates that developers recommend from their project experiences.",
		icon: <FileCode className="w-6 h-6" />,
		link: "/resources?category=templates",
		badge: "Recommended",
		badgeColor: "bg-yellow-500/20 text-yellow-400",
	},
	{
		category: "Inspiration",
		title: "Project Inspiration",
		description:
			"Projects that inspired developers to build something new. Showcases that sparked creativity in their journeys.",
		icon: <Sparkles className="w-6 h-6" />,
		link: "/resources?category=inspiration",
		badge: "Inspiring",
		badgeColor: "bg-pink-500/20 text-pink-400",
	},
];

export default function ResourcesShowcase() {
	return (
		<SectionWrapper animated={false}>
			<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
				{/* Floating Background Elements */}
				<FloatingBackground items={floatingItems} />

				{/* Section Header */}
				<div className="text-center mb-16 relative z-10">
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-cyan-500/10 border border-teal-500/20 mb-6">
						<Github className="w-4 h-4 text-teal-400" />
						<span className="text-sm font-medium text-teal-400">
							Community Curated
						</span>
					</div>
					<h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
						<span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
							Curated by Our
						</span>
						<br />
						<span className="text-gray-800 dark:text-gray-200">
							Developer Community
						</span>
					</h2>
					<p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
						Every resource here comes from real developer journeys. When
						developers document their learning, they share the tools, tutorials,
						and articles that actually helped them break through.
					</p>
				</div>

				{/* Resources Grid - No animations */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
					{resources.map((resource) => (
						<div key={resource.title}>
							<GlassCard
								variant="card"
								className="group h-full hover:scale-105 transition-all duration-300 cursor-pointer border-gray-200/30 dark:border-gray-700/30 hover:border-teal-500/40 dark:hover:border-teal-400/40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-xl hover:shadow-2xl"
							>
								<div className="p-6 h-full flex flex-col">
									{/* Resource Badge */}
									<div className="flex items-center justify-between mb-4">
										<span className="text-xs font-medium px-3 py-1.5 rounded-full bg-gray-100/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/50">
											{resource.category}
										</span>
										<span
											className={`text-xs font-medium px-3 py-1.5 rounded-full border ${resource.badgeColor} backdrop-blur-sm`}
										>
											{resource.badge}
										</span>
									</div>
									{/* Icon */}
									<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/20 via-emerald-500/20 to-cyan-500/20 dark:from-teal-400/30 dark:via-emerald-400/30 dark:to-cyan-400/30 flex items-center justify-center mb-4 text-teal-600 dark:text-teal-400 group-hover:text-teal-500 dark:group-hover:text-teal-300 transition-colors border border-teal-200/30 dark:border-teal-700/30">
										{resource.icon}
									</div>
									{/* Content */}
									<div className="flex-1">
										<h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors">
											{resource.title}
										</h3>
										<p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-6">
											{resource.description}
										</p>
									</div>
									{/* Action */}
									<div className="flex items-center text-teal-700 dark:text-teal-300 text-sm font-medium group-hover:text-teal-600 dark:group-hover:text-teal-200 transition-colors">
										<span>Browse Resources</span>
										<ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
									</div>
								</div>
							</GlassCard>
						</div>
					))}
				</div>

				{/* Call to Action - Force immediate visibility */}
				<div className="text-center mt-16 relative z-10">
					<div className="inline-flex flex-col sm:flex-row gap-4">
						<button
							type="button"
							className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
						>
							<span className="flex items-center gap-2">
								<Users className="w-5 h-5" />
								Browse All Resources
							</span>
						</button>
						<button
							type="button"
							className="px-8 py-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-teal-500 dark:hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-300"
						>
							<span className="flex items-center gap-2">
								<Sparkles className="w-5 h-5" />
								Submit a Resource
							</span>
						</button>
					</div>
				</div>
			</div>
		</SectionWrapper>
	);
}
